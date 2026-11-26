"use client";

import Image from "next/image";
import { useState } from "react";
import BrandLogo from "@/components/BrandLogo";

const INTRO_PHOTOS = [
  { src: "/images/products/royal-kente-bridal-1.jpg", alt: "Kente bridal fashion concept", shape: "intro-photo-tall" },
  { src: "/images/products/afrocentric-kaftan-1.jpg", alt: "Bespoke kaftan concept", shape: "intro-photo-short" },
  { src: "/images/products/emerald-ankara-1.jpg", alt: "Ankara occasionwear concept", shape: "intro-photo-tall" },
  { src: "/images/products/christening-lace-1.jpg", alt: "White lace outfit concept", shape: "intro-photo-short" },
  { src: "/images/products/gold-agbada-1.jpg", alt: "Agbada fashion concept", shape: "intro-photo-tall" },
  { src: "/images/products/midnight-kente-1.jpg", alt: "Kente eveningwear concept", shape: "intro-photo-short" },
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
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 430px) 30vw, 130px" className="object-cover object-top" onError={() => setFailed((items) => [...items, photo.src])} />
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
