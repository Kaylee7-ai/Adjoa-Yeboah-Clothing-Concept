"use client";

import Link from "next/link";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import { getDemoOrders } from "@/lib/demoStore";
import { useEffect, useState } from "react";
import type { DemoOrder } from "@/lib/demoStore";

function OrdersContent() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  useEffect(() => { if (user) setOrders(getDemoOrders(user.id)); }, [user]);
  return (
    <main className="wrap section min-h-[70vh]">
      <p className="eyebrow">YOUR ACCOUNT</p><h1 className="section-title mt-3">My Orders.</h1>
      <p className="mb-7 max-w-lg text-sm leading-6 text-[var(--color-muted)]">A record of demo orders placed from this browser profile.</p>
      {!orders.length ? <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center"><p className="font-display text-2xl">No orders yet.</p><p className="mt-2 text-sm text-[var(--color-muted)]">Your order history will appear here after you place a demo order.</p><Link href="/shop" className="btn mt-6">Explore the collection</Link></div> : <div className="grid gap-3">{orders.map((order) => <article key={order.id} className="rounded-2xl border border-[var(--color-line)] bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-2"><strong>{order.reference}</strong><span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-[10px]">{order.status}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">{new Date(order.createdAt).toLocaleDateString()}</p><div className="mt-4 space-y-2">{order.items.map((item) => <div key={item.productId + (item.size ?? "") + (item.color ?? "")} className="flex justify-between gap-3 text-sm"><span className="min-w-0">{item.name} × {item.quantity}{item.size ? ` · ${item.size}` : ""}{item.color ? ` · ${item.color}` : ""}</span><span className="shrink-0">{item.unitPrice.toLocaleString("en-GH", { style: "currency", currency: "GHS" })}</span></div>)}</div><Link href={`/track-order?ref=${encodeURIComponent(order.reference)}`} className="mt-4 inline-flex min-h-10 items-center text-xs font-semibold underline">Track order →</Link></article>)}</div>}
    </main>
  );
}
export default function MyOrdersPage() { return <RequireAuth><OrdersContent /></RequireAuth>; }
