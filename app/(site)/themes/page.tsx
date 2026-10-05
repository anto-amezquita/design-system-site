import type { Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@amezquita/design-system/components/patterns/Table'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { ThemeExplorer } from '@/components/themes/ThemeExplorer'
import { getBrandFonts, getTokens, type Axis, type Token } from '@/lib/ds'
// The portfolio brand, scoped to [data-brand="portfolio"]: only the panel
// that carries the attribute takes it, so the rest of this page stays base,
// and so does every page visited after it. Base comes from the root layout.
// portfolio-light.css and portfolio-dark.css set :root and aren't loaded anywhere.
import '@amezquita/design-system/styles/brands/portfolio-scoped.css'

export const metadata: Metadata = {
  title: 'Themes',
  description: 'The base and portfolio themes side by side on the same screen, and every token the portfolio brand changes.',
}

const SECTIONS = [
  { id: 'compare', label: 'Side by side' },
  { id: 'model', label: 'How themes work' },
  { id: 'differences', label: 'What the portfolio changes' },
]

const SETUP = `// Base, built in: every project loads these two.
import '@amezquita/design-system/styles/brands/base-light.css'
import '@amezquita/design-system/styles/brands/base-dark.css'

// A brand, loaded after base. Only the tokens it changes are in it.
import './brand-light.css'
import './brand-dark.css'`

const BRAND_FILE = `/* brand-light.css — a file you own, copied from portfolio-light.css */
:root, [data-mode="light"] {
  --color-accent-default: #15616d;
  --color-accent-hover: #0f4750;
  --font-family-base: 'Your Font', sans-serif;
}`

const SCOPED = `import '@amezquita/design-system/styles/brands/base-light.css'
import '@amezquita/design-system/styles/brands/base-dark.css'
import '@amezquita/design-system/styles/brands/portfolio-scoped.css'

import { ThemeScope } from '@amezquita/design-system/components/composition/ThemeScope'

<ThemeScope brand="portfolio">…</ThemeScope>`

/** Semantic and component tokens whose value in either mode differs between base and portfolio. */
function differences(tokens: Token[]): Token[] {
  const differs = (t: Token, a: Axis, b: Axis) => t.resolved[a] != null && t.resolved[b] != null && t.resolved[a] !== t.resolved[b]
  return tokens.filter(
    t => t.category !== 'primitive' && (differs(t, 'base-light', 'portfolio-light') || differs(t, 'base-dark', 'portfolio-dark')),
  )
}

function Value({ token, axis }: { token: Token; axis: Axis }) {
  const value = token.resolved[axis]
  if (value == null) return <span className="token-muted">—</span>
  return (
    <span className="compare-value">
      {/* Painted from the reference value, so each cell shows its own column's theme and mode. */}
      {token.type === 'color' && <span className="swatch swatch--static" aria-hidden="true" style={{ background: value }} />}
      <code>{value}</code>
    </span>
  )
}

function CompareTable({ tokens, label }: { tokens: Token[]; label: string }) {
  return (
    <div className="table-scroll">
      <Table compact scrollLabel={label}>
        <TableHead>
          <TableRow>
            <TableHeader scope="col">Token</TableHeader>
            <TableHeader scope="col">Base light</TableHeader>
            <TableHeader scope="col">Portfolio light</TableHeader>
            <TableHeader scope="col">Base dark</TableHeader>
            <TableHeader scope="col">Portfolio dark</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {tokens.map(t => (
            <TableRow key={t.name}>
              <TableCell><code>{t.cssVar}</code></TableCell>
              <TableCell><Value token={t} axis="base-light" /></TableCell>
              <TableCell><Value token={t} axis="portfolio-light" /></TableCell>
              <TableCell><Value token={t} axis="base-dark" /></TableCell>
              <TableCell><Value token={t} axis="portfolio-dark" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default function ThemesPage() {
  const tokens = getTokens()
  const changed = differences(tokens)
  const added = tokens.filter(t => t.category !== 'primitive' && t.resolved['base-light'] == null && t.resolved['portfolio-light'] != null)

  return (
    <DocPage
      title="Themes"
      lead={
        <p>
          A default theme is built in, and a brand is a CSS file you load after it. The screen below is the same
          code twice, on this page. The only difference is that the second panel is a <code>ThemeScope</code> with the portfolio brand.
        </p>
      }
      sections={added.length > 0 ? [...SECTIONS, { id: 'additions', label: 'What the portfolio adds' }] : SECTIONS}
    >
      <DocSection id="compare" title="Side by side">
        {/* The portfolio brand names Schibsted Grotesk; the package names the font but doesn't ship it. */}
        <link rel="stylesheet" href={getBrandFonts('portfolio').href} precedence="default" />
        <ThemeExplorer />
      </DocSection>

      <DocSection id="model" title="How themes work">
        <p>
          <strong>Base</strong> is brand-neutral: a real gray, the system font, a near-black accent. It’s
          complete on its own, so a new project looks finished before it has a brand. Everything on this site
          outside the portfolio panel above is base.
        </p>
        <p>
          <strong>A brand</strong> overrides semantic tokens and nothing else, in a file loaded after base.
          Components never know which brand is active. The portfolio brand ships in the package as a working
          example: copy <code>portfolio-light.css</code> and <code>portfolio-dark.css</code> into your project,
          rename them, and change the values.
        </p>
        <CodeBlock code={SETUP} language="tsx" title="Loading a brand" />
        <CodeBlock code={BRAND_FILE} language="css" title="brand-light.css" />
        <p>
          <code>portfolio-light.css</code> and <code>portfolio-dark.css</code> set their tokens on{' '}
          <code>:root</code>, so they restyle the whole page. To show a brand in one part of a page, as this page
          does, load <code>portfolio-scoped.css</code> instead of those two and wrap the part in{' '}
          <code>&lt;ThemeScope brand="portfolio"&gt;</code>. It follows the page’s mode, or its own with{' '}
          <code>mode</code>. Menus, selects and dialogs opened inside it match it too, although they render at the
          end of the page.
        </p>
        <CodeBlock code={SCOPED} language="tsx" title="One brand inside a page" />
      </DocSection>

      <DocSection
        id="differences"
        title="What the portfolio changes"
        lead={<p>{changed.length} tokens resolve differently in the portfolio brand, in at least one mode. Everything else is inherited from base.</p>}
      >
        <CompareTable tokens={changed} label="Tokens the portfolio brand changes" />
      </DocSection>

      {added.length > 0 && (
        <DocSection
          id="additions"
          title="What the portfolio adds"
          lead={
            <p>
              Tokens that exist only in the portfolio brand.
              {added.every(t => t.usedBy.length === 0) && ' No component in the package uses them; they’re for the portfolio site’s own CSS.'}
            </p>
          }
        >
          <CompareTable tokens={added} label="Tokens only the portfolio brand defines" />
        </DocSection>
      )}
    </DocPage>
  )
}
