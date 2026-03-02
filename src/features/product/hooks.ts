import { useQuery } from "@tanstack/react-query";
import {
  fetchDealProducts,
  fetchProductCategories,
  fetchProducts,
  fetchProductsByCategory,
} from "./api";
import type { DealProduct, Product } from "./types";

interface UseProductsOptions {
  category?: string;
  limit?: number;
}

export function useProducts(options: UseProductsOptions = {}) {
  const { category, limit } = options;

  return useQuery<Product[]>({
    queryKey: ["products", { category: category ?? "all", limit: limit ?? "all" }],
    queryFn: () => {
      if (category) {
        return fetchProductsByCategory(category);
      }

      return fetchProducts(limit);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useFeaturedProducts(limit = 8) {
  return useQuery<Product[]>({
    queryKey: ["products", "featured", limit],
    queryFn: async () => {
      const products = await fetchProducts();

      return [...products]
        .sort((left, right) => {
          const leftScore = left.rating.rate * Math.log(left.rating.count + 1);
          const rightScore = right.rating.rate * Math.log(right.rating.count + 1);
          return rightScore - leftScore;
        })
        .slice(0, limit);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useDealProducts(limit = 12, category?: string) {
  return useQuery<DealProduct[]>({
    queryKey: ["products", "deals", { category: category ?? "all", limit }],
    queryFn: () => fetchDealProducts(limit, category),
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductCategories() {
  return useQuery<string[]>({
    queryKey: ["products", "categories"],
    queryFn: fetchProductCategories,
    staleTime: 1000 * 60 * 30,
  });
}
