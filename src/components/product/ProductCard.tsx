import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] ?? "/images/product-placeholder.jpg";

  return (
    <article className="product-card">
      <Link href={`/shop/${product.slug}`}>
        <img
          className="product-image"
          src={image}
          alt={`Concept image for ${product.name}`}
        />
        <h3>{product.name}</h3>
      </Link>
      <p>
        {product.fulfillment === "bespoke"
          ? "Made-to-measure enquiry"
          : "Ready-to-wear · confirm availability"}{" "}
        · {product.category}
      </p>
      <div className="price">{formatPrice(product.price)}</div>
      {product.compareAtPrice ? (
        <p className="text-xs text-[#77736b] line-through">
          {formatPrice(product.compareAtPrice)}
        </p>
      ) : null}
      {product.isNew ? <span className="eyebrow">New</span> : null}
    </article>
  );
}
