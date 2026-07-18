import React from 'react';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const WHATSAPP_LINK = 'https://wa.me/919500111321';
const CONTACT_EMAIL = 'sales@ridhvickapparels.in';
const CONTACT_PHONE_TEL = 'tel:+919500111321';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-blue text-white border-t border-brand-yellow/30 mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-12 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">

        {/* Brand Information column */}
        <div className="flex flex-col gap-3 sm:gap-4 md:col-span-5 col-span-2">
          <div className="flex flex-col gap-0.5">
            <h4 className="text-lg font-headline font-black tracking-tight text-white flex items-center gap-2">
              RIDHVICK UNIFORMS
            </h4>
            <span className="text-[9px] font-bold text-brand-yellow uppercase tracking-widest">Since 2009</span>
          </div>
          <p className="text-xs text-white/70 max-w-sm leading-relaxed font-sans">
            Providing premium quality school uniforms, durable tailored blazers, sports jerseys, and high-performance knitted athletic apparel. Crafting academic pride since 2009.
          </p>
          
          {/* Registered & Sales Offices details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 pt-4 border-t border-white/15">
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-1.5 text-brand-yellow font-extrabold uppercase tracking-wider text-[9px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Registered Office</span>
              </div>
              <p className="text-[10px] leading-relaxed text-white/75 font-sans">
                No 2/278 A2, Old koolipalayam Road,<br />
                Vavipalayam Post,<br />
                Tirupur - 641 666.
              </p>
            </div>

            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-1.5 text-brand-yellow font-extrabold uppercase tracking-wider text-[9px]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Chennai Sales Office</span>
              </div>
              <p className="text-[10px] leading-relaxed text-white/75 font-sans">
                No: 7/546, Chettinadu Green Villa,<br />
                Nesamani Nagar, Perumbakkam<br />
                Chennai - 600100.
              </p>
            </div>
          </div>

          {/* Phone, Emails, and Website */}
          <div className="flex flex-col gap-2 mt-1 pt-4 border-t border-white/15 text-[11px] text-white/80 font-sans">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
              <span className="font-semibold text-white">+91 95001 11321 / 84387 46433</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-brand-yellow shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span><strong className="text-brand-yellow/85">Sales:</strong> <a href="mailto:sales@ridhvickapparels.in" className="hover:text-brand-yellow transition-colors underline decoration-brand-yellow/30">sales@ridhvickapparels.in</a></span>
                  <span><strong className="text-brand-yellow/85">Support:</strong> <a href="mailto:customersupport@ridhvickapparels.in" className="hover:text-brand-yellow transition-colors underline decoration-brand-yellow/30">customersupport@ridhvickapparels.in</a></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-brand-yellow text-xs">🌐</span>
              <a href="https://www.ridhvickuniforms.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow font-semibold transition-colors">www.ridhvickuniforms.com</a>
            </div>
          </div>

          {/* Connect / Social icons */}
          <div className="flex items-center gap-2.5 pt-4 mt-1 border-t border-white/15">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              title="Chat on WhatsApp"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Email Ridhvick Uniforms"
              title="Email us"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_PHONE_TEL}
              aria-label="Call Ridhvick Uniforms"
              title="Call us"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Company column */}
        <div className="flex flex-col gap-1.5 sm:gap-2.5 md:col-span-2 col-span-1">
          <h5 className="text-[11px] sm:text-xs font-headline font-extrabold text-brand-yellow uppercase tracking-widest mb-1 sm:mb-1.5">Company</h5>
          <button
            onClick={() => onNavigate('hero')}
            className="text-left text-xs text-white/80 hover:text-brand-yellow transition-colors font-semibold cursor-pointer py-0.5 sm:py-1"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('manufacturing')}
            className="text-left text-xs text-white/80 hover:text-brand-yellow transition-colors font-semibold cursor-pointer py-0.5 sm:py-1"
          >
            Manufacturing Process
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-left text-xs text-white/80 hover:text-brand-yellow transition-colors font-semibold cursor-pointer py-0.5 sm:py-1"
          >
            Product Catalog
          </button>
        </div>

        {/* Services column */}
        <div className="flex flex-col gap-1.5 sm:gap-2.5 md:col-span-2 col-span-1">
          <h5 className="text-[11px] sm:text-xs font-headline font-extrabold text-brand-yellow uppercase tracking-widest mb-1 sm:mb-1.5">Services</h5>
          <button
            onClick={() => onNavigate('manufacturing')}
            className="text-left text-xs text-white/80 hover:text-brand-yellow transition-colors font-semibold cursor-pointer py-0.5 sm:py-1 flex items-center gap-1"
          >
            Quality Assurance
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-left text-xs text-white/80 hover:text-brand-yellow transition-colors font-semibold cursor-pointer py-0.5 sm:py-1"
          >
            B2B Tailoring Portal
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="text-left text-xs text-white/80 hover:text-brand-yellow transition-colors font-semibold cursor-pointer py-0.5 sm:py-1"
          >
            Custom Orders Setup
          </button>
        </div>

        {/* Legal and compliance column */}
        <div className="flex flex-col gap-1.5 sm:gap-2.5 col-span-2 md:col-span-3">
          <h5 className="text-[11px] sm:text-xs font-headline font-extrabold text-brand-yellow uppercase tracking-widest mb-1 sm:mb-1.5">Legal & Quality</h5>
          <span className="text-xs text-white/80 py-0.5 sm:py-1">Privacy Policy</span>
          <span className="text-xs text-white/80 py-0.5 sm:py-1">Terms of Service</span>
          <span className="text-xs text-white/80 py-0.5 sm:py-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
            ISO 9001 Standard Fabric
          </span>
        </div>

      </div>

      {/* Underbar footer credit details */}
      <div className="border-t border-white/10 py-6 bg-brand-blue-light/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60">
          <p>© 2026 Ridhvick Group of Companies. Crafting Comfort, Delivering Excellence.</p>
          <p className="mt-2 sm:mt-0">All Rights Reserved. Premium Academic Solutions.</p>
        </div>
      </div>
    </footer>
  );
}
