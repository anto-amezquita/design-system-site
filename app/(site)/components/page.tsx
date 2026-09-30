import type { Metadata } from 'next'
import NextLink from 'next/link'
import { Link } from '@/components/ds/Link'
import { Demo, DemoProviders } from '@/components/demos/Demo'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { TIERS, TIER_DESCRIPTIONS, TIER_LABELS, getPublicComponents, plainText } from '@/lib/ds'

export const metadata: Metadata = {
  title: 'Components',
  description: 'Every public component in @amezquita/design-system, grouped by tier, each with a live render.',
}

export default function ComponentsPage() {
  const components = getPublicComponents()

  return (
    <DocPage
      title="Components"
      lead={
        <p>
          {components.length} components in three tiers, read from the installed package’s registry.
          Every card is the real component running in the base theme, not a screenshot.
        </p>
      }
      sections={TIERS.map(tier => ({ id: tier, label: TIER_LABELS[tier] }))}
    >
      <DemoProviders>
        {TIERS.map(tier => {
          const inTier = components.filter(c => c.tier === tier)
          return (
            <DocSection key={tier} id={tier} title={`${TIER_LABELS[tier]} (${inTier.length})`} lead={<p>{TIER_DESCRIPTIONS[tier]}</p>}>
              <ul className="component-grid">
                {inTier.map(c => (
                  <li key={c.slug} className="component-card">
                    <div className="component-card__preview">
                      <Demo slug={c.slug} name={c.name} />
                    </div>
                    <div className="component-card__body">
                      <span className="component-card__name">
                        <Link asChild variant="standalone">
                          <NextLink href={`/components/${c.slug}`}>{c.name}</NextLink>
                        </Link>
                      </span>
                      <span className="component-card__purpose">{plainText(c.purpose)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </DocSection>
          )
        })}
      </DemoProviders>
    </DocPage>
  )
}
