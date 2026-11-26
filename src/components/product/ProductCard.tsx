import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] ?? "/images/product-placeholder.jpg";
  return (
    <article className="product-card">
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="image-frame">
          <img className="product-image" src={image} alt={`Editorial concept image for ${product.name}`} loading="lazy" />
          <span className="absolute bottom-3 left-3 bg-[#fffaf3]/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-[#59483b]">
            {product.fulfillment === "bespoke" ? "Bespoke" : "Ready to wear"}
          </span>
        </div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="transition-colors group-hover:text-[#9a675b]">{product.name}</h3>
          {product.isNew ? <span className="mt-4 shrink-0 text-[9px] font-bold uppercase tracking-widest text-[#98675d]">New</span> : null}
        </div>
        <p className="product-meta">{product.category}</p>
        <div className="price">{formatPrice(product.price)}</div>
        <p className="card-link">Discover piece <span aria-hidden="true">↗</span></p>
      </Link>
    </article>
  );
}
