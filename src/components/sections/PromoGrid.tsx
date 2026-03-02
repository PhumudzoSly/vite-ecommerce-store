import { ArrowRight, Zap, Sparkles, TrendingUp } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { AppLink } from "@/components/routing/AppLink"

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
    href: '/products',
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
      <AppLink to={href} className={`block group ${className}`} aria-label={title}>
        <Card className="h-full bg-primary text-primary-foreground border-none flex flex-col justify-between overflow-hidden hover:opacity-95 transition-opacity min-h-64">
          <CardContent className="p-8 flex flex-col justify-between h-full">
            <Icon className="h-8 w-8 text-primary-foreground/60" />
            <div className="mt-auto pt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">{eyebrow}</p>
              <h3 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h3>
              <p className="mt-2 max-w-xs text-sm text-primary-foreground/70">{subtitle}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                {cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </CardContent>
        </Card>
      </AppLink>
    )
  }

  return (
    <AppLink to={href} className={`block group ${className}`} aria-label={title}>
      <Card className="h-full flex flex-col justify-between hover:bg-muted/40 transition-colors min-h-28">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <div className="mt-auto pt-4">
            <p className="text-xs font-medium text-muted-foreground">{eyebrow}</p>
            <h3 className="mt-0.5 text-lg font-bold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
              {cta}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </CardContent>
      </Card>
    </AppLink>
  )
}
