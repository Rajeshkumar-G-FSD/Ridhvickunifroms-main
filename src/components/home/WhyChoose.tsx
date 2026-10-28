import { motion } from 'motion/react';
import { Layers, Scissors, BadgeCheck, PencilRuler, Boxes, Truck } from 'lucide-react';

const REASONS = [
  { icon: Layers, label: 'Premium Quality Fabrics' },
  { icon: Scissors, label: 'Professional Workmanship' },
  { icon: BadgeCheck, label: 'Consistent Quality' },
  { icon: PencilRuler, label: 'Customized Solutions' },
  { icon: Boxes, label: 'Bulk Order Capability' },
  { icon: Truck, label: 'Reliable Supply' },
];

export default function WhyChoose() {
  return (
    <section id="why-ridhvick" className="bg-[#f5f8fc] py-14 sm:py-20 scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block h-1 w-12 rounded-full bg-brand-green mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-headline font-black text-brand-blue uppercase tracking-tight">
            Why Ridhvick Uniforms?
          </h2>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {REASONS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="flex items-center gap-4 rounded-2xl border border-brand-border/40 bg-white px-5 py-5 sm:py-6 shadow-[0_6px_20px_rgba(0,52,111,0.05)] hover:shadow-[0_12px_28px_rgba(0,52,111,0.12)] hover:-translate-y-0.5 transition-all"
            >
              <span className="w-14 h-14 shrink-0 rounded-full bg-[#e8f5ee] flex items-center justify-center">
                <Icon className="w-7 h-7 text-brand-blue" strokeWidth={1.5} />
              </span>
              <span className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                <span className="text-[15px] sm:text-base font-headline font-bold text-[#0d1b3e] leading-snug">{label}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
