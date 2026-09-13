import { FOUNDING_PARTNERS } from '../data/ciiiaData';
import { cn } from '../lib/cn';
import { plainName, roleDetail } from '../lib/text';
import { gsap } from '../motion/gsap';
import { Photo, hasPhoto } from './Photo';

/**
 * Lista de socios fundadores.
 *
 * Los filetes son pseudo-elementos escalados con la variable `--rule` (1 por
 * defecto, así que sin animación se ven completos). `animateFounders` los dibuja
 * con GSAP sin añadir elementos al marcado.
 */
export function FoundersList({ showLogos = false }: { showLogos?: boolean }) {
  return (
    <ul
      data-founders
      className="relative before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:scale-x-[var(--rule,1)] before:bg-ink"
    >
      {FOUNDING_PARTNERS.map((partner) => {
        const logo = showLogos && partner.logo && hasPhoto(partner.logo) ? partner.logo : null;
        return (
          <li
            key={partner.name}
            className={cn(
              'relative grid gap-1 py-5 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-[var(--rule,1)] after:bg-rule sm:grid-cols-12 sm:gap-6',
              logo && 'grid-cols-[5rem_1fr] items-center gap-x-5',
            )}
          >
            {logo && (
              // Decorativo: el nombre de la institución ya está escrito al lado.
              <span data-founder-logo className="row-span-2 flex h-14 items-center sm:col-span-3 sm:row-span-1">
                <Photo
                  name={logo}
                  alt=""
                  sizes="(min-width: 640px) 150px, 80px"
                  className="max-h-full w-auto max-w-full object-contain object-left"
                />
              </span>
            )}
            <span
              data-founder-name
              className={cn('text-lg font-semibold leading-snug', logo ? 'sm:col-span-4' : 'sm:col-span-5')}
            >
              {plainName(partner.name)}
            </span>
            <span data-founder-role className={cn('text-graphite', logo ? 'sm:col-span-5' : 'sm:col-span-7')}>
              {roleDetail(partner.roleInEcosystem)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Dibuja la lista al entrar en pantalla, una sola vez: filete superior, cada
 * institución en orden (nombre antes que rol) con su línea debajo y, si hay
 * logotipos, cada uno trazándose de izquierda a derecha.
 *
 * Llamar dentro de `gsap.matchMedia(MOTION)` de la página, en orden de aparición
 * respecto a otros ScrollTrigger (importa si hay un pin antes).
 */
export function animateFounders(list: Element) {
  const q = gsap.utils.selector(list);
  const timeline = gsap
    .timeline({ scrollTrigger: { trigger: list, start: 'top 85%', once: true } })
    .fromTo(list, { '--rule': 0 }, { '--rule': 1, duration: 0.8, ease: 'power2.out' }, 0)
    .fromTo(q('li'), { '--rule': 0 }, { '--rule': 1, duration: 0.7, ease: 'power2.out', stagger: 0.1 }, 0.2)
    .from(q('[data-founder-name]'), { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, 0.1)
    .from(q('[data-founder-role]'), { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, 0.22);

  const logos = q('[data-founder-logo]');
  if (logos.length) {
    timeline.fromTo(
      logos,
      { clipPath: 'inset(0% 100% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.inOut', stagger: 0.1 },
      0.05,
    );
  }

  return timeline;
}
