import { Shirt, Factory, Award, Truck } from 'lucide-react';

const PILLARS = [
  { icon: Shirt, label: ['Wide', 'Range'] },
  { icon: Factory, label: ['In-House', 'Manufacturing'] },
  { icon: Award, label: ['Quality', 'Assurance'] },
  { icon: Truck, label: ['Pan India', 'Supply'] },
];

export default function AboutUs() {
  return (
    <section id="about" className="relative overflow-hidden bg-brand-blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[420px]">
        {/* Photo — the blue panel's curve overlaps its right edge on desktop */}
        <div className="relative h-64 sm:h-80 lg:h-auto">
          <img
            src="/images/ridhvick_uniforms_hero_kids_uniform.png"
            alt="Students in Ridhvick daily wear uniforms"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
          />
        </div>

        <div className="relative">
          {/* Curved leading edge */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-y-0 -left-36 w-72 bg-gradient-to-br from-[#0a3f86] to-brand-blue"
            style={{ clipPath: 'ellipse(50% 75% at 100% 50%)' }}
          />
          <div className="relative h-full bg-gradient-to-br from-[#0a3f86] via-brand-blue to-[#00285a] text-white px-6 sm:px-10 lg:pl-6 lg:pr-12 py-10 sm:py-12 flex flex-col justify-center">
            <span className="text-xs font-headline font-semibold tracking-[0.15em] uppercase text-white/80">
              About Us
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-[34px] font-headline font-black uppercase tracking-tight">
              Ridhvick Uniforms
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] text-white/85 leading-relaxed max-w-xl">
              We are a leading school uniform manufacturer committed to quality, comfort and style. With years of
              experience, we create uniforms that inspire confidence and a sense of belonging in every student.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-y-6">
              {PILLARS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label[0]}
                  className={`flex flex-col items-center text-center gap-2 px-2 ${
                    i > 0 ? 'sm:border-l sm:border-white/25' : ''
                  }`}
                >
                  <Icon className="w-9 h-9" strokeWidth={1.4} />
                  <p className="text-xs sm:text-[13px] font-semibold leading-snug">
                    {label[0]}
                    <br />
                    {label[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
