"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import { getCustomRequests, type DemoCustomRequest } from "@/lib/demoStore";

function CustomOrdersContent() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<DemoCustomRequest[]>([]);
  useEffect(() => { if (user) setRequests(getCustomRequests(user.id)); }, [user]);
  return (
    <main className="wrap section min-h-[70vh]">
      <p className="eyebrow">YOUR BESPOKE JOURNEY</p><h1 className="section-title mt-3">My Custom Orders.</h1>
      <p className="mb-7 max-w-lg text-sm leading-6 text-[var(--color-muted)]">Follow your quote requests and the studio's progress updates.</p>
      {!requests.length ? <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center"><h2 className="font-display text-2xl">Your next design starts here.</h2><p className="mt-2 text-sm text-[var(--color-muted)]">You have not sent a custom quote request yet.</p><Link href="/design-your-outfit" className="btn mt-6">Design your outfit</Link></div> : <div className="grid gap-3">{requests.map((request) => <article key={request.id} className="rounded-2xl border border-[var(--color-line)] bg-white p-5"><div className="flex flex-wrap justify-between gap-2"><strong>{request.reference}</strong><span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-[10px]">{request.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">Submitted {new Date(request.createdAt).toLocaleDateString()}</p><p className="mt-3 text-sm">{String(request.selections.garment ?? "Custom outfit")} · {String(request.selections.occasion ?? "Occasion not selected")}</p>{request.quote && <div className="mt-4 border-t border-[var(--color-line)] pt-4"><p className="font-semibold">Quote: {request.quote.currency} {request.quote.amount.toLocaleString()}</p><p className="mt-1 text-sm text-[var(--color-muted)]">{request.quote.productionTime}</p><a href={`https://wa.me/233241224404?text=${encodeURIComponent(`Hello, I have a question about request ${request.reference}.`)}`} className="mt-3 inline-flex min-h-10 items-center text-xs font-semibold underline">Ask a question on WhatsApp</a></div>}</article>)}</div>}
    </main>
  );
}
export default function MyCustomOrdersPage() { return <RequireAuth><CustomOrdersContent /></RequireAuth>; }
