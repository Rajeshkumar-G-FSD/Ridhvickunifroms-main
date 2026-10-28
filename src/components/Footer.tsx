import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { SITE_NAV } from '../data/siteNav';
import { PHONE_PRIMARY, PHONE_SECONDARY, CONTACT_EMAIL, WHATSAPP_LINK, WHATSAPP_QUOTE_LINK } from '../lib/contact';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const headingClass =
  "text-sm font-headline font-bold text-white mb-4 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-8 after:h-[2px] after:bg-brand-green-light";
const linkClass = 'text-left text-[13px] text-white/75 hover:text-brand-green-light transition-colors cursor-pointer py-1';

export default function Footer({ onNavigate }: FooterProps) {
  const navigate = useNavigate();
  const go = (item: { section?: string; to?: string }) => {
    if (item.section) onNavigate(item.section);
    else if (item.to) navigate(item.to);
  };

  // Split the menu across two link columns
  const half = Math.ceil(SITE_NAV.length / 2);

  return (
    <footer className="bg-brand-blue text-white mt-auto w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-14 grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-full overflow-hidden bg-black border border-white/20 shrink-0">
              <img src="/images/ridhvick_logo.jpeg" alt="Ridhvick Uniforms" className="w-full h-full object-cover" />
            </span>
            <span className="text-lg sm:text-xl font-headline font-extrabold tracking-tight">RIDHVICK UNIFORMS</span>
          </div>
          <p className="text-sm font-headline font-semibold text-brand-green-light">
            One Partner. Every Uniform Solution.
          </p>
          <p className="text-[13px] text-white/75 leading-relaxed max-w-sm">
            Premium uniform solutions and branded uniform fabrics for schools, institutions, organizations, dealers
            and retailers.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-brand-green text-white font-headline font-bold text-xs tracking-wide hover:bg-brand-green-dark transition-colors"
            >
              GET A QUOTE <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-md border border-white/40 text-white font-headline font-bold text-xs tracking-wide hover:bg-white hover:text-brand-blue transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" /> CALL / WHATSAPP US
            </a>
          </div>
        </div>

        {/* Menu links */}
        <div className="col-span-2 md:col-span-4">
          <h5 className={headingClass}>Quick Links</h5>
          <div className="grid grid-cols-2 gap-x-6">
            {[SITE_NAV.slice(0, half), SITE_NAV.slice(half)].map((col, i) => (
              <div key={i} className="flex flex-col">
                {col.map((item) => (
                  <button key={item.label} onClick={() => go(item)} className={linkClass}>
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-3 flex flex-col gap-3">
          <h5 className={`${headingClass} !mb-1`}>Contact</h5>
          <p className="flex items-center gap-3 text-[13px] text-white/80">
            <MapPin className="w-4 h-4 shrink-0 text-brand-green-light" /> Tirupur | Chennai
          </p>
          <p className="flex items-center gap-3 text-[13px] text-white/80">
            <Phone className="w-4 h-4 shrink-0 text-brand-green-light" />
            <span>
              <a href={PHONE_PRIMARY.tel} className="hover:text-brand-green-light">{PHONE_PRIMARY.display}</a>
              <span className="text-white/40"> | </span>
              <a href={PHONE_SECONDARY.tel} className="hover:text-brand-green-light">{PHONE_SECONDARY.display}</a>
            </span>
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-[13px] text-white/80 hover:text-brand-green-light">
            <Mail className="w-4 h-4 shrink-0 text-brand-green-light" /> {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="max-w-7xl mx-auto px-4 md:px-8 text-xs text-white/55 text-center sm:text-left">
          © 2026 Ridhvick Uniforms. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
