# Direction 2 — "Index"

Exported from Claude Design on 2026-10-09 (Project HTML → Project archive), unchanged. Same project as Direction 1, so the archive also contains Direction 1's files (`Brand Directions.dc.html`, `HeroSpecification.dc.html`); the Direction 2 pages are `Brand Direction 2.dc.html` (brand sheet) and `HeroIndex.dc.html` (hero, light/dark, desktop/mobile). `InviteCard.dc.html` is shared.

## The direction

A well-set reference book: a text serif for headings, a plain sans for reading, generous whitespace, soft corners, and the system presented as a numbered index. One iris bookmark marks where you are.

| | |
|---|---|
| Headings | Newsreader 400, optical sizes, −1.5% at display |
| Body | Public Sans 400 / 500; JetBrains Mono for tokens |
| Accent | Iris, `oklch(0.50 0.15 290)` light / `oklch(0.72 0.12 290)` dark. One job: the bookmark, a 4px rule beside the one thing you are on. Never text, never a fill on the page |
| Neutrals | Slate, hue 290, chroma 0.002–0.022 |
| Radius | 8px on surfaces and, in the site brand, on every component |
| Spacing | 4px base in steps of 8; margins 96 desktop, 24 mobile; sections 128 apart |

## Decisions made while iterating

- The hero index rows are real links (Tokens → /foundations, Primitives / Composition / Patterns → /components#…). No row is active on the landing page; the iris bookmark shows on hover and keyboard focus only. A static "you are here" marker read as interactive with nothing to mark.
- Both edges hold: logo, badge, headline and the "One system, any brand" section on one left edge (about x=100 at 1440), GitHub, the index and the third card on one right edge.
- "One system, any brand" is left-aligned, three cards: base, portfolio, site · direction 2.

## Known issues, for Day 4 (Figma)

- Hero buttons are still `base` pills on a page with 8px corners.
- Dark mode: white text on the light iris "Send invite" button looks low-contrast. Measure against 4.5:1.
- `portfolio` looks almost the same as `base` in light mode.
