import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

// Site-wide smooth (inertia) scrolling, kept in sync with GSAP ScrollTrigger so
// scroll-triggered text animations fire at the right moment. Scrollable
// overlays (menus, drawers, modals, lightbox) keep native scrolling.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      prevent: (node) =>
        !!node.closest?.('.overflow-y-auto, .overflow-auto, [role="dialog"], [data-lenis-prevent]'),
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Pause while a modal locks the page (body overflow: hidden)
    const syncLock = () => (document.body.style.overflow === 'hidden' ? lenis.stop() : lenis.start());
    const lockObserver = new MutationObserver(syncLock);
    lockObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    // Images and live content change the page height after load — keep
    // ScrollTrigger start/end positions accurate.
    let timer = 0;
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    resizeObserver.observe(document.body);

    return () => {
      window.clearTimeout(timer);
      resizeObserver.disconnect();
      lockObserver.disconnect();
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
