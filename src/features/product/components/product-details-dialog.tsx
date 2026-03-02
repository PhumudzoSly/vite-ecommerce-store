import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star, Truck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Product } from "../types";

interface ProductDetailsDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number) => void;
}

function StarRating({ rate, count }: { rate: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.floor(rate);
          const half = !filled && i < rate;
          return (
            <Star
              key={i}
              className={`h-4 w-4 ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : half
                    ? "fill-amber-400/50 text-amber-400"
                    : "fill-muted text-muted-foreground/30"
              }`}
            />
          );
        })}
      </div>
      <span className="text-sm font-medium text-foreground">
        {rate.toFixed(1)}
      </span>
      <span className="text-sm text-muted-foreground">({count} reviews)</span>
    </div>
  );
}

export function ProductDetailsDialog({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsDialogProps) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const freeShipping = product.price >= 35;

  const handleAdd = () => {
    onAddToCart?.(product, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          setQuantity(1);
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] w-full max-w-lg overflow-hidden rounded-2xl border-0 shadow-2xl"
        style={{ display: "flex", flexDirection: "column", padding: 0, gap: 0 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image — full width, fixed */}
        <div className="relative flex shrink-0 items-center justify-center bg-linear-to-b from-muted/50 to-muted/10 px-12 py-10">
          <img
            src={product.image}
            alt={product.title}
            className="h-52 w-full object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
          />
          {freeShipping && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-emerald-600 shadow-sm backdrop-blur-sm">
              <Truck className="h-3.5 w-3.5" />
              Free shipping
            </div>
          )}
        </div>

        {/* Scrollable details */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="px-6 py-5">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-0.5 text-xs font-medium uppercase tracking-wide"
            >
              {product.category}
            </Badge>

            <h2 className="mt-3 text-xl font-bold leading-snug tracking-tight text-foreground">
              {product.title}
            </h2>

            <div className="mt-3">
              <StarRating
                rate={product.rating.rate}
                count={product.rating.count}
              />
            </div>

            <Separator className="my-4" />

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-emerald-600">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              In stock · Ships within 1–3 business days
            </p>

            <Separator className="my-4" />

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            {/* Spacer so content isn't hidden behind footer */}
            <div className="h-4" />
          </div>
        </ScrollArea>

        {/* Fixed footer */}
        <div className="shrink-0 border-t bg-background px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center rounded-lg border bg-background">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-semibold tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="flex-1 gap-2 rounded-xl text-sm font-semibold"
              onClick={handleAdd}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart · ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
