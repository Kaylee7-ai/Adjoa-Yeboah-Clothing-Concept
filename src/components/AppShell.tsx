"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import BagExperience from "@/components/cart/BagExperience";
import SavedDrawer from "@/components/wishlist/SavedDrawer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("ayc-splash") === "true") {
        setShowSplash(false);
        return;
      }
    } catch {
      // The intro still completes when session storage is unavailable.
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("ayc-splash", "true");
      } catch {
        // Storage is optional; the intro can still be dismissed.
      }
      setShowSplash(false);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <CartProvider>
      <WishlistProvider>
        {showSplash && <SplashScreen />}
        <div
          className={showSplash ? "app-content app-content-hidden" : "app-content app-content-visible"}
          aria-hidden={showSplash}
        >
          {children}
        </div>
        <BagExperience />
        <SavedDrawer />
      </WishlistProvider>
    </CartProvider>
  );
}
