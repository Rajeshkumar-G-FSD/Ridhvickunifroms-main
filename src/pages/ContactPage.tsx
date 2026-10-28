import { useState, FormEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Building2, Send, CheckCircle2 } from 'lucide-react';
import { PageShell, PageHero, SCROLL_MT, GreenBar, fadeUp } from '../components/page/PageKit';
import { PageSection } from '../lib/useSectionRouting';
import { PHONE_PRIMARY, PHONE_SECONDARY, CONTACT_EMAIL, WHATSAPP_LINK, REGISTERED_ADDRESS } from '../lib/contact';

const BASE_PATH = '/contact-us';

export const CONTACT_SECTIONS: PageSection[] = [
  { id: 'contact-details', slug: 'contact-details', title: 'Contact Details' },
  { id: 'contact-form', slug: 'enquiry-form', title: 'Enquiry Form' },
];

const REQUIREMENT_TYPES = [
  'School Uniforms',
  'Branded Fabrics',
  'Corporate Uniforms',
  'Industrial Uniforms',
  'Sports Wear',
  'T-Shirts',
  'Dealer/Wholesale',
  'Other',
];

const EMPTY = {
  name: '',
  organization: '',
  city: '',
  mobile: '',
  email: '',
  requirementType: '',
  quantity: '',
  deliveryDate: '',
  message: '',
};

type FormState = typeof EMPTY;

const FIELD_LABELS: Record<keyof FormState, string> = {
  name: 'Name',
  organization: 'School / Company / Business Name',
  city: 'City',
  mobile: 'Mobile Number',
  email: 'Email',
  requirementType: 'Requirement Type',
  quantity: 'Approximate Quantity',
  deliveryDate: 'Required Delivery Date',
  message: 'Message',
};

const inputCls =
  'w-full h-12 rounded-lg border border-brand-border/60 bg-white px-3.5 text-sm text-brand-dark placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/15';

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[12px] font-headline font-bold text-brand-blue uppercase tracking-wide">
        {label}
        {required && <span className="text-brand-green"> *</span>}
      </span>
      {children}
    </label>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const set = (key: keyof FormState) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Enquiries are delivered to the sales WhatsApp with every field filled in.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = (Object.keys(FIELD_LABELS) as (keyof FormState)[])
      .filter((k) => form[k].trim())
      .map((k) => `${FIELD_LABELS[k]}: ${form[k].trim()}`);
    const text = ['New enquiry from the Ridhvick Uniforms website', '', ...lines].join('\n');
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <PageShell basePath={BASE_PATH} pageTitle="Contact Us" sections={CONTACT_SECTIONS}>
      <PageHero
        crumb="Contact Us"
        title="Let's Discuss Your Uniform Requirement"
        intro={
          <p>
            Whether you represent a school, educational institution, company, industry, uniform dealership or retail
            business, our team would be happy to understand your requirements.
          </p>
        }
      />

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
          {/* Contact details */}
          <div id="contact-details" className={SCROLL_MT}>
          <motion.aside
            {...fadeUp}
            className="rounded-2xl bg-brand-blue text-white p-7 sm:p-8 shadow-[0_18px_44px_rgba(0,52,111,0.22)]"
          >
            <GreenBar light />
            <h2 className="text-xl sm:text-2xl font-headline font-black uppercase tracking-tight">Ridhvick Uniforms</h2>
            <p className="mt-1 text-sm font-headline font-semibold text-brand-green-light">One Partner. Every Uniform Solution.</p>

            <dl className="mt-7 space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-green-light shrink-0 mt-0.5" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-white/60 font-bold">Locations</dt>
                  <dd className="mt-0.5 font-semibold">Tirupur | Chennai</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-green-light shrink-0 mt-0.5" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-white/60 font-bold">Phone</dt>
                  <dd className="mt-0.5 font-semibold">
                    <a href={PHONE_PRIMARY.tel} className="hover:text-brand-green-light">{PHONE_PRIMARY.display}</a>
                    <span className="text-white/40"> | </span>
                    <a href={PHONE_SECONDARY.tel} className="hover:text-brand-green-light">{PHONE_SECONDARY.display}</a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-brand-green-light shrink-0 mt-0.5" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-white/60 font-bold">Email</dt>
                  <dd className="mt-0.5 font-semibold break-all">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-brand-green-light">{CONTACT_EMAIL}</a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Building2 className="w-5 h-5 text-brand-green-light shrink-0 mt-0.5" />
                <div>
                  <dt className="text-[11px] uppercase tracking-wider text-white/60 font-bold">Registered Address</dt>
                  <dd className="mt-0.5 leading-relaxed">{REGISTERED_ADDRESS}</dd>
                </div>
              </div>
            </dl>
          </motion.aside>
          </div>

          {/* Enquiry form */}
          <div id="contact-form" className={SCROLL_MT}>
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="rounded-2xl border border-brand-border/40 bg-white p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,52,111,0.08)]"
          >
            <GreenBar />
            <h2 className="text-xl sm:text-2xl font-headline font-black text-brand-blue uppercase tracking-tight">Enquiry Form</h2>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-brand-green/30 bg-[#e8f5ee] p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-brand-green mx-auto" />
                <p className="mt-3 font-headline font-bold text-brand-blue">Your enquiry is ready in WhatsApp.</p>
                <p className="mt-1 text-sm text-brand-muted">
                  Press send in WhatsApp to deliver it to our team. You can also call us on {PHONE_PRIMARY.display}.
                </p>
                <button
                  onClick={() => {
                    setForm(EMPTY);
                    setSubmitted(false);
                  }}
                  className="mt-4 text-sm font-headline font-bold text-brand-green hover:underline cursor-pointer"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Name" required>
                  <input required value={form.name} onChange={set('name')} className={inputCls} autoComplete="name" />
                </Field>
                <Field label="School / Company / Business Name">
                  <input value={form.organization} onChange={set('organization')} className={inputCls} autoComplete="organization" />
                </Field>
                <Field label="City">
                  <input value={form.city} onChange={set('city')} className={inputCls} autoComplete="address-level2" />
                </Field>
                <Field label="Mobile Number" required>
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9+\-\s]{10,15}"
                    title="Enter a valid mobile number"
                    value={form.mobile}
                    onChange={set('mobile')}
                    className={inputCls}
                    autoComplete="tel"
                  />
                </Field>
                <Field label="Email">
                  <input type="email" value={form.email} onChange={set('email')} className={inputCls} autoComplete="email" />
                </Field>
                <Field label="Requirement Type" required>
                  <select required value={form.requirementType} onChange={set('requirementType')} className={`${inputCls} cursor-pointer`}>
                    <option value="" disabled>
                      Select requirement type
                    </option>
                    {REQUIREMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Approximate Quantity">
                  <input value={form.quantity} onChange={set('quantity')} className={inputCls} inputMode="numeric" />
                </Field>
                <Field label="Required Delivery Date">
                  <input type="date" value={form.deliveryDate} onChange={set('deliveryDate')} className={inputCls} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Message">
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      className={`${inputCls} h-auto py-3 resize-y`}
                    />
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 h-12 w-full sm:w-auto px-8 rounded-full bg-brand-green text-white font-headline font-bold text-sm tracking-wide hover:bg-brand-green-dark transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" /> SUBMIT ENQUIRY
                  </button>
                </div>
              </form>
            )}
          </motion.div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
