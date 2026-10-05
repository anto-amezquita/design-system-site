import type { Metadata } from 'next'
import { DocPage } from '@/components/site/DocPage'
import Content from './content.mdx'

export const metadata: Metadata = {
  title: 'Getting started',
  description: 'Set up @amezquita/design-system: a prompt for your AI tool, then the manual install.',
}

const SECTIONS = [
  { id: 'start-with-your-ai-tool', label: 'Start with your AI tool' },
  { id: 'install', label: 'Install' },
  { id: 'compile-it', label: 'Compile it' },
  { id: 'load-the-base-theme', label: 'Load the base theme' },
  { id: 'your-first-component', label: 'Your first component' },
  { id: 'where-to-go-next', label: 'Where to go next' },
]

export default function GettingStartedPage() {
  return (
    <DocPage
      title="Getting started"
      lead={<p>From an empty project to a first component in the base theme. Hand it to an AI tool, or do it yourself in four steps.</p>}
      sections={SECTIONS}
    >
      <div className="markdown">
        <Content />
      </div>
    </DocPage>
  )
}
