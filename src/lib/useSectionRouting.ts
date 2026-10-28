import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface PageSection {
  id: string;
  slug: string;
  title: string;
}

/**
 * Gives each section of a page its own URL: `${basePath}/${slug}` scrolls to
 * the section with that DOM id (on first load and on in-app navigation) and
 * sets the tab title. Returns `goTo(id)`, which updates the URL.
 */
export function useSectionRouting(basePath: string, sections: PageSection[], pageTitle: string) {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const slug = pathname.slice(basePath.length).replace(/^\/+|\/+$/g, '').toLowerCase();
    const section = sections.find((s) => s.slug === slug);
    document.title = section ? `${section.title} | ${pageTitle} | Ridhvick Uniforms` : `${pageTitle} | Ridhvick Uniforms`;

    // React Router gives the initial page load the key 'default'; later in-app
    // navigations get unique keys. (A ref would be fooled by StrictMode re-running effects.)
    const wasFirstRender = key === 'default';

    if (!section) {
      if (!wasFirstRender) window.scrollTo({ top: 0, behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const scroll = (behavior: ScrollBehavior) => document.getElementById(section.id)?.scrollIntoView({ behavior });
    // 'instant' (not 'auto'): the global CSS sets scroll-behavior: smooth, which 'auto' would inherit
    scroll(wasFirstRender ? 'instant' : 'smooth');
    if (!wasFirstRender) return;

    // On a fresh visit, images and live (Firestore) content above the section
    // can still change the layout. Keep the section aligned while that settles,
    // until the visitor starts scrolling themselves.
    let userMoved = false;
    const stop = () => (userMoved = true);
    const events = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const;
    events.forEach((ev) => window.addEventListener(ev, stop, { passive: true }));
    const ro = new ResizeObserver(() => !userMoved && scroll('instant'));
    ro.observe(document.body);
    const t = window.setTimeout(() => ro.disconnect(), 4000);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      events.forEach((ev) => window.removeEventListener(ev, stop));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const goTo = (id: string) => {
    const section = sections.find((s) => s.id === id);
    const path = section ? `${basePath}/${section.slug}` : basePath;
    if (path === pathname && section) document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
    else navigate(path);
  };

  return { goTo };
}
