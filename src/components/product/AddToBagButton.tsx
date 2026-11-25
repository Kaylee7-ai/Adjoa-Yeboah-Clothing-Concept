"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function AddToBagButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const sizes = product.fulfillment === "ready-to-wear" ? product.sizes ?? [] : [];
  const needsSize = sizes.length > 0;

  function handleAdd() {
    if (needsSize && !selectedSize) return;
    addItem(product, 1, selectedSize || undefined);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div>
      {needsSize && (
        <fieldset className="mb-7">
          <legend className="mb-3 text-sm tracking-wide text-stone-400">Select size</legend>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSize === size}
                onClick={() => setSelectedSize(size)}
                className={`h-12 min-w-12 border px-3 text-sm transition ${
                  selectedSize === size
                    ? "border-amber-300 bg-amber-100 text-[#0c0a09]"
                    : "border-stone-700 text-stone-300 hover:border-amber-300/70 hover:text-amber-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <button
        type="button"
        onClick={handleAdd}
        disabled={needsSize && !selectedSize}
        className="w-full bg-amber-100 py-5 text-xs uppercase tracking-[0.2em] text-[#0c0a09] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {added ? "Added to bag" : needsSize && !selectedSize ? "Select a size to continue" : "Add to bag"}
      </button>
      <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-amber-200/80">
        {added ? "Added to your shopping bag. Your bag is saved on this device." : ""}
      </p>
    </div>
  );
}
