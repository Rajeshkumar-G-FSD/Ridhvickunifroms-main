import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CatalogItem } from '../types';
import { subscribeToCatalogItems } from '../lib/catalogService';
import { getCategoryPage } from '../data/categoryPages';

export default function ShowcaseCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryLabel = (category && getCategoryPage(category)?.label) ?? category;

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const unsubscribe = subscribeToCatalogItems(
      (next) => {
        setItems(next.filter((item) => item.category === category));
        setIsLoading(false);
      },
      () => setIsLoading(false)
    );
    return unsubscribe;
  }, [category]);

  const goToHomeSection = (sectionId: string) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

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
        <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-brand-muted mb-4">
          <button onClick={() => navigate('/showcase')} className="hover:text-brand-blue transition-colors cursor-pointer">
            Showcase
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-blue">{categoryLabel}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-black text-brand-blue mb-8">
          {categoryLabel}
        </h1>

        {isLoading ? (
          <p className="text-sm text-brand-muted font-sans">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-brand-muted font-sans">No items in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-brand-border/20 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
              >
                <div className="h-52 bg-brand-light overflow-hidden">
                  {item.images[0] && (
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>
                {item.images.length > 1 && (
                  <div className="flex gap-1.5 p-2 overflow-x-auto">
                    {item.images.slice(1).map((url) => (
                      <img key={url} src={url} alt="" className="w-12 h-12 rounded-md object-cover shrink-0" />
                    ))}
                  </div>
                )}
                <div className="p-4 border-t-4 border-brand-blue">
                  <h3 className="text-sm sm:text-base font-headline font-bold text-brand-blue">{item.title}</h3>
                  <p className="text-xs text-brand-muted font-sans mt-1">{item.name}</p>
                  <p className="text-xs text-brand-muted font-sans mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer onNavigate={goToHomeSection} />
    </div>
  );
}
