"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

const FILTERS = ["All", "Ready to wear", "Bespoke", "Bridal", "Menswear", "Occasion Wear", "Children"];

export default function ShopPage() {
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const visible = useMemo(() => products.filter((product) => {
    const haystack = (product.name + " " + product.category + " " + product.fabrics.join(" ")).toLowerCase();
    const matchesSearch = haystack.includes(search.toLowerCase());
    const matchesFilter = active === "All" ||
      (active === "Ready to wear" && product.fulfillment === "ready-to-wear") ||
      (active === "Bespoke" && product.fulfillment === "bespoke") ||
      product.category.toLowerCase() === active.toLowerCase();
    return matchesSearch && matchesFilter;
  }), [active, search]);

  return (
    <main className="wrap min-h-[70vh] pb-12 pt-7">
      <div className="flex items-end justify-between gap-3">
        <div><p className="eyebrow">THE COLLECTION · ACCRA</p><h1 className="mt-2 font-display text-5xl">Shop the edit.</h1><p className="mt-2 text-sm text-[var(--color-muted)]">Ready-to-wear pieces and bespoke inspiration.</p></div>
        <button type="button" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters} aria-label="Toggle filters" className="round-icon-button mb-1"><SlidersHorizontal size={18} /></button>
      </div>
      <label className="mt-6 flex min-h-[50px] items-center gap-3 rounded-full border border-[var(--color-line)] bg-white px-4"><Search size={18} className="text-[var(--color-muted)]" /><input className="w-full bg-transparent text-sm outline-none" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search styles and fabrics" /></label>
      <div className={"mt-5 flex gap-2 overflow-x-auto pb-2 " + (showFilters ? "flex-wrap" : "")} aria-label="Shop categories">{FILTERS.map((filter) => <button key={filter} type="button" onClick={() => setActive(filter)} aria-pressed={active === filter} className={"min-h-10 shrink-0 rounded-full border px-4 text-xs font-medium " + (active === filter ? "border-[var(--color-espresso)] bg-[var(--color-espresso)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-muted)]")}>{filter}</button>)}</div>
      <div className="mb-4 mt-6 flex items-center justify-between gap-3"><p className="text-xs text-[var(--color-muted)]">{visible.length} styles</p><Link href="/design-your-outfit" className="text-xs font-semibold underline">Design bespoke →</Link></div>
      {visible.length ? <div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="rounded-2xl border border-[var(--color-line)] bg-white p-8 text-center"><p className="font-display text-2xl">No pieces found.</p><p className="mt-2 text-sm text-[var(--color-muted)]">Try another search or filter.</p><button type="button" onClick={() => { setActive("All"); setSearch(""); }} className="btn mt-5">Clear filters</button></div>}
      <p className="mt-8 text-center text-[10px] leading-5 text-[var(--color-muted)]">Catalogue photography, stock, colours, prices and garment details are illustrative placeholders to be confirmed by the owner.</p>
    </main>
  );
}
