import { ArrowRight, Cpu, Gem, Shirt } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

const categories: {
  slug: string
  label: string
  description: string
  icon: LucideIcon
  count: number
}[] = [
  {
    slug: 'electronics',
    label: 'Electronics',
    description: 'Explore phones, laptops, audio gear and the latest consumer tech.',
    icon: Cpu,
    count: 6,
  },
  {
    slug: 'jewelery',
    label: 'Jewellery',
    description: 'Rings, necklaces and bracelets for every style and occasion.',
    icon: Gem,
    count: 4,
  },
  {
    slug: "men's clothing",
    label: "Men's Clothing",
    description: 'Jackets, shirts and trousers — from casual everyday to sharp formal.',
    icon: Shirt,
    count: 4,
  },
  {
    slug: "women's clothing",
    label: "Women's Clothing",
    description: 'Dresses, tops and essentials curated for every wardrobe.',
    icon: Shirt,
    count: 6,
  },
]

export function CategoriesPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <span className="text-foreground">Categories</span>
          </nav>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                All categories
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {categories.length} categories · {categories.reduce((n, c) => n + c.count, 0)} products total
              </p>
            </div>
            <a
              href="/products"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              View all products <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <a
                key={cat.slug}
                href={`/products?category=${encodeURIComponent(cat.slug)}`}
                className="group flex items-start gap-5 rounded-xl border border-border bg-card p-6 hover:bg-muted/40 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted text-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-semibold text-foreground">{cat.label}</h2>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {cat.count} products
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                    Shop {cat.label}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

