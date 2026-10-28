import { motion } from 'motion/react';
import { Layers, Tag, BookOpenCheck, Boxes, Shirt, Award } from 'lucide-react';
import { PageShell, PageHero, Section, ItemGrid, FeatureCards, CtaBand, CtaButton, fadeUp, whatsappEnquiry } from '../components/page/PageKit';
import { PageSection } from '../lib/useSectionRouting';

const BASE_PATH = '/branded-uniform-fabrics';

export const FABRIC_SECTIONS: PageSection[] = [
  { id: 'fabric-brands', slug: 'our-brands', title: 'Brands We Supply' },
  { id: 'fabric-range', slug: 'fabric-range', title: 'Our Fabric Range' },
  { id: 'fabric-why', slug: 'why-source-from-us', title: 'Why Source from Ridhvick Uniforms?' },
  { id: 'fabric-enquire', slug: 'enquire', title: 'Enquire for Branded Fabrics' },
];

// Brand names only — logos/brand marks are shown once approved artwork is supplied.
const BRANDS = [
  { name: 'Sparsh-Fab' },
  { name: 'Wocky Tocky', detail: 'School Wear' },
  { name: 'Darshan Valli', detail: 'Suitings & Shirtings' },
  { name: 'Mafatlal', detail: 'Arvind Mafatlal Group' },
  { name: "Siyaram's", detail: 'Premium Suiting & Shirting' },
  { name: 'QMAX World' },
];

const RANGE = [
  { label: 'School Uniform Fabrics' },
  { label: 'Suiting & Shirting' },
  { label: 'Checks & Stripes' },
  { label: 'Plain & Dyed Fabrics' },
  { label: 'Corporate Uniform Fabrics' },
  { label: 'Bulk & Wholesale Fabric Supply' },
];

const WHY = [
  { icon: Tag, title: 'Multiple Trusted Brands', text: 'Source multiple branded fabric options through one supplier.' },
  { icon: BookOpenCheck, title: 'Uniform Industry Knowledge', text: 'We understand practical fabric requirements.' },
  { icon: Boxes, title: 'Bulk Supply', text: 'Support for institutional, dealer and retailer quantities.' },
  { icon: Shirt, title: 'Fabric & Finished Garments', text: 'Source fabric alone or work with us for complete uniform manufacturing.' },
];

const ENQUIRY_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I would like to enquire about branded uniform fabrics.', [
  'Brand',
  'Fabric type',
  'Colour/design',
  'Approximate quantity',
]);

export default function BrandedFabricsPage() {
  return (
    <PageShell basePath={BASE_PATH} pageTitle="Branded Uniform Fabrics" sections={FABRIC_SECTIONS}>
      <PageHero
        crumb="Branded Uniform Fabrics"
        title="Premium Fabrics from Trusted Brands"
        tagline="Quality Uniforms Begin with Quality Fabrics."
        intro={
          <p>
            Ridhvick Uniforms supplies branded uniform fabrics for schools, uniform dealers, retailers, institutions and
            garment manufacturers. Our fabric business enables customers to source multiple established uniform-fabric
            brands through a single supplier.
          </p>
        }
        actions={<CtaButton href={ENQUIRY_LINK}>ENQUIRE FOR BRANDED FABRICS</CtaButton>}
        aside={
          <div className="rounded-3xl bg-brand-blue text-white p-7 sm:p-9 shadow-[0_18px_44px_rgba(0,52,111,0.25)]">
            <Layers className="w-10 h-10 text-brand-green-light" strokeWidth={1.4} />
            <p className="mt-5 text-2xl sm:text-[28px] font-headline font-black leading-tight uppercase">
              Quality Uniforms Begin with Quality Fabrics.
            </p>
            <p className="mt-4 text-sm text-white/75">6 established uniform-fabric brands through one supplier.</p>
          </div>
        }
      />

      <Section id="fabric-brands" title="Brands We Supply" tone="white">
        <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANDS.map((b, i) => (
            <motion.li
              key={b.name}
              {...fadeUp}
              transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
              className="flex items-center gap-4 rounded-2xl border border-brand-border/40 bg-white px-5 py-5 shadow-[0_6px_20px_rgba(0,52,111,0.05)]"
            >
              <span className="w-12 h-12 shrink-0 rounded-xl bg-brand-blue text-white flex items-center justify-center">
                <Award className="w-6 h-6 text-brand-green-light" strokeWidth={1.6} />
              </span>
              <span>
                <span className="block text-base sm:text-lg font-headline font-extrabold text-brand-blue">{b.name}</span>
                {b.detail && <span className="block text-[13px] text-brand-muted">{b.detail}</span>}
              </span>
            </motion.li>
          ))}
        </ul>
      </Section>

      <Section id="fabric-range" title="Our Fabric Range" tone="tint">
        <ItemGrid items={RANGE} icon={Layers} />
      </Section>

      <Section id="fabric-why" title="Why Source from Ridhvick Uniforms?" tone="white">
        <FeatureCards items={WHY} />
      </Section>

      <CtaBand
        id="fabric-enquire"
        prompt="Send us the brand, fabric type, colour/design and approximate quantity."
        chips={['Brand', 'Fabric Type', 'Colour / Design', 'Approximate Quantity']}
      >
        <CtaButton href={ENQUIRY_LINK}>ENQUIRE FOR BRANDED FABRICS</CtaButton>
      </CtaBand>
    </PageShell>
  );
}
