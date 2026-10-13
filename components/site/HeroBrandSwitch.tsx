'use client'

import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Card, CardFooter, CardHeader, CardMedia, CardTitle } from '@amezquita/design-system/components/composition/Card'
import { DEMO_BRANDS, DEMO_BRAND_CARDS, DEFAULT_BRAND, type DemoBrand } from '@/lib/demo-brands'
import { chooseBrand, useSiteBrand } from '@/lib/site-brand'

/** A token value per mode, read from the package's token reference on the server. */
type ModeValue = { light: string; dark: string }

export type BrandSpec = { accent: ModeValue; radius: ModeValue; font: ModeValue }

function Value({ value }: { value: ModeValue }) {
  if (value.light === value.dark) return <>{value.light}</>
  return (
    <>
      <span className="hero-switch__value--light">{value.light}</span>
      <span className="hero-switch__value--dark">{value.dark}</span>
    </>
  )
}

/**
 * Picks the brand the whole site wears. It's a setting, not tabs: nothing
 * here owns a panel. Which option looks selected, and which card shows, come
 * from <html data-brand> in CSS, so a returning visitor's pick is right from
 * first paint; aria-checked follows it through useSiteBrand.
 */
export function HeroBrandSwitch({ specs }: { specs: Record<DemoBrand, BrandSpec> }) {
  const brand = useSiteBrand()
  const pick = chooseBrand

  return (
    <div className="hero-switch">
      <div role="radiogroup" aria-label="Brand for this site" className="brand-switch">
        {DEMO_BRANDS.map(b => (
          <button
            key={b}
            type="button"
            role="radio"
            aria-checked={brand === b}
            tabIndex={brand === b ? 0 : -1}
            data-for={b}
            className="brand-switch__option"
            onClick={() => pick(b)}
            onKeyDown={e => {
              const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
              if (!step) return
              e.preventDefault()
              const next = DEMO_BRANDS[(DEMO_BRANDS.indexOf(b) + step + DEMO_BRANDS.length) % DEMO_BRANDS.length]
              pick(next)
              const group = e.currentTarget.parentElement
              group?.querySelector<HTMLButtonElement>(`[data-for="${next}"]`)?.focus()
            }}
          >
            {b}
          </button>
        ))}
      </div>
      <div className="hero-switch__cards">
        {DEMO_BRANDS.map(b => {
          const card = DEMO_BRAND_CARDS[b]
          const spec = specs[b]
          return (
            <div key={b} data-for={b} className="hero-switch__card">
              <Card>
                <CardMedia>
                  {/* Decorative: the title beside it says what the picture is. */}
                  <img
                    src={card.image}
                    alt=""
                    width={1584}
                    height={672}
                    loading={b === DEFAULT_BRAND ? 'eager' : 'lazy'}
                  />
                </CardMedia>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <p className="hero-switch__meta">Updated 2 days ago</p>
                </CardHeader>
                <CardFooter>
                  <Button>Read more</Button>
                </CardFooter>
              </Card>
              <p className="hero-switch__tokens">
                <code>
                  accent <Value value={spec.accent} /> · radius <Value value={spec.radius} /> · <Value value={spec.font} />
                </code>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
