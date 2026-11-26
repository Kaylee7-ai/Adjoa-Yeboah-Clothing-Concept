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
    title: `${product.name} | Adjoa Yeboah Clothing`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  const image = product.images[0] ?? "/images/product-placeholder.jpg";

  return (
    <main className="product-page min-h-screen bg-[var(--color-ivory)]">
      <div className="relative mx-auto max-w-[1100px]">
        <div className="product-page-image">
          <img src={image} alt={`Concept preview for ${product.name}`} className="h-full w-full object-cover object-top" />
          <Link href="/shop" aria-label="Back to shop" className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/95 text-lg shadow-sm">←</Link>
          <span className="absolute bottom-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-white">Studio concept image</span>
        </div>
        <section className="product-detail-sheet">
          <p className="eyebrow">{product.category}</p>
          <h1 className="mt-2 font-display text-4xl leading-[1.08] tracking-[-.04em] sm:text-5xl">{product.name}</h1>
          {product.fulfillment === "ready-to-wear" ? (
            <p className="mt-3 text-lg font-semibold">{formatPrice(product.price)}</p>
          ) : (
            <p className="mt-3 text-sm font-medium text-[var(--color-muted)]">Bespoke · Price shared after your design consultation</p>
          )}
          <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">{product.description}</p>
          <div className="mt-7">
            <AddToBagButton product={product} />
          </div>
          <div className="mt-8 grid gap-4 border-t border-[var(--color-line)] pt-6 sm:grid-cols-2">
            <div><p className="eyebrow">Fabric</p><p className="mt-1 text-sm capitalize">{product.fabrics.join(", ") || "To be confirmed"}</p></div>
            <div><p className="eyebrow">Fit & care</p><p className="mt-1 text-sm text-[var(--color-muted)]">Final fit and care instructions to be confirmed with the studio.</p></div>
          </div>
          <Link href="https://wa.me/233241224404" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium underline underline-offset-4">Not sure of your size? Ask on WhatsApp</Link>
          <p className="mt-5 text-[10px] leading-5 text-[var(--color-muted)]">Product photos, prices, fabrics, colours, stock and specifications are dummy catalogue data to be confirmed with the owner.</p>
        </section>
      </div>
      {related.length > 0 && (
        <section className="wrap py-10">
          <div className="mb-5 flex items-end justify-between"><div><p className="eyebrow">MORE TO DISCOVER</p><h2 className="mt-1 font-display text-3xl">You may also like</h2></div><Link href="/shop" className="text-xs font-semibold">Shop all →</Link></div>
          <div className="product-grid">{related.map((item) => <article key={item.id} className="product-card"><Link href={`/shop/${item.slug}`}><img className="product-image" src={item.images[0]} alt={`Concept image for ${item.name}`} /><h3>{item.name}</h3></Link><p>{item.category}</p>{item.fulfillment === "ready-to-wear" && <p className="price">{formatPrice(item.price)}</p>}</article>)}</div>
        </section>
      )}
    </main>
  );
}
