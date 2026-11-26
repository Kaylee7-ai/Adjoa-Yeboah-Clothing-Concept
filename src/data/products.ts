import type { Product } from "@/types/product";

// Editorial reference imagery is illustrative; confirm brand-owned product photography before launch.
// Product imagery, prices, specifications and availability require brand approval.
export const products: Product[] = [
  {
    id: "ayc-001", slug: "royal-kente-bridal-gown", name: "Royal Kente Bridal Gown",
    description: "A made-to-measure bridal statement pairing handwoven Ghanaian Kente accents with delicate lace, a structured bodice and a flowing ceremonial skirt.",
    price: 8500, images: ["https://mgkente.com/cdn/shop/files/d07a8024a2114141a21141c7b6a0fbef85e3-345025663_942930130356316_157920071165388583_n.jpg?v=1696114542"],
    category: "Bridal", fulfillment: "bespoke", fabrics: ["kente", "lace", "organza"], occasions: ["bridal", "traditional"], leadTimeDays: 42, isFeatured: true, tags: ["bridal", "kente", "bespoke"]
  },
  {
    id: "ayc-002", slug: "classic-afrocentric-kaftan", name: "Classic Afrocentric Kaftan",
    description: "A relaxed, refined kaftan cut from richly textured brocade, finished with considered embroidery for polished day-to-evening dressing.",
    price: 1850, images: ["https://flexiafrica.com/cdn/shop/collections/mens-casual-wear-927142.png?v=1772755377"],
    category: "Occasion Wear", fulfillment: "ready-to-wear", fabrics: ["brocade", "cotton"], occasions: ["engagement", "gala", "corporate", "traditional"], sizes: ["S", "M", "L", "XL"], isFeatured: true, tags: ["kaftan", "occasion", "ready-to-wear"]
  },
  {
    id: "ayc-003", slug: "emerald-ankara-fitted-gown", name: "Emerald Ankara Fitted Gown",
    description: "A tailored Ankara occasion gown with a clean fitted silhouette, complementary lace detailing and subtle hand-finished embellishment.",
    price: 1650, compareAtPrice: 1900, images: ["https://www.cumolondon.com/cdn/shop/files/DSC_8738_d15407fa-8c1e-4955-b4ff-fc97e8f1b091.jpg?v=1761215849&width=3900"],
    category: "Occasion Wear", fulfillment: "ready-to-wear", fabrics: ["ankara", "lace"], occasions: ["gala", "engagement", "traditional"], sizes: ["S", "M", "L"], isNew: true, tags: ["ankara", "gown", "ready-to-wear"]
  },
  {
    id: "ayc-004", slug: "white-lace-christening-set", name: "White Lace Christening Outfit",
    description: "A delicate made-to-measure christening ensemble in soft white lace and cotton, designed with gentle finishing for a meaningful family celebration.",
    price: 1200, images: ["https://theglossychic.com/wp-content/uploads/2022/11/Screenshot_2022-11-08-14-00-20-1.png"],
    category: "Christening", fulfillment: "bespoke", fabrics: ["lace", "cotton", "organza"], occasions: ["christening"], leadTimeDays: 21, tags: ["christening", "bespoke"]
  },
  {
    id: "ayc-005", slug: "gold-brocade-agbada-set", name: "Gold Brocade Agbada Set",
    description: "A statement three-piece agbada concept in lustrous brocade, tailored with a generous flowing outer robe and coordinated traditional pieces.",
    price: 3800, images: ["https://flexiafrica.com/cdn/shop/collections/mens-traditional-and-cultural-wear-6535949.png?v=1772579924"],
    category: "Menswear", fulfillment: "bespoke", fabrics: ["brocade", "cotton"], occasions: ["traditional", "gala", "engagement"], leadTimeDays: 28, tags: ["agbada", "menswear", "bespoke"]
  },
  {
    id: "ayc-006", slug: "midnight-kente-corset-dress", name: "Midnight Kente Corset Dress",
    description: "A dramatic evening dress combining deep-toned Kente panels with a structured corset-inspired bodice and a sculptural flowing skirt.",
    price: 3200, images: ["https://styleafrique.com/wp-content/uploads/2025/01/Snapinsta.app_472232199_1620020461972049_9216197605648624256_n_1080-769x960.jpg"],
    category: "Occasion Wear", fulfillment: "bespoke", fabrics: ["kente", "satin"], occasions: ["gala", "engagement", "traditional"], leadTimeDays: 35, isFeatured: true, tags: ["kente", "corset", "bespoke"]
  },
];

export function getProductBySlug(slug: string): Product | undefined { return products.find((product) => product.slug === slug); }
export function getProduct(slug: string): Product | undefined { return getProductBySlug(slug); }
export function getFeaturedProducts(): Product[] { return products.filter((product) => product.isFeatured); }
export function getProductsByOccasion(occasion: string): Product[] {
  return products.filter((product) => product.occasions.includes(occasion as Product["occasions"][number]));
}
