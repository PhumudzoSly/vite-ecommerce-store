import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart";
import { useFeaturedProducts } from "../hooks";
import { ProductDetailsDialog } from "./product-details-dialog";
import { ProductGrid } from "./product-grid";
import type { Product } from "../types";
import { AppLink } from "@/components/routing/AppLink";

export function FeaturedProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();
  const { data, isLoading, isError, error } = useFeaturedProducts(8);

  return (
    <section className="border-t border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              What's selling the most.
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured products
            </h2>
          </div>

          <Button variant="outline" asChild>
            <AppLink to="/products">
              Browse all products
              <ArrowRight className="ml-2 h-4 w-4" />
            </AppLink>
          </Button>
        </div>

        <ProductGrid
          products={data}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error instanceof Error ? error.message : undefined}
          onViewDetails={setSelectedProduct}
          onAddToCart={(product) => {
            addItem(product);
            toast.success(`${product.title} added to cart`);
          }}
        />
      </div>

      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity) => {
          addItem(product, quantity);
          toast.success(`${product.title} added to cart`);
        }}
      />
    </section>
  );
}
