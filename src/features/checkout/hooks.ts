import { useMutation, useQuery } from "@tanstack/react-query";
import { createCart, fetchUsers, loginUser, type CreateCartPayload } from "./api";

interface LoginPayload {
  username: string;
  password: string;
}

export function useFakeStoreUsers() {
  return useQuery({
    queryKey: ["checkout", "users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 10,
  });
}

export function useCreateFakeStoreCart() {
  return useMutation({
    mutationFn: (payload: CreateCartPayload) => createCart(payload),
  });
}

export function useFakeStoreLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
  });
}
