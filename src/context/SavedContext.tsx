"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface SavedContextValue {
  savedIds: string[];
  isSaved: (productId: string) => boolean;
  toggleSaved: (productId: string) => void;
}

const SavedContext = createContext<SavedContextValue | null>(null);
const SAVED_KEY = "ayc-saved-products-v1";

export function SavedProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setSavedIds(parsed.filter((id): id is string => typeof id === "string"));
      }
    } catch {
      setSavedIds([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    } catch {
      // Saved items remain available in memory if browser storage is unavailable.
    }
  }, [savedIds, hydrated]);

  const toggleSaved = useCallback((productId: string) => {
    setSavedIds((current) => current.includes(productId)
      ? current.filter((id) => id !== productId)
      : [...current, productId]);
  }, []);

  const isSaved = useCallback((productId: string) => savedIds.includes(productId), [savedIds]);
  const value = useMemo(() => ({ savedIds, isSaved, toggleSaved }), [savedIds, isSaved, toggleSaved]);

  return <SavedContext.Provider value={value}>{children}</SavedContext.Provider>;
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSaved must be used inside SavedProvider.");
  return context;
}
