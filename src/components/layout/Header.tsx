"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import BrandLogo from "@/components/BrandLogo";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-espresso)]/95 backdrop-blur-md border-b border-[var(--color-champagne)]/25">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-20">
        <BrandLogo onClick={closeMobileMenu} light />

        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase text-stone-300"
        >
          <Link href="/shop" className="hover:text-amber-200 transition">Shop</Link>
          <Link href="/design-your-outfit" className="hover:text-amber-200 transition">Bespoke</Link>
          <Link href="/bridal" className="hover:text-amber-200 transition">Bridal</Link>
          <Link href="/lookbook" className="hover:text-amber-200 transition">Lookbook</Link>
          <Link href="/book-appointment" className="hover:text-amber-200 transition">Book Fitting</Link>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/profile" className="hidden sm:inline text-stone-400 hover:text-amber-200 transition text-sm">Account</Link>
          <Link
            href="/wishlist"
            className="hidden sm:inline text-stone-400 hover:text-amber-200 transition text-sm"
          >
            Wishlist
          </Link>
          <Link
            href="/cart"
            className="relative text-stone-300 hover:text-amber-200 transition text-sm"
            aria-label={totalItems > 0 ? `Shopping bag, ${totalItems} items` : "Shopping bag"}
          >
            Bag
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 min-w-4 h-4 px-1 bg-amber-400 text-[#0c0a09] text-[10px] rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden text-stone-300 hover:text-amber-200 transition text-xs uppercase tracking-widest"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="md:hidden bg-[var(--color-espresso)] border-t border-[var(--color-champagne)]/25 px-6 py-8 space-y-6 text-sm tracking-widest uppercase"
        >
          <Link href="/shop" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Shop</Link>
          <Link href="/design-your-outfit" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Design Your Outfit</Link>
          <Link href="/bridal" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Bridal</Link>
          <Link href="/lookbook" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Lookbook</Link>
          <Link href="/book-appointment" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Book Fitting</Link>
          <Link href="/about" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">About</Link>
          <Link href="/wishlist" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Wishlist</Link>
          <Link href="/profile" onClick={closeMobileMenu} className="block text-stone-200 hover:text-amber-200">Account</Link>
        </nav>
      )}
    </header>
  );
}

export { Header };
export default Header;
