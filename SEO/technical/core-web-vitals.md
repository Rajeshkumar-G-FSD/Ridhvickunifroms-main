# Core Web Vitals — Site-Specific Analysis

Grounded in the actual component code, not generic advice. Each metric
below identifies the real element/code path responsible on this site.

## Largest Contentful Paint (LCP)

**LCP element on the homepage is almost certainly the first hero image**
in `src/components/Hero.tsx`:

```tsx
<img
  src={src}
  alt=""
  className={`w-full h-full object-cover ...`}
  loading={index === 0 ? 'eager' : 'lazy'}
/>
```

The section is `h-[78vh] sm:h-[85vh] md:h-screen` — full-viewport-height —
so this image occupies the largest on-screen area at first paint on every
device size, which is exactly what LCP measures. It correctly uses
`loading="eager"` for the first slide (good — don't lazy-load your LCP
image), but the source file itself is a 1.8–2.4MB uncompressed PNG (see
`technical/performance-report.md` Finding #1). Fixing image compression is
the single highest-leverage LCP fix available.

**Secondary LCP risk:** `alt=""` on every hero image (`Hero.tsx` line ~40)
is actually intentional here — these are decorative background slides with
no independent informational content (the section doesn't have overlaid
text), so empty alt is correct per WCAG, not a bug. Don't "fix" this by
adding generic alt text; it would make screen readers announce a
meaningless string on every carousel transition. (Contrast with
`DailySportsShowcase.tsx`, whose images correctly do carry real alt text
since the source array defines a real `alt` field per image and the section
has no separate accessible heading covering that content.)

**Target:** under 2.5s on 4G mobile. Current image weight makes this
unlikely to pass; re-measure with PageSpeed Insights after the WebP
conversion in `images/image-seo.md`.

## Interaction to Next Paint (INP)

**Primary INP risk: `ScrollStack.tsx`'s per-frame scroll handler.**
`updateCardTransforms()` iterates over every stacked card on every Lenis
scroll frame:

```tsx
cardsRef.current.forEach((card, i) => {
  // ...distance/scale/rotation math per card, every frame
});
```

This runs via `requestAnimationFrame` (correct pattern — not a scroll-event
listener directly, which would be worse), and only mutates `transform` and
`filter` (compositor-friendly properties, not layout-triggering ones — also
correct). The code already includes a `hasChanged` check to skip DOM writes
when a transform hasn't meaningfully changed, which is good defensive
practice. Risk is specifically on lower-end Android devices during fast
flick-scrolling through the "Our Collections Catalog" section — the section
that mounts `ScrollStack` in `App.tsx`. If field data (Search
Console/CrUX, once live) shows INP issues concentrated on that section,
the next lever is reducing `itemDistance`/increasing `itemStackDistance` to
shorten the scroll range the calculation runs over, not rewriting the
approach.

**No other significant INP risk identified.** Modal opens (`CartDrawer`,
`QuickViewModal`, `AiChatAssistant`) use `motion`/`AnimatePresence` with
GPU-friendly transform/opacity animations, not layout-thrashing patterns.

## Cumulative Layout Shift (CLS)

**Current risk is low — this is a genuine strength of the existing code,**
worth confirming rather than assuming a problem exists:

- Every image container across `ProductCard.tsx`, `QuickViewModal.tsx`,
  `CartDrawer.tsx`, and the hero sections uses a fixed-dimension or
  aspect-ratio Tailwind class (`h-36 sm:h-52 md:h-64`, `aspect-[4/5]`,
  `aspect-video`, `h-screen`) on the *container*, independent of the
  image's intrinsic size. This means the layout doesn't shift when an image
  finishes loading — the space is already reserved. No action needed here.
- `ScrollStack`'s margin/transform mutations happen in `useLayoutEffect`
  (before paint), not `useEffect` — correct choice, avoids a visible jump.

**One real, specific CLS risk: web font swap.**
`index.css` loads Inter and Montserrat with `display=swap`, which is
correct for avoiding invisible-text (FOIT) but does mean the page briefly
renders in a fallback system font before swapping to Montserrat — and
Montserrat's character widths differ enough from `ui-sans-serif`/system-ui
fallbacks that headline text (set in `font-black`/`font-extrabold` at large
sizes throughout `App.tsx` and `Header.tsx`) can visibly reflow when the
swap happens. This is a real, measurable CLS contributor, distinct from the
render-blocking issue already noted in the performance report.

**Fix:** add `size-adjust` font-face descriptors (or use a tool like
Fontaine/Capsize to compute them) so the fallback font is metrically
adjusted to match Montserrat's line-height and character width, minimizing
the visual jump on swap. This is a Phase 2 refinement — the render-blocking
`@import` fix in the performance report is higher priority and partially
mitigates this too (faster font arrival = shorter window where the shift
can visibly happen).

## Summary table

| Metric | Current risk | Root cause identified | Primary fix |
|---|---|---|---|
| LCP | High | 1.8–2.4MB uncompressed hero PNGs | Compress/resize to WebP |
| INP | Low-Medium | Per-frame `ScrollStack` transform math | Monitor field data; tune distance params if needed |
| CLS | Low | Font-swap reflow on headline text | `size-adjust` font-face descriptors (Phase 2) |

Re-run PageSpeed Insights / Search Console's Core Web Vitals report against
the live URL after Priority 1–2 fixes from `performance-report.md` ship —
that's real field data (CrUX) and will supersede this static analysis.
