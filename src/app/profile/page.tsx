"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import { getCustomRequests, getDemoOrders, type DemoCustomRequest, type DemoOrder } from "@/lib/demoStore";

function ProfileContent() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<DemoCustomRequest[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);

  useEffect(() => {
    if (!user) return;
    setRequests(getCustomRequests(user.id));
    setOrders(getDemoOrders(user.id));
  }, [user]);

  function leave() {
    logOut();
    router.replace("/");
  }

  return (
    <main className="wrap section min-h-[70vh]">
      <p className="eyebrow">Your account</p>
      <h1 className="section-title mt-3">Hello, {user?.name.split(" ")[0]}.</h1>
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="h-fit border border-[var(--color-line)] bg-[var(--color-surface)] p-6">
          <h2 className="font-display text-2xl">Profile details</h2>
          <p className="mt-4 text-sm">{user?.name}</p>
          <p className="mt-1 break-all text-sm text-[var(--color-muted)]">{user?.email}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{user?.phone}</p>
          <button type="button" onClick={leave} className="btn btn-outline mt-7 w-full">Log out</button>
          <p className="mt-3 text-xs text-[var(--color-muted)]">Prototype account only — not secure.</p>
        </aside>
        <div className="grid gap-8">
          <section>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow">Your purchases</p><h2 className="font-display text-3xl">My Orders</h2></div>
              <span className="text-xs text-[var(--color-muted)]">{orders.length} orders</span>
            </div>
            {orders.length === 0 ? <p className="mt-4 border border-[var(--color-line)] p-5 text-sm text-[var(--color-muted)]">Your demo orders will appear here.</p> : orders.map((order) => <article key={order.id} className="mt-3 border border-[var(--color-line)] p-5"><div className="flex flex-wrap justify-between gap-2"><strong>{order.reference}</strong><span className="text-xs">{order.status}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">{new Date(order.createdAt).toLocaleDateString()}</p></article>)}
          </section>
          <section>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="eyebrow">Made for you</p><h2 className="font-display text-3xl">My Custom Orders</h2></div>
              <Link href="/design-your-outfit" className="text-sm underline">Design an outfit</Link>
            </div>
            {requests.length === 0 ? <p className="mt-4 border border-[var(--color-line)] p-5 text-sm text-[var(--color-muted)]">You have no custom quote requests yet.</p> : requests.map((request) => <article key={request.id} className="mt-3 border border-[var(--color-line)] p-5"><div className="flex flex-wrap justify-between gap-2"><strong>{request.reference}</strong><span className="rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs">{request.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">Submitted {new Date(request.createdAt).toLocaleDateString()}</p>{request.quote && <div className="mt-4 border-t border-[var(--color-line)] pt-4"><p className="font-semibold">Quote: {request.quote.currency} {request.quote.amount.toLocaleString()}</p><p className="text-sm text-[var(--color-muted)]">Production time: {request.quote.productionTime}</p><p className="mt-2 text-sm">{request.quote.message}</p><p className="mt-2 text-xs text-[var(--color-muted)]">Quote approval and payment activation will be connected after studio review is built.</p></div>}</article>)}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return <RequireAuth><ProfileContent /></RequireAuth>;
}
