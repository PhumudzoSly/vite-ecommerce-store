export const BASE_URL = "https://fakestoreapi.com";

export const API_ENDPOINTS = {
  products: `${BASE_URL}/products`,
  categories: `${BASE_URL}/products/categories`,
  category: (name: string) => `${BASE_URL}/products/category/${name}`,
};

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
