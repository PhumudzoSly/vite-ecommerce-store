import { API_ENDPOINTS, type FakeStoreProduct } from "@/api/constants";
import type { DealProduct, Product } from "./types";

const DEAL_DISCOUNTS = [12, 18, 22, 27, 33];

async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function buildProductsUrl(limit?: number): string {
  const url = new URL(API_ENDPOINTS.products);

  if (typeof limit === "number") {
    url.searchParams.set("limit", String(limit));
  }

  return url.toString();
}

function toProduct(product: FakeStoreProduct): Product {
  return {
    ...product,
  };
}

function toDealProduct(product: Product): DealProduct {
  const discountPercent = DEAL_DISCOUNTS[product.id % DEAL_DISCOUNTS.length];
  const originalPrice = Number(product.price.toFixed(2));
  const dealPrice = Number((product.price * (1 - discountPercent / 100)).toFixed(2));
  const savings = Number((originalPrice - dealPrice).toFixed(2));

  return {
    ...product,
    originalPrice,
    dealPrice,
    discountPercent,
    savings,
  };
}

export async function fetchProducts(limit?: number): Promise<Product[]> {
  const products = await requestJson<FakeStoreProduct[]>(buildProductsUrl(limit));
  return products.map(toProduct);
}

export async function fetchProductCategories(): Promise<string[]> {
  return requestJson<string[]>(API_ENDPOINTS.categories);
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const products = await requestJson<FakeStoreProduct[]>(
    API_ENDPOINTS.category(encodeURIComponent(category)),
  );
  return products.map(toProduct);
}

export async function fetchDealProducts(limit?: number, category?: string): Promise<DealProduct[]> {
  const products = category
    ? await fetchProductsByCategory(category)
    : await fetchProducts(limit);

  return products.map(toDealProduct);
}
