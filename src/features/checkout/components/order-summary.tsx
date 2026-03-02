import {
  BadgeCheck,
  ReceiptText,
  ShieldCheck,
  TicketPercent,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CartItem } from "@/features/cart";
import { calculateOrderTotals } from "../utils";

interface OrderSummaryProps {
  items: CartItem[];
  discountCode: string;
  discountRate: number;
  onDiscountCodeChange: (code: string) => void;
  onApplyDiscount: () => void;
  onRemoveDiscount: () => void;
  appliedDiscountCode?: string | null;
}

function money(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function OrderSummary({
  items,
  discountCode,
  discountRate,
  onDiscountCodeChange,
  onApplyDiscount,
  onRemoveDiscount,
  appliedDiscountCode,
}: OrderSummaryProps) {
  const totals = calculateOrderTotals(items, discountRate);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card className="h-fit overflow-hidden border-border/70 shadow-sm lg:sticky lg:top-24 pt-0">
      <CardHeader className="border-b border-border/70 bg-gradient-to-r pt-8 from-zinc-950 to-zinc-800 text-white">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5" />
            Order Summary
          </span>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium">
            {totalItems} item{totalItems === 1 ? "" : "s"}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 p-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-muted/20 p-3"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white p-2 dark:bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Qty {item.quantity} x {money(item.price)}
                </p>
              </div>
              <p className="text-sm font-semibold text-foreground">
                {money(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border/70 bg-muted/20 p-3">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <TicketPercent className="h-4 w-4 text-primary" />
            Discount code
          </p>
          <div className="flex items-center gap-2">
            <Input
              value={discountCode}
              onChange={(event) => onDiscountCodeChange(event.target.value)}
              placeholder="Enter code"
              className="h-9"
            />
            <Button
              type="button"
              variant="outline"
              className="h-9"
              onClick={onApplyDiscount}
            >
              Apply
            </Button>
          </div>
          {appliedDiscountCode && (
            <div className="mt-2 flex items-center justify-between rounded-md bg-emerald-500/10 px-2.5 py-2 text-xs">
              <span className="font-medium text-emerald-700 dark:text-emerald-300">
                {appliedDiscountCode} applied (10% off)
              </span>
              <button
                type="button"
                className="text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300"
                onClick={onRemoveDiscount}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2 rounded-xl border border-border/70 bg-background p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{money(totals.subtotal)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                -{money(totals.discount)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>
              {totals.shipping === 0 ? "Free" : money(totals.shipping)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tax (15%)</span>
            <span>{money(totals.tax)}</span>
          </div>
          <div className="mt-3 border-t border-border/70 pt-3">
            <div className="flex items-center justify-between text-base font-bold">
              <span>Total</span>
              <span>{money(totals.total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 rounded-xl bg-primary/5 p-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Secure checkout flow with receipts and discounts.
          </p>
          <p className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            Free shipping is applied automatically above $100.
          </p>
          <p className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-primary" />
            Downloadable receipt available after successful order creation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
