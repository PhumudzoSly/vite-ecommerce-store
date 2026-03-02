import { useMemo, useState } from "react";
import { AlertCircle, Percent } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { DealProductCard } from "@/features/product/components/deal-product-card";
import {
  ProductDetailsDialog,
  formatCategoryLabel,
  sortDealProducts,
  useDealProducts,
  useProductCategories,
  type DealProduct,
  type DealSort,
} from "@/features/product";
import { useCart } from "@/features/cart";

const SORT_OPTIONS: Array<{ label: string; value: DealSort }> = [
  { label: "Biggest discount", value: "discount-desc" },
  { label: "Price: Low to high", value: "price-asc" },
  { label: "Price: High to low", value: "price-desc" },
];

function isDealSort(value: string | null): value is DealSort {
  return SORT_OPTIONS.some((option) => option.value === value);
}

export function DealsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDeal, setSelectedDeal] = useState<DealProduct | null>(null);
  const { addItem } = useCart();

  const selectedCategory = searchParams.get("category") ?? "all";
  const selectedSort = isDealSort(searchParams.get("sort"))
    ? (searchParams.get("sort") as DealSort)
    : "discount-desc";
  const apiCategory = selectedCategory === "all" ? undefined : selectedCategory;

  const categoriesQuery = useProductCategories();
  const dealsQuery = useDealProducts(20, apiCategory);

  const sortedDeals = useMemo(
    () => sortDealProducts(dealsQuery.data ?? [], selectedSort),
    [dealsQuery.data, selectedSort],
  );

  const bestDiscount = sortedDeals[0]?.discountPercent ?? 0;

  const addDealToCart = (deal: DealProduct) => {
    addItem({ ...deal, price: deal.dealPrice });
    toast.success(`${deal.title} added at $${deal.dealPrice.toFixed(2)}`);
  };

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-4">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 text-primary">
            <Percent className="h-4 w-4" />
            <p className="text-sm font-semibold uppercase tracking-wide">
              Deals of the day
            </p>
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Best discounts
          </h1>
          <p className="mt-2 text-muted-foreground">
            Save up to {bestDiscount}% on products.
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
              updateQueryParam("sort", value, "discount-desc")
            }
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Sort deals" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {dealsQuery.isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`deal-skeleton-${index}`} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      )}

      {!dealsQuery.isLoading && dealsQuery.isError && (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-destructive/40 px-6 py-10 text-center">
          <AlertCircle className="mb-3 h-6 w-6 text-destructive" />
          <p className="text-sm font-medium text-foreground">
            Could not load deals
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {dealsQuery.error instanceof Error
              ? dealsQuery.error.message
              : "Please try again later."}
          </p>
        </div>
      )}

      {!dealsQuery.isLoading &&
        !dealsQuery.isError &&
        sortedDeals.length === 0 && (
          <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">
              No deals in this category
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another category filter.
            </p>
          </div>
        )}

      {!dealsQuery.isLoading &&
        !dealsQuery.isError &&
        sortedDeals.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sortedDeals.map((deal) => (
              <DealProductCard
                key={deal.id}
                product={deal}
                onViewDetails={setSelectedDeal}
                onAddToCart={addDealToCart}
              />
            ))}
          </div>
        )}

      <ProductDetailsDialog
        product={
          selectedDeal
            ? { ...selectedDeal, price: selectedDeal.dealPrice }
            : null
        }
        isOpen={Boolean(selectedDeal)}
        onClose={() => setSelectedDeal(null)}
        onAddToCart={(product) => {
          addItem(product);
          toast.success(`${product.title} added to cart`);
        }}
      />
    </div>
  );
}
