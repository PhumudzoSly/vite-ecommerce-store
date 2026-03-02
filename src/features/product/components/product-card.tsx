import { ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
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
    <Card className="group flex h-full flex-col overflow-hidden border-border/50 transition-all duration-300 hover:border-border hover:shadow-md">
      <CardHeader className="relative p-0">
        <button
          type="button"
          className="relative block aspect-square w-full overflow-hidden bg-muted/30 text-left"
          onClick={() => onViewDetails?.(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <Badge
            variant="secondary"
            className="absolute left-3 top-3 text-xs capitalize"
          >
            {product.category}
          </Badge>
        </button>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-1.5 p-3 pb-2 text-left">
        <button
          type="button"
          className="line-clamp-2 text-left text-sm font-medium leading-snug text-foreground transition-colors hover:text-primary"
          onClick={() => onViewDetails?.(product)}
        >
          {product.title}
        </button>

        <div className="flex items-center justify-between gap-2 mt-auto pt-1">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.rate.toFixed(1)}</span>
          </div>
          <p className="text-sm font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-2">
        <Button
          size="sm"
          className="w-full gap-1.5 shadow-none active:scale-95 transition-transform duration-150"
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
