import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { WHATSAPP_QUOTE_LINK } from '../../lib/contact';
import { chatGptImage } from './constants';

// Full-bleed hero carousel: the active slide fills the background with its
// story on the left; the upcoming slides queue up as cards on the right.
// Picking a card (or prev/next, arrow keys, autoplay) brings it forward.

interface Slide {
  id: string;
  /** Small label above the headline and on the card. */
  eyebrow: string;
  /** Card title. */
  title: string;
  /** Large headline when active. */
  heading: string;
  description: string;
  image: string;
  /** Background focus point (keeps faces in frame). */
  focus: string;
  to: string;
  cta: string;
}

const SLIDES: Slide[] = [
  {
    id: 'brand',
    eyebrow: 'Tirupur | Chennai',
    title: 'Ridhvick Uniforms',
    heading: 'One Partner. Every Uniform Solution.',
    description:
      'Ridhvick Uniforms provides premium-quality uniforms and branded uniform fabrics for schools, educational institutions, corporate organizations, industries, dealers and retailers.',
    image: chatGptImage('09_12_14'),
    focus: 'center 22%',
    to: '/our-uniform-solutions',
    cta: 'Our Uniform Solutions',
  },
  {
    id: 'school',
    eyebrow: 'Schools & Institutions',
    title: 'School Uniforms',
    heading: 'School Uniforms Designed for Everyday Excellence',
    description: 'Premium school uniforms designed for comfort, durability and a smart appearance.',
    image: chatGptImage('08_57_05'),
    focus: 'center 22%',
    to: '/school-uniforms',
    cta: 'Explore School Uniforms',
  },
  {
    id: 'primary',
    eyebrow: 'Primary School',
    title: 'Daily Wear',
    heading: 'Primary Daily Wear',
    description: 'Crisp, easy-care daily wear combos built for the primary school routine.',
    image: chatGptImage('08_21_21'),
    focus: 'center 22%',
    to: '/catalog/uniform-primary-daily',
    cta: 'View Collection',
  },
  {
    id: 'sports',
    eyebrow: 'Sports Wear & T-Shirts',
    title: 'Sports Wear',
    heading: 'Designed for Movement. Made for Performance.',
    description: 'Comfortable sports uniforms, house T-shirts, tracksuits and activity wear.',
    image: '/images/ridhvick_secondary_adultsdress_sports_seven.png',
    focus: 'center 18%',
    to: '/sports-wear-t-shirts',
    cta: 'Explore Sports Wear',
  },
  {
    id: 'winter',
    eyebrow: 'Winter Wear',
    title: 'Hoodies',
    heading: 'Sweaters & Winter Wear',
    description: 'Warm, comfortable fleece hoodies for cool-weather school days.',
    image: '/images/ridhvick_hoodies_four.png',
    focus: 'center 25%',
    to: '/catalog/hoodies',
    cta: 'View Collection',
  },
  {
    id: 'camendo',
    eyebrow: 'Outdoor & Activity',
    title: 'Camendo',
    heading: 'Camendo Uniforms',
    description: 'Rugged camo-inspired uniform styling for outdoor and activity days.',
    image: '/images/ridhvick_camndo_one.png',
    focus: 'center 22%',
    to: '/catalog/camendo',
    cta: 'View Collection',
  },
];

const AUTOPLAY_MS = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroCarousel() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const count = SLIDES.length;
  const slide = SLIDES[active];

  const go = useCallback((index: number) => setActive(((index % count) + count) % count), [count]);
  const next = useCallback(() => go(active + 1), [go, active]);
  const prev = useCallback(() => go(active - 1), [go, active]);

  // Upcoming slides, in order, after the active one
  const queue = Array.from({ length: count - 1 }, (_, k) => SLIDES[(active + 1 + k) % count]);

  // Preload every slide image so transitions never wait on the network
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  // Only autoplay while the hero is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !reduceMotion && !paused && inView;
  useEffect(() => {
    if (!autoplay) return undefined;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, next, active]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Ridhvick Uniforms highlights"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative w-full overflow-hidden bg-[#0b1b33] text-white min-h-[640px] lg:min-h-[600px] lg:h-[calc(100svh-108px)] xl:h-[calc(100svh-156px)] lg:max-h-[860px]"
    >
      {/* Background — crossfades with a slow zoom */}
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.1, ease: 'easeInOut' }, scale: { duration: AUTOPLAY_MS / 1000 + 1.5, ease: 'linear' } }}
        >
          <img src={slide.image} alt="" aria-hidden className="w-full h-full object-cover" style={{ objectPosition: slide.focus }} />
        </motion.div>
      </AnimatePresence>
      {/* Legibility: deep navy wash from the left and the bottom */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061328]/95 via-[#061328]/70 to-[#061328]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061328]/85 via-transparent to-[#061328]/30" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-6 md:px-8 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-10 pt-12 pb-8 lg:pt-0 lg:pb-16">
        {/* Story */}
        <div className="lg:w-[44%] lg:pb-24" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09 } },
                exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
            >
              {[
                <p key="e" className="text-sm sm:text-base font-headline font-semibold tracking-wide text-brand-green-light">
                  {slide.eyebrow}
                </p>,
                <h1
                  key="h"
                  className="mt-3 text-[32px] min-[400px]:text-4xl sm:text-5xl xl:text-[58px] font-headline font-extrabold leading-[1.08] tracking-tight"
                >
                  {slide.heading}
                </h1>,
                <p key="d" className="mt-5 max-w-xl text-[15px] sm:text-lg text-white/85 leading-relaxed">
                  {slide.description}
                </p>,
                <div key="c" className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={WHATSAPP_QUOTE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-green text-white font-headline font-bold text-sm tracking-wide hover:bg-brand-green-dark transition-colors"
                  >
                    GET A QUOTE <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => navigate(slide.to)}
                    className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-white/60 text-white font-headline font-bold text-sm hover:bg-white hover:text-brand-blue transition-colors cursor-pointer"
                  >
                    {slide.cta} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>,
              ].map((child) => (
                <motion.div
                  key={child.key}
                  variants={{
                    hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: EASE } },
                    exit: { opacity: 0, y: -14, filter: 'blur(6px)', transition: { duration: 0.35, ease: 'easeIn' } },
                  }}
                >
                  {child}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Upcoming slides + controls */}
        <div className="lg:flex-1 min-w-0 lg:-mr-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <ul className="flex gap-4 sm:gap-5 overflow-hidden" aria-label="Upcoming highlights">
            <AnimatePresence initial={false} mode="popLayout">
              {queue.map((s, k) => (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, x: 80, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: -40, transition: { duration: 0.45, ease: 'easeIn' } }}
                  transition={{ layout: { duration: 0.8, ease: EASE }, duration: 0.8, ease: EASE, delay: k * 0.04 }}
                  className="shrink-0 w-[44%] min-[480px]:w-[34%] sm:w-[28%] lg:w-[30%] xl:w-[27%]"
                >
                  <button
                    onClick={() => go(SLIDES.indexOf(s))}
                    aria-label={`Show ${s.title}`}
                    className="group relative block w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/15 hover:ring-white/50 transition-[box-shadow] cursor-pointer text-left"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 via-30% to-transparent to-60%" />
                    <span className="absolute left-3.5 right-3.5 bottom-3.5 sm:left-4 sm:bottom-4">
                      <span className="block text-[11px] sm:text-xs text-white/85 font-medium">{s.eyebrow}</span>
                      <span className="block mt-1 text-lg sm:text-2xl xl:text-[28px] font-headline font-extrabold leading-[1.05]">
                        {s.title}
                      </span>
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="mt-6 sm:mt-8 flex items-center gap-4 pr-5 sm:pr-8">
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border-[1.5px] border-white/80 flex items-center justify-center hover:bg-white hover:text-brand-blue transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-full border-[1.5px] border-white/80 flex items-center justify-center hover:bg-white hover:text-brand-blue transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            {/* Progress: slide position + time until the next slide */}
            <div className="flex-grow flex items-center gap-4 min-w-0">
              <div className="relative flex-grow h-[2px] bg-white/30 rounded-full overflow-hidden">
                <motion.span
                  className="absolute inset-y-0 left-0 bg-white/60"
                  animate={{ width: `${((active + 1) / count) * 100}%` }}
                  transition={{ duration: 0.8, ease: EASE }}
                />
                <motion.span
                  key={`${slide.id}-${autoplay}`}
                  className="absolute inset-y-0 left-0 bg-brand-green-light"
                  initial={{ width: '0%' }}
                  animate={{ width: autoplay ? '100%' : '0%' }}
                  transition={{ duration: autoplay ? AUTOPLAY_MS / 1000 : 0, ease: 'linear' }}
                />
              </div>
              <span className="shrink-0 text-sm font-headline font-semibold tabular-nums text-white/85">
                {String(active + 1).padStart(2, '0')} <span className="text-white/45">/ {String(count).padStart(2, '0')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
