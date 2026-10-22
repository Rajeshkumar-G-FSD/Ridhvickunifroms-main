import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Shirt, Users, GraduationCap, BookOpen, Send } from 'lucide-react';
import { WHATSAPP_QUOTE_LINK, chatGptImage } from './constants';

// Five photo tiles cut on diagonals, separated by white gutters. Coordinates
// live in the SVG's 600x560 viewBox; `align` picks which part of each photo
// survives the "slice" crop.
const TILES = [
  {
    id: 'a',
    points: '40,0 306,0 245,350 0,372',
    src: '/images/ridhvick_secondary_dress_sports_two.png',
    align: 'xMidYMin',
  },
  {
    id: 'b',
    points: '306,0 600,0 600,108 284,198',
    src: '/images/ridhvick_occassions_three.png',
    align: 'xMidYMin',
  },
  {
    id: 'c',
    points: '284,198 600,108 600,322 245,350',
    src: '/images/ridhvick_uniforms_hero_primary_unifroms.png',
    align: 'xMidYMax',
  },
  {
    id: 'd',
    points: '0,372 245,350 330,560 0,560',
    src: chatGptImage('09_12_14'),
    align: 'xMidYMin',
  },
  {
    id: 'e',
    points: '245,350 600,322 600,560 330,560',
    src: '/images/ridhvick_blazer_one.png',
    align: 'xMidYMin',
  },
];

const bbox = (points: string) => {
  const xs: number[] = [];
  const ys: number[] = [];
  points.split(' ').forEach((p) => {
    const [x, y] = p.split(',').map(Number);
    xs.push(x);
    ys.push(y);
  });
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { x, y, width: Math.max(...xs) - x, height: Math.max(...ys) - y };
};

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: ['Premium', 'Quality'] },
  { icon: Shirt, label: ['Wide Range', '& Customisation'] },
  { icon: Users, label: ['Trusted by', 'Schools'] },
];

interface HomeHeroProps {
  onExplore: () => void;
}

export default function HomeHero({ onExplore }: HomeHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full mt-14 sm:mt-24 md:mt-[104px] overflow-hidden bg-gradient-to-br from-white via-[#f5f8fd] to-[#eaf0f9]"
    >
      {/* Faint school doodles behind the copy */}
      <GraduationCap className="absolute left-6 top-6 w-16 h-16 text-brand-blue/[0.06] -rotate-12 pointer-events-none" strokeWidth={1.2} />
      <BookOpen className="absolute left-[40%] top-10 w-14 h-14 text-brand-blue/[0.06] rotate-6 pointer-events-none hidden lg:block" strokeWidth={1.2} />
      <Send className="absolute left-[44%] bottom-24 w-12 h-12 text-brand-blue/[0.07] pointer-events-none hidden lg:block" strokeWidth={1.2} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] items-center gap-8 lg:gap-6 py-10 sm:py-14 lg:py-0">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col lg:py-16"
        >
          <span className="text-[11px] sm:text-xs font-headline font-semibold tracking-[0.3em] text-brand-muted uppercase">
            Premium School Uniforms
          </span>
          <h1 className="mt-4 font-headline font-black uppercase leading-[1.05] text-[32px] sm:text-5xl xl:text-[56px] tracking-tight">
            <span className="block text-brand-blue">Quality Uniforms</span>
            <span className="block text-[#0d1b3e]">For Brighter</span>
            <span className="block text-[#0d1b3e]">Tomorrows</span>
          </h1>
          <span className="mt-5 h-1 w-20 rounded-full bg-brand-blue" />
          <p className="mt-5 max-w-md text-sm sm:text-base text-brand-muted leading-relaxed">
            Thoughtfully designed school and sports uniforms that combine comfort, style and durability.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 h-12 px-6 sm:px-7 rounded-full bg-brand-blue text-white font-headline font-bold text-sm shadow-[0_8px_20px_rgba(0,52,111,0.25)] hover:bg-brand-blue-light transition-colors cursor-pointer"
            >
              Explore Catalog <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-6 sm:px-7 rounded-full border-2 border-brand-blue text-brand-blue bg-white font-headline font-bold text-sm hover:bg-brand-blue hover:text-white transition-colors"
            >
              Get Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-4">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <div key={label[0]} className="flex items-center gap-2.5">
                <span className="w-11 h-11 rounded-full bg-white border border-brand-border/40 shadow-sm flex items-center justify-center text-brand-blue">
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <span className="text-xs text-brand-muted leading-tight">
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Diagonal photo collage */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative lg:-mr-8 xl:-mr-16"
        >
          <svg viewBox="0 0 600 560" className="w-full h-auto block" role="img" aria-label="Students wearing Ridhvick school and sports uniforms">
            <defs>
              {/* Big arc softens the collage's left edge into the page */}
              <clipPath id="hero-collage-outline">
                <circle cx="760" cy="280" r="770" />
              </clipPath>
              {TILES.map((t) => (
                <clipPath key={t.id} id={`hero-tile-${t.id}`}>
                  <polygon points={t.points} />
                </clipPath>
              ))}
            </defs>
            <g clipPath="url(#hero-collage-outline)">
              {TILES.map((t) => {
                const b = bbox(t.points);
                return (
                  <image
                    key={t.id}
                    href={t.src}
                    x={b.x}
                    y={b.y}
                    width={b.width}
                    height={b.height}
                    preserveAspectRatio={`${t.align} slice`}
                    clipPath={`url(#hero-tile-${t.id})`}
                  />
                );
              })}
              {TILES.map((t) => (
                <polygon
                  key={`${t.id}-gutter`}
                  points={t.points}
                  fill="none"
                  stroke="white"
                  strokeWidth={9}
                  strokeLinejoin="round"
                />
              ))}
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
