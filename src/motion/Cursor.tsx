import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from './gsap';

const POINTER_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const INTERACTIVE = 'a, button, [role="tab"], input, textarea, select, label, summary';

/**
 * Anillo que sigue al cursor con retardo y crece sobre lo interactivo.
 * El cursor nativo permanece visible: el anillo acompaña, no sustituye.
 */
export function Cursor() {
  const ref = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(POINTER_QUERY);
    const sync = () => setEnabled(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useGSAP(
    () => {
      const ring = ref.current;
      if (!enabled || !ring) return;

      gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      const xTo = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
      const yTo = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
      let visible = false;
      let over = false;

      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        if (!visible) {
          visible = true;
          gsap.to(ring, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
        }
        const isOver = Boolean((event.target as Element)?.closest?.(INTERACTIVE));
        if (isOver !== over) {
          over = isOver;
          gsap.to(ring, { scale: isOver ? 1.85 : 1, duration: 0.3, ease: 'power3.out' });
        }
      };
      const onLeave = () => {
        visible = false;
        gsap.to(ring, { autoAlpha: 0, duration: 0.25 });
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      window.addEventListener('blur', onLeave);
      return () => {
        window.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerleave', onLeave);
        window.removeEventListener('blur', onLeave);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] size-9 rounded-full border border-white opacity-0 mix-blend-difference"
    />
  );
}
