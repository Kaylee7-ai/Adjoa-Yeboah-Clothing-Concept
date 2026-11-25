"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/formatPrice";

export default function CheckoutPage() {
  const { cart, subtotal, totalItems } = useCart();

  if (totalItems === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-[#0c0a09]">
        <p className="text-stone-400 tracking-widest uppercase text-sm mb-4">
          Your bag is empty
        </p>
        <Link
          href="/shop"
          className="text-amber-100 border-b border-amber-200/40 pb-1 hover:border-amber-200 transition"
        >
          Return to the collection
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-[#0c0a09] min-h-screen">
      <div className="border-b border-stone-800/80">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="font-serif text-xl tracking-wide text-amber-50">
            Adjoa Yeboah
          </Link>
          <Link href="/cart" className="text-sm text-stone-400 hover:text-amber-200 transition">
            ← Back to bag
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7 space-y-12">
            <header>
              <p className="text-amber-200/60 tracking-[0.3em] uppercase text-xs mb-3">
                Order enquiry
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-amber-50 leading-tight">
                Your selection
              </h1>
              <p className="text-stone-400 text-sm leading-6 mt-5 max-w-xl">
                You’re one step closer to your chosen pieces. This independent
                website concept is not the official brand store, and checkout
                has not been activated.
              </p>
            </header>

            <section className="space-y-5">
              <h2 className="text-amber-100/90 text-sm tracking-widest uppercase">
                Contact
              </h2>
              <div className="border border-stone-800 bg-stone-900/30 p-6 sm:p-7">
                <p className="text-amber-50 font-medium">Contact details are not collected here</p>
                <p className="text-stone-400 text-sm leading-6 mt-2">
                  No name, email address or phone number is requested or stored
                  on this demonstration page. Verified business contact details
                  and an approved enquiry process must be added before launch.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-amber-100/90 text-sm tracking-widest uppercase">
                Delivery
              </h2>
              <div className="space-y-3">
                <div className="w-full text-left p-5 border border-stone-800 bg-stone-900/20">
                  <p className="text-amber-50 font-medium">Collection or delivery</p>
                  <p className="text-stone-400 text-sm mt-1 leading-6">
                    Available fulfilment methods, collection location, coverage
                    and fees must be confirmed by the brand before orders can be accepted.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-amber-100/90 text-sm tracking-widest uppercase">
                Payment
              </h2>
              <div className="border border-stone-800 bg-stone-900/30 p-6 sm:p-7">
                <p className="text-amber-50 font-medium">Payments are not enabled</p>
                <p className="text-stone-400 text-sm leading-6 mt-2">
                  Mobile Money, card and in-person payment options will only be
                  displayed after the business confirms its accepted methods
                  and a secure payment or order workflow is configured.
                </p>
              </div>
            </section>

            <div className="pt-2">
              <div
                aria-disabled="true"
                className="w-full py-5 bg-stone-700/60 text-stone-300 text-center text-xs tracking-[0.2em] uppercase cursor-not-allowed"
              >
                Checkout not yet available
              </div>
              <p className="text-center text-stone-500 text-xs mt-5 leading-5">
                No order is placed and no payment or personal information is
                submitted from this page.
              </p>
              <Link
                href="/cart"
                className="mt-6 inline-flex w-full justify-center border border-amber-100/40 py-4 text-amber-100 text-xs tracking-widest uppercase hover:bg-amber-100 hover:text-[#0c0a09] transition"
              >
                Return to shopping bag
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="border border-stone-800/80 bg-stone-900/30 p-7 sm:p-8">
                <h2 className="text-amber-50 text-sm tracking-widest uppercase mb-8">
                  Order summary
                </h2>

                <div className="space-y-6 mb-8">
                  {cart.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size ?? "standard"}`}
                      className="flex gap-5"
                    >
                      <div
                        className="w-20 h-24 bg-stone-800/80 border border-stone-700/60 flex-shrink-0 flex items-center justify-center"
                        aria-label="Product image not yet supplied"
                      >
                        <span className="text-[10px] text-stone-500 text-center px-2">
                          Image pending
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-stone-100 text-sm leading-snug">
                          {item.product.name}
                        </p>
                        <p className="text-stone-500 text-xs mt-1">
                          {item.product.fulfillment === "bespoke"
                            ? "Bespoke"
                            : "Ready to Wear"}
                          {item.size ? ` · ${item.size}` : ""}
                        </p>
                        {item.notes && (
                          <p className="text-stone-500 text-xs mt-1">
                            Special request added
                          </p>
                        )}
                        <div className="flex justify-between items-center mt-3 gap-3">
                          <span className="text-stone-400 text-xs">
                            Qty {item.quantity}
                          </span>
                          <span className="text-amber-100 text-sm whitespace-nowrap">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-800 pt-6 space-y-3">
                  <div className="flex justify-between text-sm text-stone-400">
                    <span>
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-400">
                    <span>Delivery</span>
                    <span>To be confirmed</span>
                  </div>
                </div>

                <div className="border-t border-stone-800 mt-6 pt-6 flex justify-between items-end gap-4">
                  <span className="text-amber-50 tracking-wide">Estimated subtotal</span>
                  <span className="font-serif text-2xl text-amber-50 whitespace-nowrap">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="mt-5 text-xs leading-5 text-stone-500">
                  Product information and displayed prices are unverified
                  concept content. Delivery charges and the final payable
                  amount have not been calculated.
                </p>
              </div>

              <p className="mt-7 text-stone-500 text-xs leading-relaxed">
                Product details, fulfilment arrangements and all business
                information must be approved by the brand before this concept
                can be used to accept real orders.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
