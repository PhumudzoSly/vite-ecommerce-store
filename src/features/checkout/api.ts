import {
  API_ENDPOINTS,
  type FakeStoreCart,
  type FakeStoreCartProduct,
  type FakeStoreLoginResponse,
  type FakeStoreUser,
} from "@/api/constants";

export interface CreateCartPayload {
  userId: number;
  date: string;
  products: FakeStoreCartProduct[];
}

interface LoginPayload {
  username: string;
  password: string;
}

async function requestJson<TResponse>(
  url: string,
  init?: RequestInit,
): Promise<TResponse> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<TResponse>;
}

export async function fetchUsers(): Promise<FakeStoreUser[]> {
  return requestJson<FakeStoreUser[]>(API_ENDPOINTS.users);
}

export async function createCart(payload: CreateCartPayload): Promise<FakeStoreCart> {
  return requestJson<FakeStoreCart>(API_ENDPOINTS.carts, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: LoginPayload): Promise<FakeStoreLoginResponse> {
  return requestJson<FakeStoreLoginResponse>(API_ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
