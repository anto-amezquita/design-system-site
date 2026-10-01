// Each workaround this site carries for a gap in @amezquita/design-system
// (specs/2026-09-30-first-build.md §9) has a test here for the fix landing
// in the installed package. When one passes, the build prints a warning
// saying what to delete, so a workaround doesn't outlive the bug it covers.
// Runs before `dev` and `build`; it warns and never fails the build.
//
// In GitHub Actions the warnings are `::warning::` annotations, so they show
// on the release-sync PR that installs the fixed version.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const PKG = join(process.cwd(), 'node_modules', '@amezquita', 'design-system')
const read = path => readFileSync(join(PKG, path), 'utf8')

const CHECKS = [
  {
    // Spec §9, item 6.
    workaround: 'components/ds/Link.tsx',
    fixed: () => /^\s*['"]use client['"]/.test(read('components/primitives/Link/Link.tsx')),
    todo: 'The package\'s Link now has \'use client\'. Delete components/ds/Link.tsx and import Link from @amezquita/design-system/components/primitives/Link.',
  },
  {
    // Spec §9, item 1.
    workaround: 'app/(preview)/themes/preview/',
    fixed: () => read('styles/brands/portfolio-light.css').includes('[data-brand="portfolio"]'),
    todo: 'The portfolio brand CSS now has a [data-brand="portfolio"] scope. Themes can render both brands on one page: replace the preview frames in components/themes/ThemeExplorer.tsx and delete app/(preview)/.',
  },
  {
    // Spec §9, item 7: the twins' token tables showed portfolio values.
    workaround: 'the Tokens section filter in app/(site)/components/[slug]/page.tsx',
    fixed: () => {
      const tokens = JSON.parse(read('tokens/token-reference.json')).tokens
      const base = new Map(tokens.map(t => [t.cssVar, t.resolved['base-light']]))
      const twin = read('docs/components/button.md')
      const rows = [...twin.matchAll(/^\| `(--[\w-]+)` \| \w+ \| `([^`]+)`/gm)]
      return rows.length > 0 && rows.every(([, cssVar, value]) => base.get(cssVar) === value)
    },
    todo: 'The doc twins now show base token values. Component pages can render the twin\'s own Tokens section again; drop the filter and the TokenTable there.',
  },
]

const ci = process.env.GITHUB_ACTIONS === 'true'

if (!existsSync(PKG)) {
  console.warn('check-workarounds: @amezquita/design-system isn\'t installed; skipped.')
  process.exit(0)
}

for (const check of CHECKS) {
  let fixed = false
  try {
    fixed = check.fixed()
  } catch {
    // A file moved or a format changed: say nothing rather than guess. The
    // pages that read these files fail the build on their own if it matters.
    continue
  }
  if (!fixed) continue
  const message = `Workaround no longer needed (${check.workaround}): ${check.todo}`
  console.warn(ci ? `::warning::${message}` : `\n⚠ ${message}\n`)
}
