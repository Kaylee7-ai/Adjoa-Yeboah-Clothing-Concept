"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Truck, Store, CreditCard, Smartphone } from "lucide-react";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { saveDemoOrder } from "@/lib/demoStore";

function CheckoutContent() {
  const { user } = useAuth();
  const { cart, subtotal, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [delivery, setDelivery] = useState<"pickup" | "delivery">("pickup");
  const [payment, setPayment] = useState<"momo" | "card" | "studio">("momo");
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem("ayc-demo-discount") ?? 0);
    setDiscount(Number.isFinite(stored) ? Math.max(0, stored) : 0);
  }, []);

  const total = Math.max(0, subtotal - discount);

  if (!totalItems) {
    return <main className="wrap flex min-h-[60vh] flex-col items-center justify-center text-center"><h1 className="font-display text-4xl">Your bag is empty.</h1><Link href="/shop" className="btn mt-6">Explore the collection</Link></main>;
  }

  function placeOrder() {
    if (!user || busy || (delivery === "delivery" && !address.trim())) return;
    setBusy(true);
    const order = saveDemoOrder(user.id, cart.items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice: item.product.price,
    })));
    clearCart();
    window.localStorage.removeItem("ayc-demo-discount");
    router.push(`/thank-you?ref=${encodeURIComponent(order.reference)}&delivery=${delivery}`);
  }

  return (
    <main className="wrap min-h-[75vh] pb-32 pt-6">
      <header className="flex items-center justify-between gap-3"><Link href="/cart" className="round-icon-button" aria-label="Back to bag"><ArrowLeft size={18} /></Link><h1 className="font-display text-3xl">Checkout</h1><span className="w-11" /></header>
      <section className="mt-7">
        <p className="eyebrow">DELIVERY ADDRESS</p>
        <div className="mt-3 rounded-2xl border border-[var(--color-line)] bg-white p-4">
          <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--color-sand)]"><MapPin size={18} /></span><div className="min-w-0 flex-1"><strong className="text-sm">Home / delivery details</strong><p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">{address || "Add your delivery address below if you need delivery."}</p></div><span className="text-xs font-semibold">Edit</span></div>
          <label htmlFor="address" className="field-label mt-4">Delivery address (required for delivery)</label>
          <textarea id="address" value={address} onChange={(event) => setAddress(event.target.value)} rows={2} placeholder="House number, street, area, city" className="field min-h-20 resize-y" />
        </div>
      </section>

      <section className="mt-7">
        <p className="eyebrow">DELIVERY</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => { setDelivery("pickup"); }} aria-pressed={delivery === "pickup"} className={`checkout-choice ${delivery === "pickup" ? "is-selected" : ""}`}><Store size={20} /><strong>Studio Pickup</strong><span>Free · 1 Levites Avenue</span></button>
          <button type="button" onClick={() => { setDelivery("delivery"); if (payment === "studio") setPayment("momo"); }} aria-pressed={delivery === "delivery"} className={`checkout-choice ${delivery === "delivery" ? "is-selected" : ""}`}><Truck size={20} /><strong>Delivery</strong><span>Cost confirmed later</span></button>
        </div>
      </section>

      <section className="mt-7">
        <p className="eyebrow">PAYMENT</p>
        <div className="mt-3 grid gap-3">
          <button type="button" onClick={() => setPayment("momo")} aria-pressed={payment === "momo"} className={`checkout-payment ${payment === "momo" ? "is-selected" : ""}`}><Smartphone size={20} /><span><strong>Mobile Money</strong><small>MTN · Telecel · AirtelTigo</small></span></button>
          <button type="button" onClick={() => setPayment("card")} aria-pressed={payment === "card"} className={`checkout-payment ${payment === "card" ? "is-selected" : ""}`}><CreditCard size={20} /><span><strong>Card</strong><small>Visa · Mastercard</small></span></button>
          {delivery === "pickup" && <button type="button" onClick={() => setPayment("studio")} aria-pressed={payment === "studio"} className={`checkout-payment ${payment === "studio" ? "is-selected" : ""}`}><Store size={20} /><span><strong>Pay at Studio</strong><small>Available with studio pickup</small></span></button>}
        </div>
        <p className="mt-3 text-[10px] leading-5 text-[var(--color-muted)]">Demo checkout only. No payment is processed. Payment providers and payment terms must be confirmed before launch.</p>
      </section>

      <section className="mt-7 rounded-2xl bg-[var(--color-sand)] p-5">
        <p className="eyebrow">ORDER SUMMARY</p>
        <div className="mt-3 flex justify-between text-sm"><span>{totalItems} {totalItems === 1 ? "item" : "items"}</span><strong>{formatPrice(subtotal)}</strong></div>
        <div className="mt-2 flex justify-between text-xs text-[var(--color-muted)]"><span>Delivery</span><span>{delivery === "pickup" ? "Free" : "To be confirmed"}</span></div>
        <div className="mt-2 flex justify-between text-xs text-[var(--color-muted)]"><span>Discount</span><span>−{formatPrice(discount)}</span></div>
        <div className="mt-4 flex justify-between border-t border-[var(--color-line)] pt-4 text-base font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
      </section>

      <div className="checkout-bottom-bar">
        <div className="min-w-0"><span className="block text-[10px] text-[var(--color-muted)]">Total · {totalItems} items</span><strong className="text-base">{formatPrice(total)}</strong></div>
        <button type="button" onClick={placeOrder} disabled={busy || (delivery === "delivery" && !address.trim())} className="btn min-h-[52px] flex-1 disabled:opacity-45">{busy ? "Placing…" : "Place Order"}</button>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return <RequireAuth><CheckoutContent /></RequireAuth>;
}
