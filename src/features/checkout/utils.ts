import type { CartItem } from "@/features/cart";

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export function calculateOrderTotals(items: CartItem[], discountRate = 0): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const normalizedDiscountRate = Math.max(0, Math.min(discountRate, 1));
  const discount = subtotal * normalizedDiscountRate;
  const discountedSubtotal = subtotal - discount;
  const shipping = subtotal >= 100 || items.length === 0 ? 0 : 7.99;
  const tax = discountedSubtotal * 0.15;
  const total = discountedSubtotal + shipping + tax;

  return {
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };
}
