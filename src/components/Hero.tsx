import { useEffect, useState } from 'react';
import BlurText from './BlurText';

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

      {/* Animated title / tagline */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-end text-center px-4 pb-10 sm:pb-16 md:pb-20 pointer-events-none">
        <BlurText
          text="RIDHVICK UNIFORMS"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-5xl md:text-6xl font-headline font-black text-white tracking-tight drop-shadow-lg"
        />
        <BlurText
          text="Crafting Comfort, Delivering Excellence"
          delay={100}
          animateBy="words"
          direction="bottom"
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-sans font-medium text-white/90 tracking-wide drop-shadow"
        />
      </div>
    </section>
  );
}
