import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import AddToBagButton from "@/components/product/AddToBagButton";

interface Props { params: Promise<{ slug: string }> }
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.description } : { title: "Product not found" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params; const product = getProductBySlug(slug); if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 3);
  return (
    <main className="product-detail-page wrap py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-[#746960]"><Link href="/shop" className="hover:text-[#9a675b]">Shop</Link><span className="mx-2">/</span><span>{product.name}</span></nav>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div><div className="aspect-[4/5] overflow-hidden bg-[#eee6dc]"><img src={product.images[0]} alt={`Editorial concept image for ${product.name}`} className="h-full w-full object-cover" /></div><p className="mt-3 text-xs leading-5 text-[#746960]">Editorial placeholder image for this independent concept. Brand-approved product photography is required before launch.</p></div>
        <div className="lg:pt-7">
          <p className="eyebrow">{product.category} · {product.fulfillment === "bespoke" ? "Bespoke" : "Ready to wear"}</p>
          <h1 className="serif mt-4 text-4xl leading-tight md:text-5xl">{product.name}</h1>
          <p className="mt-6 text-xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-7 text-sm leading-7 text-[#62564e]">{product.description}</p>
          {product.leadTimeDays ? <p className="mt-5 text-xs text-[#805a46]">Indicative production time: {product.leadTimeDays} days · confirm with the brand.</p> : null}
          <div className="mt-9"><AddToBagButton product={product} /></div>
          <div className="mt-9 space-y-4 border-t border-[#e4dbcf] pt-7 text-sm"><div className="flex justify-between gap-4"><span className="text-[#746960]">Fabric</span><span className="text-right capitalize">{product.fabrics.join(", ")}</span></div><div className="flex justify-between gap-4"><span className="text-[#746960]">Occasion</span><span className="text-right capitalize">{product.occasions.join(", ")}</span></div></div>
          <p className="mt-8 border-t border-[#e4dbcf] pt-6 text-xs leading-6 text-[#746960]">Independent website concept, not the official brand store. Product images, prices, fabrics, lead times and availability are illustrative and require brand approval. Adding an item to the bag does not place an order or take payment.</p>
        </div>
      </div>
      {related.length > 0 && <section className="mt-24"><h2 className="serif mb-8 text-3xl">You may also like</h2><div className="product-grid">{related.map((item) => <Link key={item.id} href={`/shop/${item.slug}`} className="group"><div className="overflow-hidden bg-[#eee6dc]"><img src={item.images[0]} alt="" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" /></div><h3 className="serif mt-4 text-lg group-hover:text-[#9a675b]">{item.name}</h3><p className="mt-2 text-sm">{formatPrice(item.price)}</p></Link>)}</div></section>}
    </main>
  );
}
