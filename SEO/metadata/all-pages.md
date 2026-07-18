# All Pages — Master SEO Summary

Quick-reference index of every page's core metadata. Full detail (H1–H4,
FAQ, internal links, CTA, EEAT notes) is in each page's own file. Titles and
descriptions here are copy-paste ready and character-count verified.

| # | Page | URL | Title (chars) | Meta Description (chars) | Status |
|---|---|---|---|---|---|
| 1 | Homepage | `/` | Ridhvick Uniforms \| School & Sports Uniform Manufacturer (56) | Ridhvick manufactures premium school uniforms, sports wear, woven blazers & custom embroidery in Tirupur, India since 2009. Get a bulk quote today. (147) | **Live** |
| 2 | Primary School Uniforms | `/school-uniforms/primary-school` | Primary School Uniform Manufacturer India \| Ridhvick (52) | Bulk primary school uniforms: polos, tunics, pinafores & jumpers in stain-resistant, easy-care fabric. Manufactured in-house in Tirupur since 2009. (147) | Recommended |
| 3 | High School & Woven Uniforms | `/school-uniforms/high-school-woven` | School Blazer & Woven Uniform Manufacturer \| Ridhvick (53) | Tailored school blazers, Oxford shirts & woven uniforms with custom crest embroidery. Bulk manufacturing from Ridhvick's Tirupur facility since 2009. (149) | Recommended |
| 4 | Sports Uniforms | `/sports-uniforms` | School Sports Uniform Manufacturer India \| Ridhvick (51) | Moisture-wicking sports uniforms, track jackets & house-color tees for schools, made in-house with aero-knit fabric. Request a bulk quote today. (144) | Recommended |
| 5 | Uniform Accessories | `/uniform-accessories` | School Uniform Accessories Manufacturer \| Ridhvick (50) | Bulk school ties, socks & backpacks with custom crest branding, manufactured to match your uniform program. Request samples from Ridhvick Uniforms. (147) | Recommended |
| 6 | Digital Catalog | `/digital-catalog` | Browse the Ridhvick Digital School Uniform Catalog (50) | Explore Ridhvick's interactive uniform catalog: zoom into fabric detail, browse models by category, and add configurations to your quote request. (145) | In-page section today |
| 7 | Manufacturing & Services | `/manufacturing-services` | Uniform Manufacturing & Embroidery Services \| Ridhvick (54) | From fabric sampling to computerized logo embroidery, Ridhvick manages the full school uniform manufacturing process in-house in Tirupur, India. (144) | In-page section today |
| 8 | About Us | `/about` | About Ridhvick Uniforms \| Tirupur, India Since 2009 (51) | Ridhvick Uniforms has manufactured school and sports uniforms in-house from Tirupur, India since 2009. Learn our story, process, and quality standards. (151) | Recommended — content gap, see `about.md` |
| 9 | Contact & Bulk Quote | `/contact` | Contact Ridhvick Uniforms \| Request a Bulk Quote Now (52) | Reach Ridhvick Uniforms' Tirupur and Chennai offices for bulk school uniform quotes, fabric samples, or custom embroidery inquiries. We reply in 24 hrs. (152) | In-page section today |

All titles fall within the 50–60 character target; all descriptions fall
within 140–160. Every row is production-ready to paste into a `<title>` and
`<meta name="description">` tag the moment its route exists.

## Canonical URLs (copy-paste block)

```
https://www.ridhvickuniforms.com/
https://www.ridhvickuniforms.com/school-uniforms/primary-school
https://www.ridhvickuniforms.com/school-uniforms/high-school-woven
https://www.ridhvickuniforms.com/sports-uniforms
https://www.ridhvickuniforms.com/uniform-accessories
https://www.ridhvickuniforms.com/digital-catalog
https://www.ridhvickuniforms.com/manufacturing-services
https://www.ridhvickuniforms.com/about
https://www.ridhvickuniforms.com/contact
```

## Per-page schema checklist

| Page | Organization | WebPage | Breadcrumb | Service | Product | FAQPage | LocalBusiness |
|---|---|---|---|---|---|---|---|
| Homepage | ✅ | ✅ | — (root) | — | — | ✅ | — |
| Primary School | ✅ | ✅ | ✅ | — | ✅ | ✅ (page-specific, extend faq.json) | — |
| High School & Woven | ✅ | ✅ | ✅ | — | ✅ | ✅ (page-specific) | — |
| Sports Uniforms | ✅ | ✅ | ✅ | — | ✅ | ✅ (page-specific) | — |
| Accessories | ✅ | ✅ | ✅ | — | ✅ | ✅ (page-specific) | — |
| Digital Catalog | ✅ | ✅ | ✅ | — | — | ✅ (page-specific) | — |
| Manufacturing & Services | ✅ | ✅ | ✅ | ✅ | — | ✅ (page-specific) | — |
| About | ✅ | ✅ | ✅ | — | — | ✅ (page-specific) | — |
| Contact | ✅ | ✅ | ✅ | — | — | ✅ (page-specific) | ✅ |

✅ = deploy `organization.json` and `website.json` once, site-wide, in a
shared layout `<head>` — don't repeat them per page. Every other ✅ is
page-specific: duplicate the pattern in `schema/webpage.json`,
`breadcrumb.json`, and `product.json`, swapping the `name`/`url`/`@id`
fields per page as shown in each page's own `metadata/*.md` file.
