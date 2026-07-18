/**
 * Ridhvick Uniforms — Next.js App Router metadata export.
 *
 * NOT APPLICABLE to this project today — the live codebase is React 19 +
 * Vite + Express (see server.ts), not Next.js. Provided as a complete,
 * correct reference in case of a future migration, or for a secondary
 * Next.js property (e.g. a headless blog at blog.ridhvickuniforms.com).
 * Every value is real content pulled from metadata/homepage.md — nothing
 * here is a placeholder.
 *
 * Usage: place at app/layout.tsx (site-wide fields) and app/page.tsx
 * (homepage-specific fields), per Next.js App Router conventions. For the
 * 8 other recommended pages, duplicate the `page.tsx` pattern below at
 * app/school-uniforms/primary-school/page.tsx etc., swapping values from
 * the matching metadata/*.md file.
 */

import type { Metadata } from 'next';

// ---- app/layout.tsx (site-wide defaults) ----
export const siteMetadata: Metadata = {
  metadataBase: new URL('https://www.ridhvickuniforms.com'),
  title: {
    default: 'Ridhvick Uniforms | School & Sports Uniform Manufacturer',
    template: '%s | Ridhvick Uniforms',
  },
  description:
    'Ridhvick manufactures premium school uniforms, sports wear, woven blazers & custom embroidery in Tirupur, India since 2009. Get a bulk quote today.',
  keywords: [
    'school uniforms',
    'sports uniforms',
    'uniform manufacturer',
    'custom embroidery',
    'woven uniforms',
    'Ridhvick',
    'Tirupur uniforms',
    'Chennai uniforms',
  ],
  authors: [{ name: 'Ridhvick Uniforms' }],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  themeColor: '#00346f',
  openGraph: {
    type: 'website',
    siteName: 'Ridhvick Uniforms',
    locale: 'en_IN',
    images: [
      {
        url: '/images/ridhvick_uniforms_hero_kids.png',
        width: 1600,
        height: 900,
        alt: 'School children wearing Ridhvick school uniforms',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// ---- app/page.tsx (homepage-specific — worked example) ----
export const homepageMetadata: Metadata = {
  title: 'Ridhvick Uniforms | School & Sports Uniform Manufacturer',
  description:
    'Ridhvick manufactures premium school uniforms, sports wear, woven blazers & custom embroidery in Tirupur, India since 2009. Get a bulk quote today.',
  alternates: {
    canonical: 'https://www.ridhvickuniforms.com/',
  },
  openGraph: {
    title: 'Ridhvick Uniforms | Premium School & Sports Uniform Manufacturer',
    description:
      'Premium quality school uniforms, tailored blazers, sports jerseys, and custom embroidery. Crafting academic pride since 2009.',
    url: 'https://www.ridhvickuniforms.com/',
  },
  twitter: {
    title: 'Ridhvick Uniforms | Premium School & Sports Uniform Manufacturer',
    description:
      'Premium quality school uniforms, tailored blazers, sports jerseys, and custom embroidery. Crafting academic pride since 2009.',
  },
};

// ---- app/school-uniforms/primary-school/page.tsx (cluster page example) ----
export const primarySchoolMetadata: Metadata = {
  title: 'Primary School Uniform Manufacturer India | Ridhvick',
  description:
    'Bulk primary school uniforms: polos, tunics, pinafores & jumpers in stain-resistant, easy-care fabric. Manufactured in-house in Tirupur since 2009.',
  alternates: {
    canonical: 'https://www.ridhvickuniforms.com/school-uniforms/primary-school',
  },
  openGraph: {
    title: 'Primary School Uniform Manufacturer India | Ridhvick Uniforms',
    description:
      'Kindergarten and primary daily-wear uniforms — polos, pinafores, jumpers, and tailored trousers — manufactured in bulk from Ridhvick\'s Tirupur facility.',
    url: 'https://www.ridhvickuniforms.com/school-uniforms/primary-school',
  },
};

/**
 * JSON-LD injection in Next.js App Router (no react-helmet needed —
 * App Router renders <script> tags server-side natively):
 *
 *   import organizationSchema from '@/../SEO/schema/organization.json';
 *
 *   export default function RootLayout({ children }: { children: React.ReactNode }) {
 *     return (
 *       <html lang="en-IN">
 *         <body>
 *           <script
 *             type="application/ld+json"
 *             dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
 *           />
 *           {children}
 *         </body>
 *       </html>
 *     );
 *   }
 */
