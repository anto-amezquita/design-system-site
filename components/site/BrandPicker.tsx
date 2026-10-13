'use client'

import { DEMO_BRANDS, type DemoBrand } from '@/lib/demo-brands'
import { chooseBrand, useSiteBrand } from '@/lib/site-brand'

/**
 * The header's brand picker: one circle per demo brand, each in that brand's
 * own accent. The circle carries data-brand, so var(--color-accent-default)
 * resolves that brand's value from the scoped CSS the site loads, light or
 * dark with the page. The active one is solid and ringed; the others are a
 * ring in their colour. Same radio-group behaviour as the hero's switch,
 * which it stays in step with through useSiteBrand.
 */
export function BrandPicker() {
  const brand = useSiteBrand()

  return (
    <div role="radiogroup" aria-label="Brand for this site" className="brand-picker">
      {DEMO_BRANDS.map(b => (
        <button
          key={b}
          type="button"
          role="radio"
          aria-checked={brand === b}
          aria-label={b}
          title={b}
          tabIndex={brand === b ? 0 : -1}
          data-for={b}
          className="brand-picker__option"
          onClick={() => chooseBrand(b)}
          onKeyDown={e => {
            const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
            if (!step) return
            e.preventDefault()
            const next: DemoBrand = DEMO_BRANDS[(DEMO_BRANDS.indexOf(b) + step + DEMO_BRANDS.length) % DEMO_BRANDS.length]
            chooseBrand(next)
            e.currentTarget.parentElement?.querySelector<HTMLButtonElement>(`[data-for="${next}"]`)?.focus()
          }}
        >
          <span className="brand-picker__dot" data-brand={b} aria-hidden="true" />
        </button>
      ))}
    </div>
  )
}
