// Small "— LABEL —" kicker shown above centered section headings.
export default function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-brand-blue">
      <span className="h-[2px] w-8 sm:w-10 bg-brand-blue rounded-full" />
      <span className="text-[11px] sm:text-sm font-headline font-extrabold tracking-[0.12em] uppercase">
        {label}
      </span>
      <span className="h-[2px] w-8 sm:w-10 bg-brand-blue rounded-full" />
    </div>
  );
}
