import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer mt-0">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="serif text-2xl text-[#fffaf3]">Adjoa Yeboah</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[.3em] text-[#d4b69a]">Clothing</p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#d7c9bd]">An independent storefront concept celebrating contemporary Ghanaian fashion and considered occasionwear.</p>
          </div>
          <div>
            <h2 className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#e8c9ac]">Explore</h2>
            <ul className="space-y-3 text-sm">{[["Shop","/shop"],["Bridal","/bridal"],["Lookbook","/lookbook"],["About","/about"]].map(([label,href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#e8c9ac]">Client care</h2>
            <ul className="space-y-3 text-sm">{[["Book a fitting","/book-appointment"],["Shopping bag","/cart"],["Wishlist","/wishlist"],["Size guide","/size-guide"]].map(([label,href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
          </div>
          <div>
            <h2 className="mb-5 text-[10px] font-bold uppercase tracking-[.2em] text-[#e8c9ac]">Studio</h2>
            <p className="text-sm leading-7 text-[#e3d6cb]">Accra, Ghana</p>
            <p className="mt-3 text-xs leading-6 text-[#bcaea3]">Verified studio contact details will be added after confirmation by the brand.</p>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-7 text-[10px] leading-5 tracking-wide text-[#c7b8ac] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Adjoa Yeboah Clothing. Independent concept.</p>
          <p>Not the official brand website. Brand approval is required before public launch.</p>
        </div>
      </div>
    </footer>
  );
}
