import { slugify } from './slugify'

export type TwinSection = { heading: string; id: string; body: string }

/**
 * Splits a component's doc twin into its `##` sections. The part before the
 * first section (title, purpose, tier, import line) is dropped: the page
 * header shows those from the registry.
 */
export function splitTwin(markdown: string): TwinSection[] {
  const parts = markdown.split(/^## /m).slice(1)
  return parts.map(part => {
    const newline = part.indexOf('\n')
    const heading = part.slice(0, newline).trim()
    return { heading, id: slugify(heading), body: part.slice(newline + 1).trim() }
  })
}

/** The import line from a twin, e.g. `import { Button } from '…'`. */
export function importLine(markdown: string): string | null {
  return markdown.match(/^- Import: `(.+)`$/m)?.[1] ?? null
}
