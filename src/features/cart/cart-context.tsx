import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
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

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "SET_QUANTITY"; productId: number; quantity: number }
  | { type: "UPDATE_DELTA"; productId: number; delta: number }
  | { type: "CLEAR" };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      if (action.quantity <= 0) {
        return state;
      }

      const existingItem = state.find((item) => item.id === action.product.id);

      if (!existingItem) {
        return [...state, { ...action.product, quantity: action.quantity }];
      }

      return state.map((item) =>
        item.id === action.product.id
          ? { ...item, quantity: item.quantity + action.quantity }
          : item,
      );
    }

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.productId);

    case "SET_QUANTITY":
      if (action.quantity <= 0) {
        return state.filter((item) => item.id !== action.productId);
      }

      return state.map((item) =>
        item.id === action.productId ? { ...item, quantity: action.quantity } : item,
      );

    case "UPDATE_DELTA": {
      const targetItem = state.find((item) => item.id === action.productId);

      if (!targetItem) {
        return state;
      }

      const nextQuantity = targetItem.quantity + action.delta;

      if (nextQuantity <= 0) {
        return state.filter((item) => item.id !== action.productId);
      }

      return state.map((item) =>
        item.id === action.productId ? { ...item, quantity: nextQuantity } : item,
      );
    }

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

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
  const [items, dispatch] = useReducer(cartReducer, [], loadInitialCartItems);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", product, quantity });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  }, []);

  const updateItemQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "SET_QUANTITY", productId, quantity });
  }, []);

  const updateItemQuantityByDelta = useCallback(
    (productId: number, delta: number) => {
      dispatch({ type: "UPDATE_DELTA", productId, delta });
    },
    [],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
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
