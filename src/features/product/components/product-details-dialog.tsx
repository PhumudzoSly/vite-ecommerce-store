import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Product } from "../types";

interface ProductDetailsDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductDetailsDialog({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailsDialogProps) {
  if (!product) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="aspect-square bg-muted/30 p-8">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="flex flex-col p-8">
              <DialogHeader>
                <Badge className="mb-3 w-fit bg-secondary text-secondary-foreground">
                  {product.category}
                </Badge>
                <DialogTitle className="text-left text-2xl leading-tight">{product.title}</DialogTitle>
                <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>
                    {product.rating.rate.toFixed(1)} from {product.rating.count} reviews
                  </span>
                </div>
              </DialogHeader>

              <p className="mt-6 text-3xl font-bold">${product.price.toFixed(2)}</p>

              <DialogDescription className="mt-5 text-left leading-relaxed text-foreground/85">
                {product.description}
              </DialogDescription>

              <Button
                className="mt-8"
                onClick={() => {
                  onAddToCart?.(product);
                  onClose();
                }}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
