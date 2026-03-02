import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div
          className="aspect-square relative overflow-hidden bg-muted cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full p-6 transition-transform hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-primary/90">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <h3
          className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </h3>
        <p className="text-2xl font-bold mt-2">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm text-muted-foreground">
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onAddToCart(product)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
