import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCard } from "./product-card";
import type { Product } from "../types";

interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export function ProductGrid({
  products,
  isLoading,
  isError,
  errorMessage,
  onAddToCart,
  onViewDetails,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={`product-skeleton-${index}`} className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-destructive/40 px-6 py-10 text-center">
        <AlertCircle className="mb-3 h-6 w-6 text-destructive" />
        <p className="text-sm font-medium text-foreground">
          Could not load products
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {errorMessage ?? "Please try again in a moment."}
        </p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-10 text-center">
        <p className="text-sm font-medium text-foreground">
          No products match this filter
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try a different category or sort option.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
