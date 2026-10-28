import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import Header from '../components/Header';
import AiChatAssistant from '../components/AiChatAssistant';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import DigitalCatalog from '../components/DigitalCatalog';
import HomeHero from '../components/home/HomeHero';
import UniformSolutions from '../components/home/UniformSolutions';
import UniformCategories from '../components/home/UniformCategories';
import FeaturedCollections from '../components/home/FeaturedCollections';
import WhyChoose from '../components/home/WhyChoose';
import AboutUs from '../components/home/AboutUs';
import DigitalCatalogPreview from '../components/home/DigitalCatalogPreview';
import ManufacturingProcess from '../components/home/ManufacturingProcess';
import CtaBanner from '../components/home/CtaBanner';
import { Product, CartItem } from '../types';
import { HOME_SECTIONS, sectionForPath, sectionPath } from '../data/homeSections';

const SECTIONS = HOME_SECTIONS.map((s) => s.id);
const SITE_TITLE = 'Ridhvick Uniforms | School & Sports Uniform Manufacturer';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isFirstRender = useRef(true);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState<boolean>(false);

  const scrollToSection = (sectionId: string, behavior: ScrollBehavior = 'smooth') => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior });
    }
    setActiveSection(sectionId);
  };

  // Menu / link clicks: put the section's own URL in the address bar (the
  // effect below then scrolls). Re-clicking the current URL just scrolls.
  const handleNavigate = (sectionId: string) => {
    const path = sectionPath(sectionId);
    if (path === location.pathname) scrollToSection(sectionId);
    else navigate(path);
  };

  // The URL decides which section to show: /why-ridhvick-uniforms scrolls to
  // that section, on first load and on every in-app navigation.
  useEffect(() => {
    const section = sectionForPath(location.pathname) ?? HOME_SECTIONS[0];
    document.title = section.id === 'hero' ? SITE_TITLE : `${section.title} | Ridhvick Uniforms`;
    const wasFirstRender = isFirstRender.current;
    isFirstRender.current = false;
    // A plain visit to "/" stays at the top as the browser loaded it.
    if (section.id === 'hero' && wasFirstRender) return;
    const firstLoad = window.scrollY === 0;
    scrollToSection(section.id, firstLoad ? 'auto' : 'smooth');
    // Images above the section can shift layout while loading on a fresh
    // visit, so settle the position once more shortly after.
    const t = firstLoad && section.id !== 'hero' ? window.setTimeout(() => scrollToSection(section.id, 'auto'), 700) : undefined;
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Section highlighting for the header nav pill
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Arriving here from a different page (e.g. a Catalog category page) via a nav
  // link that targets a homepage section — jump straight to that section once mounted.
  useEffect(() => {
    const scrollTarget = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTarget) {
      navigate(sectionPath(scrollTarget), { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock page scroll and allow Escape while the flipbook overlay is open
  useEffect(() => {
    if (!isFlipbookOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsFlipbookOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isFlipbookOpen]);

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, selectedSize: size, quantity }];
    });
    setIsFlipbookOpen(false);
    setIsCartOpen(true);
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleUpdateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-brand-yellow selection:text-brand-blue overflow-x-hidden">
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow flex flex-col">
        <HomeHero />
        {/* Brief-specified home sections, directly below the hero */}
        <UniformSolutions />
        <WhyChoose />
        <ManufacturingProcess />
        <CtaBanner />
        {/* Catalog browsing sections */}
        <UniformCategories />
        <AboutUs />
        <FeaturedCollections />
        <DigitalCatalogPreview onViewCatalog={() => setIsFlipbookOpen(true)} />
      </main>

      <Footer onNavigate={handleNavigate} />

      {/* Interactive flipbook catalogue, opened from "View Catalog" */}
      <AnimatePresence>
        {isFlipbookOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-blue/50 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsFlipbookOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative max-w-7xl mx-auto my-6 sm:my-10 bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFlipbookOpen(false)}
                aria-label="Close catalog"
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white shadow-md text-brand-blue flex items-center justify-center hover:bg-brand-light cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <DigitalCatalog onAddToCart={handleAddToCart} onOpenCart={() => setIsCartOpen(true)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AiChatAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpen={() => setIsAiAssistantOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />
    </div>
  );
}
