# SEO Implementation Checklist

Check items off in this order — later items depend on earlier ones.

## Phase 0 — Blockers (do before anything else drives traffic)
- [ ] Fix the SSL certificate mismatch on `ridhvickuniforms.com` (see `README.md` Finding #2) — currently serves a cert for `host9.cloudindianserver.com`
- [ ] Deploy the actual site build to replace the current placeholder page ("webserver is functioning normally") at the live domain
- [ ] Verify domain ownership in Google Search Console and Bing Webmaster Tools

## Phase 1 — Ship what works today, zero new pages required
- [ ] Confirm `index.html` has the real title/meta description/OG/Twitter tags (already done in an earlier session — verify it survived any subsequent edits)
- [ ] Add `organization.json` + `website.json` JSON-LD to `index.html` `<head>` (site-wide, one time)
- [ ] Add `webpage.json` + `faq.json` JSON-LD to `index.html` `<head>` (homepage-specific)
- [ ] Deploy `robots.txt`, `sitemap.xml`, `image-sitemap.xml` to the site root (`public/`)
- [ ] Deploy `manifest.json`, `browserconfig.xml`, `humans.txt`, `security.txt` (the last one also to `/.well-known/security.txt`)
- [ ] Copy `images/icons/*.png` into `public/images/icons/` and confirm `manifest.json`'s icon paths resolve
- [ ] Submit `sitemap.xml` (not `sitemap-recommended.xml`) to Google Search Console
- [ ] Set up Google Business Profile using `social/social-preview.md`

## Phase 2 — Performance (see `technical/performance-report.md` for full detail)
- [ ] Compress/resize/convert all 28 images in `public/images/` to WebP (53.8MB → target ~4-5MB) — use `images/alt-tags.xlsx` column C for the new filenames
- [ ] Self-host product images instead of `lh3.googleusercontent.com` links (`src/data/uniforms.ts`, `src/data/catalogPages.ts`)
- [ ] Fix render-blocking font `@import` in `src/index.css` → `<link rel="preconnect">` in `index.html` (see `technical/html-head.html`)
- [ ] Code-split `AiChatAssistant`, `QuickViewModal`, `CartDrawer` with `React.lazy()`
- [ ] Re-run PageSpeed Insights against the live URL and compare against `technical/core-web-vitals.md`'s predictions

## Phase 3 — The real fix: build the 9-page architecture
See `README.md` Finding #1 and `content-plan.md` §1 before starting this
phase — this is the single highest-leverage item in the whole package.
- [ ] Add a router (React Router, or split into separate static HTML entry points via Vite's multi-page build)
- [ ] Build `/school-uniforms/primary-school` using `metadata/catalog-primary-school.md`
- [ ] Build `/school-uniforms/high-school-woven` using `metadata/catalog-high-school-woven.md`
- [ ] Build `/sports-uniforms` using `metadata/catalog-sports-wear.md`
- [ ] Build `/uniform-accessories` using `metadata/catalog-accessories.md`
- [ ] Build `/digital-catalog` as its own route using `metadata/digital-catalog.md`
- [ ] Build `/manufacturing-services` as its own route using `metadata/services.md`
- [ ] Build `/about` using `metadata/about.md` — **get real content from the business first** (founding story, capacity/MOQ figures, QC standard — all flagged as open items in that file)
- [ ] Build `/contact` as its own route using `metadata/contact.md`
- [ ] Add `breadcrumb.json`-pattern schema to every page except homepage
- [ ] Add `product.json`-pattern schema to each category page (extend beyond the 4 example products to the full `UNIFORM_PRODUCTS` array)
- [ ] Add `service.json` schema to the Manufacturing page
- [ ] Add `localbusiness.json` schema to the Contact page
- [ ] Swap `sitemap.xml` for the contents of `sitemap-recommended.xml` — only after every URL in it actually returns 200
- [ ] Move `image-sitemap.xml` image blocks to the `<url>` of the page each image actually appears on

## Phase 4 — Content completion
- [ ] Fill in the real founding story on `/about` (see flagged gap in `metadata/about.md`)
- [ ] Publish a real stated QC/inspection standard on `/manufacturing-services` (flagged gap in `metadata/services.md`)
- [ ] Publish real MOQ and lead-time figures (referenced across multiple pages as a competitive differentiator — see `keyword-strategy.md` §4)
- [ ] Confirm business hours and add `openingHoursSpecification` to `localbusiness.json`
- [ ] Get real lat/long for both offices from Google Maps and add `geo` to `localbusiness.json`
- [ ] Fill in `schema/person.json` with a real name/title once the business decides who (if anyone) to name publicly
- [ ] Verify the "ISO 9001 Standard Fabric" claim in the Footer — is it a certification claim or a fabric-quality description? Word it accordingly (see `keyword-strategy.md` §2, Homepage content gap note)

## Phase 5 — Ongoing (post-launch)
- [ ] Set up a blog and publish Cluster A/B/C posts per `content-plan.md` §3–§6
- [ ] Populate `schema/review-aggregate-rating.json` **only** once real customer reviews exist — never before
- [ ] Re-validate keyword volume/difficulty in `keyword-strategy.md` against real Search Console query data at the 90-day mark
- [ ] Re-run this whole audit (or at minimum the PageSpeed/Search Console health checks) quarterly
