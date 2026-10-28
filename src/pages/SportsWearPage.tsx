import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shirt, Printer, PenTool, Upload, ArrowRight } from 'lucide-react';
import { PageShell, PageHero, Section, ItemGrid, CtaBand, CtaButton, Chips, fadeUp, whatsappEnquiry } from '../components/page/PageKit';
import { PageSection } from '../lib/useSectionRouting';

const BASE_PATH = '/sports-wear-t-shirts';

export const SPORTS_SECTIONS: PageSection[] = [
  { id: 'sports-range', slug: 'our-range', title: 'Our Range' },
  { id: 'sports-customization', slug: 'customization', title: 'Customization' },
  { id: 'sports-quote', slug: 'get-a-quote', title: 'Get a Sports Wear Quote' },
];

// Items with a catalog page link to it
const RANGE = [
  { label: 'School Sports Uniforms', to: '/catalog/uniform-primary-sports' },
  { label: 'House T-Shirts', to: '/catalog/uniform-secondary-sports' },
  { label: 'Polo T-Shirts' },
  { label: 'Round Neck T-Shirts' },
  { label: 'Tracksuits' },
  { label: 'Team Wear' },
  { label: 'Event T-Shirts', to: '/catalog/occasions' },
  { label: 'Customized Institutional T-Shirts', to: '/catalog/occasions' },
];

const PHOTOS = [
  { label: 'Primary Sports Wear', to: '/catalog/uniform-primary-sports', src: '/images/ridhvick_primary_dress_sports_two.png' },
  { label: 'Secondary Sports Wear', to: '/catalog/uniform-secondary-sports', src: '/images/ridhvick_secondary_adultsdress_sports_one.png' },
  { label: 'Event & Club T-Shirts', to: '/catalog/occasions', src: '/images/ridhvick_occassions_three.png' },
  { label: 'House T-Shirts', to: '/catalog/occasions', src: '/images/ridhvick_occassions_one.png' },
];

const QUOTE_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I would like a sports wear / T-shirt quote.', [
  'Product',
  'Logo / design',
  'Colour combination',
  'Quantity',
]);

export default function SportsWearPage() {
  const navigate = useNavigate();
  return (
    <PageShell basePath={BASE_PATH} pageTitle="Sports Wear & T-Shirts" sections={SPORTS_SECTIONS}>
      <PageHero
        crumb="Sports Wear & T-Shirts"
        title="Designed for Movement. Made for Performance."
        intro={
          <p>
            Ridhvick Uniforms provides customized sportswear and T-shirts for schools, institutions, organizations and
            teams. Our solutions can be customized according to your colours, logo, house identity and design
            requirements.
          </p>
        }
        actions={<CtaButton href={QUOTE_LINK}>GET A SPORTS WEAR QUOTE</CtaButton>}
        aside={
          <img
            src="/images/ridhvick_uniforms_hero_primary_unifroms.png"
            alt="Red, blue, green and yellow house sports uniforms"
            className="w-full h-auto rounded-2xl shadow-[0_16px_40px_rgba(0,52,111,0.18)] bg-white"
          />
        }
      />

      <Section id="sports-range" title="Our Range" tone="white">
        <ItemGrid items={RANGE} icon={Shirt} onItem={(to) => navigate(to)} />
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PHOTOS.map((p) => (
            <button
              key={p.src}
              onClick={() => navigate(p.to)}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border/40 shadow-[0_6px_20px_rgba(0,52,111,0.06)] hover:shadow-[0_14px_30px_rgba(0,52,111,0.14)] hover:-translate-y-1 transition-all text-left cursor-pointer"
            >
              <div className="aspect-[2/3] bg-gradient-to-b from-[#eef3fa] to-white">
                <img src={p.src} alt={p.label} loading="lazy" className="w-full h-full object-contain" />
              </div>
              <span className="flex items-center justify-between gap-2 px-3.5 py-3 text-[13px] font-headline font-bold text-brand-blue">
                {p.label}
                <ArrowRight className="w-4 h-4 text-brand-green shrink-0" />
              </span>
            </button>
          ))}
        </div>
      </Section>

      <Section id="sports-customization" title="Customization" tone="tint">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-brand-border/40 border-t-4 border-t-brand-green bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,52,111,0.07)]"
          >
            <div className="flex gap-3">
              <span className="w-14 h-14 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                <Printer className="w-7 h-7 text-brand-blue" strokeWidth={1.6} />
              </span>
              <span className="w-14 h-14 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                <PenTool className="w-7 h-7 text-brand-blue" strokeWidth={1.6} />
              </span>
            </div>
            <h3 className="mt-5 text-lg sm:text-xl font-headline font-extrabold text-brand-blue">Printing &amp; Embroidery</h3>
            <p className="mt-3 text-[15px] text-brand-muted leading-relaxed">
              Printing and embroidery options can be provided based on the requirement.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="rounded-2xl bg-brand-blue text-white p-7 sm:p-9 shadow-[0_14px_36px_rgba(0,52,111,0.22)]"
          >
            <span className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <Upload className="w-7 h-7 text-brand-green-light" strokeWidth={1.6} />
            </span>
            <h3 className="mt-5 text-lg sm:text-xl font-headline font-extrabold">Have your own design?</h3>
            <p className="mt-3 text-[15px] text-white/85 leading-relaxed">
              Share your logo, colour combination and quantity with us.
            </p>
            <div className="mt-5">
              <Chips items={['Logo', 'Colour Combination', 'Quantity']} light />
            </div>
          </motion.div>
        </div>
      </Section>

      <CtaBand id="sports-quote" title="Get a Sports Wear Quote" chips={['Logo', 'Colour Combination', 'Quantity']}>
        <CtaButton href={QUOTE_LINK}>GET A SPORTS WEAR QUOTE</CtaButton>
      </CtaBand>
    </PageShell>
  );
}
