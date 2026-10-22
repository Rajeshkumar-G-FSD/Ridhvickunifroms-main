import { motion } from 'motion/react';
import { ShieldCheck, Scissors, PencilRuler, Layers } from 'lucide-react';

const REASONS = [
  { icon: ShieldCheck, label: ['Premium', 'Fabric Quality'] },
  { icon: Scissors, label: ['Customisation', '& Best Fit'] },
  { icon: PencilRuler, label: ['Modern Designs', 'for Every School'] },
  { icon: Layers, label: ['Bulk Orders', '& On-Time Delivery'] },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-10 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-headline font-black text-brand-blue uppercase leading-[1.15] tracking-tight">
            Why Choose
            <br />
            Ridhvick Uniforms?
          </h2>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed max-w-xs">
            Built on trust, quality and care for students and schools since years.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {REASONS.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label[0]}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex flex-col items-center text-center gap-3 rounded-2xl border border-brand-border/30 bg-white px-3 py-6 sm:py-7 shadow-[0_6px_20px_rgba(0,52,111,0.05)] hover:shadow-[0_12px_28px_rgba(0,52,111,0.12)] transition-shadow"
            >
              <Icon className="w-10 h-10 sm:w-11 sm:h-11 text-brand-blue" strokeWidth={1.5} />
              <p className="text-xs sm:text-[13px] font-headline font-semibold text-[#0d1b3e] leading-snug">
                {label[0]}
                <br />
                {label[1]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
