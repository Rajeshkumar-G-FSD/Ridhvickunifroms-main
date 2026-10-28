import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  ClipboardCheck,
  PencilRuler,
  Boxes,
  Ruler,
  CalendarClock,
  Layers,
  Shirt,
  Scissors,
  Smile,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sectionPath } from '../data/homeSections';
import { useSectionRouting, PageSection } from '../lib/useSectionRouting';
import { WHATSAPP_LINK } from '../lib/contact';

const BASE_PATH = '/school-uniforms';
const SCROLL_MT = 'scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]';

const SCHOOL_QUOTE_LINK =
  `${WHATSAPP_LINK}?text=` +
  encodeURIComponent(
    'Hi Ridhvick Uniforms, I would like a school uniform quote.\n\nSchool name:\nStudent strength:\nExisting uniform design:\nRequirements:'
  );

// Each section is reachable at /school-uniforms/<slug>
export const SCHOOL_SECTIONS: PageSection[] = [
  { id: 'school-range', slug: 'our-range', title: 'Our School Uniform Range' },
  { id: 'school-custom', slug: 'customized-for-your-school', title: 'Customized for Your School' },
  { id: 'school-bulk', slug: 'bulk-supply', title: 'Bulk School Uniform Supply' },
  { id: 'school-quote', slug: 'get-a-quote', title: 'Request a School Uniform Quote' },
];

const CONSIDERATIONS = [
  { icon: Layers, label: 'Fabric Selection' },
  { icon: Ruler, label: 'Fit' },
  { icon: Scissors, label: 'Stitching' },
  { icon: Smile, label: 'Comfort' },
];

// Items with a catalog page link to it
const RANGE: { label: string; to?: string }[] = [
  { label: 'Shirts' },
  { label: 'Trousers' },
  { label: 'Shorts' },
  { label: 'Skirts' },
  { label: 'Pinafores' },
  { label: 'Salwar & Churidar Sets' },
  { label: 'T-Shirts & Polo Shirts', to: '/catalog/occasions' },
  { label: 'Sports Uniforms', to: '/catalog/uniform-primary-sports' },
  { label: 'House Uniforms', to: '/catalog/uniform-secondary-sports' },
  { label: 'Tracksuits' },
  { label: 'Blazers', to: '/catalog/blazers' },
  { label: 'Waistcoats' },
  { label: 'Lab Coats' },
  { label: 'Ties', to: '/catalog/accessories' },
  { label: 'Belts', to: '/catalog/accessories' },
  { label: 'Sweaters & Winter Wear', to: '/catalog/hoodies' },
  { label: 'Customized School Uniforms' },
];

const BROWSE = [
  { label: 'Kindergarten', to: '/catalog/uniform-kindergarten', src: '/images/ridhvick_kindgarden_two.png' },
  { label: 'Primary Daily Wear', to: '/catalog/uniform-primary-daily', src: '/images/ridhvick_primary_dress_combo_one.png' },
  { label: 'Secondary Daily Wear', to: '/catalog/uniform-secondary-daily', src: '/images/ridhvick_secondary_girl_dress_sports_one.png' },
  { label: 'Blazers', to: '/catalog/blazers', src: '/images/ridhvick_blazer_two.png' },
  { label: 'Winter Wear', to: '/catalog/hoodies', src: '/images/ridhvick_hoodies_two.png' },
];

const DESIGN_OPTIONS = ['Fabric', 'Colour', 'Checks', 'Stripes', 'Design', 'Pattern', 'Logo', 'Embroidery', 'Printing', 'Accessories'];

const BULK_POINTS = [
  { icon: Boxes, label: 'Quantities' },
  { icon: Ruler, label: 'Sizes' },
  { icon: CalendarClock, label: 'Delivery Schedules' },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

const GreenBar = ({ center = false, light = false }: { center?: boolean; light?: boolean }) => (
  <span
    className={`block h-1 w-12 rounded-full mb-4 ${light ? 'bg-brand-green-light' : 'bg-brand-green'} ${center ? 'mx-auto' : ''}`}
  />
);

const QuoteButton = ({ className = '' }: { className?: string }) => (
  <a
    href={SCHOOL_QUOTE_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 h-12 px-5 sm:px-7 rounded-full bg-brand-green text-white font-headline font-bold text-[12.5px] sm:text-sm sm:tracking-wide whitespace-nowrap hover:bg-brand-green-dark transition-colors ${className}`}
  >
    REQUEST A SCHOOL UNIFORM QUOTE <ArrowRight className="w-4 h-4 shrink-0" />
  </a>
);

export default function SchoolUniformsPage() {
  const navigate = useNavigate();
  useSectionRouting(BASE_PATH, SCHOOL_SECTIONS, 'School Uniforms');
  const goToHomeSection = (sectionId: string) => navigate(sectionPath(sectionId));

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header cart={[]} onOpenCart={() => {}} onOpenAiAssistant={() => {}} activeSection="" onNavigate={goToHomeSection} />

      <main className="flex-grow">
        {/* Intro */}
        <section className="bg-gradient-to-br from-[#f5f8fd] to-[#eaf0f9] border-b border-brand-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-5">
                <button onClick={() => navigate('/')} className="hover:text-brand-blue cursor-pointer">Home</button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-blue font-medium">School Uniforms</span>
              </div>
              <GreenBar />
              <h1 className="text-3xl sm:text-4xl md:text-[46px] font-headline font-black text-brand-blue uppercase tracking-tight leading-[1.1]">
                School Uniforms Designed for Everyday Excellence
              </h1>
              <p className="mt-5 text-[15px] sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                Every school has its own identity, and its uniform plays an important role in representing that
                identity. Ridhvick Uniforms works with schools and educational institutions to manufacture uniforms that
                combine smart appearance, student comfort, durability and consistent quality.
              </p>
              <QuoteButton className="mt-7" />
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              src="/images/ChatGPT%20Image%20Dec%2025,%202025,%2008_57_05%20PM.png"
              alt="Students in Ridhvick school uniforms"
              className="w-auto max-w-full h-auto max-h-[460px] mx-auto rounded-2xl shadow-[0_16px_40px_rgba(0,52,111,0.18)]"
            />
          </div>
        </section>

        {/* Comfort for long school days */}
        <section className="bg-white py-12 sm:py-14">
          <motion.div
            {...fadeUp}
            className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center rounded-none"
          >
            <p className="text-[15px] sm:text-lg text-[#333840] leading-relaxed max-w-3xl border-l-4 border-brand-green pl-5">
              We understand that children wear their uniforms for long hours. Therefore, fabric selection, fit,
              stitching and comfort are important considerations in every school uniform we manufacture.
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CONSIDERATIONS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex flex-col items-center gap-2 rounded-2xl bg-[#f5f8fc] border border-brand-border/40 px-4 py-4 min-w-[110px]">
                  <span className="w-11 h-11 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-blue" strokeWidth={1.7} />
                  </span>
                  <span className="text-[13px] font-headline font-bold text-brand-blue text-center">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Range */}
        <section id="school-range" className={`bg-[#f5f8fc] py-14 sm:py-20 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center">
              <GreenBar center />
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-headline font-black text-brand-blue uppercase tracking-tight">
                Our School Uniform Range
              </h2>
            </div>

            <ul className="mt-10 grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {RANGE.map((item, i) => {
                const content = (
                  <>
                    <span className="w-9 h-9 shrink-0 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                      <Shirt className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
                    </span>
                    <span className="flex-grow text-sm font-headline font-bold text-brand-blue">{item.label}</span>
                    {item.to && <ArrowRight className="w-4 h-4 text-brand-green shrink-0" />}
                  </>
                );
                const cls =
                  'w-full h-full flex items-center gap-3 rounded-xl bg-white border border-brand-border/40 px-4 py-3.5 text-left shadow-[0_4px_14px_rgba(0,52,111,0.04)]';
                return (
                  <motion.li key={item.label} {...fadeUp} transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}>
                    {item.to ? (
                      <button
                        onClick={() => navigate(item.to!)}
                        className={`${cls} hover:border-brand-green hover:shadow-[0_10px_24px_rgba(0,52,111,0.10)] transition-all cursor-pointer`}
                      >
                        {content}
                      </button>
                    ) : (
                      <div className={cls}>{content}</div>
                    )}
                  </motion.li>
                );
              })}
            </ul>

            {/* Real product photos, linking to the catalog */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {BROWSE.map((b) => (
                <button
                  key={b.to}
                  onClick={() => navigate(b.to)}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border/40 shadow-[0_6px_20px_rgba(0,52,111,0.06)] hover:shadow-[0_14px_30px_rgba(0,52,111,0.14)] hover:-translate-y-1 transition-all text-left cursor-pointer"
                >
                  <div className="aspect-[2/3] bg-gradient-to-b from-[#eef3fa] to-white">
                    <img src={b.src} alt={b.label} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                  <span className="flex items-center justify-between gap-2 px-3.5 py-3 text-[13px] font-headline font-bold text-brand-blue">
                    {b.label}
                    <ArrowRight className="w-4 h-4 text-brand-green shrink-0" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Customized */}
        <section id="school-custom" className={`bg-white py-14 sm:py-20 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center">
              <GreenBar center />
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-headline font-black text-brand-blue uppercase tracking-tight">
                Customized for Your School
              </h2>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              <motion.div {...fadeUp} className="rounded-2xl border border-brand-border/40 border-t-4 border-t-brand-green bg-white p-7 sm:p-9 shadow-[0_10px_30px_rgba(0,52,111,0.07)]">
                <span className="w-14 h-14 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                  <ClipboardCheck className="w-7 h-7 text-brand-blue" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg sm:text-xl font-headline font-extrabold text-brand-blue">
                  Already have an established school uniform?
                </h3>
                <p className="mt-3 text-[15px] text-brand-muted leading-relaxed">
                  We can manufacture according to your existing specifications.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-2xl bg-brand-blue text-white p-7 sm:p-9 shadow-[0_14px_36px_rgba(0,52,111,0.22)]"
              >
                <span className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <PencilRuler className="w-7 h-7 text-brand-green-light" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-lg sm:text-xl font-headline font-extrabold">Planning a new uniform?</h3>
                <p className="mt-3 text-[15px] text-white/85 leading-relaxed">
                  Our team can assist in selecting suitable fabric, colour, checks, stripes, design, pattern, logo,
                  embroidery, printing and accessories.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {DESIGN_OPTIONS.map((o) => (
                    <li key={o} className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-headline font-semibold">
                      {o}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bulk supply */}
        <section id="school-bulk" className={`bg-brand-blue text-white py-14 sm:py-16 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <motion.div {...fadeUp}>
              <GreenBar light />
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-headline font-black uppercase tracking-tight">
                Bulk School Uniform Supply
              </h2>
              <p className="mt-4 text-[15px] sm:text-lg text-white/85 leading-relaxed max-w-xl">
                We support institutional requirements and can plan production according to quantities, sizes and
                required delivery schedules.
              </p>
            </motion.div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BULK_POINTS.map(({ icon: Icon, label }, i) => (
                <motion.li
                  key={label}
                  {...fadeUp}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex sm:flex-col items-center gap-3 sm:gap-3 rounded-2xl bg-white/[0.07] border border-white/15 px-5 py-5 sm:py-7 sm:text-center"
                >
                  <Icon className="w-8 h-8 text-brand-green-light shrink-0" strokeWidth={1.5} />
                  <span className="text-[15px] font-headline font-bold">{label}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section id="school-quote" className={`bg-gradient-to-r from-[#eef3fa] to-white py-14 sm:py-16 ${SCROLL_MT}`}>
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <GreenBar center />
            <h2 className="text-2xl sm:text-3xl font-headline font-black text-brand-blue tracking-tight leading-snug">
              Tell us your school name, student strength, existing uniform design and requirements.
            </h2>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {['School Name', 'Student Strength', 'Existing Uniform Design', 'Requirements'].map((f) => (
                <li key={f} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-brand-border/50 px-3.5 py-1.5 text-xs font-headline font-semibold text-brand-blue">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" /> {f}
                </li>
              ))}
            </ul>
            <QuoteButton className="mt-8" />
          </div>
        </section>
      </main>

      <Footer onNavigate={goToHomeSection} />
    </div>
  );
}
