"use client";

import Image from "next/image";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const INTRO_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80", alt: "Kente bridal fashion concept", shape: "intro-photo-tall" },
  { src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80", alt: "Bespoke kaftan concept", shape: "intro-photo-short" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80", alt: "Ankara occasionwear concept", shape: "intro-photo-tall" },
  { src: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80", alt: "White lace outfit concept", shape: "intro-photo-short" },
  { src: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80", alt: "Agbada fashion concept", shape: "intro-photo-tall" },
  { src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80", alt: "Kente eveningwear concept", shape: "intro-photo-short" },
];

export default function SplashScreen({ onContinue }: { onContinue: () => void }) {
  const [failed, setFailed] = useState<string[]>([]);

  return (
    <section className="ay-onboarding fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-y-auto bg-[var(--color-ivory)] px-5 py-8" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="mx-auto flex w-full max-w-[430px] flex-col items-center">
        <BrandLogo compact className="mb-6" />
        <div className="intro-collage" aria-label="Fashion inspiration collage">
          {INTRO_PHOTOS.map((photo) => (
            <div className={`intro-photo ${photo.shape}`} key={photo.src}>
              {failed.includes(photo.src) ? (
                <div className="intro-photo-fallback" aria-label={photo.alt} />
              ) : (
                <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover object-top" onError={() => setFailed((items) => [...items, photo.src])} />
              )}
            </div>
          ))}
        </div>
        <p className="eyebrow mt-7">ADJOA YEBOAH CLOTHING · ACCRA</p>
        <h1 id="intro-title" className="mt-3 text-center font-display text-[clamp(2.6rem,10vw,3.6rem)] leading-[1.04] tracking-[-.05em]">
          Made for you,<br /><em className="font-normal">sewn in Accra.</em>
        </h1>
        <p className="mt-4 max-w-[300px] text-center text-sm leading-6 text-[var(--color-muted)]">
          Discover considered ready-to-wear pieces and create something uniquely yours.
        </p>
        <button type="button" onClick={onContinue} className="btn mt-7 min-h-[54px] w-full text-sm">
          Continue <span aria-hidden="true">→</span>
        </button>
        <div className="mt-5 flex items-center justify-center gap-2" aria-label="Introduction, page 1 of 3">
          <span className="h-1.5 w-6 rounded-full bg-[var(--color-espresso)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
        </div>
      </div>
    </section>
  );
}
