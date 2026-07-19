import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Mail, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import WhatsAppIcon from './icons/WhatsAppIcon';

const WHATSAPP_LINK = 'https://wa.me/919500111321';
const CONTACT_EMAIL = 'sales@ridhvickapparels.in';
const CONTACT_PHONE_DISPLAY = '+91 95001 11321';
const CONTACT_PHONE_TEL = 'tel:+919500111321';

interface CatalogEntry {
  id: string;
  label: string;
  children?: CatalogEntry[];
}

const CATALOG_MENU: CatalogEntry[] = [
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

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenAiAssistant: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({
  cart,
  onOpenCart,
  activeSection,
  onNavigate
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [uniformOpen, setUniformOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileUniformOpen, setMobileUniformOpen] = useState(false);
  const catalogRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const navItems = [
    { id: 'daily-sports', label: 'Daily & Sports' },
    { id: 'digital-catalog', label: 'Digital Spread' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'contact', label: 'Contact' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the Catalog dropdown on outside click / Escape (mouse-independent affordance)
  useEffect(() => {
    if (!catalogOpen) return;
    const handlePointer = (e: MouseEvent) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target as Node)) {
        setCatalogOpen(false);
        setUniformOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCatalogOpen(false);
        setUniformOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [catalogOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    setCatalogOpen(false);
    setUniformOpen(false);
    setMobileCatalogOpen(false);
    setMobileUniformOpen(false);
    onNavigate(id);
  };

  // Catalog dropdown leaves open their own dedicated hero + gallery page
  const goToCategory = (slug: string) => {
    setMobileMenuOpen(false);
    setCatalogOpen(false);
    setUniformOpen(false);
    setMobileCatalogOpen(false);
    setMobileUniformOpen(false);
    navigate(`/catalog/${slug}`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(0,52,111,0.08)] border-b border-brand-border/10'
            : 'bg-white/70 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        {/* Utility Topbar: social/contact icons (desktop & tablet only) */}
        <div className="hidden sm:block bg-brand-blue" id="header-topbar">
          <div className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-8 h-8">
            {/* Social / quick-contact icons — left side */}
            <div className="flex items-center gap-1.5">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                title="Chat on WhatsApp"
                className="group flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white/85 hover:bg-brand-yellow hover:text-brand-blue hover:scale-110 transition-all duration-200"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email Ridhvick Uniforms"
                title="Email us"
                className="group flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-white/85 hover:bg-brand-yellow hover:text-brand-blue hover:scale-110 transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick phone reference — right side */}
            <a
              href={CONTACT_PHONE_TEL}
              className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-white/80 hover:text-brand-yellow transition-colors duration-200"
            >
              <Phone className="w-3 h-3" />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <div className="flex justify-between items-center max-w-7xl mx-auto px-3.5 sm:px-6 md:px-8 h-14 sm:h-16 md:h-[72px] gap-2">

          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="flex items-center gap-2 shrink-0 group"
            id="brand-logo"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden bg-black shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <img src="/images/ridhvick_logo.jpeg" alt="Ridhvick Uniforms" className="w-full h-full object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm sm:text-base md:text-lg font-headline font-extrabold tracking-tight text-brand-blue">
                RIDHVICK
              </span>
              <span className="hidden sm:block text-[9px] md:text-[10px] font-headline font-bold tracking-[0.2em] text-brand-muted uppercase">
                Uniforms
              </span>
            </span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-brand-light/70 rounded-full p-1 border border-brand-border/10" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              if (item.id === 'catalog') {
                return (
                  <div
                    key={item.id}
                    ref={catalogRef}
                    className="relative"
                    onMouseEnter={() => setCatalogOpen(true)}
                    onMouseLeave={() => { setCatalogOpen(false); setUniformOpen(false); }}
                  >
                    <button
                      onClick={() => setCatalogOpen((o) => !o)}
                      aria-haspopup="true"
                      aria-expanded={catalogOpen}
                      className={`relative flex items-center gap-1 text-[11px] xl:text-xs font-headline font-bold uppercase tracking-wide px-3 xl:px-3.5 py-2 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                        isActive || catalogOpen ? 'text-white' : 'text-brand-muted hover:text-brand-blue'
                      }`}
                      id={`nav-item-${item.id}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="activeNavPill"
                          className="absolute inset-0 bg-brand-blue rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {!isActive && catalogOpen && (
                        <span className="absolute inset-0 bg-brand-blue rounded-full -z-10" />
                      )}
                      {item.label}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${catalogOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Invisible hover-bridge keeps the panel "connected" to the trigger */}
                    <AnimatePresence>
                      {catalogOpen && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: 'easeOut' }}
                            className="w-64 bg-white rounded-xl shadow-xl border border-brand-border/10 p-2 origin-top"
                            id="catalog-dropdown-panel"
                          >
                            {CATALOG_MENU.map((entry) =>
                              entry.children ? (
                                <div
                                  key={entry.id}
                                  className="relative"
                                  onMouseEnter={() => setUniformOpen(true)}
                                  onMouseLeave={() => setUniformOpen(false)}
                                >
                                  <button
                                    onClick={() => setUniformOpen((o) => !o)}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-headline font-semibold text-brand-blue hover:bg-brand-light transition-colors cursor-pointer"
                                  >
                                    {entry.label}
                                    <ChevronRight className={`w-3.5 h-3.5 text-brand-muted transition-transform duration-200 ${uniformOpen ? 'rotate-90' : ''}`} />
                                  </button>

                                  <AnimatePresence>
                                    {uniformOpen && (
                                      <div className="absolute left-full top-0 pl-1 z-50">
                                        <motion.div
                                          initial={{ opacity: 0, x: -6 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          exit={{ opacity: 0, x: -6 }}
                                          transition={{ duration: 0.16, ease: 'easeOut' }}
                                          className="w-60 bg-white rounded-xl shadow-xl border border-brand-border/10 p-2 origin-left"
                                          id="uniform-submenu-panel"
                                        >
                                          {entry.children.map((child) => (
                                            <button
                                              key={child.id}
                                              onClick={() => goToCategory(child.id)}
                                              className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-headline font-semibold text-brand-muted hover:bg-brand-light hover:text-brand-blue transition-colors cursor-pointer whitespace-nowrap"
                                            >
                                              {child.label}
                                            </button>
                                          ))}
                                        </motion.div>
                                      </div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <button
                                  key={entry.id}
                                  onClick={() => goToCategory(entry.id)}
                                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs font-headline font-semibold text-brand-blue hover:bg-brand-light transition-colors cursor-pointer"
                                >
                                  {entry.label}
                                </button>
                              )
                            )}
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative text-[11px] xl:text-xs font-headline font-bold uppercase tracking-wide px-3 xl:px-3.5 py-2 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-brand-muted hover:text-brand-blue'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-brand-blue rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Icons / Tools */}
          <div className="flex items-center gap-0.5 sm:gap-1.5 text-brand-blue shrink-0" id="header-actions">

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-brand-light transition-all duration-300 active:scale-95 cursor-pointer"
              aria-label="View shopping cart"
              id="cart-trigger-btn"
            >
              <ShoppingCart className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-brand-blue" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 bg-brand-yellow text-brand-blue text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm"
                  id="cart-count-badge"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Profile Sign-in (Mock) */}
            <button
              className="p-2.5 rounded-full hover:bg-brand-light transition-all duration-300 hover:scale-105 hidden sm:inline-block cursor-pointer"
              aria-label="User Account"
              id="profile-trigger-btn"
            >
              <User className="w-5 h-5 text-brand-blue" />
            </button>

            {/* Mobile Hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-full hover:bg-brand-light transition-all duration-300 cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-[18px] h-[18px] sm:w-5 sm:h-5" /> : <Menu className="w-[18px] h-[18px] sm:w-5 sm:h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Sidebar Slide-out Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-blue/40 backdrop-blur-[2px] z-40 lg:hidden"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[82%] max-w-xs bg-white z-50 p-5 flex flex-col shadow-2xl lg:hidden"
              id="mobile-nav-panel"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full overflow-hidden bg-black shrink-0">
                  <img src="/images/ridhvick_logo.jpeg" alt="Ridhvick Uniforms" className="w-full h-full object-cover" />
                </span>
                  <span className="font-headline font-black text-brand-blue text-sm tracking-tight">RIDHVICK</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-light cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-[18px] h-[18px] text-brand-blue" />
                </button>
              </div>

              <div className="flex flex-col gap-1 flex-grow overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  if (item.id === 'catalog') {
                    return (
                      <div key={item.id} className="flex flex-col">
                        <button
                          onClick={() => setMobileCatalogOpen((o) => !o)}
                          aria-expanded={mobileCatalogOpen}
                          className={`flex items-center justify-between text-left py-3 px-3.5 rounded-lg font-headline font-semibold transition-all duration-200 text-sm cursor-pointer ${
                            isActive || mobileCatalogOpen
                              ? 'bg-brand-blue text-white shadow-sm'
                              : 'text-brand-muted hover:bg-brand-light hover:text-brand-blue'
                          }`}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileCatalogOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence initial={false}>
                          {mobileCatalogOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-0.5 pl-3 py-1">
                                {CATALOG_MENU.map((entry) =>
                                  entry.children ? (
                                    <div key={entry.id} className="flex flex-col">
                                      <button
                                        onClick={() => setMobileUniformOpen((o) => !o)}
                                        aria-expanded={mobileUniformOpen}
                                        className="flex items-center justify-between text-left py-2.5 px-3 rounded-lg font-headline font-medium text-brand-muted hover:bg-brand-light hover:text-brand-blue transition-colors text-[13px] cursor-pointer"
                                      >
                                        {entry.label}
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileUniformOpen ? 'rotate-180' : ''}`} />
                                      </button>
                                      <AnimatePresence initial={false}>
                                        {mobileUniformOpen && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                          >
                                            <div className="flex flex-col gap-0.5 pl-3 py-1">
                                              {entry.children.map((child) => (
                                                <button
                                                  key={child.id}
                                                  onClick={() => goToCategory(child.id)}
                                                  className="text-left py-2 px-3 rounded-lg font-sans text-[12.5px] text-brand-muted hover:bg-brand-light hover:text-brand-blue transition-colors cursor-pointer"
                                                >
                                                  {child.label}
                                                </button>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ) : (
                                    <button
                                      key={entry.id}
                                      onClick={() => goToCategory(entry.id)}
                                      className="text-left py-2.5 px-3 rounded-lg font-headline font-medium text-brand-muted hover:bg-brand-light hover:text-brand-blue transition-colors text-[13px] cursor-pointer"
                                    >
                                      {entry.label}
                                    </button>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left py-3 px-3.5 rounded-lg font-headline font-semibold transition-all duration-200 text-sm ${
                        isActive
                          ? 'bg-brand-blue text-white shadow-sm'
                          : 'text-brand-muted hover:bg-brand-light hover:text-brand-blue'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-brand-border/10 pt-4 mt-3 flex flex-col gap-3">
                {/* Quick-contact icons (topbar is hidden on mobile, so surface them here) */}
                <div className="flex items-center justify-center gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-light text-brand-blue hover:bg-brand-yellow hover:scale-110 transition-all duration-200"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    aria-label="Email Ridhvick Uniforms"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-light text-brand-blue hover:bg-brand-yellow hover:scale-110 transition-all duration-200"
                  >
                    <Mail className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href={CONTACT_PHONE_TEL}
                    aria-label="Call Ridhvick Uniforms"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-light text-brand-blue hover:bg-brand-yellow hover:scale-110 transition-all duration-200"
                  >
                    <Phone className="w-[18px] h-[18px]" />
                  </a>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full h-12 bg-brand-blue text-white font-headline font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer text-sm active:scale-[0.98] transition-transform"
                >
                  <ShoppingCart className="w-4 h-4" />
                  View Cart ({cartCount})
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
