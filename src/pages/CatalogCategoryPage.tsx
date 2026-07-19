import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronRight, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AiChatAssistant from '../components/AiChatAssistant';
import CartDrawer from '../components/CartDrawer';
import { AngledSlider } from '../components/lightswind/angled-slider';
import { getCategoryPage } from '../data/categoryPages';
import { CatalogItem } from '../types';
import { subscribeToCatalogItems } from '../lib/catalogService';

export default function CatalogCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [adminItems, setAdminItems] = useState<CatalogItem[]>([]);

  const config = slug ? getCategoryPage(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Admin-added catalog items for this category merge live into the
  // gallery below, alongside the static collection imagery.
  useEffect(() => {
    const unsubscribe = subscribeToCatalogItems((items) => {
      setAdminItems(items.filter((item) => item.category === slug));
    });
    return unsubscribe;
  }, [slug]);

  // Section nav links only exist on the homepage — send the user there and
  // let it pick up the requested section once mounted.
  const goToHomeSection = (sectionId: string) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
        <Header
          cart={[]}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
          activeSection=""
          onNavigate={goToHomeSection}
        />
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
          <h1 className="text-2xl font-headline font-black text-brand-blue">Collection not found</h1>
          <p className="text-sm text-brand-muted mt-2 max-w-sm">
            We couldn't find that catalog category. Head back to explore the full range.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 h-11 px-6 bg-brand-blue text-white font-headline font-bold rounded-lg cursor-pointer"
          >
            Back to Home
          </button>
        </main>
        <Footer onNavigate={goToHomeSection} />
      </div>
    );
  }

  // Admin-added images surface first, ahead of the static collection imagery.
  const adminSliderItems = adminItems.flatMap((item) =>
    item.images.map((url) => ({ url, alt: item.title || item.name }))
  );
  const sliderItems = [...adminSliderItems, ...config.images.map((url) => ({ url, alt: `${config.label} style` }))].map(
    (entry, index) => ({ id: index, ...entry })
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] selection:bg-brand-yellow selection:text-brand-blue overflow-x-hidden">
      <Header
        cart={[]}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        activeSection=""
        onNavigate={goToHomeSection}
      />

      <main className="flex-grow flex flex-col">
        {/* Hero */}
        <section className="relative w-full h-[52vh] sm:h-[62vh] md:h-[72vh] min-h-[360px] overflow-hidden bg-brand-dark">
          <img
            src={config.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/10" />

          <div className="relative z-10 h-full flex flex-col items-start justify-end max-w-7xl mx-auto w-full px-4 md:px-8 pb-10 sm:pb-14">
            <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-white/60 mb-3">
              <button onClick={() => navigate('/')} className="hover:text-brand-yellow transition-colors cursor-pointer">Home</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => goToHomeSection('catalog')} className="hover:text-brand-yellow transition-colors cursor-pointer">Catalog</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/90">{config.label}</span>
            </div>
            <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-yellow tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full inline-block">
              Ridhvick Collection
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-white mt-3 leading-tight">
              {config.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-white/70 mt-2.5 max-w-xl font-sans leading-relaxed">
              {config.heroSubtitle}
            </p>
          </div>
        </section>

        {/* 3D Angled Gallery Slider */}
        <section className="bg-brand-dark pt-10 sm:pt-14 pb-2">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-2">
            <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-yellow tracking-widest uppercase">
              Style Gallery
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-headline font-black text-white mt-2">
              Explore the {config.label} Collection
            </h2>
          </div>
          <AngledSlider items={sliderItems} speed={32} />
        </section>

        {/* CTA */}
        <section className="bg-white py-10 sm:py-14 border-t border-brand-border/10">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center flex flex-col items-center gap-4">
            <h3 className="text-lg sm:text-xl font-headline font-black text-brand-blue">
              Interested in {config.label}?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Reach out for bulk pricing, custom sizing runs, or embroidery options on this collection.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
              <button
                onClick={() => goToHomeSection('contact')}
                className="h-11 px-6 bg-brand-blue hover:bg-brand-blue-light text-white font-headline font-bold rounded-lg transition-colors cursor-pointer text-xs"
              >
                Request a Quote
              </button>
              <button
                onClick={() => setIsAiAssistantOpen(true)}
                className="h-11 px-6 flex items-center gap-2 border border-brand-border/30 hover:bg-brand-light text-brand-blue font-headline font-bold rounded-lg transition-colors cursor-pointer text-xs"
              >
                <MessageCircle className="w-4 h-4" />
                Ask the AI Assistant
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={goToHomeSection} />

      <AiChatAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpen={() => setIsAiAssistantOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={[]}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClearCart={() => {}}
      />
    </div>
  );
}
