# Direction 1 — "Specification"

Exported from Claude Design on 2026-10-09 (Share → Export → Project HTML → Project archive), unchanged. Source project: https://claude.ai/design/p/260aebbf-3e0f-4d92-8120-e0974a2bbea5

Open `Brand Directions.dc.html` (brand sheet), `HeroSpecification.dc.html` (landing hero, light/dark, desktop/mobile) or `InviteCard.dc.html` in a browser.

## The direction

A drafting sheet: cool ink neutrals, hairline frames, 2px corners, and one cobalt marker that points at every value coming from a token.

| | |
|---|---|
| Headings | Hanken Grotesk 600, tracking −2.5% at display |
| Body | IBM Plex Sans 400 / 500; IBM Plex Mono for token names |
| Accent | Cobalt, `oklch(0.53 0.17 258)` light / `oklch(0.70 0.13 258)` dark. One job: mark tokens. Never on text, never a fill or a button on the page |
| Neutrals | Ink scale, hue 258, chroma 0.002–0.02 |
| Radius | 2px on page frames and surfaces; components keep their own radius tokens |
| Spacing | 4px base; tight inside frames (12–24), generous between them (64–96) |

## Decisions made while iterating

- Mobile nav: burger icon button, no border; logo is a single-line mark + "amezquita".
- One left edge and one right edge for logo, badge, headline, frames and nav, at 1440 and 375.
- Hero: typographic, with one annotated token (`--color-accent-default`) as the visual. No live components above the fold.
- "One system, any brand": the same "Invite a teammate" card in three brands (base, portfolio, site · direction 1) below the hero; Tabs switch them on mobile.

## Known issues, for Day 4 (Figma)

- The "One system, any brand" section is centred on desktop (cards from about x=325) while the rest of the page holds the left edge.
- In light mode `portfolio` looks almost the same as `base`.
