import type { Product } from "@/types/product";

// DUMMY catalogue. Product descriptions, photos, garment availability, stock,
// colours, sizes, prices and production details must all be confirmed by the owner.
export const products: Product[] = [
  {
    id: "ayc-001",
    slug: "royal-kente-bridal-gown",
    name: "Royal Kente Bridal Gown",
    description: "A made-to-measure bridal statement pairing handwoven Ghanaian Kente accents with delicate lace, a structured bodice and a flowing ceremonial skirt.",
    price: 8500,
    images: ["/images/products/royal-kente-bridal-1.jpg"],
    category: "Bridal",
    fulfillment: "bespoke",
    fabrics: ["kente", "lace", "organza"],
    occasions: ["bridal", "traditional"],
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
    images: ["/images/products/afrocentric-kaftan-1.jpg"],
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
    images: ["/images/products/emerald-ankara-1.jpg"],
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
    slug: "white-lace-christening-set",
    name: "White Lace Christening Outfit",
    description: "A delicate made-to-measure christening ensemble in soft white lace and cotton, designed with gentle finishing for a meaningful family celebration.",
    price: 1200,
    images: ["/images/products/christening-lace-1.jpg"],
    category: "Children",
    fulfillment: "bespoke",
    fabrics: ["lace", "cotton", "organza"],
    occasions: ["christening"],
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y", "12Y"],
    sizeType: "children",
    colors: [{ name: "Ivory", hex: "#F3EBDD" }, { name: "White", hex: "#FFFFFF" }],
    tags: ["christening", "bespoke"],
  },
  {
    id: "ayc-005",
    slug: "gold-brocade-agbada-set",
    name: "Gold Brocade Agbada Set",
    description: "A statement three-piece agbada concept in lustrous brocade, tailored with a generous flowing outer robe and coordinated traditional pieces.",
    price: 3800,
    images: ["/images/products/gold-agbada-1.jpg"],
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
    images: ["/images/products/midnight-kente-1.jpg"],
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
