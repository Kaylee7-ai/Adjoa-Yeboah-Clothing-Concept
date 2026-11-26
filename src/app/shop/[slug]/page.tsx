import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import AddToBagButton from "@/components/product/AddToBagButton";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | Adjoa Yeboah Clothing Concept`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, 3);
  const image = product.images[0] ?? "/images/product-placeholder.jpg";

  return (
    <main className="min-h-screen bg-[#0c0a09]">
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <nav aria-label="Breadcrumb" className="text-sm text-stone-500">
          <Link href="/shop" className="transition hover:text-amber-200">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-stone-300">{product.name}</span>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="relative aspect-[3/4] overflow-hidden border border-stone-800 bg-stone-900">
              <img src={image} alt={`Concept preview for ${product.name}`} className="h-full w-full object-cover" />
              <span className="absolute bottom-4 left-4 bg-[#0c0a09]/80 px-3 py-2 text-[10px] uppercase tracking-widest text-stone-300">
                Concept catalogue image
              </span>
            </div>
            <p className="mt-3 text-xs leading-5 text-stone-500">
              Product photography must be supplied or approved by the brand before publication.
            </p>
          </div>
          <div className="lg:pt-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-amber-200/70">{product.category}</span>
              <span className="h-1 w-1 rounded-full bg-stone-600" />
              <span className="text-xs uppercase tracking-widest text-stone-400">
                {product.fulfillment === "bespoke" ? "Bespoke" : "Ready to Wear"}
              </span>
            </div>
            <h1 className="font-serif text-3xl leading-tight text-amber-50 md:text-4xl lg:text-5xl">{product.name}</h1>
            <div className="mt-6 flex items-baseline gap-4">
              <span className="text-2xl text-amber-100">{formatPrice(product.price)}</span>
              {product.compareAtPrice ? <span className="text-lg text-stone-500 line-through">{formatPrice(product.compareAtPrice)}</span> : null}
            </div>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-stone-300">{product.description}</p>
            {product.fulfillment === "bespoke" && product.leadTimeDays ? (
              <p className="mt-6 text-sm text-amber-200/80">Indicative production time: {product.leadTimeDays} days; confirm with the brand.</p>
            ) : null}
            {product.fulfillment === "bespoke" ? (
              <div className="mt-8 border border-stone-800 bg-stone-900/40 p-5">
                <p className="text-sm leading-relaxed text-stone-300">
                  This concept listing describes a bespoke piece. Measurements, fitting arrangements,
                  production availability and final details must be confirmed with the brand.
                </p>
              </div>
            ) : null}
            <div className="mt-10"><AddToBagButton product={product} /></div>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/book-appointment" className="flex-1 border border-stone-700 py-4 text-center text-xs uppercase tracking-widest text-stone-300 transition hover:border-amber-400/50 hover:text-amber-100">Book a fitting</Link>
              <Link href="/size-guide" className="flex-1 border border-stone-700 py-4 text-center text-xs uppercase tracking-widest text-stone-300 transition hover:border-amber-400/50 hover:text-amber-100">Size guide</Link>
            </div>
            <div className="mt-14 space-y-4 border-t border-stone-800 pt-10 text-sm">
              <div className="flex justify-between gap-5">
                <span className="text-stone-500">Fabric</span>
                <span className="text-right capitalize text-stone-300">{product.fabrics.join(", ") || "To be confirmed"}</span>
              </div>
              <div className="flex justify-between gap-5">
                <span className="text-stone-500">Occasions</span>
                <span className="text-right capitalize text-stone-300">{product.occasions.join(", ") || "To be confirmed"}</span>
              </div>
              <div className="flex justify-between gap-5">
                <span className="text-stone-500">Origin</span>
                <span className="text-right text-stone-300">To be confirmed by the brand</span>
              </div>
            </div>
            <p className="mt-10 border-t border-stone-800 pt-6 text-xs leading-6 text-stone-500">
              Independent website concept, not the official brand store. Product names, images, prices,
              fabrics, lead times and availability are illustrative and require brand approval.
              Adding an item to the bag does not place an order or take payment.
            </p>
          </div>
        </div>
        {related.length > 0 ? (
          <section className="mt-28">
            <h2 className="mb-10 font-serif text-2xl text-amber-50 md:text-3xl">You may also like</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/shop/${item.slug}`} className="group">
                  <div className="mb-4 aspect-[3/4] overflow-hidden border border-stone-800 bg-stone-900">
                    <img src={item.images[0] ?? "/images/product-placeholder.jpg"} alt={`Concept preview for ${item.name}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="text-sm text-amber-50 transition group-hover:text-amber-200">{item.name}</h3>
                  <p className="mt-1 text-sm text-stone-400">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
