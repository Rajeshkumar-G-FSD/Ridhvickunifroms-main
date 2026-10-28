// Shared site menu used by both the Header and Footer. An item either scrolls
// to a homepage section (`section`) or opens a route (`to`); `children` render
// as a dropdown of catalog pages.
export interface NavLink {
  label: string;
  section?: string;
  to?: string;
  children?: { label: string; to: string }[];
}

export const SITE_NAV: NavLink[] = [
  { label: 'Home', section: 'hero', to: '/' },
  { label: 'About Us', section: 'about' },
  {
    label: 'School Uniforms',
    section: 'daily-sports',
    children: [
      { label: 'Kindergarten', to: '/catalog/uniform-kindergarten' },
      { label: 'Primary Daily Wear', to: '/catalog/uniform-primary-daily' },
      { label: 'Secondary Daily Wear', to: '/catalog/uniform-secondary-daily' },
      { label: 'Blazers', to: '/catalog/blazers' },
      { label: 'Hoodies & Winter Wear', to: '/catalog/hoodies' },
      { label: 'Camendo', to: '/catalog/camendo' },
      { label: 'Accessories', to: '/catalog/accessories' },
    ],
  },
  { label: 'Branded Uniform Fabrics', to: '/branded-uniform-fabrics' },
  { label: 'Corporate & Industrial Uniforms', to: '/corporate-industrial-uniforms' },
  {
    label: 'Sports Wear & T-Shirts',
    to: '/catalog/uniform-primary-sports',
    children: [
      { label: 'Primary Sports Wear', to: '/catalog/uniform-primary-sports' },
      { label: 'Secondary Sports Wear', to: '/catalog/uniform-secondary-sports' },
      { label: 'Event & Club T-Shirts', to: '/catalog/occasions' },
    ],
  },
  { label: 'Dealers & Retailers', to: '/dealers-retailers' },
  { label: 'Manufacturing Process', section: 'manufacturing' },
  { label: 'Contact Us', section: 'contact' },
];
