"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, UserRound } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import BrandLogo from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/design-your-outfit", label: "Bespoke" },
  { href: "/bridal", label: "Bridal" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/book-appointment", label: "Book Fitting" },
];

const MOBILE_LINKS = [
  ...NAV_LINKS,
  { href: "/about", label: "About" },
  { href: "/wishlist", label: "Saved" },
  { href: "/profile", label: "Account" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  const closeMobileMenu = () => setMobileOpen(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className="ay-header fixed inset-x-0 top-0 z-40 border-b border-[var(--color-line)] bg-[rgba(250,247,242,.94)] backdrop-blur-xl"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-10" style={{ minHeight: "var(--header-height)" }}>
        <BrandLogo onClick={closeMobileMenu} />
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={`min-h-11 inline-flex items-center text-[11px] font-semibold uppercase tracking-[.14em] transition-colors hover:text-[var(--color-champagne)] ${isActive(link.href) ? "text-[var(--color-champagne)]" : "text-[var(--color-muted)]"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Link href="/profile" aria-label="Your account" className="round-icon-button hidden sm:inline-grid">
            <UserRound size={17} strokeWidth={1.7} />
          </Link>
          <Link href="/cart" aria-label={totalItems ? `Shopping bag, ${totalItems} items` : "Shopping bag"} className="round-icon-button relative">
            <ShoppingBag size={17} strokeWidth={1.7} />
            {totalItems > 0 && <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[var(--color-champagne)] px-1 text-[10px] font-bold text-[#181512]">{totalItems}</span>}
          </Link>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} className="round-icon-button md:hidden" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}>
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <>
          <button aria-label="Close menu" className="fixed inset-0 z-40 bg-black/25 md:hidden" onClick={closeMobileMenu} />
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-var(--header-height))] overflow-y-auto rounded-b-[24px] border-t border-[var(--color-line)] bg-[var(--color-ivory)] px-5 py-4 shadow-[var(--shadow-soft)] md:hidden">
            <ul className="m-0 flex list-none flex-col p-0">
              {MOBILE_LINKS.map((link) => (
                <li key={link.href} className="border-b border-[var(--color-line)] last:border-0">
                  <Link href={link.href} onClick={closeMobileMenu} className={`flex min-h-[52px] items-center justify-between text-sm font-medium ${isActive(link.href) ? "text-[var(--color-champagne)]" : "text-[var(--color-espresso)]"}`}>
                    {link.label}<span aria-hidden="true" className="text-[var(--color-muted)]">↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}

export { Header };
