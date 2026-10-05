import type { Metadata } from 'next'
import { Badge } from '@amezquita/design-system/components/primitives/Badge'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { DocPage } from '@/components/site/DocPage'
import { Markdown } from '@/components/site/Markdown'
import { getChangelogMarkdown, getPackageVersion } from '@/lib/ds'
import { parseChangelog, type ChangeKind } from '@/lib/changelog'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Every release of @amezquita/design-system: breaking changes, features and fixes.',
}

const KIND_BADGE: Record<ChangeKind, 'error' | 'info' | 'neutral'> = {
  breaking: 'error',
  features: 'info',
  fixes: 'neutral',
  other: 'neutral',
}

export default function ChangelogPage() {
  const versions = parseChangelog(getChangelogMarkdown())
  const installed = getPackageVersion()

  return (
    <DocPage
      title="Changelog"
      lead={
        <p>
          Every release, read from the <code>CHANGELOG.md</code> in the installed package. Breaking changes
          come first, each with what to change in your code. This site is on {installed}.
        </p>
      }
      sections={versions.map(v => ({ id: v.id, label: v.version }))}
    >
      {versions.map(v => (
        <section key={v.id} className="release" aria-labelledby={v.id}>
          <div className="release__head">
            <Heading level={4} as="h2" id={v.id}>{v.version}</Heading>
            {v.groups.map(g => (
              <Badge key={g.kind} variant={KIND_BADGE[g.kind]} shape="status">{g.label}</Badge>
            ))}
          </div>
          {v.groups.map(g => (
            <div key={g.label} className="release__group">
              <Heading level={5} as="h3">{g.label}</Heading>
              <Markdown source={g.body} headingLevel={3} idPrefix={`${v.id}-`} />
            </div>
          ))}
        </section>
      ))}
    </DocPage>
  )
}
