import { calculateOrderTotals } from "@/features/checkout";
import type { CartItem } from "@/features/cart";

const cartItems: CartItem[] = [
  {
    id: 1,
    title: "Keyboard",
    price: 50,
    description: "Mechanical keyboard",
    category: "electronics",
    image: "https://example.com/kb.png",
    rating: { rate: 4.7, count: 50 },
    quantity: 2,
  },
  {
    id: 2,
    title: "Mouse",
    price: 20,
    description: "Wireless mouse",
    category: "electronics",
    image: "https://example.com/mouse.png",
    rating: { rate: 4.2, count: 30 },
    quantity: 1,
  },
];

describe("calculateOrderTotals", () => {
  it("calculates subtotal, tax and total with discount", () => {
    const totals = calculateOrderTotals(cartItems, 0.1);

    expect(totals.subtotal).toBe(120);
    expect(totals.discount).toBe(12);
    expect(totals.shipping).toBe(0);
    expect(totals.tax).toBeCloseTo(16.2);
    expect(totals.total).toBeCloseTo(124.2);
  });

  it("applies shipping when subtotal is below free-shipping threshold", () => {
    const totals = calculateOrderTotals([cartItems[1]]);

    expect(totals.subtotal).toBe(20);
    expect(totals.shipping).toBe(7.99);
    expect(totals.total).toBeCloseTo(30.99);
  });
});
