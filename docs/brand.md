# brand.md

## Purpose

This file defines how the product should express its identity through voice, visual character, and emotional tone.

A brand is not only a logo, palette, or font choice. It is the consistent feeling people get from the product over time — through what it says, how it looks, how it behaves, and what it chooses to emphasise.

This document exists to keep brand expression coherent across product design, content, marketing, and implementation.

---

## Relationship to the other core files

- `product-north-star.md` defines **what the product is, who it is for, and why it exists**
- `spec.md` defines **how product work should be specified before it is built**
- `design.md` defines **how the product should be designed as an interface and system**
- `brand.md` defines **how the product should feel, sound, and be recognised**

---

# Brand foundation

## 1. Brand essence

### One-line essence

The fundamentals, done properly, ready for any brand and any agent.

### What we want people to feel

- Professional
- Cohesive
- Calm

### What we are not

- not the shadcn/Vercel default
- not templated: nothing that looks like it came from a starter kit
- not loud: no trend-chasing, no decoration for its own sake

---

## 2. Brand promise

[Describe the dependable value people should expect every time they encounter the product.]

---

## 3. Audience relationship

### We should feel like

- [e.g. a trusted guide]
- [e.g. a sharp collaborator]

### We should not feel like

- [e.g. a distant institution]
- [e.g. an overexcited salesperson]

### User posture

The product should make users feel:

- [e.g. capable, not dependent]
- [e.g. informed, not overwhelmed]
- [e.g. respected, not manipulated]

---

# Personality

## 4. Brand attributes

Choose 3–5 core attributes that define the brand character.

### Open

**Meaning**  
The system carries no brand of its own in its components. Any brand fits on top, and the site shows that working rather than claiming it.

**In practice**
- Component previews render in `base`, exactly what `npm install` gives.
- Brands are token files (`base`, `portfolio`, the site brand), switched per page or per region with `ThemeScope`.

**Not**
- Bland. Open means a neutral core with a confident frame, not an absence of character.

### Crafted

**Meaning**  
The details show care: every state is designed, nothing is left at the browser default.

**In practice**
- Hover, pressed, focus, disabled, loading and error exist for every interactive component, in light and dark.
- Focus rings, motion and empty states are designed, not inherited.

**Not**
- Ornamental. Craft goes into how things work and settle, not into decoration.

### Precise

**Meaning**  
Alignment, spacing, colour and type follow rules, and the rules are visible in the result.

**In practice**
- One left edge per page; spacing comes from the token scale, never a one-off value.
- One accent with a defined job; one typeface family with a defined scale.

**Not**
- Rigid. The rules serve readability; a deliberate exception is documented, not hidden.

---

## 5. Personality sliders

1 = fully the left word, 5 = fully the right word.

| Dimension | Lean | Why |
|---|---|---|
| Serious ↔ Playful | 2 | Professional and calm, but not cold. |
| Minimal ↔ Expressive | 2 | Restrained core; the confident frame keeps it from 1. |
| Warm ↔ Cool | 4 | Calm reads cool: a cool tinted neutral, like the navy tint admired on Astryx. |
| Classic ↔ Contemporary | 2 | Built on decades of web and print conventions, not on this year's trends. |
| Quiet ↔ Bold | 2 | Not loud; one bold moment (the hero) on a quiet page. |
| Expert ↔ Approachable | 2 | Written for people who build, but legible to anyone. |
| Editorial ↔ Productive | 4 | It is a tool and its docs; editorial care shows in the type, not the layout. |
| Refined ↔ Raw | 1 | Crafted: every state and detail finished. |

---

# Voice and language

## 6. Voice

### Our voice is

- [Trait]
- [Trait]
- [Trait]

### Our voice is not

- [Trait]
- [Trait]
- [Trait]

---

## 7. Tone by context

### Product UI
- [Trait]
- [Trait]

### Onboarding
- [Trait]
- [Trait]

### Errors
- [Trait]
- [Trait]

### Marketing
- [Trait]
- [Trait]

### Empty states
- [Trait]
- [Trait]

### Sensitive moments
- [Trait]
- [Trait]

---

## 8. Writing rules

- Lead with meaning.
- Prefer plain language over brand theatre.
- Be specific rather than generic.
- Use active voice where possible.
- Avoid filler, buzzwords, and claims the product cannot prove.
- Buttons should describe the action.
- Headlines should carry an idea, not just decorate the page.
- Microcopy should reduce uncertainty.

### Prefer

- [Good example]
- [Good example]

### Avoid

- [Weak example]
- [Weak example]

---

# Visual identity

## 9. Visual direction

### The product should feel

- Calm: one bold moment per page, everything else at rest
- Precise: one left edge, spacing from the scale, nothing approximate
- Considered: a typeface and an accent chosen on purpose, every state finished

### The product should avoid feeling

- Generic: the system font and five greys
- Busy: competing buttons, decoration, motion nobody asked for
- Cold: cool does not mean clinical; tinted neutrals, not dead grey

### Visual keywords

- Cool tinted neutrals (a hint of the accent's hue, as on Astryx and Material)
- One accent with one job
- A typeface of its own, with a clear scale
- Generous space on a strict grid
- Surfaces that frame, components that stay `base`

---

## 10. Logo

### Role

[How the logo should function in the system.]

### Variants

- primary logo
- compact logo
- symbol / mark
- monochrome version
- reversed version
- app icon / favicon

### Rules

- Preserve approved proportions.
- Use approved colour versions only.
- Do not distort, outline, shadow, animate, or decorate the logo unless explicitly defined.
- Use the simplest valid version for the context.

---

## 11. Typography

### Type roles

- display / headline: [Typeface]
- body: [Typeface]
- interface: [Typeface]
- mono, if relevant: [Typeface]

### Typographic character

[Describe how the type system should feel.]

### Rules

- Use type to create hierarchy before adding decoration.
- Keep the number of styles deliberate and limited.
- Let typography carry some of the brand character.
- Preserve readability in product contexts.

---

## 12. Colour

### Colour roles

- brand primary: [ ]
- brand secondary: [ ]
- accent: [ ]
- neutral scale: [ ]
- semantic colours: [ ]
- background / surface colours: [ ]

### Colour personality

[Describe how colour should feel.]

### Rules

- Use colour with intent.
- Let neutrals carry most of the interface if the brand benefits from restraint.
- Reserve accent colour for action, emphasis, or memorable moments.
- Maintain accessibility and semantic consistency.

---

## 13. Shape and material

### Shape

[Describe the physical language: sharp, rounded, geometric, organic, etc.]

### Material feeling

[Describe the surface language: flat, layered, tactile, crisp, atmospheric, etc.]

### Rules

- Radius, border, depth, and surface treatment should reinforce the brand personality.
- Similar components should share a similar physical language.
- Decorative form should not undermine usability.

---

## 14. Imagery

### Direction

- [Quality]
- [Quality]
- [Quality]

### Rules

- Use imagery only when it adds meaning, emotion, or recognition.
- Choose a consistent treatment across the product and communications.
- Avoid generic stock imagery.
- Keep crops, lighting, colour treatment, and composition aligned with the brand character.

---

## 15. Iconography

### Direction

[Describe whether icons should feel geometric, rounded, outlined, filled, technical, friendly, etc.]

### Rules

- Use one coherent icon style.
- Match stroke weight and visual density across the set.
- Prefer common symbols when clarity matters.
- Icons should support meaning, not carry ambiguous interactions alone.

---

## 16. Motion identity

### Motion should feel

- [Quality]
- [Quality]
- [Quality]

### Rules

- Motion should support the product before expressing the brand.
- Use consistent easing, duration, and scale.
- Let key transitions carry personality.
- Avoid ornamental motion that slows people down.
- Respect reduced-motion preferences.

---

# Brand in use

## 17. Brand expression by context

### Product interface

The brand should appear through:

- typography
- spacing
- colour restraint
- motion behaviour
- copy
- component details

### Marketing site

The brand may become more expressive through:

- larger typography
- richer imagery
- bolder composition
- narrative copy
- more atmospheric motion

### Social content

The brand should remain recognisable through:

- consistent voice
- repeatable layouts
- colour and type signatures
- a clear point of view

### Documentation

Documentation should feel:

- practical
- clear
- structured
- aligned with the product voice

---

## 18. Brand decision checklist

Before introducing a new visual or verbal direction, ask:

- Does this support the product’s purpose?
- Does it feel like the same brand?
- Does it improve clarity or recognition?
- Is it accessible?
- Is it durable, or just fashionable?
- Can it scale across product and communication?
- Does it add something meaningful, or only more?

---

# Final review checklist

- Is the brand essence clear?
- Are the core attributes specific enough to guide decisions?
- Is the audience relationship defined?
- Is the voice distinct and usable?
- Are visual choices connected to personality, not arbitrary taste?
- Are typography, colour, imagery, shape, and motion aligned?
- Are there clear boundaries around what the brand is not?
- Can the brand appear consistently across product, marketing, and content?
- Does the brand strengthen the product rather than sit on top of it?
- Could another designer or writer extend the brand without guessing its core character?
