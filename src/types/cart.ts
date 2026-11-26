import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  notes?: string; // bespoke measurements / special requests
}

export interface Cart {
  items: CartItem[];
  updatedAt: number;
}
