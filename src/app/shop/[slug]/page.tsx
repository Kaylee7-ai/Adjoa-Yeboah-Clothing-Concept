import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";
import { AddToWhatsApp } from "@/components/product/AddToWhatsApp";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const image = product.images[0] ?? "/images/product-placeholder.jpg";

  return (
    <main className="wrap section grid gap-12 md:grid-cols-2">
      <img
        className="w-full bg-[#e7e0d5] object-cover"
        src={image}
        alt={`Concept image for ${product.name}`}
      />
      <div className="self-center">
        <p className="eyebrow">THE AYC CONCEPT EDIT</p>
        <h1 className="serif text-4xl md:text-5xl">{product.name}</h1>
        <p className="mt-4 text-lg font-semibold">{formatPrice(product.price)}</p>
        {product.compareAtPrice ? (
          <p className="mt-1 text-sm text-[#77736b] line-through">
            {formatPrice(product.compareAtPrice)}
          </p>
        ) : null}
        <p className="mt-5 text-sm leading-7 text-[#77736b]">{product.description}</p>
        <p className="mt-5 text-xs text-[#77736b]">
          Fulfilment: {product.fulfillment === "bespoke" ? "Bespoke" : "Ready-to-wear"}
        </p>
        <p className="mt-3 text-xs text-[#77736b]">
          Fabrics: {product.fabrics.join(", ")}
        </p>
        {product.leadTimeDays ? (
          <p className="mt-3 text-xs text-[#77736b]">
            Indicative lead time: {product.leadTimeDays} days; confirm with the brand.
          </p>
        ) : null}
        {product.sizes?.length ? (
          <p className="mt-3 text-xs text-[#77736b]">Sizes: {product.sizes.join(", ")}</p>
        ) : null}
        <div className="mt-8">
          <AddToWhatsApp productName={product.name} />
        </div>
        <p className="mt-6 text-[10px] leading-6 text-[#77736b]">
          Concept catalogue content. Images, prices, specifications, lead times and availability
          must be confirmed by the brand. This page does not take payment or confirm an order.
        </p>
      </div>
    </main>
  );
}
