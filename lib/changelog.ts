export type ChangeKind = 'breaking' | 'features' | 'fixes' | 'other'

export type ChangelogVersion = {
  version: string
  id: string
  groups: { kind: ChangeKind; label: string; body: string }[]
}

// Changesets writes "### Major Changes", "### Minor Changes" and "### Patch
// Changes". Shown the way Astryx splits them: breaking changes, features, fixes.
const KINDS: Record<string, { kind: ChangeKind; label: string; order: number }> = {
  'Major Changes': { kind: 'breaking', label: 'Breaking changes', order: 0 },
  'Minor Changes': { kind: 'features', label: 'Features', order: 1 },
  'Patch Changes': { kind: 'fixes', label: 'Fixes', order: 2 },
}

/** Parses a Changesets CHANGELOG.md into versions, newest first, as written. */
export function parseChangelog(markdown: string): ChangelogVersion[] {
  const versions = markdown.split(/^## /m).slice(1)
  if (versions.length === 0) {
    throw new Error('CHANGELOG.md in @amezquita/design-system has no "## <version>" sections. The Changelog page can’t be built.')
  }
  return versions.map(block => {
    const newline = block.indexOf('\n')
    const version = block.slice(0, newline).trim()
    const groups = block
      .slice(newline + 1)
      .split(/^### /m)
      .slice(1)
      .map(group => {
        const nl = group.indexOf('\n')
        const heading = group.slice(0, nl).trim()
        const known = KINDS[heading]
        return {
          kind: known?.kind ?? ('other' as const),
          label: known?.label ?? heading,
          order: known?.order ?? 3,
          // Each entry starts with the commit it came from ("- 6b8a811: …"); the sha means nothing to a reader.
          body: group.slice(nl + 1).replace(/^- [0-9a-f]{7,40}: /gm, '- ').trim(),
        }
      })
      .sort((a, b) => a.order - b.order)
      .map(({ kind, label, body }) => ({ kind, label, body }))
    return { version, id: `v${version.replace(/\./g, '-')}`, groups }
  })
}
