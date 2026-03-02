import { cn } from '@/lib/utils'

// The 4 real categories exposed by fakestoreapi.com/products/categories
export const FAKE_STORE_CATEGORIES = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
] as const

export type FakeStoreCategory = (typeof FAKE_STORE_CATEGORIES)[number]

const categoryMeta: Record<FakeStoreCategory, { label: string; emoji: string }> = {
  electronics: { label: 'Electronics', emoji: '🎧' },
  jewelery: { label: 'Jewellery', emoji: '💍' },
  "men's clothing": { label: "Men's", emoji: '👔' },
  "women's clothing": { label: "Women's", emoji: '👗' },
}

interface CategoryFilterBarProps {
  active: FakeStoreCategory | null
  onChange: (category: FakeStoreCategory | null) => void
  className?: string
}

export function CategoryFilterBar({ active, onChange, className }: CategoryFilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className={cn(
        'flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none',
        className
      )}
    >
      {/* All / reset pill */}
      <button
        onClick={() => onChange(null)}
        className={cn(
          'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
          active === null
            ? 'border-primary bg-primary text-primary-foreground'
            : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
        )}
        aria-pressed={active === null}
      >
        All
      </button>

      {FAKE_STORE_CATEGORIES.map((cat) => {
        const { label, emoji } = categoryMeta[cat]
        const isActive = active === cat
        return (
          <button
            key={cat}
            onClick={() => onChange(isActive ? null : cat)}
            className={cn(
              'shrink-0 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-foreground hover:text-foreground'
            )}
            aria-pressed={isActive}
          >
            <span aria-hidden>{emoji}</span>
            {label}
          </button>
        )
      })}
    </div>
  )
}
