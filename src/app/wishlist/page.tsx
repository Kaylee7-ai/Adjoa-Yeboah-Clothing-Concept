"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { useSaved } from "@/context/SavedContext";

export default function WishlistPage() {
  const { savedIds } = useSaved();
  const savedProducts = products.filter((product) => savedIds.includes(product.id));
  return (
    <main className="wrap section min-h-[70vh]">
      <p className="eyebrow">YOUR PERSONAL EDIT</p>
      <h1 className="section-title mt-3">Saved pieces.</h1>
      <p className="mb-7 max-w-lg text-sm leading-6 text-[var(--color-muted)]">Keep the styles you love close. Your saved pieces stay on this device in this demo.</p>
      {savedProducts.length ? <div className="product-grid">{savedProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center"><Heart size={25} className="mx-auto text-[var(--color-champagne)]" /><h2 className="mt-4 font-display text-2xl">Nothing saved just yet.</h2><p className="mt-2 text-sm text-[var(--color-muted)]">Tap the heart on a piece to add it to your edit.</p><Link href="/shop" className="btn mt-6">Explore the collection</Link></div>}
    </main>
  );
}
