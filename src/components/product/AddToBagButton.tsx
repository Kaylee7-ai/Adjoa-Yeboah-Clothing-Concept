"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

export default function AddToBagButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("As pictured");
  const sizes = product.fulfillment === "ready-to-wear" ? product.sizes ?? [] : [];
  const needsSize = sizes.length > 0;
  const colors = product.colors ?? ["As pictured"];

  function handleAdd() {
    if (needsSize && !selectedSize) return;
    addItem(product, 1, selectedSize || undefined, undefined, selectedColor);
  }

  return (
    <div>
      {needsSize && <fieldset className="mb-6"><legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#746960]">Select size</legend><div className="flex flex-wrap gap-2">{sizes.map((size) => <button key={size} type="button" aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)} className={`min-h-11 min-w-11 border px-3 text-xs transition ${selectedSize === size ? "border-[#30251f] bg-[#30251f] text-white" : "border-[#d9cfc3] bg-[#fffdf9] text-[#30251f] hover:border-[#9b7560]"}`}>{size}</button>)}</div></fieldset>}
      <fieldset className="mb-7"><legend className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#746960]">Colour / finish</legend><div className="flex flex-wrap gap-2">{colors.map((color) => <button key={color} type="button" aria-pressed={selectedColor === color} onClick={() => setSelectedColor(color)} className={`min-h-10 border px-3 text-xs transition ${selectedColor === color ? "border-[#30251f] bg-[#30251f] text-white" : "border-[#d9cfc3] bg-[#fffdf9] text-[#30251f]"}`}>{color}</button>)}</div></fieldset>
      <button type="button" onClick={handleAdd} disabled={needsSize && !selectedSize} className="btn w-full disabled:cursor-not-allowed disabled:opacity-50">Add to bag</button>
      <p className="mt-3 text-center text-[10px] leading-5 text-[#746960]">A celebration appears when your selection is added. No order or payment is made.</p>
    </div>
  );
}
