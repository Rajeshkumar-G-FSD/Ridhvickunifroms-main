import { Fragment } from 'react';
import { motion } from 'motion/react';
import { PenLine, Cog, Shirt, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: PenLine, label: 'Design & Planning' },
  { icon: Cog, label: 'Fabric Selection' },
  { icon: Shirt, label: 'Manufacturing' },
  { icon: ShieldCheck, label: 'Quality Check' },
  { icon: Truck, label: 'Packing & Delivery' },
];

export default function ManufacturingProcess() {
  return (
    <section id="manufacturing" className="bg-gradient-to-b from-white to-[#f3f7fc] py-12 sm:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-headline font-black text-brand-blue uppercase tracking-tight">
            Our Manufacturing Process
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-muted">
            From design to delivery, we maintain the highest quality at every step.
          </p>
        </div>

        <div className="mt-9 flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {STEPS.map(({ icon: Icon, label }, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <ArrowRight className="hidden md:block w-5 h-5 shrink-0 text-brand-blue" />
              )}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex-1 flex md:flex-col items-center gap-4 md:gap-4 rounded-2xl bg-white border border-brand-border/30 shadow-[0_6px_20px_rgba(0,52,111,0.06)] px-5 py-5 md:py-7"
              >
                <Icon className="w-9 h-9 md:w-10 md:h-10 text-brand-blue shrink-0" strokeWidth={1.5} />
                <p className="flex items-center gap-1.5 text-xs sm:text-[13px] font-headline font-semibold text-[#0d1b3e]">
                  <CheckCircle2 className="w-4 h-4 text-white fill-brand-blue shrink-0" />
                  {label}
                </p>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
