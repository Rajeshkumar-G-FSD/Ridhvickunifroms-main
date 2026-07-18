import { useEffect, useState } from 'react';

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
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-brand-dark"
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
    </section>
  );
}
