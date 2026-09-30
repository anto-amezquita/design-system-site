import type { Metadata } from 'next'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { DoDont } from '@/components/site/DoDont'
import { TokenGroups } from '@/components/site/TokenGroups'
import { getTokens, getTokensByCategory } from '@/lib/ds'
import { groupTokens, inBase } from '@/lib/token-groups'

export const metadata: Metadata = {
  title: 'Typography',
  description: 'The type scale and typography tokens in the base theme.',
}

// Specimens are hand-picked (each combines a size, weight and line-height),
// unlike the token tables below, which come straight from the reference.
// So each referenced variable is checked against the installed package at
// build time: a renamed token fails the build instead of rendering var(--missing).
const SCALE = [
  { label: 'Display', size: '--font-size-display', weight: '--font-weight-display', lineHeight: '--line-height-display', sample: 'Tokens first, then components' },
  { label: 'H1 fluid', size: '--font-size-h1-fluid', weight: '--font-weight-heading', lineHeight: '--line-height-display', sample: 'Getting started' },
  { label: 'H2 fluid', size: '--font-size-h2-fluid', weight: '--font-weight-heading', lineHeight: '--line-height-heading', sample: 'Component library' },
  { label: 'H3 fluid', size: '--font-size-h3-fluid', weight: '--font-weight-heading', lineHeight: '--line-height-heading', sample: 'Foundations' },
  { label: 'H4', size: '--font-size-h4', weight: '--font-weight-heading', lineHeight: '--line-height-h4', sample: 'Install the package' },
  { label: 'H5', size: '--font-size-h5', weight: '--font-weight-heading', lineHeight: '--line-height-h5', sample: 'Props' },
  { label: 'Body', size: '--font-size-body', weight: '--font-weight-body', lineHeight: '--line-height-body', sample: 'Body text is sized for reading, so long passages stay comfortable without zooming in.' },
  { label: 'Control', size: '--font-size-control', weight: '--font-weight-control', lineHeight: '--line-height-control', sample: 'Save changes' },
  { label: 'Small', size: '--font-size-small', weight: '--font-weight-body', lineHeight: '--line-height-small', sample: 'Supporting text and table cells' },
  { label: 'Label', size: '--font-size-small', weight: '--font-weight-label', lineHeight: '--line-height-label', sample: 'Email address' },
  { label: 'Caption', size: '--font-size-caption', weight: '--font-weight-label', lineHeight: '--line-height-caption', sample: 'Updated 30 September 2026' },
]

const GROUPS = [
  { title: 'Families', description: 'The base theme uses the system UI font for text, so nothing is downloaded, and JetBrains Mono for code.', match: (n: string) => n.startsWith('font-family-') },
  { title: 'Sizes', description: 'Display and H1 to H3 have fluid versions that scale with the viewport. Everything from H4 down is fixed.', match: (n: string) => n.startsWith('font-size-') },
  { title: 'Weights', description: 'Weights by role. Title is the bold one, for small titles in card and dialog headers (decisions/0010 in the library).', match: (n: string) => n.startsWith('font-weight-') },
  { title: 'Line heights', description: 'Fixed line heights sit on a 4px grid. Display and heading use a ratio, so they follow the fluid sizes.', match: (n: string) => n.startsWith('line-height-') },
  { title: 'Letter spacing', description: 'Tighter for headings, slightly open for labels, wide for uppercase.', match: (n: string) => n.startsWith('letter-spacing-') },
]

const SECTIONS = [
  { id: 'scale', label: 'Type scale' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'usage', label: 'Usage' },
  { id: 'do-dont', label: 'Do and don’t' },
]

const EXAMPLE = `import { Heading } from '@amezquita/design-system/components/primitives/Heading'

// Visual size and document level are separate:
// a page title that looks like H2 but is the page's <h1>.
<Heading level={2} as="h1">Account settings</Heading>

/* In CSS, take size, weight and line-height as a set. */
.caption {
  font-size: var(--font-size-caption);
  font-weight: var(--font-weight-label);
  line-height: var(--line-height-caption);
}`

export default function TypographyPage() {
  const all = getTokens()
  const known = new Set(all.map(t => t.cssVar))
  for (const step of SCALE) {
    for (const cssVar of [step.size, step.weight, step.lineHeight]) {
      if (!known.has(cssVar)) {
        throw new Error(`Typography specimen "${step.label}" uses ${cssVar}, which the installed package no longer defines. Update SCALE in app/(site)/foundations/typography/page.tsx.`)
      }
    }
  }
  const value = (cssVar: string) => all.find(t => t.cssVar === cssVar)?.resolved['base-light'] ?? ''

  const tokens = inBase(getTokensByCategory('typography'))
  const groups = groupTokens(tokens, GROUPS)

  return (
    <DocPage
      eyebrow="Foundations"
      title="Typography"
      lead={
        <p>
          {tokens.length} typography tokens. The base theme sets text in the system UI font, so a new project
          starts with nothing to download; a brand swaps the family and keeps the scale. The fluid sizes
          below change with your window.
        </p>
      }
      sections={SECTIONS}
    >
      <DocSection id="scale" title="Type scale">
        <ol className="type-scale">
          {SCALE.map(step => (
            <li key={step.label} className="type-scale__step">
              <div className="type-scale__meta">
                <span className="type-scale__label">{step.label}</span>
                <code>{step.size}</code>
                <span className="token-muted">{value(step.size)} / {value(step.lineHeight)}</span>
              </div>
              <p
                className="type-scale__sample"
                style={{
                  fontSize: `var(${step.size})`,
                  fontWeight: `var(${step.weight})`,
                  lineHeight: `var(${step.lineHeight})`,
                }}
              >
                {step.sample}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection id="tokens" title="Tokens">
        <TokenGroups groups={groups} />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock code={EXAMPLE} language="tsx" />
      </DocSection>

      <DocSection id="do-dont" title="Do and don’t">
        <DoDont
          dos={[
            <>Use <code>Heading</code> for headings, and set <code>as</code> when the outline level and the visual size differ.</>,
            <>Take size, weight and line height from the same step.</>,
            <>Keep running text at body size and within <code>--size-container-text</code>.</>,
          ]}
          donts={[
            <>Hardcode a line height. The linter rejects it in component CSS.</>,
            <>Skip heading levels to get a smaller look. Change <code>level</code>, keep the outline.</>,
            <>Set a font family in a component. A brand sets it once, in its tokens.</>,
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
