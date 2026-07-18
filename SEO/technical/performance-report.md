# Performance Report

Findings below are from static analysis of the actual production build
(`npm run build` output, `dist/`) and source code — not a Lighthouse run
(no browser automation available in this environment). Every number here is
measured from real files, not estimated. Run Lighthouse or PageSpeed
Insights against the live URL once deployed to get field/lab scores on top
of this; this report tells you *what to fix*, PageSpeed tells you *the
score after you fix it*.

## 1. Images — the dominant issue (see `images/image-seo.md` for full detail)

**53.8MB across 28 PNG files**, none resized or compressed, several loaded
directly into the homepage hero carousel. This alone will cap Largest
Contentful Paint (LCP) regardless of any other optimization on this list.
**Fix this first** — every other item below is secondary in impact.

## 2. Font loading — render-blocking, 3-hop chain

`src/index.css` line 1:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap');
```

A CSS `@import` for an external stylesheet is render-blocking and creates a
sequential chain: browser downloads `index.css` → parses it → discovers the
`@import` → requests `fonts.googleapis.com` → that response references
`fonts.gstatic.com` → browser requests the actual font file. That's three
sequential network round-trips before Inter/Montserrat can render, on the
critical rendering path.

**Fix:** move font loading into `index.html`'s `<head>` as `<link>` tags
with `preconnect`, which lets the browser start the connection to Google
Fonts' servers in parallel with everything else instead of discovering it
late:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" />
```
and delete the `@import` line from `index.css`. `font-display: swap` is
already correctly set in the URL — that part doesn't need to change.

Better still, for a site this size: self-host the two font files (only 5
weights total needed) via `@fontsource/inter` and `@fontsource/montserrat`
npm packages, eliminating the third-party request entirely. Recommended as
a Phase 2 optimization, not blocking launch.

## 3. JavaScript bundle — single chunk, 456KB (138.5KB gzipped)

```
dist/assets/index-CAt4CfaJ.js   456.02 kB │ gzip: 138.54 kB
```

Everything ships as one chunk — `motion` (animation), `lucide-react`
(icons), `lenis` (smooth scroll), and all page components load before first
paint, even though several are not needed until a user interacts:

- `AiChatAssistant` — a modal that's closed by default; only needed after
  the user clicks the floating chat button.
- `QuickViewModal` — only needed after a user clicks "Quick View" on a
  product.
- `CartDrawer` — only needed after a user opens the cart.

**Fix:** wrap these three in `React.lazy()` + `<Suspense>` in `App.tsx`.
This is a genuinely small code change with real payoff — these three
components (plus `motion`'s `AnimatePresence` usage inside them) are a
meaningful fraction of that 456KB and are currently blocking initial
interactivity for zero first-paint benefit.

138.5KB gzipped for initial JS is not alarming on its own, but it's paying
for functionality most first-time visitors won't use in their first few
seconds on the page.

## 4. No `preconnect`/`dns-prefetch` for third-party origins

`index.html` has zero `<link rel="preconnect">` or `dns-prefetch` hints.
Beyond the font-loading fix above, two more origins are used at runtime and
would benefit:
- `lh3.googleusercontent.com` — every current product image in
  `src/data/uniforms.ts` and `src/data/catalogPages.ts` is hosted here (see
  Finding #5 below — this is itself a bigger issue than just preconnect).

## 5. Product images are hosted on `googleusercontent.com`, not your own domain

Every product photo referenced in `UNIFORM_PRODUCTS` and `CATALOG_TOPICS`
(`src/data/uniforms.ts`, `src/data/catalogPages.ts`) is a
`lh3.googleusercontent.com` URL — a Google-hosted preview link generated
during the AI Studio build process, not a real asset under your control.

This matters for three separate reasons, not just performance:
1. **No caching/CDN control** — you can't set cache headers, can't
   guarantee the URL stays live long-term, and it's outside the `.htaccess`
   caching rules already configured in `public/.htaccess`.
2. **No SEO control** — Google Image Search attributes and indexes images
   by their hosting domain; these will not be attributed to
   `ridhvickuniforms.com`, weakening the image-search opportunity documented
   in `image-sitemap.xml`.
3. **Reliability risk** — these are not guaranteed-stable production URLs;
   if Google Studio's preview link expires or changes, every product photo
   on the site breaks simultaneously.

**Fix:** download and self-host every product image under
`public/images/products/`, same treatment (WebP, resized, compressed) as
the marketing images in `images/image-seo.md`, and update the `image` field
in `uniforms.ts` / `catalogPages.ts` to root-relative paths. This is real
production-readiness work, not just an SEO nicety — flagging it here because
it was found during this audit, even though it's outside a narrow SEO scope.

## 6. CSS — no action needed

```
dist/assets/index-BtMSDWHg.css   54.54 kB │ gzip: 9.63 kB
```
9.6KB gzipped is small; Tailwind's JIT compiler already ships only the
utility classes actually used in the codebase. No critical-CSS extraction
is necessary at this size — that technique earns its complexity cost at
several hundred KB of CSS, not ~10KB.

## 7. Caching & compression — already correctly configured

`public/.htaccess` (deployed from the earlier cPanel packaging work)
already sets:
- 1-year immutable cache on hashed JS/CSS/font files
- 1-month cache on images
- `no-cache` on `index.html` so deploys go live immediately
- gzip via `mod_deflate`

No changes needed here — cite this file directly in `nginx.conf` below for
parity if you ever move off Apache/cPanel.

## Priority order

1. Compress/resize/convert all 28 images to WebP (biggest LCP win)
2. Self-host product images instead of `googleusercontent.com` (SEO +
   reliability, not just speed)
3. Fix font loading (`@import` → `<link preconnect>`)
4. Code-split `AiChatAssistant`, `QuickViewModal`, `CartDrawer` via
   `React.lazy()`
5. (Phase 2) Self-host fonts entirely via `@fontsource`
