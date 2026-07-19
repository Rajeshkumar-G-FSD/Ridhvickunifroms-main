import { useEffect, useRef, useState, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

type SplitType = 'chars' | 'words' | 'lines' | 'chars,words' | 'words,lines';
type Snapshot = Record<string, string | number>;

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: SplitType;
  from?: Snapshot;
  to?: Snapshot;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  tag?: ElementType;
  onLetterAnimationComplete?: () => void;
  /** Truncate to one straight line with an ellipsis instead of wrapping. */
  singleLine?: boolean;
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  tag: Tag = 'p',
  onLetterAnimationComplete,
  singleLine = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !text || !fontsLoaded) return;
    if (animationCompletedRef.current) return;

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    let targets: Element[] = [];
    const splitInstance = new GSAPSplitText(el, {
      type: splitType,
      smartWrap: true,
      autoSplit: splitType === 'lines',
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
      reduceWhiteSpace: false,
      onSplit: (self) => {
        if (splitType.includes('chars') && self.chars.length) targets = self.chars;
        else if (splitType.includes('words') && self.words.length) targets = self.words;
        else if (splitType.includes('lines') && self.lines.length) targets = self.lines;
        else targets = self.chars || self.words || self.lines;

        return gsap.fromTo(targets, { ...from }, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      try {
        splitInstance.revert();
      } catch {
        /* ignore */
      }
    };
  }, [text, delay, duration, ease, splitType, from, to, threshold, rootMargin, fontsLoaded]);

  return (
    <Tag
      ref={ref as never}
      style={{ textAlign, wordWrap: singleLine ? 'normal' : 'break-word' }}
      className={
        singleLine
          ? `split-parent inline-block max-w-full overflow-hidden whitespace-nowrap text-ellipsis ${className}`
          : `split-parent overflow-hidden inline-block whitespace-normal ${className}`
      }
    >
      {text}
    </Tag>
  );
}
