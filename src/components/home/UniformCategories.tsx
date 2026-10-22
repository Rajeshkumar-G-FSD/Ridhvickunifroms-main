import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';

const CATEGORIES = [
  { label: ['Daily Wear', 'Uniforms'], slug: 'uniform-primary-daily', src: '/images/ridhvick_secondary_girl_dress_sports_one.png' },
  { label: ['Sports Wear', 'Uniforms'], slug: 'uniform-primary-sports', src: '/images/ridhvick_primary_dress_sports_one.png' },
  { label: ['Accessories'], slug: 'accessories', src: '/images/rudhvick_Accessories_one.png' },
  { label: ['Blazers'], slug: 'blazers', src: '/images/ridhvick_blazer_one.png' },
  { label: ['House', 'Uniforms'], slug: 'uniform-secondary-sports', src: '/images/ridhvick_occassions_three.png' },
  { label: ['Winter', 'Uniforms'], slug: 'hoodies', src: '/images/ridhvick_hoodies_two.png' },
  { label: ['Customisation'], slug: 'occasions', src: '/images/ridhvick_occassions_two.png' },
];

export default function UniformCategories() {
  const navigate = useNavigate();

  return (
    <section id="daily-sports" className="bg-white py-12 sm:py-16 md:py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <SectionEyebrow label="Explore Our Range" />
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-[40px] font-headline font-black text-brand-blue uppercase tracking-tight">
            Uniform Categories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted">
            Find the perfect uniform for every need. Explore our wide range divided by category.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.slug + cat.label[0]}
              onClick={() => navigate(`/catalog/${cat.slug}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group flex flex-col text-left bg-white rounded-2xl border border-brand-border/30 shadow-[0_6px_20px_rgba(0,52,111,0.06)] hover:shadow-[0_12px_28px_rgba(0,52,111,0.14)] hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-b from-[#eef3fa] to-white overflow-hidden">
                <img
                  src={cat.src}
                  alt={cat.label.join(' ')}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-end justify-between gap-2 p-3 sm:p-3.5 min-h-[64px]">
                <span className="text-xs sm:text-[13px] font-headline font-bold text-[#0d1b3e] leading-snug">
                  {cat.label.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </span>
                <span className="w-7 h-7 shrink-0 rounded-full border border-brand-blue/60 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
