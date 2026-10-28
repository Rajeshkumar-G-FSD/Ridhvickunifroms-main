import { Tag, Boxes, Factory, SlidersHorizontal, Repeat, Layers } from 'lucide-react';
import { PageShell, PageHero, HeroPanel, Section, FeatureCards, CtaBand, CtaButton, whatsappEnquiry } from '../components/page/PageKit';
import { PageSection } from '../lib/useSectionRouting';

const BASE_PATH = '/dealers-retailers';

export const DEALER_SECTIONS: PageSection[] = [
  { id: 'dealer-why', slug: 'why-partner-with-us', title: 'Why Partner with Ridhvick Uniforms?' },
  { id: 'dealer-enquire', slug: 'enquire', title: 'Dealer / Wholesale Enquiry' },
];

const WHY = [
  { icon: Tag, title: 'Branded Fabric Options', text: 'Access multiple uniform fabric brands.' },
  { icon: Boxes, title: 'Bulk Supply Support', text: 'Support for dealer and retailer requirements.' },
  { icon: Factory, title: 'Uniform Manufacturing', text: 'Support for finished uniform requirements.' },
  { icon: SlidersHorizontal, title: 'Customization', text: 'Fabric, colour, pattern, size and branding options.' },
  { icon: Repeat, title: 'Consistent Supply', text: 'Focus on consistency across recurring requirements.' },
];

const ENQUIRY_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I have a dealer / wholesale enquiry.', [
  'Business name',
  'Location',
  'Product requirements',
]);

export default function DealersPage() {
  return (
    <PageShell basePath={BASE_PATH} pageTitle="Dealers & Retailers" sections={DEALER_SECTIONS}>
      <PageHero
        crumb="Dealers & Retailers"
        title="Your Reliable Uniform & Fabric Supply Partner"
        intro={
          <p>
            Ridhvick Uniforms works with uniform dealers and retailers looking for dependable fabric and garment supply.
            Our combination of branded fabric sourcing and uniform manufacturing enables us to support different dealer
            requirements.
          </p>
        }
        actions={<CtaButton href={ENQUIRY_LINK}>DEALER / WHOLESALE ENQUIRY</CtaButton>}
        aside={
          <HeroPanel
            items={[
              { icon: Layers, label: 'Branded Fabric Sourcing' },
              { icon: Factory, label: 'Uniform Manufacturing' },
              { icon: Boxes, label: 'Bulk Supply' },
              { icon: Repeat, label: 'Consistent Supply' },
            ]}
          />
        }
      />

      <Section id="dealer-why" title="Why Partner with Ridhvick Uniforms?" tone="tint">
        <FeatureCards items={WHY} columns="lg:grid-cols-5" />
      </Section>

      <CtaBand
        id="dealer-enquire"
        prompt="Tell us about your business, location and product requirements."
        chips={['Business', 'Location', 'Product Requirements']}
      >
        <CtaButton href={ENQUIRY_LINK}>DEALER / WHOLESALE ENQUIRY</CtaButton>
      </CtaBand>
    </PageShell>
  );
}
