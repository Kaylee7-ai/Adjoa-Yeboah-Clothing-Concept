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
      {needsSize && <fieldset className="mb-7"><legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#746960]">Select size</legend><div className="flex flex-wrap gap-2">{sizes.map((size) => <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} className={`min-h-11 min-w-11 border px-3 text-xs transition ${selectedSize === size ? "border-[#30251f] bg-[#30251f] text-white" : "border-[#d9cfc3] bg-[#fffdf9] text-[#30251f] hover:border-[#9b7560]"}`}>{size}</button>)}</div></fieldset>}
      <button type="button" onClick={handleAdd} disabled={needsSize && !selectedSize} className="btn w-full disabled:cursor-not-allowed disabled:opacity-50">{added ? "Added to bag ✓" : needsSize && !selectedSize ? "Choose a size to continue" : "Add to bag"}</button>
      <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-[#6d775f]">{added ? "Added to your bag. Your selection is saved on this device." : ""}</p>
      <p className="mt-2 text-center text-[10px] leading-5 text-[#746960]">Adding to bag does not place an order or take payment.</p>
    </div>
  );
}
