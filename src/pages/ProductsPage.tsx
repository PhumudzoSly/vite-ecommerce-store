import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductDetailsDialog,
  ProductGrid,
  formatCategoryLabel,
  sortProducts,
  useProductCategories,
  useProducts,
  type Product,
  type ProductSort,
} from "@/features/product";
import { useCart } from "@/features/cart";

const SORT_OPTIONS: Array<{ label: string; value: ProductSort }> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
  { label: "Top rated", value: "rating-desc" },
];

function isProductSort(value: string | null): value is ProductSort {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addItem } = useCart();

  const selectedCategory = searchParams.get("category") ?? "all";
  const selectedSort = isProductSort(searchParams.get("sort"))
    ? (searchParams.get("sort") as ProductSort)
    : "featured";
  const rawSearchQuery = searchParams.get("search")?.trim() ?? "";
  const searchQuery = rawSearchQuery.toLowerCase();
  const apiCategory = selectedCategory === "all" ? undefined : selectedCategory;

  const categoriesQuery = useProductCategories();
  const productsQuery = useProducts({ category: apiCategory });

  const sortedProducts = useMemo(
    () => sortProducts(productsQuery.data ?? [], selectedSort),
    [productsQuery.data, selectedSort],
  );

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return sortedProducts;
    return sortedProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery),
    );
  }, [sortedProducts, searchQuery]);

  const updateQueryParam = (
    key: "category" | "sort",
    value: string,
    defaultValue: string,
  ) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === defaultValue) {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedCategory !== "all" ||
    selectedSort !== "featured";

  const clearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            {searchQuery ? (
              <>
                Showing{" "}
                <span className="font-medium text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                result{filteredProducts.length !== 1 ? "s" : ""} for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{rawSearchQuery}&rdquo;
                </span>
              </>
            ) : (
              <>
                View our inventory. {productsQuery.data?.length ?? 0} products
                available.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select
            value={selectedCategory}
            onValueChange={(value) =>
              updateQueryParam("category", value, "all")
            }
          >
            <SelectTrigger className="w-full sm:w-72">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categoriesQuery.data?.map((category) => (
                <SelectItem key={category} value={category}>
                  {formatCategoryLabel(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedSort}
            onValueChange={(value) =>
              updateQueryParam("sort", value, "featured")
            }
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Sort products" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button type="button" variant="outline" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </header>

      <ProductGrid
        products={filteredProducts}
        isLoading={productsQuery.isLoading}
        isError={productsQuery.isError}
        errorMessage={
          productsQuery.error instanceof Error
            ? productsQuery.error.message
            : undefined
        }
        onViewDetails={setSelectedProduct}
        onAddToCart={(product) => {
          addItem(product);
          toast.success(`${product.title} added to cart`);
        }}
      />

      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity) => {
          addItem(product, quantity);
          toast.success(`${product.title} added to cart`);
        }}
      />
    </div>
  );
}
