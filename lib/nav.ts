import 'server-only'
import type { NavItem } from '@amezquita/design-system/components/patterns/SideNav'
import { TIERS, TIER_LABELS, getPublicComponents } from './ds'

/** The top bar: the site's sections. Also passed to SideNav as headerItems for the mobile drawer. */
export const HEADER_ITEMS: NavItem[] = [
  { id: 'foundations', label: 'Foundations', href: '/foundations' },
  { id: 'components', label: 'Components', href: '/components' },
  { id: 'themes', label: 'Themes', href: '/themes' },
  { id: 'changelog', label: 'Changelog', href: '/changelog' },
  { id: 'ai', label: 'Working with AI', href: '/working-with-ai' },
]

export const FOUNDATION_PAGES = [
  { slug: 'color', label: 'Color' },
  { slug: 'spacing', label: 'Spacing' },
  { slug: 'typography', label: 'Typography' },
  { slug: 'motion', label: 'Motion' },
] as const

/** The left-hand section tree on docs pages. Component links come from the installed package. */
export function getSectionItems(): NavItem[] {
  const components = getPublicComponents()
  return [
    { id: 'getting-started', label: 'Getting started', href: '/getting-started' },
    {
      id: 'foundations',
      label: 'Foundations',
      items: [
        { id: 'foundations-overview', label: 'Overview', href: '/foundations' },
        ...FOUNDATION_PAGES.map(p => ({ id: `foundations-${p.slug}`, label: p.label, href: `/foundations/${p.slug}` })),
      ],
    },
    { id: 'components', label: 'Components', href: '/components' },
    ...TIERS.map(tier => ({
      id: `tier-${tier}`,
      label: TIER_LABELS[tier],
      items: components
        .filter(c => c.tier === tier)
        .map(c => ({ id: `component-${c.slug}`, label: c.name, href: `/components/${c.slug}` })),
    })),
    { id: 'themes', label: 'Themes', href: '/themes' },
    { id: 'changelog', label: 'Changelog', href: '/changelog' },
    { id: 'ai', label: 'Working with AI', href: '/working-with-ai' },
    { id: 'guidelines', label: 'Guidelines', href: '/guidelines' },
  ]
}
