import Link from "next/link";
import type { LegacyProduct } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

export function ProductCard({ product }: { product: LegacyProduct }) {
  return (
    <article className="product-card">
      <Link href={`/shop/${product.slug}`}>
        <img
          className="product-image"
          src={product.image}
          alt={`Illustrative fashion image for ${product.name}`}
        />
        <h3>{product.name}</h3>
      </Link>
      <p>
        {product.fulfilment === "BESPOKE"
          ? "Made-to-measure enquiry"
          : "Ready-to-wear concept"}{" "}
        · {product.category}
      </p>
      <div className="price">{formatPrice(product.priceGhs)}</div>
    </article>
  );
}
