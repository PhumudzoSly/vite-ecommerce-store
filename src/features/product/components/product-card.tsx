import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-border/70 transition-all hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="p-0">
        <button
          type="button"
          className="group relative block aspect-square w-full overflow-hidden bg-muted/40 text-left"
          onClick={() => onViewDetails?.(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute right-3 top-3 bg-background text-foreground shadow-sm">
            {product.category}
          </Badge>
        </button>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 p-4">
        <button
          type="button"
          className="line-clamp-2 text-left text-base font-semibold text-foreground transition-colors hover:text-primary"
          onClick={() => onViewDetails?.(product)}
        >
          {product.title}
        </button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span>
            {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
          </span>
        </div>

        <p className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => onAddToCart?.(product)}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
