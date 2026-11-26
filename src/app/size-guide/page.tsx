"use client";

import Link from "next/link";

const measurementSteps = [
  {
    number: "01",
    title: "Bust",
    description:
      "Measure around the fullest part of the bust, keeping the tape level and comfortably loose.",
  },
  {
    number: "02",
    title: "Waist",
    description:
      "Measure around your natural waist, usually the narrowest part of your torso. Keep the tape relaxed.",
  },
  {
    number: "03",
    title: "Hips",
    description:
      "Measure around the fullest part of the hips, with your feet together and the tape level.",
  },
  {
    number: "04",
    title: "Shoulder",
    description:
      "Measure across the back from the edge of one shoulder to the other, following the natural shoulder line.",
  },
  {
    number: "05",
    title: "Length",
    description:
      "For a dress or skirt, measure from the point where the garment should sit to your preferred hem length.",
  },
];

export default function SizeGuidePage() {
  return (
    <main className="min-h-screen bg-[#0c0a09] px-6 pb-24 pt-28 text-stone-200">
      <div className="mx-auto max-w-5xl">
        <nav aria-label="Breadcrumb" className="mb-10 text-xs tracking-wide text-stone-500">
          <Link href="/shop" className="transition hover:text-amber-200">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-300">Size Guide</span>
        </nav>

        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-amber-200/70">
            The fitting edit
          </p>
          <h1 className="font-serif text-4xl leading-tight text-amber-50 md:text-6xl">
            Size & Measurement Guide
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-stone-400 md:text-base">
            A thoughtful fit starts with clear measurements. Use the guidance
            below to take your measurements, then confirm the correct size with
            the brand before placing an order.
          </p>
        </header>

        <section className="mt-16 border-y border-stone-800 py-8" aria-labelledby="size-chart-title">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
                Before choosing a size
              </p>
              <h2 id="size-chart-title" className="mt-2 font-serif text-2xl text-amber-50 md:text-3xl">
                Confirm your garment measurements
              </h2>
            </div>
            <span className="w-fit border border-amber-200/30 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-amber-100/80">
              Brand chart pending confirmation
            </span>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-stone-400">
            An official size chart has not yet been supplied for this independent
            website concept. We have intentionally not published guessed
            centimetre or inch ranges. Sizing can vary by design, fabric and
            intended fit, so please confirm the garment&apos;s actual measurements
            and available sizes with the brand.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border border-stone-800 bg-stone-900/40 p-5">
              <p className="text-sm text-amber-100">Ready-to-wear</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                Check the product&apos;s listed size options and request the
                garment&apos;s measurement details before choosing.
              </p>
            </div>
            <div className="border border-stone-800 bg-stone-900/40 p-5">
              <p className="text-sm text-amber-100">Bespoke pieces</p>
              <p className="mt-2 text-sm leading-6 text-stone-400">
                Confirm the measurement process and fitting arrangements with
                the brand. Requirements may differ by garment.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="how-to-measure-title">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
              A simple reference
            </p>
            <h2 id="how-to-measure-title" className="mt-2 font-serif text-3xl text-amber-50">
              How to measure
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-400">
              Use a flexible measuring tape over comfortable, lightweight
              clothing. Keep it level and avoid pulling it tight. If possible,
              ask someone you trust to help with measurements.
            </p>
          </div>

          <div className="divide-y divide-stone-800 border-y border-stone-800">
            {measurementSteps.map((step) => (
              <article key={step.number} className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <p className="font-serif text-2xl text-amber-200/70">{step.number}</p>
                <div>
                  <h3 className="text-base text-amber-50">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-400">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 border border-stone-800 bg-stone-900/30 p-7 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
            Need help with fit?
          </p>
          <h2 className="mt-3 font-serif text-2xl text-amber-50 md:text-3xl">
            Confirm the details before ordering
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">
            This site is an independent storefront concept and is not the
            official brand store. Product sizing, measurement standards and
            fitting services must be confirmed by the brand before a purchase
            or appointment is arranged.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center border border-amber-100 bg-amber-100 px-6 py-4 text-xs uppercase tracking-[0.18em] text-[#0c0a09] transition hover:bg-amber-200"
            >
              Browse collection
            </Link>
            <Link
              href="/book-appointment"
              className="inline-flex items-center justify-center border border-stone-700 px-6 py-4 text-xs uppercase tracking-[0.18em] text-stone-200 transition hover:border-amber-200/60 hover:text-amber-100"
            >
              View fitting enquiries
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
