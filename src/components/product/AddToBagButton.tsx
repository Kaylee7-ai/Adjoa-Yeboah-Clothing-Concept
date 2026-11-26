"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Heart, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";\nimport { useSaved } from "@/context/SavedContext";

const SIZE_SETS = {
  women: ["XS", "S", "M", "L", "XL", "XXL"],
  men: ["S", "M", "L", "XL", "XXL", "XXXL"],
  children: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
  "one-size": ["One size"],
};

export default function AddToBagButton({ product }: { product: Product }) {
  const { addItem } = useCart();\n  const { isSaved, toggleSaved } = useSaved();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const saved = isSaved(product.id);

  const colors = product.colors ?? [];
  const sizes = product.sizes?.length ? product.sizes : product.sizeType ? SIZE_SETS[product.sizeType] : [];
  const needsSize = product.fulfillment === "ready-to-wear" && sizes.length > 0;
  const needsColor = colors.length > 0;
  const selectedColorName = colors.find((color) => color.name === selectedColor)?.name;

  function handleAdd() {
    if ((needsSize && !selectedSize) || (needsColor && !selectedColor)) return;
    addItem(product, 1, selectedSize || undefined, undefined, selectedColor || undefined);
    setShowToast(true);
    setShowCelebration(true);
    window.setTimeout(() => setShowToast(false), 5000);
  }

  if (product.fulfillment === "bespoke") {
    return (
      <div className="space-y-3">
        <Link href={`/design-your-outfit?garment=${encodeURIComponent(product.name)}`} className="btn flex min-h-[54px] w-full">Request this in bespoke <span aria-hidden="true">→</span></Link>
        <p className="text-center text-xs text-[var(--color-muted)]">Quote first · The studio confirms your price after reviewing your design.</p>
      </div>
    );
  }

  return (
    <div className="product-options">
      {showToast && (
        <div role="status" className="product-toast">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15"><Check size={17} /></span>
          <span className="min-w-0 flex-1"><strong className="block text-sm">Added to bag</strong><small className="block truncate text-white/65">{product.name}</small></span>
          <Link href="/cart" className="min-h-11 inline-flex items-center text-xs font-semibold underline underline-offset-4">View Bag</Link>
          <button type="button" onClick={() => setShowToast(false)} aria-label="Dismiss notification" className="grid h-9 w-9 place-items-center"><X size={16} /></button>
        </div>
      )}

      {needsColor && (
        <fieldset className="mb-6">
          <div className="mb-3 flex items-center justify-between gap-3"><legend className="text-sm font-semibold">Colour</legend><span className="text-xs text-[var(--color-muted)]">{selectedColorName ?? "Choose a colour"}</span></div>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button key={color.name} type="button" onClick={() => setSelectedColor(color.name)} aria-label={color.name} aria-pressed={selectedColor === color.name} className={`color-swatch ${selectedColor === color.name ? "is-selected" : ""}`} style={{ backgroundColor: color.hex }} />
            ))}
          </div>
        </fieldset>
      )}

      {needsSize && (
        <fieldset className="mb-6">
          <div className="mb-3 flex items-center justify-between gap-3"><legend className="text-sm font-semibold">Size</legend><Link href="/size-guide" className="text-xs font-medium underline underline-offset-4">Size guide</Link></div>
          <div className="grid grid-cols-6 gap-2">
            {sizes.map((size) => {
              const stock = product.stockBySize?.[size];
              const unavailable = stock === 0;
              return (
                <button key={size} type="button" disabled={unavailable} onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`size-choice ${selectedSize === size ? "is-selected" : ""} ${unavailable ? "is-unavailable" : ""}`}>
                  {size}
                </button>
              );
            })}
          </div>
          {selectedSize && (product.stockBySize?.[selectedSize] ?? 99) > 0 && (product.stockBySize?.[selectedSize] ?? 99) <= 3 && <p className="mt-2 text-xs font-semibold text-[var(--color-burgundy)]">Only {product.stockBySize?.[selectedSize]} left in this size</p>}
        </fieldset>
      )}

      <div className="product-sticky-action">
        <button type="button" onClick={() => toggleSaved(product.id)} aria-label={saved ? "Remove from saved items" : "Save item"} aria-pressed={saved} className="round-icon-button h-12 w-12"><Heart size={19} fill={saved ? "currentColor" : "none"} /></button>
        <button type="button" onClick={handleAdd} disabled={(needsSize && !selectedSize) || (needsColor && !selectedColor)} className="btn min-h-[52px] flex-1 disabled:cursor-not-allowed disabled:opacity-45">
          {needsSize && !selectedSize ? "Please choose your size" : needsColor && !selectedColor ? "Choose a colour" : `Add to Bag · ${formatPrice(product.price)}`}
        </button>
      </div>

      {showCelebration && (
        <div className="celebration-backdrop" role="dialog" aria-modal="true" aria-labelledby="added-title">
          <div className="celebration-card">
            <button type="button" onClick={() => setShowCelebration(false)} aria-label="Close confirmation" className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[var(--color-sand)]"><X size={18} /></button>
            <div className="petal-burst" aria-hidden="true"><span>✦</span><span>✧</span><span>✦</span><span>✧</span><span>✦</span><span>✧</span></div>
            <p className="eyebrow">CONGRATULATIONS!</p>
            <h2 id="added-title" className="mt-3 font-display text-3xl leading-tight">You’ve added<br /><em>{product.name}</em></h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">Your selection is waiting in your bag.</p>
            <Link href="/cart" className="btn mt-7 min-h-[52px] w-full">Continue to checkout</Link>
            <button type="button" onClick={() => setShowCelebration(false)} className="btn btn-outline mt-3 min-h-[50px] w-full">Keep shopping</button>
          </div>
        </div>
      )}
    </div>
  );
}
