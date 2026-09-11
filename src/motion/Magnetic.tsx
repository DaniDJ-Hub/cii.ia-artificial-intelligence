import { useRef, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { gsap, useGSAP } from './gsap';

const POINTER_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/** Atracción magnética sutil hacia el cursor. Solo con puntero fino. */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !window.matchMedia(POINTER_QUERY).matches) return;

      const xTo = gsap.quickTo(element, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2 - Number(gsap.getProperty(element, 'x'));
        const centerY = rect.top + rect.height / 2 - Number(gsap.getProperty(element, 'y'));
        xTo((event.clientX - centerX) * strength);
        yTo((event.clientY - centerY) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      element.addEventListener('pointermove', onMove);
      element.addEventListener('pointerleave', onLeave);
      return () => {
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerleave', onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {children}
    </span>
  );
}
