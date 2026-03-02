import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/8 dark:hover:shadow-black/40">
      {/* ── Image zone ── */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => onViewDetails?.(product)}
        onKeyDown={(e) => e.key === "Enter" && onViewDetails?.(product)}
        aria-label={`View details for ${product.title}`}
        className="relative aspect-4/5 w-full cursor-pointer overflow-hidden bg-muted/40"
      >
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-7 transition-transform duration-500 group-hover:scale-[1.07]"
        />

        {/* Rating badge — top right */}
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold leading-none text-white shadow-md">
          <Star className="h-2.5 w-2.5 fill-white text-white" />
          {product.rating.rate.toFixed(1)}
        </div>

        {/* Category — top left */}
        <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground shadow-sm backdrop-blur-sm">
          {product.category}
        </span>

        {/* Slide-up CTA */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            className="flex w-full items-center justify-center gap-2 bg-foreground py-3.5 text-xs font-bold uppercase tracking-widest text-background transition-opacity hover:opacity-80"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to cart
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="flex flex-col gap-1 p-4">
        <button
          type="button"
          onClick={() => onViewDetails?.(product)}
          className="text-left focus-visible:outline-none"
        >
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-foreground transition-colors hover:text-primary">
            {product.title}
          </h3>
        </button>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-black tracking-tight text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-muted-foreground/50">
            {product.rating.count} reviews
          </span>
        </div>
      </div>
    </div>
  );
}
