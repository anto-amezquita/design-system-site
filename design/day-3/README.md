# Day 3 — Landing hero with three demo brands

Exported from Claude Design on 2026-10-12 (Project HTML → Project archive), unchanged. Same project as the three directions, so the archive also contains their files. The Day 3 pages:

- `HeroResolution.dc.html`: the landing page with the new hero (light/dark, desktop/mobile).
- `DemoCard.dc.html`: the hero card in all three demo brands, side by side.
- `Brand demo-warm.dc.html`, `Brand demo-soft.dc.html`: brand sheets for the two new demo brands.
- `assets/`: the three hero images (same files as `design/images/`).

## The hero

The left column is unchanged from Direction 3: badge, headline "The fundamentals, done properly." on two lines, lead sentence, Get started and Browse components. The right column is one real Card with a brand switch above it:

- **Switch:** `demo-cool` · `demo-warm` · `demo-soft`, `demo-cool` first. Selected = a quiet fill; the outline shows only on keyboard focus (`:focus-visible`).
- **Card:** 21:9 image, title, "Updated 2 days ago", one primary Button "Read more". Max 520px wide, right edge on the 72px margin (aligned with GitHub). Both columns centre against each other.
- **One line under the card** with the active brand's real values, e.g. `accent #117555 · radius 12px · Archivo`.
- **Switching re-skins everything at once:** image, title, font, accent, neutrals, radius, borders.

| | demo-cool | demo-warm | demo-soft |
|---|---|---|---|
| Title | Quiet days on the west coast | Sun-baked doorways | Lavender at first light |
| Image | coastal dunes | terracotta wall | lavender field |
| Headings | Archivo | Bricolage Grotesque 800, 28px card title | Fraunces (SOFT 100) |
| Body | Atkinson Hyperlegible Next | Instrument Sans | Nunito |
| Accent light / dark | `#117555` / `#5bc99e` | `#cb3000` / `#f98942` | `#bcb4f4` / `#b6aeee` |
| Radius | 12px | 0 layers, 2px controls | 24px layers, pill controls |
| Edges | 1px line | 2px solid ink | soft shadow, no line |

Specs: `specs/2026-10-07-site-redesign.md` (Day 3), `specs/2026-10-12-brand-demo-warm.md`, `specs/2026-10-12-brand-demo-soft.md`.

## Known issues and open points

- **Hand-styled for now:** `demo-warm` and `demo-soft` exist only in Claude Design. They become tokens in the library (`tokens/brands/demo-*/`), then a release, then `/design-sync`.
- **Values Claude Design chose itself** (sand and lavender ramp steps, hover/pressed accents, dark surfaces) still need checking against the briefs before they become tokens. `demo-warm`'s light accent renders as `#cb3000`; the spec's `#C33C00` is the same OKLCH value mapped differently. Use `#CB3000`.
- **Button has no pressed state** in the library; the brand sheets draw it by hand.
- **The 1px secondary outline** on the hero is set inline, not yet a `demo-cool` token.
- The right column is about 70px taller than the left; centred, that reads as balanced.
