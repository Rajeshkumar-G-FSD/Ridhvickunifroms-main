import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import Header from '../components/Header';
import AiChatAssistant from '../components/AiChatAssistant';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import DigitalCatalog from '../components/DigitalCatalog';
import HomeHero from '../components/home/HomeHero';
import UniformCategories from '../components/home/UniformCategories';
import FeaturedCollections from '../components/home/FeaturedCollections';
import WhyChoose from '../components/home/WhyChoose';
import AboutUs from '../components/home/AboutUs';
import DigitalCatalogPreview from '../components/home/DigitalCatalogPreview';
import ManufacturingProcess from '../components/home/ManufacturingProcess';
import CtaBanner from '../components/home/CtaBanner';
import { Product, CartItem } from '../types';

// Order matters: the scroll spy picks the first section containing the
// viewport marker.
const SECTIONS = ['hero', 'daily-sports', 'catalog', 'digital-catalog', 'manufacturing', 'contact'];

export default function HomePage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState<boolean>(false);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Section highlighting for the header nav pill
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
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
      handleNavigate(scrollTarget);
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
        <HomeHero onExplore={() => handleNavigate('daily-sports')} />
        <UniformCategories />
        <FeaturedCollections />
        <WhyChoose />
        <AboutUs />
        <DigitalCatalogPreview onViewCatalog={() => setIsFlipbookOpen(true)} />
        <ManufacturingProcess />
        <CtaBanner onViewCatalog={() => setIsFlipbookOpen(true)} />
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
