import Link from "next/link";
import Hero from "@/components/home/Hero";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  return (
    <main className="home-page">
      <Hero />
      <section className="luxury-manifesto wrap section text-center">
        <p className="eyebrow">MORE THAN WHAT YOU WEAR</p>
        <h2 className="section-title mt-4">Fashion is a feeling.<br /><em>Make yours unforgettable.</em></h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#746960]">A wardrobe concept inspired by contemporary African fashion, expressive textiles and beautifully considered occasionwear.</p>
      </section>
      <section className="luxury-collection bg-[#f0e9df]">
        <div className="wrap section">
          <div className="mb-9 flex items-end justify-between gap-4">
            <div><p className="eyebrow">A FEW PIECES TO DISCOVER</p><h2 className="section-title mt-3">Selected styles</h2></div>
            <Link className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-[#805a46] underline underline-offset-4" href="/shop">View all ↗</Link>
          </div>
          <div className="product-grid">{featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>
      <section className="luxury-cta bg-[#30251f] px-5 py-20 text-center text-[#fffaf3] md:py-24">
        <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e8c9ac]">BESPOKE · BRIDAL · OCCASION</p>
        <h2 className="serif mt-5 text-4xl md:text-6xl">A moment made <em className="text-[#e8c9ac]">yours.</em></h2>
        <Link className="mt-8 inline-flex min-h-12 items-center justify-center border border-[#f5e9dc] px-7 text-[10px] font-bold uppercase tracking-widest text-[#fffaf3] transition hover:bg-[#fffaf3] hover:text-[#30251f]" href="/book-appointment">Book a consultation ↗</Link>
      </section>
    </main>
  );
}
