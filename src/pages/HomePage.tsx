import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import AiChatAssistant from '../components/AiChatAssistant';
import CartDrawer from '../components/CartDrawer';
import Footer from '../components/Footer';
import DigitalCatalog from '../components/DigitalCatalog';
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack';
import DailySportsShowcase from '../components/DailySportsShowcase';
import BlurText from '../components/BlurText';
import TextType from '../components/TextType';
import { UNIFORM_PRODUCTS } from '../data/uniforms';
import { Product, CartItem } from '../types';
import { subscribeToCatalogItems, catalogItemToProduct } from '../lib/catalogService';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Mail, Phone, MapPin, Send } from 'lucide-react';

// Top-level catalog filter chips shown in the "Active Catalog" grid — mirrors the
// Header's Catalog dropdown structure so both stay in sync with the same categories.
const CATALOG_FILTERS: { id: string; label: string; children?: { id: string; label: string }[] }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'blazers', label: 'Blazers' },
  { id: 'camendo', label: 'Camendo' },
  { id: 'hoodies', label: 'Hoodies' },
  { id: 'occasions', label: 'Occasions' },
  {
    id: 'uniform',
    label: 'Uniform',
    children: [
      { id: 'uniform-kindergarten', label: 'Kindergarten' },
      { id: 'uniform-primary-daily', label: 'Primary DailyWear' },
      { id: 'uniform-primary-sports', label: 'Primary SportsWear' },
      { id: 'uniform-secondary-daily', label: 'Secondary DailyWear' },
      { id: 'uniform-secondary-sports', label: 'Secondary SportsWear' },
    ],
  },
];

// Every product category id that lives under the "Uniform" filter group
const UNIFORM_CATEGORY_IDS = CATALOG_FILTERS.find((f) => f.id === 'uniform')?.children?.map((c) => c.id) ?? [];

// Maps header nav / catalog dropdown ids directly to product category filters —
// the ids are identical since both the Header dropdown and this page share the
// same screenshot-driven category set.
const CATEGORY_NAV_MAP: Record<string, string> = {
  accessories: 'accessories',
  blazers: 'blazers',
  camendo: 'camendo',
  hoodies: 'hoodies',
  occasions: 'occasions',
  'uniform-kindergarten': 'uniform-kindergarten',
  'uniform-primary-daily': 'uniform-primary-daily',
  'uniform-primary-sports': 'uniform-primary-sports',
  'uniform-secondary-daily': 'uniform-secondary-daily',
  'uniform-secondary-sports': 'uniform-secondary-sports',
};

const COLLECTION_IMAGES = [
  { src: '/images/ridhvick_Our_Collections_Catalog_elevate_kids.png', alt: 'Elevate Kids Collection' },
  { src: '/images/ridhvick_Our_Collections_Catalog_House_kids.png', alt: 'House Kids Collection' },
  { src: '/images/ridhvick_Our_Collections_Catalog_kids_daily_waer_uniform_.png', alt: 'Kids Daily Wear Uniform Collection' },
  { src: '/images/ridhvick_Our_Collections_Catalog_kids_daily_waer_uniform.png', alt: 'Kids Daily Wear Uniform' },
  { src: '/images/ridhvick_Our_Collections_Catalog_kids_daily_waer.png', alt: 'Kids Daily Wear Collection' },
  { src: '/images/ridhvick_Our_Collections_Catalog_kids_garden.png', alt: 'Kids Garden Collection' },
  { src: '/images/ridhvick_Our_Collections_Catalog_kids.png', alt: 'Kids Collection' },
  { src: '/images/ridhvick_Our_Collections_Catalog_sports_kids.png', alt: 'Sports Kids Collection' },
];

export default function HomePage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [uniformFilterOpen, setUniformFilterOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  // Modals & Drawers States
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);

  // Form submission state
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSubject, setContactSubject] = useState<string>('Custom Sizing');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [isContactSubmitting, setIsContactSubmitting] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Admin-managed catalog items (Firestore) merge live into the "Explore
  // Sizing & Fabrics" product grid alongside the static catalog.
  useEffect(() => {
    const unsubscribe = subscribeToCatalogItems((items) => {
      setAdminProducts(items.map(catalogItemToProduct));
    });
    return unsubscribe;
  }, []);

  const handleNavigate = (sectionId: string) => {
    // If navigating to a category filter directly from header (nav items or the Catalog dropdown)
    if (sectionId in CATEGORY_NAV_MAP) {
      const category = CATEGORY_NAV_MAP[sectionId];
      setSelectedCategory(category);
      setUniformFilterOpen(UNIFORM_CATEGORY_IDS.includes(category));
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('catalog');
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Auto-scrolling and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ['hero', 'daily-sports', 'digital-catalog', 'catalog', 'manufacturing', 'contact'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
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
      } else {
        return [...prevCart, { product, selectedSize: size, quantity }];
      }
    });

    // Close Modal and open cart drawer for touch feedback
    setSelectedProductForModal(null);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Contact form handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;

    setIsContactSubmitting(true);
    setTimeout(() => {
      setIsContactSubmitting(false);
      setContactSuccess(true);
      // Reset form fields
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      setTimeout(() => setContactSuccess(false), 5000);
    }, 1500);
  };

  // Filtered Products list — admin-added catalog items surface first, ahead
  // of the static catalog.
  const allProducts = [...adminProducts, ...UNIFORM_PRODUCTS];
  const filteredProducts = selectedCategory === 'all'
    ? allProducts
    : selectedCategory === 'uniform'
    ? allProducts.filter(p => UNIFORM_CATEGORY_IDS.includes(p.category))
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] selection:bg-brand-yellow selection:text-brand-blue overflow-x-hidden">

      {/* Top Fixed Header */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAiAssistant={() => setIsAiAssistantOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Sections */}
      <main className="flex-grow flex flex-col">

        {/* Hero Section */}
        <Hero />

        {/* Daily & Sports Uniforms Big Image Showcase */}
        <DailySportsShowcase />

        {/* Uniform Index / Catalog Showcase Overview */}
        <section className="bg-white py-10 sm:py-16 md:py-24 border-b border-brand-border/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
              <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase bg-brand-yellow/15 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full inline-block">
                Smart Choices
              </span>
              <BlurText
                as="h2"
                text="Our Collections Catalog"
                animateBy="words"
                direction="top"
                className="justify-center text-2xl sm:text-3xl md:text-4xl font-headline font-black text-brand-blue mt-3 sm:mt-4"
              />
              <TextType
                as="p"
                text="Discover our meticulously designed uniform series tailored for school life, active sports tracks, and custom corporate academic branding."
                className="text-xs sm:text-sm md:text-base text-brand-muted mt-2.5 sm:mt-3 font-sans leading-relaxed"
                typingSpeed={25}
                initialDelay={200}
                loop={false}
                startOnVisible
                showCursor
                cursorCharacter="|"
                cursorClassName="text-brand-blue-light"
              />
            </div>

          </div>

          {/* Scroll-stacked collection imagery */}
          <ScrollStack
            useWindowScroll
            itemDistance={120}
            itemScale={0.02}
            itemStackDistance={20}
            stackPosition="22%"
            scaleEndPosition="6%"
            baseScale={0.9}
          >
            {COLLECTION_IMAGES.map((image) => (
              <ScrollStackItem key={image.src} itemClassName="h-[42vh] sm:h-[55vh] md:h-[70vh] !p-0 bg-white">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-contain rounded-2xl sm:rounded-[32px] md:rounded-[40px]"
                  loading="lazy"
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </section>

        {/* Interactive Digital Catalogue Spread and Book View */}
        <DigitalCatalog
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Filterable Products Catalog Grid Section */}
        <section id="catalog" className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-16 md:py-24 w-full">

          {/* Section Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-12">
            <div>
              <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase">
                Active Catalog
              </span>
              <BlurText
                as="h2"
                text="Explore Sizing & Fabrics"
                animateBy="words"
                direction="top"
                className="text-xl sm:text-2xl md:text-3xl font-headline font-black text-brand-blue mt-1"
              />
              <TextType
                as="p"
                text="Filter by school age category, explore custom thread mixes, and configure quotes."
                className="text-xs md:text-sm text-brand-muted mt-1.5 font-sans"
                typingSpeed={25}
                initialDelay={200}
                loop={false}
                startOnVisible
                showCursor
                cursorCharacter="|"
                cursorClassName="text-brand-blue-light"
              />
            </div>

            {/* Filter buttons chip lists (At least 44px touch targets on mobile) */}
            <div className="flex flex-col gap-1.5 items-start md:items-end">
              <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-lg border border-brand-border/20 shadow-sm overflow-x-auto">
                {CATALOG_FILTERS.map((cat) => {
                  const isSelected = cat.children
                    ? selectedCategory === cat.id || UNIFORM_CATEGORY_IDS.includes(selectedCategory)
                    : selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        if (cat.children) {
                          setUniformFilterOpen((open) => (selectedCategory === cat.id ? !open : true));
                        } else {
                          setUniformFilterOpen(false);
                        }
                      }}
                      className={`px-3 sm:px-4 h-[40px] sm:h-[44px] rounded font-headline font-semibold text-[11px] sm:text-xs transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-brand-blue text-white shadow'
                          : 'text-brand-muted hover:text-brand-blue hover:bg-brand-light'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Uniform sub-category chips (Kindergarten, Primary/Secondary Daily & Sports Wear) */}
              {uniformFilterOpen && (
                <div className="flex flex-wrap gap-1.5 bg-brand-light p-1.5 rounded-lg border border-brand-border/20 overflow-x-auto">
                  {CATALOG_FILTERS.find((f) => f.id === 'uniform')?.children?.map((sub) => {
                    const isSelected = selectedCategory === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedCategory(sub.id)}
                        className={`px-3 h-9 rounded font-headline font-semibold text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                          isSelected
                            ? 'bg-brand-blue text-white shadow'
                            : 'bg-white text-brand-muted hover:text-brand-blue'
                        }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Grid list of catalog items */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setSelectedProductForModal(p)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-brand-border/10 p-6 mt-4">
              <p className="text-sm text-brand-muted">No items matching this specific filter currently. Expand selection above.</p>
            </div>
          )}

        </section>

        {/* Manufacturing Service Highlights (All Service Under One Roof) */}
        <section id="manufacturing" className="bg-white py-10 sm:py-16 md:py-24 border-t border-b border-brand-border/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">

            {/* Left Column: Text qualities */}
            <div className="flex flex-col gap-4 sm:gap-6">
              <div>
                <span className="text-[10px] sm:text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase">
                  Manufacturing Excellence
                </span>
                <BlurText
                  as="h3"
                  text="All Service Under One Roof."
                  animateBy="words"
                  direction="top"
                  className="text-2xl sm:text-3xl md:text-4xl font-headline font-black text-brand-blue mt-2 leading-tight"
                />
                <TextType
                  as="p"
                  text="We maintain full creative ownership of the uniform lifecycle—from initial thread-blend trials and custom sampling to computerized logo embroidery and regional academy distributions."
                  className="text-xs sm:text-sm text-brand-muted mt-2.5 sm:mt-3 font-sans leading-relaxed"
                  typingSpeed={25}
                  initialDelay={200}
                  loop={false}
                  startOnVisible
                  showCursor
                  cursorCharacter="|"
                  cursorClassName="text-brand-blue-light"
                />
              </div>

              {/* Service list items */}
              <ul className="flex flex-col gap-2 sm:gap-4">
                <li className="flex items-start gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-lg hover:bg-brand-light transition-colors">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-headline font-extrabold text-brand-blue">Product Design & Prototyping</h5>
                    <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 sm:mt-1 leading-relaxed">We deliver digital design previews and physically stitched fabric samples to school boards before bulk production.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-lg hover:bg-brand-light transition-colors">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-headline font-extrabold text-brand-blue">Premium Knitted & Woven Fabrics</h5>
                    <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 sm:mt-1 leading-relaxed">High mechanical stretch poly-viscose and combed cotton counts optimized for comfort during active play hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 sm:gap-3.5 p-2.5 sm:p-3 rounded-lg hover:bg-brand-light transition-colors">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-headline font-extrabold text-brand-blue">Precision Custom Embroidery</h5>
                    <p className="text-[11px] sm:text-xs text-brand-muted mt-0.5 sm:mt-1 leading-relaxed">High thread-density embroidery stitchers ensure school logo crests remain crisp, colorfast, and durable.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Layered stitching photo */}
            <div className="relative">
              <div className="aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-lg relative z-10 border-2 sm:border-4 border-white bg-brand-light">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSes5KLVAnxOfr2GiByAxUWuxzIRcIaadcNquHGsp2QCm5lYlxmKaCH6yeBbSIFf2sg3vswpmMYpWJdByqk2WYimmParjTVvvPbpzuw5XH4uIB2nHZezw-ge9Q7kRAYC7BrSzuW7T2n5qnlXcxKjbHXA2kctKHdVg85HOkWZOriARBVszMfUIUfQFWdMfGG5Z9euisdruz0wsbRVXJ3vtmJLEEsa2wiotSu6A5kYr0husdfSa9jNYEtnANC-gna9LcEtOv84re7NMB"
                  alt="Ridhvick Embroidery Sewing Thread"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full bg-brand-yellow rounded-lg sm:rounded-xl z-0" />
            </div>

          </div>
        </section>

        {/* Contact Information & General Inquiry Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-16 md:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-stretch">

            {/* Column 1: Contact details (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-brand-blue text-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-xl relative overflow-hidden border-b-4 border-brand-yellow">
              <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                <div>
                  <span className="text-[10px] font-headline font-bold text-brand-yellow uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full w-fit">
                    Corporate Office
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-headline font-black mt-2.5 sm:mt-3">
                    Let's Connect.
                  </h3>
                  <p className="text-xs text-white/70 mt-2 font-sans leading-relaxed">
                    Have questions regarding custom school design packages, fabric specs, or size sizing fits? Reach our tailored manufacturing service desk.
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-4 text-xs font-medium">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-full text-brand-yellow mt-0.5 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-bold">Inquiry Emails</p>
                      <p className="text-white">sales@ridhvickapparels.in</p>
                      <p className="text-white/80 text-[11px] mt-0.5">customersupport@ridhvickapparels.in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-full text-brand-yellow shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-bold">Contact Numbers</p>
                      <p className="text-white font-semibold">+91 95001 11321</p>
                      <p className="text-white/80 text-[11px]">+91 84387 46433</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 bg-white/10 rounded-full text-brand-yellow mt-0.5 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-bold">Registered Office (Tirupur)</p>
                      <p className="text-white text-[11px] leading-relaxed">
                        No 2/278 A2, Old koolipalayam Road, Vavipalayam Post, Tirupur - 641 666
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-1 border-t border-white/10">
                    <div className="p-2.5 bg-white/10 rounded-full text-brand-yellow mt-0.5 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/50 uppercase font-bold">Chennai Sales Office</p>
                      <p className="text-white text-[11px] leading-relaxed">
                        No: 7/546, Chettinadu Green Villa, Nesamani Nagar, Perumbakkam, Chennai - 600100
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative background visual overlay */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-brand-blue-light/35 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Column 2: Quick email contact form (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-brand-border/20 shadow-sm">
              <h4 className="text-base sm:text-lg font-headline font-black text-brand-blue mb-1.5 sm:mb-2">Request Catalog & Fabric Swatches</h4>
              <p className="text-xs text-brand-muted mb-4 sm:mb-6 leading-relaxed">
                Fill out the brief contact form below to receive physical uniform textile samples or details about size calibration runs at your school premises.
              </p>

              {contactSuccess ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg flex flex-col items-center justify-center text-center gap-3">
                  <CheckCircle2 className="w-10 h-10 text-green-600 animate-bounce" />
                  <h5 className="text-sm font-headline font-bold text-green-800">Inquiry Received</h5>
                  <p className="text-xs text-green-700 max-w-sm">
                    Thank you! Your general message has been received. Our Ridhvick distribution specialists will respond within 24 working hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-brand-muted mb-1.5 uppercase">Full Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full bg-brand-light border border-brand-border/20 rounded-lg px-3.5 py-2.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[44px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-brand-muted mb-1.5 uppercase">Email Address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@example.com"
                        required
                        className="w-full bg-brand-light border border-brand-border/20 rounded-lg px-3.5 py-2.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-muted mb-1.5 uppercase">Subject Focus</label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full bg-brand-light border border-brand-border/20 rounded-lg px-3 py-2.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue h-[44px]"
                    >
                      <option value="Custom Sizing">School Volume Sizing Customization</option>
                      <option value="Embroidery Digits">Embroidery Logo Setups</option>
                      <option value="Swatches Request">Physical Textile Fabric Swatches</option>
                      <option value="General Info">General Catalog Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-brand-muted mb-1.5 uppercase">Message / Questions</label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Specify your school requirements, size parameters, or embroidery patterns..."
                      rows={4}
                      required
                      className="w-full bg-brand-light border border-brand-border/20 rounded-lg px-3.5 py-2.5 text-xs text-brand-blue focus:outline-none focus:border-brand-blue resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full h-[44px] bg-brand-blue hover:bg-brand-blue-light text-white font-headline font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    {isContactSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Transmitting Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Catalog Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </main>

      {/* Global Footer component */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Floating Chat Assistant (with Suggestion Chips & connection to Server Express Route) */}
      <AiChatAssistant
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onOpen={() => setIsAiAssistantOpen(true)}
      />

      {/* Slide-out cart/quote drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Overlay modal for quick details, manual sizing, and AI Growth Buffers size recommenders */}
      <AnimatePresence>
        {selectedProductForModal && (
          <QuickViewModal
            product={selectedProductForModal}
            onClose={() => setSelectedProductForModal(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
