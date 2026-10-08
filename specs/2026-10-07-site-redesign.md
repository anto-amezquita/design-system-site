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
| 7 | Polish and case study | — | Motion, spacing, dark mode checked; before/after written up. Nice to have: the hero's scroll parallax (content below slides up over it, as on Astryx) |

---

## Day 1 — Teardown

Two hours. For each reference, look at the landing page and one docs page. Write what you can measure or point to, not impressions. Use DevTools for numbers. Save one screenshot of each first screen to `public/research/` (not linked from the site).

### Astryx — astryx.atmeta.com

| Question | Answer |
|---|---|
| Content max width, and gutter | No page max width: sections run full width with a 24px gutter (1377px wide at a 1440px window). Only the hero text is capped, at 800px with 24px inline padding (`--spacing-6`). Top nav is full width with 8px padding. |
| Headline font, size and weight at desktop | Figtree, 42px / 52px line height, weight 400, with the second half ("fully customizable and agent ready") at 600. Modest size; the big "astryx" above it is an SVG wordmark, not text. |
| Body font and size | Figtree, 16px / 24px. One family for everything. |
| Colours on the landing first screen (count them) | Four to five per theme, the same structure every time: one tinted background with a soft radial glow, near-black (or near-white) text, white card surfaces, one muted neutral for the secondary button, and one accent. Only y2k adds a second accent (lime next to dark brown). The blue logo mark in the nav never changes. |
| Where the accent colour is used, and where it isn't | Used on the wordmark, the send button, progress bars, the radio dot, outlined buttons (butter). Never on body text, the nav or the headline. The primary "Get started" stays black (inverted in gothic), whatever the theme. |
| What fills the first screen | A hero with a large wordmark (SVG), then a short, concrete line saying what it does. Two buttons: the high-contrast one and a toned-down one, as plain as possible. Around them, two product cards with smaller interactive components layered over them (chat input, add-to-cart card, points progress, "Limited time" badge, "Free shipping" radio). Cards and hero restyle together with the theme. The cards sit at the left and right edges, overlap each other, and run under the white sheet of the next section, which has rounded top corners. |
| The one signature element you'd recognise it by | The hero is a theme carousel: the same sample screens re-skinned in five themes (astryx, matcha, butter, gothic, y2k), switched with previous/next and page dots under the hero. Opens on astryx, no autoplay. A theme changes more than colour: corner radius (matcha very round, y2k square), display type (matcha's script product names), button style (butter outlined, y2k flat lime), and mode (gothic is dark). The product pitch, shown before it is said. |
| How a component preview is framed: background, border, padding, label | Overview (/components): a 3-column grid of bare tiles, 364px wide at 1440, 12px apart. Each tile is 16:10, 16px radius, no border, no shadow, filled with a translucent tint (`rgba(5, 54, 89, 0.047)`, about 5% navy over white, not a flat grey). The component sits centred, small. The label is outside the tile: 12px, regular weight, slate (`rgb(78, 96, 111)`), 4px below, name only, no description. Detail page (/components/Button): one 16:9 tile at full content width (912px), flat `#F1F1F1`, 12px radius, no border or shadow, component centred. |
| Active state in the nav | Side nav: active item gets a rounded tint (`rgba(5, 54, 89, 0.1)`, the same navy tint as the preview tiles at double strength) and weight 500 instead of 400. Same text colour, no indicator bar. Hover is a lighter tint. Items are 32px tall, 14px text, 8px side padding, 12px radius. The thick black outline in the screenshot is the keyboard focus ring (`:focus-visible`), not the active style. |
| Interaction states (added) | Buttons get darker one step at a time with a transparent overlay, not a new colour per state: `--color-overlay-hover` is 5% black and `--color-overlay-pressed` 10% black (`#0000000D`, `#0000001A`). In dark mode the same steps use white. Secondary rests at 6% black, ghost at transparent. The same 5% / 10% steps as the navy tint on tiles and the active nav item. |
| One thing to take | The hero theme carousel: one screen, several skins, the visitor flips through them. The top nav: vector logo left, main menu centred, tools and links right (search, theme toggle, GitHub, Get started). |
| One thing to leave | The skin, not the structure. The nav layout, tinted preview tiles, one accent, overlay states and hero carousel are the researched standard for a design-system site; take them as the baseline. Leave Astryx's palette, wordmark and theme names. What makes this site its own is the layer on top: type, accent, radius, voice (Day 2). Also: five themes. Cap the hero carousel at three. |

### Stripe — stripe.com/en-dk

| Question | Answer |
|---|---|
| Content max width, and gutter | One centred container, 1266px max with 16px padding (content 1234px), left edge at 80px on a 1440 window. Header is full width, 76px tall. Unlike Astryx, every section shares the same column. |
| Headline font, size and weight at desktop | Söhne (`sohne-var`), 48px / 55px, weight 300, tracking -0.96px (-2%). Two-tone: the first sentence in navy (`#061B31`), the rest of the paragraph in a lighter slate, all one `h1`. Left-aligned. |
| Body font and size | Söhne, 16px; nav links 14px regular. One family. |
| Colours on the landing first screen (count them) | Five plus a gradient: white background, navy text, slate secondary text, indigo accent (`#533AFD`), a pale lavender for the outline button's border, and the orange-pink-violet gradient ribbon on the right. Customer logos in greyscale. |
| Where the accent colour is used, and where it isn't | Indigo on the primary buttons (fill), the secondary buttons (text and pale border), and "Sign in". Never on the headline or body. The gradient carries the colour; the UI stays restrained. |
| What fills the first screen | Eyebrow with a live counter ("Global GDP running on Stripe"), the two-tone headline, two buttons (filled indigo, outlined indigo on translucent white), the gradient ribbon bleeding off the right edge, a greyscale logo strip at the fold. No product UI above the fold. |
| The one signature element you'd recognise it by | The animated wave in the hero: a WebGL2 canvas (`single-wave__canvas`) drawing a flowing orange-pink-violet ribbon that slowly shifts colour. The headline's second sentence changes colour where the wave passes behind it. How: the headline is rendered twice. The real `h1` (readable by screen readers) sits underneath in a yellow (`rgb(221, 214, 0)`); an exact copy marked `aria-hidden="true"` sits on top (z-index 2) in half-transparent blue (`rgba(0, 14, 255, 0.5)`) with `mix-blend-mode: hard-light`, inside a container with `isolation: isolate`. Over white the two layers mix to slate; over the moving wave the mix shifts with it. Five more WebGL canvases further down the page (globe, card graphics, a "squeezy" carousel). |
| How a product UI shot is framed: background, border, padding, label | A bento grid of large tiles. Each tile has its title top-left in the same two-tone style, then real miniature product UI (a card terminal, a checkout, a billing chart) set over a soft gradient. The UI pieces are white cards, 6px radius, no border, with long soft navy-tinted shadows (`rgba(50, 50, 93, 0.12) 0 16px 32px`). The shadow tint matches the navy text, not black. |
| Active state in the nav | None on the landing: marketing nav of dropdown triggers (Products, Solutions, Developers, Resources) plus Pricing, 14px regular. Sign in as outlined text button, Contact sales as filled indigo, both 40px, 4px radius. |
| One thing to take | The use of animation: the moving wave behind the hero, and the headline that reacts to it. The two-layer blend trick is plain CSS and works over any background, so it could run over our own hero; the wave itself is a custom WebGL piece, a stretch goal beyond this week. Also: the restraint around it (one accent, navy-tinted shadows, real product UI). |
| One thing to leave | The auto-scrolling customer-logo carousel under the hero. It is enterprise social proof; this site has no customer logos to show, and motion the visitor can't control reads as filler. More broadly, the business tone: Stripe is built for finance and engineering buyers and plays it safe on purpose. |

### Material 3 — m3.material.io

| Question | Answer |
|---|---|
| Content max width, and gutter | No max width. An 88px icon rail on the left, then the content fills the rest of the window (1337px at 1440) in rounded panels with 8px gaps between them and the window edge. |
| Headline font, size and weight at desktop | Google Sans, 96px / 96px (line height 1.0), weight 475, near-black (`#1C1B1D`). Very large, set tight, inside a panel. Section headings 57px at the same 475. Component page titles also 96px. |
| Body font and size | Google Sans Text, 16px / 24px: a separate text cut of the display family. |
| Colours on the landing first screen (count them) | Three in the UI: a lilac-tinted surface (`#F8F1F6`) for panels, near-black text, one purple accent (`#6442D6`). All the other colour comes from the imagery: a collage of phone screens in many hues. |
| Where the accent colour is used, and where it isn't | The "Get started" pill and the selected icon in the rail. Not on headlines, panels or body text. The surfaces carry a faint tint of the accent's hue instead of grey. |
| What fills the first screen | Two panels side by side, both 24px radius. Left: "Material Design" at 96px, one sentence, one large pill button (224 × 80px, fully round, purple). Right: a collage of real app screens built with Material (music player, chat, clock, shopping). Below the fold, a 57px section heading and more panels. |
| The one signature element you'd recognise it by | Openness through restraint. The narrow 88px icon rail on the left clears the width for the content, so the hero has room: a very large headline (96px), one sentence, and one big pill button (224 × 80px). Few buttons, nothing competing. One headline, one button, one accent. |
| How a component demo is framed: background, border, padding, label | Component pages (e.g. /components/buttons) open with two equal 24px-radius panels: the title (96px) and one-line description on a lilac tint at left; at right, the component shown in a real screen (a payment confirmation with its button), on a 1px-bordered panel with bright abstract shapes behind. Then a row of pill tabs (Overview, Specs, Guidelines, Accessibility), 79px tall, 40px radius. The component is shown in use, not isolated. |
| Active state in the nav | Vertical icon rail: each item is an icon over a 12px label. Active = the filled version of the icon (inactive ones are outlined) with a darker label (`#21182B`, weight 500). Search sits in a lilac rounded square at the top. |
| One thing to take | Nothing, deliberately. The icon rail is a personal favourite but a Material device, not a web convention; borrowing it would read as borrowing their identity. Material mainly confirms the restraint lesson from Astryx and Stripe (one headline, one button, one accent) instead of handing over a pattern. The left icon rail is parked as an idea for a later round. |
| One thing to leave | Showing each component inside a real screen (Button inside a payment confirmation). Bespoke mock-up work for every component, and it half-hides the component itself. For 35 components and one maintainer, the plain Astryx tile serves better. Take Material's restraint, not its staging. |

### design.amezquita.dk today — same questions, for the baseline

| Question | Answer |
|---|---|
| Content max width, and gutter | One column, 1296px max with 32px padding (content from x=97 at 1440). The hero adds its own 32px padding inside that, so the hero text starts at x=129 while the stats row and "What's here" start at x=97: the misaligned left edge, caused by double padding. Hero text capped at 800px. |
| Headline font, size and weight at desktop | The system font stack (`-apple-system, system-ui, Segoe UI, Roboto…`), 64px / 72px, weight 800, tracking -1.28px (-2%). No typeface of its own: it renders as San Francisco on a Mac and as something else on every other platform. |
| Body font and size | Same system stack. Lead paragraph 20px / 28px in `#525252`; small text 14px / 20px. |
| Colours on the landing first screen (count them) | Five, all neutral greys: `#FAFAFA` background, `#FFFFFF`, `#262626` buttons, `#0A0A0A` headline, `#525252` text. No accent, no tint. |
| Where the accent colour is used, and where it isn't | There is no accent. Near-black (`#262626`) does the accent's job on the primary button and the outlined secondary. |
| What fills the first screen | Package name and version as an eyebrow, the 64px headline, one lead sentence, two pill buttons (filled near-black, 2px outlined), then a row of four stats (35 components, 373 tokens, 2 themes, 1.3.3). The right half of the hero is empty. No component is shown working above the fold. |
| The one signature element you'd recognise it by | |
| How a component preview is framed: background, border, padding, label | Two columns of cards, 336px wide, 16px apart. Each card: 1px `#E5E5E5` border, 8px radius, no shadow; preview area on top in flat `#F5F5F5`, 176px tall, square corners; then an 18px / 600 title and a two-line description inside the card. |
| Active state in the nav | Top nav and side nav alike: `#F5F5F5` fill, 4px radius, weight 500. The same grey as the preview areas and as hover, so active, hover and preview all look the same. The thick black outline seen after a click is the focus ring. |

Already spotted: the hero's left edge doesn't line up with the stats row and "What's here" below it; the hero's right half is empty; the active nav item gets a thick black outline.

### Patterns across the three

After the tables, write three to five lines: what all three do that the site doesn't.

- All three are disciplined on the same four fundamentals at once: **alignment, spacing, colour and typography**. None of them relies on one trick.
- **Alignment** holds one edge. Stripe runs every section down one column; Material lines everything up to its panels. Ours breaks its own left edge on the first screen (hero at x=129, everything below at x=97).
- **Spacing** follows a scale. Astryx's spacing tokens step in 4px (`--spacing-1` = 4px … `--spacing-12` = 48px); Material keeps an even 8px between panels. We have spacing tokens too, but the double padding shows they aren't applied evenly.
- **Colour and type** are chosen, not defaulted: one accent each (Astryx navy, Stripe indigo, Material purple) and a typeface of their own (Figtree, Söhne, Google Sans). Ours is five greys and the system font stack.
- The four agree with each other, and that coherence is the signal: it reads as command of the craft, built on decades of web design and, before that, print. Our site handles each loosely and in isolation, so it reads as default.

## Day 1 — Brand brief

Two hours. Fill these sections of `docs/brand.md`, nothing else yet:

- **§1 Brand essence** — one sentence, three feelings, three "not"s. One "not" is already clear: not the shadcn/Vercel default.
- **§4 Brand attributes** — three, each with what it means in practice.
- **§5 Personality sliders** — mark a lean on every row.
- **§9 Visual direction** — feel, avoid, keywords.

That brief is the input for Day 2: it gets pasted into Claude Design as the starting prompt.

## Day 2 — Three brand directions in Claude Design

Input: `docs/brand.md` (§1, §4, §5, §9) and the Day 1 teardown. Output: one chosen direction, with its typeface, accent, neutral tint, radius and spacing feel written down here.

### Before the prompt (from the official guide, support.claude.com article 14604416)

1. **Import the design system.** In Claude Code, from the `design-system` repo, run `/design-sync` to bring `@amezquita/design-system` into Claude Design: tokens, fonts, components. Claude then checks its output against the system. Messy sources show up in the output, so import the published state, not work in progress.
2. **Treat the import as the `base` layer.** The new brand is proposed on top of it; components keep their `base` contract.
3. **Save between directions.** There is no version history yet: save direction 1 before asking for direction 2, and so on.
4. **Give feedback in numbers** ("tighten the gap above the buttons to 24px"), in chat for broad changes, inline comments for one component.

### Prompt (paste into Claude Design)

> I'm designing the brand for the documentation site of a token-first React design system, @amezquita/design-system (design.amezquita.dk). The site's job: show developers and design reviewers that the system is built on the fundamentals, done properly.
>
> Brand essence: "The fundamentals, done properly, ready for any brand and any agent."
> Feel: professional, cohesive, calm. Attributes: open, crafted, precise.
> Not: the shadcn/Vercel default, templated, loud.
> Leans: serious, minimal, cool, classic, quiet, expert, productive, refined.
>
> Give me three distinct directions. For each one:
> 1. A typeface for headings and one for body (Google Fonts only), with a type scale.
> 2. One accent colour with a single job, and a cool neutral scale tinted toward the accent's hue (no flat grey).
> 3. A corner radius and a spacing feel, on a 4px base.
> 4. The landing hero rendered with it, at desktop (1440px) and mobile (375px): top nav (logo left, menu centred, actions right), a headline, one sentence, one primary and one secondary Button, and real components from the imported system placed around the headline: a Card with an Input and a Button inside, a Tabs row, a Badge, an Avatar and a Switch. Use the imported components as they are, in their base theme; the brand goes on the page around them (nav, headline, surfaces, the frames around the components).
>
> Rules: one left edge for the whole page; spacing only from the 4px scale; the accent never on body text or headlines; no logo strips, no stock imagery, no gradients for their own sake. Show each direction in light and dark, desktop and mobile. Present one direction at a time; I will save each before asking for the next.

### Decision

| | Direction chosen | Typeface (heading / body) | Accent | Neutral tint | Radius | Spacing feel |
|---|---|---|---|---|---|---|
| Result | | | | | | |

### After Day 2: make the brand process reusable

Every project that uses the design system should get its own brand the same way. Once Day 2 has tested the exploration step, codify the process in two places:

- **The starter kit's Stage 3 (`guide/stages/03-brand-character.md`):** add the teardown worksheet, make `brand.md` §1, §4, §5 and §9 required, add the Claude Design prompt with placeholders and the decision table, and end with the hand-off: a new `tokens/brands/<project>/` in the design system, applied with `ThemeScope`. Stage 3 can't be skipped (this site skipped it and looked default).
- **A Claude skill** that runs the same five steps from any chat: teardown, brief, explore, decide, hand off.

Needs the starter kit's folder connected.

## Later, out of scope this week

- **Stripe-grade motion, as its own track after the site ships.** Stripe's premium feel comes from bespoke animated graphics: the hero wave, and a WebGL2 canvas per card ("Monetise through agentic commerce", "Create a card issuing programme", the globe, the "squeezy" carousel). That layer sits on top of a design system; tokens and Figma don't produce it. Learn it separately, starting with three.js. This week builds the foundation it will sit on: the motion only reads as premium because the type, spacing and restraint underneath are already right.

- **A left icon rail for navigation**, as on Material. A personal favourite; parked for a later round, after the site ships.

- **Best practices: the system's language, written down.** Astryx gives every component page a Do / Don't table ("Do reserve primary for the single most important action in the view"; "Don't use a button for navigation"). Our 58 component docs (`docs/components/*.md` in the library) cover Usage example, Props, Tokens and Accessibility, but not when to use a component. Add a `## Best practices` section to those docs, so one source reaches developers (the site renders it) and AI agents (`llms.txt`, the skill). Lift the four fundamentals into the Foundations overview as the principles underneath. Library work, shipped in a release under ADR 0022; start with Button, Link, Input, Card and Dialog.

## Open questions

- Interaction states as overlays? In the library today they are solid colours: nav hover and selected share one fill (`color-surface-secondary`, neutral-100), so they look the same, and the secondary Button jumps to the accent on hover. Astryx stacks a 5% / 10% overlay that works over any surface and any brand. A library change, so it would ship with the new brand under ADR 0022, or not at all this week.
- Hero theme carousel: at most three themes, and only brands the library actually ships (`base`, `portfolio`, the new site brand), no demo skins. Get each one right before adding more. Still open: the 0017 amendment keeps the landing composite in `base`, so the carousel is an exception for the hero, labelled with each theme's name. Confirm on Day 3.

- The brand's name. It becomes the folder under `tokens/brands/` and the `ThemeScope` value.
