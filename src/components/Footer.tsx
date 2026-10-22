import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';

const WHATSAPP_LINK = 'https://wa.me/919500111321';
const CONTACT_EMAIL = 'sales@ridhvickapparels.in';
const CONTACT_PHONE_DISPLAY = '+91 95001 11321';
const CONTACT_PHONE_TEL = 'tel:+919500111321';

const QUICK_LINKS = [
  { id: 'daily-sports', label: 'Daily & Sports' },
  { id: 'digital-catalog', label: 'Digital Spread' },
  { id: 'catalog', label: 'Catalog' },
  { id: 'manufacturing', label: 'Manufacturing' },
  { id: 'contact', label: 'Contact' },
];

const SERVICES: { label: string; slug?: string }[] = [
  { label: 'School Uniforms', slug: 'uniform-primary-daily' },
  { label: 'Sports Wear', slug: 'uniform-primary-sports' },
  { label: 'Blazers', slug: 'blazers' },
  { label: 'Accessories', slug: 'accessories' },
  { label: 'Customisation', slug: 'occasions' },
  { label: 'Bulk Orders' },
];

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const linkClass = 'text-left text-[13px] text-white/75 hover:text-brand-yellow transition-colors cursor-pointer py-0.5';
const headingClass = 'text-sm font-headline font-bold text-white mb-3';
const socialClass =
  'flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white hover:bg-brand-yellow hover:text-brand-blue hover:-translate-y-0.5 transition-all duration-200';

export default function Footer({ onNavigate }: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className="bg-gradient-to-br from-[#002a5c] to-[#001a3d] text-white mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-12 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-4 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full overflow-hidden bg-black border border-brand-yellow/40 shrink-0">
              <img src="/images/ridhvick_logo.jpeg" alt="Ridhvick Uniforms" className="w-full h-full object-cover" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-headline font-extrabold tracking-tight">RIDHVICK</span>
              <span className="text-[10px] font-headline font-bold tracking-[0.3em] text-white/70 uppercase mt-1">
                Uniforms
              </span>
            </span>
          </div>
          <p className="text-[13px] text-white/70 leading-relaxed max-w-xs">
            Quality school uniforms for brighter tomorrows. Proudly manufacturing uniforms with style, comfort and
            trust since years.
          </p>
          <div className="flex items-center gap-2.5">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" className={socialClass}>
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Ridhvick Uniforms" className={socialClass}>
              <Mail className="w-4 h-4" />
            </a>
            <a href={CONTACT_PHONE_TEL} aria-label="Call Ridhvick Uniforms" className={socialClass}>
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <h5 className={headingClass}>Quick Links</h5>
          {QUICK_LINKS.map((l) => (
            <button key={l.id} onClick={() => onNavigate(l.id)} className={linkClass}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Services */}
        <div className="col-span-1 md:col-span-2 flex flex-col">
          <h5 className={headingClass}>Our Services</h5>
          {SERVICES.map((s) => (
            <button
              key={s.label}
              onClick={() => (s.slug ? navigate(`/catalog/${s.slug}`) : onNavigate('contact'))}
              className={linkClass}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-4 flex flex-col gap-3">
          <h5 className={headingClass.replace('mb-3', 'mb-0')}>Contact Us</h5>
          <a href={CONTACT_PHONE_TEL} className="flex items-center gap-3 text-[13px] text-white/80 hover:text-brand-yellow transition-colors">
            <Phone className="w-4 h-4 shrink-0" /> {CONTACT_PHONE_DISPLAY}
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[13px] text-white/80 hover:text-brand-yellow transition-colors">
            <Mail className="w-4 h-4 shrink-0" /> {CONTACT_EMAIL}
          </a>
          <p className="flex items-start gap-3 text-[13px] text-white/80">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> Tiruppur, Tamil Nadu, India
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <p className="max-w-7xl mx-auto px-4 md:px-8 text-[11px] text-white/50 text-center sm:text-left">
          © 2026 Ridhvick Group of Companies. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
