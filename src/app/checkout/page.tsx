"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

export default function CheckoutPage() {
  const { cart, subtotal, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <p className="text-stone-400 mb-4">Your bag is empty</p>
        <Link href="/shop" className="text-amber-200 underline underline-offset-4">
          Return to shop
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-amber-200/70 mb-3">
        Order enquiry
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-amber-50 mb-5">
        Review your selection
      </h1>
      <p className="max-w-2xl text-sm leading-6 text-stone-400 mb-10">
        This is an independent website concept, not an active checkout. You can review your selected pieces below, but no order, customer details or payment will be submitted or collected here.
      </p>

      <div className="grid lg:grid-cols-5 gap-10">
        <section className="lg:col-span-3">
          <div className="border border-stone-800 bg-stone-900/30 p-6 sm:p-8">
            <h2 className="text-amber-100 text-lg mb-3">Checkout is not yet available</h2>
            <p className="text-sm text-stone-400 leading-6">
              Before this concept can accept orders, the business must approve the website and confirm its contact details, product availability, prices, delivery arrangements, return terms and payment provider. A secure order backend and verified payment integration must also be configured.
            </p>
            <p className="mt-4 text-xs text-stone-500">
              Please do not enter personal or payment information on this demonstration page.
            </p>
            <Link
              href="/cart"
              className="mt-7 inline-flex border border-amber-100/50 px-6 py-3 text-xs uppercase tracking-widest text-amber-100 hover:bg-amber-100 hover:text-[#0c0a09] transition"
            >
              Return to shopping bag
            </Link>
          </div>
        </section>

        <aside className="lg:col-span-2">
          <div className="bg-stone-900/40 border border-stone-800 p-6 sticky top-24">
            <h2 className="text-amber-50 mb-6">Selection summary</h2>
            <div className="space-y-5 mb-6">
              {cart.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size ?? "standard"}`}
                  className="flex justify-between gap-4 text-sm"
                >
                  <div className="min-w-0">
                    <p className="text-stone-200">{item.product.name}</p>
                    <p className="text-stone-500">
                      Qty {item.quantity}
                      {item.size ? ` · Size ${item.size}` : ""}
                    </p>
                    {item.notes && (
                      <p className="text-stone-500 text-xs mt-1">Special request noted</p>
                    )}
                  </div>
                  <p className="text-stone-300 whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-700 pt-4 flex justify-between text-amber-50">
              <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
              <span className="text-lg">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-stone-500">
              Displayed catalogue prices are unverified concept content. Shipping and final totals have not been calculated.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
