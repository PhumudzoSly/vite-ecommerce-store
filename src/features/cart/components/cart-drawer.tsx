import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag } from "lucide-react";
import { CartList } from "./cart-list";
import type { CartItem } from "../types";

interface CartDrawerProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onViewCart: () => void;
  onClearCart: () => void;
}

export function CartDrawer({
  items,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemove,
  onViewCart,
  onClearCart,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col h-full min-h-0">
          <CartList
            items={items}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
            className="flex-1 px-6"
            maxHeight="calc(100vh - 280px)"
          />

          {items.length > 0 && (
            <div className="space-y-4 px-6 py-6 mt-auto">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage quantities in your cart page before checkout goes live.
                </p>
              </div>
              <SheetFooter>
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                  <Button variant="outline" className="h-11" onClick={onClearCart}>
                    Clear cart
                  </Button>
                  <Button className="h-11" onClick={onViewCart}>
                    View cart
                  </Button>
                </div>
              </SheetFooter>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
