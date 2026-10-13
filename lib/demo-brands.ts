// The demo brands the docs site shows (decisions/0023 in the library). Kept
// out of the 'use client' demo module so server pages can read the list too:
// a value exported from a client module reaches the server as a reference,
// not an array.
export const DEMO_BRANDS = ['demo-cool', 'demo-warm', 'demo-soft'] as const

export type DemoBrand = (typeof DEMO_BRANDS)[number]

// The landing hero's card, once per demo brand. Each image is generated for
// its brand (design/images/ on the docs/site-redesign branch).
export const DEMO_BRAND_CARDS: Record<DemoBrand, { title: string; image: string }> = {
  'demo-cool': { title: 'Quiet days on the west coast', image: '/hero/demo-cool.jpg' },
  'demo-warm': { title: 'Sun-baked doorways', image: '/hero/demo-warm.jpg' },
  'demo-soft': { title: 'Lavender at first light', image: '/hero/demo-soft.jpg' },
}
