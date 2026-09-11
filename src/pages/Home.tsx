import { lazy, Suspense, useRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { CardBody, CardContainer } from '../../components/ui/3d-card';
import {
  FEATURED_CASE_ID,
  FEATURED_CASE_METRICS,
  INSTITUTIONAL_METRICS,
  PROJECT_CASES,
} from '../data/ciiiaData';
import { HERO_ID } from '../layout/SiteHeader';
import { formatFigure } from '../lib/text';
import { usePageTitle } from '../lib/usePageTitle';
import { MOTION, gsap, headerOffset, useGSAP, type MotionConditions } from '../motion/gsap';
import { Magnetic } from '../motion/Magnetic';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { CtaBand } from '../ui/CtaBand';
import { CycleTrack } from '../ui/CycleTrack';
import { FoundersList } from '../ui/FoundersList';
import { ButtonLink, TextLink } from '../ui/links';
import { Reveal } from '../ui/Reveal';
import { ServiceIndex } from '../ui/ServiceIndex';

const CursorGrid = lazy(() => import('../../components/effects/CursorGrid'));
const Strands = lazy(() => import('../../components/effects/Strands'));

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_TITLE = 'display text-[clamp(2rem,4.6vw,4rem)]';

/**
 * Landing: solo lo esencial. Qué es, qué hace, soluciones, una prueba,
 * respaldo institucional y contacto. Todo lo demás vive en su página.
 *
 * Narrativa de scroll (GSAP + ScrollTrigger):
 *   hero → la retícula se vuelve un piso 3D y el titular retrocede
 *   última milla → las dos líneas entran desde el fondo
 *   ciclo → cada etapa llega en profundidad, junto con la línea de Motion
 *   evidencia → la sección se fija mientras las cifras avanzan (escritorio)
 */
export function Home() {
  usePageTitle();
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, richEffects } = useMotionPreferences();
  const featured = PROJECT_CASES.find((item) => item.id === FEATURED_CASE_ID)!;

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { desktop } = context.conditions as MotionConditions;
        const hero = q('[data-hero]')[0];

        // Hero: tres capas a distinta velocidad. La retícula se inclina como un
        // piso que se aleja, el titular retrocede y el texto delantero sale antes.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: hero, start: () => `top ${headerOffset()}px`, end: 'bottom top', scrub: 0.6 },
          })
          .to(
            q('[data-hero-grid]'),
            {
              transformPerspective: 1100,
              transformOrigin: '50% 100%',
              rotateX: desktop ? 60 : 30,
              yPercent: desktop ? 18 : 8,
              scale: desktop ? 1.35 : 1.1,
              autoAlpha: 0.25,
            },
            0,
          )
          .to(
            q('[data-hero-title]'),
            {
              transformPerspective: 1100,
              transformOrigin: '50% 0%',
              yPercent: desktop ? 12 : 6,
              z: desktop ? -200 : -60,
              rotateX: desktop ? 12 : 4,
              autoAlpha: 0.15,
            },
            0,
          )
          // opacity y no autoAlpha: los botones del hero siguen siendo enfocables.
          .to(q('[data-hero-front]'), { yPercent: desktop ? -35 : -20, opacity: 0 }, 0)
          .to(q('[data-hero-strands]'), { yPercent: 30, autoAlpha: 0 }, 0);

        // «El problema no es la IA»: las dos líneas giran desde el fondo.
        gsap.from(q('[data-problem-line]'), {
          transformPerspective: 900,
          transformOrigin: '50% 100%',
          yPercent: 70,
          rotateX: -55,
          z: -80,
          autoAlpha: 0,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: q('#que-hacemos')[0], start: 'top 92%', end: 'top 55%', scrub: 0.6 },
        });

        // Ciclo: el texto de cada etapa llega en orden desde la profundidad. Los
        // nodos (aria-hidden) no se mueven para que sigan alineados con la línea.
        gsap.from(q('[data-cycle] li > :not([aria-hidden])'), {
          transformPerspective: 1000,
          z: -160,
          rotateX: 28,
          autoAlpha: 0.15,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: { trigger: q('[data-cycle]')[0], start: 'top 88%', end: 'top 40%', scrub: 0.6 },
        });

        // Evidencia: único pin del sitio, solo en escritorio.
        if (desktop) {
          const evidence = q('[data-evidence]')[0] as HTMLElement;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: evidence,
                start: () =>
                  evidence.offsetHeight + headerOffset() > window.innerHeight ? 'bottom bottom' : `top ${headerOffset()}px`,
                end: '+=120%',
                pin: true,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            })
            .from(q('[data-evidence-rule]'), { scaleX: 0, transformOrigin: '0% 50%', ease: 'none', duration: 1 }, 0)
            .from(
              q('[data-evidence-figure]'),
              {
                transformPerspective: 900,
                z: -420,
                rotateX: 55,
                autoAlpha: 0,
                filter: 'blur(10px)',
                ease: 'power3.out',
                duration: 1,
                stagger: 0.35,
              },
              0.1,
            )
            .to({}, { duration: 0.5 });
        }
      });
    },
    { scope: rootRef, dependencies: [richEffects, reducedMotion] },
  );

  return (
    <div ref={rootRef}>
      <section id={HERO_ID} data-hero data-tone="navy" className="relative isolate overflow-hidden bg-navy text-white">
        {!reducedMotion && (
          <div data-hero-grid aria-hidden="true" className="absolute inset-0 -z-10">
            <Suspense fallback={null}>
              <CursorGrid
                cellSize={72}
                color="#5CA9DB"
                radius={200}
                maxOpacity={0.4}
                gridOpacity={0.07}
                clickPulse={false}
              />
            </Suspense>
          </div>
        )}
        {richEffects && (
          <div
            data-hero-strands
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-[30%] -z-10 h-[60%] opacity-70"
          >
            <Suspense fallback={null}>
              <Strands
                colors={['#5CA9DB', '#29729F', '#A9C3D4']}
                count={3}
                speed={0.22}
                amplitude={0.55}
                thickness={0.5}
                glow={1.8}
                intensity={0.4}
                opacity={0.6}
                scale={1.7}
              />
            </Suspense>
          </div>
        )}

        {/* El texto deja pasar el puntero para que la retícula responda debajo. */}
        <div className="container-site pointer-events-none pb-16 pt-12 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
          <div data-hero-front>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-[40ch] text-mist"
            >
              Centro de Innovación Industrial en Inteligencia Artificial
            </motion.p>
          </div>

          <div data-hero-title>
            <h1 className="display mt-6 text-[clamp(2.25rem,7.6vw,7.25rem)] sm:mt-8">
              <HeroLine delay={0.05}>Inteligencia</HeroLine>
              <HeroLine delay={0.13}>artificial,</HeroLine>
              <HeroLine delay={0.21}>de la idea a</HeroLine>
              <HeroLine delay={0.29}>
                la operación<span className="brand-dot">.</span>
              </HeroLine>
            </h1>
          </div>

          <div data-hero-front>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
              className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end"
            >
              <p className="max-w-[58ch] text-lg leading-relaxed text-mist sm:text-xl lg:col-span-7">
                Acompañamos a empresas e instituciones desde la estrategia hasta la solución operando, con laboratorio
                propio en el Parque de Investigación e Innovación Tecnológica (PIIT) de Nuevo León, formación
                especializada y una red de más de 50 organizaciones aliadas.
              </p>
              <div className="pointer-events-auto flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <Magnetic>
                  <ButtonLink to="/contacto" tone="sky">
                    Hablar con el equipo
                  </ButtonLink>
                </Magnetic>
                <Magnetic strength={0.18}>
                  <ButtonLink to="/soluciones" tone="outline-light">
                    Ver soluciones
                  </ButtonLink>
                </Magnetic>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section aria-labelledby="que-hacemos" className="container-site py-20 sm:py-28 lg:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-y-12">
          <h2 id="que-hacemos" className={`${SECTION_TITLE} lg:col-span-12`}>
            <span data-problem-line className="block">
              El problema no es la IA.
            </span>
            <span data-problem-line className="block">
              Es la última milla.
            </span>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed lg:col-span-6 lg:col-start-7">
            <p>
              Solo el 5% de las empresas de Nuevo León, principalmente trasnacionales, cuenta con equipos internos de
              ciencia de datos. Al resto no le falta otra prueba de concepto: le falta recorrer el tramo que va del
              piloto a la operación.
            </p>
            <p className="text-graphite">
              El CII.IA acompaña ese tramo completo en cinco etapas, desde decidir qué merece construirse hasta dejar la
              capacidad instalada en tu organización.
            </p>
            <TextLink to="/soluciones#ciclo">Cómo funciona cada etapa</TextLink>
          </div>
        </div>
        <div data-cycle className="mt-16 lg:mt-24">
          <CycleTrack />
        </div>
      </section>

      <section aria-labelledby="soluciones" className="border-t border-rule">
        <div className="container-site py-20 sm:py-28 lg:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
            <h2 id="soluciones" className={SECTION_TITLE}>
              Soluciones
            </h2>
            <p className="max-w-[44ch] text-lg text-graphite">
              Cinco líneas de trabajo, de la estrategia a la formación del equipo interno.
            </p>
          </div>
          <ServiceIndex />
        </div>
      </section>

      <section data-evidence aria-labelledby="evidencia" className="bg-surface">
        <div className="container-site grid gap-14 py-20 sm:py-28 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-5">
            <p className="text-graphite">Caso documentado en manufactura</p>
            <h2 id="evidencia" className={`${SECTION_TITLE} mt-4`}>
              {featured.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              {featured.challenge} {featured.approach}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink to={`/casos/${featured.id}`}>Ver el caso</TextLink>
              <TextLink to="/casos">Ver las 12 soluciones documentadas</TextLink>
            </div>
          </div>

          {/* Panel de cifras con inclinación al cursor (3d-card del kit). */}
          <CardContainer containerClassName="block self-end py-0 lg:col-span-6 lg:col-start-7" className="block w-full">
            <CardBody className="relative w-full pt-8">
              <span data-evidence-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink" />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-10">
                {FEATURED_CASE_METRICS.map((metric, index) => (
                  <Reveal key={metric.label} delay={index * 0.08} className="flex flex-col-reverse">
                    <dt className="mt-3 text-graphite">{metric.label}</dt>
                    <dd
                      data-evidence-figure
                      className="figure text-[clamp(2.75rem,7vw,5.5rem)] leading-none text-navy"
                    >
                      {formatFigure(metric.value)}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      <section aria-labelledby="institucion" className="container-site py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="institucion" className={SECTION_TITLE}>
              Gobierno, academia e industria
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              El CII.IA se inauguró en 2021 en el PIIT, Nuevo León, dentro del programa federal de Centros de
              Innovación Industrial. Hoy articula un ecosistema de más de 50 organizaciones.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
              {INSTITUTIONAL_METRICS.map((metric) => (
                <div key={metric.id} className="flex flex-col-reverse border-t border-rule pt-4">
                  <dt className="mt-2 text-[0.95rem] leading-snug text-graphite">{metric.label}</dt>
                  <dd className="figure text-4xl text-navy sm:text-5xl">
                    {metric.value}
                    {metric.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="mb-6 text-lg font-semibold">Socios fundadores</h3>
            <FoundersList />
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink to="/nosotros">Conocer al CII.IA</TextLink>
              <TextLink to="/ecosistema">Ver el ecosistema</TextLink>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Cuéntanos tu reto"
        body="Dinos en qué punto está tu organización. El equipo del CII.IA te orienta sobre la etapa y la solución que corresponden."
        effect="laser"
      />
    </div>
  );
}

function HeroLine({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.95, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}
