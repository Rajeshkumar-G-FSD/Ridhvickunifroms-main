// Every homepage section has its own shareable URL (e.g. /why-ridhvick-uniforms).
// Visiting one renders the homepage and scrolls to that section. `id` is the
// section element's DOM id; `slug` is the URL path; `aliases` are extra paths
// that open the same section (matching menu labels).
export interface HomeSection {
  id: string;
  slug: string;
  title: string;
  aliases?: string[];
}

export const HOME_SECTIONS: HomeSection[] = [
  { id: 'hero', slug: '', title: 'Home' },
  { id: 'solutions', slug: 'our-uniform-solutions', title: 'Our Uniform Solutions' },
  { id: 'why-ridhvick', slug: 'why-ridhvick-uniforms', title: 'Why Ridhvick Uniforms?' },
  {
    id: 'manufacturing',
    slug: 'from-fabric-to-finished-uniform',
    title: 'From Fabric to Finished Uniform',
  },
  {
    id: 'contact',
    slug: 'planning-uniforms-for-your-school',
    title: 'Planning Uniforms for Your School?',
  },
  { id: 'daily-sports', slug: 'uniform-categories', title: 'Uniform Categories' },
  { id: 'about', slug: 'company-overview', title: 'About Ridhvick Uniforms' },
  { id: 'catalog', slug: 'featured-collections', title: 'Featured Collections' },
  { id: 'digital-catalog', slug: 'catalog-preview', title: 'Digital Catalog' },
];

/** All URL paths (without leading slash) that open a homepage section. */
export const HOME_SECTION_PATHS = HOME_SECTIONS.flatMap((s) => [s.slug, ...(s.aliases ?? [])]).filter(Boolean);

export const sectionPath = (id: string) => {
  const section = HOME_SECTIONS.find((s) => s.id === id);
  return section?.slug ? `/${section.slug}` : '/';
};

export const sectionForPath = (pathname: string) => {
  const path = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  return HOME_SECTIONS.find((s) => s.slug === path || s.aliases?.includes(path));
};
