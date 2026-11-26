"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import { getDemoOrders, type DemoOrder } from "@/lib/demoStore";

function TrackContent() {
  const params = useSearchParams();
  const { user } = useAuth();
  const [reference, setReference] = useState("");
  const [order, setOrder] = useState<DemoOrder | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const queryRef = params.get("ref");
    if (queryRef) setReference(queryRef);
  }, [params]);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    const match = getDemoOrders(user.id).find((item) => item.reference.toLowerCase() === reference.trim().toLowerCase());
    setOrder(match ?? null);
    setSearched(true);
  }

  return (
    <main className="wrap section min-h-[70vh] max-w-2xl">
      <p className="eyebrow">CLIENT CARE</p><h1 className="section-title mt-3">Track your order.</h1>
      <p className="mb-8 text-sm leading-6 text-[var(--color-muted)]">Enter a demo order reference from your account. This tracker reads only the prototype orders saved in this browser.</p>
      <form onSubmit={search} className="rounded-2xl border border-[var(--color-line)] bg-white p-5">
        <label htmlFor="order-reference" className="field-label mt-0">Order reference</label>
        <input id="order-reference" className="field" value={reference} onChange={(event) => { setReference(event.target.value); setSearched(false); }} placeholder="e.g. AYO-ABC123" required />
        <button type="submit" className="btn mt-4 min-h-[52px] w-full">Find my order</button>
      </form>
      {searched && !order && <p role="status" className="mt-5 rounded-xl bg-[var(--color-sand)] p-4 text-sm text-[var(--color-muted)]">No demo order matched that reference in this account.</p>}
      {order && <section className="mt-5 rounded-2xl border border-[var(--color-line)] bg-white p-5"><div className="flex flex-wrap justify-between gap-2"><strong>{order.reference}</strong><span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-xs">{order.status}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">Created {new Date(order.createdAt).toLocaleDateString()}</p><div className="mt-5 space-y-3">{order.items.map((item) => <div key={item.productId + (item.size ?? "") + (item.color ?? "")} className="flex justify-between gap-3 text-sm"><span>{item.name} × {item.quantity}</span><span>{item.size ?? item.color ?? ""}</span></div>)}</div><p className="mt-5 border-t border-[var(--color-line)] pt-4 text-xs leading-5 text-[var(--color-muted)]">This is a local demo status only. It does not represent live studio production or courier tracking.</p></section>}
      <Link href="/my-orders" className="mt-7 inline-flex min-h-11 items-center text-sm font-semibold underline">View My Orders</Link>
    </main>
  );
}
export default function TrackOrderPage() {
  return <RequireAuth><Suspense fallback={<main className="wrap section">Loading order tracker…</main>}><TrackContent /></Suspense></RequireAuth>;
}
