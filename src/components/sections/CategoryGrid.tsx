// Matches the exact 4 categories from fakestoreapi.com/products/categories
const categories = [
  {
    label: 'Electronics',
    slug: 'electronics',
    emoji: '🎧',
    count: '2,340 items',
    gradient: 'from-blue-50 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-900/40',
    accent: 'text-blue-600 dark:text-blue-400',
  },
  {
    label: 'Jewellery',
    slug: 'jewelery',
    emoji: '💍',
    count: '640 items',
    gradient: 'from-amber-50 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-900/40',
    accent: 'text-amber-600 dark:text-amber-400',
  },
  {
    label: "Men's Clothing",
    slug: "men's clothing",
    emoji: '👔',
    count: '1,420 items',
    gradient: 'from-slate-50 to-zinc-100 dark:from-slate-900/60 dark:to-zinc-800/60',
    accent: 'text-slate-600 dark:text-slate-400',
  },
  {
    label: "Women's Clothing",
    slug: "women's clothing",
    emoji: '👗',
    count: '1,890 items',
    gradient: 'from-pink-50 to-rose-100 dark:from-pink-950/40 dark:to-rose-900/40',
    accent: 'text-pink-600 dark:text-pink-400',
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16" aria-labelledby="categories-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Browse by</p>
            <h2 id="categories-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Shop by Category
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
          {categories.map(({ label, slug, emoji, count, gradient, accent }) => (
            <a
              key={slug}
              href={`/products?category=${encodeURIComponent(slug)}`}
              className={`group flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br ${gradient} border border-border/60 p-5 text-center transition-all hover:shadow-md hover:-translate-y-0.5`}
            >
              <span className="text-3xl" role="img" aria-hidden>
                {emoji}
              </span>
              <div>
                <p className={`text-sm font-semibold ${accent}`}>{label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{count}</p>
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
