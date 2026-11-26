import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--color-line)] bg-[var(--color-sand)]">
      <div className="wrap py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--color-muted)]">
              Ready-to-wear style and thoughtful bespoke design, made with an Accra point of view.
            </p>
          </div>
          <div>
            <h2 className="eyebrow mb-4">Discover</h2>
            <ul className="space-y-3 text-sm text-[var(--color-muted)]">
              <li><Link href="/shop" className="hover:text-[var(--color-espresso)]">Shop all</Link></li>
              <li><Link href="/bridal" className="hover:text-[var(--color-espresso)]">Bridal</Link></li>
              <li><Link href="/lookbook" className="hover:text-[var(--color-espresso)]">Lookbook</Link></li>
              <li><Link href="/explore" className="hover:text-[var(--color-espresso)]">Explore</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4">Made for you</h2>
            <ul className="space-y-3 text-sm text-[var(--color-muted)]">
              <li><Link href="/design-your-outfit" className="hover:text-[var(--color-espresso)]">Design your outfit</Link></li>
              <li><Link href="/book-appointment" className="hover:text-[var(--color-espresso)]">Book a fitting</Link></li>
              <li><Link href="/size-guide" className="hover:text-[var(--color-espresso)]">Size guide</Link></li>
              <li><Link href="/profile" className="hover:text-[var(--color-espresso)]">Your account</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-4">The studio</h2>
            <p className="text-sm leading-6 text-[var(--color-muted)]">1 Levites Avenue<br />Accra, Ghana</p>
            <a className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4" href="https://wa.me/233241224404">WhatsApp the studio</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Adjoa Yeboah Clothing.</p>
          <p>Accra, Ghana · GHS</p>
        </div>
      </div>
    </footer>
  );
}
