"use client";

export default function SplashScreen() {
  return (
    <div
      role="status"
      aria-label="Loading Adjoa Yeboah Clothing"
      className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center bg-[#f8f5ef] text-[#30251f]"
    >
      <div className="flex flex-col items-center px-6 text-center">
        <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#b18a62]/70">
          <span className="font-serif text-4xl text-[#8d674c]">A</span>
        </div>
        <p className="font-serif text-xl tracking-[0.22em]">ADJOA YEBOAH</p>
        <p className="mt-2 text-[9px] tracking-[0.34em] text-[#8d674c]">CLOTHING</p>
        <div className="mt-8 h-px w-28 overflow-hidden bg-[#30251f]/15">
          <div className="h-full w-1/2 animate-[splash_1s_ease-in-out_infinite] bg-[#b18a62]" />
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
