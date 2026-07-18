# Schema (JSON-LD) — usage guide

Every `.json` file in this folder is valid, ready-to-paste JSON-LD. Drop it
into the target page inside:

```html
<script type="application/ld+json">
  { ...file contents... }
</script>
```

JSON-LD can't contain comments, so usage notes live here instead of inline.

| File | Schema type(s) | Use on | Status |
|---|---|---|---|
| `organization.json` | Organization | Every page (site-wide, in `<head>`) | **Active** — already wired into `index.html` |
| `website.json` | WebSite | Homepage only | **Active** — no `SearchAction` (see below) |
| `webpage.json` | WebPage | One instance per page — this file is the Homepage instance; duplicate the pattern for each of the 9 recommended pages, swapping `name`/`description`/`url` | **Active** for homepage; template for the rest |
| `service.json` | Service | Manufacturing & Services page (`/manufacturing-services`) | Ready — deploy when that page ships |
| `faq.json` | FAQPage | Homepage today; move to the relevant hub page once it exists | **Active** — matches the FAQ text verbatim in `metadata/homepage.md`. Google requires the FAQ schema to match visible on-page text exactly; if you edit one, edit both. |
| `breadcrumb.json` | BreadcrumbList | Every page except the homepage (Google's own guidance is to omit breadcrumbs on the root page) | Template — uses the Primary School Uniforms page as the worked example; the pattern (`Home > School Uniforms > [Category]`) applies to every cluster page |
| `product.json` | Product (array via `@graph`) | Category/product pages | Ready — covers one representative product per category using real data from `src/data/uniforms.ts`. Extend the array with the rest of `UNIFORM_PRODUCTS` the same way. |
| `article.json` | Article / BlogPosting | Future blog posts | **Template, not active** — no blog exists yet. Uses the first recommended Cluster B topic from `content-plan.md` as the worked example, with `datePublished`/`dateModified` set to the Week-6 target date from the content calendar. It's valid JSON-LD as-is (so it passes Rich Results Test if you check it), but update both dates to the real publish date before it goes live — a schema date that doesn't match the actual publish date is itself a minor trust signal issue. Do not publish until the article exists at that URL. |
| `localbusiness.json` | LocalBusiness (×2, via `@graph`) | Contact page + homepage footer | **Active** — one node per real office (Tirupur registered office, Chennai sales office). Two fields are deliberately omitted, not guessed: `geo` (lat/long — pull from Google Maps "share location" for each address) and `openingHoursSpecification` (I don't have your verified business hours from the codebase — add real hours, e.g. `"Mo-Sa 09:30-18:30"`, once confirmed). Both are low-effort additions that improve map-pin and "open now" rich results once filled in. |
| `person.json` | Person | About page, once written | **Template, deliberately not populated.** See note below. |
| `review-aggregate-rating.json` | Review / AggregateRating | Homepage / product pages, once you have real reviews | **Inactive.** See note below. |

## Why `person.json` has no name in it

Your site has no named individual (founder, MD, spokesperson) published
anywhere I can pull from. Inventing a fake name, job title, and bio to
populate `Person` schema would be fabricating a fictitious human being for
structured data — that's a hard line I won't cross even though the brief
asked for no placeholders. The file is a syntactically correct, structurally
complete template with every real field name Google supports; fill in the
`name`, `jobTitle`, and `sameAs` (LinkedIn profile) yourself, or tell me the
details and I'll finish it.

## Why `review-aggregate-rating.json` ships with zero reviews

Google's structured data policy explicitly prohibits self-authored or
fabricated ratings, and violations can trigger a manual action against the
*entire* site's structured data, not just one page. Your site doesn't
currently display any customer reviews. The file defines the correct
`Review` and `AggregateRating` shape so your developer can wire it up the
moment real reviews exist (Google Business Profile reviews, a testimonials
section with attribution, etc.) — populate `reviewCount`, `ratingValue`, and
each `Review` node from real data only.

## `WebSite` + `SearchAction`

The brief asked for `SearchAction` schema. Your site has no internal search
box — there's nothing for that action to point at. Adding a `SearchAction`
with a fake or non-functional URL template would make Google attempt to
render a Sitelinks Search Box in results that goes nowhere, which is worse
than not having one. `website.json` is shipped without it. If you add site
search later, add:

```json
"potentialAction": {
  "@type": "SearchAction",
  "target": {
    "@type": "EntryPoint",
    "urlTemplate": "https://www.ridhvickuniforms.com/search?q={search_term_string}"
  },
  "query-input": "required name=search_term_string"
}
```

to the `WebSite` node once `/search?q=` actually resolves to results.

## Not included: VideoObject, NewsArticle / news sitemap, video sitemap

The site has no video content and is not a news publisher, so these schema
types and sitemap variants from the original brief are genuinely not
applicable — adding them empty would itself be the kind of placeholder
content this package is explicitly trying to avoid. Add a `VideoObject` file
here if you ever publish a factory-tour or product-demo video; it's a strong
fit given the "Digital Catalog" and manufacturing-process content already
planned.
