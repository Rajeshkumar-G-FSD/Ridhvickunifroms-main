import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, CheckCircle2, type LucideIcon } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { sectionPath } from '../../data/homeSections';
import { useSectionRouting, PageSection } from '../../lib/useSectionRouting';
import { WHATSAPP_LINK } from '../../lib/contact';
import { CartItem } from '../../types';

// Shared building blocks for the inner content pages (fabrics, corporate,
// sports wear, dealers, contact, manufacturing, catalog) so they stay visually
// consistent: navy/white base with restrained green accents.

export const SCROLL_MT = 'scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]';

export const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.45 },
};

/** WhatsApp link with a prefilled enquiry template. */
export const whatsappEnquiry = (intro: string, fields: string[] = []) =>
  `${WHATSAPP_LINK}?text=` + encodeURIComponent([intro, '', ...fields.map((f) => `${f}:`)].join('\n').trim());

export const GreenBar = ({ center = false, light = false }: { center?: boolean; light?: boolean }) => (
  <span
    className={`block h-1 w-12 rounded-full mb-4 ${light ? 'bg-brand-green-light' : 'bg-brand-green'} ${center ? 'mx-auto' : ''}`}
  />
);

export function CtaButton({
  href,
  onClick,
  children,
  variant = 'green',
  className = '',
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'green' | 'outline' | 'white';
  className?: string;
}) {
  const styles = {
    green: 'bg-brand-green text-white hover:bg-brand-green-dark',
    outline: 'border-2 border-brand-blue text-brand-blue bg-white hover:bg-brand-blue hover:text-white',
    white: 'bg-white text-brand-blue hover:bg-brand-green hover:text-white',
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 h-12 px-5 sm:px-7 rounded-full font-headline font-bold text-[12.5px] sm:text-sm sm:tracking-wide whitespace-nowrap transition-colors cursor-pointer ${styles} ${className}`;
  const inner = (
    <>
      {children} <ArrowRight className="w-4 h-4 shrink-0" />
    </>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Header + footer + per-section URLs (`${basePath}/<slug>`). */
export function PageShell({
  basePath,
  pageTitle,
  sections,
  cart = [],
  onOpenCart = () => {},
  children,
}: {
  basePath: string;
  pageTitle: string;
  sections: PageSection[];
  cart?: CartItem[];
  onOpenCart?: () => void;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  useSectionRouting(basePath, sections, pageTitle);
  const goToHomeSection = (sectionId: string) => navigate(sectionPath(sectionId));

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header cart={cart} onOpenCart={onOpenCart} onOpenAiAssistant={() => {}} activeSection="" onNavigate={goToHomeSection} />
      <main className="flex-grow">{children}</main>
      <Footer onNavigate={goToHomeSection} />
    </div>
  );
}

export function PageHero({
  crumb,
  title,
  tagline,
  intro,
  actions,
  aside,
}: {
  crumb: string;
  title: string;
  tagline?: string;
  intro: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-[#f5f8fd] to-[#eaf0f9] border-b border-brand-border/30">
      <div
        className={`max-w-7xl mx-auto px-4 md:px-8 py-12 sm:py-16 grid grid-cols-1 gap-10 items-center ${
          aside ? 'lg:grid-cols-[1.3fr_1fr]' : ''
        }`}
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-5">
            <button onClick={() => navigate('/')} className="hover:text-brand-blue cursor-pointer">Home</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-blue font-medium">{crumb}</span>
          </div>
          <GreenBar />
          <h1 className="text-3xl sm:text-4xl md:text-[46px] font-headline font-black text-brand-blue uppercase tracking-tight leading-[1.1] max-w-4xl">
            {title}
          </h1>
          {tagline && (
            <p className="mt-4 text-lg sm:text-xl font-headline font-bold text-brand-green">{tagline}</p>
          )}
          <div className="mt-5 text-[15px] sm:text-lg text-brand-muted leading-relaxed max-w-3xl space-y-4">{intro}</div>
          {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
        </motion.div>
        {aside && (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {aside}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/** Navy panel for hero asides on pages without approved photography. */
export function HeroPanel({ items, caption }: { items: { icon: LucideIcon; label: string }[]; caption?: string }) {
  return (
    <div className="rounded-3xl bg-brand-blue text-white p-7 sm:p-9 shadow-[0_18px_44px_rgba(0,52,111,0.25)]">
      {caption && <p className="text-lg sm:text-xl font-headline font-extrabold leading-snug">{caption}</p>}
      <ul className={`grid grid-cols-2 gap-3 ${caption ? 'mt-6' : ''}`}>
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex flex-col items-start gap-3 rounded-2xl bg-white/[0.07] border border-white/15 p-4">
            <Icon className="w-7 h-7 text-brand-green-light" strokeWidth={1.5} />
            <span className="text-[13px] sm:text-sm font-headline font-bold leading-snug">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Section({
  id,
  title,
  intro,
  tone = 'white',
  center = true,
  children,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  tone?: 'white' | 'tint' | 'navy';
  center?: boolean;
  children?: ReactNode;
}) {
  const bg = { white: 'bg-white', tint: 'bg-[#f5f8fc]', navy: 'bg-brand-blue text-white' }[tone];
  return (
    <section id={id} className={`${bg} py-14 sm:py-20 ${SCROLL_MT}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={center ? 'text-center' : ''}>
          <GreenBar center={center} light={tone === 'navy'} />
          <h2
            className={`text-2xl sm:text-3xl md:text-[38px] font-headline font-black uppercase tracking-tight ${
              tone === 'navy' ? '' : 'text-brand-blue'
            }`}
          >
            {title}
          </h2>
          {intro && (
            <div
              className={`mt-4 text-[15px] sm:text-lg leading-relaxed max-w-3xl ${center ? 'mx-auto' : ''} ${
                tone === 'navy' ? 'text-white/85' : 'text-brand-muted'
              }`}
            >
              {intro}
            </div>
          )}
        </div>
        {children && <div className="mt-10 sm:mt-12">{children}</div>}
      </div>
    </section>
  );
}

/** Grid of simple item tiles (product / range lists). */
export function ItemGrid({
  items,
  icon: Icon = CheckCircle2,
  onItem,
}: {
  items: { label: string; to?: string }[];
  icon?: LucideIcon;
  onItem?: (to: string) => void;
}) {
  return (
    <ul className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, i) => {
        const content = (
          <>
            <span className="w-9 h-9 shrink-0 rounded-full bg-[#e8f5ee] flex items-center justify-center">
              <Icon className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
            </span>
            <span className="flex-grow text-sm font-headline font-bold text-brand-blue">{item.label}</span>
            {item.to && <ArrowRight className="w-4 h-4 text-brand-green shrink-0" />}
          </>
        );
        const cls =
          'w-full h-full flex items-center gap-3 rounded-xl bg-white border border-brand-border/40 px-4 py-3.5 text-left shadow-[0_4px_14px_rgba(0,52,111,0.04)]';
        return (
          <motion.li key={item.label} {...fadeUp} transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}>
            {item.to && onItem ? (
              <button
                onClick={() => onItem(item.to!)}
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
  );
}

/** Icon cards with a title and description (benefits, values, reasons). */
export function FeatureCards({
  items,
  columns = 'lg:grid-cols-4',
}: {
  items: { icon: LucideIcon; title: string; text?: string }[];
  columns?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${columns} gap-4 sm:gap-5`}>
      {items.map(({ icon: Icon, title, text }, i) => (
        <motion.div
          key={title}
          {...fadeUp}
          transition={{ duration: 0.45, delay: (i % 4) * 0.07 }}
          className="flex flex-col rounded-2xl border border-brand-border/40 bg-white p-6 shadow-[0_6px_20px_rgba(0,52,111,0.05)] hover:shadow-[0_12px_28px_rgba(0,52,111,0.12)] hover:-translate-y-0.5 transition-all"
        >
          <span className="w-12 h-12 rounded-full bg-[#e8f5ee] flex items-center justify-center">
            <Icon className="w-6 h-6 text-brand-blue" strokeWidth={1.6} />
          </span>
          <h3 className="mt-4 text-base font-headline font-extrabold text-brand-blue">{title}</h3>
          {text && <p className="mt-2 text-[13px] sm:text-sm text-brand-muted leading-relaxed">{text}</p>}
        </motion.div>
      ))}
    </div>
  );
}

export function Chips({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((c) => (
        <li
          key={c}
          className={
            light
              ? 'rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs font-headline font-semibold'
              : 'inline-flex items-center gap-1.5 rounded-full border border-brand-border/50 bg-white px-3.5 py-1.5 text-xs font-headline font-semibold text-brand-blue'
          }
        >
          {!light && <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />} {c}
        </li>
      ))}
    </ul>
  );
}

/** Closing enquiry band. */
export function CtaBand({
  id,
  title,
  prompt,
  chips,
  children,
}: {
  id?: string;
  title?: string;
  prompt?: string;
  chips?: string[];
  children: ReactNode;
}) {
  return (
    <section id={id} className={`bg-gradient-to-r from-[#eef3fa] to-white py-14 sm:py-16 ${SCROLL_MT}`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <GreenBar center />
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-headline font-black text-brand-blue uppercase tracking-tight">
            {title}
          </h2>
        )}
        {prompt && (
          <p className={`${title ? 'mt-4 text-[15px] sm:text-lg text-brand-muted' : 'text-2xl sm:text-3xl font-headline font-black text-brand-blue tracking-tight'} leading-snug`}>
            {prompt}
          </p>
        )}
        {chips && (
          <div className="mt-6 flex justify-center">
            <Chips items={chips} />
          </div>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </section>
  );
}
