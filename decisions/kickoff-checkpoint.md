# Kickoff checkpoint — design-system-site

**Current stage:** Stages 1–5 ✓ — Stage 6 (first build) →
**Stages 1 and 2:** already answered by `decisions/0017-standalone-docs-site-base-theme.md` in the `design-system` repo, written 2026-09-22 and accepted. Recorded here as answered so `/project-kickoff` doesn't reopen them.

## Stage 1 — Idea ✓

A documentation site for `@amezquita/design-system`, on its own subdomain (e.g. `design.amezquita.dk`), replacing the docs section that lives inside the portfolio today.

It renders the brand-agnostic `base` theme unskinned, so a visitor sees what a new consumer actually gets rather than the portfolio's skin.

Two readers: Antonio, starting a new project on the system, and someone reviewing the work cold.

## Stage 2 — Product direction ✓

**Scope, first wave:** Landing (one composite screen built from the existing components), Getting started, Foundations (generated from `token-reference.json`), Components (grouped by the three tiers), Themes (`base` and `portfolio` side by side), Changelog, Working with AI.

**Later:** three or four templates matched to real consumers; a public Decisions page built from the ADRs.

**Out of scope:** playground (link to the published Storybook), community, blog.

**Constraints:**
- The site is a consumer. It installs `@amezquita/design-system` from npm and documents only what is published.
- It is built with the system's own components, which is why the build waits on the five navigation components in `decisions/0015`.
- Reference model: Meta's Astryx (`astryx.atmeta.com`), mapped page by page in 0017's Context.

## Stage 3+4 — Brand and experience ✓ (2026-09-23)

**Visual identity:** the `base` theme itself, unskinned. Nothing new gets designed.

**Reading experience: modelled on Astryx** (`astryx.atmeta.com`), which 0017 already maps page by page. Concretely:

- One top bar across the whole site, with the sections as links and a Get started button. Docs pages add a left sidebar for the section tree and a right-hand on-page contents list.
- The landing page shows the system in use — one composite screen — before any list of parts.
- Foundations pages follow one shape: a full token table with light and dark values, a code sample, and a do/don't table.
- The Components overview is grouped, and every card is a live render rather than a screenshot.
- Themes is an explorer: the same sample screen re-rendered per theme, with the model stated plainly in a line or two of prose.
- Getting started leads with a prompt to paste into an AI tool, then the manual install.

The pages are dense and plain: tables and live renders carry the content, prose stays short. What we do *not* copy is Astryx's scale — 150+ components, 40+ templates, a playground, a community pipeline. The shape is the reference, not the size.

## Stage 5 — Technical direction ✓ (2026-09-23)

**App type:** static, pre-rendered. No backend, no auth, no database, no user data in v1. The live component renders on Components and Themes run in the browser.

**Frontend stack:** Next.js (App Router). Chosen over Astro, which suits a docs site better on page weight and content collections, but would mean rewriting every page shell as `.astro`. The pages being moved from the portfolio are already Next.js App Router routes and `components/docs/` is already React, so Next.js makes the move a copy and a re-import rather than a rewrite, on a stack Antonio already maintains. Recorded as a deliberate trade-off: migration cost and familiarity over lighter output.

**Content model:** prose pages are MDX in this repo. The data-driven pages (Foundations, Components, Changelog) are generated at build time from the installed package in `node_modules/@amezquita/design-system/`, not from hand-written copies. This is what the `files` change in the library (`llms*.txt`, `AGENTS.md`, `CHANGELOG.md`, `decisions/*.md`, patch changeset `ship-docs-in-package.md`) exists to support.

**Package version: the site tracks the latest release.** It never documents something unpublished, and it picks up a release without a manual edit. Mechanically this needs a bump plus a rebuild, since a Vercel build installs from the lockfile: the portfolio's `sync-design-system.yml` is the working precedent, and the library's release workflow notifies both repos. How exactly it lands (an automatic bump commit, or a PR to review) is a Stage 6 detail.

**Hosting:** Vercel, same as the portfolio. The subdomain is a DNS record plus a domain entry on the project.

**Testing:** typecheck and build only. That is a real gate here rather than a weak one, because the generated pages read the package at build time: if a release stops shipping a file they need, the build fails instead of a page going blank. No Playwright and no link checker in v1.

**Not on Chromatic.** It would be a second project on the same free account, and the library alone used 4,794 snapshots in the Aug 23–Sep 23 period against a 5,000 ceiling. Visual review stays with the library, where the components live.

## Open questions

None. Both were answered on 2026-09-30 in `decisions/0001-page-structure-agent-surface-release-sync.md`, along with how a new release lands here.
