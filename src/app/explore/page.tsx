"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";

export default function ExplorePage() {
  const [saved, setSaved] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <main className="wrap min-h-[70vh] pb-12 pt-7">
      <div className="flex items-end justify-between gap-3">
        <div><p className="eyebrow">INSPIRATION</p><h1 className="mt-2 font-display text-5xl">Explore</h1><p className="mt-2 text-sm text-[var(--color-muted)]">Ideas, fabrics and silhouettes from the atelier.</p></div>
        <button type="button" onClick={() => setFilterOpen((value) => !value)} aria-expanded={filterOpen} aria-label="Show explore filters" className="round-icon-button mb-1"><SlidersHorizontal size={18} /></button>
      </div>
      {filterOpen && <div className="mt-5 flex flex-wrap gap-2 rounded-2xl bg-white p-4"><span className="eyebrow w-full">Browse inspiration</span>{["All styles", "Bridal", "Kente", "Ankara", "Menswear"].map((item) => <button key={item} type="button" className="rounded-full border border-[var(--color-line)] px-4 py-2 text-xs">{item}</button>)}</div>}
      <div className="explore-masonry mt-7">
        {products.map((product, index) => (
          <article className="explore-tile" key={product.id}>
            <Link href={`/shop/${product.slug}`} className="block overflow-hidden rounded-[18px] bg-[var(--color-sand)]">
              <img src={product.images[0]} alt={`Inspiration: ${product.name}`} className={`w-full object-cover object-top ${index % 3 === 0 ? "aspect-[3/4]" : index % 3 === 1 ? "aspect-[4/5]" : "aspect-[3/5]"}`} onError={(event) => { event.currentTarget.style.opacity = "0"; }} />
            </Link>
            <button type="button" aria-label={saved.includes(product.id) ? `Unsave ${product.name}` : `Save ${product.name}`} aria-pressed={saved.includes(product.id)} onClick={() => setSaved((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} className="explore-heart"><Heart size={17} fill={saved.includes(product.id) ? "currentColor" : "none"} /></button>
            <Link href={`/shop/${product.slug}`} className="mt-2 block text-sm font-medium">{product.name}</Link>
            <p className="text-xs text-[var(--color-muted)]">{product.category}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
