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

### Library changes this site needs (design-system repo)

Found in the first build and the moves to 1.2.0 and 1.3.0; each has a note in the spec (§9). None blocks this site. They're tracked in the design-system repo's own `docs/backlog.md` ("Gaps found by the docs site's first build"), so a library session sees them. `scripts/check-workarounds.mjs` runs before every build here and warns, on the release-sync PR too, when a fix has landed and its workaround can go.

- **`tokens/changelog.json` lags a release.** In 1.2.0 it stops at `v1.1.2`. The site reads `CHANGELOG.md`, so nothing here is wrong, but the JSON is stale for anyone else.

### Site follow-ups

- **Storybook links (Antonio).** `NEXT_PUBLIC_STORYBOOK_URL` isn't set on Vercel, so component pages leave out their Storybook links. Copy the value from the portfolio's Vercel project (Settings → Environment Variables), add it to this one, and redeploy: Next bakes it in at build time.

- **A light/dark switch.** The site follows the system setting only. A switch would let a reader compare modes without changing their OS; the token tables already show both values.
- **Fill in `docs/architecture.md`.** It's still the starter kit's template. The stack and structure are in the spec's §7 and should move there once they've settled.

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
