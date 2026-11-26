"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, subtotal, totalItems } = useCart();
  if (totalItems === 0) {
    return <main className="flex min-h-[65vh] flex-col items-center justify-center px-6 text-center"><p className="eyebrow">YOUR SELECTION</p><h1 className="serif mt-4 text-4xl">Your bag is waiting.</h1><p className="mt-3 text-sm text-[#746960]">Discover pieces for your next special moment.</p><Link href="/shop" className="btn mt-8">Explore the collection</Link></main>;
  }
  return (
    <main className="wrap py-14 md:py-20">
      <p className="eyebrow">YOUR SELECTION</p>
      <h1 className="serif mt-3 text-4xl md:text-5xl">Shopping bag <span className="font-sans text-base text-[#746960]">({totalItems})</span></h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
        <section aria-label="Shopping bag items" className="space-y-7">
          {cart.items.map((item) => (
            <article key={`${item.product.id}-${item.size ?? "standard"}`} className="flex gap-4 border-b border-[#e4dbcf] pb-7 sm:gap-6">
              <img src={item.product.images[0]} alt={`Editorial concept image for ${item.product.name}`} className="h-36 w-28 shrink-0 bg-[#eee6dc] object-cover sm:h-44 sm:w-36" />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="serif text-lg leading-snug">{item.product.name}</p><p className="mt-1 text-xs text-[#746960]">{item.product.category}{item.size ? ` · Size ${item.size}` : ""}</p></div>
                  <button type="button" onClick={() => removeItem(item.product.id, item.size)} className="shrink-0 text-[10px] font-semibold uppercase tracking-widest text-[#8b5e55] underline underline-offset-4">Remove</button>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                  <div className="flex items-center border border-[#d9cfc3] bg-[#fffdf9]">
                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)} className="px-3 py-2" aria-label="Decrease quantity">−</button>
                    <span className="min-w-8 text-center text-xs tabular-nums" aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)} className="px-3 py-2" aria-label="Increase quantity">+</button>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            </article>
          ))}
        </section>
        <aside className="h-fit border border-[#e4dbcf] bg-[#fffdf9] p-6 lg:sticky lg:top-28">
          <h2 className="serif text-2xl">Summary</h2>
          <div className="mt-7 flex justify-between text-sm"><span className="text-[#746960]">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
          <div className="mt-3 flex justify-between gap-4 text-xs text-[#746960]"><span>Delivery</span><span>Confirmed separately</span></div>
          <div className="mt-6 flex justify-between border-t border-[#e4dbcf] pt-5"><span className="font-semibold">Estimated subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
          <p className="mt-5 text-xs leading-6 text-[#746960]">This concept does not accept payment or place real orders. Prices and availability must be verified with the brand.</p>
          <Link href="/checkout" className="btn mt-7 w-full">Review enquiry</Link>
          <Link href="/shop" className="mt-4 block text-center text-xs font-semibold uppercase tracking-widest text-[#805a46]">Continue shopping</Link>
        </aside>
      </div>
    </main>
  );
}
