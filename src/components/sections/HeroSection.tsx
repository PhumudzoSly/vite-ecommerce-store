import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";

const stats = [
  { value: "10K+", label: "Products" },
  { value: "50K+", label: "Happy customers" },
  { value: "4.9?", label: "Avg rating" },
];

const categoryPreview = [
  { label: "Electronics", emoji: "💻" },
  { label: "Jewellery", emoji: "💍" },
  { label: "Men's", emoji: "🥼" },
  { label: "Women's", emoji: "👗" },
];

export function HeroSection() {
  return (
    <section className="border-b border-border bg-linear-120 from-white via-red-100 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[520px] grid-cols-1 items-center gap-16 py-20 lg:grid-cols-2 lg:py-24">
          {/* Left  copy */}
          <div className="flex flex-col items-start gap-6">
            <Badge variant="secondary" className="px-3 py-1 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
              New arrivals every week
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Discover products <br className="hidden sm:block" /> you'll love
            </h1>

            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              Browse thousands of curated products across electronics, fashion
              and more fast shipping and easy returns included.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/products">
                  Shop now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/categories">Browse categories</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-2">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right � clean category preview panel */}
          <div className="hidden lg:block">
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {categoryPreview.map(({ label, emoji }) => (
                  <Link
                    key={label}
                    to="/categories"
                    className="flex items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="text-xl" aria-hidden>
                      {emoji}
                    </span>
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-foreground text-foreground"
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Trusted by 50K+ customers
                </p>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </section>
  );
}
