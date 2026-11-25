"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Adjoa Yeboah Clothing"
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#0c0a09] text-[#f4eee5]"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#c9a77a]/60">
          <span className="font-serif text-4xl text-[#c9a77a]">A</span>
        </div>
        <p className="font-serif text-xl tracking-[0.22em]">ADJOA YEBOAH</p>
        <p className="mt-2 text-[9px] tracking-[0.34em] text-[#c9a77a]">CLOTHING</p>
        <div className="mt-8 h-px w-28 overflow-hidden bg-white/15">
          <div className="h-full w-1/2 animate-[splash_1s_ease-in-out_infinite] bg-[#c9a77a]" />
        </div>
        <span className="sr-only">Loading the storefront</span>
      </div>
      <style jsx>{`
        @keyframes splash {
          from { transform: translateX(-110%); }
          to { transform: translateX(220%); }
        }
      `}</style>
    </div>
  );
}
