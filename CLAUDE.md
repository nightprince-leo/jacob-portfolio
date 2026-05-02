# Jacob Alley Portfolio — Project Context
# Read this before touching any file.

## What this is
A Next.js portfolio site for Jacob Alley, Senior Product Designer.
Deployed on Vercel. Edited in Cursor/VS Code. Pushed via GitHub.

## The one rule before anything else
Read this entire file before making any change.
If a request conflicts with anything in here — flag it, don't just comply.

---

## Content lives in one place

**`content.js` is the single source of truth.**
All copy, project data, outcomes, case study sections, and metadata live here.
Never hardcode content into components. Always reference content.js.

---

## Design System — Frontier Survey

### Concept
The visual language of early cartography and survey work.
Precise structure, careful annotation, one deliberate break per section.
Designer-engineer tension: cold grotesque structure + warm serif body.

### The cardinal rules
1. **Survey Red (#9B2335) appears ONCE per viewport.** If two red elements are visible simultaneously, one is wrong.
2. **Canela Display appears twice on the entire site:** H1 hero headline and blockquotes. Nowhere else.
3. **Every section has one break element.** Not two. Not zero.
4. **Base-8 spacing throughout.** No exceptions. All spacing in multiples of 8px.
5. **2px border-radius on everything.** Not 0, not 4, not 8. Always 2px.
6. **Max width 1200px.** Generous margin on large screens. Never fight it.
7. **No pure black.** Deepest tone is #1E1E1E (Ink Dark).

### Color tokens (defined in styles/globals.css)
```
--color-paper:      #F6F3EE   Warm off-white base (ALL pages except hero)
--color-ink:        #1E1E1E   Primary text — NOT pure black
--color-steel:      #6B7A8D   Secondary text, labels, metadata
--color-hairline:   #C8C4BC   Rules, borders, dividers (0.5px)
--color-red:        #9B2335   Accent — ONCE PER VIEWPORT only
--color-hero-dark:  #1E2A35   Hero section background only
```

### Typography (defined in styles/globals.css)
```
--font-display:  Canela (Thin/100) — H1 hero + blockquotes ONLY
--font-struct:   Söhne (400 + 500) — H2–H6, nav, labels, captions
--font-body:     Freight Text Pro (Book/400) — all body copy
--font-mono:     IBM Plex Mono — labels, annotations, captions, code
```

Font files go in `/public/fonts/` as .woff2.
Until fonts are loaded, system fallbacks are used (Georgia, Helvetica Neue).
Do NOT change the font-family declarations without checking with Jacob.

### Layout
- 9-column asymmetric grid
- Content band: ~77% width (7 of 9 columns)
- Annotation rail: ~23% width (2 of 9 columns) — SPARSE, never crowded
- Max width: 1200px centered
- Section spacing: 160px (var(--space-20)) between major sections

### Annotation system
- Labels: IBM Plex Mono, 11px, 0.08em tracking, --color-steel
- Leader lines: 0.5px hairlines in --color-hairline, transform-origin left
- Annotation marks: +  ○  ⌐  in --color-red
- Max 2 annotation marks per case study section
- Labels always horizontal, always left-aligned in rail

### The break element
One organic or unexpected element per section that interrupts the grid.
On the hero: could be Canela letterform at large scale as background, 
or the illustration ghosted at low opacity.
NOT a diagonal line — that reads cheap.
Each section's break should feel deliberate, not decorative.

---

## Component architecture

```
components/
  Nav.js + Nav.module.css           Sticky nav — name left, contact right
  Hero.js + Hero.module.css         Dark hero, word reveal animation, signature SVG
  CaseStudyCards.js + .css          Homepage case study grid
  Credibility.js + .css             Single italic line of past clients
  Experiments.js + .css             Current + past projects (placeholder content)
  HotTakes.js + .css                3 opinion cards (placeholder content)
  About.js + .css                   About section with LinkedIn aside
  Contact.js + .css                 Contact moment before footer
  Footer.js + .css                  Minimal footer
  AnnotationRail.js + .css          Reusable cartographic annotation component
  OutcomeNumbers.js + .css          Count-up animation for case study metrics
  BeforeAfter.js + .css             Before/after comparison table

pages/
  index.js                          Homepage — assembles all components in order
  case-studies/[slug].js            Dynamic case study template
  case-studies/CaseStudy.module.css Case study page styles
```

### Component order on homepage (do not reorder without reason)
1. Nav
2. Hero
3. CaseStudyCards
4. Credibility
5. Experiments
6. HotTakes
7. About
8. Contact
9. Footer

---

## Case studies

### Currently active
- **Anheuser-Busch (M360)** — slug: `anheuser-busch` — available: true
- **Fox Weather** — slug: `fox-weather` — available: true

### Hidden (data exists, not shown)
- **IQVIA** — available: false — DO NOT show until Jacob sets available: true
- To enable: in content.js set `available: true` on the IQVIA entry

### Filtering
In CaseStudyCards.js, only render case studies where `cs.available === true`.
The IQVIA data stays in content.js as a placeholder. Never delete it.

---

## Animations

### What exists
- **Word reveal** (Hero): each word fades up with staggered delay on load
- **Signature draw**: SVG stroke-dashoffset animation, fires 1.2s after load
- **Fade up**: scroll-triggered, .fade-up class + IntersectionObserver
- **Leader line draw**: annotation rail lines draw left-to-right on scroll
- **Count up**: outcome numbers count from 0 on scroll into view
- **Contact underline**: Survey Red underline draws left-to-right on hover

### Rules
- Subtle only. Nothing that calls attention to itself.
- No bounce, no spring, no parallax.
- Timing: 0.6–0.8s max for reveals. Count-up: 1.2s.
- Easing: cubic-bezier(0.16, 1, 0.3, 1) throughout (var(--ease-out))

### Do NOT add
- Scroll-triggered parallax
- Entrance animations on the nav
- Looping animations of any kind
- Hover animations beyond subtle color/position shifts

---

## Signature SVG

Located in: `components/Hero.js` inside the `<Signature>` component.
Currently a placeholder path. Jacob will provide the actual SVG path data.
When replacing: keep the viewBox="0 0 200 60", keep the stroke animation logic,
just replace the `<path d="...">` data.
Stroke color: var(--color-steel) at 0.6 opacity.

---

## Images

All images go in `/public/images/`.
Reference them in content.js as `/images/filename.jpg`.
Every placeholder in the code has a label describing exactly what goes there.
Do NOT remove placeholder components — just replace the placeholder div
with an `<img>` tag when the real asset is available.

Image treatment rules:
- No device mockups (no phone frames, no browser chrome)
- Screens shown flat, no angle
- No drop shadows on images
- 2px border-radius on image containers

---

## Fonts

Font files go in `/public/fonts/` as .woff2 files.
Expected filenames (must match exactly):
```
Canela-Thin.woff2
Sohne-Buch.woff2
Sohne-Halbfett.woff2
FreightTextPro-Book.woff2
```
Font faces are already declared in styles/globals.css.
Drop files in, they load automatically. No code changes needed.

---

## Deployment

- Host: Vercel
- Repo: GitHub (jacoballey21's account)
- Auto-deploys on push to main branch
- Custom domain: TBD (jacoballey.com or jacoballey.design)

To deploy: `git add . && git commit -m "message" && git push`
Vercel redeploys automatically in ~30 seconds.

---

## What NOT to do

- Do not add new npm packages without checking with Jacob
- Do not change the color tokens without explicit instruction
- Do not use Inter, Roboto, or any Google Font as a primary typeface
- Do not add gradients, drop shadows, or blur effects anywhere
- Do not use border-radius above 2px on any container
- Do not add Survey Red (#9B2335) to more than one element per viewport
- Do not reorder homepage sections without reason
- Do not hardcode copy into components — use content.js
- Do not remove the IQVIA entry from content.js
- Do not use pure black (#000000) anywhere
- Do not add animations beyond what is listed above without asking

---

## Jacob's preferences and working style

- Prefers concise, direct communication
- Will handle fine detail tweaks himself — focus on structural changes
- Base-8 spacing is non-negotiable
- Wants the site to feel calm, confident, and structured
- Target audience: STEM founders, small technical teams, high-ownership roles
- The portfolio should answer: "Why should I trust this person with complex, high-stakes product work?"

---

## Quick reference — most edited files

| Task | File |
|------|------|
| Change any copy | content.js |
| Add/remove a case study | content.js → CASE_STUDIES array |
| Change colors | styles/globals.css → :root |
| Change fonts | styles/globals.css → @font-face |
| Change homepage section order | pages/index.js |
| Add a new homepage section | Create component → import in pages/index.js |
| Change case study layout | pages/case-studies/[slug].js |
| Change annotation rail | components/AnnotationRail.js |
| Change outcome animations | components/OutcomeNumbers.js |
