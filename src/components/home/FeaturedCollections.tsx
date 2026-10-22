import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { chatGptImage } from './constants';

const COLLECTIONS = [
  { label: 'Primary Uniforms', slug: 'uniform-primary-daily', src: '/images/ridhvick_primary_dress_combo_one.png' },
  { label: 'Secondary Uniforms', slug: 'uniform-secondary-daily', src: chatGptImage('08_57_05') },
  { label: 'Sports Uniforms', slug: 'uniform-primary-sports', src: '/images/ridhvick_primary_dress_sports_two.png' },
  { label: 'Kindergarten Uniforms', slug: 'uniform-kindergarten', src: '/images/ridhvick_kindgarden_two.png' },
  { label: 'Blazers', slug: 'blazers', src: '/images/ridhvick_blazer_two.png' },
  { label: 'Winter Wear', slug: 'hoodies', src: '/images/ridhvick_hoodies_one.png' },
];

export default function FeaturedCollections() {
  const navigate = useNavigate();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  // Pages are derived from the scroll track itself so the dots stay correct
  // however many cards fit at the current breakpoint.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const pages = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
      setPageCount(pages);
      const maxScroll = track.scrollWidth - track.clientWidth;
      const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
      setPage(Math.round(ratio * (pages - 1)));
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollByPage = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth, behavior: 'smooth' });
  };

  const goToPage = (p: number) => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    track.scrollTo({ left: pageCount > 1 ? (p / (pageCount - 1)) * maxScroll : 0, behavior: 'smooth' });
  };

  return (
    <section id="catalog" className="bg-gradient-to-b from-[#f3f7fc] to-[#eef3fa] py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-[36px] font-headline font-black text-brand-blue uppercase leading-[1.1] tracking-tight">
            Featured
            <br />
            Collections
          </h2>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed max-w-xs">
            Popular uniform sets loved by schools across India. Premium fabric, modern designs and lasting comfort.
          </p>
          <button
            onClick={() => navigate('/catalog/uniform-primary-daily')}
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brand-blue text-white font-headline font-bold text-xs sm:text-sm hover:bg-brand-blue-light transition-colors cursor-pointer"
          >
            View All Collections <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative min-w-0">
          <button
            onClick={() => scrollByPage(-1)}
            aria-label="Previous collections"
            className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md text-brand-blue items-center justify-center hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {COLLECTIONS.map((c) => (
              <button
                key={c.slug}
                onClick={() => navigate(`/catalog/${c.slug}`)}
                className="group snap-start shrink-0 basis-[78%] sm:basis-[calc((100%-16px)/2)] lg:basis-[calc((100%-32px)/3)] bg-white rounded-2xl overflow-hidden shadow-[0_6px_20px_rgba(0,52,111,0.08)] text-left cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#eef3fa]">
                  <img
                    src={c.src}
                    alt={c.label}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="py-3.5 text-center text-sm font-headline font-bold text-[#0d1b3e]">{c.label}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollByPage(1)}
            aria-label="Next collections"
            className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-md text-brand-blue items-center justify-center hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === page ? 'w-2 bg-brand-blue' : 'w-2 bg-brand-border/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
