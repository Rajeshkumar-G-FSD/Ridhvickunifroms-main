import { Fragment } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Shirt, Users, GraduationCap, BookOpen, Send } from 'lucide-react';
import { WHATSAPP_LINK, WHATSAPP_QUOTE_LINK } from '../../lib/contact';

// The curved photo collage is a single pre-composed image (transparent to the
// left of its outer arc) so it matches the approved design exactly. It is
// stored at 2x for sharp rendering on high-density screens; its aspect ratio
// drives the hero height on large screens.
const COLLAGE_SRC = '/images/ridhvick_hero_collage.webp';
const COLLAGE_RATIO = 1718 / 1388;

const HIGHLIGHTS = [
  { icon: ShieldCheck, label: ['Premium', 'Quality'] },
  { icon: Shirt, label: ['Wide Range', '& Customisation'] },
  { icon: Users, label: ['Trusted by', 'Schools'] },
];

const HERO_NAVY = '#153a7c';

export default function HomeHero() {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#f3f4f7] via-[#fbfcfd] to-[#f4f5f8] lg:h-[min(50.5vw,780px)]"
    >
      {/* Faint school doodles */}
      <GraduationCap
        className="hidden min-[1400px]:block absolute min-[1400px]:left-[4%] min-[1400px]:top-[5%] w-14 h-14 min-[1400px]:w-24 min-[1400px]:h-24 text-[#9aa6bd]/30 -rotate-6 pointer-events-none"
        strokeWidth={1}
      />
      <BookOpen
        className="hidden min-[1400px]:block absolute left-[33%] top-[8%] w-16 h-16 text-[#9aa6bd]/30 pointer-events-none"
        strokeWidth={1}
      />
      <svg
        aria-hidden
        viewBox="0 0 160 110"
        className="hidden min-[1400px]:block absolute left-[37%] top-[64%] w-40 text-[#9aa6bd]/40 pointer-events-none"
      >
        <path d="M4 100 C 40 96, 70 80, 108 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" />
      </svg>
      <Send
        className="hidden min-[1400px]:block absolute left-[47%] top-[62%] w-12 h-12 text-[#9aa6bd]/40 -rotate-12 pointer-events-none"
        strokeWidth={1}
      />

      {/* Copy */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-5 sm:px-6 md:px-8 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full lg:w-[47%] lg:max-w-[600px] pt-10 pb-8 sm:pt-14 lg:py-4"
        >
          <span className="block text-[11px] sm:text-[12px] font-headline font-semibold tracking-[0.2em] text-[#3a3f4a] uppercase">
            Premium Uniform Solutions <br className="hidden lg:block" />
            for Schools &amp; Institutions
          </span>

          <h1 className="mt-4 font-headline font-extrabold uppercase tracking-[-0.01em] leading-[1.1] text-[30px] min-[400px]:text-[34px] sm:text-[44px] lg:text-[clamp(30px,3.3vw,48px)]">
            <span className="block" style={{ color: HERO_NAVY }}>
              One Partner.
            </span>
            <span className="block text-[#121417]">Every Uniform</span>
            <span className="block text-[#121417]">Solution.</span>
          </h1>

          <span className="block mt-5 h-[4px] w-20 rounded-full bg-brand-green" />

          <p className="mt-5 max-w-[540px] text-[15px] sm:text-[16px] lg:text-[15px] xl:text-[17px] text-[#333840] leading-relaxed">
            Ridhvick Uniforms provides premium-quality uniforms and branded uniform fabrics for schools, educational
            institutions, corporate organizations, industries, dealers and retailers.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 h-12 xl:h-[52px] px-7 xl:px-9 rounded-full text-white font-headline font-bold text-[14px] tracking-wide shadow-[0_8px_20px_rgba(21,58,124,0.25)] hover:brightness-110 transition"
              style={{ backgroundColor: HERO_NAVY }}
            >
              GET A QUOTE <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 h-12 xl:h-[52px] px-7 xl:px-8 rounded-full border-[1.5px] border-[#153a7c] bg-white text-[#153a7c] font-headline font-bold text-[14px] tracking-wide hover:bg-[#153a7c] hover:text-white transition-colors"
            >
              TALK TO OUR TEAM <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 sm:flex sm:items-center lg:hidden xl:flex">
            {HIGHLIGHTS.map(({ icon: Icon, label }, i) => (
              <Fragment key={label[0]}>
                {i > 0 && <span className="hidden sm:block w-px h-12 bg-[#d4d9e2] mx-3 xl:mx-5" />}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
                  <span className="w-12 h-12 xl:w-[56px] xl:h-[56px] shrink-0 rounded-full bg-[#e0ecff] flex items-center justify-center">
                    <Icon className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.6} style={{ color: HERO_NAVY }} />
                  </span>
                  <span className="text-[12px] xl:text-[14px] text-[#444a55] leading-snug sm:whitespace-nowrap">
                    {label[0]}
                    <br />
                    {label[1]}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Collage: full-bleed to the right edge on large screens, stacked below the copy on smaller ones */}
      <motion.img
        src={COLLAGE_SRC}
        alt="Students in Ridhvick school and sports uniforms"
        width={1718}
        height={1388}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        className="block w-full h-auto lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
        style={{ aspectRatio: COLLAGE_RATIO }}
      />
    </section>
  );
}
