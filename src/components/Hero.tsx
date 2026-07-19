import { useEffect, useState } from 'react';
import CircularText from './CircularText';

const heroImages = [
  '/images/ridhvick_uniforms_hero_boys.png',
  '/images/ridhvick_uniforms_hero_digital_print.png',
  '/images/ridhvick_uniforms_hero_girls_top.png',
  '/images/ridhvick_uniforms_hero_girs_sports.png',
  '/images/ridhvick_uniforms_hero_kids_uniform.png',
  '/images/ridhvick_uniforms_hero_kids.png',
  '/images/ridhvick_uniforms_hero_polo.png',
  '/images/ridhvick_uniforms_hero_primary_unifroms.png',
];

const SLIDE_INTERVAL_MS = 3000;

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full mt-14 sm:mt-24 md:mt-[104px] h-[78vh] sm:h-[calc(100vh-96px)] md:h-[calc(100vh-104px)] min-h-[440px] sm:min-h-[520px] md:min-h-[640px] overflow-hidden bg-brand-dark"
    >
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={src}
            alt=""
            className={`w-full h-full object-cover ${
              index === activeIndex ? 'animate-hero-kenburns' : ''
            }`}
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Legibility gradient behind the animated title */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent pointer-events-none" />

      {/* Spinning circular brand badge, top-right */}
      <div className="absolute -top-2 -right-2 sm:top-1 sm:right-1 md:top-4 md:right-6 z-30 scale-[0.45] sm:scale-[0.6] md:scale-[0.8] lg:scale-100 origin-top-right">
        <CircularText
          text="RIDHVICK*UNIFORMS*"
          onHover="speedUp"
          spinDuration={20}
          className="bg-brand-blue/90 backdrop-blur-md border border-white/15 shadow-lg"
          logoSrc="/images/ridhvick-logo.png"
          logoAlt="Ridhvick Uniforms"
          logoClassName="w-16 h-16 sm:w-20 sm:h-20 object-contain"
        />
      </div>
    </section>
  );
}
