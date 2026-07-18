import { Sparkles, Shirt, Zap, Award } from 'lucide-react';
import ScrollCarousel, { FeatureItem } from './lightswind/scroll-carousel';

// Titles, descriptions and topic order are pulled directly from
// src/data/catalogPages.ts (CATALOG_TOPICS) so this showcase never drifts
// out of sync with the real catalog copy.
const features: FeatureItem[] = [
  {
    icon: Sparkles,
    title: 'Kindergarten Series',
    description:
      'Playful, comfortable, and durable uniforms tailored for early learners. Featuring anti-pilling materials and easy-wear elasticated waists.',
    image: '/images/ridhvick_Our_Collections_Catalog_kids_garden.png',
  },
  {
    icon: Shirt,
    title: 'Primary Daily Wear',
    description:
      'Elegant, crisp daily school wear designed to endure active playground hours and structural formal assemblies.',
    image: '/images/ridhvick_uniforms_hero_primary_unifroms.png',
  },
  {
    icon: Zap,
    title: 'Sports & House Edition',
    description:
      'Aero-knit moisture-wicking tees, raglan cuts, and tracksuits optimized for physical sports tracking.',
    image: '/images/ridhvick_uniforms_hero_girs_sports.png',
  },
  {
    icon: Award,
    title: 'Woven Academy Series',
    description:
      'Elite woven uniform garments, featuring double-breasted dress cuts, custom braided blazer labels, and structured trousers tailored for secondary students.',
    image: '/images/ridhvick_Our_Collections_Catalog_House_kids.png',
  },
];

export default function DailySportsShowcase() {
  return (
    <section id="daily-sports" className="relative w-full bg-brand-dark overflow-hidden">
      {/* Section heading */}
      <div className="relative z-20 text-center px-4 pt-14 sm:pt-20 md:pt-24 pb-2">
        <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-yellow tracking-widest uppercase bg-white/10 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full inline-block backdrop-blur-sm">
          Everyday & Active Wear
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-headline font-black text-white mt-2.5 sm:mt-4 drop-shadow-lg">
          Daily & Sports Uniforms
        </h2>
        <p className="text-xs sm:text-sm text-white/60 mt-2.5 sm:mt-3 max-w-xl mx-auto font-sans leading-relaxed">
          Scroll to explore each collection — from kindergarten play-wear to tailored academy blazers.
        </p>
      </div>

      {/* Scroll-pinned feature carousel (desktop pans horizontally while
          pinned; stacks and fades in vertically on mobile) */}
      <ScrollCarousel features={features} className="pb-8 md:pb-0" />
    </section>
  );
}
