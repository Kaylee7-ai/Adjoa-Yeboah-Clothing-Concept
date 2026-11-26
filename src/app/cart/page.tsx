"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  function applyPromo() {
    // DUMMY promotional codes; the owner must confirm all offers before launch.
    const code = promo.trim().toUpperCase();
    if (code === "AYC10") {
      setDiscount(subtotal * 0.1);
      window.localStorage.setItem("ayc-demo-discount", String(subtotal * 0.1));
      setPromoMessage("Demo code applied: 10% off.");
    } else if (code === "KENTE15") {
      setDiscount(subtotal * 0.15);
      window.localStorage.setItem("ayc-demo-discount", String(subtotal * 0.15));
      setPromoMessage("Demo code applied: 15% off.");
    } else {
      setDiscount(0);
      window.localStorage.removeItem("ayc-demo-discount");
      setPromoMessage("Invalid code. Check the code and try again.");
    }
  }

  if (!totalItems) {
    return (
      <main className="wrap flex min-h-[65svh] flex-col items-center justify-center py-16 text-center">
        <p className="eyebrow">YOUR SELECTION</p>
        <h1 className="mt-3 font-display text-4xl">Your bag is waiting.</h1>
        <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-muted)]">Explore the collection and add a piece that feels like you.</p>
        <Link href="/shop" className="btn mt-7 min-h-[52px]">Explore the collection</Link>
      </main>
    );
  }

  const total = Math.max(0, subtotal - discount);

  return (
    <main className="wrap min-h-[70vh] pb-32 pt-6">
      <header className="flex items-center justify-between gap-3">
        <Link href="/shop" aria-label="Continue shopping" className="round-icon-button"><ArrowLeft size={18} /></Link>
        <h1 className="font-display text-3xl">My Bag</h1>
        <span className="text-xs text-[var(--color-muted)]">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
      </header>
      <section className="mt-7 grid gap-4" aria-label="Bag items">
        {cart.items.map((item) => (
          <article key={`${item.product.id}-${item.size ?? "one"}-${item.color ?? "default"}`} className="flex gap-3 rounded-2xl border border-[var(--color-line)] bg-white p-3">
            <Link href={`/shop/${item.product.slug}`} className="h-32 w-[100px] shrink-0 overflow-hidden rounded-xl bg-[var(--color-sand)]">
              <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover object-top" />
            </Link>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><Link href={`/shop/${item.product.slug}`} className="line-clamp-2 font-display text-lg leading-tight">{item.product.name}</Link><p className="mt-1 text-xs text-[var(--color-muted)]">{[item.color, item.size ? `Size ${item.size}` : null].filter(Boolean).join(" · ") || "Bespoke enquiry"}</p></div>
                <button type="button" onClick={() => removeItem(item.product.id, item.size, item.color)} aria-label={`Remove ${item.product.name}`} className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[var(--color-muted)]"><Trash2 size={16} /></button>
              </div>
              <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                <strong className="text-sm">{formatPrice(item.product.price * item.quantity)}</strong>
                <div className="flex h-9 items-center rounded-full border border-[var(--color-line)] px-1">
                  <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)} aria-label="Decrease quantity" className="grid h-8 w-8 place-items-center"><Minus size={13} /></button>
                  <span className="min-w-6 text-center text-xs tabular-nums">{item.quantity}</span>
                  <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)} aria-label="Increase quantity" className="grid h-8 w-8 place-items-center"><Plus size={13} /></button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
      <section className="mt-6 rounded-2xl border border-[var(--color-line)] bg-white p-4">
        <p className="text-sm font-semibold">Promo code</p>
        <div className="mt-3 flex gap-2">
          <input value={promo} onChange={(event) => setPromo(event.target.value)} placeholder="Enter code" aria-label="Promo code" className="field min-h-11 flex-1" />
          <button type="button" onClick={applyPromo} className="btn min-h-11 px-5">Apply</button>
        </div>
        {promoMessage && <p role="status" className={`mt-2 text-xs ${discount ? "text-[var(--color-emerald)]" : "text-[var(--color-burgundy)]"}`}>{promoMessage}</p>}
        <p className="mt-2 text-[10px] text-[var(--color-muted)]">Demo codes only: AYC10 or KENTE15. Offers are to be confirmed.</p>
      </section>
      <section className="mt-6 rounded-2xl bg-[var(--color-sand)] p-5">
        <div className="flex justify-between py-1 text-sm"><span className="text-[var(--color-muted)]">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="flex justify-between py-1 text-sm"><span className="text-[var(--color-muted)]">Delivery</span><span className="text-xs text-[var(--color-muted)]">Confirmed at checkout</span></div>
        <div className="flex justify-between py-1 text-sm"><span className="text-[var(--color-muted)]">Discount</span><span>{discount ? `−${formatPrice(discount)}` : formatPrice(0)}</span></div>
        <div className="mt-3 flex justify-between border-t border-[var(--color-line)] pt-4 text-base font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
      </section>
      <div className="cart-checkout-bar border-t border-[var(--color-line)] bg-[rgba(250,247,242,.96)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:static md:mt-6 md:border-0 md:bg-transparent md:p-0 md:pb-0">
        <Link href="/checkout" className="btn min-h-[54px] w-full">Checkout <span aria-hidden="true">→</span></Link>
      </div>
    </main>
  );
}
