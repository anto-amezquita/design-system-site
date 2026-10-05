import type { Metadata } from 'next'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { DoDont } from '@/components/site/DoDont'
import { TokenGroups } from '@/components/site/TokenGroups'
import { getTokensByCategory } from '@/lib/ds'
import { groupTokens, inBase } from '@/lib/token-groups'

export const metadata: Metadata = {
  title: 'Color',
  description: 'Every colour token in the base theme, with light and dark values.',
}

const GROUPS = [
  {
    title: 'Neutral scale',
    description: 'The gray ramp the other colour roles resolve to. It flips in dark mode, so 50 is always the page and 900 always the strongest contrast.',
    match: (n: string) => n.startsWith('color-neutral-'),
  },
  {
    title: 'Surface',
    description: 'Background layers, from the page itself to raised containers, plus an inverse surface for dark-on-light moments.',
    match: (n: string) => n.startsWith('color-surface-'),
  },
  {
    title: 'Text',
    description: 'Primary for body copy and headings, secondary for supporting text, inverse for text on an inverse surface.',
    match: (n: string) => n.startsWith('color-text-'),
  },
  {
    title: 'Accent',
    description: 'Primary actions and selected states. In base it’s near-black; a brand changes these three to put its own colour on actions.',
    match: (n: string) => n.startsWith('color-accent-'),
  },
  {
    title: 'Border',
    description: 'Dividers and outlines, the focus ring, and the curtain colour used by route transitions.',
    match: (n: string) => n.startsWith('color-border-') || n === 'color-curtain',
  },
  {
    title: 'Feedback',
    description: 'Error, success, warning and info. Each state has a background, a foreground and a border, used together by Alert, Toast and form errors.',
    match: (n: string) => n.startsWith('color-feedback-'),
  },
  {
    title: 'Skeleton',
    description: 'The two colours a loading skeleton pulses between.',
    match: (n: string) => n.startsWith('color-skeleton-'),
  },
]

const SECTIONS = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'usage', label: 'Usage' },
  { id: 'do-dont', label: 'Do and don’t' },
]

const EXAMPLE = `.notice {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
  border: var(--border-width-default) solid var(--color-border-default);
}

.notice__meta {
  color: var(--color-text-secondary);
}

/* Dark mode needs no extra CSS: the same tokens
   resolve to dark values under [data-mode="dark"]. */`

export default function ColorPage() {
  const tokens = inBase(getTokensByCategory('color'))
  const groups = groupTokens(tokens, GROUPS)

  return (
    <DocPage
      eyebrow="Foundations"
      title="Color"
      lead={
        <p>
          {tokens.length} colour tokens in the base theme. Components only use these semantic roles, never
          the raw palettes underneath, which is what lets a brand or dark mode change every component at once.
          The swatches are painted from the live CSS variables, light on the left and dark on the right.
        </p>
      }
      sections={SECTIONS}
    >
      <DocSection id="tokens" title="Tokens">
        <TokenGroups groups={groups} preview="color" showUsedBy />
      </DocSection>

      <DocSection
        id="usage"
        title="Usage"
        lead={<p>Reach for the role, not the shade. A surface token on a background, a text token on text.</p>}
      >
        <CodeBlock code={EXAMPLE} language="css" />
      </DocSection>

      <DocSection id="do-dont" title="Do and don’t">
        <DoDont
          dos={[
            <>Use <code>--color-text-secondary</code> for supporting text, so it stays readable in both modes.</>,
            <>Pair each feedback background with its own foreground and border.</>,
            <>Pair colour with text or an icon when it carries meaning, like an error.</>,
          ]}
          donts={[
            <>Write a hex value. The linter rejects it in component CSS, and it won’t follow dark mode.</>,
            <>Use a neutral step for a role that has its own token, like <code>--color-neutral-200</code> for a border.</>,
            <>Use the accent for decoration. It marks the main action.</>,
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
