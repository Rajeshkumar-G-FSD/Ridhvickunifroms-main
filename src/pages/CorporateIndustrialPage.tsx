import { motion } from 'motion/react';
import { Briefcase, HardHat, Palette, Stamp, Shirt, Printer, PenTool } from 'lucide-react';
import { PageShell, PageHero, HeroPanel, Section, ItemGrid, CtaBand, CtaButton, fadeUp, whatsappEnquiry } from '../components/page/PageKit';
import { PageSection } from '../lib/useSectionRouting';

const BASE_PATH = '/corporate-industrial-uniforms';

export const CORPORATE_SECTIONS: PageSection[] = [
  { id: 'corporate-uniforms', slug: 'corporate-uniforms', title: 'Corporate Uniforms' },
  { id: 'industrial-uniforms', slug: 'industrial-uniforms', title: 'Industrial Uniforms' },
  { id: 'corporate-customization', slug: 'customization', title: 'Customization' },
  { id: 'corporate-quote', slug: 'get-a-quote', title: 'Request a Corporate / Industrial Quote' },
];

const CORPORATE = ['Formal Shirts', 'Trousers', 'Polo T-Shirts', 'Jackets', 'Staff Uniforms', 'Customized Corporate Apparel'].map(
  (label) => ({ label })
);
const INDUSTRIAL = ['Industrial Shirts', 'Trousers', 'Workwear', 'Factory Uniforms', 'Jackets', 'Polo T-Shirts', 'Staff Uniforms'].map(
  (label) => ({ label })
);

const CUSTOM_OPTIONS = [
  { icon: Palette, label: 'Brand Colours' },
  { icon: Stamp, label: 'Logo' },
  { icon: PenTool, label: 'Embroidery' },
  { icon: Printer, label: 'Printing' },
  { icon: Shirt, label: 'Design Requirements' },
];

const QUOTE_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I would like a corporate / industrial uniform quote.', [
  'Organization name',
  'Uniform type',
  'Approximate quantity',
  'Requirements',
]);

export default function CorporateIndustrialPage() {
  return (
    <PageShell basePath={BASE_PATH} pageTitle="Corporate & Industrial Uniforms" sections={CORPORATE_SECTIONS}>
      <PageHero
        crumb="Corporate & Industrial Uniforms"
        title="Professional Uniforms for Your Workforce"
        intro={
          <p>
            A professional uniform creates consistency across your workforce while strengthening your organization's
            brand identity. Ridhvick Uniforms provides customized uniforms for corporate offices, factories, industries,
            service organizations and other businesses.
          </p>
        }
        actions={<CtaButton href={QUOTE_LINK}>REQUEST A CORPORATE / INDUSTRIAL QUOTE</CtaButton>}
        aside={
          <HeroPanel
            caption="Uniform Your Team. Strengthen Your Brand."
            items={[
              { icon: Briefcase, label: 'Corporate Uniforms' },
              { icon: HardHat, label: 'Industrial Uniforms' },
            ]}
          />
        }
      />

      <Section id="corporate-uniforms" title="Corporate Uniforms" tone="white">
        <ItemGrid items={CORPORATE} icon={Briefcase} />
      </Section>

      <Section id="industrial-uniforms" title="Industrial Uniforms" tone="tint">
        <ItemGrid items={INDUSTRIAL} icon={HardHat} />
      </Section>

      <Section
        id="corporate-customization"
        title="Customization"
        tone="navy"
        intro="Uniforms can be customized according to your brand colours, logo, embroidery, printing and design requirements."
      >
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CUSTOM_OPTIONS.map(({ icon: Icon, label }, i) => (
            <motion.li
              key={label}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-center text-center gap-3 rounded-2xl bg-white/[0.07] border border-white/15 px-4 py-6"
            >
              <Icon className="w-8 h-8 text-brand-green-light" strokeWidth={1.5} />
              <span className="text-sm font-headline font-bold">{label}</span>
            </motion.li>
          ))}
        </ul>
      </Section>

      <CtaBand id="corporate-quote" title="Uniform Your Team. Strengthen Your Brand.">
        <CtaButton href={QUOTE_LINK}>REQUEST A CORPORATE / INDUSTRIAL QUOTE</CtaButton>
      </CtaBand>
    </PageShell>
  );
}

