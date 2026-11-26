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
    <section className="relative isolate flex min-h-[min(790px,calc(100svh-5rem))] items-center overflow-hidden bg-[#eee6dc]">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=2200&q=88"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#211812]/85 via-[#211812]/55 to-[#211812]/10" />
      <div className="wrap relative z-10 py-28 text-left">
        <motion.p {...reveal(12, 0.2)} className="mb-6 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#f2d9bd] sm:text-xs">
          Accra · Contemporary African Occasionwear
        </motion.p>
        <motion.h1 {...reveal(20, 0.4)} className="serif max-w-3xl text-5xl leading-[1.05] tracking-tight text-[#fffaf3] sm:text-6xl md:text-7xl lg:text-[84px]">
          Elegance, woven
          <br />
          <em className="font-normal text-[#e8c7a8]">into every moment.</em>
        </motion.h1>
        <motion.p {...reveal(16, 0.7)} className="mt-7 max-w-lg text-sm leading-7 text-[#fffaf3]/90 sm:text-base">
          A fashion concept celebrating thoughtful tailoring, expressive African textiles and occasionwear with a modern point of view.
        </motion.p>
        <motion.div {...reveal(16, 1.1)} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/shop" className="inline-flex min-h-12 items-center justify-center bg-[#f6eee4] px-8 text-[10px] font-bold uppercase tracking-[.18em] text-[#30251f] transition hover:bg-white">
            Explore the collection
          </Link>
          <Link href="/book-appointment" className="inline-flex min-h-12 items-center justify-center border border-white/75 px-8 text-[10px] font-bold uppercase tracking-[.18em] text-white transition hover:bg-white/10">
            Book a fitting
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#30251f]/20 to-transparent" />
    </section>
  );
}
