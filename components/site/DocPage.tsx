import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Link } from '@/components/ds/Link'

export type PageSection = { id: string; label: string }

type DocPageProps = {
  eyebrow?: string
  title: string
  lead?: React.ReactNode
  /** Drives the on-page contents list. Leave empty on short pages. */
  sections?: PageSection[]
  children: React.ReactNode
}

/** The shape every docs page shares: header, content, and an on-page contents list from 1200px up. */
export function DocPage({ eyebrow, title, lead, sections = [], children }: DocPageProps) {
  return (
    <div className={sections.length > 0 ? 'doc doc--with-toc' : 'doc'}>
      <article className="doc__content">
        <header className="doc__header">
          {eyebrow && <p className="doc__eyebrow">{eyebrow}</p>}
          <Heading level={2} as="h1">{title}</Heading>
          {lead && <div className="doc__lead">{lead}</div>}
        </header>
        {children}
      </article>
      {sections.length > 0 && (
        <nav className="doc__toc" aria-label="On this page">
          <p className="doc__toc-title">On this page</p>
          <ul className="doc__toc-list">
            {sections.map(s => (
              <li key={s.id}>
                <Link href={`#${s.id}`} variant="standalone">{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}

type DocSectionProps = {
  id: string
  title: string
  lead?: React.ReactNode
  children: React.ReactNode
}

export function DocSection({ id, title, lead, children }: DocSectionProps) {
  return (
    <section className="doc__section" aria-labelledby={id}>
      <Heading level={4} as="h2" id={id}>{title}</Heading>
      {lead && <div className="doc__section-lead">{lead}</div>}
      {children}
    </section>
  )
}
