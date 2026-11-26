"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const closeMenu = () => setMobileOpen(false);
  const links = [
    { href: "/shop", label: "Shop" },
    { href: "/bridal", label: "Bridal" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/book-appointment", label: "Book a fitting" },
  ];

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-7 md:h-[78px]">
        <Link href="/" onClick={closeMenu} className="serif text-xl tracking-[.02em] sm:text-2xl">
          Adjoa Yeboah
          <span className="mt-0.5 block font-sans text-[8px] font-semibold tracking-[.34em] text-[#8b6a50]">CLOTHING</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[.17em] md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="transition-colors">{link.label}</Link>)}
        </nav>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/wishlist" className="hidden text-[10px] font-semibold uppercase tracking-widest sm:block">Wishlist</Link>
          <Link href="/cart" className="relative inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest" aria-label={totalItems ? `Shopping bag, ${totalItems} items` : "Shopping bag"}>
            Bag <span className="inline-flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#8e6654] px-1 text-[9px] text-white">{totalItems}</span>
          </Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="rounded-sm border border-[#d7cabe] px-3 py-2 text-[9px] font-bold uppercase tracking-widest md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-[#e4dbcf] bg-[#f8f5ef] px-6 py-5 shadow-lg md:hidden">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={closeMenu} className="block border-b border-[#e9e1d7] py-4 text-xs font-semibold uppercase tracking-widest last:border-0">{link.label}</Link>)}
          <Link href="/about" onClick={closeMenu} className="block py-4 text-xs font-semibold uppercase tracking-widest">About</Link>
        </nav>
      )}
    </header>
  );
}

export { Header };
