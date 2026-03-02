import { ArrowRight, Zap, Sparkles, TrendingUp } from 'lucide-react'

const promos = [
  {
    id: 'summer-sale',
    eyebrow: 'Limited time',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on selected items across every category.',
    cta: 'Shop the Sale',
    href: '/deals',
    icon: Zap,
    gradient: 'from-primary to-primary/70',
    textColor: 'text-primary-foreground',
    mutedColor: 'text-primary-foreground/70',
    size: 'large' as const,
  },
  {
    id: 'new-arrivals',
    eyebrow: 'Just dropped',
    title: 'New Arrivals',
    subtitle: 'Fresh styles added weekly.',
    cta: 'See What\'s New',
    href: '/new',
    icon: Sparkles,
    gradient: 'from-violet-500 to-purple-600',
    textColor: 'text-white',
    mutedColor: 'text-white/70',
    size: 'small' as const,
  },
  {
    id: 'trending',
    eyebrow: 'Most popular',
    title: 'Trending Now',
    subtitle: 'Top picks from our community.',
    cta: 'Explore Trends',
    href: '/products?sort=trending',
    icon: TrendingUp,
    gradient: 'from-amber-400 to-orange-500',
    textColor: 'text-white',
    mutedColor: 'text-white/70',
    size: 'small' as const,
  },
]

export function PromoGrid() {
  const [large, ...smalls] = promos

  return (
    <section className="bg-muted/20 py-16" aria-labelledby="promos-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-muted-foreground">Handpicked for you</p>
          <h2 id="promos-heading" className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Featured Collections
          </h2>
        </div>

        {/* Grid: 1 large left + 2 stacked right */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Large card — spans 2 columns on md+ */}
          <PromoCard promo={large} className="md:col-span-2" />

          {/* Two small cards stacked */}
          <div className="flex flex-col gap-4">
            {smalls.map((promo) => (
              <PromoCard key={promo.id} promo={promo} className="flex-1" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Internal card component ── */

interface PromoCardProps {
  promo: (typeof promos)[number]
  className?: string
}

function PromoCard({ promo, className = '' }: PromoCardProps) {
  const { eyebrow, title, subtitle, cta, href, icon: Icon, gradient, textColor, mutedColor, size } = promo

  return (
    <a
      href={href}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} ${size === 'large' ? 'min-h-72 p-8' : 'min-h-40 p-6'} shadow-sm hover:shadow-lg transition-shadow ${className}`}
      aria-label={title}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-4 top-4 opacity-20"
      >
        <Icon className={size === 'large' ? 'h-24 w-24' : 'h-16 w-16'} />
      </div>

      {/* Content */}
      <div className="relative">
        <p className={`text-xs font-semibold uppercase tracking-widest ${mutedColor}`}>
          {eyebrow}
        </p>
        <h3 className={`mt-1 font-bold tracking-tight ${textColor} ${size === 'large' ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>
          {title}
        </h3>
        <p className={`mt-1.5 text-sm leading-relaxed ${mutedColor} ${size === 'large' ? 'max-w-xs' : ''}`}>
          {subtitle}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold ${textColor} backdrop-blur-sm group-hover:bg-white/30 transition-colors`}
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  )
}
