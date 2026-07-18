# Implementation Guide

Step-by-step, code-level instructions for wiring this package into the real
project (`Ridhvickunifroms-main/`). Follows the same phase numbering as
`checklist.md`; this file is the "how," that file is the "what/when."

## Phase 1 — Homepage (applied directly to the live codebase as part of this engagement)

### 1. `index.html` — meta tags
Already correct from an earlier session (title, description, OG, Twitter,
favicon, canonical). No change needed unless it's regressed — diff against
`technical/html-head.html`'s non-schema `<meta>`/`<link>` tags to confirm.

### 2. `index.html` — add JSON-LD
Insert these four `<script type="application/ld+json">` blocks into
`index.html`'s `<head>`, using the exact contents of:
- `schema/organization.json`
- `schema/website.json`
- `schema/webpage.json`
- `schema/faq.json`

`technical/html-head.html` has these already inlined in the correct order —
copy the four `<script>` blocks from there directly.

### 3. `public/robots.txt` and `public/sitemap.xml`
Replace the existing (minimal, already-live) versions with
`SEO/robots.txt` and `SEO/sitemap.xml` — functionally near-identical, the
package versions have the AI-crawler commentary and image-sitemap
reference added. Also add `SEO/image-sitemap.xml` to `public/`.

### 4. Icons
```bash
mkdir -p public/images/icons
cp SEO/images/icons/*.png public/images/icons/
cp SEO/manifest.json public/manifest.json
cp SEO/browserconfig.xml public/browserconfig.xml
cp SEO/humans.txt public/humans.txt
mkdir -p public/.well-known
cp SEO/security.txt public/.well-known/security.txt
```
Then add to `index.html` `<head>`:
```html
<link rel="manifest" href="/manifest.json" />
<meta name="msapplication-config" content="/browserconfig.xml" />
```

### 5. Verify
```bash
npm run build
npx serve dist
```
Open `http://localhost:3000/` and:
- View source, confirm all 4 JSON-LD blocks are present and valid (paste
  each into https://search.google.com/test/rich-results to check)
- Confirm `/robots.txt`, `/sitemap.xml`, `/image-sitemap.xml`,
  `/manifest.json` all return 200
- Confirm `/images/icons/icon-512.png` loads

## Phase 2 — Performance

### Image compression (see `technical/performance-report.md` for the full
rationale)
```bash
brew install webp   # macOS; apt-get install webp on Linux
cd public/images
for f in *.png; do
  cwebp -q 82 -resize 1600 0 "$f" -o "${f%.png}.webp"
done
```
Then, using the rename mapping in `images/alt-tags.xlsx` column C:
1. Rename each new `.webp` file to its recommended filename
2. Update every `src=`/image-path reference in `Hero.tsx`,
   `DailySportsShowcase.tsx`, and `App.tsx`'s `COLLECTION_IMAGES` array
3. Delete the old `.png` originals once confirmed working
4. Keep one JPG export of `ridhvick_uniforms_hero_kids.png` at 1200×630 for
   the `og:image` tag specifically (see `images/image-seo.md` point 4)

### Font loading fix
In `index.html`, replace nothing (there's currently no font `<link>` tag
there) — **add**:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" />
```
In `src/index.css`, **delete** line 1:
```diff
- @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap');
```

### Code splitting
In `src/App.tsx`:
```diff
- import AiChatAssistant from './components/AiChatAssistant';
- import CartDrawer from './components/CartDrawer';
- import QuickViewModal from './components/QuickViewModal';
+ import { lazy, Suspense } from 'react';
+ const AiChatAssistant = lazy(() => import('./components/AiChatAssistant'));
+ const CartDrawer = lazy(() => import('./components/CartDrawer'));
+ const QuickViewModal = lazy(() => import('./components/QuickViewModal'));
```
Wrap each usage in the JSX with `<Suspense fallback={null}>...</Suspense>`.
Since all three are already conditionally rendered behind `isOpen` /
`selectedProductForModal` state, wrapping them costs nothing on first paint
and removes them from the initial bundle.

## Phase 3 — Multi-page migration

This is a real architecture change, not a copy-paste task — treat it as its
own project, not a checklist item to rush. High-level shape:

1. **Add `react-router-dom`** (`npm install react-router-dom`).
2. **Split `App.tsx`'s single JSX tree into route components** — each of
   the 9 `<section id="...">` blocks in the current `App.tsx` becomes its
   own page component at its own route, using the content already drafted
   in the matching `metadata/*.md` file.
3. **Wire `SEO` component** — use `technical/react-head.jsx` (rename to
   `.tsx`, add types) as the per-page `<title>`/meta/schema injector; call
   it once per route component with that page's real title, description,
   canonical URL, and schema array from `schema/*.json`.
4. **Keep the nav working** — `Header.tsx`'s `onNavigate` currently does
   `scrollIntoView` for anchor IDs; once these become real routes, some nav
   items become `<Link to="/school-uniforms/primary-school">` instead.
   The `daily-sports`/`digital-catalog`/`catalog`/`manufacturing`/`contact`
   anchor IDs inside the *homepage* can stay as in-page anchors if you keep
   a condensed version of each section on the homepage as a teaser linking
   to the full page — that's a product decision, not purely technical;
   flagging it rather than deciding it for you.
5. **Swap sitemaps**: once every route in `sitemap-recommended.xml`
   actually returns 200, replace `public/sitemap.xml`'s contents with it.
6. **Move image sitemap entries** to the `<url>` block of the page each
   image now actually lives on, per the comment at the top of
   `image-sitemap.xml`.
7. **Duplicate the JSON-LD pattern** from `technical/html-head.html`
   (WebPage + Breadcrumb + Product/Service/FAQ as applicable) into each new
   route's `<SEO>` call, using that page's `metadata/*.md` file as the
   content source.

## Verifying everything after each phase

- **Rich Results Test** (search.google.com/test/rich-results) — paste each
  page's rendered HTML or live URL, confirm all schema types validate with
  zero errors
- **PageSpeed Insights** (pagespeed.web.dev) — run against the live URL
  after Phase 2, compare against the directional estimates in
  `technical/core-web-vitals.md`
- **Search Console** — after Phase 3, use the URL Inspection tool on each
  new page to request indexing, and watch the Coverage report for crawl
  errors over the following 2 weeks
