// Checks that Themes shows both brands on one page without one leaking into
// the other (specs/2026-09-30-first-build.md §9, items 1, 9 and 10). Run it
// after `npm run build`: `npm run check:themes`. It starts the built site,
// drives it in a browser, and exits 1 on a failure.
//
// 1. Built CSS: every rule that sets a portfolio-only value is scoped to
//    [data-brand="portfolio"], and only /themes links the file that has them.
// 2. In the browser, with the system set to light and to dark, and on each of
//    Themes' mode tabs: everything outside the portfolio panel resolves base,
//    everything inside it resolves portfolio, and the page is still base
//    after client-side navigation away from Themes.
// 3. axe-core is clean on Themes, on both tabs.
// 4. Known gap (spec §9, item 10): a menu opened from the portfolio panel
//    renders outside it, in base. It warns while that's true, and warns again
//    when it stops being true, so the check can become a hard one.
//
// Expected values come from the package's token-reference.json, never from
// this file, so a release that changes a colour doesn't break the check.

import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createRequire } from 'node:module'
import { chromium } from 'playwright'

const require = createRequire(import.meta.url)
const ROOT = process.cwd()
const NEXT = join(ROOT, '.next')
const BRANDS = join(ROOT, 'node_modules', '@amezquita', 'design-system', 'styles', 'brands')
const PORT = Number(process.env.CHECK_THEMES_PORT ?? 3123)
const ORIGIN = `http://localhost:${PORT}`
const VARS = ['--color-accent-default', '--color-surface-primary', '--color-text-primary', '--font-family-base']
const ci = process.env.GITHUB_ACTIONS === 'true'

const failures = []
const fail = message => {
  failures.push(message)
  console.error(ci ? `::error::${message}` : `✗ ${message}`)
}
const pass = message => console.log(`✓ ${message}`)
const warn = message => console.warn(ci ? `::warning::${message}` : `⚠ ${message}`)

if (!existsSync(join(NEXT, 'BUILD_ID'))) {
  console.error('check-themes: no build in .next. Run `npm run build` first.')
  process.exit(1)
}

const reference = JSON.parse(
  readFileSync(join(ROOT, 'node_modules', '@amezquita', 'design-system', 'tokens', 'token-reference.json'), 'utf8'),
).tokens
/** A token's resolved value on one axis, lowercased to match computed styles. */
const expected = (cssVar, axis) => {
  const token = reference.find(t => t.cssVar === cssVar)
  if (!token?.resolved[axis]) throw new Error(`token-reference.json has no ${axis} value for ${cssVar}.`)
  return token.resolved[axis].toLowerCase()
}

// ─── 1. Built CSS ─────────────────────────────────────────────────────────

/** [selector, Map(property → value)] for each rule. Enough for flat token files; ignores at-rules. */
function cssRules(css) {
  const rules = []
  for (const [, selector, body] of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
    const decls = new Map()
    for (const decl of body.split(';')) {
      const i = decl.indexOf(':')
      if (i > 0) decls.set(decl.slice(0, i).trim(), decl.slice(i + 1).replace(/\s+/g, '').toLowerCase())
    }
    rules.push([selector.trim(), decls])
  }
  return rules
}

const pairs = file => new Set(cssRules(readFileSync(join(BRANDS, file), 'utf8')).flatMap(([, d]) => [...d].map(([k, v]) => `${k}:${v}`)))
const basePairs = new Set([...pairs('base-light.css'), ...pairs('base-dark.css')])
const portfolioOnly = new Set([...pairs('portfolio-scoped.css')].filter(p => !basePairs.has(p)))

function cssFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? cssFiles(join(dir, e.name)) : e.name.endsWith('.css') ? [join(dir, e.name)] : [],
  )
}

const brandFiles = []
let unscopedRules = 0
for (const file of cssFiles(join(NEXT, 'static'))) {
  let holds = false
  for (const [selector, decls] of cssRules(readFileSync(file, 'utf8'))) {
    if (![...decls].some(([k, v]) => portfolioOnly.has(`${k}:${v}`))) continue
    holds = true
    const unscoped = selector.split(',').filter(s => !/\[data-brand=["']?portfolio["']?\]/.test(s))
    if (unscoped.length > 0) unscopedRules++
    if (unscoped.length > 0) fail(`Built CSS sets portfolio values outside [data-brand="portfolio"]: ${unscoped.join(', ').trim()}`)
  }
  if (holds) brandFiles.push(file.split('/').pop())
}

if (brandFiles.length === 0) {
  fail('No built CSS sets a portfolio value. Themes no longer loads portfolio-scoped.css?')
} else {
  const html = readdirSync(join(NEXT, 'server', 'app'), { recursive: true }).filter(f => f.endsWith('.html'))
  const linking = html.filter(f => brandFiles.some(b => readFileSync(join(NEXT, 'server', 'app', f), 'utf8').includes(b)))
  const others = linking.filter(f => f !== 'themes.html')
  if (others.length > 0) fail(`Pages other than /themes link the portfolio CSS: ${others.join(', ')}`)
  else if (unscopedRules === 0) pass(`Portfolio CSS is scoped to [data-brand="portfolio"] and linked only from /themes`)
}

// ─── 2–4. In the browser ─────────────────────────────────────────────────

const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', String(PORT)], {
  cwd: ROOT,
  stdio: 'ignore',
})

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(ORIGIN)).ok) return
    } catch {}
    await new Promise(r => setTimeout(r, 250))
  }
  throw new Error(`The built site didn't start on ${ORIGIN}.`)
}

/** Playwright's own Chromium if it's installed, else the system's Chrome. */
async function launch() {
  try {
    return await chromium.launch()
  } catch {
    try {
      return await chromium.launch({ channel: 'chrome' })
    } catch {
      throw new Error('No browser for Playwright. Run `npx playwright install chromium`.')
    }
  }
}

const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

async function runAxe(page) {
  await page.addScriptTag({ content: axeSource })
  return page.evaluate(async () => (await window.axe.run()).violations.map(v => `${v.id} (${v.nodes.length})`))
}

/** Token values on the root, the panels, and every element outside or inside the portfolio panel. */
function readThemes(page) {
  return page.evaluate(vars => {
    const read = el => vars.map(v => getComputedStyle(el).getPropertyValue(v).trim().toLowerCase())
    const panels = [...document.querySelectorAll('.theme-frame__panel')].filter(p => p.offsetParent)
    const portfolio = panels.find(p => p.dataset.brand === 'portfolio')
    const base = panels.find(p => !p.dataset.brand)
    // The base panel sets its own data-mode, so it's compared against its tab, not the page.
    const outside = [...document.body.querySelectorAll('*')].filter(el => !el.closest('.theme-frame__panel'))
    const distinct = els => [...new Set(els.map(el => JSON.stringify(read(el))))].map(s => JSON.parse(s))
    return {
      found: Boolean(base && portfolio),
      root: read(document.documentElement),
      base: base && read(base),
      outside: distinct(outside),
      inside: portfolio ? distinct([portfolio, ...portfolio.querySelectorAll('*')]) : [],
    }
  }, VARS)
}

let browser
let popoverInBrand = null
try {
  await waitForServer()
  browser = await launch()

  for (const scheme of ['light', 'dark']) {
    const page = await browser.newPage({ colorScheme: scheme })
    await page.goto(`${ORIGIN}/themes`, { waitUntil: 'networkidle' })

    for (const mode of ['light', 'dark']) {
      await page.getByRole('tab', { name: mode === 'light' ? 'Light' : 'Dark', exact: true }).first().click()
      await page.locator(`.theme-frame__panel[data-mode="${mode}"]`).first().waitFor()
      const at = `system ${scheme}, ${mode} tab`
      const seen = await readThemes(page)
      if (!seen.found) {
        fail(`${at}: the base and portfolio panels aren't on /themes.`)
        continue
      }

      const pageBase = VARS.slice(0, 3).map(v => expected(v, `base-${scheme}`))
      const panelBase = VARS.slice(0, 3).map(v => expected(v, `base-${mode}`))
      const panelPortfolio = VARS.slice(0, 3).map(v => expected(v, `portfolio-${mode}`))
      const same = (got, want) => want.every((w, i) => got[i] === w)

      if (seen.outside.length !== 1 || !same(seen.outside[0], pageBase)) {
        fail(`${at}: outside the panels, tokens should all be base-${scheme}; found ${JSON.stringify(seen.outside)}`)
      } else if (!same(seen.base, panelBase)) {
        fail(`${at}: the base panel should be base-${mode}; found ${JSON.stringify(seen.base)}`)
      } else if (seen.inside.length !== 1 || !same(seen.inside[0], panelPortfolio)) {
        fail(`${at}: inside the portfolio panel, tokens should all be portfolio-${mode}; found ${JSON.stringify(seen.inside)}`)
      } else if (seen.inside[0][3] === seen.root[3]) {
        fail(`${at}: the portfolio panel has the page's font stack, not the brand's.`)
      } else {
        pass(`${at}: base outside, portfolio-${mode} inside the panel`)
      }

      const violations = await runAxe(page)
      if (violations.length > 0) fail(`${at}: axe on /themes: ${violations.join(', ')}`)
      else pass(`${at}: axe clean on /themes`)
    }

    // Known gap, spec §9 item 10: Menu portals to <body>, outside the brand scope.
    await page.locator('.theme-frame__panel[data-brand="portfolio"]').getByRole('button', { name: 'More' }).first().click()
    const menu = page.getByRole('menu').first()
    await menu.waitFor()
    const accent = await menu.evaluate(el => getComputedStyle(el).getPropertyValue('--color-accent-default').trim().toLowerCase())
    const mode = await page.locator('.theme-frame__panel[data-brand="portfolio"]').first().getAttribute('data-mode')
    popoverInBrand = (popoverInBrand ?? true) && accent === expected('--color-accent-default', `portfolio-${mode}`)
    await page.keyboard.press('Escape')

    // Route CSS stays loaded after client-side navigation; the scope must keep it inert.
    await page.locator('a[href="/foundations"]').first().click()
    await page.waitForURL('**/foundations')
    const after = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement)
      return {
        accent: root.getPropertyValue('--color-accent-default').trim().toLowerCase(),
        font: root.getPropertyValue('--font-family-base'),
      }
    })
    const bare = value => value.replace(/["'\s]/g, '').toLowerCase()
    if (after.accent !== expected('--color-accent-default', `base-${scheme}`) || bare(after.font) !== bare(expected('--font-family-base', `base-${scheme}`))) {
      fail(`system ${scheme}: after navigating from /themes to /foundations, the page isn't base: ${JSON.stringify(after)}`)
    } else {
      pass(`system ${scheme}: still base after navigating away from /themes`)
    }
    await page.close()
  }

  if (popoverInBrand) {
    warn(
      'Known gap fixed: a menu opened from the portfolio panel now takes the portfolio brand. ' +
      'Close spec §9 item 10, and make this a hard check in scripts/check-themes.mjs.',
    )
  } else {
    warn('Known gap (spec §9, item 10): a menu opened from the portfolio panel renders in base. Waits on the library (BrandScope).')
  }
} catch (error) {
  fail(error.message)
} finally {
  await browser?.close()
  server.kill()
}

if (failures.length > 0) {
  console.error(`\ncheck-themes: ${failures.length} failed.`)
  process.exit(1)
}
console.log('\ncheck-themes: all passed.')
