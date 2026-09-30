import type { MDXComponents } from 'mdx/types'
import NextLink from 'next/link'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Link } from '@/components/ds/Link'
import { CodeBlock } from '@/components/site/CodeBlock'
import { slugify } from '@/lib/slugify'

function text(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(text).join('')
  return ''
}

// Prose pages are MDX (kickoff checkpoint, Stage 5). Their Markdown renders
// through the package's components, the same as the generated pages.
const components: MDXComponents = {
  h2: ({ children }) => <Heading level={4} as="h2" id={slugify(text(children))}>{children}</Heading>,
  h3: ({ children }) => <Heading level={5} as="h3" id={slugify(text(children))}>{children}</Heading>,
  a: ({ href = '', children }) =>
    href.startsWith('/') || href.startsWith('#') ? (
      <Link asChild><NextLink href={href}>{children}</NextLink></Link>
    ) : (
      <Link href={href} external>{children}</Link>
    ),
  pre: ({ children }) => {
    // MDX gives <pre><code className="language-x">…</code></pre>.
    const code = children as React.ReactElement<{ className?: string; children?: string }>
    const language = code.props.className?.replace('language-', '')
    return <CodeBlock code={String(code.props.children ?? '').replace(/\n$/, '')} language={language} />
  },
}

export function useMDXComponents(): MDXComponents {
  return components
}
