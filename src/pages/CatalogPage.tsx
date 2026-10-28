import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  GraduationCap,
  Layers,
  Briefcase,
  Shirt,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  Tags,
  Ruler,
  MessageSquare,
  FileDown,
  type LucideIcon,
} from 'lucide-react';
import { PageShell, PageHero, Section, CtaButton, SCROLL_MT, GreenBar, fadeUp, whatsappEnquiry } from '../components/page/PageKit';
import DigitalCatalog from '../components/DigitalCatalog';
import CartDrawer from '../components/CartDrawer';
import { CATEGORY_PAGES } from '../data/categoryPages';
import { subscribeToCatalogItems } from '../lib/catalogService';
import { PageSection } from '../lib/useSectionRouting';
import { CartItem, CatalogItem, Product } from '../types';

const BASE_PATH = '/digital-catalog';

// Set this to the PDF's path (e.g. '/catalog/ridhvick-catalog.pdf') once supplied;
// the Download PDF button and feature line stay hidden until then.
const PDF_CATALOG_URL = '';

interface Collection {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  categories: string[]; // CATEGORY_PAGES slugs with approved photos
}

const COLLECTIONS: Collection[] = [
  {
    slug: 'school-uniforms',
    title: 'School Uniforms',
    description: 'Shirts, trousers, shorts, skirts, pinafores, blazers, polos, tracksuits and accessories.',
    icon: GraduationCap,
    categories: ['uniform-kindergarten', 'uniform-primary-daily', 'uniform-secondary-daily', 'blazers', 'hoodies', 'camendo', 'accessories'],
  },
  {
    slug: 'branded-uniform-fabrics',
    title: 'Branded Uniform Fabrics',
    description: 'School uniform fabrics, suiting and shirting, checks, stripes, plain and dyed fabrics.',
    icon: Layers,
    categories: [],
  },
  {
    slug: 'corporate-industrial-uniforms',
    title: 'Corporate & Industrial Uniforms',
    description: 'Formal shirts, trousers, staff uniforms, workwear and jackets.',
    icon: Briefcase,
    categories: [],
  },
  {
    slug: 'sports-wear-t-shirts',
    title: 'Sports Wear & T-Shirts',
    description: 'House T-shirts, polo T-shirts, round-neck T-shirts, tracksuits, team wear and event T-shirts.',
    icon: Shirt,
    categories: ['uniform-primary-sports', 'uniform-secondary-sports', 'occasions'],
  },
];

export const CATALOG_SECTIONS: PageSection[] = [
  { id: 'catalog-collections', slug: 'browse-our-collections', title: 'Browse Our Collections' },
  ...COLLECTIONS.map((c) => ({ id: 'catalog-gallery', slug: c.slug, title: c.title })),
  { id: 'catalog-features', slug: 'catalog-features', title: 'Catalog Features' },
  { id: 'catalog-quote', slug: 'request-a-quote', title: 'Request a Catalog or Product Quote' },
];

const FEATURES: { icon: LucideIcon; text: string; pdfOnly?: boolean }[] = [
  { icon: Camera, text: 'Clear product photographs and category-wise browsing.' },
  { icon: Tags, text: 'Product names and available customization options.' },
  { icon: Ruler, text: 'Fabric, colour, size and branding details where confirmed.' },
  { icon: FileDown, text: 'Downloadable PDF catalog, if provided by Ridhvick Uniforms.', pdfOnly: true },
  { icon: MessageSquare, text: 'Enquiry button beside each category or product to request pricing and availability.' },
];

const QUOTE_LINK = whatsappEnquiry('Hi Ridhvick Uniforms, I would like a catalog / product quote.', [
  'Product category',
  'Approximate quantity',
  'City',
  'Requirements',
]);

const enquiryFor = (label: string, photo?: string) =>
  whatsappEnquiry(`Hi Ridhvick Uniforms, I'd like pricing and availability for: ${label}${photo ? ` (${photo})` : ''}.`, [
    'Approximate quantity',
    'City',
  ]);

interface GalleryItem {
  src: string;
  category: string;
  label: string;
}

export default function CatalogPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [adminItems, setAdminItems] = useState<CatalogItem[]>([]);
  const [subFilter, setSubFilter] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Active collection tab comes from the URL: /digital-catalog/<collection>
  const tabSlug = pathname.replace(/^\/digital-catalog\/?/, '').replace(/\/+$/, '');
  const active = COLLECTIONS.find((c) => c.slug === tabSlug) ?? COLLECTIONS[0];

  useEffect(() => setSubFilter('all'), [active.slug]);
  useEffect(() => subscribeToCatalogItems(setAdminItems), []);

  const gallery: GalleryItem[] = useMemo(
    () =>
      active.categories.flatMap((slug) => {
        const page = CATEGORY_PAGES.find((p) => p.slug === slug);
        const label = page?.label ?? slug;
        const admin = adminItems
          .filter((it) => it.category === slug)
          .flatMap((it) => it.images.map((src) => ({ src, category: slug, label: it.name || label })));
        return [...admin, ...(page?.images ?? []).map((src) => ({ src, category: slug, label }))];
      }),
    [active, adminItems]
  );
  const visible = subFilter === 'all' ? gallery : gallery.filter((g) => g.category === subFilter);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % visible.length));
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + visible.length) % visible.length));
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, visible.length]);

  const handleAddToCart = (product: Product, size: string, quantity: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.selectedSize === size);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { product, selectedSize: size, quantity }];
    });
    setIsFlipbookOpen(false);
    setIsCartOpen(true);
  };
  const removeItem = (id: string, size: string) => setCart((p) => p.filter((i) => !(i.product.id === id && i.selectedSize === size)));
  const updateQty = (id: string, size: string, quantity: number) =>
    quantity <= 0
      ? removeItem(id, size)
      : setCart((p) => p.map((i) => (i.product.id === id && i.selectedSize === size ? { ...i, quantity } : i)));

  const actionButtons = (
    <>
      <CtaButton variant="outline" onClick={() => setIsFlipbookOpen(true)}>VIEW DIGITAL CATALOG</CtaButton>
      {PDF_CATALOG_URL && <CtaButton variant="outline" href={PDF_CATALOG_URL}>DOWNLOAD PDF CATALOG</CtaButton>}
      <CtaButton href={QUOTE_LINK}>REQUEST A QUOTE</CtaButton>
    </>
  );

  const current = lightbox !== null ? visible[lightbox] : null;
  const fileName = (src: string) => decodeURIComponent(src.split('/').pop() ?? '').replace(/\.[a-z]+$/i, '');

  return (
    <PageShell basePath={BASE_PATH} pageTitle="Digital Catalog" sections={CATALOG_SECTIONS} cart={cart} onOpenCart={() => setIsCartOpen(true)}>
      <PageHero
        crumb="Digital Catalog"
        title="Explore the Ridhvick Uniforms Collection"
        intro={
          <p>
            Discover our range of school uniforms, branded uniform fabrics, corporate and industrial uniforms,
            sportswear, T-shirts and customized apparel. Our digital catalog helps schools, institutions, dealers and
            businesses review product categories before sharing their requirements with our team.
          </p>
        }
        actions={actionButtons}
      />

      {/* Collections overview */}
      <Section id="catalog-collections" title="Browse Our Collections" tone="white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {COLLECTIONS.map(({ slug, title, description, icon: Icon }, i) => (
            <motion.div
              key={slug}
              {...fadeUp}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className={`flex flex-col rounded-2xl border bg-white p-6 shadow-[0_6px_20px_rgba(0,52,111,0.05)] ${
                slug === active.slug ? 'border-brand-green' : 'border-brand-border/40'
              }`}
            >
              <span className="w-12 h-12 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                <Icon className="w-6 h-6 text-brand-blue" strokeWidth={1.6} />
              </span>
              <h3 className="mt-4 text-base sm:text-lg font-headline font-extrabold text-brand-blue">{title}</h3>
              <p className="mt-2 text-[13px] sm:text-sm text-brand-muted leading-relaxed flex-grow">{description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate(`${BASE_PATH}/${slug}`)}
                  className="h-9 px-4 rounded-full bg-brand-blue text-white text-xs font-headline font-bold hover:bg-brand-blue-light transition-colors cursor-pointer"
                >
                  Browse
                </button>
                <a
                  href={enquiryFor(title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-4 inline-flex items-center rounded-full border border-brand-green text-brand-green text-xs font-headline font-bold hover:bg-brand-green hover:text-white transition-colors"
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Gallery with category tabs */}
      <section id="catalog-gallery" className={`bg-[#f5f8fc] py-14 sm:py-20 ${SCROLL_MT}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div role="tablist" aria-label="Catalog collections" className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
            {COLLECTIONS.map((c) => (
              <button
                key={c.slug}
                role="tab"
                aria-selected={c.slug === active.slug}
                onClick={() => navigate(`${BASE_PATH}/${c.slug}`)}
                className={`shrink-0 h-11 px-5 rounded-full text-[13px] font-headline font-bold transition-colors cursor-pointer ${
                  c.slug === active.slug ? 'bg-brand-blue text-white' : 'bg-white border border-brand-border/50 text-brand-blue hover:border-brand-green'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <GreenBar />
              <h2 className="text-2xl sm:text-3xl font-headline font-black text-brand-blue uppercase tracking-tight">{active.title}</h2>
              <p className="mt-2 text-sm sm:text-base text-brand-muted max-w-2xl">{active.description}</p>
            </div>
            <CtaButton href={enquiryFor(active.title)} className="self-start md:self-auto">
              ENQUIRE ABOUT {active.title.toUpperCase()}
            </CtaButton>
          </div>

          {active.categories.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {['all', ...active.categories].map((slug) => {
                const label = slug === 'all' ? 'All' : CATEGORY_PAGES.find((p) => p.slug === slug)?.label ?? slug;
                return (
                  <button
                    key={slug}
                    onClick={() => setSubFilter(slug)}
                    className={`h-9 px-4 rounded-full text-xs font-headline font-semibold transition-colors cursor-pointer ${
                      subFilter === slug ? 'bg-brand-green text-white' : 'bg-white border border-brand-border/50 text-brand-blue hover:border-brand-green'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {visible.length > 0 ? (
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {visible.map((item, i) => (
                <li key={`${item.src}-${i}`} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-border/40 shadow-[0_6px_20px_rgba(0,52,111,0.06)]">
                  <button onClick={() => setLightbox(i)} className="aspect-[3/4] bg-gradient-to-b from-[#eef3fa] to-white cursor-zoom-in" aria-label={`View ${item.label} photo larger`}>
                    <img src={item.src} alt={item.label} loading="lazy" className="w-full h-full object-contain" />
                  </button>
                  <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                    <span className="text-[12px] sm:text-[13px] font-headline font-bold text-brand-blue truncate">{item.label}</span>
                    <a
                      href={enquiryFor(item.label, fileName(item.src))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[11px] font-headline font-bold text-brand-green hover:underline"
                    >
                      Enquire
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-brand-border bg-white p-8 sm:p-10 text-center">
              <active.icon className="w-10 h-10 text-brand-blue mx-auto" strokeWidth={1.4} />
              <p className="mt-4 font-headline font-bold text-brand-blue">
                Product photographs for {active.title} are being prepared.
              </p>
              <p className="mt-2 text-sm text-brand-muted max-w-lg mx-auto">
                Share your requirement and our team will send you suitable options.
              </p>
              <CtaButton href={enquiryFor(active.title)} className="mt-6">
                ENQUIRE ABOUT {active.title.toUpperCase()}
              </CtaButton>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <Section id="catalog-features" title="Catalog Features" tone="white">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {FEATURES.filter((f) => !f.pdfOnly || PDF_CATALOG_URL).map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 rounded-xl border border-brand-border/40 bg-white px-5 py-4">
              <span className="w-9 h-9 shrink-0 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                <Icon className="w-4 h-4 text-brand-blue" strokeWidth={1.8} />
              </span>
              <span className="text-sm sm:text-[15px] text-[#333840] leading-relaxed pt-1.5">{text}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Quote */}
      <section id="catalog-quote" className={`bg-brand-blue text-white py-14 sm:py-16 ${SCROLL_MT}`}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <GreenBar center light />
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-headline font-black uppercase tracking-tight">
            Request a Catalog or Product Quote
          </h2>
          <p className="mt-4 text-[15px] sm:text-lg text-white/85 leading-relaxed">
            Need a catalog for your school, dealership or organization? Contact our team with your product category,
            approximate quantity, city and requirements. We will help you identify suitable options.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CtaButton variant="white" onClick={() => setIsFlipbookOpen(true)}>VIEW DIGITAL CATALOG</CtaButton>
            {PDF_CATALOG_URL && <CtaButton variant="white" href={PDF_CATALOG_URL}>DOWNLOAD PDF CATALOG</CtaButton>}
            <CtaButton href={QUOTE_LINK}>REQUEST A QUOTE</CtaButton>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#00152e]/90 backdrop-blur-sm flex flex-col"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.label} photo`}
          >
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 text-white" onClick={(e) => e.stopPropagation()}>
              <span className="text-sm font-headline font-bold">
                {current.label} <span className="text-white/50 font-normal">· {lightbox! + 1} / {visible.length}</span>
              </span>
              <button onClick={() => setLightbox(null)} aria-label="Close" className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative flex-grow flex items-center justify-center px-3 sm:px-16 min-h-0">
              <img
                src={current.src}
                alt={current.label}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
              {visible.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((lightbox! - 1 + visible.length) % visible.length);
                    }}
                    aria-label="Previous photo"
                    className="absolute left-2 sm:left-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox((lightbox! + 1) % visible.length);
                    }}
                    aria-label="Next photo"
                    className="absolute right-2 sm:right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center px-4 py-4" onClick={(e) => e.stopPropagation()}>
              <CtaButton href={enquiryFor(current.label, fileName(current.src))}>ENQUIRE ABOUT THIS PRODUCT</CtaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flipbook catalogue */}
      <AnimatePresence>
        {isFlipbookOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-brand-blue/50 backdrop-blur-sm overflow-y-auto"
            onClick={() => setIsFlipbookOpen(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              className="relative max-w-7xl mx-auto my-6 sm:my-10 bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFlipbookOpen(false)}
                aria-label="Close catalog"
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white shadow-md text-brand-blue flex items-center justify-center hover:bg-brand-light cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <DigitalCatalog onAddToCart={handleAddToCart} onOpenCart={() => setIsCartOpen(true)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQty}
        onRemoveItem={removeItem}
        onClearCart={() => setCart([])}
      />
    </PageShell>
  );
}
