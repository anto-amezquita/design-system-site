// Shared bits for the live renders: a layout helper and the site's own
// photos (the landing hero's, one per demo brand), so image demos need no
// network and no placeholder art.

export function Stack({ children, row = false }: { children: React.ReactNode; row?: boolean }) {
  return <div className={row ? 'demo-stack demo-stack--row' : 'demo-stack'}>{children}</div>
}

export const PHOTOS = [
  { src: '/hero/demo-cool.jpg', alt: 'Grassy dunes above a grey sea under an overcast sky', caption: 'Quiet days on the west coast', width: 1584, height: 672 },
  { src: '/hero/demo-warm.jpg', alt: 'An arched wooden door in a terracotta wall, half in shadow', caption: 'Sun-baked doorways', width: 1584, height: 672 },
  { src: '/hero/demo-soft.jpg', alt: 'Rows of lavender running towards misty hills at dawn', caption: 'Lavender at first light', width: 1584, height: 672 },
]

/** October 2026 in the calendar demos: fixed, so the renders don't drift with the date. */
export const oct = (day: number) => new Date(2026, 9, day)
