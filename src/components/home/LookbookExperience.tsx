"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/types/product";

const looks = [
  { title: "The Ceremony Edit", note: "A considered pairing for meaningful celebrations.", ids: ["ayc-001", "ayc-004"] },
  { title: "The Modern Occasion", note: "Expressive textile and a quietly tailored silhouette.", ids: ["ayc-003", "ayc-002"] },
  { title: "After-Dark Statement", note: "Sculptural evening dressing with a confident finish.", ids: ["ayc-006", "ayc-005"] },
];

function PieceAction({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const sizes = product.fulfillment === "ready-to-wear" ? product.sizes ?? [] : [];
  const color = product.colors?.[0]?.name ?? "As pictured";

  return (
    <div className="lookbook-piece-action">
      {sizes.length > 0 && (
        <label className="sr-only" htmlFor={`look-size-${product.id}`}>Choose size for {product.name}</label>
      )}
      {sizes.length > 0 && (
        <select id={`look-size-${product.id}`} className="field lookbook-size" value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="">Choose size</option>
          {sizes.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      )}
      <button
        type="button"
        className="btn lookbook-add"
        disabled={sizes.length > 0 && !size}
        onClick={() => addItem(product, 1, size || undefined, undefined, color)}
      >
        Add piece to bag
      </button>
    </div>
  );
}

export default function LookbookExperience() {
  return (
    <div className="lookbook-edits">
      {looks.map((look, index) => {
        const pieces = look.ids.map((id) => products.find((product) => product.id === id)).filter((product): product is Product => Boolean(product));
        const heroPiece = pieces[0];
        if (!heroPiece) return null;
        return (
          <section className="lookbook-edit" key={look.title}>
            <div className="lookbook-edit-heading">
              <p className="eyebrow">LOOK {String(index + 1).padStart(2, "0")} · THE EDIT</p>
              <h2 className="serif">{look.title}</h2>
              <p>{look.note}</p>
            </div>
            <div className="lookbook-edit-grid">
              <article className="lookbook-feature">
                <img src={heroPiece.images[0] ?? "/images/product-placeholder.jpg"} alt={`Illustrative concept image for ${heroPiece.name}`} loading="lazy" />
                <div className="lookbook-piece-copy">
                  <div><p className="eyebrow">THE HERO PIECE</p><h3 className="serif">{heroPiece.name}</h3><p>{formatPrice(heroPiece.price)}</p></div>
                  <PieceAction product={heroPiece} />
                </div>
              </article>
              <div className="lookbook-companions">
                {pieces.slice(1).map((product) => (
                  <article className="lookbook-companion" key={product.id}>
                    <img src={product.images[0] ?? "/images/product-placeholder.jpg"} alt={`Illustrative concept image for ${product.name}`} loading="lazy" />
                    <div className="lookbook-piece-copy">
                      <div><p className="eyebrow">COMPLETE THE LOOK</p><h3 className="serif">{product.name}</h3><p>{formatPrice(product.price)}</p></div>
                      <PieceAction product={product} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}
      <p className="lookbook-disclaimer">Lookbook imagery and product pairings are illustrative catalogue concepts. Confirm current availability, fabric details and final pricing with the atelier.</p>
    </div>
  );
}
