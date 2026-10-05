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

// When a fix lands and its workaround is removed, remove its entry here too.
// (Spec §9 items 6, 1 and 7 went this way: 6 in 1.1.2, 1 and 7 in 1.2.0.)
const CHECKS = [
  {
    // Spec §9, item 9: two sample screens on Themes give two "Breadcrumb" navs.
    workaround: 'the Breadcrumb labelling effect in components/themes/ThemeExplorer.tsx',
    fixed: () => /['"]aria-label['"]\??:/.test(read('components/patterns/Breadcrumb/Breadcrumb.tsx')),
    todo: 'Breadcrumb now takes an aria-label. Pass one from SampleScreen per theme and delete the effect in ThemeExplorer.',
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
