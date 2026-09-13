import { useRef } from 'react';
import { ScrollTrigger, gsap, useGSAP } from './gsap';

/** Línea de progreso de lectura bajo el encabezado. */
export function ScrollProgress() {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const bar = ref.current;
      if (!bar) return;
      gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' });
      const trigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
      });
      return () => trigger.kill();
    },
    { scope: ref },
  );

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-sky"
    />
  );
}
