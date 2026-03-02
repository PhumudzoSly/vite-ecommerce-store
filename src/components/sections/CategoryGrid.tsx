import { Cpu, Gem, Shirt } from 'lucide-react'

// Matches the exact 4 categories from fakestoreapi.com/products/categories
const categories = [
  { label: 'Electronics', slug: 'electronics', icon: Cpu, count: 6 },
  { label: 'Jewellery', slug: 'jewelery', icon: Gem, count: 4 },
  { label: "Men's Clothing", slug: "men's clothing", icon: Shirt, count: 4 },
  { label: "Women's Clothing", slug: "women's clothing", icon: Shirt, count: 6 },
]

export function CategoryGrid() {
  return (
    <section className="py-16" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Browse by</p>
            <h2 id="categories-heading" className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Shop by category
            </h2>
          </div>
          <a
            href="/categories"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all →
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map(({ label, slug, icon: Icon, count }) => (
            <a
              key={slug}
              href={`/products?category=${encodeURIComponent(slug)}`}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-5 hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{count} products</p>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile "view all" */}
        <div className="mt-6 text-center sm:hidden">
          <a
            href="/categories"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            View all categories →
          </a>
        </div>
      </div>
    </section>
  )
}
