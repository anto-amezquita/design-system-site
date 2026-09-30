# 0001 — Page structure, the agent-facing surface, and how releases land

## Status

Accepted

## Context

The kickoff checkpoint left two open questions, and a third came up while writing the first-build backlog item. All three needed an answer before the first build, because each one changes what gets built:

1. Whether the pages moved from the portfolio keep their structure or follow the section list in the library's `decisions/0017`.
2. Where the `.well-known` agent skill is served from once it leaves the portfolio.
3. How a new package release reaches this site.

What the portfolio has today (checked 2026-09-30):

- **Routes under `app/design-system/`:** `foundations/{color,motion,spacing,typography}`, `components` and `components/[name]`, `changelog`, `tokens`, `guidelines`.
- **Agent-facing files in `public/`:** `.well-known/skills/` (the skill and `index.json`), `llms.txt`, `llms-full.txt`, `tokens.json`, `r/` (the shadcn registry) and `design-system/*.md` (component doc twins). There are 27 doc twins against 34 public components in `1.1.0`, so the copy has already drifted.
- **Release sync:** the portfolio receives a `design-system-released` dispatch and opens a bump PR through `sync-design-system.yml`. That dispatch failed on the `1.0.0` release because the `amez-ds-self-heal` GitHub App isn't installed on the portfolio yet.

## Decision

**1. Follow 0017's section list, with one page added.** Foundations, Components and Changelog move across from the portfolio. Landing, Getting started, Themes and Working with AI are new. The portfolio's Guidelines page has no home in 0017's list, so it is split: its AI-agent section (`AGENTS.md`, the skill, the MCP tools) becomes Working with AI, and governance and versioning stay as a Guidelines page. Whether `/tokens` duplicates Foundations is checked when it's moved, not decided now. The portfolio's own `/design-tokens` page is about the portfolio's theming and stays in the portfolio.

**2. The whole agent-facing surface moves to this site, not just the skill.** Agents look for `/.well-known` on the origin they are visiting, so the site that documents the system serves it, together with `llms.txt`, `llms-full.txt`, `tokens.json`, the registry and the doc twins. Splitting them across two origins would leave agents with half the picture on each.

This site generates them at build time from the installed package, not from copies, so they can't drift. That needs a patch release of the library adding what it doesn't ship today: `skills/`, `registry/`, `tokens.json` and `docs/components/`. The old amezquita.dk paths redirect to the subdomain.

Two checks before the portfolio's copies are deleted: whether `npx shadcn add` follows a redirect, and whether the registry manifests hardcode `amezquita.dk`.

**3. A release lands as a PR, the same way it does in the portfolio.** The library's release workflow dispatches to this repo too. A workflow here bumps the package, rebuilds and opens a PR. Typecheck and build are the gate, and merging stays a manual click for now.

## Alternatives considered

- **Keep the portfolio's page structure as it is.** Rejected: it has no Landing, Getting started or Themes, which are the pages that show the system in use and the `base`/`portfolio` split, the reasons 0017 gives for the site existing.
- **Move only the skill and leave the other agent files in the portfolio.** Rejected: one agent-facing surface would be split across two origins, and the portfolio copies would keep drifting, as the doc twins already have.
- **Keep copying the files into `public/` by hand.** Rejected: this is how the portfolio's doc twins fell 7 components behind.
- **Install `@latest` on every Vercel build.** Rejected: builds become nondeterministic, since the same commit can build against different package versions, and a bad release goes live with no review step.
- **Commit the bump directly to `main` without a PR.** Rejected for now: a PR shows the typecheck and build result before anything goes live. Revisit once a few releases have landed cleanly.

## Consequences

### Positive
- One origin serves everything an agent needs, and it can't drift from the published package.
- Every release is checked by a real consumer build before it goes live here.
- The sync mechanism is the one already built for the portfolio, not a new one.

### Negative
- Needs a library patch release that grows `package.json`'s `files`, which makes the package bigger.
- Needs the `amez-ds-self-heal` App installed on this repo, with its two secrets. The same one-time step is still open for the portfolio, so both are done together.
- The portfolio needs redirects for the old agent-facing paths, and the redirect behaviour of `npx shadcn add` has to be confirmed before its copies go.
- A release needs a manual merge before it shows on the site.

## Related files

- `decisions/0017-standalone-docs-site-base-theme.md` in the `design-system` repo — the section list and reasoning this builds on
- `decisions/kickoff-checkpoint.md` — where two of these questions were left open
- `docs/backlog.md` — the first-build item these answers unblock
- `design-system/package.json` — the `files` list the patch release changes
- `portfolio/.github/workflows/sync-design-system.yml` — the release-sync precedent
- `portfolio/public/` — the agent-facing files that move
