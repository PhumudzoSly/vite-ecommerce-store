import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { Product } from "@/features/product";
import type { CartItem } from "./types";

const CART_STORAGE_KEY = "wamly-cart-v1";

interface CartContextValue {
  items: CartItem[];
  distinctItems: number;
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  updateItemQuantityByDelta: (productId: number, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadInitialCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored) as CartItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => item && typeof item.id === "number" && item.quantity > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>(loadInitialCartItems);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    if (quantity <= 0) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...currentItems, { ...product, quantity }];
      }

      return currentItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }, []);

  const updateItemQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => (item.id === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const updateItemQuantityByDelta = useCallback(
    (productId: number, delta: number) => {
      setItems((currentItems) => {
        const targetItem = currentItems.find((item) => item.id === productId);

        if (!targetItem) {
          return currentItems;
        }

        const nextQuantity = targetItem.quantity + delta;

        if (nextQuantity <= 0) {
          return currentItems.filter((item) => item.id !== productId);
        }

        return currentItems.map((item) =>
          item.id === productId ? { ...item, quantity: nextQuantity } : item,
        );
      });
    },
    [],
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      distinctItems: items.length,
      totalItems,
      subtotal,
      addItem,
      removeItem,
      updateItemQuantity,
      updateItemQuantityByDelta,
      clearCart,
    };
  }, [items, addItem, removeItem, updateItemQuantity, updateItemQuantityByDelta, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
