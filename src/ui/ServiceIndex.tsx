import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/ciiiaData';
import { MOTION, gsap, useGSAP, type MotionConditions } from '../motion/gsap';

/**
 * Índice de soluciones. Filas en lugar de tarjetas: el nombre de cada línea es
 * el elemento dominante y el hover rellena la fila para confirmar el destino.
 * Al entrar con el scroll, cada fila gira desde arriba como un tablero.
 */
export function ServiceIndex({ detailed = false }: { detailed?: boolean }) {
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION, (context) => {
        const { desktop } = context.conditions as MotionConditions;
        const rows = Array.from(listRef.current?.children ?? []) as HTMLElement[];
        rows.forEach((row) => {
          gsap.from(row, {
            transformPerspective: 1200,
            transformOrigin: '50% 0%',
            rotateX: desktop ? -65 : -30,
            y: 24,
            // opacity y no autoAlpha: visibility:hidden sacaría los enlaces del orden de tabulación.
            opacity: 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: row, start: 'top 94%', end: 'top 72%', scrub: 0.5 },
          });
        });
      });
    },
    { scope: listRef },
  );

  return (
    <ul ref={listRef} className="border-t border-ink">
      {SERVICES_DATA.map((service) => (
        <li key={service.id} className="border-b border-rule">
          <Link
            to={`/soluciones/${service.id}`}
            className="group relative isolate grid gap-3 py-7 outline-offset-0 sm:py-9 md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -inset-x-3 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out-quart group-hover:scale-x-100 group-focus-visible:scale-x-100 sm:-inset-x-5"
            />
            <span className="text-[0.95rem] text-graphite md:col-span-3">{service.category}</span>
            <span className="font-display text-[1.65rem] font-bold uppercase leading-none [font-stretch:108%] transition-colors duration-300 group-hover:text-steel sm:text-[2rem] md:col-span-4">
              {service.title}
            </span>
            <span className="md:col-span-4">
              <span className="block text-lg leading-snug">{service.tagline}</span>
              {detailed && <span className="mt-3 block leading-relaxed text-graphite">{service.description}</span>}
              {detailed && <span className="mt-3 block font-mono text-sm text-graphite">{service.startingPrice}</span>}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="hidden size-6 justify-self-end text-graphite transition-[transform,color] duration-300 ease-out-quart group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-steel md:col-span-1 md:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
