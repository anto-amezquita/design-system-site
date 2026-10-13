'use client'

import { useState } from 'react'
import { Button } from '@amezquita/design-system/components/primitives/Button'
import { Card, CardFooter, CardHeader, CardMedia, CardTitle } from '@amezquita/design-system/components/composition/Card'
import { ThemeScope } from '@amezquita/design-system/components/composition/ThemeScope'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@amezquita/design-system/components/patterns/Tabs'
import '@amezquita/design-system/styles/brands/demo-cool-scoped.css'
import '@amezquita/design-system/styles/brands/demo-warm-scoped.css'
import '@amezquita/design-system/styles/brands/demo-soft-scoped.css'
import { DEMO_BRANDS, DEMO_BRAND_CARDS, type DemoBrand } from '@/lib/demo-brands'

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
 * One real Card, re-skinned by ThemeScope as the brand changes. Nothing in the
 * card changes but the brand: the markup and props are the same three times.
 */
export function HeroBrandSwitch({ specs }: { specs: Record<DemoBrand, BrandSpec> }) {
  const [brand, setBrand] = useState<DemoBrand>('demo-cool')

  return (
    <Tabs
      variant="pill"
      size="sm"
      value={brand}
      onValueChange={v => setBrand(v as DemoBrand)}
      className="hero-switch"
    >
      <TabsList aria-label="Brand">
        {DEMO_BRANDS.map(b => <TabsTrigger key={b} value={b}>{b}</TabsTrigger>)}
      </TabsList>
      {DEMO_BRANDS.map(b => {
        const card = DEMO_BRAND_CARDS[b]
        const spec = specs[b]
        return (
          <TabsContent key={b} value={b} className="hero-switch__panel">
            <ThemeScope brand={b} className="hero-switch__scope">
              <Card>
                <CardMedia>
                  {/* Decorative: the title beside it says what the picture is. */}
                  <img src={card.image} alt="" width={1584} height={672} />
                </CardMedia>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <p className="hero-switch__meta">Updated 2 days ago</p>
                </CardHeader>
                <CardFooter>
                  <Button>Read more</Button>
                </CardFooter>
              </Card>
            </ThemeScope>
            <p className="hero-switch__tokens">
              <code>
                accent <Value value={spec.accent} /> · radius <Value value={spec.radius} /> · <Value value={spec.font} />
              </code>
            </p>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
