import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { MotionConfig, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { ScrollTrigger, headerOffset } from '../motion/gsap';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export function SiteLayout() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const lenis = useLenis();

  // Las tipografías cambian las alturas: recalcular los ScrollTrigger al cargar.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  // Al cambiar de página: arriba del todo (o al ancla) y foco en el contenido
  // para que los lectores de pantalla anuncien la nueva página.
  useEffect(() => {
    const anchor = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

    if (anchor) {
      if (lenis) lenis.scrollTo(anchor, { offset: -headerOffset(), immediate: isFirstRender.current });
      else anchor.scrollIntoView();
    } else if (!isFirstRender.current) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }

    if (!isFirstRender.current) mainRef.current?.focus({ preventScroll: true });
    isFirstRender.current = false;
    // La página nueva cambia la altura total: el pie y sus triggers se recalculan.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, lenis]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-[3px] focus:bg-sky focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-deep"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <motion.main
        ref={mainRef}
        id="contenido"
        key={pathname}
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="outline-none"
      >
        <Outlet />
      </motion.main>
      <SiteFooter />
    </MotionConfig>
  );
}
