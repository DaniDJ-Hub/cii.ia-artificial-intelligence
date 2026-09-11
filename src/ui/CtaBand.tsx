import { lazy, Suspense, useRef, type ReactNode } from 'react';
import { CONTACT_INFO } from '../data/ciiiaData';
import { MOTION, gsap, useGSAP, type MotionConditions } from '../motion/gsap';
import { Magnetic } from '../motion/Magnetic';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { ButtonLink } from './links';

const LaserFlow = lazy(() => import('../../components/effects/LaserFlow'));

interface CtaBandProps {
  title: string;
  body?: ReactNode;
  to?: string;
  action?: string;
  /** `laser` recupera el haz de LaserFlow del kit. Úsese solo en la landing. */
  effect?: 'laser';
}

export function CtaBand({ title, body, to = '/contacto', action = 'Escribir al equipo', effect }: CtaBandProps) {
  const ref = useRef<HTMLElement>(null);
  const { richEffects } = useMotionPreferences();

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION, (context) => {
        const { desktop } = context.conditions as MotionConditions;
        gsap.from(q('[data-cta-title]'), {
          transformPerspective: 1000,
          transformOrigin: '50% 100%',
          yPercent: desktop ? 35 : 15,
          z: desktop ? -220 : -60,
          rotateX: desktop ? 18 : 6,
          autoAlpha: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 92%', end: 'top 50%', scrub: 0.6 },
        });
        gsap.from(q('[data-cta-actions]'), {
          y: 40,
          // opacity y no autoAlpha: el botón debe seguir siendo enfocable con teclado.
          opacity: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'top 55%', scrub: 0.6 },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} data-tone="navy" className="relative isolate overflow-hidden bg-navy text-white">
      {effect === 'laser' && richEffects && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <Suspense fallback={null}>
            <LaserFlow color="#5CA9DB" backgroundColor="#0B2A43" wispDensity={0.8} fogIntensity={0.25} />
          </Suspense>
        </div>
      )}
      <div className="container-site grid gap-10 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-8">
          <div data-cta-title>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.75rem)]">{title}</h2>
          </div>
          {body && <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-mist">{body}</p>}
        </div>
        <div data-cta-actions className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
          <Magnetic>
            <ButtonLink to={to} tone="sky">
              {action}
            </ButtonLink>
          </Magnetic>
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="text-mist underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
      </div>
    </section>
  );
}
