import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, type Easing } from 'motion/react';

type AnimateBy = 'words' | 'letters';
type Direction = 'top' | 'bottom';
type Snapshot = Record<string, string | number>;

const buildKeyframes = (from: Snapshot, steps: Snapshot[]) => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);

  const keyframes: Record<string, (string | number)[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Snapshot;
  animationTo?: Snapshot[];
  easing?: Easing;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span';
  /** Truncate to one line with an ellipsis instead of wrapping to multiple lines. */
  singleLine?: boolean;
}

export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Tag = 'p',
  singleLine = false,
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Re-arms on every crossing (not just the first) so the animation
    // replays whether the section is scrolled into view from above or below.
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom: Snapshot = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo: Snapshot[] = useMemo(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <Tag
      ref={ref as never}
      className={
        singleLine
          ? `blur-text ${className} block whitespace-nowrap overflow-hidden text-ellipsis`
          : `blur-text ${className} flex flex-wrap`
      }
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? ' ' : segment}
            {animateBy === 'words' && index < elements.length - 1 && ' '}
          </motion.span>
        );
      })}
    </Tag>
  );
}
