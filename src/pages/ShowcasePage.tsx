import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CatalogItem } from '../types';
import { subscribeToCatalogItems } from '../lib/catalogService';
import { getCategoryPage } from '../data/categoryPages';

export default function ShowcasePage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const unsubscribe = subscribeToCatalogItems(
      (next) => {
        setItems(next);
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
    return unsubscribe;
  }, []);

  const goToHomeSection = (sectionId: string) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  const categories = useMemo(() => {
    const map = new Map<string, { label: string; cover?: string; count: number }>();
    items.forEach((item) => {
      const existing = map.get(item.category);
      if (existing) {
        existing.count += 1;
        if (!existing.cover && item.images[0]) existing.cover = item.images[0];
      } else {
        map.set(item.category, {
          label: getCategoryPage(item.category)?.label ?? item.category,
          cover: item.images[0],
          count: 1,
        });
      }
    });
    return Array.from(map.entries()).map(([slug, data]) => ({ slug, ...data }));
  }, [items]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <Header
        cart={[]}
        onOpenCart={() => {}}
        onOpenAiAssistant={() => {}}
        activeSection=""
        onNavigate={goToHomeSection}
      />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 md:px-8 pt-28 pb-16">
        <div className="mb-8 text-center">
          <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-yellow-hover tracking-widest uppercase">
            Live Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-black text-brand-blue mt-2">
            Showcase Collections
          </h1>
        </div>

        {isLoading ? (
          <p className="text-sm text-brand-muted font-sans text-center">Loading collections…</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-brand-muted font-sans text-center">No catalog items published yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => navigate(`/showcase/${encodeURIComponent(cat.slug)}`)}
                className="group relative h-44 sm:h-56 rounded-xl overflow-hidden bg-brand-dark cursor-pointer text-left"
              >
                {cat.cover ? (
                  <img
                    src={cat.cover}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-80 transition-all duration-300"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                <div className="relative z-10 h-full flex flex-col items-start justify-end p-4">
                  <h3 className="text-sm sm:text-base font-headline font-black text-white capitalize">
                    {cat.label}
                  </h3>
                  <p className="text-[11px] text-white/70 font-sans mt-0.5">
                    {cat.count} item{cat.count === 1 ? '' : 's'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      <Footer onNavigate={goToHomeSection} />
    </div>
  );
}
