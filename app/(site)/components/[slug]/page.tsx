import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import { Demo, DemoProviders } from '@/components/demos/Demo'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { Markdown } from '@/components/site/Markdown'
import {
  TIER_LABELS,
  getComponentDoc,
  getPublicComponents,
  getSubComponents,
  plainText,
} from '@/lib/ds'
import { importLine, splitTwin } from '@/lib/twin'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getPublicComponents().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const component = getPublicComponents().find(c => c.slug === slug)
  if (!component) return {}
  return { title: component.name, description: plainText(component.purpose) }
}

const STORYBOOK_URL = process.env.NEXT_PUBLIC_STORYBOOK_URL

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params
  const component = getPublicComponents().find(c => c.slug === slug)
  if (!component) notFound()

  const twin = getComponentDoc(slug)
  const twinSections = twin ? splitTwin(twin) : []
  const subComponents = getSubComponents(slug)
  const importStatement = (twin && importLine(twin)) ?? null

  const sections = [
    { id: 'live', label: 'Live render' },
    ...twinSections.map(s => ({ id: s.id, label: s.heading })),
    ...(subComponents.length > 0 ? [{ id: 'sub-components', label: 'Sub-components' }] : []),
  ]

  return (
    <DocPage
      eyebrow={TIER_LABELS[component.tier]}
      title={component.name}
      lead={
        <>
          <p>{plainText(component.purpose)}</p>
          <p className="note">
            <Link href={`/components/${slug}.md`} variant="standalone">Markdown version for agents</Link>
            {STORYBOOK_URL && component.stories.length > 0 && (
              <>
                {' · '}
                <Link href={`${STORYBOOK_URL}/?path=/docs/${component.storybookTitleId}--docs`} variant="standalone" external>
                  {component.stories.length} stories in Storybook
                </Link>
              </>
            )}
          </p>
        </>
      }
      sections={sections}
    >
      {importStatement && <CodeBlock code={importStatement} language="tsx" title="Import" />}

      <DocSection id="live" title="Live render">
        <DemoProviders>
          <div className="component-live">
            <Demo slug={component.slug} name={component.name} />
          </div>
        </DemoProviders>
      </DocSection>

      {twin === null && (
        <p className="note">The installed package has no doc twin for {component.name}, so only its registry data is shown.</p>
      )}

      {twinSections.map(section => (
        <DocSection key={section.id} id={section.id} title={section.heading}>
          <Markdown source={section.body} headingLevel={3} idPrefix={`${section.id}-`} />
        </DocSection>
      ))}

      {subComponents.length > 0 && (
        <DocSection id="sub-components" title="Sub-components" lead={<p>Imported from the same path as {component.name}.</p>}>
          <ul>
            {subComponents.map(sub => (
              <li key={sub.slug}>
                <code>{sub.name}</code>{' '}
                <Link href={`/components/${sub.slug}.md`} variant="standalone">props</Link>
              </li>
            ))}
          </ul>
        </DocSection>
      )}
    </DocPage>
  )
}
