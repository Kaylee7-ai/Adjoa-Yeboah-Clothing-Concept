export type FulfillmentType = "ready-to-wear" | "bespoke";
export type ProductSizeType = "women" | "men" | "children" | "one-size";

export type Occasion =
  | "bridal" | "traditional" | "engagement" | "gala"
  | "christening" | "corporate" | "everyday";

export type Fabric =
  | "kente" | "ankara" | "lace" | "brocade" | "silk"
  | "chiffon" | "organza" | "cotton" | "satin";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // DUMMY GHS price, to be confirmed with the owner.
  compareAtPrice?: number;
  images: string[];
  category: string;
  occasions: Occasion[];
  fabrics: Fabric[];
  fulfillment: FulfillmentType;
  isFeatured?: boolean;
  isNew?: boolean;
  leadTimeDays?: number; // DUMMY lead time, to be confirmed with the owner.
  sizes?: string[];
  colors?: ProductColor[];
  sizeType?: ProductSizeType;
  stockBySize?: Record<string, number>;
  tags?: string[];
}
