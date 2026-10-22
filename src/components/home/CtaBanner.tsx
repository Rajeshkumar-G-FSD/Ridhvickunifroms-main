import { ArrowRight } from 'lucide-react';
import { WHATSAPP_QUOTE_LINK, chatGptImage } from './constants';

interface CtaBannerProps {
  onViewCatalog: () => void;
}

export default function CtaBanner({ onViewCatalog }: CtaBannerProps) {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#eef3fa] scroll-mt-24">
      {/* Washed-out campus backdrop */}
      <img
        src={chatGptImage('04_58_20')}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top opacity-25 blur-[2px] scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/70 to-white/85" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] gap-6 md:gap-10 items-end">
        <img
          src={chatGptImage('08_21_21')}
          alt="Students smiling in Ridhvick uniforms"
          loading="lazy"
          className="w-full max-w-sm md:max-w-none mx-auto h-60 sm:h-72 md:h-[300px] object-cover object-top rounded-t-[40px] order-2 md:order-1"
        />

        <div className="order-1 md:order-2 py-10 md:py-14">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-headline font-black text-brand-blue uppercase leading-[1.15] tracking-tight">
            Let's Create a Uniform Identity
            <br className="hidden sm:block" /> For Your Institution
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted">
            Partner with us for premium quality uniforms tailored to your needs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-blue text-white font-headline font-bold text-sm hover:bg-brand-blue-light transition-colors"
            >
              Get Quote <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={onViewCatalog}
              className="inline-flex items-center h-12 px-7 rounded-full border-2 border-brand-blue bg-white text-brand-blue font-headline font-bold text-sm hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
            >
              View Our Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
