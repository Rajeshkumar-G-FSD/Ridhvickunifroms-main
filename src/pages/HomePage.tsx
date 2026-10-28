import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AiChatAssistant from '../components/AiChatAssistant';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import HomeHero from '../components/home/HomeHero';
import UniformSolutions from '../components/home/UniformSolutions';
import UniformCategories from '../components/home/UniformCategories';
import FeaturedCollections from '../components/home/FeaturedCollections';
import WhyChoose from '../components/home/WhyChoose';
import AboutUs from '../components/home/AboutUs';
import DigitalCatalogPreview from '../components/home/DigitalCatalogPreview';
import ManufacturingProcess from '../components/home/ManufacturingProcess';
import CtaBanner from '../components/home/CtaBanner';
import { CartItem } from '../types';
import { HOME_SECTIONS, sectionForPath, sectionPath } from '../data/homeSections';

const SECTIONS = HOME_SECTIONS.map((s) => s.id);
const SITE_TITLE = 'Ridhvick Uniforms | School & Sports Uniform Manufacturer';

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

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
    // Initial page load has the key 'default' (robust to StrictMode re-running effects)
    const wasFirstRender = location.key === 'default';
    // A plain visit to "/" stays at the top as the browser loaded it.
    if (section.id === 'hero' && wasFirstRender) return;
    const firstLoad = wasFirstRender;
    scrollToSection(section.id, firstLoad ? 'instant' : 'smooth');
    // Images above the section can shift layout while loading on a fresh
    // visit, so settle the position once more shortly after.
    const t = firstLoad && section.id !== 'hero' ? window.setTimeout(() => scrollToSection(section.id, 'instant'), 700) : undefined;
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
        <DigitalCatalogPreview onViewCatalog={() => navigate('/digital-catalog')} />
      </main>

      <Footer onNavigate={handleNavigate} />

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
