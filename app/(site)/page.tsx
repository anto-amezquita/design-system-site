import NextLink from 'next/link'
import { Badge } from '@amezquita/design-system/components/primitives/Badge'
import { ThemeScope } from '@amezquita/design-system/components/composition/ThemeScope'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { LandingActions } from '@/components/site/LandingActions'
import { HeroBrandSwitch, type BrandSpec } from '@/components/site/HeroBrandSwitch'
import { DEMO_BRANDS, type DemoBrand } from '@/lib/demo-brands'
import { getBrandFonts, getBrandNames, getPackageVersion, getPublicComponents, getTokenReference } from '@/lib/ds'

// The line under the hero card: values from the package's token reference,
// so it can't drift from what the card renders.
function brandSpecs(): Record<DemoBrand, BrandSpec> {
  const { tokens } = getTokenReference()
  const resolved = (name: string) => {
    const token = tokens.find(t => t.name === name)
    if (!token) throw new Error(`The token reference has no ${name}.`)
    return token.resolved as Record<string, string>
  }
  const firstFamily = (stack: string) => stack.split(',')[0].trim().replace(/^['"]|['"]$/g, '')
  const pick = (name: string, brand: string, map: (v: string) => string = v => v) => ({
    light: map(resolved(name)[`${brand}-light`]),
    dark: map(resolved(name)[`${brand}-dark`]),
  })
  return Object.fromEntries(
    DEMO_BRANDS.map(b => [b, {
      accent: pick('color-accent-default', b),
      radius: pick('border-radius-component', b),
      font: pick('font-family-heading', b, firstFamily),
    }]),
  ) as Record<DemoBrand, BrandSpec>
}

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
  const brands = getBrandNames().length

  return (
    <div className="landing">
      {/* Each demo brand's fonts, for the card's switch. React hoists these into <head>. */}
      {DEMO_BRANDS.map(b => (
        <link key={b} rel="stylesheet" href={getBrandFonts(b).href} precedence="default" />
      ))}

      <ThemeScope brand="demo-cool" className="landing-hero">
        <section className="landing-hero__inner" aria-labelledby="landing-title">
          <div className="landing-hero__copy">
            <Badge variant="success">Stable</Badge>
            <h1 id="landing-title" className="landing-hero__title">
              <span>The fundamentals,</span> <span>done properly.</span>
            </h1>
            <p className="landing-hero__lead">
              A token-first React design system: {components} components on one token layer,
              ready for any brand and any agent.
            </p>
            <div className="landing-hero__actions"><LandingActions /></div>
          </div>
          <div className="landing-hero__demo">
            <HeroBrandSwitch specs={brandSpecs()} />
          </div>
        </section>
      </ThemeScope>

      <section className="landing__stats" aria-label="The package in numbers">
        <div className="stat-row">
          <p className="stat"><span className="stat__value">{components}</span><span className="stat__label">components</span></p>
          <p className="stat"><span className="stat__value">{meta.total}</span><span className="stat__label">tokens</span></p>
          <p className="stat"><span className="stat__value">{brands}</span><span className="stat__label">brands, light and dark</span></p>
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
