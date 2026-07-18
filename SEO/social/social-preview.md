# Social Preview & Local SEO Reference

## How each platform will render a shared link (homepage)

All platforms below read the same `og:*` / `twitter:*` tags from
`open-graph.html` and `twitter.html` — there is no need to write separate
markup per platform; this section documents what each one actually displays
so you can sanity-check the preview before a real campaign.

| Platform | Reads | Preview shows |
|---|---|---|
| **Facebook** | `og:title`, `og:description`, `og:image`, `og:url` | Large image card: "Ridhvick Uniforms \| Premium School & Sports Uniform Manufacturer" + description + ridhvickuniforms.com domain chip |
| **LinkedIn** | Same `og:*` tags (no LinkedIn-specific tags exist) | Same large image card; LinkedIn crawls and caches — use the Post Inspector (linkedin.com/post-inspector) to force a re-crawl after any change |
| **WhatsApp** | Same `og:*` tags | Compact card with `og:image` thumbnail, `og:title`, and domain — WhatsApp is stricter on image size than Facebook; keep the OG image under 300KB and above 300×157px (see `images/image-seo.md`) |
| **Pinterest** | `og:*` tags for a normal Pin; optionally richer "Product Pin" data if you add `product:price:amount` / `product:price:currency` meta tags per product page | Standard image Pin with title + description; only worth adding Product Pin tags if you actively pin individual uniform product pages, not the homepage |
| **X / Twitter** | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` | Large image card (falls back to Facebook's `og:image` if `twitter:image` is missing, but both are set explicitly here) |

**Before any paid social campaign:** re-validate with each platform's real
debugger, not just this document — social platforms cache the previous
version of a link aggressively:
- Facebook/WhatsApp: developers.facebook.com/tools/debug/
- LinkedIn: linkedin.com/post-inspector/
- Twitter/X: no public validator anymore — post a private/unlisted test to check

---

## Google Business Profile

### Business description (698 / 750 characters)

```
Ridhvick Uniforms manufactures premium school and sports uniforms in-house,
from design and fabric weaving to computerized embroidery, at our own
facility in Tirupur, Tamil Nadu — India's largest knitwear manufacturing
hub. Since 2009, we've supplied schools and institutions across India with
primary and high school daily wear, tailored academy blazers, moisture-
wicking sports uniforms, and custom-branded accessories, all produced under
one roof for consistent quality on bulk orders. Our Chennai sales office
supports institutions across Tamil Nadu. Request a bulk quote, physical
fabric swatches, or custom logo embroidery samples directly through our
website or sales desk — we typically respond within 24 business hours.
```

### Category
**Primary:** Uniform Store *(or "Clothing Manufacturer" if your GBP account
has access to that category — "Uniform Store" is the closer functional
match for how school procurement buyers actually search on Maps)*
**Secondary:** Clothing Wholesaler, Embroidery Shop

### Suggested Services (GBP Services tab)
- Bulk school uniform manufacturing
- Custom logo embroidery
- Sports uniform manufacturing
- Fabric sample requests
- Corporate/institutional uniform supply

### Attributes
- Identifies as a manufacturer (not just a retailer/reseller)
- Serves institutions/businesses (B2B), not primarily walk-in retail —
  set "Online appointments"/"Online estimates" attributes as applicable
  rather than retail attributes like "in-store shopping"

---

## NAP (Name, Address, Phone) — canonical format

Use this **exact** formatting everywhere the business is listed (GBP,
IndiaMART, website footer, invoices, this contact page) — inconsistent NAP
formatting across listings is one of the most common local-SEO ranking
suppressors, because Google cross-references listings to confirm a business
is real.

**Registered Office (Tirupur):**
```
Ridhvick Uniforms (Ridhvick Apparels)
No 2/278 A2, Old Koolipalayam Road, Vavipalayam Post
Tirupur, Tamil Nadu 641666, India
+91 95001 11321
```

**Chennai Sales Office:**
```
Ridhvick Uniforms (Ridhvick Apparels) — Chennai Sales Office
No 7/546, Chettinadu Green Villa, Nesamani Nagar, Perumbakkam
Chennai, Tamil Nadu 600100, India
+91 84387 46433
```

Cross-check this against your existing IndiaMART listing
(indiamart.com/ridhvick-apparels/) — if the address or phone format differs
there, update one to match the other rather than leaving two versions of the
truth live.

## Local structured data
Already generated: `schema/localbusiness.json` — one `LocalBusiness` node
per office, `branchOf` the main `Organization`. Add `geo` (lat/long from
Google Maps) and `openingHoursSpecification` once confirmed — see
`schema/README.md` for exact field names.

## Location pages — do you need them?
Standard local-SEO advice ("build a page per location") is built for
multi-branch retail chains competing on "near me" search. Ridhvick has two
offices serving a national B2B/institutional buyer base, not walk-in local
traffic — a dedicated `/locations/tirupur` and `/locations/chennai` page
pair would mostly duplicate the Contact page with no real search demand
behind it. **Recommendation: don't build separate location pages.** Keep
both offices clearly listed on the single Contact page (already the
structure in `metadata/contact.md`) and put the effort into GBP profile
completeness instead, which is what actually drives local/map visibility
for this business type.
