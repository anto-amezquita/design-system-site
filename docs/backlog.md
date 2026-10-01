# backlog.md

## Purpose

This file holds the product's live, open work — nothing else. Every other file in `docs/` is stable reference (what the product is, how it's built, what quality means); this one is the only file expected to change from session to session.

Its job is narrow on purpose: a session should be able to open this file and know what's actually actionable right now, without paging through `product-north-star.md` or a pile of closed specs to find it.

---

## 1. Session protocol

1. Read this file first, before the other `docs/` files — it's the one that tells you whether there's open work waiting, and the other docs are read for context on *how* to do it, not *what* to do.
2. If it's empty, there's no open backlog item. Check with whoever's directing the work before starting something new.
3. Pick an item, or ask if more than one is open and it's not obvious which.
4. When an item ships or a decision is made: remove it from this file. If it's substantial enough to need a record, write a spec in `/specs` or an ADR in `/decisions` per this repo's own conventions — this file holds only what's still open, never history.
5. If new backlog work surfaces mid-session (a deferred fix, a follow-up idea, something explicitly punted on), add it here before finishing — not just in memory or a chat transcript.

---

## 2. Open items

### Deploy the site (Antonio)

- **Source:** `specs/2026-09-30-first-build.md`; the first build is on branch `feat/first-build`.
- **What:** review and merge `feat/first-build`; create the Vercel project for this repo (framework Next.js, default build command, no env vars required); add the domain `design.amezquita.dk` to it and the DNS record at the registrar. If the subdomain ends up different, change `SITE_URL` in `lib/site.ts`.
- **Optional:** set `NEXT_PUBLIC_STORYBOOK_URL` on Vercel to the published Storybook. Without it, component pages leave out their Storybook links.

### Move the portfolio's docs and agent files to this site

- **Source:** `decisions/0001`, item 2. Blocked on the deploy above.
- **Already answered:** the registry manifests *do* hardcode `amezquita.dk` (every component's `registryDependencies` points at `https://amezquita.dk/r/theme.json`), so the portfolio's `/r/*` must redirect, not disappear.
- **Still to check:** whether `npx shadcn add` follows a redirect. Try `npx shadcn add https://amezquita.dk/r/button.json` against a redirect before deleting anything.
- **Redirect map for the portfolio** (paths changed on the move): `/design-system` → `/`, `/design-system/foundations/*` → `/foundations/*`, `/design-system/components` and `/design-system/components/:slug` → `/components` and `/components/:slug`, `/design-system/changelog` → `/changelog`, `/design-system/guidelines` → `/guidelines`, `/design-system/tokens` → `/foundations`, `/design-system/:slug.md` → `/components/:slug.md`. Same paths: `/.well-known/skills/*`, `/llms.txt`, `/llms-full.txt`, `/tokens.json`, `/r/*`.
- **Then:** delete the portfolio's `app/design-system/`, `components/docs/` and the agent files in `public/` (its `app/design-system-playbook/` and `/design-tokens` stay).

### Library changes this site needs (design-system repo)

Found in the first build; each has a note in the spec (§9). None blocks this site. They're tracked in the design-system repo's own `docs/backlog.md` ("Gaps found by the docs site's first build"), so a library session sees them. `scripts/check-workarounds.mjs` runs before every build here and warns, on the release-sync PR too, when a fix has landed and its workaround can go.

- **`'use client'` on `Link`, `SkipLink` and `Tag`.** Fixed on the library's `fix/client-directives` branch, with a validate check so it can't come back. Waiting on review, merge and release. When it lands, delete `components/ds/Link.tsx`.
- **A brand scope in the brand CSS.** `portfolio-*.css` targets `:root` and `[data-mode]`, so one page can only show one brand. Something like `[data-brand="portfolio"]` would let Themes render both brands on one page and drop its preview frames.
- **Doc twins resolve token values from the portfolio brand.** `docs/components/*.md` Tokens tables show portfolio values (e.g. Button's `--button-secondary-border` is `#292524`). The registry had the same bug, fixed in 1.1.1. This site builds component token tables from `token-reference.json` instead.
- **`tokens/changelog.json` stops at `v1.1.0`.** The site reads `CHANGELOG.md`, so nothing here is wrong, but the JSON is stale for anyone else.
- **Switch the agent files' URLs to the subdomain.** `llms.txt`, `llms-full.txt`, `SKILL.md` and the registry point at `amezquita.dk`, and the doc twins at `/design-system/<slug>.md`. On this site the twins are at `/components/<slug>.md`. Do it after the deploy, so the new URLs resolve when the release goes out.

### Site follow-ups

- **A light/dark switch.** The site follows the system setting only. A switch would let a reader compare modes without changing their OS; the token tables already show both values.
- **Fill in `docs/architecture.md`.** It's still the starter kit's template. The stack and structure are in the spec's §7 and should move there once they've settled.

### Release sync workflow

- **Source:** `decisions/0001`, item 3.
- **What:** a workflow that receives the library's `design-system-released` dispatch, bumps `@amezquita/design-system`, rebuilds and opens a PR, modelled on the portfolio's `sync-design-system.yml`. The package is pinned to an exact version in `package.json`, so the workflow sets the exact new version (`npm install --save-exact @amezquita/design-system@<version>`). `npm run build` also runs the agent-surface sync, so the PR's build checks the new release's files.
- **Status:** not started. Needs, in order: the `amez-ds-self-heal` App installed on this repo, with `SELF_HEAL_APP_CLIENT_ID` and `SELF_HEAL_APP_PRIVATE_KEY` added as secrets (the same one-time step is open for the portfolio, so do both together); then this workflow; then this repo added as a second dispatch target in the library's `release.yml`. The dispatch target comes last on purpose, since until this workflow exists nothing here would receive it.

---

## 3. What doesn't belong here

- **Finished work.** Once something ships, it leaves this file. History lives in `/specs` (what was built and why) and `/decisions` (architectural choices), not in a growing log here.
- **Vague aspirations.** "Improve performance" isn't an item; "investigate the N+1 query on the dashboard load" is. If it's too vague to hand to someone as a starting point, it's not ready for this file yet.
- **A roadmap with dates or phases.** This file tracks *what's open*, not a schedule. If the product needs date-based planning, that belongs in whatever project-management tool `docs/linear-workflow.md` (or its equivalent) points at — this file stays a plain list.

---

## Final review checklist

- Could someone open this file cold and know what to work on next?
- Is every item concrete enough to start, not just a topic?
- Has everything that shipped since the last review been removed?
- Does anything here actually belong in a spec or ADR instead, now that it's been thought through?
