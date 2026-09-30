import type { Metadata } from 'next'
import { DocPage } from '@/components/site/DocPage'
import Content from './content.mdx'

export const metadata: Metadata = {
  title: 'Guidelines',
  description: 'How changes to @amezquita/design-system are checked, recorded, versioned and released.',
}

const SECTIONS = [
  { id: 'governance', label: 'Governance' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'versioning', label: 'Versioning' },
  { id: 'releases', label: 'Releases' },
  { id: 'how-this-site-keeps-up', label: 'How this site keeps up' },
]

export default function GuidelinesPage() {
  return (
    <DocPage
      title="Guidelines"
      lead={<p>How the system changes: what every change is checked against, how decisions are recorded, and how a release reaches you.</p>}
      sections={SECTIONS}
    >
      <div className="markdown">
        <Content />
      </div>
    </DocPage>
  )
}
