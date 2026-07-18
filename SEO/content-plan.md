# Content Plan — Information Architecture, Topic Clusters & Calendar

## 1. Site architecture (hub-and-spoke)

```
                              HOME (/)
                          [Pillar / Hub Page]
                                 │
        ┌───────────┬───────────┼───────────┬────────────┬─────────────┐
        │           │           │            │            │             │
 Primary School  High School  Sports     Accessories   Digital      Manufacturing
  Uniforms       & Woven      Uniforms   (/uniform-    Catalog       & Services
 (/school-       Uniforms   (/sports-    accessories)  (/digital-   (/manufacturing-
 uniforms/        (/school-  uniforms)                 catalog)      services)
 primary-school)  uniforms/
                  high-school-
                  woven)
        │           │           │            │
        └─────┬─────┴─────┬─────┴──────┬─────┘
              │           │            │
         Product-level content (existing UNIFORM_PRODUCTS +
         CATALOG_TOPICS data — already structured, needs URLs)

    Supporting trust pages (linked from every page footer/nav):
    About (/about)  ·  Contact (/contact)
```

Home is the **pillar page** — it must link to all 6 cluster pages in the
primary nav (already true structurally via `Header.tsx` nav items; today
those links point to anchors, they need to point to real routes).
Each cluster page is a **hub** for its category and should internally link
down to individual product mentions and up to Home + across to Manufacturing
(the "how it's made" trust page every commercial cluster page should
reference once).

## 2. Pillar / Hub / Cluster assignment

| Role | Page | Links out to |
|---|---|---|
| **Pillar** | Home | All 6 cluster hubs, About, Contact |
| **Hub** | Primary School Uniforms | Kindergarten sub-topic, Manufacturing, Contact |
| **Hub** | High School & Woven Uniforms | Blazer/embroidery detail, Manufacturing, Contact |
| **Hub** | Sports Uniforms | Fabric tech explainer, Manufacturing, Contact |
| **Hub** | Uniform Accessories | Primary/High hubs (cross-sell), Contact |
| **Hub** | Digital Catalog | All 4 product hubs (it's the visual index of all of them) |
| **Supporting/EEAT** | Manufacturing & Services | Every hub links here once; this page links to About |
| **Supporting/EEAT** | About | Manufacturing, Contact |
| **Conversion** | Contact | Receives links from every page; links out to nothing (terminal node) |

## 3. Topic clusters (for future blog — recommended, not yet built)

A blog (`/blog/*`) is the standard way to build topical authority feeding the
pillar pages above without diluting the commercial pages themselves. Suggested
cluster topics, each linking back to the relevant hub page:

**Cluster A — Choosing & sizing (feeds Primary School + High School hubs)**
- "How to Choose the Right School Uniform Size: A Parent & Procurement Guide"
- "School Uniform Fabric Guide: Cotton vs. Poly-Viscose vs. Aero-Knit"
- "How Much Room to Grow Should a School Uniform Have?"

**Cluster B — Procurement & bulk ordering (feeds Manufacturing + Contact)**
- "How to Get a Bulk School Uniform Quote: Step-by-Step for Procurement Officers"
- "School Uniform MOQ, Lead Times & Bulk Pricing Explained"
- "Custom Logo Embroidery for School Uniforms: What to Send Your Manufacturer"

**Cluster C — Sports & performance fabric (feeds Sports Uniforms hub)**
- "Moisture-Wicking vs. Standard Cotton: What's Best for School Sports Days"
- "House Color Sports Uniforms: A Guide for School Sports Committees"

**Cluster D — Company & trust (feeds About + Manufacturing)**
- "Inside a Tirupur Uniform Factory: How Ridhvick Manufactures School Uniforms"
- "Why Tirupur Is India's Knitwear Capital — and What It Means for Uniform Quality"

Publish cadence recommendation: 2 posts/month is sustainable and sufficient
for a niche B2B catalog site — prioritize Cluster A and B first, they carry
the most direct commercial intent.

## 4. Anchor text guidance (internal linking)

Use descriptive, keyword-carrying anchors — never "click here" / "read more."

| From | To | Anchor text |
|---|---|---|
| Home hero | Primary School hub | "Primary School Uniforms" |
| Home hero | Sports hub | "Sports Uniforms & Athletic Wear" |
| Any product hub | Manufacturing | "See how every uniform is made in-house" |
| Any product hub | Contact | "Request a bulk quote for [category]" |
| Manufacturing | About | "Learn about Ridhvick's story since 2009" |
| Digital Catalog | each product hub | "[Category name] full range" |
| Footer (sitewide) | About, Manufacturing, Contact | "About Us", "Manufacturing Process", "Contact & Quotes" |

## 5. Internal linking rules

1. Every cluster page links to Home and to Manufacturing at minimum once
   each, in-content (not just nav/footer).
2. Every cluster page links to Contact at least once as a clear CTA.
3. No page should be more than 2 clicks from Home (already true with this
   flat 9-page structure).
4. Once the blog exists, every blog post links to at least one commercial
   hub page — blogs should never be link dead-ends.

## 6. Content calendar (first 90 days post-launch)

| Week | Action |
|---|---|
| 1 | Deploy 9 core pages with metadata from `metadata/*.md`; submit `sitemap.xml` to Search Console |
| 2 | Fix SSL certificate (see README Finding #2); verify Search Console + Bing Webmaster Tools |
| 3 | Set up Google Business Profile using `social/social-preview.md` description + NAP |
| 4 | Publish Cluster B post #1 (bulk quote guide) — highest commercial intent |
| 6 | Publish Cluster A post #1 (sizing guide) — links directly to AI Size Advisor feature |
| 8 | Publish Cluster C post #1 (sports fabric guide) |
| 10 | Publish Cluster B post #2 |
| 12 | Review Search Console query data; reprioritize backlog (`/corporate-uniforms` page candidate) based on real impressions data |
