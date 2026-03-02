import { ArrowRight, ShoppingBag, Star } from 'lucide-react'

const stats = [
  { value: '10K+', label: 'Products' },
  { value: '50K+', label: 'Customers' },
  { value: '4.9', label: 'Avg Rating', icon: Star },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
      />
      {/* Gradient fade over grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[560px] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          {/* Left — copy */}
          <div className="flex flex-col items-start gap-6">
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              New arrivals every week
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Discover Products{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">You'll Love</span>
                {/* Underline accent */}
                <svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 Q75 2 150 9 Q225 16 298 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary/40"
                  />
                </svg>
              </span>
            </h1>

            <p className="max-w-md text-base text-muted-foreground sm:text-lg">
              Browse thousands of curated products across electronics, fashion, home
              &amp; more — with fast shipping and easy returns.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 transition-opacity"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/categories"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Browse Categories
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-2 flex items-center gap-6 divide-x divide-border">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex flex-col pl-6 first:pl-0">
                  <span className="flex items-center gap-1 text-xl font-bold text-foreground">
                    {value}
                    {Icon && <Icon className="h-4 w-4 fill-amber-400 text-amber-400" />}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual: stacked mock product cards */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Background blob */}
            <div
              aria-hidden
              className="absolute h-80 w-80 rounded-full bg-primary/5 blur-3xl"
            />

            {/* Card stack */}
            <div className="relative w-72">
              {/* Back card */}
              <div className="absolute -right-6 -top-6 h-full w-full rounded-2xl border border-border bg-muted/40 shadow-sm" />
              {/* Middle card */}
              <div className="absolute -right-3 -top-3 h-full w-full rounded-2xl border border-border bg-muted/60 shadow-sm" />

              {/* Front card */}
              <div className="relative rounded-2xl border border-border bg-card shadow-lg overflow-hidden">
                {/* Product image placeholder */}
                <div className="flex h-52 items-center justify-center bg-gradient-to-br from-muted to-muted/40">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
                </div>

                {/* Card body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Electronics</p>
                      <p className="font-semibold text-foreground">Premium Wireless Headphones</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                      Sale
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted'}`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">4.0 (128)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-foreground">$79.99</span>
                      <span className="text-sm text-muted-foreground line-through">$129.99</span>
                    </div>
                    <button className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 shadow-md">
                <span className="text-lg">🎉</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">Flash Sale</p>
                  <p className="text-[10px] text-muted-foreground">Ends in 2h 45m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
