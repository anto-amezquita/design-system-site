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

### First build of the docs site (kickoff Stage 6)

- **Source:** `decisions/0017-standalone-docs-site-base-theme.md` in the `design-system` repo, and this repo's `decisions/kickoff-checkpoint.md` (stages 1-5 answered).
- **Why it matters:** the design system is only shown as a page inside the portfolio, in the portfolio skin. This site shows what a new consumer actually gets, and it is the first real consumer of the `1.1.0` navigation components. The library-side prerequisites are done: the package ships `llms*.txt`, `AGENTS.md`, `CHANGELOG.md` and `decisions/*.md`.
- **Scope, first wave:** Landing, Getting started, Foundations, Components, Themes, Changelog, Working with AI and Guidelines (governance and versioning), per `decisions/0001`. The site also serves the agent-facing surface: `/.well-known/skills/`, `llms.txt`, `llms-full.txt`, `tokens.json`, the registry and the component doc twins, generated at build time from the installed package.
- **Before the agent surface can be generated:** the library's patch release adding `skills/`, `registry/`, `tokens.json` and `docs/components/` to its `files` (tracked in the `design-system` repo's backlog).
- **After the move:** check that `npx shadcn add` follows a redirect and that the registry manifests don't hardcode `amezquita.dk`; then delete the old design-system docs pages and agent files in the portfolio (its `app/design-system-playbook/` stays) and redirect the old URLs to the subdomain.
- **Status:** not started. App code doesn't exist yet.

### Release sync workflow

- **Source:** `decisions/0001`, item 3.
- **What:** a workflow that receives the library's `design-system-released` dispatch, bumps `@amezquita/design-system`, rebuilds and opens a PR, modelled on the portfolio's `sync-design-system.yml`.
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
