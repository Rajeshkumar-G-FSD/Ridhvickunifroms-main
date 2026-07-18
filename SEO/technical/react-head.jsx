/**
 * Ridhvick Uniforms — reusable SEO head component for THIS project's real
 * stack (React 19 + Vite, client-rendered, no router yet).
 *
 * This is written for actual use, not a generic React Helmet example:
 * - Adds react-helmet-async (one new dependency: `npm install react-helmet-async`)
 * - Reads the same field shape used throughout metadata/*.md, so a page's
 *   frontmatter can be copy-pasted almost directly into a <SEO> call
 * - Includes a working JSON-LD injector so schema/*.json files can be
 *   passed straight through without hand-writing <script> tags per page
 *
 * The project is TypeScript (.tsx) everywhere else in src/ — rename this
 * to SEO.tsx and add the type annotations shown in comments when you wire
 * it in, to match the rest of the codebase's conventions.
 */

import { Helmet, HelmetProvider } from 'react-helmet-async';

// type SEOProps = {
//   title: string;                 // 50–60 chars, from metadata/*.md
//   description: string;           // 140–160 chars, from metadata/*.md
//   canonical: string;             // full URL, e.g. "https://www.ridhvickuniforms.com/school-uniforms/primary-school"
//   ogImage?: string;               // full image URL
//   ogType?: 'website' | 'article';
//   schema?: object | object[];    // one or more parsed schema/*.json files
//   noindex?: boolean;             // only true for deliberately-excluded pages
// };

export function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://www.ridhvickuniforms.com/images/ridhvick_uniforms_hero_kids.png',
  ogType = 'website',
  schema,
  noindex = false,
}) {
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Ridhvick Uniforms" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {schemaList.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * Wire-up in main.tsx: wrap the app once, at the root, so every <SEO>
 * usage anywhere in the tree can inject into the real document <head>.
 *
 *   import { HelmetProvider } from 'react-helmet-async';
 *   ReactDOM.createRoot(document.getElementById('root')).render(
 *     <HelmetProvider>
 *       <App />
 *     </HelmetProvider>
 *   );
 *
 * Usage on the homepage (App.tsx), using the real content from
 * metadata/homepage.md and schema/organization.json + website.json +
 * webpage.json + faq.json:
 *
 *   import { SEO } from './SEO';
 *   import organizationSchema from '../SEO/schema/organization.json';
 *   import websiteSchema from '../SEO/schema/website.json';
 *   import webpageSchema from '../SEO/schema/webpage.json';
 *   import faqSchema from '../SEO/schema/faq.json';
 *
 *   export default function App() {
 *     return (
 *       <>
 *         <SEO
 *           title="Ridhvick Uniforms | School & Sports Uniform Manufacturer"
 *           description="Ridhvick manufactures premium school uniforms, sports wear, woven blazers & custom embroidery in Tirupur, India since 2009. Get a bulk quote today."
 *           canonical="https://www.ridhvickuniforms.com/"
 *           schema={[organizationSchema, websiteSchema, webpageSchema, faqSchema]}
 *         />
 *         <Header ... />
 *         ...
 *       </>
 *     );
 *   }
 *
 * IMPORTANT — this only fully works once the site has real per-route pages
 * (see README Finding #1). On the current single-page app, this component
 * still works for the homepage (as shown above) since Helmet correctly
 * writes into the real <head> at runtime, but it can't give a second
 * "page" its own title/canonical until that page has its own route/URL —
 * Helmet manages one document's <head>, it doesn't create new documents.
 * Once React Router (or separate static pages) exist, call <SEO> once per
 * route component using the matching metadata/*.md content and it will
 * "just work" per page.
 */
