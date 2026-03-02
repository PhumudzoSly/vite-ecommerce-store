import type { PropsWithChildren } from "react";
import { act, renderHook } from "@testing-library/react";
import { CartProvider, useCart } from "@/features/cart";
import type { Product } from "@/features/product";

const demoProduct: Product = {
  id: 1,
  title: "Demo Product",
  price: 25,
  description: "Product description",
  category: "electronics",
  image: "https://example.com/image.png",
  rating: {
    rate: 4.5,
    count: 120,
  },
};

function wrapper({ children }: PropsWithChildren) {
  return <CartProvider>{children}</CartProvider>;
}

describe("cart context", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds an item to cart and updates totals", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(demoProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.subtotal).toBe(25);
  });

  it("updates quantity with delta and removes item when quantity reaches zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(demoProduct, 2);
    });

    act(() => {
      result.current.updateItemQuantityByDelta(demoProduct.id, 1);
    });

    expect(result.current.items[0].quantity).toBe(3);
    expect(result.current.subtotal).toBe(75);

    act(() => {
      result.current.updateItemQuantityByDelta(demoProduct.id, -3);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });
});
