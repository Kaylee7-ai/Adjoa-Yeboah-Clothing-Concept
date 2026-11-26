"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Search, ShoppingBag, UserRound } from "lucide-react";
import { useCart } from "@/context/CartContext";

const ITEMS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/explore", label: "Explore", Icon: Search },
  { href: "/wishlist", label: "Saved", Icon: Heart },
  { href: "/cart", label: "Bag", Icon: ShoppingBag },
  { href: "/profile", label: "Profile", Icon: UserRound },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();\n\n  if (pathname.startsWith("/shop/")) return null;

  return (
    <nav aria-label="Main app navigation" className="ay-bottom-nav md:hidden">
      {ITEMS.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} aria-current={active ? "page" : undefined} aria-label={label} className="ay-bottom-nav-link">
            <span className={`ay-bottom-nav-icon ${active ? "is-active" : ""}`}>
              <Icon size={19} strokeWidth={active ? 2.1 : 1.7} />
              {href === "/cart" && totalItems > 0 && <span className="ay-nav-count">{totalItems > 99 ? "99+" : totalItems}</span>}
            </span>
            <span className="ay-bottom-nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
