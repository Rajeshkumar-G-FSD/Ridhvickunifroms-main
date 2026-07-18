import { useEffect, useState } from 'react';

const dailySportsImages = [
  { src: '/images/ridhvick_primary__dailykids_unifomrs_one.png', alt: 'Primary Daily Wear Uniform' },
  { src: '/images/ridhvick_primary__dailykids_sports_unifomrs_one.png', alt: 'Primary Sports Uniform' },
  { src: '/images/ridhvick_primary__dailykids_unifomrs_two.png', alt: 'Primary Daily Wear Uniform' },
  { src: '/images/ridhvick_primary__dailykids_sports_unifomrs_two.png', alt: 'Primary Sports Uniform' },
  { src: '/images/ridhvick_primary__dailykids_unifomrs_three.png', alt: 'Primary Daily Wear Uniform' },
  { src: '/images/ridhvick_primary__dailykids_sports_unifomrs_three.png', alt: 'Primary Sports Uniform' },
  { src: '/images/ridhvick_primary__dailykids_unifomrs_four.png', alt: 'Primary Daily Wear Uniform' },
  { src: '/images/ridhvick_primary__dailykids_sports_unifomrs_four.png', alt: 'Primary Sports Uniform' },
  { src: '/images/ridhvick_primary__dailykids_unifomrs_five.png', alt: 'Primary Daily Wear Uniform' },
  { src: '/images/ridhvick_secondary__dailykids_sports_unifomrs_one.png', alt: 'Secondary Sports Uniform' },
  { src: '/images/ridhvick_secondary__dailykids_sports_unifomrs_two.png', alt: 'Secondary Sports Uniform' },
  { src: '/images/ridhvick_secondary__dailykids_sports_unifomrs_three.png', alt: 'Secondary Sports Uniform' },
];

const SLIDE_INTERVAL_MS = 3000;

export default function DailySportsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dailySportsImages.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="daily-sports"
      className="relative w-full h-screen min-h-[640px] overflow-hidden bg-brand-dark flex items-center justify-center"
    >
      {/* Section heading overlay */}
      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 text-center px-4">
        <span className="text-xs font-headline font-bold text-brand-yellow tracking-widest uppercase bg-white/10 px-3.5 py-1.5 rounded-full inline-block backdrop-blur-sm">
          Everyday & Active Wear
        </span>
        <h2 className="text-3xl md:text-5xl font-headline font-black text-white mt-4 drop-shadow-lg">
          Daily & Sports Uniforms
        </h2>
      </div>

      {/* Full-bleed crossfading image slides */}
      {dailySportsImages.map((image, index) => (
        <div
          key={image.src}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-[1200ms] ease-in-out ${
            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-contain"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center flex-wrap justify-center gap-2 px-4">
        {dailySportsImages.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${image.alt} ${index + 1}`}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              index === activeIndex ? 'w-6 bg-brand-yellow' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
