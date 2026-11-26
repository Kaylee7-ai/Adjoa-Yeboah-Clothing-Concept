"use client";

import Link from "next/link";
import { Ruler, Scissors, CalendarDays } from "lucide-react";

const steps = [
  { title: "Bust", text: "Measure around the fullest part of the bust, keeping the tape level and comfortably loose." },
  { title: "Waist", text: "Measure around your natural waist, usually the narrowest part of your torso. Keep the tape relaxed." },
  { title: "Hips", text: "Measure around the fullest part of the hips, with your feet together and the tape level." },
  { title: "Height", text: "Stand straight without shoes and measure from the floor to the top of your head." },
];

export default function SizeGuidePage() {
  return (
    <main className="wrap section min-h-[70vh]">
      <p className="eyebrow">THE FITTING EDIT</p>
      <h1 className="section-title mt-3">Size & measurement guide.</h1>
      <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">A thoughtful fit starts with clear measurements. Use this guide as a starting point, then confirm the final size and garment measurements with the studio.</p>
      <section className="mt-9 grid gap-3 sm:grid-cols-3">
        {[["Women", "XS – XXL"], ["Men", "S – XXXL"], ["Children", "2Y – 12Y"]].map(([name, sizes]) => <div key={name} className="rounded-2xl border border-[var(--color-line)] bg-white p-5"><p className="eyebrow">{name}</p><p className="mt-2 font-display text-2xl">{sizes}</p><p className="mt-2 text-[10px] leading-5 text-[var(--color-muted)]">Dummy catalogue size range — to be confirmed.</p></div>)}
      </section>
      <section className="mt-12">
        <p className="eyebrow">MEASURE AT HOME</p><h2 className="mt-2 font-display text-3xl">How to measure.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">Use a flexible tape over lightweight clothing. Keep it level and avoid pulling it tight. Ask someone you trust to help if needed.</p>
        <div className="mt-6 divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">{steps.map((step, index) => <article key={step.title} className="grid gap-2 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-5"><span className="font-display text-2xl text-[var(--color-champagne)]">0{index + 1}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{step.text}</p></div></article>)}</div>
      </section>
      <section className="mt-10 rounded-[22px] bg-[var(--color-sand)] p-6">
        <div className="flex items-center gap-3"><Ruler size={20} /><h2 className="font-display text-2xl">Not sure about your fit?</h2></div>
        <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Choose a fitting or design a bespoke piece. Official size charts and exact measurement units are to be confirmed by the owner; no numeric measurement ranges are guessed here.</p>
        <div className="mt-5 flex flex-wrap gap-3"><Link href="/book-appointment" className="btn min-h-11"><CalendarDays size={15} /> Book a fitting</Link><Link href="/design-your-outfit" className="btn btn-outline min-h-11"><Scissors size={15} /> Design bespoke</Link></div>
      </section>
    </main>
  );
}
