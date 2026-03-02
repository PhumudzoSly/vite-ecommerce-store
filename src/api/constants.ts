export const BASE_URL = "https://fakestoreapi.com";

export const API_ENDPOINTS = {
  products: `${BASE_URL}/products`,
  product: (id: number) => `${BASE_URL}/products/${id}`,
  categories: `${BASE_URL}/products/categories`,
  category: (name: string) => `${BASE_URL}/products/category/${name}`,
  carts: `${BASE_URL}/carts`,
  cart: (id: number) => `${BASE_URL}/carts/${id}`,
  users: `${BASE_URL}/users`,
  user: (id: number) => `${BASE_URL}/users/${id}`,
  login: `${BASE_URL}/auth/login`,
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

export interface FakeStoreCartProduct {
  productId: number;
  quantity: number;
}

export interface FakeStoreCart {
  id: number;
  userId: number;
  date: string;
  products: FakeStoreCartProduct[];
}

export interface FakeStoreUserAddress {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation: {
    lat: string;
    long: string;
  };
}

export interface FakeStoreUser {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: FakeStoreUserAddress;
  phone: string;
}

export interface FakeStoreLoginResponse {
  token: string;
}
