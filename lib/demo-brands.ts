// The demo brands the docs site shows (decisions/0023 in the library). Kept
// out of 'use client' modules so server code can read them too: a value
// exported from a client module reaches the server as a reference, not a value.
export const DEMO_BRANDS = ['demo-cool', 'demo-warm', 'demo-soft'] as const

export type DemoBrand = (typeof DEMO_BRANDS)[number]

// The whole site wears a demo brand, picked in the landing hero and
// remembered in the browser.
export const DEFAULT_BRAND: DemoBrand = 'demo-cool'
export const BRAND_STORAGE_KEY = 'ds-site-brand'

export function isDemoBrand(value: unknown): value is DemoBrand {
  return typeof value === 'string' && (DEMO_BRANDS as readonly string[]).includes(value)
}

// The landing hero's card, once per demo brand. Each image is generated for
// its brand (design/images/ on the docs/site-redesign branch).
export const DEMO_BRAND_CARDS: Record<DemoBrand, { title: string; image: string }> = {
  'demo-cool': { title: 'Quiet days on the west coast', image: '/hero/demo-cool.jpg' },
  'demo-warm': { title: 'Sun-baked doorways', image: '/hero/demo-warm.jpg' },
  'demo-soft': { title: 'Lavender at first light', image: '/hero/demo-soft.jpg' },
}
