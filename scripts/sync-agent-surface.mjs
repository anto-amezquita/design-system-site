// Copies the agent-facing files from the installed package into public/,
// so this site serves exactly what the published package ships
// (decisions/0001, item 2). Runs before `dev` and `build`. The output is
// gitignored: the package is the only source, never a copy in this repo.
//
// A missing source fails the build with the path that's missing, so a
// release that stops shipping one of these files can't go live quietly.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const PKG = dirname(require.resolve('@amezquita/design-system/package.json'))
const PUBLIC = join(process.cwd(), 'public')

/** [source in the package, destination under public/] */
const COPIES = [
  ['skills', '.well-known/skills'],
  ['llms.txt', 'llms.txt'],
  ['llms-full.txt', 'llms-full.txt'],
  ['tokens.json', 'tokens.json'],
  ['registry', 'r'],
  ['docs/components', 'components'],
]

const missing = COPIES.map(([from]) => from).filter(from => !existsSync(join(PKG, from)))
if (missing.length > 0) {
  console.error(
    `sync-agent-surface: @amezquita/design-system no longer ships ${missing.join(', ')}.\n` +
    'The site serves these files from the installed package (decisions/0001). ' +
    'Add them back to the package\'s "files", or remove them from COPIES here on purpose.',
  )
  process.exit(1)
}

for (const [from, to] of COPIES) {
  const dest = join(PUBLIC, to)
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(join(PKG, from), dest, { recursive: true })
}

const twins = readdirSync(join(PUBLIC, 'components')).filter(f => f.endsWith('.md')).length
const manifests = readdirSync(join(PUBLIC, 'r')).filter(f => f.endsWith('.json')).length
console.log(`sync-agent-surface: served from the package — ${twins} doc twins, ${manifests} registry manifests, skill, llms.txt, llms-full.txt, tokens.json`)
