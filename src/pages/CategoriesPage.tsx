import { ArrowRight } from 'lucide-react'

const categories = [
  {
    slug: 'electronics',
    label: 'Electronics',
    tagline: 'Cutting-edge tech for every lifestyle',
    description:
      'From wireless audio to the latest gadgets — explore our full range of consumer electronics.',
    emoji: '🎧',
    count: 6,
    gradient: 'from-blue-600 via-indigo-600 to-violet-700',
    lightGradient: 'from-blue-50 via-indigo-50 to-violet-50 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-violet-950/50',
    blob: 'bg-blue-400/20',
    pill: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  },
  {
    slug: 'jewelery',
    label: 'Jewellery',
    tagline: 'Timeless pieces for every occasion',
    description:
      'Discover rings, necklaces and bracelets crafted to complement your unique style.',
    emoji: '💍',
    count: 4,
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    lightGradient: 'from-amber-50 via-yellow-50 to-orange-50 dark:from-amber-950/50 dark:via-yellow-950/50 dark:to-orange-950/50',
    blob: 'bg-amber-400/20',
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
  },
  {
    slug: "men's clothing",
    label: "Men's Clothing",
    tagline: 'Sharp styles built for the modern man',
    description:
      'Jackets, shirts, trousers and more — curated looks that take you from casual to formal.',
    emoji: '👔',
    count: 4,
    gradient: 'from-slate-600 via-zinc-600 to-stone-700',
    lightGradient: 'from-slate-50 via-zinc-50 to-stone-50 dark:from-slate-900/60 dark:via-zinc-900/60 dark:to-stone-900/60',
    blob: 'bg-slate-400/20',
    pill: 'bg-slate-100 text-slate-700 dark:bg-slate-800/80 dark:text-slate-300',
  },
  {
    slug: "women's clothing",
    label: "Women's Clothing",
    tagline: 'Elegant fashion for every moment',
    description:
      'From everyday essentials to statement pieces — find your perfect wardrobe staple.',
    emoji: '👗',
    count: 6,
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-600',
    lightGradient: 'from-pink-50 via-rose-50 to-fuchsia-50 dark:from-pink-950/50 dark:via-rose-950/50 dark:to-fuchsia-950/50',
    blob: 'bg-pink-400/20',
    pill: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300',
  },
]

export function CategoriesPage() {
  return (
    <div className="bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">Home</a>
            <span>/</span>
            <span className="text-foreground font-medium">Categories</span>
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Shop by Category
              </h1>
              <p className="mt-2 max-w-xl text-base text-muted-foreground">
                Everything you need, neatly organised. Browse our{' '}
                <span className="font-medium text-foreground">4 categories</span> and
                find exactly what you're looking for.
              </p>
            </div>
            <a
              href="/products"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              View all products
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} {...cat} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Category card ── */

interface CategoryCardProps {
  slug: string
  label: string
  tagline: string
  description: string
  emoji: string
  count: number
  gradient: string
  lightGradient: string
  blob: string
  pill: string
}

function CategoryCard({
  slug,
  label,
  tagline,
  description,
  emoji,
  count,
  gradient,
  lightGradient,
  blob,
  pill,
}: CategoryCardProps) {
  return (
    <a
      href={`/products?category=${encodeURIComponent(slug)}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-br ${lightGradient} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      {/* Top coloured banner */}
      <div className={`relative h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Decorative blobs */}
        <div className={`absolute -right-10 -top-10 h-48 w-48 rounded-full ${blob} blur-2xl`} aria-hidden />
        <div className={`absolute -bottom-6 -left-6 h-32 w-32 rounded-full ${blob} blur-xl`} aria-hidden />

        {/* Emoji */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-7xl drop-shadow-md transition-transform duration-300 group-hover:scale-110"
            role="img"
            aria-label={label}
          >
            {emoji}
          </span>
        </div>

        {/* Item count pill — top right */}
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {count} products
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${pill}`}>
              Category
            </span>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
              {label}
            </h2>
            <p className="mt-0.5 text-sm font-medium text-muted-foreground">{tagline}</p>
          </div>

          {/* Arrow — slides in on hover */}
          <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

        {/* CTA row */}
        <div className="mt-auto pt-2">
          <span className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            Shop {label}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: 'inherit' }} />
          </span>
        </div>
      </div>
    </a>
  )
}
