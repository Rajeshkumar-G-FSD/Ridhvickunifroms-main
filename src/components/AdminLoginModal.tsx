import { FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Lock, Mail, X } from 'lucide-react';
import { loginAdmin } from '../lib/adminAuth';

interface FieldErrors {
  email?: string;
  password?: string;
}

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!email.trim()) errors.email = 'Email is required.';
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Enter a valid email address.';

  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';

  return errors;
}

export default function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setTouched({});
      setAuthError('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const errors = validate(email, password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (errors.email || errors.password) return;

    setAuthError('');
    setIsSubmitting(true);
    try {
      await loginAdmin(email, password);
      onSuccess();
    } catch (err) {
      console.error('Admin login failed:', err);
      setAuthError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              aria-label="Close admin login"
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Logo popup header */}
            <div className="relative flex flex-col items-center pt-10 pb-7 px-6 bg-gradient-to-br from-brand-blue to-brand-blue-light overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-brand-yellow/20 blur-2xl" />
              <div className="absolute -bottom-12 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />

              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-brand-yellow shadow-lg bg-white"
              >
                <img src="/images/ridhvick_logo.jpeg" alt="Ridhvick Uniforms" className="w-full h-full object-cover" />
              </motion.div>
              <h1 className="relative mt-4 text-lg font-headline font-black text-white">Admin Access</h1>
              <p className="relative text-xs text-white/70 mt-1 font-sans">Sign in to manage the catalog</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8 flex flex-col gap-4">
              <div>
                <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
                  Email
                </label>
                <div
                  className={`mt-1.5 flex items-center gap-2 border rounded-full px-4 h-11 transition-colors ${
                    touched.email && errors.email
                      ? 'border-red-400 focus-within:border-red-500'
                      : 'border-brand-border/30 focus-within:border-brand-blue'
                  }`}
                >
                  <Mail className="w-4 h-4 text-brand-muted shrink-0" />
                  <input
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className="w-full h-full outline-none text-sm font-sans text-brand-blue bg-transparent"
                    placeholder="Enter email"
                    aria-invalid={Boolean(touched.email && errors.email)}
                  />
                </div>
                {touched.email && errors.email && (
                  <p className="text-[11px] text-red-500 font-sans mt-1 ml-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-headline font-bold text-brand-blue uppercase tracking-wider">
                  Password
                </label>
                <div
                  className={`mt-1.5 relative flex items-center gap-2 border rounded-full pl-4 pr-2 h-11 transition-colors ${
                    touched.password && errors.password
                      ? 'border-red-400 focus-within:border-red-500'
                      : 'border-brand-border/30 focus-within:border-brand-blue'
                  }`}
                >
                  <Lock className="w-4 h-4 text-brand-muted shrink-0" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    className="w-full h-full outline-none text-sm font-sans text-brand-blue bg-transparent pr-9"
                    placeholder="Enter password"
                    aria-invalid={Boolean(touched.password && errors.password)}
                  />

                  {/* Swipe-style arrow submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="Sign in"
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-blue hover:bg-brand-blue-light disabled:opacity-60 flex items-center justify-center shrink-0 cursor-pointer transition-colors shadow-sm"
                  >
                    {isSubmitting ? (
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.7, ease: 'linear' }}
                        className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full"
                      />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-white" />
                    )}
                  </motion.button>
                </div>
                {touched.password && errors.password && (
                  <p className="text-[11px] text-red-500 font-sans mt-1 ml-1">{errors.password}</p>
                )}
              </div>

              {authError && <p className="text-xs text-red-500 font-sans text-center">{authError}</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
