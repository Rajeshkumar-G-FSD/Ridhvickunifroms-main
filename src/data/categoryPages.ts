export interface CategoryPageConfig {
  slug: string;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  images: string[];
}

// Placeholder AI-generated hero art (no dedicated per-category photography yet) —
// cycled across the category pages below for visual variety.
const DUMMY_HERO_IMAGES = [
  '/images/ChatGPT%20Image%20Dec%2025,%202025,%2004_58_20%20PM.png',
  '/images/ChatGPT%20Image%20Dec%2025,%202025,%2008_21_21%20PM.png',
  '/images/ChatGPT%20Image%20Dec%2025,%202025,%2008_57_05%20PM.png',
  '/images/ChatGPT%20Image%20Dec%2025,%202025,%2009_12_14%20PM.png',
];

const img = (name: string) => `/images/${name}.png`;

export const CATEGORY_PAGES: CategoryPageConfig[] = [
  {
    slug: 'accessories',
    label: 'Accessories',
    heroTitle: 'Accessories',
    heroSubtitle: 'Bags, ties, socks, and the finishing touches that complete every school uniform.',
    heroImage: DUMMY_HERO_IMAGES[0],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].map((n) => img(`rudhvick_Accessories_${n}`)),
  },
  {
    slug: 'blazers',
    label: 'Blazers',
    heroTitle: 'Blazers',
    heroSubtitle: 'Tailored formal blazers with crest embroidery, built for academy prestige.',
    heroImage: DUMMY_HERO_IMAGES[1],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', '11', '12', '13', '14'].map((n) => img(`ridhvick_blazer_${n}`)),
  },
  {
    slug: 'camendo',
    label: 'Camendo',
    heroTitle: 'Camendo',
    heroSubtitle: 'Rugged camo-inspired uniform styling for outdoor and activity days.',
    heroImage: DUMMY_HERO_IMAGES[2],
    images: ['one', 'two', 'three', 'four', 'five'].map((n) => img(`ridhvick_camndo_${n}`)),
  },
  {
    slug: 'hoodies',
    label: 'Hoodies',
    heroTitle: 'Hoodies',
    heroSubtitle: 'Warm, comfortable fleece hoodies for cool-weather school days.',
    heroImage: DUMMY_HERO_IMAGES[3],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((n) => img(`ridhvick_hoodies_${n}`)),
  },
  {
    slug: 'occasions',
    label: 'Occasions',
    heroTitle: 'Occasions',
    heroSubtitle: 'Special-day and celebration wear for annual days, functions, and school events.',
    heroImage: DUMMY_HERO_IMAGES[0],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'].map((n) => img(`ridhvick_occassions_${n}`)),
  },
  {
    slug: 'uniform-kindergarten',
    label: 'Kindergarten',
    heroTitle: 'Uniform — Kindergarten',
    heroSubtitle: 'Playful, comfortable, and durable uniforms tailored for our youngest learners.',
    heroImage: DUMMY_HERO_IMAGES[1],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', '11', '12', '13', '14', '15'].map((n) => img(`ridhvick_kindgarden_${n}`)),
  },
  {
    slug: 'uniform-primary-daily',
    label: 'Primary DailyWear',
    heroTitle: 'Uniform — Primary DailyWear',
    heroSubtitle: 'Crisp, easy-care daily wear combos built for the primary school routine.',
    heroImage: DUMMY_HERO_IMAGES[2],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'ten', 'none'].map((n) => img(`ridhvick_primary_dress_combo_${n}`)),
  },
  {
    slug: 'uniform-primary-sports',
    label: 'Primary SportsWear',
    heroTitle: 'Uniform — Primary SportsWear',
    heroSubtitle: 'Breathable, active sportswear designed for primary school play and PE.',
    heroImage: DUMMY_HERO_IMAGES[3],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((n) => img(`ridhvick_primary_dress_sports_${n}`)),
  },
  {
    slug: 'uniform-secondary-daily',
    label: 'Secondary DailyWear',
    heroTitle: 'Uniform — Secondary DailyWear',
    heroSubtitle: 'Structured, formal daily wear tailored for secondary school students.',
    heroImage: DUMMY_HERO_IMAGES[0],
    images: [
      ...['two', 'three', 'four', 'five', 'six', 'seven', 'eight'].map((n) => img(`ridhvick_secondary_dress_sports_${n}`)),
      '/images/ridhvick_secondary_dress_sports_one..png',
      ...['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((n) => img(`ridhvick_secondary_girl_dress_sports_${n}`)),
    ],
  },
  {
    slug: 'uniform-secondary-sports',
    label: 'Secondary SportsWear',
    heroTitle: 'Uniform — Secondary SportsWear',
    heroSubtitle: 'Performance sportswear engineered for secondary school athletics.',
    heroImage: DUMMY_HERO_IMAGES[1],
    images: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((n) => img(`ridhvick_secondary_adultsdress_sports_${n}`)),
  },
];

export const getCategoryPage = (slug: string) => CATEGORY_PAGES.find((c) => c.slug === slug);
