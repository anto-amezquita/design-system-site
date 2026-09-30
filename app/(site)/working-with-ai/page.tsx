import type { Metadata } from 'next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@amezquita/design-system/components/patterns/Table'
import { Link } from '@/components/ds/Link'
import { CodeBlock } from '@/components/site/CodeBlock'
import { DocPage, DocSection } from '@/components/site/DocPage'
import { Markdown } from '@/components/site/Markdown'
import {
  getAgentsMarkdown,
  getMarkdownSection,
  getPublicComponents,
  getSkillIndex,
  listPackageDir,
} from '@/lib/ds'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Working with AI',
  description: 'The agent skill, llms.txt, tokens.json, the shadcn registry and the component docs an AI coding agent reads.',
}

// Ported from the portfolio's Guidelines page. The MCP server isn't in the
// package, so this list is kept by hand.
const MCP_TOOLS = [
  { name: 'list_components', desc: 'Every public component: name, slug, tier, purpose, token count.' },
  { name: 'get_component', desc: 'One component’s compiled doc: real props, real tokens, a real usage example.' },
  { name: 'search_tokens', desc: 'Search tokens by name or category, with resolved values.' },
  { name: 'get_token', desc: 'One token’s full entry: raw value, the value per theme and mode, and what uses it.' },
  { name: 'validate_token', desc: 'Checks a var() or token name against the real rules before it ships.' },
  { name: 'get_registry_item', desc: 'The shadcn-spec manifest for a component, to decide between installing it and writing it by hand.' },
  { name: 'get_skill', desc: 'The current agent skill.' },
]

const SECTIONS = [
  { id: 'files', label: 'The files' },
  { id: 'skill', label: 'The skill' },
  { id: 'registry', label: 'The registry' },
  { id: 'mcp', label: 'The MCP server' },
  { id: 'rules', label: 'Rules an agent must follow' },
]

export default function WorkingWithAiPage() {
  const skills = getSkillIndex().skills
  const manifests = listPackageDir('registry').filter(f => f.endsWith('.json') && f !== 'registry.json')
  const twins = listPackageDir('docs/components').filter(f => f.endsWith('.md'))
  const example = getPublicComponents()[0]?.slug ?? 'button'
  const rules = getMarkdownSection(getAgentsMarkdown(), 'Never violate', 'AGENTS.md')

  const files = [
    { path: '/.well-known/skills/index.json', what: `Index of the agent skills (${skills.length}), in the well-known location agents look for.`, from: 'skills/index.json' },
    ...skills.flatMap(s => s.files.map(f => ({ path: `/.well-known/skills/${s.name}/${f}`, what: s.description, from: `skills/${s.name}/${f}` }))),
    { path: '/llms.txt', what: 'A short index of the package: install, reference links, one line per component.', from: 'llms.txt' },
    { path: '/llms-full.txt', what: 'The same index with every component inlined, for one fetch.', from: 'llms-full.txt' },
    { path: '/tokens.json', what: 'Every token with its value in all four theme and mode combinations. If a token isn’t here, it doesn’t exist.', from: 'tokens.json' },
    { path: '/r/registry.json', what: `The shadcn-spec registry: a theme item and ${manifests.length - 1} components.`, from: 'registry/registry.json' },
    { path: `/components/${example}.md`, what: `One Markdown doc per component and sub-component (${twins.length}): props, tokens, usage, accessibility.`, from: 'docs/components/*.md' },
  ]

  return (
    <DocPage
      title="Working with AI"
      lead={
        <p>
          This site serves the files an AI coding agent needs to build with the system without guessing:
          which components exist, their real props, and which tokens are real. Each one is copied from the
          installed package when the site builds, so it matches the version on this site.
        </p>
      }
      sections={SECTIONS}
    >
      <DocSection
        id="files"
        title="The files"
        lead={
          <p>
            After an install, the same files are in <code>node_modules/@amezquita/design-system/</code>, which
            is where an agent working in your project should read them.
          </p>
        }
      >
        <div className="table-scroll">
          <Table compact scrollLabel="Agent-facing files">
            <TableHead>
              <TableRow>
                <TableHeader scope="col">URL</TableHeader>
                <TableHeader scope="col">What it is</TableHeader>
                <TableHeader scope="col">In the package</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map(f => (
                <TableRow key={f.path}>
                  <TableCell><Link href={f.path} variant="standalone"><code>{f.path}</code></Link></TableCell>
                  <TableCell><span className="table-prose">{f.what}</span></TableCell>
                  <TableCell><code>{f.from}</code></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="note">
          The links inside these files still point at amezquita.dk, where the docs used to live. They move to this
          site in a later release of the package.
        </p>
      </DocSection>

      <DocSection id="skill" title="The skill">
        <p>
          The skill is a short guide for agents: how to install the package, where each component’s docs are, and
          a list of tokens and props that look plausible but don’t exist. It was tested on fresh agents with no
          memory of the repo before it shipped.
        </p>
        <CodeBlock
          title="Point your agent at it"
          code="Read node_modules/@amezquita/design-system/skills/amezquita-design-system/SKILL.md before writing any UI."
          language="text"
        />
      </DocSection>

      <DocSection id="registry" title="The registry">
        <p>
          Any shadcn-spec client can install a component from the registry. It adds the package as a dependency and
          writes the component’s tokens into your CSS. It’s the same npm package either way, not a copy of the source.
        </p>
        <CodeBlock code={`npx shadcn add ${SITE_URL}/r/${example}.json`} language="bash" />
        <p className="note">
          On Next.js you still need <code>transpilePackages</code>, as in{' '}
          <Link href="/getting-started#compile-it">Getting started</Link>. The registry installs the dependency, not your bundler config.
        </p>
      </DocSection>

      <DocSection
        id="mcp"
        title="The MCP server"
        lead={
          <p>
            A read-only MCP server gives the same data live, one call instead of a file path to remember. It isn’t
            in the npm package; it runs from the{' '}
            <Link href="https://github.com/anto-amezquita/design-system/blob/main/specs/mcp-server-spec.md" external>library repo</Link>.
            Everything it answers is also in the files above.
          </p>
        }
      >
        <div className="table-scroll">
          <Table compact scrollLabel="MCP tools">
            <TableHead>
              <TableRow>
                <TableHeader scope="col">Tool</TableHeader>
                <TableHeader scope="col">What it returns</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {MCP_TOOLS.map(t => (
                <TableRow key={t.name}>
                  <TableCell><code>{t.name}</code></TableCell>
                  <TableCell><span className="table-prose">{t.desc}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DocSection>

      <DocSection
        id="rules"
        title="Rules an agent must follow"
        lead={<p>From the package’s <code>AGENTS.md</code>, as shipped in this version. They apply to people too.</p>}
      >
        <Markdown source={rules} headingLevel={3} idPrefix="rules-" />
      </DocSection>
    </DocPage>
  )
}
