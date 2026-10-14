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
// (Spec §9 items 6, 1, 7 and 9 went this way: 6 in 1.1.2, 1 and 7 in 1.2.0,
// 9 in 1.3.0.) Each entry: { workaround, fixed: () => boolean, todo }.
const CHECKS = [
  {
    workaround: 'scripts/build-base-scoped.mjs',
    fixed: () => existsSync(join(PKG, 'styles', 'brands', 'base-scoped.css')),
    todo:
      'the package ships styles/brands/base-scoped.css. Import it in app/layout.tsx instead of ' +
      'app/generated/base-scoped.css, then delete scripts/build-base-scoped.mjs, its predev and ' +
      'prebuild steps, and app/generated/ in .gitignore.',
  },
  {
    workaround: 'the hero card\'s bottom padding in app/site.css',
    fixed: () => read('components/composition/Card/Card.css').includes('.card__header:last-child'),
    todo:
      'Card pads a last CardHeader itself. Delete the ".hero-switch__card .card__header:last-child" rule ' +
      'in app/site.css.',
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
