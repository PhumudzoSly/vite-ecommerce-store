export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export interface DealProduct extends Product {
  originalPrice: number;
  dealPrice: number;
  discountPercent: number;
  savings: number;
}

export type ProductSort = "featured" | "price-asc" | "price-desc" | "rating-desc";

export type DealSort = "discount-desc" | "price-asc" | "price-desc";
