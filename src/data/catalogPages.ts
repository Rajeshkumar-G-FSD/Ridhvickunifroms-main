export interface CatalogModel {
  id: string;
  name: string;
  type: string;
  description: string;
  colors: string[];
  sizes: string[];
  fabric: string;
}

export interface CatalogPage {
  pageNumber: number;
  title: string;
  image: string;
  description: string;
  models: CatalogModel[];
}

export interface CatalogTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  pages: CatalogPage[];
}

export const CATALOG_TOPICS: CatalogTopic[] = [
  {
    id: 'kindergarten',
    title: 'Kindergarten Series',
    description: 'Playful, comfortable, and durable uniforms tailored for early learners. Featuring anti-pilling materials and easy-wear elasticated waists.',
    icon: 'Sparkles',
    pages: [
      {
        pageNumber: 1,
        title: 'Kinder Garden Uniforms (Models 001 - 012)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSes5KLVAnxOfr2GiByAxUWuxzIRcIaadcNquHGsp2QCm5lYlxmKaCH6yeBbSIFf2sg3vswpmMYpWJdByqk2WYimmParjTVvvPbpzuw5XH4uIB2nHZezw-ge9Q7kRAYC7BrSzuW7T2n5qnlXcxKjbHXA2kctKHdVg85HOkWZOriARBVszMfUIUfQFWdMfGG5Z9euisdruz0wsbRVXJ3vtmJLEEsa2wiotSu6A5kYr0husdfSa9jNYEtnANC-gna9LcEtOv84re7NMB',
        description: 'Features comfortable pinafores, polo pairings, and active play shorts with vibrant custom piping.',
        models: [
          { id: 'KG_MDL001', name: 'Bib-Style Plaid Pinafore Set', type: 'Pinafore Set', description: 'Cute tartan plaid bib with dual-button straps, paired with crisp white polo.', colors: ['Red Plaid', 'Blue Plaid'], sizes: ['XS', 'S', 'M'], fabric: '65% Cotton, 35% Poly Blend' },
          { id: 'KG_MDL002', name: 'Classic Sailor-Collar Dress', type: 'One-Piece Dress', description: 'Graceful sailor collar with matching white braid trim. Includes integrated safety knit shorts.', colors: ['Navy Blue', 'Forest Green'], sizes: ['XS', 'S', 'M'], fabric: 'Premium Poly-Viscose' },
          { id: 'KG_MDL003', name: 'Athletic Raglan Polo & Short Pack', type: 'Active Pack', description: 'Sporty active collar with contrast color sleeves and matching drawstring play-shorts.', colors: ['Red/White', 'Royal Blue/White'], sizes: ['XS', 'S', 'M', 'L'], fabric: '100% Breathable CoolMesh' },
          { id: 'KG_MDL004', name: 'V-Neck Classic Knit Vest', type: 'Knitwear', description: 'Soft combed-cotton sleeveless knit vest with dual athletic stripes around collar.', colors: ['Burgundy', 'Navy Blue', 'Grey'], sizes: ['XS', 'S', 'M'], fabric: '100% Combed Cotton Knit' },
          { id: 'KG_MDL005', name: 'Elasticized Pull-on Twill Shorts', type: 'Bottoms', description: 'Sturdy active-wear twill shorts with custom school color lining and mock fly styling.', colors: ['Khaki', 'Navy Blue'], sizes: ['XS', 'S', 'M'], fabric: 'Stain-Resistant Stretch Cotton Twill' },
          { id: 'KG_MDL006', name: 'Pleated Scooter Skirt', type: 'Skirts', description: 'Built-in knit safety shorts under elegant poly-viscose durable box pleats.', colors: ['Navy Plaid', 'Green Plaid'], sizes: ['XS', 'S', 'M'], fabric: 'Wrinkle-Free Premium Blend' }
        ]
      }
    ]
  },
  {
    id: 'primary-daily',
    title: 'Primary Daily Wear',
    description: 'Elegant, crisp daily school wear designed to endure active playground hours and structural formal assemblies.',
    icon: 'CheckCircle2',
    pages: [
      {
        pageNumber: 2,
        title: 'Primary Daily Wear (Models 001 - 012)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uXlCvJpW6C8MjoGkymlvixCp3_r3isQUCltPVS8EPe8Nr2BIWvUuZimVYVz50OsJK-F3poHIplOmyn8Is7Olw11swEpYlLqQzn5oYIP9jm19uAf5bxHVc_WpMeL9BuSoTSrLU2y4uAo8TKhyeOUffEdqXJhu0OVYkfhmA7Pr6fKxE4WQdGVnG9hMAzytdo3999h39eaU9UyRG7xW23yTFkJpwOrfsOx45J0hgIHU1hW61lG2QHHemvPm2u9yBDQeLXyQ2ssxhRIc',
        description: 'Features official traditional polo collars, tailored waistbands, and custom double-stitch pocket crest options.',
        models: [
          { id: 'PRIM_MDL001', name: 'Standard Contrast Accent Polo', type: 'Polo Shirt', description: 'Signature premium cotton-blend polo featuring custom jacquard stripe collar.', colors: ['White/Navy', 'White/Red', 'Sky Blue/Navy'], sizes: ['S', 'M', 'L', 'XL'], fabric: '220GSM Pique Combed Cotton Blend' },
          { id: 'PRIM_MDL002', name: 'Princess Seam Woven Blouse', type: 'Blouse', description: 'Elegant tailored girls blouse with rounded Peter Pan collar and micro-pleated sleeve cuffs.', colors: ['White', 'Pastel Pink'], sizes: ['S', 'M', 'L'], fabric: 'Superfine Oxford Easy-Iron Woven' },
          { id: 'PRIM_MDL003', name: 'Traditional Boxer-Pleat Jumper', type: 'Jumper', description: 'High-waisted school jumper with wide shoulder straps, deep hidden pockets, and adjustable buckles.', colors: ['Navy Blue', 'Forest Green', 'Burgundy'], sizes: ['S', 'M', 'L'], fabric: 'Poly-Viscose Heavy-Duty Twill' },
          { id: 'PRIM_MDL004', name: 'Tailored Flat-Front Academy Trouser', type: 'Trouser', description: 'Premium boys dress pants with reinforced double-knee patch and stretch comfort waistband.', colors: ['Charcoal Grey', 'Navy Blue', 'Khaki'], sizes: ['S', 'M', 'L', 'XL'], fabric: 'Stain-Resistant Teflon Coated Twill' }
        ]
      },
      {
        pageNumber: 3,
        title: 'Primary Daily Wear (Models 013 - 024)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtV8ToWtHx-L0X1DwdVoiB90vbI4gFpiXIqshWTyrT3JOsIn6JGstwTA0X052pad4-hEBkA4S8b29g7RHziGdVv35ctIJtQd6sjtas2x-kEaZFOyKjbsvks3XA8QFRfLSZejYC0p1FaS-0Gyud_1dH3O246ve-P8DJnQu6MUGDi9Fw17Nwf3jnMlDTKgrDLv-Fi-mOv5NN-AJyKP6YlONxf1GgYpXNnsTVe1syr2gDjcWCCInwjVVcSxcN0BfmvaRYpEioO-Sr1T_P',
        description: 'Detailed formal skirts, dual-toned knits, and modern utility pocket shirts.',
        models: [
          { id: 'PRIM_MDL013', name: 'Pleated Academy Tartan Kilt', type: 'Kilt', description: 'Fully pleated back with flat front panel, side buckle closures, and comfortable lining.', colors: ['Red-Green Tartan', 'Blue-Grey Tartan'], sizes: ['S', 'M', 'L', 'XL'], fabric: 'Poly-Viscose Premium Woven' },
          { id: 'PRIM_MDL014', name: 'V-Neck Classic Pullover Sweatshirt', type: 'Sweatshirt', description: 'Ribbed neckline, hem, and cuffs with custom golden piping details. Ultra-warm fleece backing.', colors: ['Navy Blue', 'Burgundy', 'Bottle Green'], sizes: ['S', 'M', 'L', 'XL'], fabric: '70% Cotton, 30% Thermal Polyester' }
        ]
      },
      {
        pageNumber: 4,
        title: 'Primary Daily Wear (Models 025 - 036)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCARFF6Fp7p3HPt1TcgWoQQ2E7KSV_GoKwklIUd_ZgwCMUIaXnOi7fxwg4FwNyaVEaTrBLyStspm8bmKL0BRemGq8LphEVEn_76P5jKtnDIpR2nGOUp2VcKIEDZCXswxSi36W94T-TPhHXWbZLqJSefHMUi-mED9TLYNoin7s2DaPTNMm1E1Xih45Vs40DVA6PJcFQeqlb0i2iso-G-An_0NEO40lgmwkfntP_pK6FSdvivMx5xSAVf87RMxj65Y9hMqYdep87xSHp',
        description: 'Structured formal oxford shirts, modern neckties, and layered cardigans.',
        models: [
          { id: 'PRIM_MDL025', name: 'Premium Oxford Long-Sleeve Shirt', type: 'Oxford Shirt', description: 'Classic button-down collar with single chest patch pocket and custom embroidered crest.', colors: ['Classic Blue', 'Optical White'], sizes: ['S', 'M', 'L', 'XL'], fabric: '100% Cotton Structured Oxford' },
          { id: 'PRIM_MDL026', name: 'Fine Knit Comfort Cardigan', type: 'Knitwear', description: 'Button-up soft-spun school cardigan with deep front utility patch pockets.', colors: ['Heather Grey', 'Navy Blue'], sizes: ['S', 'M', 'L'], fabric: 'Superfine Merino-Acrylic Blend' }
        ]
      },
      {
        pageNumber: 5,
        title: 'Primary Daily Wear (Models 061 - 075)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4uXlCvJpW6C8MjoGkymlvixCp3_r3isQUCltPVS8EPe8Nr2BIWvUuZimVYVz50OsJK-F3poHIplOmyn8Is7Olw11swEpYlLqQzn5oYIP9jm19uAf5bxHVc_WpMeL9BuSoTSrLU2y4uAo8TKhyeOUffEdqXJhu0OVYkfhmA7Pr6fKxE4WQdGVnG9hMAzytdo3999h39eaU9UyRG7xW23yTFkJpwOrfsOx45J0hgIHU1hW61lG2QHHemvPm2u9yBDQeLXyQ2ssxhRIc',
        description: 'Detailed primary day wear including modern polo-layer collars, secondary crest tunics, and active button-ups.',
        models: [
          { id: 'PRIM_MDL074', name: 'Double-Breasted Primary Tunic', type: 'Tunic', description: 'Elegant double-breasted primary school tunic with integrated smart pleated skirt, comfort-stretch side panels, and deep storage pockets.', colors: ['Navy Blue', 'Forest Green', 'Burgundy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], fabric: '65% Poly, 35% Viscose Easy-Care Blend' },
          { id: 'PRIM_MDL075', name: 'Signature Micro-Weave Cotton Polo', type: 'Polo Shirt', description: 'Super-soft combed cotton polo featuring reinforced three-button placket, double-knit collar, and custom cuffs.', colors: ['Optical White', 'Sky Blue', 'Pastel Pink'], sizes: ['S', 'M', 'L', 'XL'], fabric: '100% Superfine Combed Cotton' }
        ]
      }
    ]
  },
  {
    id: 'sports-wear',
    title: 'Sports & House Edition',
    description: 'Aero-knit moisture-wicking tees, raglan cuts, and tracksuits optimized for physical sports tracking.',
    icon: 'Sparkles',
    pages: [
      {
        pageNumber: 6,
        title: 'Sports Wear Uniforms (House Series)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJAFrCzll3wIV-dKn0j3uhu71X3erOxYH1s8EprejeuwOjy1rK-MqnShBZrJKqP7AtoUhODWxVEJuOpv74afRppu9xVkp6j_PZQvBSV0R77y9JERW4qgcx5ozT3rK3aQoh6ISvEKTDzUETTP0f1eDWEk0P3zdTY3wHH5GugiFwNEM5NY6V3PpWa3fMj38wfh_lJu0lDiMZxTETnjdU4VhG2W5c-qUk6CDDXKN5UydH5m1gH196UMmfVIE2Enzxi5O6yztR_Z_SUr2',
        description: 'Features professional colorblock house tees, lightweight quick-dry track jackets, and matching mesh sports shorts.',
        models: [
          { id: 'SPRT_MDL001', name: 'Active Panel Raglan Tee', type: 'Sports Tee', description: 'Mesh side-ventilating panels with dynamic contrast raglan sleeves for enhanced mobility.', colors: ['Ruby Red', 'Emerald Green', 'Topaz Yellow', 'Sapphire Blue'], sizes: ['S', 'M', 'L', 'XL'], fabric: 'Aero-Dry Performance Polyester Mesh' },
          { id: 'SPRT_MDL002', name: 'Unisex Knit Athletic Track Jacket', type: 'Track Jacket', description: 'Full zipper front with twin zippered pockets, stand-up mock collar, and safety reflective stripes.', colors: ['Navy/Yellow', 'Navy/Red', 'Green/White'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fabric: 'Heavyweight Interlock Knit Polyester' },
          { id: 'SPRT_MDL003', name: 'Breathable Moisture-Wicking Shorts', type: 'Sports Shorts', description: 'Elastic drawcord waistband with lightweight inner mesh lining and double-needle bottom hem.', colors: ['Black', 'Navy Blue', 'Royal Blue'], sizes: ['S', 'M', 'L', 'XL'], fabric: 'CoolMesh Comfort Quick-Dry' }
        ]
      }
    ]
  },
  {
    id: 'woven-series',
    title: 'Woven Academy Series',
    description: 'Elite woven uniform garments, featuring double-breasted dress cuts, custom braided blazer labels, and structured trousers tailored for secondary students.',
    icon: 'Award',
    pages: [
      {
        pageNumber: 7,
        title: 'Woven Academy Collection (Models 060 - 072)',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCARFF6Fp7p3HPt1TcgWoQQ2E7KSV_GoKwklIUd_ZgwCMUIaXnOi7fxwg4FwNyaVEaTrBLyStspm8bmKL0BRemGq8LphEVEn_76P5jKtnDIpR2nGOUp2VcKIEDZCXswxSi36W94T-TPhHXWbZLqJSefHMUi-mED9TLYNoin7s2DaPTNMm1E1Xih45Vs40DVA6PJcFQeqlb0i2iso-G-An_0NEO40lgmwkfntP_pK6FSdvivMx5xSAVf87RMxj65Y9hMqYdep87xSHp',
        description: 'Features premium formal blazer structures, double-breasted neck alignments, and school-branded tailored slacks.',
        models: [
          { id: 'HOU_STL06_1', name: 'Premium House-Colored Tailored Blazer', type: 'Academy Blazer', description: 'Superbly tailored school blazer featuring contrast house-colored pocket linings, dynamic shoulder padding, and double-stitched reinforced lapels.', colors: ['Navy with Gold trim', 'Black with Red trim', 'Burgundy with Silver trim'], sizes: ['S', 'M', 'L', 'XL', 'XXL'], fabric: '70% Wool, 30% Polyester High-Density Blend' },
          { id: 'HOU_STL06_2', name: 'Signature Pleated Woven Skirt', type: 'Woven Skirt', description: 'Comfort-fit tailored woven school skirt with deep inner lining, side safety zipper, and permanent heat-set box pleating.', colors: ['Navy Blue', 'Charcoal Grey', 'Khaki'], sizes: ['S', 'M', 'L', 'XL'], fabric: '65% Poly, 35% Viscose Premium Blend' }
        ]
      }
    ]
  }
];
