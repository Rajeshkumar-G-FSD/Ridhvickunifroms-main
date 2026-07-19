import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import type { Transition } from 'motion/react';

type AnimateBy = 'words' | 'letters';
type Direction = 'top' | 'bottom';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  onAnimationComplete?: () => void;
}

const DEFAULT_TRANSITION: Transition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

export default function BlurText({
  text,
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}: BlurTextProps) {
  const segments = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenY = direction === 'top' ? -20 : 20;

  return (
    <p ref={ref} className={className}>
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          initial={{ filter: 'blur(10px)', opacity: 0, y: hiddenY }}
          animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : undefined}
          transition={{
            ...DEFAULT_TRANSITION,
            delay: (delay / 1000) * index,
          }}
          onAnimationComplete={
            index === segments.length - 1 ? onAnimationComplete : undefined
          }
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {segment}
          {animateBy === 'words' && index < segments.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </p>
  );
}
