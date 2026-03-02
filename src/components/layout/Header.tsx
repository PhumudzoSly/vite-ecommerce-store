import { useEffect, useState, type KeyboardEvent } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AppLink } from "@/components/routing/AppLink";

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void;
}

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/categories" },
  { label: "Deals", to: "/deals" },
];

export function Header({ cartCount = 0, onOpenCart }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (location.pathname !== "/products") {
      setSearchValue("");
      return;
    }

    setSearchValue(params.get("search") ?? "");
  }, [location.pathname, location.search]);

  const buildSearchParams = () => {
    const nextParams = new URLSearchParams();

    if (location.pathname === "/products") {
      const currentParams = new URLSearchParams(location.search);
      const category = currentParams.get("category");
      const sort = currentParams.get("sort");

      if (category) {
        nextParams.set("category", category);
      }

      if (sort) {
        nextParams.set("sort", sort);
      }
    }

    return nextParams;
  };

  const handleSearch = (value: string) => {
    const trimmedSearch = value.trim();
    const nextParams = buildSearchParams();

    if (trimmedSearch) {
      nextParams.set("search", trimmedSearch);
    }

    navigate({
      pathname: "/products",
      search: nextParams.toString() ? `?${nextParams.toString()}` : "",
    });

    setMenuOpen(false);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    handleSearch("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="bg-primary py-1.5 text-center text-xs tracking-wide text-primary-foreground">
        Free shipping on orders over $50 - Use code{" "}
        <span className="font-semibold">WAMLY10</span> for 10% off
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <AppLink
            to="/"
            className="group flex shrink-0 items-center gap-2"
            aria-label="Wamly home"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity group-hover:opacity-90">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Wamly
            </span>
          </AppLink>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <AppLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </AppLink>
            ))}
          </nav>

          {/* Search bar */}
          <div
            className={cn(
              "hidden items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 transition-all sm:flex",
              searchFocused && "border-ring bg-background ring-2 ring-ring",
            )}
          >
            <Search
              className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground"
              onClick={() => handleSearch(searchValue)}
            />
            <input
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-56"
              aria-label="Search products"
            />
            {searchValue && (
              <button
                onClick={handleClearSearch}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Clear search"
                type="button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={onOpenCart}
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted"
              aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              type="button"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {/* Mobile search */}
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2">
              <Search
                className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground"
                onClick={() => handleSearch(searchValue)}
              />
              <input
                type="search"
                placeholder="Search products..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search products"
              />
              {searchValue && (
                <button
                  onClick={handleClearSearch}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Clear search"
                  type="button"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {navLinks.map((link) => (
              <AppLink
                key={link.to}
                to={link.to}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </AppLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
