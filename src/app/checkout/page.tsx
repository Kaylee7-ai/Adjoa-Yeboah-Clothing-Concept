"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CheckoutPage() {
  const { cart, subtotal, totalItems } = useCart();
  const [reviewed, setReviewed] = useState(false);
  if (totalItems === 0) return <main className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center"><p className="eyebrow">YOUR SELECTION</p><h1 className="serif mt-4 text-4xl">Your bag is empty.</h1><Link href="/shop" className="btn mt-8">Return to the collection</Link></main>;

  return (
    <main className="wrap py-14 md:py-20">
      <div className="mb-10 flex items-center justify-between gap-4 border-b border-[#e4dbcf] pb-6"><Link href="/" className="serif text-xl">Adjoa Yeboah</Link><Link href="/cart" className="text-xs font-semibold uppercase tracking-widest text-[#805a46]">← Back to bag</Link></div>
      <div className="grid gap-12 lg:grid-cols-[1fr_390px]">
        <section>
          <p className="eyebrow">ORDER ENQUIRY PREVIEW</p>
          <h1 className="serif mt-3 text-4xl md:text-5xl">Review your selection.</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#746960]">Check the pieces and quantities below. This concept checkout does not collect personal details, send an order, or take payment. The brand must approve its contact and fulfilment process before real enquiries can be submitted.</p>
          <div className="mt-10 space-y-5">
            <div className="border border-[#e4dbcf] bg-[#fffdf9] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#805a46]">Fulfilment</p>
              <p className="serif mt-2 text-xl">Collection or delivery</p>
              <p className="mt-2 text-sm leading-6 text-[#746960]">Collection arrangements, delivery coverage, production lead times and fees require confirmation from the brand.</p>
            </div>
            <div className="border border-[#e4dbcf] bg-[#fffdf9] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#805a46]">Payment</p>
              <p className="serif mt-2 text-xl">No payment required here</p>
              <p className="mt-2 text-sm leading-6 text-[#746960]">No card or Mobile Money details are requested. Secure payment options can only be added after business approval.</p>
            </div>
          </div>
          <button type="button" onClick={() => setReviewed(true)} className="btn mt-8 w-full sm:w-auto">Confirm I've reviewed my selection</button>
          {reviewed && <div role="status" className="mt-5 border border-[#b9c4ad] bg-[#edf1e8] p-5 text-sm text-[#354532]"><p className="font-semibold">Selection review complete.</p><p className="mt-1 leading-6">Your items and estimated subtotal are ready for a future approved enquiry process. No order has been sent or placed.</p></div>}
        </section>
        <aside className="h-fit border border-[#e4dbcf] bg-[#fffdf9] p-6 lg:sticky lg:top-28">
          <h2 className="serif text-2xl">Your selection</h2>
          <div className="mt-7 space-y-5">
            {cart.items.map((item) => <div key={`${item.product.id}-${item.size ?? "standard"}`} className="flex gap-4"><img src={item.product.images[0]} alt="" className="h-24 w-20 shrink-0 bg-[#eee6dc] object-cover" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold leading-5">{item.product.name}</p><p className="mt-1 text-xs text-[#746960]">Qty {item.quantity}{item.size ? ` · ${item.size}` : ""}</p><p className="mt-2 text-sm">{formatPrice(item.product.price * item.quantity)}</p></div></div>)}
          </div>
          <div className="mt-7 border-t border-[#e4dbcf] pt-5"><div className="flex justify-between text-sm"><span className="text-[#746960]">Subtotal ({totalItems} items)</span><span className="font-semibold">{formatPrice(subtotal)}</span></div><div className="mt-3 flex justify-between text-xs text-[#746960]"><span>Delivery</span><span>To be confirmed</span></div><div className="mt-5 flex justify-between border-t border-[#e4dbcf] pt-5 font-semibold"><span>Estimated subtotal</span><span>{formatPrice(subtotal)}</span></div></div>
          <p className="mt-5 text-xs leading-6 text-[#746960]">Illustrative catalogue only. Product details and prices are unverified until approved by the brand.</p>
        </aside>
      </div>
    </main>
  );
}
