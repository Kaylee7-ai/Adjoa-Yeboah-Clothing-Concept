import type { Product } from "@/types/product";

// DUMMY catalogue. The remote editorial photos are temporary stock placeholders; replace with owner-approved Ghanaian campaign photos. Product descriptions, photos, garment availability, stock,
// colours, sizes, prices and production details must all be confirmed by the owner.
export const products: Product[] = [
  {
    id: "ayc-001",
    slug: "royal-ember-kente-corset-gown",
    name: "The Royal Ember Kente Corset Gown",
    description: "A handwoven Kente corset gown in bold amber, green and gold, with a sculpted bodice and puff sleeves. A striking choice for traditional weddings, red carpets and high-profile celebrations.",
    price: 1000,
    images: ["https://ayc.fashion/image/cache/catalog/products/WhatsApp%20Image%202024-07-12%20at%204.21.39%20PM-518x560.jpeg"],
    category: "Occasion Wear",
    fulfillment: "ready-to-wear",
    fabrics: ["kente"],
    occasions: ["traditional", "gala"],
    colors: [{ name: "Gold", hex: "#C69749" }, { name: "Ivory", hex: "#F3EBDD" }],
    sizeType: "women",
    isFeatured: true,
    tags: ["bridal", "kente", "bespoke"],
  },
  {
    id: "ayc-002",
    slug: "classic-afrocentric-kaftan",
    name: "Classic Afrocentric Kaftan",
    description: "A relaxed, refined kaftan cut from richly textured brocade, finished with considered embroidery for polished day-to-evening dressing.",
    price: 1850,
    images: ["https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85"],
    category: "Menswear",
    fulfillment: "ready-to-wear",
    fabrics: ["brocade", "cotton"],
    occasions: ["engagement", "gala", "corporate", "traditional"],
    sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    sizeType: "men",
    stockBySize: { S: 4, M: 2, L: 5, XL: 3, XXL: 0, XXXL: 1 },
    colors: [{ name: "Espresso", hex: "#34251F" }, { name: "Ivory", hex: "#F3EBDD" }, { name: "Emerald", hex: "#0F7B5F" }],
    isFeatured: true,
    tags: ["kaftan", "occasion", "ready-to-wear"],
  },
  {
    id: "ayc-003",
    slug: "emerald-ankara-fitted-gown",
    name: "Emerald Ankara Fitted Gown",
    description: "A tailored Ankara occasion gown with a clean fitted silhouette, complementary lace detailing and subtle hand-finished embellishment.",
    price: 1650,
    compareAtPrice: 1900,
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"],
    category: "Occasion Wear",
    fulfillment: "ready-to-wear",
    fabrics: ["ankara", "lace"],
    occasions: ["gala", "engagement", "traditional"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    sizeType: "women",
    stockBySize: { XS: 1, S: 3, M: 2, L: 0, XL: 1, XXL: 0 },
    colors: [{ name: "Emerald", hex: "#0F7B5F" }, { name: "Burgundy", hex: "#8C1D40" }],
    isNew: true,
    tags: ["ankara", "gown", "ready-to-wear"],
  },
  {
    id: "ayc-004",
    slug: "ivory-luxe-set",
    name: "Ivory Luxe Set",
    description: "An all-white two-piece with intricate lace accents and soft fringe detailing, designed for all-white events, church services, naming ceremonies and elegant brunch dates.",
    price: 1500,
    images: ["https://ayc.fashion/image/cache/catalog/women/dresses/bespoke/49-518x560.jpg"],
    category: "Occasion Wear",
    fulfillment: "ready-to-wear",
    fabrics: ["lace"],
    occasions: ["everyday", "traditional"],
    sizeType: "women",
    colors: [{ name: "Ivory", hex: "#F3EBDD" }, { name: "White", hex: "#FFFFFF" }],
    tags: ["christening", "bespoke"],
  },
  {
    id: "ayc-005",
    slug: "gold-brocade-agbada-set",
    name: "Gold Brocade Agbada Set",
    description: "A statement three-piece agbada concept in lustrous brocade, tailored with a generous flowing outer robe and coordinated traditional pieces.",
    price: 3800,
    images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85"],
    category: "Menswear",
    fulfillment: "bespoke",
    fabrics: ["brocade", "cotton"],
    occasions: ["traditional", "gala", "engagement"],
    colors: [{ name: "Gold", hex: "#C69749" }, { name: "Royal Blue", hex: "#1E3FA8" }],
    sizeType: "men",
    tags: ["agbada", "menswear", "bespoke"],
  },
  {
    id: "ayc-006",
    slug: "midnight-kente-corset-dress",
    name: "Midnight Kente Corset Dress",
    description: "A dramatic evening dress combining deep-toned Kente panels with a structured corset-inspired bodice and a sculptural flowing skirt.",
    price: 3200,
    images: ["https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"],
    category: "Occasion Wear",
    fulfillment: "bespoke",
    fabrics: ["kente", "satin"],
    occasions: ["gala", "engagement", "traditional"],
    colors: [{ name: "Black", hex: "#181512" }, { name: "Gold", hex: "#C69749" }],
    sizeType: "women",
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
