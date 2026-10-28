import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, HardHat, Layers, type LucideIcon } from 'lucide-react';
import SectionEyebrow from './SectionEyebrow';

// Cards without an approved product photo yet show an icon panel instead.
const SOLUTIONS: { title: string; text: string; to: string; image?: string; icon?: LucideIcon }[] = [
  {
    title: 'School Uniforms',
    text: 'Premium school uniforms designed for comfort, durability and a smart appearance.',
    to: '/catalog/uniform-primary-daily',
    image: '/images/ridhvick_secondary_girl_dress_sports_one.png',
  },
  {
    title: 'Sports Wear',
    text: 'Comfortable sports uniforms, house T-shirts, tracksuits and activity wear.',
    to: '/catalog/uniform-primary-sports',
    image: '/images/ridhvick_primary_dress_sports_one.png',
  },
  {
    title: 'Corporate Uniforms',
    text: 'Professional uniforms that strengthen brand identity.',
    to: '/corporate-industrial-uniforms',
    icon: Briefcase,
  },
  {
    title: 'Industrial Uniforms',
    text: 'Practical workforce uniforms.',
    to: '/corporate-industrial-uniforms',
    icon: HardHat,
  },
  {
    title: 'T-Shirts & Polo Shirts',
    text: 'Customized apparel for schools, companies, events and teams.',
    to: '/catalog/occasions',
    image: '/images/ridhvick_occassions_two.png',
  },
  {
    title: 'Branded Uniform Fabrics',
    text: 'Wholesale fabric supply for schools, dealers, retailers and garment manufacturers.',
    to: '/branded-uniform-fabrics',
    icon: Layers,
  },
];

export default function UniformSolutions() {
  const navigate = useNavigate();

  return (
    <section id="solutions" className="bg-white py-14 sm:py-20 scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <SectionEyebrow label="What We Offer" />
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-[40px] font-headline font-black text-brand-blue uppercase tracking-tight">
            Our Uniform Solutions
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed">
            From selecting the right fabric to designing, manufacturing and supplying finished uniforms, we focus on
            quality, comfort, durability and consistency at every stage. Whether you need a complete uniform solution
            for your school or branded fabrics for your uniform business, Ridhvick Uniforms is your uniform partner.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SOLUTIONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.title}
                onClick={() => navigate(s.to)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="group flex text-left bg-white rounded-2xl border border-brand-border/40 shadow-[0_6px_20px_rgba(0,52,111,0.06)] hover:shadow-[0_14px_32px_rgba(0,52,111,0.14)] hover:-translate-y-1 transition-all overflow-hidden cursor-pointer"
              >
                <div className="w-[38%] shrink-0 bg-gradient-to-b from-[#eef3fa] to-[#f7f9fc] flex items-center justify-center">
                  {s.image ? (
                    <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-contain" />
                  ) : (
                    Icon && (
                      <span className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center">
                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </span>
                    )
                  )}
                </div>
                <div className="flex flex-col flex-grow p-5 sm:p-6 min-h-[180px]">
                  <span className="h-[3px] w-8 rounded-full bg-brand-green" />
                  <h3 className="mt-3 text-base sm:text-lg font-headline font-extrabold text-brand-blue leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[13px] sm:text-sm text-brand-muted leading-relaxed flex-grow">{s.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-headline font-bold text-brand-green group-hover:gap-2.5 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
