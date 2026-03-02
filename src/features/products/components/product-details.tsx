import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductDetailsProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductDetails({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh]">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-muted p-8 flex items-center justify-center aspect-square md:aspect-auto">
              <img
                src={product.image}
                alt={product.title}
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
            <div className="p-8 flex flex-col h-full">
              <DialogHeader className="mb-4">
                <Badge className="w-fit mb-2">{product.category}</Badge>
                <DialogTitle className="text-2xl font-bold leading-tight">
                  {product.title}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(product.rating.rate) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </DialogHeader>

              <div className="text-3xl font-bold mb-6">
                ${product.price.toFixed(2)}
              </div>

              <DialogDescription className="text-base text-foreground mb-8">
                {product.description}
              </DialogDescription>

              <div className="mt-auto">
                <Button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full h-12 text-lg"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
