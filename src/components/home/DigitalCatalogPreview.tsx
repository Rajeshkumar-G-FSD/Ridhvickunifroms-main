import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { chatGptImage } from './constants';

const CATALOGS = [
  { title: 'School Uniform', sub: 'Collection', slug: 'uniform-secondary-daily', src: chatGptImage('08_21_21') },
  { title: 'Sports Uniform', sub: 'Collection', slug: 'uniform-secondary-sports', src: '/images/ridhvick_secondary_adultsdress_sports_one.png' },
  { title: 'Blazers & Accessories', sub: 'Catalog', slug: 'blazers', src: '/images/ridhvick_blazer_three.png' },
];

interface DigitalCatalogPreviewProps {
  onViewCatalog: () => void;
}

export default function DigitalCatalogPreview({ onViewCatalog }: DigitalCatalogPreviewProps) {
  const navigate = useNavigate();

  return (
    <section id="digital-catalog" className="bg-white py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-10 items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-headline font-black text-brand-blue uppercase leading-[1.05] tracking-tight">
            Digital
            <br />
            Catalog
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed max-w-xs">
            Browse our latest uniform designs, fabrics and collections online.
          </p>
          <button
            onClick={onViewCatalog}
            className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brand-blue text-white font-headline font-bold text-sm hover:bg-brand-blue-light transition-colors cursor-pointer"
          >
            View Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATALOGS.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate(`/catalog/${c.slug}`)}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-border/30 shadow-[0_6px_20px_rgba(0,52,111,0.08)] hover:shadow-[0_12px_28px_rgba(0,52,111,0.15)] transition-shadow text-left cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#eef3fa]">
                <img
                  src={c.src}
                  alt={`${c.title} ${c.sub}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                <span className="text-[13px] leading-snug">
                  <span className="block font-headline font-bold text-[#0d1b3e]">{c.title}</span>
                  <span className="block text-brand-muted">{c.sub}</span>
                </span>
                <span className="w-7 h-7 shrink-0 rounded-full border border-brand-blue/60 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
