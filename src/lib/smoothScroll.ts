import type Lenis from 'lenis';

// The site-wide Lenis instance (set by <SmoothScroll />). Null when smooth
// scrolling is off (e.g. the visitor prefers reduced motion).
let instance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/** Smoothly scroll to an element; its CSS scroll-margin-top keeps it clear of the fixed header. */
export function smoothScrollToElement(el: HTMLElement) {
  if (!instance) {
    el.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  // Lenis already applies the element's scroll-margin-top (the fixed-header offset)
  instance.scrollTo(el, { duration: 1.1 });
}

export function smoothScrollToTop() {
  if (!instance) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  instance.scrollTo(0, { duration: 1.1 });
}
