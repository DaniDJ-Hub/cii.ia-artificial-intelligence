import { useRef } from 'react';
import { useLocation } from 'react-router';
import { gsap, useGSAP } from './gsap';
import { useMotionPreferences } from './useMotionPreferences';

/**
 * Cortina de cambio de ruta: cubre el intercambio de página y se levanta para
 * descubrir la nueva. No se monta con movimiento reducido.
 */
export function RouteCurtain() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const { reducedMotion } = useMotionPreferences();

  useGSAP(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      if (reducedMotion || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { scaleY: 1 },
        { scaleY: 0, duration: 0.7, ease: 'power4.inOut', transformOrigin: '50% 0%' },
      );
    },
    { dependencies: [pathname], scope: ref },
  );

  if (reducedMotion) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] origin-top scale-y-0 bg-navy-deep"
    />
  );
}
