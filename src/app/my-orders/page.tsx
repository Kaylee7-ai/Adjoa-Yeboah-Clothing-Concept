import Link from "next/link";

export default function MyOrdersPage() {
  return (
    <main className="min-h-screen bg-[#0c0a09] px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-200/60">
          Client account
        </p>
        <h1 className="mb-5 font-serif text-3xl text-amber-50 md:text-4xl">
          My Orders
        </h1>
        <p className="mb-10 max-w-2xl leading-7 text-stone-400">
          Your order history will appear here once customer accounts and the
          secure order database are connected.
        </p>

        <section
          aria-labelledby="orders-status"
          className="border border-stone-800 bg-stone-900/30 p-7 sm:p-9"
        >
          <h2 id="orders-status" className="text-sm font-medium uppercase tracking-widest text-amber-100">
            Order history unavailable
          </h2>
          <p className="mt-4 text-sm leading-7 text-stone-400">
            This independent website concept does not currently sign customers
            in or retrieve real orders. No sample orders or payment statuses
            are displayed, so this page will not give a misleading impression
            that a purchase has been made.
          </p>
          <p className="mt-4 text-xs leading-6 text-stone-500">
            Account access will be added after the business approves the
            customer-account workflow and secure authentication and database
            services are configured.
          </p>
        </section>

        <div className="mt-9 flex flex-wrap gap-6">
          <Link
            href="/shop"
            className="border-b border-amber-200/40 pb-1 text-sm text-amber-100 transition hover:border-amber-200"
          >
            Explore the collection
          </Link>
          <Link
            href="/track-order"
            className="border-b border-stone-600 pb-1 text-sm text-stone-300 transition hover:border-amber-200 hover:text-amber-100"
          >
            Order tracking preview
          </Link>
        </div>
      </div>
    </main>
  );
}
