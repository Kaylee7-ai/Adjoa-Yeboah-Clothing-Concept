"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/lib/auth";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("ayc-splash");
    if (hasSeen) {
      setShowSplash(false);
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem("ayc-splash", "true");
      setShowSplash(false);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
    <CartProvider>
      {showSplash && <SplashScreen />}
      <div
        className={
          showSplash
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-700"
        }
      >
        {children}
      </div>
    </CartProvider>
    </AuthProvider>
  );
}
