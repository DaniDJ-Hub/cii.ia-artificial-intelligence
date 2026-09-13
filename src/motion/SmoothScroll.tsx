import { useEffect, type ReactNode } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import { gsap, ScrollTrigger } from './gsap';
import { useMotionPreferences } from './useMotionPreferences';

/**
 * Puente entre Lenis, el ticker de GSAP y ScrollTrigger.
 *
 * Va en un componente hijo y toma la instancia con `useLenis()`: Lenis cancela
 * el scroll nativo de la rueda, así que si el ticker apunta a una instancia que
 * no es la viva, la página deja de moverse por completo. Con el hook siempre se
 * conecta la instancia actual, incluso si React la recrea.
 */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on('scroll', ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    // Al tabular, el navegador desplaza la página por su cuenta. Sin esto Lenis
    // conserva su posición anterior y devuelve el scroll al soltar el foco.
    const syncFocus = () => {
      requestAnimationFrame(() => lenis.scrollTo(window.scrollY, { immediate: true, force: true }));
    };
    window.addEventListener('focusin', syncFocus);

    return () => {
      gsap.ticker.remove(update);
      lenis.off('scroll', ScrollTrigger.update);
      window.removeEventListener('focusin', syncFocus);
    };
  }, [lenis]);

  return null;
}

/**
 * Scroll suave global. Lenis mueve el scroll nativo de la ventana, así que
 * `position: sticky` y el encabezado fijo siguen funcionando. Con
 * `prefers-reduced-motion` no se monta: el scroll queda como lo da el navegador.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const { reducedMotion } = useMotionPreferences();

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // Solo `lerp` (independiente de los fps). `duration` es para scrollTo:
        // declarar ambos deja el suavizado de la rueda en un estado ambiguo.
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // En táctil se deja el scroll nativo: es más fluido y no pelea con el
        // gesto del sistema.
        syncTouch: false,
        autoRaf: false,
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
