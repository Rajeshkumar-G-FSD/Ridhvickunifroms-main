import { Product } from '../types';

export const UNIFORM_PRODUCTS: Product[] = [
  // Accessories
  {
    id: 'ACC_001',
    name: 'Ergonomic Crest Backpack',
    category: 'accessories',
    categoryLabel: 'Accessories',
    priceEstimate: '₹2,399.00',
    image: '/images/rudhvick_Accessories_one.png',
    description: 'Spacious ergonomic school backpack featuring custom cushioned straps, a laptop sleeve, and school crest placeholder.',
    features: ['Anatomical back-support padding', 'Heavy-duty water-resistant nylon', 'Dual mesh water bottle side pockets'],
    sizes: ['One Size'],
    badge: 'Highly Durable',
    material: '900D Ballistic Cordura'
  },
  {
    id: 'ACC_002',
    name: 'Academy Crest Tie & Socks Set',
    category: 'accessories',
    categoryLabel: 'Accessories',
    priceEstimate: '₹999.00',
    image: '/images/rudhvick_Accessories_two.png',
    description: 'Set includes a woven school logo striping tie and three pairs of cushioned, breathable knit mid-calf socks.',
    features: ['Pre-tied and self-tie options', 'Arch support on socks', 'Colorfast non-fading dyes'],
    sizes: ['Standard Fit'],
    badge: 'Essential Accessory',
    material: 'Socks: 80% Cotton, 20% Spandex; Tie: 100% Satin Silk'
  },

  // Blazers
  {
    id: 'BLZ_001',
    name: 'Tailored Academy Blazer',
    category: 'blazers',
    categoryLabel: 'Blazers',
    priceEstimate: '₹3,599.00',
    image: '/images/ridhvick_blazer_one.png',
    description: 'Fully-lined formal academy blazer with gold crest button closures and deep functional pockets.',
    features: ['Water-repellent barrier', 'Internal zipper pocket', 'Crest embroidery ready'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    badge: 'Best Seller',
    material: '70% Wool, 30% Polyester Outer'
  },
  {
    id: 'BLZ_002',
    name: 'Premium House-Colored Tailored Blazer',
    category: 'blazers',
    categoryLabel: 'Blazers',
    priceEstimate: '₹3,999.00',
    image: '/images/ridhvick_blazer_two.png',
    description: 'Superbly tailored school blazer featuring contrast house-colored pocket linings, dynamic shoulder padding, and double-stitched reinforced lapels.',
    features: ['Contrast pocket linings', 'Padded shoulders', 'Double-stitched lapels'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Premium Fit',
    material: '70% Wool, 30% Polyester High-Density Blend'
  },

  // Camendo
  {
    id: 'CAM_001',
    name: 'Rugged Camendo Activity Jacket',
    category: 'camendo',
    categoryLabel: 'Camendo',
    priceEstimate: '₹2,299.00',
    image: '/images/ridhvick_camndo_one.png',
    description: 'Durable camo-print activity jacket built for outdoor and adventure days, with reinforced elbow panels.',
    features: ['Ripstop woven shell', 'Reinforced elbow panels', 'Adjustable cuff tabs'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Outdoor Ready',
    material: '65% Cotton, 35% Polyester Ripstop'
  },
  {
    id: 'CAM_002',
    name: 'Camendo Cargo Activity Trousers',
    category: 'camendo',
    categoryLabel: 'Camendo',
    priceEstimate: '₹1,899.00',
    image: '/images/ridhvick_camndo_two.png',
    description: 'Rugged camo-styled cargo trousers with multi-utility pockets for school activity and outdoor days.',
    features: ['Multi-utility cargo pockets', 'Reinforced knee stitching', 'Adjustable elastic waist'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New Fabrics',
    material: '100% Heavy-Duty Cotton Twill'
  },

  // Hoodies
  {
    id: 'HOD_001',
    name: 'Fleece-Lined Academy Hoodie',
    category: 'hoodies',
    categoryLabel: 'Hoodies',
    priceEstimate: '₹1,799.00',
    image: '/images/ridhvick_hoodies_one.png',
    description: 'Warm brushed-fleece hoodie with kangaroo pocket and ribbed cuffs for cool-weather school days.',
    features: ['Brushed fleece interior', 'Kangaroo front pocket', 'Ribbed cuffs and hem'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Cold Weather',
    material: '80% Cotton, 20% Polyester Fleece'
  },
  {
    id: 'HOD_002',
    name: 'Zip-Front Crest Hoodie',
    category: 'hoodies',
    categoryLabel: 'Hoodies',
    priceEstimate: '₹1,999.00',
    image: '/images/ridhvick_hoodies_two.png',
    description: 'Full-zip school hoodie with adjustable drawstring hood and embroidered crest placement on the chest.',
    features: ['Full front zip', 'Adjustable drawstring hood', 'Crest embroidery ready'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Popular',
    material: '75% Cotton, 25% Polyester Fleece'
  },

  // Occasions
  {
    id: 'OCC_001',
    name: 'Annual Day Ceremonial Set',
    category: 'occasions',
    categoryLabel: 'Occasions',
    priceEstimate: '₹2,899.00',
    image: '/images/ridhvick_occassions_one.png',
    description: 'Special-day ceremonial outfit set designed for annual day functions and formal school celebrations.',
    features: ['Premium finish fabric', 'Coordinated set styling', 'Event-ready tailoring'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Limited Run',
    material: 'Poly-Viscose Premium Woven'
  },
  {
    id: 'OCC_002',
    name: 'Festive Function Blazer Combo',
    category: 'occasions',
    categoryLabel: 'Occasions',
    priceEstimate: '₹3,299.00',
    image: '/images/ridhvick_occassions_two.png',
    description: 'Elegant blazer and trouser combo tailored for school functions, celebrations, and special-day events.',
    features: ['Structured formal cut', 'Matching trouser set', 'Event embroidery ready'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Occasion Wear',
    material: '70% Wool, 30% Polyester Blend'
  },

  // Uniform — Kindergarten
  {
    id: 'KG_001',
    name: 'Bib-Style Plaid Pinafore Set',
    category: 'uniform-kindergarten',
    categoryLabel: 'Kindergarten',
    priceEstimate: '₹1,499.00',
    image: '/images/ridhvick_kindgarden_one.png',
    description: 'Cute tartan plaid bib with dual-button straps, paired with a crisp white polo for early learners.',
    features: ['Anti-pilling materials', 'Easy-wear elasticated waist', 'Dual-button strap closures'],
    sizes: ['XS', 'S', 'M'],
    badge: 'Popular',
    material: '65% Cotton, 35% Poly Blend'
  },
  {
    id: 'KG_002',
    name: 'Athletic Raglan Polo & Short Pack',
    category: 'uniform-kindergarten',
    categoryLabel: 'Kindergarten',
    priceEstimate: '₹1,299.00',
    image: '/images/ridhvick_kindgarden_two.png',
    description: 'Sporty active collar with contrast color sleeves and matching drawstring play-shorts for kindergarten play.',
    features: ['Quick-dry breathable mesh', 'Drawstring play shorts', 'Colorfast dyes'],
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'New Arrival',
    material: '100% Breathable CoolMesh'
  },

  // Uniform — Primary DailyWear
  {
    id: 'PRIM_D_001',
    name: 'Standard Contrast Accent Polo',
    category: 'uniform-primary-daily',
    categoryLabel: 'Primary DailyWear',
    priceEstimate: '₹1,499.00',
    image: '/images/ridhvick_primary_dress_combo_one.png',
    description: 'Signature premium cotton-blend polo featuring a custom jacquard stripe collar for daily wear.',
    features: ['Stain-resistant finish', 'Double-stitch seams', 'Pill-resistant fabric'],
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'Popular',
    material: '220GSM Pique Combed Cotton Blend'
  },
  {
    id: 'PRIM_D_002',
    name: 'Double-Breasted Primary Tunic',
    category: 'uniform-primary-daily',
    categoryLabel: 'Primary DailyWear',
    priceEstimate: '₹2,199.00',
    image: '/images/ridhvick_primary_dress_combo_two.png',
    description: 'Elegant double-breasted primary school tunic with integrated pleated skirt and deep storage pockets.',
    features: ['Double-breasted styling', 'Teflon stain-repellent coat', 'Integrated pleated skirt'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New Arrival',
    material: '65% Poly, 35% Viscose Easy-Care Blend'
  },

  // Uniform — Primary SportsWear
  {
    id: 'PRIM_S_001',
    name: 'Knitted Athletic Track Jacket',
    category: 'uniform-primary-sports',
    categoryLabel: 'Primary SportsWear',
    priceEstimate: '₹2,599.00',
    image: '/images/ridhvick_primary_dress_sports_one.png',
    description: 'Dynamic sports jacket with full front zip, breathable knitted panels, and side-zipped storage pockets.',
    features: ['Quick-Dry moisture wicking', 'Thermal insulation layer', 'Reflective security stripes'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New Fabrics',
    material: 'Aero-Knit Performance Polyester'
  },
  {
    id: 'PRIM_S_002',
    name: 'Breathable Sports Mesh Shorts',
    category: 'uniform-primary-sports',
    categoryLabel: 'Primary SportsWear',
    priceEstimate: '₹1,199.00',
    image: '/images/ridhvick_primary_dress_sports_two.png',
    description: 'Lightweight athletic shorts with elastic drawstring waist and side air vents for sports classes.',
    features: ['Elastic drawstring waist', 'Anti-odor treatment', 'Interlock weave support'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Lightweight',
    material: '100% Recycled CoolMesh'
  },

  // Uniform — Secondary DailyWear
  {
    id: 'SEC_D_001',
    name: 'Premium Oxford Woven Shirt',
    category: 'uniform-secondary-daily',
    categoryLabel: 'Secondary DailyWear',
    priceEstimate: '₹1,799.00',
    image: '/images/ridhvick_secondary_dress_sports_two.png',
    description: 'Crisp light blue button-down shirt with structured formal collar and custom chest embroidery pocket.',
    features: ['Easy-iron technology', 'Underarm breathability', 'Reinforced cuffs'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Premium Woven',
    material: '100% Superfine Woven Cotton'
  },
  {
    id: 'SEC_D_002',
    name: 'Signature Pleated Woven Skirt',
    category: 'uniform-secondary-daily',
    categoryLabel: 'Secondary DailyWear',
    priceEstimate: '₹1,699.00',
    image: '/images/ridhvick_secondary_girl_dress_sports_one.png',
    description: 'Comfort-fit tailored woven school skirt with deep inner lining, side safety zipper, and permanent box pleating.',
    features: ['Permanent heat-set pleating', 'Deep inner lining', 'Side safety zipper'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'Classic Fit',
    material: '65% Poly, 35% Viscose Premium Blend'
  },

  // Uniform — Secondary SportsWear
  {
    id: 'SEC_S_001',
    name: 'Unisex Knit Athletic Track Jacket',
    category: 'uniform-secondary-sports',
    categoryLabel: 'Secondary SportsWear',
    priceEstimate: '₹2,799.00',
    image: '/images/ridhvick_secondary_adultsdress_sports_one.png',
    description: 'Full zipper front track jacket with twin zippered pockets, stand-up mock collar, and safety reflective stripes.',
    features: ['Full front zip', 'Twin zippered pockets', 'Reflective safety stripes'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Team Ready',
    material: 'Heavyweight Interlock Knit Polyester'
  },
  {
    id: 'SEC_S_002',
    name: 'Active Panel Raglan Tee',
    category: 'uniform-secondary-sports',
    categoryLabel: 'Secondary SportsWear',
    priceEstimate: '₹1,399.00',
    image: '/images/ridhvick_secondary_adultsdress_sports_two.png',
    description: 'Mesh side-ventilating panels with dynamic contrast raglan sleeves for enhanced mobility during athletics.',
    features: ['Mesh side panels', 'Contrast raglan sleeves', 'Moisture-wicking fabric'],
    sizes: ['S', 'M', 'L', 'XL'],
    badge: 'New Fabrics',
    material: 'Aero-Dry Performance Polyester Mesh'
  }
];
