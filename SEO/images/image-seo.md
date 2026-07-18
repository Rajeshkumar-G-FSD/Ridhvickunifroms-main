# Image SEO — Findings & Guidance

Full per-image alt/title/caption/filename data is in `alt-tags.xlsx`
(28 images, every current file in `public/images/`). This file covers the
cross-cutting findings and rules.

## Headline finding: 53.8MB of uncompressed PNG

Every single image in `public/images/` — all 28 of them — is an
uncompressed PNG between 1.3MB and 2.5MB. Total: **53.8MB**. None are
resized for web delivery, none are in a modern format, and the homepage's
hero carousel alone cycles through 8 of them (the largest single contributor
to Largest Contentful Paint — see `technical/core-web-vitals.md`).

This is the single highest-impact performance fix available on this site.
Everything else in `technical/performance-report.md` matters less than
this one change.

## Filename recommendations

Current filenames are inconsistent (`_` and `__` used interchangeably,
mixed casing conventions, no hyphens, two typos: `girs_sports` and
`unifroms`) and carry zero keyword signal beyond the word "ridhvick." Google
does use filenames as a (minor) ranking signal for Image Search — a
descriptive, hyphenated filename outranks a generic or typo'd one.

**Rule going forward:** `brand-subject-descriptor.ext`, all lowercase,
hyphen-separated, no underscores, no spaces. Example:
`ridhvick_uniforms_hero_girs_sports.png` → `ridhvick-girls-sports-uniform.webp`

Full rename mapping for all 28 current files is in `alt-tags.xlsx` column C.

## Compression plan

1. **Convert PNG → WebP** for all 28 images. These are photographic content
   (not line art / transparency-dependent graphics), so WebP's lossy mode
   is appropriate and typically achieves 25–35% of the original file size
   at visually indistinguishable quality.
2. **Resize before compressing.** None of these images need to ship at
   their current (likely 2000px+) source resolution for a max ~1600px-wide
   hero display. Resize to the actual maximum render width first, then
   compress — compressing an oversized image is wasted work.
3. **Target sizes:**
   - Hero carousel images (8 files): ≤150KB each after WebP conversion
   - Daily/Sports showcase images (12 files): ≤150KB each
   - Collections catalog scroll images (8 files): ≤180KB each (these
     render larger on screen, per `ScrollStack.tsx`)
4. **Keep one JPG fallback** for the image used as `og:image` /
   `twitter:image` (currently `ridhvick_uniforms_hero_kids.png`) — some
   link-preview crawlers (older WhatsApp versions, some corporate Slack
   proxies) still don't render WebP correctly for social cards. A single
   1200×630 JPG at ~150–200KB is enough; the rest of the site can go
   WebP-only.
5. **Consolidate near-duplicates.** Three "kids daily wear" catalog images
   (`kids_daily_waer.png`, `kids_daily_waer_uniform.png`,
   `kids_daily_waer_uniform_.png` — note the trailing underscore on one) are
   visually near-identical based on filename pattern and near-identical file
   size. Confirm whether all three are actually needed; if not, removing two
   saves ~4MB with zero content loss. Flagged, not assumed — verify visually
   before deleting.

## How to run the conversion

No image-optimization tooling is currently wired into the build
(`vite.config.ts` has no image plugin). Two practical options:

**Option A — one-time batch conversion (recommended, do this first):**
```bash
# Requires: brew install webp  (or apt-get install webp on Linux)
cd public/images
for f in *.png; do
  cwebp -q 82 -resize 1600 0 "$f" -o "${f%.png}.webp"
done
```
Then update the `src=` references in `Hero.tsx`, `DailySportsShowcase.tsx`,
and `App.tsx` (`COLLECTION_IMAGES`) from `.png` to `.webp`, and rename per
`alt-tags.xlsx` column C at the same time.

**Option B — automate at build time (better long-term, more setup):**
Add `vite-plugin-image-optimizer` or `vite-imagetools` to `vite.config.ts`
so every future image drop into `public/images/` gets optimized
automatically on `npm run build`, instead of relying on remembering to run
Option A by hand for every new product photo.

## Lazy loading

Already implemented correctly for non-first images:
`Hero.tsx` and `DailySportsShowcase.tsx` both set
`loading={index === 0 ? 'eager' : 'lazy'}` on their carousel images — the
first (LCP) image loads eagerly, the rest lazily. No change needed here;
this is good practice already in place.

**One gap:** the `ScrollStack` collection images in `App.tsx`
(`COLLECTION_IMAGES`) all use `loading="lazy"` unconditionally, which is
correct since none of them are above the fold — confirmed fine, no action
needed.

## Modern format support note

WebP is supported by 100% of the browsers this site's audience realistically
uses in 2026 (all evergreen Chrome/Safari/Firefox/Edge, and Android/iOS
WebViews) — no `<picture>` fallback to older formats is necessary. AVIF
offers marginally better compression but has slower encode times and less
mature tooling; WebP is the right choice for this project's scale.

## Alt text rules applied throughout `alt-tags.xlsx`

- Every alt text describes the actual photographed subject, not just a
  keyword string ("Boys school uniform in durable poly-cotton blend by
  Ridhvick Uniforms," not "school uniform boys buy cheap india").
- No alt text starts with "image of" or "picture of" — screen readers
  already announce it as an image.
- Decorative/background images (none currently identified in this codebase
  — all 28 images are meaningful product/brand content) would get
  `alt=""` rather than a description, per WCAG guidance; flag any future
  purely-decorative image the same way.
- Title attributes are provided as a secondary, optional enhancement
  (shown as a tooltip on hover) — not a substitute for alt text, which is
  what matters for both accessibility and Image Search.
