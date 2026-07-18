import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

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
  onOpenAiAssistant,
  activeSection,
  onNavigate
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'daily-sports', label: 'Daily & Sports Uniforms' },
    { id: 'digital-catalog', label: 'Digital Spread' },
    { id: 'catalog', label: 'Grid Catalog' },
    { id: 'woven', label: 'Woven Uniforms' },
    { id: 'sports', label: 'Sports Wear' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'contact', label: 'Contact' },
  ];

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-brand-border/20 transition-all duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8 h-20">
          
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="text-xl md:text-2xl font-headline font-extrabold tracking-tight text-brand-blue flex items-center gap-2"
            id="brand-logo"
          >
            RIDHVICK UNIFORMS
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex gap-6 xl:gap-8 items-center" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-headline font-semibold transition-all duration-300 relative py-2 ${
                    isActive 
                      ? 'text-brand-blue font-bold' 
                      : 'text-brand-muted hover:text-brand-blue-light'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-yellow" 
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons / Tools */}
          <div className="flex items-center gap-2 md:gap-4 text-brand-blue" id="header-actions">
            
            {/* AI Advisor Quick Button */}
            <button
              onClick={onOpenAiAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-yellow/10 text-brand-blue hover:bg-brand-yellow/20 transition-all duration-300 text-xs font-semibold cursor-pointer border border-brand-yellow/30"
              title="Open AI Fitting & Quote Assistant"
              id="ai-assistant-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
              <span className="hidden sm:inline">AI Advisor</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full hover:bg-brand-light transition-all duration-300 hover:scale-105 cursor-pointer"
              aria-label="View shopping cart"
              id="cart-trigger-btn"
            >
              <ShoppingCart className="w-5 h-5 text-brand-blue" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 right-1.5 bg-brand-yellow text-brand-blue text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-sm"
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
              className="lg:hidden p-2.5 rounded-full hover:bg-brand-light transition-all duration-300 cursor-pointer"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />

            {/* Menu container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white z-50 p-6 flex flex-col shadow-2xl lg:hidden border-l border-brand-border/10"
              id="mobile-nav-panel"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-headline font-bold text-brand-blue text-lg">Menu</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-brand-light cursor-pointer"
                >
                  <X className="w-5 h-5 text-brand-blue" />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-grow">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left py-3 px-4 rounded-lg font-headline font-semibold transition-all duration-200 text-base ${
                        isActive 
                          ? 'bg-brand-blue/5 text-brand-blue border-l-4 border-brand-yellow pl-3' 
                          : 'text-brand-muted hover:bg-brand-light hover:text-brand-blue'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-brand-border/10 pt-6 mt-auto flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiAssistant();
                  }}
                  className="w-full py-3 bg-brand-yellow/10 text-brand-blue border border-brand-yellow/30 font-headline font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-brand-blue" />
                  Ask AI Size Advisor
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3 bg-brand-blue text-white font-headline font-bold rounded-lg flex items-center justify-center gap-2 cursor-pointer"
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
