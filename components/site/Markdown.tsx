import NextLink from 'next/link'
import { Lexer, type Token, type Tokens } from 'marked'
import { Heading } from '@amezquita/design-system/components/primitives/Heading'
import { Link } from '@amezquita/design-system/components/primitives/Link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@amezquita/design-system/components/patterns/Table'
import { CodeBlock } from './CodeBlock'
import { slugify } from '@/lib/slugify'

// Renders the package's Markdown (doc twins, CHANGELOG.md, AGENTS.md
// sections) through marked's lexer into the package's own components, so
// the docs are drawn with the system they document. Content is trusted: it
// comes from the installed package, not from users.

type MarkdownProps = {
  source: string
  /** Drop the document's `# Title`, when the page already shows it. */
  skipTitle?: boolean
  /** Visual size and tag of `##` headings; `###` goes one step smaller. */
  headingLevel?: 2 | 3
  /** Prefix for heading ids, to keep them unique when several documents share a page. */
  idPrefix?: string
}

export function Markdown({ source, skipTitle = false, headingLevel = 2, idPrefix = '' }: MarkdownProps) {
  const tokens = Lexer.lex(source)
  const blocks = skipTitle
    ? tokens.filter(t => !(t.type === 'heading' && (t as Tokens.Heading).depth === 1))
    : tokens
  return <div className="markdown">{renderBlocks(blocks, { headingLevel, idPrefix })}</div>
}

type Ctx = { headingLevel: 2 | 3; idPrefix: string }

const VISUAL_LEVEL: Record<number, 4 | 5> = { 2: 4, 3: 5 }

function renderBlocks(tokens: Token[], ctx: Ctx): React.ReactNode[] {
  return tokens.map((token, i) => renderBlock(token, i, ctx))
}

function renderBlock(token: Token, key: number, ctx: Ctx): React.ReactNode {
  switch (token.type) {
    case 'heading': {
      const t = token as Tokens.Heading
      const depth = Math.min(6, Math.max(2, t.depth + ctx.headingLevel - 2)) as 2 | 3 | 4 | 5 | 6
      const tag = `h${depth}` as 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Heading key={key} as={tag} level={VISUAL_LEVEL[depth] ?? 5} id={`${ctx.idPrefix}${slugify(t.text)}`}>
          {renderInline(t.tokens)}
        </Heading>
      )
    }
    case 'paragraph':
      return <p key={key}>{renderInline((token as Tokens.Paragraph).tokens)}</p>
    case 'text': {
      const t = token as Tokens.Text
      return <p key={key}>{t.tokens ? renderInline(t.tokens) : t.text}</p>
    }
    case 'code': {
      const t = token as Tokens.Code
      return <CodeBlock key={key} code={t.text} language={t.lang || undefined} />
    }
    case 'list': {
      const t = token as Tokens.List
      const items = t.items.map((item, i) => (
        <li key={i}>
          {item.tokens.map((child, j) =>
            // Tight list items hold bare `text` tokens: render them inline, not as paragraphs.
            child.type === 'text'
              ? <span key={j}>{renderInline((child as Tokens.Text).tokens ?? [child])}</span>
              : renderBlock(child, j, ctx),
          )}
        </li>
      ))
      return t.ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>
    }
    case 'table': {
      const t = token as Tokens.Table
      return (
        <div key={key} className="markdown__table">
          <Table compact>
            <TableHead>
              <TableRow>
                {t.header.map((cell, i) => (
                  <TableHeader key={i} scope="col">{renderInline(cell.tokens)}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {t.rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => <TableCell key={j}>{renderInline(cell.tokens)}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    }
    case 'blockquote':
      return <blockquote key={key}>{renderBlocks((token as Tokens.Blockquote).tokens, ctx)}</blockquote>
    case 'hr':
      return <hr key={key} />
    case 'space':
    case 'html':
    case 'def':
      return null
    default:
      return null
  }
}

function renderInline(tokens: Token[] | undefined): React.ReactNode[] {
  if (!tokens) return []
  return tokens.map((token, i) => renderInlineToken(token, i))
}

function renderInlineToken(token: Token, key: number): React.ReactNode {
  switch (token.type) {
    case 'text': {
      const t = token as Tokens.Text
      return t.tokens ? <span key={key}>{renderInline(t.tokens)}</span> : decodeEntities(t.text)
    }
    case 'escape':
      return (token as Tokens.Escape).text
    case 'strong':
      return <strong key={key}>{renderInline((token as Tokens.Strong).tokens)}</strong>
    case 'em':
      return <em key={key}>{renderInline((token as Tokens.Em).tokens)}</em>
    case 'del':
      return <del key={key}>{renderInline((token as Tokens.Del).tokens)}</del>
    case 'codespan':
      return <code key={key}>{decodeEntities((token as Tokens.Codespan).text)}</code>
    case 'br':
      return <br key={key} />
    case 'link': {
      const t = token as Tokens.Link
      return <MarkdownLink key={key} href={t.href}>{renderInline(t.tokens)}</MarkdownLink>
    }
    case 'html':
      // The package's Markdown uses `&lt;a&gt;`-style entities, not raw HTML. Show anything else as text.
      return decodeEntities((token as Tokens.HTML).text)
    default:
      return 'raw' in token ? token.raw : null
  }
}

function MarkdownLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('/') || href.startsWith('#')) {
    return (
      <Link asChild>
        <NextLink href={href}>{children}</NextLink>
      </Link>
    )
  }
  if (/^https?:\/\//.test(href)) {
    return <Link href={href} external>{children}</Link>
  }
  // Relative paths inside the package (e.g. `docs/architecture.md`) point at
  // the library repo, not at this site: show them as code rather than a dead link.
  return <code>{children}</code>
}

const ENTITIES: Record<string, string> = { '&lt;': '<', '&gt;': '>', '&amp;': '&', '&quot;': '"', '&#39;': "'" }

function decodeEntities(text: string): string {
  return text.replace(/&(lt|gt|amp|quot|#39);/g, m => ENTITIES[m] ?? m)
}
