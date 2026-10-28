import { ArrowRight } from 'lucide-react';
import { chatGptImage } from './constants';
import { WHATSAPP_LINK } from '../../lib/contact';

const SCHOOL_QUOTE_LINK =
  `${WHATSAPP_LINK}?text=` + encodeURIComponent('Hi Ridhvick Uniforms, I would like a quote for school uniforms.');

export default function CtaBanner() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-r from-[#eef3fa] to-white scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]">
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-[minmax(0,420px)_1fr] gap-6 md:gap-10 items-end">
        <img
          src={chatGptImage('08_21_21')}
          alt="Students smiling in Ridhvick uniforms"
          loading="lazy"
          className="w-auto max-w-full h-auto max-h-[340px] mx-auto rounded-t-[32px] order-2 md:order-1"
        />

        <div className="order-1 md:order-2 py-10 md:py-14">
          <span className="block h-1 w-12 rounded-full bg-brand-green mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-headline font-black text-brand-blue uppercase leading-[1.15] tracking-tight">
            Planning Uniforms for Your School?
          </h2>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-brand-muted leading-relaxed">
            Whether you are starting a new school, redesigning your existing uniform or looking for a reliable uniform
            supplier, our team can help.
          </p>
          <a
            href={SCHOOL_QUOTE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-brand-green text-white font-headline font-bold text-sm tracking-wide hover:bg-brand-green-dark transition-colors"
          >
            REQUEST A SCHOOL UNIFORM QUOTE <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
