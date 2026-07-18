import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import QuickViewModal from './components/QuickViewModal';
import AiChatAssistant from './components/AiChatAssistant';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import DigitalCatalog from './components/DigitalCatalog';
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import { UNIFORM_PRODUCTS } from './data/uniforms';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight, Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

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

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  
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

  // Auto-scrolling and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ['hero', 'digital-catalog', 'catalog', 'manufacturing', 'contact'];
      
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

  const handleNavigate = (sectionId: string) => {
    // If navigating to category filters directly from header
    if (sectionId === 'woven') {
      setSelectedCategory('high');
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('catalog');
      return;
    }
    if (sectionId === 'sports') {
      setSelectedCategory('sports');
      const el = document.getElementById('catalog');
      el?.scrollIntoView({ behavior: 'smooth' });
      setActiveSection('catalog');
      return;
    }
    if (sectionId === 'accessories') {
      setSelectedCategory('accessories');
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

  // Filtered Products list
  const filteredProducts = selectedCategory === 'all'
    ? UNIFORM_PRODUCTS
    : UNIFORM_PRODUCTS.filter(p => p.category === selectedCategory);

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

        {/* Uniform Index / Catalog Showcase Overview */}
        <section className="bg-white py-16 md:py-24 border-b border-brand-border/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase bg-brand-yellow/15 px-3.5 py-1.5 rounded-full inline-block">
                Smart Choices
              </span>
              <h2 className="text-3xl md:text-4xl font-headline font-black text-brand-blue mt-4">
                Our Collections Catalog
              </h2>
              <p className="text-sm md:text-base text-brand-muted mt-3 font-sans leading-relaxed">
                Discover our meticulously designed uniform series tailored for school life, active sports tracks, and custom corporate academic branding.
              </p>
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
              <ScrollStackItem key={image.src} itemClassName="h-[60vh] md:h-[70vh] !p-0 bg-white">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-[40px]"
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
        <section id="catalog" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
          
          {/* Section Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase">
                Active Catalog
              </span>
              <h2 className="text-2xl md:text-3xl font-headline font-black text-brand-blue mt-1">
                Explore Sizing & Fabrics
              </h2>
              <p className="text-xs md:text-sm text-brand-muted mt-1.5 font-sans">
                Filter by school age category, explore custom thread mixes, and configure quotes.
              </p>
            </div>

            {/* Filter buttons chip lists (At least 44px touch targets on mobile) */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-lg border border-brand-border/20 shadow-sm">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'primary', label: 'Primary School' },
                { id: 'high', label: 'High School' },
                { id: 'sports', label: 'Sports Wear' },
                { id: 'accessories', label: 'Accessories' }
              ].map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 h-[44px] rounded font-headline font-semibold text-xs transition-all cursor-pointer ${
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
          </div>

          {/* Grid list of catalog items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <section id="manufacturing" className="bg-white py-16 md:py-24 border-t border-b border-brand-border/10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column: Text qualities */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-headline font-bold text-brand-blue-light tracking-widest uppercase">
                  Manufacturing Excellence
                </span>
                <h3 className="text-3xl md:text-4xl font-headline font-black text-brand-blue mt-2 leading-tight">
                  All Service Under One Roof.
                </h3>
                <p className="text-sm text-brand-muted mt-3 font-sans leading-relaxed">
                  We maintain full creative ownership of the uniform lifecycle—from initial thread-blend trials and custom sampling to computerized logo embroidery and regional academy distributions.
                </p>
              </div>

              {/* Service list items */}
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-brand-light transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-headline font-extrabold text-brand-blue">Product Design & Prototyping</h5>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">We deliver digital design previews and physically stitched fabric samples to school boards before bulk production.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-brand-light transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-headline font-extrabold text-brand-blue">Premium Knitted & Woven Fabrics</h5>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">High mechanical stretch poly-viscose and combed cotton counts optimized for comfort during active play hours.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-brand-light transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-sm font-headline font-extrabold text-brand-blue">Precision Custom Embroidery</h5>
                    <p className="text-xs text-brand-muted mt-1 leading-relaxed">High thread-density embroidery stitchers ensure school logo crests remain crisp, colorfast, and durable.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: Layered stitching photo */}
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg relative z-10 border-4 border-white bg-brand-light">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSes5KLVAnxOfr2GiByAxUWuxzIRcIaadcNquHGsp2QCm5lYlxmKaCH6yeBbSIFf2sg3vswpmMYpWJdByqk2WYimmParjTVvvPbpzuw5XH4uIB2nHZezw-ge9Q7kRAYC7BrSzuW7T2n5qnlXcxKjbHXA2kctKHdVg85HOkWZOriARBVszMfUIUfQFWdMfGG5Z9euisdruz0wsbRVXJ3vtmJLEEsa2wiotSu6A5kYr0husdfSa9jNYEtnANC-gna9LcEtOv84re7NMB" 
                  alt="Ridhvick Embroidery Sewing Thread" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-brand-yellow rounded-xl z-0" />
            </div>

          </div>
        </section>

        {/* Contact Information & General Inquiry Section */}
        <section id="contact" className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Column 1: Contact details (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-brand-blue text-white rounded-2xl p-8 shadow-xl relative overflow-hidden border-b-4 border-brand-yellow">
              <div className="relative z-10 flex flex-col gap-6">
                <div>
                  <span className="text-[10px] font-headline font-bold text-brand-yellow uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full w-fit">
                    Corporate Office
                  </span>
                  <h3 className="text-2xl md:text-3xl font-headline font-black mt-3">
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
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 border border-brand-border/20 shadow-sm">
              <h4 className="text-lg font-headline font-black text-brand-blue mb-2">Request Catalog & Fabric Swatches</h4>
              <p className="text-xs text-brand-muted mb-6 leading-relaxed">
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
