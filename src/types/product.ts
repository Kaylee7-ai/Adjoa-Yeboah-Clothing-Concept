export type Fulfilment = "READY_TO_WEAR" | "BESPOKE";
export type Product = {
  id: string; slug: string; name: string; description: string; category: string;
  fabric: string[]; occasions: string[]; priceGhs: number; image: string;
  fulfilment: Fulfilment; featured?: boolean; available: boolean;
  sizes?: string[];
};
