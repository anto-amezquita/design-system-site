# Brand direction — `demo-soft`

The third demo brand on the landing hero's switch (`demo-cool` · `demo-warm` · `demo-soft`; see `specs/2026-10-07-site-redesign.md`, Day 3). Its job: show the same components gentle and rounded, a third personality that neither of the other two covers.

A lighter run of the `brand-direction` skill, like `demo-warm`: brief here, no reference teardown, Claude makes the calls.

## Brief

- **Feel:** gentle, friendly, unhurried.
- **Not:** sharp, loud, clinical.
- **Fixed:** same structure, spacing and grid as `demo-cool`.
- **Kept apart from `demo-warm`:** low contrast and soft depth where `demo-warm` is high contrast with hard ink lines; a cool pastel where `demo-warm` is a hot red-orange.

| Slider (1 = left, 5 = right) | demo-cool | demo-warm | demo-soft |
|---|---|---|---|
| Serious ↔ Playful | 2 | 4 | 4 |
| Minimal ↔ Expressive | 2 | 4 | 3 |
| Warm ↔ Cool | 4 | 1 | 3 |
| Classic ↔ Contemporary | 2 | 4 | 3 |
| Quiet ↔ Bold | 2 | 5 | 1 |
| Expert ↔ Approachable | 2 | 4 | 5 |
| Editorial ↔ Productive | 4 | 2 | 3 |
| Refined ↔ Raw | 1 | 3 | 2 |

## Direction (first proposal)

| | demo-cool | demo-warm | demo-soft |
|---|---|---|---|
| Headings | Archivo 600 | Bricolage Grotesque 800 | Fraunces 500, SOFT axis 100, WONK 0 |
| Body | Atkinson Hyperlegible Next | Instrument Sans | Nunito 400 / 600 |
| Accent, light | viridian `#117555`, white text | vermilion `#C33C00`, white text | lavender `oklch(0.80 0.09 290)` `#BCB4F4`, ink text 8.24:1 |
| Accent, dark | `#5bc99e` | `#F98942` | `oklch(0.78 0.09 290)` `#B6AEEE`, ink text 7.69:1 |
| Neutrals | sage, hue 170 | sand, hue 70 | lavender-grey, hue 290: page `#F6F6FC`, ink `oklch(0.26 0.05 290)` `#241F3A` |
| Radius | 12px | 0 / 2px | 24px on layers, full pill on controls |
| Borders | 1px, quiet | 2px solid ink | none on layers; depth from a soft, low-opacity shadow |
| Spacing | 12px module | identical | identical |

Contrast checked (coloraide, WCAG 2.x): ink on page 14.6:1; secondary text `oklch(0.48 0.04 290)` `#5D5A73` on page 6.14:1; dark-mode text on page 14.43:1.

Known trade-off: the light-mode accent fill is only 1.77:1 against the page. WCAG doesn't require it (the label carries the button), but the primary button reads gentler than in the other two brands. That is the point of this brand; check it doesn't get lost in the render.

## Status

- [ ] Rendered in Claude Design (hero card + brand sheet, light/dark, 1440/375), after `demo-warm`
- [ ] Reviewed and adjusted
- [ ] Tokens in `tokens/brands/demo-soft/` (design-system repo)
