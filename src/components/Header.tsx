import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Phone, ChevronDown, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import WhatsAppIcon from './icons/WhatsAppIcon';
import AdminLoginModal from './AdminLoginModal';
import { SITE_NAV, NavLink } from '../data/siteNav';
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_LINK, WHATSAPP_QUOTE_LINK } from '../lib/contact';

// Homepage sections that have their own menu item; anything else counts as "Home".
const NAV_SECTIONS = SITE_NAV.map((n) => n.section).filter((s): s is string => !!s && s !== 'hero');

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenAiAssistant: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ cart, onOpenCart, activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the call/WhatsApp popover and dropdowns on outside click / Escape
  useEffect(() => {
    const handlePointer = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setContactOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const isActive = (item: NavLink) => {
    if (pathname === '/') {
      if (item.section === 'hero') return !NAV_SECTIONS.includes(activeSection);
      return !!item.section && item.section === activeSection;
    }
    return item.to === pathname || !!item.children?.some((c) => c.to === pathname);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setOpenDropdown(null);
  };

  const go = (item: { section?: string; to?: string }) => {
    closeMenus();
    if (item.section) onNavigate(item.section);
    else if (item.to) navigate(item.to);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_24px_rgba(0,52,111,0.10)]' : ''
        }`}
      >
        {/* Utility bar — collapses once the page is scrolled */}
        <div
          className={`hidden sm:block bg-[#00285a] text-white/85 overflow-hidden transition-[max-height] duration-300 ${
            scrolled ? 'max-h-0' : 'max-h-9'
          }`}
        >
          <div className="flex items-center justify-between max-w-7xl mx-auto px-6 md:px-8 h-9 text-[12px]">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-green-light" />
              Tirupur | Chennai
            </span>
            <span className="flex items-center gap-3">
              <Phone className="w-3.5 h-3.5 text-brand-green-light" />
              <a href={PHONE_PRIMARY.tel} className="hover:text-white transition-colors">{PHONE_PRIMARY.display}</a>
              <span className="text-white/30">|</span>
              <a href={PHONE_SECONDARY.tel} className="hover:text-white transition-colors">{PHONE_SECONDARY.display}</a>
            </span>
          </div>
        </div>

        {/* Brand row */}
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-[72px] gap-3">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go(SITE_NAV[0]);
            }}
            className="flex items-center gap-2.5 shrink-0"
          >
            <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-black shrink-0">
              <img src="/images/ridhvick_logo.jpeg" alt="Ridhvick Uniforms" className="w-full h-full object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base sm:text-lg md:text-xl font-headline font-extrabold tracking-tight text-brand-blue">
                RIDHVICK
              </span>
              <span className="text-[9px] sm:text-[10px] font-headline font-bold tracking-[0.3em] text-brand-muted uppercase mt-0.5">
                Uniforms
              </span>
            </span>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Call / WhatsApp popover */}
            <div ref={contactRef} className="relative hidden md:block">
              <button
                onClick={() => setContactOpen((o) => !o)}
                aria-expanded={contactOpen}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-md border-2 border-brand-blue text-brand-blue font-headline font-bold text-xs tracking-wide hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                CALL / WHATSAPP US
              </button>
              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-60 bg-white rounded-lg shadow-xl border border-brand-border/30 p-1.5 z-50"
                  >
                    <a href={PHONE_PRIMARY.tel} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-brand-blue hover:bg-brand-light">
                      <Phone className="w-4 h-4" /> {PHONE_PRIMARY.display}
                    </a>
                    <a href={PHONE_SECONDARY.tel} className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-brand-blue hover:bg-brand-light">
                      <Phone className="w-4 h-4" /> {PHONE_SECONDARY.display}
                    </a>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-brand-green hover:bg-brand-light"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-brand-green text-white font-headline font-bold text-xs tracking-wide hover:bg-brand-green-dark transition-colors"
            >
              GET A QUOTE <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-brand-light transition-colors cursor-pointer"
              aria-label="View quote list"
            >
              <ShoppingCart className="w-5 h-5 text-brand-blue" />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-green text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsAdminLoginOpen(true)}
              className="hidden sm:inline-flex p-2.5 rounded-full hover:bg-brand-light transition-colors cursor-pointer"
              aria-label="Admin Login"
            >
              <User className="w-5 h-5 text-brand-blue" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 sm:p-2.5 rounded-full hover:bg-brand-light transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-brand-blue" />
            </button>
          </div>
        </div>

        {/* Main menu (wide screens) */}
        <nav className="hidden xl:block bg-brand-blue">
          <ul className="flex items-stretch justify-between max-w-7xl mx-auto px-8 h-12">
            {SITE_NAV.map((item) => {
              const active = isActive(item);
              return (
                <li
                  key={item.label}
                  className="relative flex"
                  onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                  onMouseLeave={() => item.children && setOpenDropdown(null)}
                >
                  <button
                    onClick={() => go(item)}
                    onFocus={() => item.children && setOpenDropdown(item.label)}
                    aria-haspopup={item.children ? 'true' : undefined}
                    aria-expanded={item.children ? openDropdown === item.label : undefined}
                    className={`relative flex items-center gap-1 px-1 text-[12.5px] font-headline font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      active ? 'text-white' : 'text-white/75 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="w-3 h-3 opacity-70" />}
                    <span
                      className={`absolute left-0 right-0 bottom-0 h-[3px] rounded-t bg-brand-green-light transition-transform origin-center ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full w-60 bg-white rounded-b-lg shadow-xl border border-brand-border/30 border-t-[3px] border-t-brand-green p-1.5 z-50"
                      >
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <button
                              onClick={() => go(child)}
                              className={`w-full text-left px-3 py-2.5 rounded-md text-[13px] font-medium transition-colors cursor-pointer ${
                                pathname === child.to
                                  ? 'bg-brand-light text-brand-green'
                                  : 'text-brand-blue hover:bg-brand-light hover:text-brand-green'
                              }`}
                            >
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* Reserves the fixed header's height so page content starts below it */}
      <div aria-hidden className="h-16 sm:h-[108px] xl:h-[156px] shrink-0" />

      {/* Slide-out menu (below xl) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-blue/40 backdrop-blur-[2px] z-50 xl:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-[86%] max-w-sm bg-white z-50 flex flex-col shadow-2xl xl:hidden"
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-brand-border/30">
                <span className="font-headline font-extrabold text-brand-blue tracking-tight">RIDHVICK UNIFORMS</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-light cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-brand-blue" />
                </button>
              </div>

              <ul className="flex-grow overflow-y-auto px-3 py-3">
                {SITE_NAV.map((item) => {
                  const active = isActive(item);
                  const expanded = mobileExpanded === item.label;
                  return (
                    <li key={item.label} className="border-b border-brand-border/20 last:border-0">
                      <div className="flex items-center">
                        <button
                          onClick={() => go(item)}
                          className={`flex-grow text-left py-3 px-2 text-sm font-headline font-semibold cursor-pointer ${
                            active ? 'text-brand-green' : 'text-brand-blue'
                          }`}
                        >
                          {item.label}
                        </button>
                        {item.children && (
                          <button
                            onClick={() => setMobileExpanded(expanded ? null : item.label)}
                            aria-label={`Show ${item.label} categories`}
                            aria-expanded={expanded}
                            className="p-3 text-brand-blue cursor-pointer"
                          >
                            <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence initial={false}>
                        {item.children && expanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 pb-2"
                          >
                            {item.children.map((child) => (
                              <li key={child.to}>
                                <button
                                  onClick={() => go(child)}
                                  className={`w-full text-left py-2 px-2 text-[13px] cursor-pointer ${
                                    pathname === child.to ? 'text-brand-green font-semibold' : 'text-brand-muted'
                                  }`}
                                >
                                  {child.label}
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-brand-border/30 p-4 flex flex-col gap-2.5">
                <a
                  href={WHATSAPP_QUOTE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 rounded-md bg-brand-green text-white font-headline font-bold text-sm flex items-center justify-center gap-2"
                >
                  GET A QUOTE <ArrowRight className="w-4 h-4" />
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={PHONE_PRIMARY.tel}
                    className="h-11 rounded-md border-2 border-brand-blue text-brand-blue font-headline font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" /> CALL US
                  </a>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 rounded-md border-2 border-brand-blue text-brand-blue font-headline font-bold text-xs flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> WHATSAPP
                  </a>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminLoginOpen(true);
                  }}
                  className="sm:hidden text-xs text-brand-muted py-1 cursor-pointer"
                >
                  Admin Login
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          navigate('/admin');
        }}
      />
    </>
  );
}
