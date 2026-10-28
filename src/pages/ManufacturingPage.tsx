import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ClipboardList, Layers, Shirt, BadgeCheck, Factory, ShieldCheck, Truck, ChevronRight } from 'lucide-react';
import { PageShell, PageHero, Section, CtaBand, CtaButton, SCROLL_MT, whatsappEnquiry } from '../components/page/PageKit';
import { PageSection } from '../lib/useSectionRouting';

const BASE_PATH = '/manufacturing-process';

const STEPS = [
  {
    slug: 'understand',
    title: 'Understand',
    icon: ClipboardList,
    text: 'We understand your institution, uniform design, quantity, sizing, fabric, branding and delivery requirements.',
  },
  { slug: 'select', title: 'Select', icon: Layers, text: 'Suitable fabrics, colours, patterns and designs are shortlisted.' },
  { slug: 'sample', title: 'Sample', icon: Shirt, text: 'Where required, a sample is developed according to the finalized specifications.' },
  {
    slug: 'approve',
    title: 'Approve',
    icon: BadgeCheck,
    text: 'Design, fabric, colour, fitting and other specifications are finalized before bulk production.',
  },
  { slug: 'manufacture', title: 'Manufacture', icon: Factory, text: 'Production begins according to the approved requirements.' },
  {
    slug: 'quality-check',
    title: 'Quality Check',
    icon: ShieldCheck,
    text: 'Finished garments are inspected against relevant specifications and workmanship.',
  },
  {
    slug: 'deliver',
    title: 'Deliver',
    icon: Truck,
    text: 'Uniforms are packed and prepared for delivery according to the agreed schedule.',
  },
];

// /manufacturing-process/<step> opens each step; the process overview and CTA have their own too
export const PROCESS_SECTIONS: PageSection[] = [
  { id: 'process-steps', slug: 'our-process', title: 'Our Process' },
  ...STEPS.map((s, i) => ({ id: `step-${s.slug}`, slug: s.slug, title: `Step ${String(i + 1).padStart(2, '0')} — ${s.title}` })),
  { id: 'process-cta', slug: 'discuss-your-requirement', title: 'Discuss Your Requirement' },
];

const DISCUSS_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I have an upcoming uniform requirement to discuss.', [
  'Institution / company',
  'Uniform type',
  'Approximate quantity',
  'Required delivery date',
]);

export default function ManufacturingPage() {
  const navigate = useNavigate();
  return (
    <PageShell basePath={BASE_PATH} pageTitle="Manufacturing Process" sections={PROCESS_SECTIONS}>
      <PageHero
        crumb="Manufacturing Process"
        title="From Your Requirement to the Finished Uniform"
        intro={
          <p>
            Ridhvick Uniforms follows a customer-focused process to understand uniform requirements, finalize
            specifications and coordinate production and delivery.
          </p>
        }
        actions={<CtaButton href={DISCUSS_LINK}>DISCUSS YOUR REQUIREMENT</CtaButton>}
      />

      <Section id="process-steps" title="Our Process" tone="tint">
        {/* Step overview — each chip opens that step's URL */}
        <ol className="flex flex-wrap justify-center items-center gap-2">
          {STEPS.map((s, i) => (
            <Fragment key={s.slug}>
              {i > 0 && <ChevronRight className="hidden md:block w-4 h-4 text-brand-green" />}
              <li>
                <button
                  onClick={() => navigate(`${BASE_PATH}/${s.slug}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-brand-border/50 px-3.5 py-2 text-xs sm:text-[13px] font-headline font-bold text-brand-blue hover:border-brand-green transition-colors cursor-pointer"
                >
                  <span className="text-brand-green">{String(i + 1).padStart(2, '0')}</span> {s.title}
                </button>
              </li>
            </Fragment>
          ))}
        </ol>

        {/* Timeline */}
        <ol className="relative mt-12 max-w-4xl mx-auto">
          <span aria-hidden className="absolute left-[27px] sm:left-[31px] top-2 bottom-2 w-[2px] bg-brand-green/25" />
          {STEPS.map(({ slug, title, icon: Icon, text }, i) => (
            <motion.li
              key={slug}
              id={`step-${slug}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45 }}
              className={`relative flex gap-5 sm:gap-6 pb-6 last:pb-0 ${SCROLL_MT}`}
            >
              <span className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full bg-brand-blue text-white flex flex-col items-center justify-center shadow-[0_8px_20px_rgba(0,52,111,0.25)]">
                <span className="text-[10px] font-headline font-bold text-brand-green-light leading-none">STEP</span>
                <span className="text-lg sm:text-xl font-headline font-black leading-none mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </span>
              <div className="flex-grow rounded-2xl bg-white border border-brand-border/40 p-5 sm:p-6 shadow-[0_6px_20px_rgba(0,52,111,0.06)]">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#e8f5ee] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-blue" strokeWidth={1.7} />
                  </span>
                  <h3 className="text-lg sm:text-xl font-headline font-extrabold text-brand-blue">{title}</h3>
                </div>
                <p className="mt-3 text-[15px] text-brand-muted leading-relaxed">{text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Section>

      <CtaBand id="process-cta" prompt="Have an upcoming uniform requirement?">
        <CtaButton href={DISCUSS_LINK}>DISCUSS YOUR REQUIREMENT</CtaButton>
      </CtaBand>
    </PageShell>
  );
}
