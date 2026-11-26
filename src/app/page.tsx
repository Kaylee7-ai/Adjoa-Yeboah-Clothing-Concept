"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Bell, BriefcaseBusiness, ChevronRight, SlidersHorizontal, Search, ShoppingBag } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/context/CartContext";
import { products, getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/formatPrice";

const categories = [
  { name: "Women", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80", href: "/shop?department=women" },
  { name: "Men", image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=300&q=80", href: "/shop?department=men" },
  { name: "Children", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80", href: "/shop?department=children" },
  { name: "Bridal", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", href: "/bridal" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=300&q=80", href: "/shop?category=accessories" },
  { name: "Custom Sew", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=300&q=80", href: "/design-your-outfit" },
];

export default function HomePage() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const [search, setSearch] = useState("");
  const featured = useMemo(() => {
    const source = getFeaturedProducts().length ? getFeaturedProducts() : products;
    return source.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);
  const firstName = user?.name.trim().split(/\s+/)[0];

  return (
    <main className="wrap pb-12">
      <section className="flex items-center justify-between gap-3 py-5">
        <div className="min-w-0">
          <p className="text-xs text-[var(--color-muted)]">{firstName ? "Welcome back," : "Good day,"}</p>
          <h1 className="mt-0.5 truncate font-body text-xl font-semibold">{firstName ?? "Fashion lover"} <span aria-hidden="true">✦</span></h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/profile" className="round-icon-button" aria-label="Notifications and account"><Bell size={18} /></Link>
          <Link href="/cart" className="round-icon-button relative" aria-label={`Shopping bag, ${totalItems} items`}><ShoppingBag size={18} />{totalItems > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--color-champagne)] px-1 text-[9px] font-bold">{totalItems}</span>}</Link>
        </div>
      </section>

      <form action="/shop" className="flex items-center gap-2">
        <label className="flex min-h-[50px] min-w-0 flex-1 items-center gap-3 rounded-full border border-[var(--color-line)] bg-white px-4 shadow-sm">
          <Search size={18} className="shrink-0 text-[var(--color-muted)]" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search dresses, kaftans, fabrics" aria-label="Search products" className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#9A9188]" />
        </label>
        <Link href="/shop" className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-2xl bg-[var(--color-espresso)] text-white" aria-label="Browse filters"><SlidersHorizontal size={18} /></Link>
      </form>

      <section className="mt-6" aria-label="Shop categories">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Link href={category.href} key={category.name} className="flex w-[64px] shrink-0 flex-col items-center gap-2 text-center">
              <span className="h-[58px] w-[58px] overflow-hidden rounded-full border border-[var(--color-line)] bg-[var(--color-sand)]">
                <img src={category.image} alt="" className="h-full w-full object-cover object-top" onError={(event) => { event.currentTarget.style.visibility = "hidden"; }} />
              </span>
              <span className="text-[10px] font-medium leading-tight">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="home-hero-banner">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" alt="Kente-inspired Ghanaian bridal fashion concept" className="home-hero-image" />
          <div className="home-hero-shade" />
          <div className="home-hero-copy">
            <p className="text-[10px] font-bold tracking-[.24em] text-white/80">NEW SEASON</p>
            <h2 className="mt-2 max-w-[270px] font-display text-4xl leading-[1.04] text-white">The Kente Edit</h2>
            <Link href="/shop" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-xs font-semibold text-[var(--color-espresso)]">Shop now <span className="ml-2">→</span></Link>
          </div>
        </div>
      </section>

      <Link href="/design-your-outfit" className="mt-5 flex items-center justify-between gap-4 rounded-[22px] border border-[var(--color-line)] bg-[var(--color-sand)] p-5 transition hover:shadow-[var(--shadow-card)]">
        <div className="min-w-0">
          <p className="eyebrow">MADE JUST FOR YOU</p>
          <h2 className="mt-2 font-display text-2xl leading-tight">Design your own outfit.</h2>
          <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">Sewn to your measurements in Accra.</p>
          <span className="mt-3 inline-flex min-h-10 items-center rounded-full bg-[var(--color-espresso)] px-4 text-[10px] font-semibold uppercase tracking-wider text-white">Start designing <ChevronRight size={14} className="ml-1" /></span>
        </div>
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-white text-[var(--color-champagne)]"><BriefcaseBusiness size={26} strokeWidth={1.4} /></span>
      </Link>

      <section className="mt-9">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div><p className="eyebrow">THE EDIT</p><h2 className="mt-1 font-display text-3xl">Trending now</h2></div>
          <Link href="/shop" className="text-xs font-semibold text-[var(--color-muted)]">See all →</Link>
        </div>
        {search && <p className="mb-3 text-xs text-[var(--color-muted)]">{featured.length} matching styles</p>}
        {featured.length ? <div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <p className="rounded-2xl border border-[var(--color-line)] bg-white p-5 text-sm text-[var(--color-muted)]">No styles match that search yet.</p>}
      </section>

      <div className="mt-10 rounded-[22px] bg-[var(--color-espresso)] px-6 py-8 text-center text-white">
        <p className="eyebrow !text-white/60">THE ACCRA ATELIER</p>
        <h2 className="mt-2 font-display text-3xl text-white">A moment made yours.</h2>
        <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-white/65">Visit the studio or start a bespoke conversation.</p>
        <Link href="/book-appointment" className="btn btn-outline mt-5 min-h-11 border-white/30 bg-transparent !text-white hover:!bg-white/10">Book a fitting</Link>
      </div>
      <p className="mt-5 text-center text-[10px] leading-5 text-[var(--color-muted)]">Concept catalogue · GHS prices and product details are illustrative and to be confirmed.</p>
    </main>
  );
}
