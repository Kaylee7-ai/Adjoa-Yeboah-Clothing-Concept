"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";

export function ProductCard({ product }: { product: Product }) {
  const [saved, setSaved] = useState(false);
  const image = product.images[0] ?? "/images/product-placeholder.jpg";

  return (
    <article className="product-card min-w-0">
      <div className="relative image-zoom">
        <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
          <img className="product-image" src={image} alt={`Concept image for ${product.name}`} loading="lazy" />
        </Link>
        <button type="button" onClick={() => setSaved((value) => !value)} aria-label={saved ? `Unsave ${product.name}` : `Save ${product.name}`} aria-pressed={saved} className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-[var(--color-espresso)] shadow-sm">
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        {product.isNew && <span className="absolute left-2 top-2 rounded-full bg-[var(--color-emerald)] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">New</span>}
      </div>
      <Link href={`/shop/${product.slug}`} className="block min-w-0">
        <h3 title={product.name}>{product.name}</h3>
      </Link>
      <p className="truncate">{product.fulfillment === "bespoke" ? "Bespoke · quote first" : "Ready to wear"} · {product.category}</p>
      {product.fulfillment === "ready-to-wear" ? <div className="price">{formatPrice(product.price)}</div> : <div className="price text-[var(--color-muted)]">Price after consultation</div>}
    </article>
  );
}
