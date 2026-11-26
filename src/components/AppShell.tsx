"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import BottomNav from "@/components/layout/BottomNav";
import BagExperience from "@/components/cart/BagExperience";
import SavedDrawer from "@/components/wishlist/SavedDrawer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/lib/auth";
import { SavedProvider } from "@/context/SavedContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show the branded opening screen on every fresh app load.
    // Do not persist a session flag: that caused repeat visits to skip the intro.
    const timer = window.setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SavedProvider>
            {showSplash && <SplashScreen />}
            <div className={showSplash ? "app-content app-content-hidden" : "app-content app-content-visible"} aria-hidden={showSplash}>
              {children}
            </div>
            <BottomNav />
            <BagExperience />
            <SavedDrawer />
          </SavedProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
