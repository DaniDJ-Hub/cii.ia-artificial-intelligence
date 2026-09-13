import { useRef, type ElementType, type ReactNode, type Ref } from 'react';
import { MOTION, SplitText, gsap, useGSAP } from './gsap';

interface SplitRevealProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** `load`: al montar. `scroll`: cuando el bloque entra en pantalla. */
  mode?: 'load' | 'scroll';
  delay?: number;
  start?: string;
}

/**
 * Revelado por líneas con SplitText: cada línea sube desde su propia máscara.
 *
 * SplitText mantiene el texto accesible (`aria: 'auto'` etiqueta el elemento
 * original y oculta las líneas partidas) y `autoSplit` rehace el corte cuando
 * cambian el ancho o las tipografías. Con movimiento reducido no se parte nada.
 */
export function SplitReveal({
  as = 'span',
  children,
  className,
  mode = 'scroll',
  delay = 0,
  start = 'top 88%',
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION, () => {
        const split = SplitText.create(element, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          aria: 'auto',
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 118,
              duration: 1,
              ease: 'power4.out',
              stagger: 0.08,
              delay,
              scrollTrigger: mode === 'scroll' ? { trigger: element, start, once: true } : undefined,
            }),
        });
        return () => split.revert();
      });
    },
    { scope: ref, dependencies: [mode, delay, start] },
  );

  // El elemento es dinámico (h1, h2, span…). Se tipa como un elemento simple
  // para que JSX infiera props y ref; en ejecución se renderiza `as`.
  const Tag = as as 'div';

  return (
    <Tag ref={ref as Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}
