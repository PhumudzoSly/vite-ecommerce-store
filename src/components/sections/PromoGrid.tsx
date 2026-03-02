import { ArrowRight, Zap, Sparkles, TrendingUp } from 'lucide-react'

const promos = [
  {
    id: 'summer-sale',
    eyebrow: 'Limited time',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items across every category.',
    cta: 'Shop the sale',
    href: '/deals',
    icon: Zap,
    featured: true,
  },
  {
    id: 'new-arrivals',
    eyebrow: 'Just dropped',
    title: 'New Arrivals',
    subtitle: 'Fresh styles added every week.',
    cta: "See what's new",
    href: '/new',
    icon: Sparkles,
    featured: false,
  },
  {
    id: 'trending',
    eyebrow: 'Most popular',
    title: 'Trending Now',
    subtitle: 'Top picks from our community.',
    cta: 'Explore trends',
    href: '/products?sort=trending',
    icon: TrendingUp,
    featured: false,
  },
]

export function PromoGrid() {
  const [large, ...smalls] = promos

  return (
    <section className="border-t border-border py-16" aria-labelledby="promos-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Handpicked for you</p>
          <h2 id="promos-heading" className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Featured collections
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <PromoCard promo={large} className="md:col-span-2" />
          <div className="flex flex-col gap-4">
            {smalls.map((p) => (
              <PromoCard key={p.id} promo={p} className="flex-1" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

interface PromoCardProps {
  promo: (typeof promos)[number]
  className?: string
}

function PromoCard({ promo, className = '' }: PromoCardProps) {
  const { eyebrow, title, subtitle, cta, href, icon: Icon, featured } = promo

  if (featured) {
    return (
      <a
        href={href}
        className={`group flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-8 min-h-64 hover:opacity-95 transition-opacity ${className}`}
        aria-label={title}
      >
        <Icon className="h-8 w-8 text-primary-foreground/60" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            {title}
          </h3>
          <p className="mt-2 max-w-xs text-sm text-primary-foreground/70">{subtitle}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-foreground">
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </a>
    )
  }

  return (
    <a
      href={href}
      className={`group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 min-h-28 hover:bg-muted/40 transition-colors ${className}`}
      aria-label={title}
    >
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div>
        <p className="text-xs font-medium text-muted-foreground">{eyebrow}</p>
        <h3 className="mt-0.5 text-lg font-bold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  )
}

