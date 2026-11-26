import type { Product } from "@/types/product";

// Independent concept catalogue. Prices are illustrative Accra-market estimates;
// confirm every price, specification, lead time and image with the fashion house
// before presenting these as live offers.
export const products: Product[] = [
  {
    id: "ayc-001",
    slug: "royal-kente-bridal-gown",
    name: "Royal Kente Bridal Gown",
    description:
      "A made-to-measure bridal statement pairing handwoven Ghanaian Kente accents with delicate lace, a structured bodice and a flowing ceremonial skirt.",
    price: 8500,
    images: ["/images/products/royal-kente-bridal-1.jpg"],
    category: "Bridal",
    fulfillment: "bespoke",
    fabrics: ["kente", "lace", "organza"],
    occasions: ["bridal", "traditional"],
    leadTimeDays: 42,
    isFeatured: true,
    tags: ["bridal", "kente", "bespoke"],
  },
  {
    id: "ayc-002",
    slug: "classic-afrocentric-kaftan",
    name: "Classic Afrocentric Kaftan",
    description:
      "A relaxed, refined kaftan cut from richly textured brocade, finished with considered embroidery for polished day-to-evening dressing.",
    price: 1850,
    images: ["/images/products/afrocentric-kaftan-1.jpg"],
    category: "Occasion Wear",
    fulfillment: "ready-to-wear",
    fabrics: ["brocade", "cotton"],
    occasions: ["engagement", "gala", "corporate", "traditional"],
    sizes: ["S", "M", "L", "XL"],
    isFeatured: true,
    tags: ["kaftan", "occasion", "ready-to-wear"],
  },
  {
    id: "ayc-003",
    slug: "emerald-ankara-fitted-gown",
    name: "Emerald Ankara Fitted Gown",
    description:
      "A tailored Ankara occasion gown with a clean fitted silhouette, complementary lace detailing and subtle hand-finished embellishment.",
    price: 1650,
    compareAtPrice: 1900,
    images: ["/images/products/emerald-ankara-1.jpg"],
    category: "Occasion Wear",
    fulfillment: "ready-to-wear",
    fabrics: ["ankara", "lace"],
    occasions: ["gala", "engagement", "traditional"],
    sizes: ["S", "M", "L"],
    isNew: true,
    tags: ["ankara", "gown", "ready-to-wear"],
  },
  {
    id: "ayc-004",
    slug: "white-lace-christening-set",
    name: "White Lace Christening Outfit",
    description:
      "A delicate made-to-measure christening ensemble in soft white lace and cotton, designed with gentle finishing for a meaningful family celebration.",
    price: 1200,
    images: ["/images/products/christening-lace-1.jpg"],
    category: "Christening",
    fulfillment: "bespoke",
    fabrics: ["lace", "cotton", "organza"],
    occasions: ["christening"],
    leadTimeDays: 21,
    tags: ["christening", "bespoke"],
  },
  {
    id: "ayc-005",
    slug: "gold-brocade-agbada-set",
    name: "Gold Brocade Agbada Set",
    description:
      "A statement three-piece agbada concept in lustrous brocade, tailored with a generous flowing outer robe and coordinated traditional pieces.",
    price: 3800,
    images: ["/images/products/gold-agbada-1.jpg"],
    category: "Menswear",
    fulfillment: "bespoke",
    fabrics: ["brocade", "cotton"],
    occasions: ["traditional", "gala", "engagement"],
    leadTimeDays: 28,
    tags: ["agbada", "menswear", "bespoke"],
  },
  {
    id: "ayc-006",
    slug: "midnight-kente-corset-dress",
    name: "Midnight Kente Corset Dress",
    description:
      "A dramatic evening dress combining deep-toned Kente panels with a structured corset-inspired bodice and a sculptural flowing skirt.",
    price: 3200,
    images: ["/images/products/midnight-kente-1.jpg"],
    category: "Occasion Wear",
    fulfillment: "bespoke",
    fabrics: ["kente", "satin"],
    occasions: ["gala", "engagement", "traditional"],
    leadTimeDays: 35,
    isFeatured: true,
    tags: ["kente", "corset", "bespoke"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return getProductBySlug(slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.isFeatured);
}

export function getProductsByOccasion(occasion: string): Product[] {
  return products.filter((product) =>
    product.occasions.includes(occasion as Product["occasions"][number])
  );
}
