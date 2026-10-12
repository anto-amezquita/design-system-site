# Brand direction — `demo-warm`

One of three demo brands on the landing hero's brand switch (`demo-cool` · `demo-warm` · `demo-soft`; see `specs/2026-10-07-site-redesign.md`, Day 3). Its job: be the deliberate opposite of `demo-cool`, so one click shows how far the same components can move.

A lighter run of the `brand-direction` skill: it's a demo brand, so the brief lives here instead of in `docs/brand.md`, and there is no reference teardown. Antonio asked Claude to make the calls.

## Brief

- **Feel:** bold, warm, confident.
- **Not:** calm, muted, corporate.
- **Fixed:** same structure, spacing and grid as `demo-cool`. Accent, neutrals, radius and typeface flip hard.

| Slider (1 = left, 5 = right) | demo-cool | demo-warm |
|---|---|---|
| Serious ↔ Playful | 2 | 4 |
| Minimal ↔ Expressive | 2 | 4 |
| Warm ↔ Cool | 4 | 1 |
| Classic ↔ Contemporary | 2 | 4 |
| Quiet ↔ Bold | 2 | 5 |
| Expert ↔ Approachable | 2 | 4 |
| Editorial ↔ Productive | 4 | 2 |
| Refined ↔ Raw | 1 | 3 |

Corners: sharp (Antonio, 2026-10-12). Pill stays free for `demo-soft`.

## Direction (first proposal)

| | demo-cool | demo-warm |
|---|---|---|
| Headings | Archivo 600, width 112.5% | Bricolage Grotesque 800, −3% at display |
| Body | Atkinson Hyperlegible Next | Instrument Sans 400 / 600 |
| Mono | Atkinson Hyperlegible Mono | JetBrains Mono |
| Accent, light | viridian `#117555` | vermilion `oklch(0.55 0.20 38)` `#C33C00`, white text 5.27:1 (AA) |
| Accent, dark | `#5bc99e` | `oklch(0.74 0.16 50)` `#F98942`, ink text 7.49:1 (AAA) |
| Neutrals | sage, hue 170, cool | sand, hue 70 light (`#FCF6EE` page), warm ink hue 45 (`#1E130E`) |
| Radius | 12px everywhere | 0 on layers, 2px on controls |
| Borders | 1px, quiet | 2px solid ink: graphic, part of the character |
| Shadows | none | none |
| Spacing | 12px module, margins 72 / 24 | identical |

Contrast checked (coloraide, WCAG 2.x): secondary text `oklch(0.45 0.03 50)` `#635147` on the sand page 6.99:1.

The accent's one job, as in `demo-cool`: the primary action. Never body text.

## Notes from the first render (2026-10-12)

- Bricolage Grotesque loads (Rendered Fonts: "Bricolage Grotesque 96pt ExtraBold"). The card title takes weight and size from tokens (`--font-weight-title`, `--font-size-h5`), so `demo-warm` overrides those: 800 and 28px, line-height 1.15, −0.02em. At 20px the typeface barely differs from Archivo.
- Claude Design filled in the sand ramp's middle steps, the hover/pressed accents, the dark card surface and the dark secondary text itself. Check them against the brief before they become tokens.
- The 2px border is a shared border token, so it reaches inputs too.

## Status

- [ ] Rendered in Claude Design (hero card + brand sheet, light/dark, 1440/375)
- [ ] Reviewed and adjusted
- [ ] Tokens in `tokens/brands/demo-warm/` (design-system repo)
