import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  updatedAt: number;
}
