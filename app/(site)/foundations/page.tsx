import type { Metadata } from 'next'
import { SiteLink } from '@/components/site/SiteLink'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { TokenGroups } from '@/components/site/TokenGroups'
import { getTokenReference, getTokensByCategory } from '@/lib/ds'
import { FOUNDATION_PAGES } from '@/lib/nav'
import { inBase } from '@/lib/token-groups'
import { DEMO_BRANDS } from '@/lib/demo-brands'

export const metadata: Metadata = {
  title: 'Foundations',
  description: 'The design tokens: colour, spacing, typography, motion and the rest.',
}

const PAGE_CATEGORIES: Record<(typeof FOUNDATION_PAGES)[number]['slug'], { category: string; desc: string }> = {
  color: { category: 'color', desc: 'Surfaces, text, accent, borders and feedback, light and dark.' },
  spacing: { category: 'spacing', desc: 'Gaps and padding, named by what they separate.' },
  typography: { category: 'typography', desc: 'The type scale, families, weights and line heights.' },
  motion: { category: 'motion', desc: 'Durations and easing curves, with a demo.' },
}

const OTHER_CATEGORIES = [
  { category: 'radius', title: 'Radius', description: 'Corner rounding by role: components, interactive controls, images and pills.' },
  { category: 'border', title: 'Border width', description: 'The default border and the border on interactive controls.' },
  { category: 'shadow', title: 'Shadow', description: 'Elevation by component: cards, dropdowns, dialogs and toasts.' },
  { category: 'size', title: 'Size', description: 'The focus ring, icon sizes, the default dialog width and the container widths for text, media and pages.' },
  { category: 'opacity', title: 'Opacity', description: 'The overlay behind a dialog, and disabled controls.' },
  { category: 'elevation', title: 'Z-index', description: 'Stacking order, lowest to highest. The skip link sits above everything.' },
]

const SECTIONS = [
  { id: 'pages', label: 'Foundation pages' },
  { id: 'other', label: 'Other tokens' },
  { id: 'layers', label: 'How the tokens are layered' },
]

export default function FoundationsPage() {
  const { meta } = getTokenReference()
  const others = OTHER_CATEGORIES.map(c => ({
    title: c.title,
    description: c.description,
    tokens: inBase(getTokensByCategory(c.category)),
  })).filter(g => g.tokens.length > 0)
  const sameInBothModes = others.every(g => g.tokens.every(t => DEMO_BRANDS.every(b => t.resolved[`${b}-light`] === t.resolved[`${b}-dark`])))

  return (
    <DocPage
      eyebrow="Foundations"
      title="Foundations"
      lead={
        <p>
          The package has {meta.total} tokens in three layers: {meta.primitiveCount} primitives,{' '}
          {meta.semanticCount} semantic tokens and {meta.componentCount} component tokens. These pages show
          the semantic layer, the one you write CSS against, with values for the brand this site wears.
        </p>
      }
      sections={SECTIONS}
    >
      <DocSection id="pages" title="Foundation pages">
        <ul className="link-grid">
          {FOUNDATION_PAGES.map(page => (
            <li key={page.slug} className="link-card">
              <span className="link-card__title">
                <SiteLink href={`/foundations/${page.slug}`} variant="standalone">{page.label}</SiteLink>
              </span>
              <span className="link-card__desc">{PAGE_CATEGORIES[page.slug].desc}</span>
              <span className="link-card__desc">
                {inBase(getTokensByCategory(PAGE_CATEGORIES[page.slug].category)).length} tokens
              </span>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="other"
        title="Other tokens"
        lead={
          <p>
            The semantic tokens that don’t need a page of their own.
            {sameInBothModes && ' None of them change between light and dark.'}
          </p>
        }
      >
        <TokenGroups groups={others} showUsedBy />
      </DocSection>

      <DocSection id="layers" title="How the tokens are layered">
        <p>
          <strong>Primitives</strong> are raw values: a gray ramp, a 4px spacing step. Components never
          use them; the linter fails the build if one does. <strong>Semantic tokens</strong> name a role,
          like <code>--color-text-secondary</code> or <code>--space-element-gap</code>, and point at a
          primitive. A brand or dark mode changes what they point at. <strong>Component tokens</strong>{' '}
          name one component’s decisions, like <code>--button-padding-x</code>, and are listed on each{' '}
          <SiteLink href="/components">component’s page</SiteLink>.
        </p>
        <p>
          Every token, primitives included, with all four resolved values, is in{' '}
          <Link href="/tokens.json">tokens.json</Link>.
        </p>
      </DocSection>
    </DocPage>
  )
}
