"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const reveal = (y: number, delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay }
  });

  return (
    <section className="relative flex min-h-[min(850px,calc(100svh-5rem))] items-center justify-center overflow-hidden bg-[#0c0a09]">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-[min(600px,80vw)] w-[min(600px,80vw)] -translate-x-1/2 rounded-full bg-amber-500/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
        <motion.p {...reveal(12, 0.2)} className="mb-6 text-xs uppercase tracking-[0.35em] text-amber-200/70 sm:text-sm">
          Accra · Since 2013
        </motion.p>

        <motion.h1 {...reveal(20, 0.4)} className="font-serif text-4xl leading-tight tracking-wide text-amber-50 sm:text-5xl md:text-6xl lg:text-7xl">
          Made for the moments
          <br />
          <span className="text-amber-200">that matter</span>
        </motion.h1>

        <motion.p {...reveal(16, 0.7)} className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-stone-300/90 sm:text-lg">
          Bridal gowns, Kente masterpieces and occasion wear — designed and crafted in Accra with intention and beauty.
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 1 }}
          className="mx-auto mt-10 h-px w-24 origin-center bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
        />

        <motion.div {...reveal(16, 1.2)} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link href="/shop" className="group relative overflow-hidden bg-amber-100 px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-[#0c0a09]">
            <span className="relative z-10">Shop Collection</span>
            <span aria-hidden="true" className="absolute inset-0 translate-y-full bg-amber-200 transition-transform duration-300 group-hover:translate-y-0" />
          </Link>

          <Link href="/book-appointment" className="border border-amber-200/40 px-8 py-3.5 text-sm uppercase tracking-widest text-amber-100 transition-all duration-300 hover:border-amber-200 hover:bg-amber-200/5">
            Book a Fitting
          </Link>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.8, duration: reduceMotion ? 0 : 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-px bg-gradient-to-b from-amber-400/40 to-transparent" />
      </motion.div>
    </section>
  );
}
