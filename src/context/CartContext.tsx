"use client";

import {
  createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from "react";
import type { Cart, CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

export interface RecentAddition { product: Product; size?: string; color?: string; }
interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number, size?: string, notes?: string, color?: string) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  recentAddition: RecentAddition | null;
  dismissCelebration: () => void;
  openBag: () => void;
  closeBag: () => void;
  isBagOpen: boolean;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_KEY = "ayc-cart";
const emptyCart = (): Cart => ({ items: [], updatedAt: Date.now() });

function isCart(value: unknown): value is Cart {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Cart>;
  return Array.isArray(candidate.items) && candidate.items.every((item) =>
    !!item && typeof item === "object" && !!item.product &&
    typeof item.product.id === "string" && typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) && item.quantity > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [recentAddition, setRecentAddition] = useState<RecentAddition | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (isCart(parsed)) setCart({
          items: parsed.items.map((item) => ({ ...item, quantity: Math.max(1, Math.floor(item.quantity)) })),
          updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : Date.now(),
        });
      }
    } catch (error) { console.error("Failed to load the saved cart.", error); }
    finally { setHasLoaded(true); }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    try { window.localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
    catch (error) { console.error("Failed to save the cart.", error); }
  }, [cart, hasLoaded]);

  const addItem = useCallback((product: Product, quantity = 1, size?: string, notes?: string, color?: string) => {
    const amount = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
    setCart((previous) => {
      const exists = previous.items.some((item) => item.product.id === product.id && item.size === size && item.color === color);
      const items: CartItem[] = exists
        ? previous.items.map((item) => item.product.id === product.id && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity + amount, notes: notes ?? item.notes } : item)
        : [...previous.items, { product, quantity: amount, size, notes, color }];
      return { items, updatedAt: Date.now() };
    });
    setRecentAddition({ product, size, color });
  }, []);

  const removeItem = useCallback((productId: string, size?: string, color?: string) => {
    setCart((previous) => ({
      ...previous,
      items: previous.items.filter((item) =>
        item.product.id !== productId ||
        (size !== undefined && item.size !== size) ||
        (color !== undefined && item.color !== color)
      ),
      updatedAt: Date.now(),
    }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, size?: string, color?: string) => {
    if (!Number.isFinite(quantity) || quantity < 1) { removeItem(productId, size, color); return; }
    const amount = Math.floor(quantity);
    setCart((previous) => ({
      ...previous,
      items: previous.items.map((item) =>
        item.product.id === productId &&
        (size === undefined || item.size === size) &&
        (color === undefined || item.color === color)
          ? { ...item, quantity: amount } : item
      ),
      updatedAt: Date.now(),
    }));
  }, [removeItem]);

  const clearCart = useCallback(() => setCart(emptyCart()), []);
  const totalItems = useMemo(() => cart.items.reduce((sum, item) => sum + item.quantity, 0), [cart.items]);
  const subtotal = useMemo(() => cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart.items]);
  const dismissCelebration = useCallback(() => setRecentAddition(null), []);
  const openBag = useCallback(() => { setRecentAddition(null); setIsBagOpen(true); }, []);
  const closeBag = useCallback(() => setIsBagOpen(false), []);

  const value = useMemo(() => ({
    cart, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal,
    recentAddition, dismissCelebration, openBag, closeBag, isBagOpen,
  }), [cart, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal, recentAddition, dismissCelebration, openBag, closeBag, isBagOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider.");
  return context;
}
