import { IProduct } from "../types";

// Helper function to get 3 products with the least stock
export const getLeastStockProducts = (products: IProduct[], slice: number) => {
  return [...products].sort((a, b) => a.stock - b.stock).slice(0, slice);
};
