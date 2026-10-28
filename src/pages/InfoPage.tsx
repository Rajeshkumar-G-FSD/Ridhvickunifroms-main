import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sectionPath } from '../data/homeSections';
import { ArrowRight, ChevronRight, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import { PHONE_PRIMARY, PHONE_SECONDARY, WHATSAPP_LINK, WHATSAPP_QUOTE_LINK } from '../lib/contact';

// Menu pages that don't have a full product catalog yet. Each gets an intro
// and direct quote/contact routes so the menu never leads to a dead end.
const INFO_PAGES: Record<string, { title: string; intro: string }> = {
  '/branded-uniform-fabrics': {
    title: 'Branded Uniform Fabrics',
    intro:
      'Branded uniform fabrics for schools, institutions, uniform dealers and retailers. Share your requirement and our team will send fabric details and swatches.',
  },
  '/corporate-industrial-uniforms': {
    title: 'Corporate & Industrial Uniforms',
    intro:
      'Uniform solutions for organizations, offices and industrial teams. Tell us your team size and requirements to get a tailored quote.',
  },
  '/dealers-retailers': {
    title: 'Dealers & Retailers',
    intro:
      'Partner with Ridhvick Uniforms to supply uniforms and branded uniform fabrics to your customers. Contact us to discuss dealer and retail supply.',
  },
};

const OFFICES = [
  { label: 'Registered Office — Tirupur', address: 'No 2/278 A2, Old Koolipalayam Road, Vavipalayam Post, Tirupur - 641 666' },
  { label: 'Sales Office — Chennai', address: 'No: 7/546, Chettinadu Green Villa, Nesamani Nagar, Perumbakkam, Chennai - 600100' },
];

export default function InfoPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = INFO_PAGES[pathname];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  const goToHomeSection = (sectionId: string) => navigate(sectionPath(sectionId));

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header cart={[]} onOpenCart={() => {}} onOpenAiAssistant={() => {}} activeSection="" onNavigate={goToHomeSection} />

      <main className="flex-grow">
        <section className="bg-gradient-to-br from-[#f5f8fd] to-[#eaf0f9] border-b border-brand-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-4">
              <button onClick={() => navigate('/')} className="hover:text-brand-blue cursor-pointer">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-brand-blue font-medium">{page?.title ?? 'Page'}</span>
            </div>
            <span className="block h-1 w-12 rounded-full bg-brand-green mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-brand-blue tracking-tight">
              {page?.title ?? 'Page not found'}
            </h1>
            <p className="mt-4 max-w-2xl text-sm sm:text-base text-brand-muted leading-relaxed">
              {page?.intro ?? "We couldn't find that page."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_QUOTE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md bg-brand-green text-white font-headline font-bold text-sm hover:bg-brand-green-dark transition-colors"
              >
                GET A QUOTE <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-md border-2 border-brand-blue text-brand-blue bg-white font-headline font-bold text-sm hover:bg-brand-blue hover:text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" /> CALL / WHATSAPP US
              </a>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {OFFICES.map((o) => (
            <div key={o.label} className="rounded-xl border border-brand-border/40 p-5">
              <p className="flex items-center gap-2 text-sm font-headline font-bold text-brand-blue">
                <MapPin className="w-4 h-4 text-brand-green" /> {o.label}
              </p>
              <p className="mt-2 text-[13px] text-brand-muted leading-relaxed">{o.address}</p>
            </div>
          ))}
          <div className="rounded-xl border border-brand-border/40 p-5">
            <p className="flex items-center gap-2 text-sm font-headline font-bold text-brand-blue">
              <Phone className="w-4 h-4 text-brand-green" /> Call Us
            </p>
            <p className="mt-2 text-[13px] text-brand-muted leading-relaxed">
              <a href={PHONE_PRIMARY.tel} className="hover:text-brand-blue">{PHONE_PRIMARY.display}</a>
              <br />
              <a href={PHONE_SECONDARY.tel} className="hover:text-brand-blue">{PHONE_SECONDARY.display}</a>
            </p>
          </div>
        </section>
      </main>

      <Footer onNavigate={goToHomeSection} />
    </div>
  );
}
