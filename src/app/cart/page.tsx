"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CartPage() {
  const { cart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70 mb-4">Your selection</p>
        <h1 className="font-serif text-3xl text-amber-50 mb-4">Your bag is empty</h1>
        <p className="text-stone-400 mb-8">Discover pieces made for your special moments.</p>
        <Link
          href="/shop"
          className="px-8 py-3 bg-amber-100 text-[#0c0a09] text-sm tracking-widest uppercase hover:bg-amber-200 transition"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70 mb-3">Your selection</p>
      <h1 className="font-serif text-3xl md:text-4xl text-amber-50 mb-10">
        Shopping Bag ({totalItems})
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <section aria-label="Shopping bag items" className="lg:col-span-2 space-y-8">
          {cart.items.map((item) => (
            <article
              key={`${item.product.id}-${item.size ?? "standard"}`}
              className="flex gap-5 sm:gap-6 border-b border-stone-800 pb-8"
            >
              <div className="w-28 h-36 bg-stone-900 flex-shrink-0 overflow-hidden flex items-center justify-center">
                <span className="px-3 text-center text-[10px] uppercase tracking-wider text-stone-500">
                  Product image pending
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-amber-50 font-medium">{item.product.name}</h2>
                    <p className="text-stone-400 text-sm mt-1">
                      {item.product.fulfillment === "bespoke" ? "Bespoke" : "Ready to Wear"}
                      {item.size && ` · Size ${item.size}`}
                    </p>
                    {item.notes && (
                      <p className="text-stone-500 text-xs mt-2">Special request: {item.notes}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="text-stone-500 hover:text-amber-200 text-sm self-start"
                    aria-label={`Remove ${item.product.name} from bag`}
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex items-center border border-stone-700" aria-label={`Quantity for ${item.product.name}`}>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                      className="px-3 py-1 text-stone-300 hover:text-white"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-4 text-sm tabular-nums" aria-live="polite">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                      className="px-3 py-1 text-stone-300 hover:text-white"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-amber-100 whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-stone-900/50 border border-stone-800 p-6 sticky top-24">
            <h2 className="text-lg text-amber-50 mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-300">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-400 gap-4">
                <span>Shipping</span>
                <span className="text-right">Confirmed separately</span>
              </div>
            </div>

            <div className="border-t border-stone-700 mt-6 pt-6 flex justify-between text-amber-50">
              <span>Estimated total</span>
              <span className="text-lg">{formatPrice(subtotal)}</span>
            </div>

            <p className="mt-4 text-xs leading-5 text-stone-500">
              This is a website concept. Prices, availability, delivery and any order must be confirmed with the brand. No payment is taken here.
            </p>

            <Link
              href="/checkout"
              className="mt-8 block w-full text-center py-3.5 bg-amber-100 text-[#0c0a09] text-sm tracking-widest uppercase hover:bg-amber-200 transition"
            >
              Continue to Enquiry
            </Link>

            <Link
              href="/shop"
              className="mt-4 block text-center text-sm text-stone-400 hover:text-amber-200"
            >
              Continue Shopping
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
