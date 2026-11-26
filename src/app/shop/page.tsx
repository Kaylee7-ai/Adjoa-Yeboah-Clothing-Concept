import CollectionBrowser from "@/components/shop/CollectionBrowser";

export const metadata = { title: "Shop the Edit" };

export default function Shop() {
  return (
    <main className="shop-page">
      <section className="bg-[#eee6dc] px-5 py-20 text-center md:py-28">
        <p className="eyebrow">THE COLLECTION</p>
        <h1 className="serif mt-4 text-5xl leading-tight text-[#30251f] sm:text-6xl">Find your <em>signature.</em></h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6d6057]">
          Explore a considered edit of bridal, occasion and contemporary African-inspired pieces.
        </p>
      </section>
      <section className="atelier-promises" aria-label="Atelier service notes"><div><span>01</span><strong>Thoughtful fitting</strong><small>Consultation-led guidance for bespoke pieces.</small></div><div><span>02</span><strong>Clear timelines</strong><small>Production and delivery estimates confirmed before order.</small></div><div><span>03</span><strong>Atelier concierge</strong><small>Ask about fabric, fit and styling before you decide.</small></div></section>
      <section className="wrap section">
        <div className="mb-8 flex flex-col gap-4 border-b border-[#e4dbcf] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">A curated edit</p>
            <h2 className="serif mt-2 text-3xl">Pieces to discover</h2>
          </div>
          <p className="text-xs text-[#746960]">Indicative GHS prices · confirm details before purchase</p>
        </div>
        <CollectionBrowser />
        <p className="mt-12 border-t border-[#e4dbcf] pt-6 text-xs leading-6 text-[#746960]">
          This is an independent website concept. Images are editorial placeholders and do not represent verified products. Prices, specifications and availability require confirmation by the brand.
        </p>
      </section>
    </main>
  );
}
