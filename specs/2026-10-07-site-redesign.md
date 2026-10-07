# Site redesign — a brand of its own

Status: in progress (week of 2026-10-07)

## Why

The site renders the unskinned `base` theme top to bottom, as 0017 decided. It proves the default, but it reads as a template: nothing on it belongs only to this system. `docs/brand.md` was never filled in — the kickoff recorded the brand stage as answered by "the `base` theme".

## What changes

Decided in the 2026-10-07 amendment to `decisions/0017` in the design-system repo:

- The site frame (top bar, side nav, hero, headings, prose, section backgrounds, the frames and labels around each preview) wears a new brand, defined in the design-system repo under `tokens/brands/`.
- Component previews stay in `base`. They sit outside the branded parts as siblings, never inside them. Cohesion comes from their setting, the way Material's site does it.
- The site defines no colours, type or spacing of its own. Figma variables come from the same token files.

## The week (4 hours a day)

| Day | Focus | Tool | Done when |
|---|---|---|---|
| 1 | Teardown and brand brief | Browser, this file, `docs/brand.md` | Worksheet below filled; `brand.md` §1, §4, §5, §9 filled |
| 2 | Three brand directions, pick one | Claude Design | One direction chosen, with type pairing, accent colour, radius and spacing feel written down |
| 3 | Landing hero | Claude Design | Hero shows the system working in the first screen; no empty half |
| 4 | Docs page template | Figma, variables from the token files | Foundations and Components layouts; active-nav state; previews as siblings of branded frames |
| 5 | Preview frames | Figma | One frame treatment that works for all 35 components, light and dark |
| 6 | Ship | Claude Code | New brand released from the library (one minor, ADR 0022); site bumps and applies it |
| 7 | Polish and case study | — | Motion, spacing, dark mode checked; before/after written up |

---

## Day 1 — Teardown

Two hours. For each reference, look at the landing page and one docs page. Write what you can measure or point to, not impressions. Use DevTools for numbers. Save one screenshot of each first screen to `public/research/` (not linked from the site).

### Astryx — astryx.atmeta.com

| Question | Answer |
|---|---|
| Content max width, and gutter | |
| Headline font, size and weight at desktop | |
| Body font and size | |
| Colours on the landing first screen (count them) | |
| Where the accent colour is used, and where it isn't | |
| What fills the first screen | |
| The one signature element you'd recognise it by | |
| How a component preview is framed: background, border, padding, label | |
| Active state in the nav | |
| One thing to take | |
| One thing to leave | |

### Stripe — stripe.com/en-dk

| Question | Answer |
|---|---|
| Content max width, and gutter | |
| Headline font, size and weight at desktop | |
| Body font and size | |
| Colours on the landing first screen (count them) | |
| Where the accent colour is used, and where it isn't | |
| What fills the first screen | |
| The one signature element you'd recognise it by | |
| How a product UI shot is framed: background, border, padding, label | |
| Active state in the nav | |
| One thing to take | |
| One thing to leave | |

### Material 3 — m3.material.io

| Question | Answer |
|---|---|
| Content max width, and gutter | |
| Headline font, size and weight at desktop | |
| Body font and size | |
| Colours on the landing first screen (count them) | |
| Where the accent colour is used, and where it isn't | |
| What fills the first screen | |
| The one signature element you'd recognise it by | |
| How a component demo is framed: background, border, padding, label | |
| Active state in the nav | |
| One thing to take | |
| One thing to leave | |

### design.amezquita.dk today — same questions, for the baseline

| Question | Answer |
|---|---|
| Content max width, and gutter | |
| Headline font, size and weight at desktop | |
| Body font and size | |
| Colours on the landing first screen (count them) | |
| Where the accent colour is used, and where it isn't | |
| What fills the first screen | |
| The one signature element you'd recognise it by | |
| How a component preview is framed: background, border, padding, label | |
| Active state in the nav | |

Already spotted: the hero's left edge doesn't line up with the stats row and "What's here" below it; the hero's right half is empty; the active nav item gets a thick black outline.

### Patterns across the three

After the tables, write three to five lines: what all three do that the site doesn't.

-

## Day 1 — Brand brief

Two hours. Fill these sections of `docs/brand.md`, nothing else yet:

- **§1 Brand essence** — one sentence, three feelings, three "not"s. One "not" is already clear: not the shadcn/Vercel default.
- **§4 Brand attributes** — three, each with what it means in practice.
- **§5 Personality sliders** — mark a lean on every row.
- **§9 Visual direction** — feel, avoid, keywords.

That brief is the input for Day 2: it gets pasted into Claude Design as the starting prompt.

## Open questions

- The brand's name. It becomes the folder under `tokens/brands/` and the `ThemeScope` value.
