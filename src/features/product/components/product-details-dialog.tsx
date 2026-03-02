import { useState } from "react";
import { Minus, Plus, ShoppingCart, Star, Tag, Truck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
              className={`h-3.5 w-3.5 ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : half
                    ? "fill-amber-400/50 text-amber-400"
                    : "fill-muted text-muted-foreground/20"
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs font-semibold text-foreground tabular-nums">
        {rate.toFixed(1)}
      </span>
      <span className="text-xs text-muted-foreground/70">
        · {count} reviews
      </span>
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
  const total = (product.price * quantity).toFixed(2);

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
        className="h-[92vh] w-full max-w-105 overflow-hidden rounded-3xl border-0 p-0 shadow-2xl gap-0 flex flex-col"
      >
        {/* ── Image zone ── */}
        <div className="relative shrink-0 bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-zinc-500 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-zinc-900 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Category pill */}
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 shadow-sm backdrop-blur-sm dark:bg-zinc-800/80 dark:text-zinc-400">
            <Tag className="h-2.5 w-2.5" />
            {product.category}
          </div>

          <div className="flex items-center justify-center px-16 py-12">
            <img
              src={product.image}
              alt={product.title}
              className="h-48 w-full object-contain drop-shadow-xl transition-transform duration-500 hover:scale-[1.04]"
            />
          </div>

          {/* Free shipping ribbon */}
          {freeShipping && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-white shadow">
              <Truck className="h-3 w-3" />
              Free shipping
            </div>
          )}
        </div>

        {/* ── Scrollable body ── */}
        <ScrollArea className="min-h-0 flex-1">
          <div className="px-6 pt-5 pb-3">
            {/* Title */}
            <h2 className="text-[17px] font-bold leading-snug tracking-tight text-foreground">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="mt-2">
              <StarRating
                rate={product.rating.rate}
                count={product.rating.count}
              />
            </div>

            {/* Price row */}
            <div className="mt-4 flex items-end gap-3">
              <span className="text-4xl font-black leading-none tracking-tight text-foreground">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Availability */}
            <p className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In stock · Ships within 1–3 business days
            </p>

            {/* Divider */}
            <div className="my-4 h-px bg-border/60" />

            {/* Description */}
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div className="h-6" />
          </div>
        </ScrollArea>

        {/* ── Fixed footer ── */}
        <div className="shrink-0 border-t border-border/60 bg-background/95 px-5 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Quantity stepper */}
            <div className="flex h-10 items-center rounded-xl border border-border/80 bg-muted/40">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="flex h-10 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-6 text-center text-sm font-bold tabular-nums text-foreground">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-10 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Add to cart CTA */}
            <Button
              size="lg"
              onClick={handleAdd}
              className="h-10 flex-1 gap-2 rounded-xl text-[13px] font-semibold"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
              <span className="ml-auto font-bold opacity-90">${total}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
