import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { cn } from '../lib/cn';
import { MOTION, gsap, headerOffset, useGSAP, type MotionConditions } from '../motion/gsap';

type Crumb = { to: string; label: string };

interface PageIntroProps {
  title: string;
  lead?: ReactNode;
  breadcrumb?: Crumb[];
  size?: 'xl' | 'lg';
  children?: ReactNode;
}

export function PageIntro({ title, lead, breadcrumb, size = 'xl', children }: PageIntroProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Al salir con el scroll, el título retrocede en profundidad: transición
  // hacia el contenido de la página sin cortar la lectura.
  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const mm = gsap.matchMedia();
      mm.add(MOTION, (context) => {
        const { desktop } = context.conditions as MotionConditions;
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: ref.current, start: () => `top ${headerOffset()}px`, end: 'bottom top', scrub: 0.5 },
          })
          .to(
            q('[data-intro-title]'),
            {
              transformPerspective: 1000,
              transformOrigin: '50% 0%',
              yPercent: desktop ? 22 : 10,
              z: desktop ? -110 : -40,
              rotateX: desktop ? 7 : 3,
              autoAlpha: 0.35,
            },
            0,
          )
          .to(q('[data-intro-lead]'), { autoAlpha: 0.45 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="container-site pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-20">
      {breadcrumb && (
        <nav aria-label="Ruta de navegación" className="mb-10 text-graphite">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.95rem]">
            {breadcrumb.map((crumb) => (
              <li key={crumb.to} className="flex items-center gap-2">
                <Link
                  to={crumb.to}
                  className="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  {crumb.label}
                </Link>
                <span aria-hidden="true">/</span>
              </li>
            ))}
            <li aria-current="page" className="text-ink">
              {title}
            </li>
          </ol>
        </nav>
      )}

      <div data-intro-title>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'display',
            size === 'xl' ? 'text-[clamp(2.75rem,8vw,7rem)]' : 'max-w-[22ch] text-[clamp(2rem,5vw,4.5rem)]',
          )}
        >
          {title}
        </motion.h1>
      </div>

      {lead && (
        <p
          data-intro-lead
          className="mt-6 max-w-[58ch] text-lg leading-relaxed text-graphite sm:mt-8 sm:text-xl"
        >
          {lead}
        </p>
      )}

      {children}
    </div>
  );
}
