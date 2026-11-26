"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";

function ThankYouContent() {
  const params = useSearchParams();
  const { user } = useAuth();
  const reference = params.get("ref") || "AYO-DEMO";
  return (
    <main className="wrap flex min-h-[72svh] flex-col items-center justify-center py-14 text-center">
      <div className="thank-check-wrap" aria-label="Order placed">
        <span className="thank-spark spark-one">✦</span><span className="thank-spark spark-two">✧</span><span className="thank-spark spark-three">✦</span><span className="thank-spark spark-four">✧</span>
        <div className="thank-ring"><div className="thank-check">✓</div></div>
      </div>
      <p className="eyebrow mt-8">ORDER RECEIVED</p>
      <h1 className="mt-3 font-display text-4xl">Thank you,<br /><em>{user?.name.split(/\s+/)[0] ?? "for choosing us"}.</em></h1>
      <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--color-muted)]">Your demo order has been saved. The studio will confirm the details before any payment or fulfilment.</p>
      <div className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white px-6 py-4"><span className="eyebrow">ORDER NUMBER</span><p className="mt-1 font-semibold tracking-wider">{reference}</p></div>
      <div className="mt-7 grid w-full max-w-sm gap-3">
        <Link href={`/track-order?ref=${encodeURIComponent(reference)}`} className="btn min-h-[52px]">Track order</Link>
        <Link href="/shop" className="btn btn-outline min-h-[52px]">Continue shopping</Link>
      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return <Suspense fallback={<main className="wrap section">Preparing your confirmation…</main>}><ThankYouContent /></Suspense>;
}
