import { ArrowRight, Cpu, Gem, Shirt } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories: {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
  count: number;
}[] = [
  {
    slug: "electronics",
    label: "Electronics",
    description:
      "Explore phones, laptops, audio gear and the latest consumer tech.",
    icon: Cpu,
    count: 6,
  },
  {
    slug: "jewelery",
    label: "Jewellery",
    description: "Rings, necklaces and bracelets for every style and occasion.",
    icon: Gem,
    count: 4,
  },
  {
    slug: "men's clothing",
    label: "Men's Clothing",
    description:
      "Jackets, shirts and trousers � from casual everyday to sharp formal.",
    icon: Shirt,
    count: 4,
  },
  {
    slug: "women's clothing",
    label: "Women's Clothing",
    description: "Dresses, tops and essentials curated for every wardrobe.",
    icon: Shirt,
    count: 6,
  },
];

export function CategoriesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <a href="/" className="hover:text-foreground transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-foreground">Categories</span>
          </nav>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                All categories
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {categories.length} categories �{" "}
                {categories.reduce((n, c) => n + c.count, 0)} products total
              </p>
            </div>
            <Button variant="outline" asChild>
              <a href="/products">
                View all products <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.slug}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="block group"
              >
                <Card className="h-full hover:bg-muted/40 transition-colors">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{cat.label}</CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {cat.count} products
                        </span>
                      </div>
                      <CardDescription className="mt-2 text-sm text-muted-foreground">
                        {cat.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-sm font-medium text-primary">
                        Shop {cat.label}
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
