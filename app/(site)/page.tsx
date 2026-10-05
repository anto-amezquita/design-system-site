import NextLink from 'next/link'
import { Hero } from '@amezquita/design-system/components/patterns/Hero'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { LandingActions } from '@/components/site/LandingActions'
import { PACKAGE_NAME, getPackageVersion, getPublicComponents, getTokenReference } from '@/lib/ds'

const SECTIONS = [
  { href: '/getting-started', title: 'Getting started', desc: 'A prompt for your AI tool, then the manual install.' },
  { href: '/foundations', title: 'Foundations', desc: 'Colour, spacing, typography and motion tokens, light and dark.' },
  { href: '/components', title: 'Components', desc: 'Every component, live, with its props and tokens.' },
  { href: '/themes', title: 'Themes', desc: 'Base and the portfolio brand on the same screen.' },
  { href: '/changelog', title: 'Changelog', desc: 'Every release, breaking changes first.' },
  { href: '/working-with-ai', title: 'Working with AI', desc: 'The skill, llms.txt, tokens.json and the registry.' },
  { href: '/guidelines', title: 'Guidelines', desc: 'How changes are checked, versioned and released.' },
]

export default function LandingPage() {
  const version = getPackageVersion()
  const components = getPublicComponents().length
  const { meta } = getTokenReference()

  return (
    <div className="landing">
      <Hero
        eyebrow={`${PACKAGE_NAME} ${version}`}
        title="The design system, before any brand"
        titleAs="h1"
        lead="A token-first React component library. Everything on this site is what a new project gets after npm install: the brand-neutral base theme, unskinned."
        actions={<LandingActions />}
      />

      <section className="landing__stats" aria-label="The package in numbers">
        <div className="stat-row">
          <p className="stat"><span className="stat__value">{components}</span><span className="stat__label">components</span></p>
          <p className="stat"><span className="stat__value">{meta.total}</span><span className="stat__label">tokens</span></p>
          <p className="stat"><span className="stat__value">2</span><span className="stat__label">themes, light and dark</span></p>
          <p className="stat"><span className="stat__value">{version}</span><span className="stat__label">installed from npm</span></p>
        </div>
      </section>

      <section className="landing__sections" aria-labelledby="sections">
        <Heading level={5} as="h2" id="sections">What’s here</Heading>
        <ul className="link-grid">
          {SECTIONS.map(s => (
            <li key={s.href} className="link-card">
              <span className="link-card__title">
                <Link asChild variant="standalone"><NextLink href={s.href}>{s.title}</NextLink></Link>
              </span>
              <span className="link-card__desc">{s.desc}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
