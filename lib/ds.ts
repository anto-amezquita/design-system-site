import 'server-only'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Every data-driven page reads the installed package through this file, at
// build time. Nothing here is a copy: if a release stops shipping a file,
// the build fails naming it, instead of a page rendering empty.

// Resolved from the project root rather than with require.resolve, which the
// bundler rewrites into a module id at build time.
const PKG_ROOT = join(process.cwd(), 'node_modules', '@amezquita', 'design-system')

function readPackageFile(path: string): string {
  const full = join(PKG_ROOT, path)
  if (!existsSync(full)) {
    throw new Error(
      `@amezquita/design-system doesn't ship ${path}. The docs site builds from it ` +
      '(decisions/0001). Check the package\'s "files" list.',
    )
  }
  return readFileSync(full, 'utf8')
}

const cache = new Map<string, unknown>()
function readJson<T>(path: string): T {
  if (!cache.has(path)) cache.set(path, JSON.parse(readPackageFile(path)))
  return cache.get(path) as T
}

// ─── Package ────────────────────────────────────────────────────────────

export function getPackageVersion(): string {
  return readJson<{ version: string }>('package.json').version
}

export const PACKAGE_NAME = '@amezquita/design-system'

// ─── Tokens ─────────────────────────────────────────────────────────────

export const AXES = ['base-light', 'base-dark', 'portfolio-light', 'portfolio-dark'] as const
export type Axis = (typeof AXES)[number]

export type Token = {
  name: string
  cssVar: string
  type: string
  category: string
  /** One line on what the token is for, from its $description. Null where the token has none. */
  description: string | null
  rawValue: string
  resolved: Partial<Record<Axis, string>>
  axisAware: boolean
  usedBy: string[]
}

type TokenReference = {
  meta: { primitiveCount: number; semanticCount: number; componentCount: number; total: number }
  tokens: Token[]
}

export function getTokenReference(): TokenReference {
  return readJson<TokenReference>('tokens/token-reference.json')
}

export function getTokens(): Token[] {
  return getTokenReference().tokens
}

export function getTokensByCategory(category: string): Token[] {
  return getTokens().filter(t => t.category === category)
}

// ─── Fonts ──────────────────────────────────────────────────────────────

export type BrandFonts = {
  families: { family: string; tokens: string[]; weights: number[] }[]
  /** The Google Fonts stylesheet with every family and weight the brand's tokens use. */
  href: string
  preconnect: string[]
}

/** The font links each brand needs. The package names the fonts but ships no font files. */
export function getBrandFonts(brand: 'base' | 'portfolio'): BrandFonts {
  const fonts = readJson<{ brands: Record<string, BrandFonts> }>('tokens/fonts.json').brands[brand]
  if (!fonts) throw new Error(`@amezquita/design-system's tokens/fonts.json has no "${brand}" brand.`)
  return fonts
}

// ─── Components ─────────────────────────────────────────────────────────

export const TIERS = ['primitives', 'composition', 'patterns'] as const
export type Tier = (typeof TIERS)[number]

export const TIER_LABELS: Record<Tier, string> = {
  primitives: 'Primitives',
  composition: 'Composition',
  patterns: 'Patterns',
}

export const TIER_DESCRIPTIONS: Record<Tier, string> = {
  primitives: 'Single elements: buttons, inputs, links, labels.',
  composition: 'Containers and overlays that hold other components.',
  patterns: 'Larger, opinionated pieces of a page, built from the other two tiers.',
}

export type ComponentEntry = {
  name: string
  slug: string
  tier: Tier
  purpose: string
  storybookPath: string
  storybookTitleId: string
  /** Storybook's id for the component's first story (from 1.3.1), or null when it has no stories. */
  defaultStoryId: string | null
  tokenPrefix: string | null
  stories: string[]
  tokenCount: number
  internal: boolean
  parent?: string
}

type ComponentRegistry = {
  meta: { componentCount: number; publicComponentCount: number; subComponentCount: number }
  components: ComponentEntry[]
}

function getComponentRegistry(): ComponentRegistry {
  return readJson<ComponentRegistry>('tokens/component-registry.json')
}

/** Public, top-level components: not internal (BaseSheet), not a sub-component (CardBody). */
export function getPublicComponents(): ComponentEntry[] {
  return getComponentRegistry().components.filter(c => !c.internal && !c.parent)
}

export function getSubComponents(parentSlug: string): ComponentEntry[] {
  return getComponentRegistry().components.filter(c => c.parent === parentSlug)
}

/** The compiled Markdown twin for a component, or null if the package has none. */
export function getComponentDoc(slug: string): string | null {
  const path = `docs/components/${slug}.md`
  return existsSync(join(PKG_ROOT, path)) ? readPackageFile(path) : null
}

/** Strips Markdown backticks from registry prose for plain-text contexts. */
export function plainText(markdown: string): string {
  return markdown.replace(/`([^`]+)`/g, '$1')
}

// ─── Markdown sources ───────────────────────────────────────────────────

export function getChangelogMarkdown(): string {
  return readPackageFile('CHANGELOG.md')
}

export function getAgentsMarkdown(): string {
  return readPackageFile('AGENTS.md')
}

/** File names in a package folder, e.g. the registry manifests. Throws if the folder is gone. */
export function listPackageDir(path: string): string[] {
  const full = join(PKG_ROOT, path)
  if (!existsSync(full)) {
    throw new Error(`@amezquita/design-system doesn't ship ${path}/. Check the package's "files" list.`)
  }
  return readdirSync(full).sort()
}

export type McpTool = { name: string; description: string }

/**
 * The MCP server's tools, from the "MCP server" section of llms.txt, which
 * the library generates from the server itself. Throws if the section or its
 * list is gone, so the site never shows an empty or stale list.
 */
export function getMcpTools(): McpTool[] {
  const section = getMarkdownSection(readPackageFile('llms.txt'), 'MCP server', 'llms.txt')
  const tools = [...section.matchAll(/^- `([\w-]+)`: (.+)$/gm)].map(([, name, description]) => ({ name, description }))
  if (tools.length === 0) {
    throw new Error('The "MCP server" section of llms.txt in @amezquita/design-system lists no tools any more.')
  }
  return tools
}

export type SkillIndex ={ skills: { name: string; description: string; files: string[] }[] }

export function getSkillIndex(): SkillIndex {
  return readJson<SkillIndex>('skills/index.json')
}

/**
 * One `## heading` section of a Markdown file, without the heading line.
 * Throws if the heading is gone, so a renamed section fails the build.
 */
export function getMarkdownSection(markdown: string, heading: string, source: string): string {
  const lines = markdown.split('\n')
  const start = lines.findIndex(l => l.trim() === `## ${heading}`)
  if (start === -1) {
    throw new Error(`${source} in @amezquita/design-system has no "## ${heading}" section any more.`)
  }
  const rest = lines.slice(start + 1)
  const end = rest.findIndex(l => /^##\s/.test(l))
  return (end === -1 ? rest : rest.slice(0, end)).join('\n').trim()
}
