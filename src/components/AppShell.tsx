"use client";

import { useCallback, useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";
import BottomNav from "@/components/layout/BottomNav";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/lib/auth";
import { SavedProvider } from "@/context/SavedContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(false);
  const [introChecked, setIntroChecked] = useState(false);

  useEffect(() => {
    try {
      setShowIntro(window.sessionStorage.getItem("ayc-onboarding-complete") !== "true");
    } catch {
      setShowIntro(false);
    }
    setIntroChecked(true);
  }, []);

  const finishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem("ayc-onboarding-complete", "true");
    } catch {
      // The intro can still be dismissed when storage is unavailable.
    }
    setShowIntro(false);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <SavedProvider>
        <div className="ay-app-shell">
          {children}
          <BottomNav />
        </div>
        {introChecked && showIntro && <SplashScreen onContinue={finishIntro} />}
      </SavedProvider>
      </CartProvider>
    </AuthProvider>
  );
}
