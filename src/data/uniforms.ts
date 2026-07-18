import { Product } from '../types';

export const UNIFORM_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Classic Primary Polo Shirt',
    category: 'primary',
    categoryLabel: 'Primary School',
    priceEstimate: '₹1,499.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uXlCvJpW6C8MjoGkymlvixCp3_r3isQUCltPVS8EPe8Nr2BIWvUuZimVYVz50OsJK-F3poHIplOmyn8Is7Olw11swEpYlLqQzn5oYIP9jm19uAf5bxHVc_WpMeL9BuSoTSrLU2y4uAo8TKhyeOUffEdqXJhu0OVYkfhmA7Pr6fKxE4WQdGVnG9hMAzytdo3999h39eaU9UyRG7xW23yTFkJpwOrfsOx45J0hgIHU1hW61lG2QHHemvPm2u9yBDQeLXyQ2ssxhRIc', // Primary student
    description: 'Crisp white breathable polo shirt with custom primary blue trim collar. Built for daily playtime and comfort.',
    features: ['Stain-resistant finish', 'Double-stitch seams', 'Pill-resistant fabric'],
    sizes: ['XS', 'S', 'M', 'L'],
    badge: 'Popular',
    material: '60% Cotton, 40% Polyester Blend'
  },
  {
    id: 'p2',
    name: 'Traditional Plaid School Tunic',
    category: 'primary',
    categoryLabel: 'Primary School',
    priceEstimate: '₹1,999.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtV8ToWtHx-L0X1DwdVoiB90vbI4gFpiXIqshWTyrT3JOsIn6JGstwTA0X052pad4-hEBkA4S8b29g7RHziGdVv35ctIJtQd6sjtas2x-kEaZFOyKjbsvks3XA8QFRfLSZejYC0p1FaS-0Gyud_1dH3O246ve-P8DJnQu6MUGDi9Fw17Nwf3jnMlDTKgrDLv-Fi-mOv5NN-AJyKP6YlONxf1GgYpXNnsTVe1syr2gDjcWCCInwjVVcSxcN0BfmvaRYpEioO-Sr1T_P', // Holding hands
    description: 'Beautiful tartan plaid pinafore tunic with side buckles and comfortable pleated skirt. Easy-care and durable.',
    features: ['Crease-recovery tech', 'Adjustable waistband', 'Deep hidden pockets'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Classic Fit',
    material: 'Poly-Viscose Premium Woven'
  },
  {
    id: 'h1',
    name: 'Premium Oxford Woven Shirt',
    category: 'high',
    categoryLabel: 'High School',
    priceEstimate: '₹1,799.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCARFF6Fp7p3HPt1TcgWoQQ2E7KSV_GoKwklIUd_ZgwCMUIaXnOi7fxwg4FwNyaVEaTrBLyStspm8bmKL0BRemGq8LphEVEn_76P5jKtnDIpR2nGOUp2VcKIEDZCXswxSi36W94T-TPhHXWbZLqJSefHMUi-mED9TLYNoin7s2DaPTNMm1E1Xih45Vs40DVA6PJcFQeqlb0i2iso-G-An_0NEO40lgmwkfntP_pK6FSdvivMx5xSAVf87RMxj65Y9hMqYdep87xSHp', // High school boy
    description: 'Crisp light blue button-down shirt with structured formal collar and custom chest embroidery pocket.',
    features: ['Easy-iron technology', 'Underarm breathability', 'Reinforced cuffs'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Premium Woven',
    material: '100% Superfine Woven Cotton'
  },
  {
    id: 'h2',
    name: 'Tailored Academy Blazer',
    category: 'high',
    categoryLabel: 'High School',
    priceEstimate: '₹3,599.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCARFF6Fp7p3HPt1TcgWoQQ2E7KSV_GoKwklIUd_ZgwCMUIaXnOi7fxwg4FwNyaVEaTrBLyStspm8bmKL0BRemGq8LphEVEn_76P5jKtnDIpR2nGOUp2VcKIEDZCXswxSi36W94T-TPhHXWbZLqJSefHMUi-mED9TLYNoin7s2DaPTNMm1E1Xih45Vs40DVA6PJcFQeqlb0i2iso-G-An_0NEO40lgmwkfntP_pK6FSdvivMx5xSAVf87RMxj65Y9hMqYdep87xSHp',
    description: 'Fully-lined formal academy blazer with gold crest button closures and deep functional pockets.',
    features: ['Water-repellent barrier', 'Internal zipper pocket', 'Crest embroidery ready'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    badge: 'Best Seller',
    material: '70% Wool, 30% Polyester Outer'
  },
  {
    id: 's1',
    name: 'Knitted Athletic Track Jacket',
    category: 'sports',
    categoryLabel: 'Sports Wear',
    priceEstimate: '₹2,599.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJAFrCzll3wIV-dKn0j3uhu71X3erOxYH1s8EprejeuwOjy1rK-MqnShBZrJKqP7AtoUhODWxVEJuOpv74afRppu9xVkp6j_PZQvBSV0R77y9JERW4qgcx5ozT3rK3aQoh6ISvEKTDzUETTP0f1eDWEk0P3zdTY3wHH5GugiFwNEM5NY6V3PpWa3fMj38wfh_lJu0lDiMZxTETnjdU4VhG2W5c-qUk6CDDXKN5UydH5m1gH196UMmfVIE2Enzxi5O6yztR_Z_SUr2', // Sports track
    description: 'Dynamic sports jacket with full front zip, breathable knitted panels, and side-zipped storage pockets.',
    features: ['Quick-Dry moisture wicking', 'Thermal insulation layer', 'Reflective security stripes'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New Fabrics',
    material: 'Aero-Knit Performance Polyester'
  },
  {
    id: 's2',
    name: 'Breathable Sports Mesh Shorts',
    category: 'sports',
    categoryLabel: 'Sports Wear',
    priceEstimate: '₹1,199.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJAFrCzll3wIV-dKn0j3uhu71X3erOxYH1s8EprejeuwOjy1rK-MqnShBZrJKqP7AtoUhODWxVEJuOpv74afRppu9xVkp6j_PZQvBSV0R77y9JERW4qgcx5ozT3rK3aQoh6ISvEKTDzUETTP0f1eDWEk0P3zdTY3wHH5GugiFwNEM5NY6V3PpWa3fMj38wfh_lJu0lDiMZxTETnjdU4VhG2W5c-qUk6CDDXKN5UydH5m1gH196UMmfVIE2Enzxi5O6yztR_Z_SUr2',
    description: 'Lightweight athletic shorts with elastic drawstring waist and side air vents for comfort during sports classes.',
    features: ['Elastic drawstring waist', 'Anti-odor treatment', 'Interlock weave support'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'Lightweight',
    material: '100% Recycled CoolMesh'
  },
  {
    id: 'a1',
    name: 'Ergonomic Crest Backpack',
    category: 'accessories',
    categoryLabel: 'Accessories',
    priceEstimate: '₹2,399.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uXlCvJpW6C8MjoGkymlvixCp3_r3isQUCltPVS8EPe8Nr2BIWvUuZimVYVz50OsJK-F3poHIplOmyn8Is7Olw11swEpYlLqQzn5oYIP9jm19uAf5bxHVc_WpMeL9BuSoTSrLU2y4uAo8TKhyeOUffEdqXJhu0OVYkfhmA7Pr6fKxE4WQdGVnG9hMAzytdo3999h39eaU9UyRG7xW23yTFkJpwOrfsOx45J0hgIHU1hW61lG2QHHemvPm2u9yBDQeLXyQ2ssxhRIc',
    description: 'Spacious ergonomic school backpack featuring custom cushioned straps, a laptop sleeve, and school crest placeholder.',
    features: ['Anatomical back-support padding', 'Heavy-duty water-resistant nylon', 'Dual mesh water bottle side pockets'],
    sizes: ['One Size'],
    badge: 'Highly Durable',
    material: '900D Ballistic Cordura'
  },
  {
    id: 'a2',
    name: 'Academy Crest Tie & Socks Set',
    category: 'accessories',
    categoryLabel: 'Accessories',
    priceEstimate: '₹999.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPSzNLTALhBxBWciOkP9dVKq0Biu9fQkpZR7EoeufJPdEXC_tvdSoXmtcePdGCGqZ8W1nqST58lTG1fZDJOopjCYA2Tk6W0RHmvPIyf2aYnoRoehwCS9sWXNf1yaZaiZJOtPL9Yk1KXHIwCunE34tfbJ72mTw3KtvL2-FjIubB7OEVCjbZ_w43sjLXftvQFLEPn48kFGGW3e5UBTi1r7N46U9PoHYScdSlxcMuBVhKAPMnuJmJ-MvfQ_tJEJ9gZCx90MR4ter2Pcnm',
    description: 'Set includes a woven school logo striping tie and three pairs of cushioned, breathable knit mid-calf socks.',
    features: ['Pre-tied and self-tie options', 'Arch support on socks', 'Colorfast non-fading dyes'],
    sizes: ['Standard Fit'],
    badge: 'Essential Accessory',
    material: 'Socks: 80% Cotton, 20% Spandex; Tie: 100% Satin Silk'
  },
  {
    id: 'PRIM_MDL074',
    name: 'Double-Breasted Primary Tunic (Model 074)',
    category: 'primary',
    categoryLabel: 'Primary School',
    priceEstimate: '₹2,199.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uXlCvJpW6C8MjoGkymlvixCp3_r3isQUCltPVS8EPe8Nr2BIWvUuZimVYVz50OsJK-F3poHIplOmyn8Is7Olw11swEpYlLqQzn5oYIP9jm19uAf5bxHVc_WpMeL9BuSoTSrLU2y4uAo8TKhyeOUffEdqXJhu0OVYkfhmA7Pr6fKxE4WQdGVnG9hMAzytdo3999h39eaU9UyRG7xW23yTFkJpwOrfsOx45J0hgIHU1hW61lG2QHHemvPm2u9yBDQeLXyQ2ssxhRIc',
    description: 'Elegant double-breasted primary school tunic with integrated smart pleated skirt, comfort-stretch side panels, and deep storage pockets.',
    features: ['Double-breasted styling', 'Teflon stain-repellent coat', 'Integrated pleated skirt'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    badge: 'New Arrival',
    material: '65% Poly, 35% Viscose Easy-Care Blend'
  },
  {
    id: 'HOU_STL06_1',
    name: 'Premium House-Colored Tailored Blazer (Model STL06)',
    category: 'high',
    categoryLabel: 'High School',
    priceEstimate: '₹3,999.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCARFF6Fp7p3HPt1TcgWoQQ2E7KSV_GoKwklIUd_ZgwCMUIaXnOi7fxwg4FwNyaVEaTrBLyStspm8bmKL0BRemGq8LphEVEn_76P5jKtnDIpR2nGOUp2VcKIEDZCXswxSi36W94T-TPhHXWbZLqJSefHMUi-mED9TLYNoin7s2DaPTNMm1E1Xih45Vs40DVA6PJcFQeqlb0i2iso-G-An_0NEO40lgmwkfntP_pK6FSdvivMx5xSAVf87RMxj65Y9hMqYdep87xSHp',
    description: 'Superbly tailored school blazer featuring contrast house-colored pocket linings, dynamic shoulder padding, and double-stitched reinforced lapels.',
    features: ['Contrast pocket linings', 'Padded shoulders', 'Double-stitched lapels'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    badge: 'Premium Fit',
    material: '70% Wool, 30% Polyester High-Density Blend'
  }
];
