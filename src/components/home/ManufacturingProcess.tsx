import { Fragment } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Layers, PenLine, Shirt, Factory, ShieldCheck, Truck, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: ClipboardList, label: 'Requirement' },
  { icon: Layers, label: 'Fabric Selection' },
  { icon: PenLine, label: 'Design' },
  { icon: Shirt, label: 'Sampling' },
  { icon: Factory, label: 'Production' },
  { icon: ShieldCheck, label: 'Quality Check' },
  { icon: Truck, label: 'Delivery' },
];

export default function ManufacturingProcess() {
  return (
    <section id="manufacturing" className="bg-gradient-to-b from-white to-[#f3f7fc] py-14 sm:py-16 scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center">
          <span className="inline-block h-1 w-12 rounded-full bg-brand-green mb-4" />
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-headline font-black text-brand-blue uppercase tracking-tight">
            From Fabric to Finished Uniform
          </h2>
        </div>

        <ol className="mt-10 grid grid-cols-2 sm:grid-cols-4 xl:flex xl:items-center gap-3">
          {STEPS.map(({ icon: Icon, label }, i) => (
            <Fragment key={label}>
              {i > 0 && (
                <ArrowRight aria-hidden className="hidden xl:block w-4 h-4 shrink-0 text-brand-green" />
              )}
              <motion.li
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`xl:flex-1 relative flex flex-col items-center text-center gap-3 rounded-2xl bg-white border border-brand-border/40 shadow-[0_6px_20px_rgba(0,52,111,0.06)] px-3 pt-7 pb-5 ${
                  i === STEPS.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
              >
                <span className="absolute top-2.5 left-3 text-[11px] font-headline font-extrabold text-brand-green">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Icon className="w-9 h-9 text-brand-blue" strokeWidth={1.5} />
                <p className="text-[13px] font-headline font-bold text-[#0d1b3e] leading-snug">{label}</p>
              </motion.li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
