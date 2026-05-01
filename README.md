# Jacob Alley — Portfolio

Built with Next.js. Deployed on Vercel.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Editing Content

All copy, project data, and metadata lives in one file:

```
content.js
```

Edit here. Changes propagate everywhere automatically.

---

## Adding Your Fonts

Place your licensed font files in `/public/fonts/`:

```
/public/fonts/
  Canela-Thin.woff2         ← Commercial Type
  Sohne-Buch.woff2          ← Klim Type Foundry
  Sohne-Halbfett.woff2      ← Klim Type Foundry
  FreightTextPro-Book.woff2 ← Adobe Fonts / GarageFonts
```

Font faces are declared in `styles/globals.css`. Until real fonts are loaded,
system fallbacks (Georgia, Helvetica Neue) are used.

---

## Adding Your Signature

1. Re-upload your signature SVG
2. Open `components/Hero.js`
3. Replace the placeholder `<path>` inside the `<Signature>` component
   with your actual SVG path data

---

## Adding Images

Place images in `/public/images/`. Reference them in `content.js`:

```js
heroImage: '/images/ab-hero.jpg',
```

Placeholder boxes with labels indicate exactly where each image goes.

---

## Deploying to Vercel

1. Push to GitHub
2. Import repo at vercel.com
3. Vercel auto-detects Next.js — no config needed
4. Deploy

---

## Project Structure

```
/components       — One file per section, fully reusable
  Nav.js
  Hero.js
  CaseStudyCards.js
  Credibility.js
  Experiments.js
  HotTakes.js
  About.js
  Contact.js
  Footer.js
  AnnotationRail.js   — Cartographic annotation system
  OutcomeNumbers.js   — Count-up animation for metrics
  BeforeAfter.js      — Before/after comparison table

/pages
  index.js            — Homepage
  /case-studies
    [slug].js         — Dynamic case study template

/styles
  globals.css         — Design tokens, typography, animations

content.js            — All copy and data (edit here)
```

---

## Design System Tokens

All tokens are CSS variables in `styles/globals.css`:

```css
--color-paper      #F6F3EE   Base background
--color-ink        #1E1E1E   Primary text
--color-steel      #6B7A8D   Secondary text / labels
--color-hairline   #C8C4BC   Rules / borders
--color-red        #9B2335   Accent — one per viewport
--color-hero-dark  #1E2A35   Hero section background

--font-display     Canela Display (Thin)
--font-struct      Söhne (Regular + Medium)
--font-body        Freight Text Pro (Book)
--font-mono        IBM Plex Mono
```

---

## Enabling IQVIA Case Study

In `content.js`, find the IQVIA entry and set:

```js
available: true,
comingSoon: false,
```

Then add your sections and assets following the same pattern as AB and Fox Weather.
