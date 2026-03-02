import type { DealProduct, DealSort, Product, ProductSort } from "./types";

export function sortProducts(products: Product[], sort: ProductSort): Product[] {
  const sortedProducts = [...products];

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort((left, right) => left.price - right.price);
    case "price-desc":
      return sortedProducts.sort((left, right) => right.price - left.price);
    case "rating-desc":
      return sortedProducts.sort((left, right) => right.rating.rate - left.rating.rate);
    case "featured":
    default:
      return sortedProducts.sort((left, right) => right.rating.count - left.rating.count);
  }
}

export function sortDealProducts(products: DealProduct[], sort: DealSort): DealProduct[] {
  const sortedProducts = [...products];

  switch (sort) {
    case "price-asc":
      return sortedProducts.sort((left, right) => left.dealPrice - right.dealPrice);
    case "price-desc":
      return sortedProducts.sort((left, right) => right.dealPrice - left.dealPrice);
    case "discount-desc":
    default:
      return sortedProducts.sort((left, right) => right.discountPercent - left.discountPercent);
  }
}

export function formatCategoryLabel(category: string): string {
  return category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
