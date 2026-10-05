# First build of the docs site

## 1. Overview

### Summary

The first version of the documentation site for `@amezquita/design-system`: a static Next.js (App Router) site that installs the package from npm, renders it in the unskinned `base` theme, and builds its frame from the package's own `Link`, `SkipLink`, `NavigationMenu` and `SideNav`. It also serves the agent-facing surface (skill, `llms*.txt`, `tokens.json`, registry, component doc twins), generated at build time from the installed package.

### Problem

The system is only documented as a section of the portfolio, in the portfolio skin. A visitor never sees what a new consumer actually gets, and the agent-facing files there are hand-copied and have drifted (27 doc twins against 34 public components).

### Intended users

- **Antonio**, starting a new project on the system and needing install steps, tokens and component APIs fast.
- **Someone reviewing the work cold**, who should understand what the system is from the landing page and see it working before reading any lists.
- **AI coding agents**, which read `/.well-known/skills/`, `llms.txt`, `tokens.json`, the registry and the doc twins.

### Desired outcome

One origin that shows the published package as it is, can't drift from it, and breaks the build instead of rendering a blank page when the package stops shipping something it reads.

---

## 2. Goals and non-goals

### Goals

- Every page in `decisions/0001`'s list exists and renders in the `base` theme.
- Every data-driven page and every agent-facing file is generated from `node_modules/@amezquita/design-system` at build time. Nothing from the package is copied into the repo.
- The site frame is built from the package's navigation components.
- `npx tsc --noEmit` and `npm run build` pass.

### Non-goals

- Templates and a public Decisions page (0017's "Later").
- A playground, community or blog (out of scope in 0017).
- The release sync workflow (its own backlog item, blocked on the GitHub App).
- Vercel project, DNS and redirects from amezquita.dk (Antonio's steps, tracked in the backlog).
- A light/dark toggle. The site follows the system colour scheme in v1.
- Search.

### Success criteria

- A cold visitor on `/` sees a working screen built from the components before any list of parts.
- `/components` shows every public component in the installed package, grouped by tier, each with a live render. A component added to the package appears after a bump and rebuild, without a code change here, except for its live render (see FR-12).
- `/.well-known/skills/index.json`, `/llms.txt`, `/llms-full.txt`, `/tokens.json`, `/r/registry.json` and `/components/<slug>.md` respond with the package's files byte for byte.

---

## 3. User experience

### Primary user stories

- As Antonio starting a project, I want a prompt I can paste into an AI tool, then the manual install, so I can get a first component on screen in minutes.
- As a reviewer, I want to see the system working as a whole, then how the `base` and `portfolio` themes differ, so I understand what a consumer gets and what a brand changes.
- As an agent, I want the skill, the token list and each component's doc at stable URLs on one origin, so I don't have to guess props or tokens.

### Main user flows

1. **Cold visit.** `/` → composite screen → "Get started" (header button) → `/getting-started`.
2. **Look up a component.** Header "Components" → `/components` (grouped live renders) → card → `/components/<slug>` (live render, props, tokens, usage, accessibility, link to the `.md` twin).
3. **Look up a token.** Header "Foundations" → `/foundations` → Color/Spacing/Typography/Motion (token table with light and dark values, code sample, do/don't).
4. **Compare themes.** Header "Themes" → `/themes` (same sample screen in `base` and `portfolio`, light and dark, plus the tokens that differ).
5. **Mobile.** Below 1024px the header links move into SideNav's drawer (`headerItems`), opened from `SideNavTrigger`.

### States and edge cases

- **Static site, no loading or error states at runtime.** Everything is pre-rendered. The failure mode is the build: if a file the site reads is missing from the package, the build fails with a message naming the file.
- **A component in the package with no live render written here yet:** its card and page show a plain "No live render yet" note with a link to Storybook, and its docs still render. The build does not fail on this, so a release that adds a component still lands.
- **A component whose doc twin is missing:** the page renders registry data only and says the twin is missing. (Not the case in 1.1.1; guarded anyway.)
- **Unknown component slug:** 404 (only generated slugs exist).
- **JavaScript off:** all content renders; the live demos render their initial state; overlays (Dialog, Drawer, Menu) can't open. The mobile drawer needs JS; on desktop the header works without it.
- **Dark mode:** `data-mode` on `<html>` is set from `prefers-color-scheme` before first paint.

### UX notes

- Reading experience per the checkpoint (Stage 3+4): one top bar, a left section tree on docs pages, a right-hand on-page contents list from 1200px up. Dense and plain: tables and live renders carry the content.
- Every page has one `<h1>`, a `SkipLink` as the first Tab stop, and `<main id="main-content">`.
- Copy follows the voice in `~/.claude/CLAUDE.md` and the package's own AGENTS.md voice note: plain, first-person where it explains a decision.

---

## 4. Functional requirements

**Frame**

- `FR-01` Every page renders `SkipLink` first, a header with the site name (a `Link` to `/`), `NavigationMenu` with the top-level sections and a "Get started" `Button` linking to `/getting-started`.
- `FR-02` Docs pages render `SideNav` with the full section tree; the landing page uses `layout="drawer-only"`. Both pass the header items as `headerItems`.
- `FR-03` `currentHref` on NavigationMenu and SideNav is the current pathname; links render through `next/link`.
- `FR-04` Docs pages show an on-page contents list built from the page's own section list.

**Pages**

- `FR-05` `/` shows one composite screen built from the package's components, then short links into the sections, with counts read from the package (components, tokens, version).
- `FR-06` `/getting-started` leads with a copyable prompt for an AI tool, then install, `transpilePackages`, CSS imports and a first component. The version shown is the installed one.
- `FR-07` `/foundations` lists the four foundation pages and shows the semantic tokens that belong to none of them (radius, border, shadow, size, opacity, elevation), so every semantic token appears on some page.
- `FR-08` `/foundations/{color,spacing,typography,motion}` each show a token table generated from `tokens/token-reference.json` with `base-light` and `base-dark` values, a code sample and a do/don't table. Color swatches are painted from the live CSS variable in a light and a dark scope, not from the JSON hex.
- `FR-09` `/components` groups public components (not `internal`, no `parent`) from `tokens/component-registry.json` by tier: primitives, composition, patterns. Each card has a live render.
- `FR-10` `/components/<slug>` renders the doc twin from `docs/components/<slug>.md` (props, tokens, usage, accessibility) with the site's components, plus the live render and a link to the `.md` twin.
- `FR-11` `/themes` shows the same sample screen rendered in `base` and `portfolio`, light and dark, and a table of the tokens whose resolved values differ between the two brands.
- `FR-12` Live renders live in one map in this repo keyed by slug. A slug with no entry falls back as described in §3.
- `FR-13` `/changelog` is built from the package's `CHANGELOG.md`: one section per version, changes split into Breaking changes / Features / Fixes (Changesets' Major / Minor / Patch), with a contents list of versions.
- `FR-14` `/working-with-ai` lists every agent-facing file this site serves, what it's for and where it comes from in the package, the MCP tools, and the package AGENTS.md's "Never violate" rules rendered from the file.
- `FR-15` `/guidelines` covers governance and versioning (ported from the portfolio's Guidelines page, minus its AI section, which moved to Working with AI).

**Agent-facing surface**

- `FR-16` Before `dev` and `build`, a script copies from the installed package into `public/` (gitignored): `skills/**` → `/.well-known/skills/`, `llms.txt`, `llms-full.txt`, `tokens.json`, `registry/*.json` → `/r/`, `docs/components/*.md` → `/components/<slug>.md`.
- `FR-17` The script fails the build if any of those sources is missing.

---

## 5. Non-functional requirements

- **Performance:** fully static output. The portfolio brand CSS and fonts load only inside the Themes preview frames.
- **Accessibility:** WCAG 2.1 AA as the package's components already meet it; landmarks named uniquely; swatches carry text values, not only colour; tables have headers.
- **Responsive:** single column below 1024px (SideNav drawer), sidebar from 1024px, contents list from 1200px. Wide tables scroll inside their own region.
- **Maintainability:** the site's own CSS uses semantic tokens only, no raw values, following the package's own linter rules (no hex, no primitives, no two-argument `var()`).
- **SEO:** per-page titles and descriptions via Next metadata.

---

## 6. Information architecture and data

### Routes

| Route | Source |
|---|---|
| `/` | registry, token reference, `package.json` version |
| `/getting-started` | MDX in this repo, installed version, `tokens/fonts.json` |
| `/foundations`, `/foundations/{color,spacing,typography,motion}` | `tokens/token-reference.json`, including each token's `description` |
| `/components`, `/components/[slug]` | `tokens/component-registry.json`, `docs/components/*.md` (Tokens section included, from 1.2.0) |
| `/themes` | `portfolio-scoped.css` (from 1.2.0; the preview routes are gone), token reference, `tokens/fonts.json` |
| `/changelog` | `CHANGELOG.md` |
| `/working-with-ai` | `skills/index.json`, `AGENTS.md`, `llms.txt` (MCP tools), file listing of the agent surface |
| `/guidelines` | MDX in this repo |

### Data entities

All read-only, all from the package: tokens (`name`, `cssVar`, `category`, `type`, `resolved[axis]`, `usedBy`), components (`name`, `slug`, `tier`, `purpose`, `tokenPrefix`, `stories`, `internal`, `parent`), doc twins (Markdown), changelog (Markdown). No user data, no permissions, no state beyond UI state in the demos.

---

## 7. Technical approach

### Proposed architecture

- Next.js 16 App Router, `transpilePackages: ['@amezquita/design-system']` (the package ships source).
- Root layout: `html`/`body`, the package's `base-light.css` and `base-dark.css`, a small site reset, and the colour-scheme script. A `(site)` route group adds the frame; the Themes preview routes sit outside it, bare.
- `lib/ds.ts`: typed readers for the package files, resolved from `node_modules/@amezquita/design-system` with `fs` at build time. Each reader throws a named error if its file is missing.
- `lib/markdown.tsx`: renders Markdown (doc twins, changelog entries, AGENTS.md sections) through `marked`'s lexer into the package's `Heading`, `Link`, `Table` and the site's code block, so the docs are drawn with the system too.
- `scripts/sync-agent-surface.mjs`: FR-16/17, run by `predev` and `prebuild`.
- Prose pages (Getting started, Guidelines) are MDX via `@next/mdx`, per the checkpoint's content model.

### Reused systems

The package's components and tokens throughout. Ported from the portfolio (read, not imported): the component grouping and public-component filter, the foundations groupings and descriptions, the duration/easing demo, the Guidelines governance and versioning prose, the MCP tool list.

### New technical work

Site frame, on-page contents list, token table, live-render map, sample screen (shared by Landing and Themes), Markdown renderer, agent-surface script.

---

## 8. Interface and component breakdown

- **SiteFrame** (client): `SideNavProvider` → `SkipLink`, header (`SideNavTrigger`, site `Link`, `NavigationMenu`, `Button`), `SideNav`, `<main id="main-content">`. Reads the pathname for `currentHref`.
- **DocPage**: title, lead, optional eyebrow, contents list (`{ id, label }[]`), children.
- **TokenTable**: token rows with name, light value, dark value, and a preview column per category (swatch, bar, specimen, none).
- **Demo** (client): the live-render map, keyed by slug, plus the fallback.
- **SampleScreen** (client): the composite screen used on `/` and in the Themes frames.
- **ThemeExplorer** (client): `Tabs` for light/dark, two frames side by side (stacked below 1024px).
- **Markdown**: server component, see §7.
- **CodeBlock** and **CopyButton**: `<pre>` with the mono token; copy uses `Button` and announces "Copied" through a live region.

---

## 9. Risks, trade-offs, assumptions, and open questions

### Deviations from `decisions/0001`, with reasons

1. **The portfolio brand CSS loads in frames under `/themes/preview/portfolio/*`, not on `/themes` itself.** The package's brand files target `:root` and `[data-mode]` with no brand selector, so loading `portfolio-light.css` on a page reskins the whole document, not one panel. Next.js also keeps route CSS after client-side navigation, so it would leak into every page visited after Themes. Frames give each theme its own document. The CSS still only loads from the Themes section, which keeps 0001's intent. The missing brand scope is logged as a package gap in the backlog. **Resolved in 1.2.0:** the package ships `portfolio-scoped.css`, scoped to `[data-brand="portfolio"]`. Themes renders both brands on one page, the frames and `app/(preview)/` are deleted, and `portfolio-light.css` and `portfolio-dark.css` aren't loaded anywhere. Next keeping route CSS after navigation no longer matters, since the scoped rules only match inside a `data-brand` element.
2. **The doc twins are served at `/components/<slug>.md`, next to their page, not at `/design-system/<slug>.md`** as the URLs inside the package's `llms.txt` and `SKILL.md` say. The old path makes no sense on a site with no `/design-system` section. The portfolio's redirect maps `/design-system/<slug>.md` to the new path, and the library's generators need the new path when they switch origin (backlog).
3. **`/tokens` is not moved.** 0001 left this to be checked on the move. The four Foundations pages plus the "Other tokens" table on `/foundations` show every semantic token, component tokens show on their component pages, and primitives are deliberately not offered for use (the package's linter forbids them in component CSS). The full list, primitives included, is `/tokens.json`.
4. **The Changelog is built from `CHANGELOG.md`, not `tokens/changelog.json`.** In 1.1.1 the JSON stops at `v1.1.0`, while `CHANGELOG.md` has 1.1.1. 0017 names `CHANGELOG.md` as the source anyway; the portfolio used the JSON. In 1.2.0 the JSON stops at `v1.1.2`, still one release behind.
5. **The package is pinned to an exact version (`1.2.1` now), not a range,** so the release sync PR is the only thing that changes it, as 0001 item 3 intends.

Found during the build:

6. **`Link` is re-exported from a client module (`components/ds/Link.tsx`) for use in Server Components.** The package's `Link` has no `'use client'` directive but renders Radix `Slot`, which needs React context, so importing it into a Server Component fails the build. The re-export is Next's documented pattern for third-party components in that state; it's one line and goes away when the library adds the directive. `SkipLink` (an `onClick`) and `Tag` (with `removable`) have the same gap; the site only renders them from client components, so they need no re-export. **Resolved in 1.1.2:** the library added the directive to all three, with a validate check, and the re-export is deleted.
7. **Component pages take their token table from `tokens/token-reference.json`, not from the doc twin.** The twins' Tokens tables show the portfolio brand's values (Button's `--button-secondary-border` is `#292524`, warm-800), the same bug 1.1.1 fixed in the registry. Showing them on a base-theme site would contradict the live render next to them. The twins are still served verbatim at `/components/<slug>.md`. Logged for the library. **Resolved in 1.2.0:** the twins show base values, and component pages render the twin's own Tokens section; the filter and the site's table are gone.
8. **SkipLink's card is a note, not a live render.** A SkipLink only shows on focus and jumps to the page's own `<main>`, so a second one in a card would be confusing. The site's own SkipLink is the live example, and the card says so.

Found moving to 1.2.0:

9. **Themes names its two Breadcrumb landmarks with an effect.** With both sample screens on one page there are two `<nav aria-label="Breadcrumb">`, which fails axe's `landmark-unique`. The package's Breadcrumb hardcodes the label and takes no `aria-label`. An effect in `components/themes/ThemeExplorer.tsx` renames each one after its panel ("Breadcrumb, portfolio theme"). `scripts/check-workarounds.mjs` warns when Breadcrumb accepts `aria-label`. Logged for the library.
10. **Popovers opened from the portfolio panel render in base.** Menu and Select portal their content to `<body>`, outside `[data-brand="portfolio"]`, and neither takes a portal container. Opening "More" or the Theme select in the portfolio panel shows a base-styled popover. The closed screen is right; no workaround here, since one would mean patching Radix's portal from outside. Logged for the library.

Also replaced in 1.2.0, with no deviation behind them: Motion's role one-liners now come from each token's `description` (nothing shows where it's `null`, as for the three easing primitives); the MCP tool list on Working with AI is parsed from `llms.txt`'s "MCP server" section instead of copied by hand; the root layout's font link and a new "Load the fonts" section on Getting started come from `tokens/fonts.json`.

### How the build was checked

`npx tsc --noEmit` and `npm run build` clean (52 static pages). axe-core over every page type, light and dark: no violations, apart from a race where it ran before the package's Table marked its scroll region focusable (it passes on a re-run; the Table sets `tabIndex` from a ResizeObserver). The agent-facing files are byte-identical to the package's; the portfolio brand CSS appears only in the `/themes/preview/portfolio/*` documents; `app/site.css` has no hex values, primitive tokens or two-argument `var()`; checked at 1440px and at a 390px viewport, light and dark.

Moving to 1.2.0 (branch `feat/design-system-1-2-0`): `npx tsc --noEmit` and `npm run build` clean (48 static pages; the four preview documents are gone). In the built CSS, every rule that sets a portfolio-only value is scoped to `[data-brand="portfolio"]`, and the one stylesheet holding them is linked only from `/themes`. In Chrome, with the system set to light and to dark and each mode tab on Themes: every element outside the portfolio panel resolves base's accent and surface, every element inside it resolves the portfolio's, and after client-side navigation to `/foundations` the page is still base. axe-core clean on Themes (both tabs), Getting started, Motion, Working with AI and two component pages, light and dark. No horizontal scroll at 390px. The Themes checks are committed as `scripts/check-themes.mjs` (`npm run check:themes`, after a build); it was checked to fail when `portfolio-light.css` is loaded on Themes. It also warns about item 10 while that gap is open, and warns again once a release fixes it.

### Risks

- The agent-facing files still point at `amezquita.dk` (the 1.1.1 changeset says so). Served here unchanged, they send agents back to the portfolio until the library switches origin. Rewriting them here would be a copy that drifts, so it isn't done.
- Registry manifests hardcode `https://amezquita.dk/r/theme.json` in `registryDependencies` (34 of them). This answers one of 0001's two pre-deletion checks: yes, they hardcode it. The portfolio's `/r/*` must redirect, or `npx shadcn add` from this origin still pulls the theme from the portfolio.
- Live renders are hand-written here. A prop rename in a release breaks the typecheck, which is the intended gate, but a new component appears without a render until one is written.

### Trade-offs

- MDX adds `@next/mdx` for two prose pages. The checkpoint chose MDX; the data-driven pages stay TSX.

### Assumptions

- The subdomain will be `design.amezquita.dk`. Only used in metadata (`metadataBase`); nothing breaks if it changes. **Confirmed 2026-10-05:** the Vercel project `design-system-site` (team `vikincas-1710's projects`, Hobby) deploys `main`, and serves `design.amezquita.dk` through a CNAME at Simply.com to the target Vercel gave (`df37d7d1bcc6c541.vercel-dns-017.com`). The zone's catch-all `*` record points at Simply's web hotel, so a subdomain without its own record shows Simply's page, with a certificate for `simply.com`.
- Storybook stays at the URL the portfolio's pages use, set with `NEXT_PUBLIC_STORYBOOK_URL`; without it, Storybook links are left out.

### Open questions

- None blocking. The package gaps above are follow-ups, not blockers.

---

## 10. Acceptance criteria

- `npx tsc --noEmit` exits 0.
- `npm run build` exits 0 and pre-renders every route in §6, including one page per public component in the installed registry.
- `out`/`.next` contains no copy of the package in the repo: `git ls-files` shows no file from the package.
- `public/` generated files are gitignored and byte-identical to the package's.
- Every page has a `SkipLink`, one `<h1>`, `<main id="main-content">` and uniquely named `<nav>` landmarks.
- `npm run check:themes` passes after `npm run build`.
- `portfolio-light.css` and `portfolio-dark.css` are loaded nowhere. `portfolio-scoped.css` is loaded only by `/themes`, every rule in it is scoped to `[data-brand="portfolio"]`, and on `/themes` every element outside the portfolio panel resolves base values.
- Site CSS contains no hex colours, no primitive tokens and no two-argument `var()`.

---

## 11. Implementation plan

### Phase 1 — Foundations
Scaffold, `next.config`, root layout, package readers, agent-surface script, site frame.

### Phase 2 — Core pages
Landing, Getting started, Foundations, Components, Themes, Changelog, Working with AI, Guidelines. One commit per page group.

### Phase 3 — States and edge cases
Missing-file errors, demo fallback, missing twin, JS-off behaviour.

### Phase 4 — Polish
Responsive checks, copy pass, contents lists.

### Phase 5 — Validation
Typecheck, build, check against `docs/quality.md`, backlog update.
