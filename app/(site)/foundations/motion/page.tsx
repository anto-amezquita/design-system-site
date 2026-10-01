import type { Metadata } from 'next'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { DoDont } from '@/components/site/DoDont'
import { MotionDemo, type MotionItem } from '@/components/site/MotionDemo'
import { TokenTable } from '@/components/site/TokenTable'
import { getTokens, getTokensByCategory } from '@/lib/ds'
import { inBase } from '@/lib/token-groups'

export const metadata: Metadata = {
  title: 'Motion',
  description: 'Duration and easing tokens in the base theme, with a demo of each.',
}

/** Duration values may be ms or s: parseInt alone would read "1.2s" as 1. */
function toMs(value: string): number {
  const match = value.match(/^([\d.]+)(ms|s)?$/)
  if (!match) return 0
  const n = parseFloat(match[1])
  return match[2] === 's' ? n * 1000 : n
}

const SECTIONS = [
  { id: 'demo', label: 'Demo' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'usage', label: 'Usage' },
  { id: 'do-dont', label: 'Do and don’t' },
]

const EXAMPLE = `.panel {
  transition: opacity var(--duration-transition) var(--easing-default);
}

.panel[data-state='open'] {
  animation: panel-in var(--duration-entrance) var(--easing-out);
}

@media (prefers-reduced-motion: reduce) {
  .panel[data-state='open'] {
    animation: none;
  }
}`

export default function MotionPage() {
  const durationTokens = inBase(getTokensByCategory('motion'))
  // The three easing curves have no semantic layer above them; components use them directly.
  const easingTokens = getTokens().filter(t => t.name.startsWith('easing-'))

  const durations: MotionItem[] = durationTokens
    .map(t => {
      const value = t.resolved['base-light'] ?? t.rawValue
      return { cssVar: t.cssVar, value, ms: toMs(value), description: t.description }
    })
    .sort((a, b) => a.ms - b.ms)

  const easings: MotionItem[] = easingTokens.map(t => ({
    cssVar: t.cssVar,
    value: t.resolved['base-light'] ?? t.rawValue,
    ms: 0,
    description: t.description,
  }))

  return (
    <DocPage
      eyebrow="Foundations"
      title="Motion"
      lead={
        <p>
          {durationTokens.length} duration tokens and {easingTokens.length} easing curves. Motion here
          explains a change: something opened, something loaded. It’s functional by default, and the
          components drop their animation under <code>prefers-reduced-motion</code>.
        </p>
      }
      sections={SECTIONS}
    >
      <DocSection
        id="demo"
        title="Demo"
        lead={<p>Press Play to run a bar over each duration. With reduced motion on, the bars jump to the end instead.</p>}
      >
        <MotionDemo durations={durations} easings={easings} />
      </DocSection>

      <DocSection id="tokens" title="Tokens">
        <TokenTable tokens={durationTokens} showUsedBy label="Duration tokens" />
        <TokenTable tokens={easingTokens} label="Easing tokens" />
      </DocSection>

      <DocSection id="usage" title="Usage">
        <CodeBlock code={EXAMPLE} language="css" />
      </DocSection>

      <DocSection id="do-dont" title="Do and don’t">
        <DoDont
          dos={[
            <>Use the duration that matches the job: interaction for hover, entrance for a dialog opening.</>,
            <>Ease out for things arriving and ease in for things leaving.</>,
            <>Give every animation a reduced-motion rule.</>,
          ]}
          donts={[
            <>Write <code>transition: 200ms</code>. The linter rejects hardcoded motion in component CSS.</>,
            <>Animate for decoration. If nothing changed, nothing should move.</>,
            <>Make people wait on an animation before they can act.</>,
          ]}
        />
      </DocSection>
    </DocPage>
  )
}
