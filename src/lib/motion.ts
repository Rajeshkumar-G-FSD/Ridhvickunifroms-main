// Shared scroll-reveal presets (Motion `whileInView`). Everything replays each
// time it re-enters the viewport — scrolling down or back up — and resets
// once it has left, so sections animate in both directions.

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/** Fade up — for single blocks (text columns, panels). */
export const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.7, ease: EASE_OUT_EXPO },
};

/**
 * Alternating slide — for grids and lists of points: even items enter from
 * the left, odd items from the right, with a light stagger per row.
 */
export const slideIn = (i: number, distance = 64) => ({
  initial: { opacity: 0, x: i % 2 === 0 ? -distance : distance },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.8, ease: EASE_OUT_EXPO, delay: (i % 3) * 0.08 },
});
