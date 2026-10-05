import type { Metadata } from 'next'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { DoDont } from '@/components/site/DoDont'
import { TokenGroups } from '@/components/site/TokenGroups'
import { getTokensByCategory } from '@/lib/ds'
import { groupTokens, inBase } from '@/lib/token-groups'

export const metadata: Metadata = {
  title: 'Spacing',
  description: 'The spacing tokens in the base theme, named by role rather than size.',
}

const GROUPS = [
  {
    title: 'Page layout',
    description: 'The side gutter and the gap between major sections. Both are fluid: they grow with the viewport between a minimum and a maximum.',
    match: (n: string) => n.startsWith('space-layout-') || n === 'space-section-gap',
  },
  {
    title: 'Gaps',
    description: 'Distance between things, from components in a section down to the tightest gap inside a small element.',
    match: (n: string) => n.endsWith('-gap'),
  },
  {
    title: 'Padding',
    description: 'Space inside things. Control padding for buttons and inputs, prominent and compact for larger and smaller variants, container and dialog padding for boxes.',
    match: (n: string) => n.includes('-padding'),
  },
]

const SECTIONS = [
  { id: 'tokens', label: 'Tokens' },
  { id: 'usage', label: 'Usage' },
  { id: 'do-dont', label: 'Do and don’t' },
]

const EXAMPLE = `.settings-form {
  display: grid;
  gap: var(--space-element-gap);      /* between fields */
  padding: var(--space-container-padding);
}

.settings-form__actions {
  display: flex;
  gap: var(--space-inline-gap);       /* between buttons */
  margin-top: var(--space-component-gap);
}`

export default function SpacingPage() {
  const tokens = inBase(getTokensByCategory('spacing'))
  const groups = groupTokens(tokens, GROUPS)

  return (
    <DocPage
      eyebrow="Foundations"
      title="Spacing"
      lead={
        <p>
          {tokens.length} spacing tokens, named for what they separate rather than how big they are. Pick
          the role and the size follows, so two components that mean the same thing end up the same distance
          apart. Spacing is the same in light and dark.
        </p>
      }
      sections={SECTIONS}
    >
      <DocSection id="tokens" title="Tokens">
        <TokenGroups groups={groups} preview="space" />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock code={EXAMPLE} language="css" />
      </DocSection>

      <DocSection id="do-dont" title="Do and don’t">
        <DoDont
          dos={[
            <>Choose by relationship: fields in a form are elements, cards in a grid are components.</>,
            <>Use the fluid layout tokens for page gutters and section spacing, so small screens get less.</>,
            <>Use a padding token inside a box and a gap token between boxes.</>,
          ]}
          donts={[
            <>Write <code>padding: 16px</code>. The linter rejects hardcoded spacing in component CSS.</>,
            <>Pick a token because its value happens to be right. If the role is wrong, the next change to it will be too.</>,
            <>Use margins to separate siblings when the parent can set a gap.</>,
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
