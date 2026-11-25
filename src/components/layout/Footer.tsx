import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0c0a09] border-t border-stone-800/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <p className="font-serif text-2xl text-amber-50 mb-4">Adjoa Yeboah</p>
            <p className="text-stone-400 text-sm leading-relaxed">
              An independent website concept exploring a premium Ghanaian fashion storefront.
            </p>
          </div>

          <div>
            <h4 className="text-amber-100/80 text-xs tracking-widest uppercase mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/shop" className="hover:text-amber-200 transition">Shop</Link></li>
              <li><Link href="/bridal" className="hover:text-amber-200 transition">Bridal</Link></li>
              <li><Link href="/lookbook" className="hover:text-amber-200 transition">Lookbook</Link></li>
              <li><Link href="/press" className="hover:text-amber-200 transition">Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-100/80 text-xs tracking-widest uppercase mb-5">Client Care</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><Link href="/book-appointment" className="hover:text-amber-200 transition">Book a Fitting</Link></li>
              <li><Link href="/cart" className="hover:text-amber-200 transition">Shopping Bag</Link></li>
              <li><Link href="/wishlist" className="hover:text-amber-200 transition">Wishlist</Link></li>
              <li><Link href="/about" className="hover:text-amber-200 transition">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-amber-100/80 text-xs tracking-widest uppercase mb-5">Studio</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              Accra, Ghana
            </p>
            <p className="text-stone-500 text-xs mt-4 leading-relaxed">
              Studio address and contact details will be added after confirmation by the brand.
            </p>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500 tracking-wide">
          <p>© {new Date().getFullYear()} Adjoa Yeboah Clothing. Independent concept.</p>
          <p>Not the official brand website. Brand approval is required before public launch.</p>
        </div>
      </div>
    </footer>
  );
}
