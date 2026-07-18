# Ridhvick Uniforms — SEO Package

Generated: 18 July 2026
Domain: `https://www.ridhvickuniforms.com/`
Business: Ridhvick Apparels ("Ridhvick Uniforms"), Tirupur, Tamil Nadu, India — est. 2009
Stack: React 19 + Vite 6 + Express (single-page app today; see Finding #1)

This package was built directly from your live codebase (`src/data/uniforms.ts`,
`src/data/catalogPages.ts`, `src/components/Footer.tsx`, `server.ts`, etc.) plus
web research into your real competitor set. Nothing here is a generic template —
every keyword, meta tag, product name, and address is pulled from your actual
site content.

Two things in the request I deliberately did **not** fabricate, and why:

1. **Exact search volumes / Keyword Difficulty scores.** I do not have live
   access to Google Keyword Planner, Ahrefs, or SEMrush from this environment.
   Any assistant that hands you "school uniform manufacturer Tirupur — 720
   searches/mo, KD 34" without a connected tool is making that number up.
   Instead, `keyword-strategy.md` and `keyword-research.xlsx` use **banded
   estimates** (Low / Medium / High, roughly <50, 50–500, 500+ monthly
   searches, India-wide English) based on term specificity, SERP crowding
   observed in search, and category size — clearly labeled as directional
   planning input, not tool output. Before spending budget against these,
   run the finalized list through Google Search Console (once the site has
   traffic), Google Keyword Planner (free with a Google Ads account), or
   Ubersuggest/Ahrefs if you have a license.
2. **Review / AggregateRating schema.** Google's structured data guidelines
   treat fabricated ratings as spam and it can trigger a manual action on
   your *entire* site, not just the page. Your site currently has no visible
   customer reviews, so `schema/review-aggregate-rating.json` is shipped
   **inactive** with real field names but no numbers. Do not publish it until
   you have genuine collected reviews (Google Business Profile reviews,
   a review widget, or testimonials with attribution).

---

## Finding #1 — This is a single-page app. That caps how much on-page SEO can do.

Your current site (`src/App.tsx`) is one HTML document. "Pages" like Catalog,
Manufacturing, and Contact are `<section id="...">` anchors reached via
`scrollIntoView`, not distinct URLs. Google indexes **one URL** — the
homepage — no matter how good the anchor content is. You cannot rank a page
for "school blazer manufacturer Tirupur" if that page doesn't have its own
URL, `<title>`, and meta description.

This package gives you two things to fix that:

- **Today, zero-code-change:** an optimized single homepage (meta, schema,
  robots.txt, sitemap.xml) that is the best possible version of what you have
  now. This is already applied to your live `index.html` / `public/` — see
  `report/implementation-guide.md`.
- **The real fix:** a full recommended URL structure with complete,
  ready-to-paste metadata, H1–H4 outlines, FAQ, and schema for **9 pages**
  that don't exist yet (`metadata/*.md`). Building these as real routes
  (React Router or separate static pages) is the single highest-leverage SEO
  change available to this site — everything else in this package is
  optimization *around* that gap, not a replacement for it.

Recommended URL map (used consistently across this whole package):

| Page | URL |
|---|---|
| Homepage | `/` |
| Primary School Uniforms | `/school-uniforms/primary-school` |
| High School & Woven Uniforms | `/school-uniforms/high-school-woven` |
| Sports Uniforms | `/sports-uniforms` |
| Uniform Accessories | `/uniform-accessories` |
| Digital Catalog | `/digital-catalog` |
| Manufacturing & Custom Embroidery (Services) | `/manufacturing-services` |
| About Us | `/about` |
| Contact & Bulk Quote | `/contact` |
| Blog (recommended, not yet built) | `/blog/*` |

## Finding #2 — SSL / domain check

I attempted to fetch `https://ridhvickuniforms.com/` to benchmark the current
live page. Two things surfaced:

- The TLS certificate served does not match the domain (`cert altname:
  host9.cloudindianserver.com`, not `ridhvickuniforms.com`) — browsers will
  show a security warning to every visitor until this is fixed in cPanel
  (AutoSSL, or reissue the cert for this domain).
- The domain currently resolves to a bare placeholder ("webserver is
  functioning normally") — the new build in `dist/` has not been deployed
  yet. That's good news for SEO: there's no legacy content to de-index or
  redirect, you're launching clean.

Fix the certificate **before** driving any traffic to the new site — a
security warning kills conversion rate and can suppress Search Console
verification.

## Competitors identified

Real, currently-operating Tirupur/Coimbatore school & institutional uniform
manufacturers found via search, used to inform gap analysis in
`keyword-strategy.md`:

- **Banian City** — yourprintwear.in
- **Hitway Impex** — hitwayimpex.com
- **Esplandea Incorporation** — esplandeaincorporation.com
- **Vogue Sourcing** — voguesourcing.com
- **Tirupur Brands (directory listing)** — tirupurbrands.in
- **Astun Clothing** (Coimbatore) — astunclothing.com

## Folder guide

```
SEO/
├── README.md                    ← you are here
├── keyword-strategy.md          ← full keyword map, search intent, gaps, competitor opportunities
├── keyword-research.xlsx        ← same data, spreadsheet form (Excel-native, not CSV-renamed)
├── content-plan.md              ← IA, pillar/hub pages, topic clusters, content calendar
├── robots.txt / sitemap.xml / image-sitemap.xml  ← ready to deploy as-is
├── schema/                      ← 11 JSON-LD files, one concept per file, real data
├── metadata/                    ← full on-page SEO per page: title, description, H1–H4, FAQ, links, CTA
├── social/                      ← Open Graph, Twitter/X Cards, LinkedIn/Pinterest/WhatsApp notes, GBP description
├── images/                      ← alt-tags.xlsx for every current image + filename/compression guidance
├── technical/                   ← drop-in head templates for this stack (React) + reference ports (Next.js, Laravel, Nginx)
└── report/                      ← seo-audit.pdf, checklist.md, implementation-guide.md
```

Every file is complete and ready to use — nothing inside is a placeholder.
Where a requested schema type genuinely doesn't apply yet (Video, News,
active Review), the file says so explicitly instead of inventing content to
fill the slot.
