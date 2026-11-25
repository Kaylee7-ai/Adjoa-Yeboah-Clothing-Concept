import Link from "next/link";
import Hero from "@/components/home/Hero";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="wrap section text-center">
        <p className="eyebrow">MORE THAN WHAT YOU WEAR</p>
        <h2 className="section-title">Fashion is a feeling.<br /><em>Make yours unforgettable.</em></h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#77736b]">
          Explore a wardrobe concept inspired by contemporary African fashion, expressive prints and occasionwear.
        </p>
      </section>

      <section className="bg-[#eeeae2]">
        <div className="wrap section">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="eyebrow">A FEW PIECES TO DISCOVER</p>
              <h2 className="section-title">Selected styles</h2>
            </div>
            <Link className="text-xs uppercase tracking-wider underline" href="/shop">View all ↗</Link>
          </div>
          <div className="product-grid">
            {products.filter((product) => product.featured).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#25231f] px-5 py-20 text-center text-white">
        <p className="eyebrow">BESPOKE · BRIDAL · OCCASION</p>
        <h2 className="serif text-4xl md:text-6xl">A moment made <em className="text-[#c9a77a]">yours.</em></h2>
        <Link className="btn mt-8" href="/book-appointment">Book a consultation ↗</Link>
      </section>
    </main>
  );
}
