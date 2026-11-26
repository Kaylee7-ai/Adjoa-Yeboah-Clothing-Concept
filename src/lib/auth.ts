"use client";

/*
 * PROTOTYPE ONLY. NOT SECURE. Replace with real authentication before launch.
 * Demo accounts are stored in browser localStorage. SHA-256 is a demonstration
 * hash only; it is not a production password-storage design.
 */
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface StoredAccount {
  user: DemoUser;
  salt: string;
  passwordHash: string;
}

interface AuthContextValue {
  user: DemoUser | null;
  isLoading: boolean;
  signUp: (input: { name: string; email: string; phone: string; password: string }) => Promise<DemoUser>;
  logIn: (email: string, password: string) => Promise<DemoUser>;
  logOut: () => void;
}

const ACCOUNTS_KEY = "ayc-prototype-accounts-v1";
const SESSION_KEY = "ayc-prototype-session-v1";
const AuthContext = createContext<AuthContextValue | null>(null);

function readAccounts(): StoredAccount[] {
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as StoredAccount[] : [];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password: string, salt: string) {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function getCurrentUser(): DemoUser | null {
  try {
    const userId = window.localStorage.getItem(SESSION_KEY);
    if (!userId) return null;
    return readAccounts().find((account) => account.user.id === userId)?.user ?? null;
  } catch {
    return null;
  }
}

export async function signUp(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<DemoUser> {
  const name = input.name.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  if (!name || !email || !phone || !input.password) throw new Error("Complete every field to create your demo account.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
  if (input.password.length < 8) throw new Error("Use a password with at least 8 characters.");
  const accounts = readAccounts();
  if (accounts.some((account) => account.user.email === email)) throw new Error("An account with this email already exists.");
  const user: DemoUser = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    createdAt: new Date().toISOString(),
  };
  const salt = randomSalt();
  const passwordHash = await hashPassword(input.password, salt);
  accounts.push({ user, salt, passwordHash });
  writeAccounts(accounts);
  window.localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export async function logIn(emailInput: string, password: string): Promise<DemoUser> {
  const email = emailInput.trim().toLowerCase();
  if (!email || !password) throw new Error("Enter your email and password.");
  const account = readAccounts().find((item) => item.user.email === email);
  if (!account) throw new Error("No demo account was found for that email.");
  const passwordHash = await hashPassword(password, account.salt);
  if (passwordHash !== account.passwordHash) throw new Error("The password is incorrect.");
  window.localStorage.setItem(SESSION_KEY, account.user.id);
  return account.user;
}

export function logOut() {
  window.localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUser(getCurrentUser());
    setIsLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    signUp: async (input) => {
      const nextUser = await signUp(input);
      setUser(nextUser);
      return nextUser;
    },
    logIn: async (email, password) => {
      const nextUser = await logIn(email, password);
      setUser(nextUser);
      return nextUser;
    },
    logOut: () => {
      logOut();
      setUser(null);
    },
  }), [user, isLoading]);

  return createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider.");
  return context;
}
