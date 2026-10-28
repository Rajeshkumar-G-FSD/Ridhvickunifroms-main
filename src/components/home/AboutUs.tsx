import { useNavigate } from 'react-router-dom';
import { Layers, Scissors, Truck, ArrowRight } from 'lucide-react';

// "Our Promise" from the About Us page
const PILLARS = [
  { icon: Layers, label: ['Premium', 'Fabrics'] },
  { icon: Scissors, label: ['Professional', 'Workmanship'] },
  { icon: Truck, label: ['Reliable', 'Supply'] },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <section id="about" className="relative overflow-hidden bg-brand-blue scroll-mt-16 sm:scroll-mt-[72px] xl:scroll-mt-[120px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[420px]">
        {/* Photo — the blue panel's curve overlaps its right edge on desktop */}
        <div className="relative bg-white">
          <img
            src="/images/ridhvick_uniforms_hero_kids_uniform.png"
            alt="Students in Ridhvick daily wear uniforms"
            loading="lazy"
            className="w-full h-full object-contain"
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
              Ridhvick Uniforms is a Tirupur and Chennai-based uniform business providing school uniforms, corporate
              and industrial uniforms, sportswear, customized T-shirts and branded uniform fabrics.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-y-6 max-w-lg">
              {PILLARS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label[0]}
                  className={`flex flex-col items-center text-center gap-2 px-2 ${
                    i > 0 ? 'sm:border-l sm:border-white/25' : ''
                  }`}
                >
                  <Icon className="w-9 h-9 text-brand-green-light" strokeWidth={1.4} />
                  <p className="text-xs sm:text-[13px] font-semibold leading-snug">
                    {label[0]}
                    <br />
                    {label[1]}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/about-us')}
              className="mt-8 self-start inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-brand-blue font-headline font-bold text-sm hover:bg-brand-green hover:text-white transition-colors cursor-pointer"
            >
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
