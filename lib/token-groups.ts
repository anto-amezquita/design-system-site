import type { Token } from './ds'

export type TokenGroupDef = {
  title: string
  description: string
  match: (name: string) => boolean
}

export type TokenGroup = { title: string; description: string; tokens: Token[] }

/** Tokens the base theme defines. Portfolio-only tokens resolve to null in base and belong on Themes. */
export function inBase(tokens: Token[]): Token[] {
  return tokens.filter(t => t.resolved['base-light'] != null)
}

/**
 * Sorts tokens into the given groups, in order. Anything no group matches
 * lands in a final "Other" group, so a token added in a release still shows
 * up on its page before anyone writes a description for it.
 */
export function groupTokens(tokens: Token[], defs: TokenGroupDef[]): TokenGroup[] {
  const taken = new Set<string>()
  const groups = defs.map(def => {
    const matched = tokens.filter(t => !taken.has(t.name) && def.match(t.name))
    matched.forEach(t => taken.add(t.name))
    return { title: def.title, description: def.description, tokens: matched }
  })
  const rest = tokens.filter(t => !taken.has(t.name))
  if (rest.length > 0) {
    groups.push({ title: 'Other', description: 'Tokens in this category that the groups above don’t cover yet.', tokens: rest })
  }
  return groups.filter(g => g.tokens.length > 0)
}
