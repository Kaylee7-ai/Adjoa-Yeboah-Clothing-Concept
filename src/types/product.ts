export type FulfillmentType = "ready-to-wear" | "bespoke";

export type Occasion =
  | "bridal"
  | "traditional"
  | "engagement"
  | "gala"
  | "christening"
  | "corporate"
  | "everyday";

export type Fabric =
  | "kente"
  | "ankara"
  | "lace"
  | "brocade"
  | "silk"
  | "chiffon"
  | "organza"
  | "cotton"
  | "satin";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // in GHS
  compareAtPrice?: number;
  images: string[];
  category: string;
  occasions: Occasion[];
  fabrics: Fabric[];
  fulfillment: FulfillmentType;
  isFeatured?: boolean;
  isNew?: boolean;
  leadTimeDays?: number;
  sizes?: string[];
  colors?: string[];
  tags?: string[];
}
