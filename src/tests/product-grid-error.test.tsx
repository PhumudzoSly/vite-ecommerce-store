import { render, screen } from "@testing-library/react";
import { ProductGrid } from "@/features/product";

describe("ProductGrid error state", () => {
  it("renders error UI when fetching products fails", () => {
    render(
      <ProductGrid
        products={[]}
        isLoading={false}
        isError
        errorMessage="Failed to fetch products"
      />,
    );

    expect(screen.getByText("Could not load products")).toBeInTheDocument();
    expect(screen.getByText("Failed to fetch products")).toBeInTheDocument();
  });
});
