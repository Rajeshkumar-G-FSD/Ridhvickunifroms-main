import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  HardHat,
  Layers,
  PenTool,
  Printer,
  Palette,
  Stamp,
  Boxes,
  ShieldCheck,
  Shirt,
  CheckCircle2,
} from 'lucide-react';
import {
  PageShell,
  PageHero,
  Section,
  FeatureCards,
  CtaBand,
  CtaButton,
  GreenBar,
  SCROLL_MT,
  whatsappEnquiry,
} from '../components/page/PageKit';
import { AnimatedHeading, AnimatedSubtitle } from '../components/AnimatedText';
import { PageSection } from '../lib/useSectionRouting';
import { slideIn } from '../lib/motion';

const BASE_PATH = '/branded-uniforms';

const IMG = {
  team: '/images/ridhvick_branded_corporate_team.jpg',
  industrial: '/images/ridhvick_branded_industrial_uniforms.jpg',
  banner: '/images/ridhvick_branded_corporate_banner.jpg',
};

export const BRANDED_SECTIONS: PageSection[] = [
  { id: 'branded-corporate', slug: 'corporate-uniforms', title: 'Corporate Uniforms' },
  { id: 'branded-industrial', slug: 'industrial-uniforms', title: 'Industrial Uniforms' },
  { id: 'branded-range', slug: 'product-range', title: 'Our Branded Uniform Range' },
  { id: 'branded-options', slug: 'branding-options', title: 'Branding Options' },
  { id: 'branded-why', slug: 'why-choose-us', title: 'Why Choose Ridhvick Uniforms?' },
  { id: 'branded-quote', slug: 'get-a-quote', title: 'Request a Branded Uniform Quote' },
];

// Rows alternate image/text sides; lists use the brief's corporate & industrial ranges.
// A row without an image shows its text on the left and its list on the right.
const ROWS: {
  id: string;
  icon: typeof Briefcase;
  title: string;
  text: string;
  items: string[];
  image?: string;
  alt?: string;
  to: string;
}[] = [
  {
    id: 'branded-corporate',
    icon: Briefcase,
    title: 'Corporate Uniforms',
    text: 'Professional uniforms that strengthen brand identity — tailored for corporate offices, service organizations and customer-facing teams.',
    items: ['Formal Shirts', 'Trousers', 'Polo T-Shirts', 'Jackets', 'Staff Uniforms', 'Customized Corporate Apparel'],
    // No image: the team photo is shown once, in the hero
    to: '/corporate-industrial-uniforms/corporate-uniforms',
  },
  {
    id: 'branded-industrial',
    icon: HardHat,
    title: 'Industrial Uniforms',
    text: 'Practical workforce uniforms for factories and industries — branded polos, workwear and jackets built for the shop floor.',
    items: ['Industrial Shirts', 'Trousers', 'Workwear', 'Factory Uniforms', 'Jackets', 'Polo T-Shirts', 'Staff Uniforms'],
    image: IMG.industrial,
    alt: 'Industrial branded polos, workwear jackets and hanging polo shirts',
    to: '/corporate-industrial-uniforms/industrial-uniforms',
  },
];

const RANGE = [
  { icon: Shirt, title: 'Polos', text: 'Branded polo T-shirts with contrast collars and tipping.' },
  { icon: Shirt, title: 'T-Shirts', text: 'Round-neck and team T-shirts for staff, events and teams.' },
  { icon: HardHat, title: 'Workwear', text: 'Industrial shirts, trousers and jackets for the workforce.' },
  { icon: Layers, title: 'Custom Uniforms', text: 'Uniforms designed around your brand colours and requirements.' },
];

const BRANDING = [
  { icon: PenTool, title: 'Embroidery', text: 'Durable embroidered logos for a premium, long-lasting finish.' },
  { icon: Printer, title: 'Printing', text: 'Printed logos and artwork in your brand colours.' },
  { icon: Stamp, title: 'DTF Printing', text: 'Detailed, full-colour logos and graphics.' },
  { icon: Palette, title: 'Brand Colours', text: 'Garment, collar and trim colours matched to your identity.' },
];

const WHY = [
  { icon: Layers, title: 'Premium Fabrics', text: 'Quality fabrics chosen for comfort and a professional look.' },
  { icon: PenTool, title: 'Custom Branding', text: 'Embroidery, printing and DTF — your logo, your colours.' },
  { icon: Boxes, title: 'Bulk Orders', text: 'Production planned around your team size and delivery schedule.' },
  { icon: ShieldCheck, title: 'Durable & Comfortable', text: 'Built for long working days and repeated washing.' },
];

const QUOTE_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I would like a branded uniform quote.', [
  'Company name',
  'Uniform type (polos / T-shirts / workwear)',
  'Branding (embroidery / printing / DTF)',
  'Approximate quantity',
]);

export default function BrandedUniformsPage() {
  const navigate = useNavigate();

  return (
    <PageShell basePath={BASE_PATH} pageTitle="Branded Uniforms" sections={BRANDED_SECTIONS}>
      <PageHero
        crumb="Branded Uniforms"
        title="Branded Uniforms for Your Team"
        tagline="Uniform Your Team. Strengthen Your Brand."
        intro="Ridhvick Uniforms manufactures branded uniforms for corporate offices, factories, industries, service organizations and other businesses — customized with your brand colours, logo, embroidery, printing and design requirements."
        actions={
          <>
            <CtaButton href={QUOTE_LINK}>REQUEST A BRANDED UNIFORM QUOTE</CtaButton>
          </>
        }
        aside={
          <img
            src={IMG.team}
            alt="Ridhvick team in branded polo uniforms"
            className="w-full h-auto rounded-2xl shadow-[0_16px_40px_rgba(0,52,111,0.18)]"
          />
        }
      />

      {/* Alternating image / text rows */}
      {ROWS.map((row, r) => {
        const Icon = row.icon;
        const imageFirst = r % 2 === 0;
        const list = (
          <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2.5">
            {row.items.map((item, i) => (
              <motion.li
                key={item}
                {...slideIn(i, 36)}
                className="flex items-center gap-2.5 rounded-xl bg-white border border-brand-border/40 px-3.5 py-3 text-sm font-headline font-bold text-brand-blue shadow-[0_4px_14px_rgba(0,52,111,0.04)]"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" /> {item}
              </motion.li>
            ))}
          </ul>
        );
        const intro = (
          <>
            <span className="mb-5 w-14 h-14 rounded-full bg-[#e8f5ee] flex items-center justify-center">
              <Icon className="w-7 h-7 text-brand-blue" strokeWidth={1.6} />
            </span>
            <GreenBar />
            <AnimatedHeading
              text={row.title}
              className="text-2xl sm:text-3xl md:text-[36px] font-headline font-black text-brand-blue uppercase tracking-tight"
            />
            <AnimatedSubtitle text={row.text} className="mt-4 text-[15px] sm:text-lg text-brand-muted leading-relaxed" />
          </>
        );
        const exploreButton = (
          <button
            onClick={() => navigate(row.to)}
            className="mt-7 inline-flex items-center gap-2 h-11 px-6 rounded-full border-2 border-brand-blue text-brand-blue font-headline font-bold text-sm hover:bg-brand-blue hover:text-white transition-colors cursor-pointer"
          >
            Explore {row.title} <ArrowRight className="w-4 h-4" />
          </button>
        );

        if (!row.image) {
          return (
            <section key={row.id} id={row.id} className={`${r % 2 ? 'bg-[#f5f8fc]' : 'bg-white'} py-14 sm:py-20 ${SCROLL_MT}`}>
              <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                <motion.div {...slideIn(0, 80)}>
                  {intro}
                  {exploreButton}
                </motion.div>
                <motion.div {...slideIn(1, 80)}>{list}</motion.div>
              </div>
            </section>
          );
        }

        return (
          <section key={row.id} id={row.id} className={`${r % 2 ? 'bg-[#f5f8fc]' : 'bg-white'} py-14 sm:py-20 ${SCROLL_MT}`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <motion.div {...slideIn(imageFirst ? 0 : 1, 80)} className={imageFirst ? 'lg:order-1' : 'lg:order-2'}>
                <img src={row.image} alt={row.alt} loading="lazy" className="w-full h-auto rounded-2xl shadow-[0_16px_40px_rgba(0,52,111,0.16)]" />
              </motion.div>
              <motion.div {...slideIn(imageFirst ? 1 : 0, 80)} className={imageFirst ? 'lg:order-2' : 'lg:order-1'}>
                {intro}
                <div className="mt-6">{list}</div>
                {exploreButton}
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Full banner — shown whole, never cropped */}
      <section className="bg-white py-12 sm:py-16">
        <motion.div {...slideIn(0, 60)} className="max-w-7xl mx-auto px-4 md:px-8">
          <img
            src={IMG.banner}
            alt="Corporate T-shirts and uniforms — professional wear for modern teams: premium fabrics, custom branding, bulk orders, durable and comfortable"
            loading="lazy"
            className="w-full h-auto rounded-2xl shadow-[0_16px_40px_rgba(0,52,111,0.16)]"
          />
        </motion.div>
      </section>

      <Section
        id="branded-range"
        title="Our Branded Uniform Range"
        intro="Polos, T-shirts, workwear and custom uniforms — produced with your branding for a consistent, professional team look."
        tone="tint"
      >
        <FeatureCards items={RANGE} />
      </Section>

      <Section
        id="branded-options"
        title="Branding Options"
        intro="Uniforms can be customized according to your brand colours, logo, embroidery, printing and design requirements."
        tone="navy"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {BRANDING.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              {...slideIn(i)}
              className="flex flex-col rounded-2xl bg-white/[0.07] border border-white/15 p-6"
            >
              <Icon className="w-8 h-8 text-brand-green-light" strokeWidth={1.5} />
              <h3 className="mt-4 text-base font-headline font-extrabold">{title}</h3>
              <p className="mt-2 text-[13px] sm:text-sm text-white/80 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="branded-why" title="Why Choose Ridhvick Uniforms?" tone="white">
        <FeatureCards items={WHY} />
      </Section>

      <CtaBand
        id="branded-quote"
        title="Uniform Your Team. Strengthen Your Brand."
        prompt="Share your company name, uniform type, preferred branding and approximate quantity — our team will help you plan the right uniforms."
        chips={['Company Name', 'Uniform Type', 'Branding Method', 'Quantity']}
      >
        <CtaButton href={QUOTE_LINK}>REQUEST A BRANDED UNIFORM QUOTE</CtaButton>
      </CtaBand>
    </PageShell>
  );
}
