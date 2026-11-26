"use client";

import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleTrack(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Order tracking is not connected yet. No details have been sent or stored. Please check back after the official order system is configured."
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0a09] px-6 py-24">
      <div className="mx-auto max-w-xl">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-amber-200/60">
          Client care
        </p>
        <h1 className="mb-4 text-center font-serif text-4xl text-amber-50">
          Track Your Order
        </h1>
        <p className="mb-12 text-center leading-7 text-stone-400">
          This independent storefront concept does not yet have a live order
          management system. The form below is a visual preview only.
        </p>

        <form onSubmit={handleTrack} className="space-y-7">
          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-widest text-stone-400">
              Order number
            </span>
            <input
              type="text"
              autoComplete="off"
              placeholder="Enter your order number"
              value={orderNumber}
              onChange={(event) => {
                setOrderNumber(event.target.value);
                setMessage("");
              }}
              className="w-full border-b border-stone-700 bg-transparent py-3 text-stone-100 placeholder:text-stone-600 focus:border-amber-400/60 focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-xs uppercase tracking-widest text-stone-400">
              Email address
            </span>
            <input
              type="email"
              autoComplete="off"
              placeholder="Email used for the order"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              className="w-full border-b border-stone-700 bg-transparent py-3 text-stone-100 placeholder:text-stone-600 focus:border-amber-400/60 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={!orderNumber.trim() || !email.trim()}
            className="w-full bg-stone-700/70 py-4 text-sm uppercase tracking-widest text-stone-300 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Preview tracking
          </button>
        </form>

        {message && (
          <p role="status" className="mt-8 border border-stone-800 bg-stone-900/40 p-5 text-sm leading-6 text-amber-100">
            {message}
          </p>
        )}

        <p className="mt-8 text-center text-xs leading-6 text-stone-500">
          Do not enter real customer information here. Tracking will only be
          enabled after the business approves the workflow and the secure
          database-backed order system is ready.
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/shop"
            className="border-b border-amber-200/40 pb-1 text-sm text-amber-100 transition hover:border-amber-200"
          >
            Return to the collection
          </Link>
        </div>
      </div>
    </main>
  );
}
