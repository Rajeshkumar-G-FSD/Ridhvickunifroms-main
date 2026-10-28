import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  Eye,
  Target,
  Gem,
  BadgeCheck,
  Handshake,
  Users,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sectionPath } from '../data/homeSections';
import { useSectionRouting, PageSection } from '../lib/useSectionRouting';
import { WHATSAPP_QUOTE_LINK } from '../lib/contact';

const BASE_PATH = '/about-us';
const SCROLL_MT = 'scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]';

// Each section is reachable at /about-us/<slug>
export const ABOUT_SECTIONS: PageSection[] = [
  { id: 'about-approach', slug: 'our-approach', title: 'Our Approach' },
  { id: 'about-vision-mission', slug: 'vision-and-mission', title: 'Our Vision & Mission' },
  { id: 'about-values', slug: 'our-values', title: 'Our Values' },
  { id: 'about-promise', slug: 'our-promise', title: 'Our Promise' },
  { id: 'about-quote', slug: 'get-a-quote', title: 'Get a Quote' },
];

const OFFERINGS = [
  'School Uniforms',
  'Corporate & Industrial Uniforms',
  'Sportswear',
  'Customized T-Shirts',
  'Branded Uniform Fabrics',
];

const VALUES = [
  { icon: Gem, title: 'Quality', text: 'Never compromise on the foundation of a good uniform.' },
  { icon: BadgeCheck, title: 'Consistency', text: 'Maintain uniform standards across every order.' },
  { icon: Handshake, title: 'Reliability', text: 'Build relationships through dependable service.' },
  { icon: Users, title: 'Customer Focus', text: "Understand each institution's unique requirements." },
  { icon: TrendingUp, title: 'Continuous Improvement', text: 'Keep improving our fabrics, designs, processes and service.' },
];

const PROMISE = ['Premium Fabrics.', 'Professional Workmanship.', 'Reliable Supply.'];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

const GreenBar = ({ center = false }: { center?: boolean }) => (
  <span className={`block h-1 w-12 rounded-full bg-brand-green mb-4 ${center ? 'mx-auto' : ''}`} />
);

export default function AboutPage() {
  const navigate = useNavigate();
  useSectionRouting(BASE_PATH, ABOUT_SECTIONS, 'About Us');
  const goToHomeSection = (sectionId: string) => navigate(sectionPath(sectionId));

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header cart={[]} onOpenCart={() => {}} onOpenAiAssistant={() => {}} activeSection="" onNavigate={goToHomeSection} />

      <main className="flex-grow">
        {/* Intro */}
        <section className="bg-gradient-to-br from-[#f5f8fd] to-[#eaf0f9] border-b border-brand-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-5">
                <button onClick={() => navigate('/')} className="hover:text-brand-blue cursor-pointer">Home</button>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-blue font-medium">About Us</span>
              </div>
              <GreenBar />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-brand-blue uppercase tracking-tight leading-[1.1]">
                About Ridhvick Uniforms
              </h1>
              <p className="mt-5 text-[15px] sm:text-lg text-brand-muted leading-relaxed max-w-2xl">
                Ridhvick Uniforms is a Tirupur and Chennai-based uniform business providing school uniforms, corporate
                and industrial uniforms, sportswear, customized T-shirts and branded uniform fabrics.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-headline font-semibold text-brand-blue">
                <MapPin className="w-4 h-4 text-brand-green" /> Tirupur | Chennai
              </p>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              src="/images/ridhvick_uniforms_hero_kids_uniform.png"
              alt="Students in Ridhvick school uniforms"
              className="w-full h-auto rounded-2xl shadow-[0_16px_40px_rgba(0,52,111,0.18)] bg-white"
            />
          </div>
        </section>

        {/* Our approach */}
        <section id="about-approach" className={`bg-white py-14 sm:py-20 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-14">
            <motion.div {...fadeUp}>
              <GreenBar />
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-headline font-black text-brand-blue uppercase tracking-tight">
                Our Approach
              </h2>
            </motion.div>
            <motion.div {...fadeUp}>
              <p className="text-[15px] sm:text-lg text-[#333840] leading-relaxed">
                Our primary focus is to provide schools and institutions with uniforms that combine premium-quality
                fabrics, comfort, durability and professional workmanship. Our experience in fabric sourcing and uniform
                manufacturing enables us to provide an end-to-end solution—from selecting suitable fabrics to delivering
                finished uniforms.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {OFFERINGS.map((o) => (
                  <li
                    key={o}
                    className="inline-flex items-center gap-2 rounded-full border border-brand-border/50 bg-[#f5f8fc] px-4 py-2 text-[13px] font-headline font-semibold text-brand-blue"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-green" /> {o}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* Vision & mission */}
        <section id="about-vision-mission" className={`bg-[#f5f8fc] py-14 sm:py-20 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <motion.div {...fadeUp} className="rounded-2xl bg-brand-blue text-white p-7 sm:p-10 shadow-[0_14px_36px_rgba(0,52,111,0.22)]">
              <span className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                <Eye className="w-7 h-7 text-brand-green-light" strokeWidth={1.6} />
              </span>
              <h2 className="mt-5 text-xl sm:text-2xl font-headline font-black uppercase tracking-tight">Our Vision</h2>
              <p className="mt-3 text-[15px] sm:text-base text-white/85 leading-relaxed">
                To become one of the most trusted institutional uniform brands, recognized for quality, consistency,
                innovation and dependable service.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl bg-white border border-brand-border/40 border-t-4 border-t-brand-green p-7 sm:p-10 shadow-[0_10px_30px_rgba(0,52,111,0.08)]"
            >
              <span className="w-14 h-14 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                <Target className="w-7 h-7 text-brand-blue" strokeWidth={1.6} />
              </span>
              <h2 className="mt-5 text-xl sm:text-2xl font-headline font-black text-brand-blue uppercase tracking-tight">Our Mission</h2>
              <p className="mt-3 text-[15px] sm:text-base text-brand-muted leading-relaxed">
                To provide schools, institutions and organizations with comfortable, durable and professionally
                manufactured uniforms using premium-quality fabrics and reliable production standards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section id="about-values" className={`bg-white py-14 sm:py-20 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center">
              <GreenBar center />
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-headline font-black text-brand-blue uppercase tracking-tight">
                Our Values
              </h2>
            </div>
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {VALUES.map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex flex-col rounded-2xl border border-brand-border/40 bg-white p-6 shadow-[0_6px_20px_rgba(0,52,111,0.05)] hover:shadow-[0_12px_28px_rgba(0,52,111,0.12)] hover:-translate-y-0.5 transition-all"
                >
                  <span className="w-12 h-12 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brand-blue" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-base font-headline font-extrabold text-brand-blue">{title}</h3>
                  <p className="mt-2 text-[13px] sm:text-sm text-brand-muted leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Promise */}
        <section id="about-promise" className={`bg-brand-blue text-white py-14 sm:py-16 ${SCROLL_MT}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <span className="block h-1 w-12 rounded-full bg-brand-green-light mb-4 mx-auto" />
            <h2 className="text-xl sm:text-2xl font-headline font-black uppercase tracking-tight">Our Promise</h2>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
              {PROMISE.map((p, i) => (
                <motion.li
                  key={p}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`flex items-center justify-center gap-3 py-2 md:py-4 ${i > 0 ? 'md:border-l md:border-white/20' : ''}`}
                >
                  <CheckCircle2 className="w-7 h-7 text-brand-green-light shrink-0" strokeWidth={1.8} />
                  <span className="text-lg sm:text-xl md:text-2xl font-headline font-extrabold">{p}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section id="about-quote" className={`bg-gradient-to-r from-[#eef3fa] to-white py-14 sm:py-16 ${SCROLL_MT}`}>
          <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-headline font-black text-brand-blue tracking-tight">
              Tell us about your uniform requirements.
            </h2>
            <a
              href={WHATSAPP_QUOTE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 h-12 px-8 rounded-full bg-brand-green text-white font-headline font-bold text-sm tracking-wide hover:bg-brand-green-dark transition-colors"
            >
              GET A QUOTE <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer onNavigate={goToHomeSection} />
    </div>
  );
}
