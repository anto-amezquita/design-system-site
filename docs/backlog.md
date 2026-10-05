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

### Move the portfolio's docs and agent files to this site

- **Source:** `decisions/0001`, item 2. Unblocked: the site is live at `https://design.amezquita.dk`.
- **Already answered:** the registry manifests *do* hardcode `amezquita.dk` (every component's `registryDependencies` points at `https://amezquita.dk/r/theme.json`), so the portfolio's `/r/*` must redirect, not disappear.
- **Also answered (2026-10-05):** the registry served here installs (1.2.1 fixed the theme's `null` cssVars, which broke every install from 1.1.1 on). And `npx shadcn add` (4.21.1) follows redirects, for the item asked for and for its `registryDependencies`. Tested through a local server answering 308 for Button, Spinner and the theme: all three installed. The portfolio's apex already answers `/r/*` with a 307 to `www`, and shadcn installs through that today.
- **Redirect map for the portfolio** (paths changed on the move): `/design-system` → `/`, `/design-system/foundations/*` → `/foundations/*`, `/design-system/components` and `/design-system/components/:slug` → `/components` and `/components/:slug`, `/design-system/changelog` → `/changelog`, `/design-system/guidelines` → `/guidelines`, `/design-system/tokens` → `/foundations`, `/design-system/:slug.md` → `/components/:slug.md`. Same paths: `/.well-known/skills/*`, `/llms.txt`, `/llms-full.txt`, `/tokens.json`, `/r/*`.
- **Then:** delete the portfolio's `app/design-system/`, `components/docs/` and the agent files in `public/` (its `app/design-system-playbook/` and `/design-tokens` stay).

### Library changes this site needs (design-system repo)

Found in the first build and the move to 1.2.0; each has a note in the spec (§9). None blocks this site. They're tracked in the design-system repo's own `docs/backlog.md` ("Gaps found by the docs site's first build"), so a library session sees them; the two found in the 1.2.0 move are under "Gaps found putting both brands on one page" there. `scripts/check-workarounds.mjs` runs before every build here and warns, on the release-sync PR too, when a fix has landed and its workaround can go.

- **`tokens/changelog.json` lags a release.** In 1.2.0 it stops at `v1.1.2`. The site reads `CHANGELOG.md`, so nothing here is wrong, but the JSON is stale for anyone else.
- **Breadcrumb takes no `aria-label`.** It hardcodes "Breadcrumb", so two on one page (Themes) are duplicate landmarks. The site renames them with an effect in `components/themes/ThemeExplorer.tsx` (spec §9, item 9); `check-workarounds.mjs` warns when the prop lands.
- **Menu and Select popovers leave the brand scope.** Both portal to `<body>`, outside `[data-brand="portfolio"]`, so opening one in Themes' portfolio panel shows a base popover. The library item proposes a `BrandScope` component that overlays read from (spec §9, item 10). No workaround here; `npm run check:themes` warns while the gap is open and when a release fixes it. Before that release is published, install the library's `npm pack` tarball here on a throwaway branch and run the check against it.
- **Switch the agent files' URLs to the subdomain.** `llms.txt`, `llms-full.txt`, `SKILL.md` and the registry point at `amezquita.dk`, and the doc twins at `/design-system/<slug>.md`. On this site the twins are at `/components/<slug>.md`. The site is live, so the new URLs resolve; this can go in the next release.

### Site follow-ups

- **Storybook links (Antonio).** `NEXT_PUBLIC_STORYBOOK_URL` isn't set on Vercel, so component pages leave out their Storybook links. Copy the value from the portfolio's Vercel project (Settings → Environment Variables), add it to this one, and redeploy: Next bakes it in at build time.

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
