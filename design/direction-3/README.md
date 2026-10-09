# Direction 3 — "Resolution"

Exported from Claude Design on 2026-10-09 (Project HTML → Project archive), after two fixes (below). Same project as Directions 1 and 2, so the archive also contains their files; the Direction 3 pages are `Brand Direction 3.dc.html` (brand sheet) and `HeroResolution.dc.html` (hero, light/dark, desktop/mobile). `InviteCard.dc.html` is shared.

## The direction

Calm and legible, with a cool green. The hero shows what the system does: one value resolving from component token to semantic token to primitive. One viridian accent marks the primary action.

| | |
|---|---|
| Headings | Archivo 600, width 112.5%, −3% at display |
| Body | Atkinson Hyperlegible Next 400 / 700; Atkinson Hyperlegible Mono for tokens |
| Accent | Viridian, `oklch(0.50 0.10 165)` / `#117555` light (5.65:1, AA) and `oklch(0.76 0.12 165)` / `#5bc99e` dark (9.36:1, AAA). One job: the primary action |
| Neutrals | Sage, hue 170 |
| Radius | 12px on layers, controls and buttons |
| Spacing | 12px module; margins 72 desktop, 24 mobile; sections 144 apart |

## Decisions made while iterating

- Hero visual: the "How one value resolves" chain (Component → Semantic → Primitive) instead of a component specimen.
- Hero buttons wear the site brand (viridian primary); only the base demo card stays `base`.
- "One system, any brand" is left-aligned, three cards.
- Fix 1: secondary buttons ("Browse components", GitHub) use a 1px outline instead of 2px; padding 13/25 keeps the 48px height.
- Fix 2: the comparison section uses the same 24→72px side padding as the nav and hero, so all right edges line up.

## Known issues, for Day 4 (Figma)

- Check that the 1px secondary outline still reads as a button in both modes.
- `portfolio` looks almost the same as `base` in light mode (carried over from D1 and D2).
