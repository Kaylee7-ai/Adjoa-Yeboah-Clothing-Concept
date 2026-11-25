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
  | "cotton";

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
  leadTimeDays?: number; // mainly for bespoke
  sizes?: string[];
  tags?: string[];
}

/**
 * Temporary compatibility type for the original concept catalogue.
 * Migrate these records to Product before removing this type.
 */
export type LegacyFulfilment = "READY_TO_WEAR" | "BESPOKE";
export type LegacyProduct = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  fabric: string[];
  occasions: string[];
  priceGhs: number;
  image: string;
  fulfilment: LegacyFulfilment;
  featured?: boolean;
  available: boolean;
  sizes?: string[];
};
