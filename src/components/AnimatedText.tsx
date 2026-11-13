import { Fragment, type ElementType } from 'react';
import SplitText from './SplitText';
import BlurText from './BlurText';

// Site-wide text animations, so every page uses the same settings:
//  - headings: SplitText "rise" (chars) with the "lift" hover
//  - subtitles: BlurText "blur" (words) from the top
// Both reveal when scrolled into view — every time, scrolling down or back up. Stagger is scaled to the text length
// so long headings/paragraphs still finish in ~1–1.5s instead of crawling.

type Align = 'left' | 'center' | 'right';

interface HeadingLine {
  text: string;
  className?: string;
}

interface AnimatedHeadingProps {
  /** Heading text; use "\n" to force line breaks. */
  text?: string;
  /** Alternative to `text` when lines need their own styling (e.g. a coloured first line). */
  lines?: HeadingLine[];
  as?: ElementType;
  className?: string;
  align?: Align;
}

export function AnimatedHeading({ text = '', lines, as: Tag = 'h2', className = '', align = 'left' }: AnimatedHeadingProps) {
  const items: HeadingLine[] = lines ?? text.split('\n').map((t) => ({ text: t }));
  const chars = items.reduce((n, l) => n + l.text.length, 0);
  // Your example uses 50ms per letter; long headings are tightened so they finish in ~1.2s.
  const delay = Math.round(Math.min(50, Math.max(14, 1200 / Math.max(chars, 1))));

  return (
    <Tag className={className}>
      {items.map((line, i) => (
        <Fragment key={`${i}-${line.text}`}>
          <span className="block" style={{ textAlign: align }}>
            <SplitText
              tag="span"
              text={line.text}
              className={line.className ?? ''}
              effect="rise"
              splitType="chars"
              delay={delay}
              duration={1.1}
              staggerFrom="start"
              trigger="view"
              hoverEffect="lift"
              loop={false}
              loopDelay={1.5}
              mask={false}
              threshold={0.1}
              rootMargin="-40px"
              textAlign={align}
              replay
            />
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}

interface AnimatedSubtitleProps {
  text: string;
  as?: ElementType;
  className?: string;
  align?: Align;
}

export function AnimatedSubtitle({ text, as = 'p', className = '', align = 'left' }: AnimatedSubtitleProps) {
  const words = text.trim().split(/\s+/).length;
  // Your example uses 200ms per word; longer paragraphs are tightened so they finish in ~1.2s.
  const delay = Math.round(Math.min(200, Math.max(14, 1000 / Math.max(words, 1))));
  const justify = align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start';

  return (
    <BlurText
      as={as}
      text={text}
      effect="blur"
      animateBy="words"
      direction="top"
      staggerFrom="start"
      trigger="view"
      delay={delay}
      stepDuration={0.35}
      blur={10}
      distance={words > 14 ? 24 : 50}
      loop={false}
      loopDelay={2}
      focusOnHover={false}
      replay
      className={`${justify} ${className}`}
    />
  );
}
