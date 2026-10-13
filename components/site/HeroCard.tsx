'use client'

import { Card, CardHeader, CardMedia, CardTitle } from '@amezquita/design-system/components/composition/Card'
import { DEMO_BRANDS, DEMO_BRAND_CARDS, DEFAULT_BRAND, type DemoBrand } from '@/lib/demo-brands'

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
 * The hero's card, once per demo brand; CSS shows the one matching
 * <html data-brand>, so it follows the header's brand picker and a returning
 * visitor's pick is right from first paint.
 */
export function HeroCard({ specs }: { specs: Record<DemoBrand, BrandSpec> }) {
  return (
    <div className="hero-switch">
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
