import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag } from "lucide-react";
import { CartItem as CartItemComponent } from "./cart-item";
import type { CartItem } from "../types";

interface CartListProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  className?: string;
  maxHeight?: string;
}

export function CartList({
  items,
  onUpdateQuantity,
  onRemove,
  className = "",
  maxHeight = "auto",
}: CartListProps) {
  if (items.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 text-center py-10 ${className}`}
      >
        <ShoppingBag className="h-10 w-10 text-muted-foreground mb-4" />
        <div className="text-xl font-semibold">Your cart is empty</div>
        <p className="text-muted-foreground">
          Add some products to your cart to see them here.
        </p>
      </div>
    );
  }

  const Content = (
    <div className="flex flex-col">
      {items.map((item) => (
        <CartItemComponent
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
        />
      ))}
    </div>
  );

  if (maxHeight !== "auto") {
    return (
      <ScrollArea className={`${className}`} style={{ maxHeight }}>
        {Content}
      </ScrollArea>
    );
  }

  return <div className={`${className}`}>{Content}</div>;
}
