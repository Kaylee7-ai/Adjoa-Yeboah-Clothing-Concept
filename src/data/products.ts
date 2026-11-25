import type { Product } from "@/types/product";

// Concept catalogue data supplied for the redesign. Confirm descriptions, fabrics,
// prices, lead times, availability and photography with the brand before publication.
export const products: Product[] = [
  {
    id: "ayc-001",
    slug: "royal-kente-bridal-gown",
    name: "Royal Kente Bridal Gown",
    description: "A majestic hand-woven Kente bridal gown with intricate gold embroidery and structured bodice. Designed for the modern Ghanaian bride who wants heritage and elegance in one piece.",
    price: 4500,
    images: ["/images/products/royal-kente-bridal-1.jpg"],
    category: "Bridal",
    occasions: ["bridal", "traditional"],
    fabrics: ["kente", "lace"],
    fulfillment: "bespoke",
    isFeatured: true,
    leadTimeDays: 42,
    tags: ["bridal", "kente", "signature"],
  },
  {
    id: "ayc-002",
    slug: "classic-afrocentric-kaftan",
    name: "Classic Afrocentric Kaftan",
    description: "Flowing embroidered kaftan in rich brocade. Perfect for engagement ceremonies, church events and formal gatherings.",
    price: 1850,
    images: ["/images/products/afrocentric-kaftan-1.jpg"],
    category: "Occasion Wear",
    occasions: ["engagement", "gala", "corporate"],
    fabrics: ["brocade"],
    fulfillment: "ready-to-wear",
    isFeatured: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "ayc-003",
    slug: "emerald-ankara-fitted-gown",
    name: "Emerald Ankara Fitted Gown",
    description: "Sleek, body-conscious Ankara gown with subtle beadwork. Ideal for receptions and evening events.",
    price: 1650,
    compareAtPrice: 1900,
    images: ["/images/products/emerald-ankara-1.jpg"],
    category: "Occasion Wear",
    occasions: ["gala", "engagement"],
    fabrics: ["ankara", "lace"],
    fulfillment: "ready-to-wear",
    isNew: true,
    sizes: ["S", "M", "L"],
  },
  {
    id: "ayc-004",
    slug: "white-lace-christening-set",
    name: "White Lace Christening Set",
    description: "Delicate white lace ensemble with soft sparkle details. Designed for baby’s christening and special family moments.",
    price: 980,
    images: ["/images/products/christening-lace-1.jpg"],
    category: "Occasion Wear",
    occasions: ["christening"],
    fabrics: ["lace"],
    fulfillment: "bespoke",
    leadTimeDays: 21,
  },
  {
    id: "ayc-005",
    slug: "gold-brocade-agbada-set",
    name: "Gold Brocade Agbada Set",
    description: "Premium men’s agbada in rich gold brocade. Fully tailored for traditional ceremonies and formal events.",
    price: 3200,
    images: ["/images/products/gold-agbada-1.jpg"],
    category: "Menswear",
    occasions: ["traditional", "gala"],
    fabrics: ["brocade"],
    fulfillment: "bespoke",
    leadTimeDays: 28,
  },
  {
    id: "ayc-006",
    slug: "midnight-kente-corset-dress",
    name: "Midnight Kente Corset Dress",
    description: "Dramatic dark Kente dress with structured corset and dramatic train. A statement piece for evening galas.",
    price: 2750,
    images: ["/images/products/midnight-kente-1.jpg"],
    category: "Occasion Wear",
    occasions: ["gala", "engagement"],
    fabrics: ["kente"],
    fulfillment: "bespoke",
    isFeatured: true,
    leadTimeDays: 35,
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
