"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Heart, Package, Ruler, Scissors, Truck, CalendarDays, LogOut } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import { approveCustomQuote, getCustomRequests, getDemoOrders, type DemoCustomRequest, type DemoOrder } from "@/lib/demoStore";
import { formatPrice } from "@/lib/formatPrice";

function ProfileContent() {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<DemoCustomRequest[]>([]);
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [paymentChoice, setPaymentChoice] = useState<Record<string, "full" | "deposit">>({});

  useEffect(() => {
    if (!user) return;
    setRequests(getCustomRequests(user.id));
    setOrders(getDemoOrders(user.id));
  }, [user]);

  function leave() {
    logOut();
    router.replace("/");
  }

  function approve(requestId: string) {
    if (!user) return;
    approveCustomQuote(user.id, requestId);
    setRequests(getCustomRequests(user.id));
  }

  const shortcuts = [
    { href: "/my-orders", label: "My Orders", detail: "Your ready-made orders", Icon: Package },
    { href: "/my-custom-orders", label: "My Custom Orders", detail: "Bespoke requests and quotes", Icon: Scissors },
    { href: "/wishlist", label: "Saved", detail: "Pieces in your personal edit", Icon: Heart },
    { href: "/track-order", label: "Track Order", detail: "Check a demo order reference", Icon: Truck },
    { href: "/size-guide", label: "Size Guide", detail: "Measurements and fit guidance", Icon: Ruler },
    { href: "/book-appointment", label: "Book a Fitting", detail: "Send a fitting enquiry", Icon: CalendarDays },
  ];

  return (
    <main className="wrap section min-h-[70vh]">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1 className="section-title mt-3">Hello, {user?.name.split(" ")[0]}.</h1>
      <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="surface-card h-fit p-6">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--color-sand)] font-display text-2xl">{user?.name.charAt(0).toUpperCase()}</div>
          <h2 className="mt-4 font-display text-2xl">{user?.name}</h2>
          <p className="mt-1 break-all text-sm text-[var(--color-muted)]">{user?.email}</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">{user?.phone}</p>
          <p className="mt-5 rounded-xl bg-[var(--color-sand)] p-3 text-xs leading-5 text-[var(--color-muted)]">Prototype account only — not secure. Do not store real payment or sensitive information.</p>
          <button type="button" onClick={leave} className="btn btn-outline mt-5 w-full"><LogOut size={15} /> Log out</button>
        </aside>
        <div className="grid content-start gap-8">
          <section>
            <div className="mb-4 flex items-end justify-between gap-3"><div><p className="eyebrow">YOUR SHORTCUTS</p><h2 className="font-display text-3xl">Your account</h2></div></div>
            <div className="grid gap-2 sm:grid-cols-2">
              {shortcuts.map(({ href, label, detail, Icon }) => <Link key={href} href={href} className="flex min-h-[78px] items-center gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-4 transition hover:shadow-[var(--shadow-card)]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-sand)]"><Icon size={18} /></span><span className="min-w-0 flex-1"><strong className="block text-sm">{label}</strong><small className="block text-xs text-[var(--color-muted)]">{detail}</small></span><ArrowUpRight size={15} className="text-[var(--color-muted)]" /></Link>)}
            </div>
          </section>
          <section>
            <div className="flex items-end justify-between gap-3"><div><p className="eyebrow">YOUR PURCHASES</p><h2 className="font-display text-3xl">Recent orders</h2></div><Link href="/my-orders" className="text-xs font-semibold underline">See all</Link></div>
            {orders.length === 0 ? <p className="mt-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 text-sm text-[var(--color-muted)]">Your demo orders will appear here after checkout.</p> : orders.slice(0, 3).map((order) => <article key={order.id} className="mt-3 rounded-2xl border border-[var(--color-line)] bg-white p-4"><div className="flex flex-wrap justify-between gap-2"><strong className="text-sm">{order.reference}</strong><span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-[10px]">{order.status}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">{order.items.length} line items · {new Date(order.createdAt).toLocaleDateString()}</p><Link href={`/track-order?ref=${encodeURIComponent(order.reference)}`} className="mt-3 inline-flex min-h-10 items-center text-xs font-semibold underline">Track this order</Link></article>)}
          </section>
          <section id="custom-orders">
            <div className="flex items-end justify-between gap-3"><div><p className="eyebrow">MADE FOR YOU</p><h2 className="font-display text-3xl">My Custom Orders</h2></div><Link href="/design-your-outfit" className="text-xs font-semibold underline">Design an outfit</Link></div>
            {requests.length === 0 ? <p className="mt-4 rounded-2xl border border-[var(--color-line)] bg-white p-5 text-sm text-[var(--color-muted)]">You have no custom quote requests yet.</p> : requests.map((request) => <article key={request.id} className="mt-3 rounded-2xl border border-[var(--color-line)] bg-white p-5"><div className="flex flex-wrap justify-between gap-2"><strong className="text-sm">{request.reference}</strong><span className="rounded-full bg-[var(--color-sand)] px-3 py-1 text-[10px]">{request.status.replaceAll("_", " ")}</span></div><p className="mt-2 text-xs text-[var(--color-muted)]">Submitted {new Date(request.createdAt).toLocaleDateString()}</p>{request.quote && <div className="mt-4 border-t border-[var(--color-line)] pt-4"><p className="font-semibold">Quote: {request.quote.currency} {request.quote.amount.toLocaleString()}</p><p className="mt-1 text-sm text-[var(--color-muted)]">Production time: {request.quote.productionTime}</p>{request.quote.message && <p className="mt-2 text-sm">{request.quote.message}</p>}{request.status === "QUOTE_SENT" && <button type="button" onClick={() => approve(request.id)} className="btn mt-4 min-h-11 w-full">Approve quote</button>}{request.status === "QUOTE_APPROVED" && <div className="mt-4 rounded-xl bg-[var(--color-sand)] p-4"><p className="text-sm font-semibold">Quote approved</p><p className="mt-1 text-xs text-[var(--color-muted)]">Choose a payment route. The deposit percentage below is a dummy value to be confirmed. No payment is processed in this prototype.</p><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" onClick={() => setPaymentChoice((old) => ({ ...old, [request.id]: "full" }))} className={`min-h-11 rounded-full border text-xs ${paymentChoice[request.id] === "full" ? "border-[var(--color-espresso)] bg-[var(--color-espresso)] text-white" : "border-[var(--color-line)] bg-white"}`}>Pay in full</button><button type="button" onClick={() => setPaymentChoice((old) => ({ ...old, [request.id]: "deposit" }))} className={`min-h-11 rounded-full border text-xs ${paymentChoice[request.id] === "deposit" ? "border-[var(--color-espresso)] bg-[var(--color-espresso)] text-white" : "border-[var(--color-line)] bg-white"}`}>30% deposit*</button></div>{paymentChoice[request.id] && <p className="mt-2 text-xs text-[var(--color-muted)]">{paymentChoice[request.id] === "full" ? formatPrice(request.quote.amount) : formatPrice(request.quote.amount * 0.3)} selected. Payment is not connected yet.</p>}</div>}<a href={`https://wa.me/233241224404?text=${encodeURIComponent(`Hello, I have a question about custom request ${request.reference}.`)}`} className="mt-3 inline-flex min-h-10 items-center text-xs font-semibold underline">Ask a question on WhatsApp</a></div>}</article>)}
          </section>
        </div>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return <RequireAuth><ProfileContent /></RequireAuth>;
}
