import { lazy, Suspense, useRef } from 'react';
import { motion } from 'motion/react';
import { CardBody, CardContainer } from '../../components/ui/3d-card';
import {
  FEATURED_CASE_ID,
  FEATURED_CASE_METRICS,
  INSTITUTIONAL_METRICS,
  PROJECT_CASES,
} from '../data/ciiiaData';
import { HERO_ID } from '../layout/SiteHeader';
import { cn } from '../lib/cn';
import { formatFigure } from '../lib/text';
import { usePageTitle } from '../lib/usePageTitle';
import { MOTION, gsap, headerOffset, useGSAP, type MotionConditions } from '../motion/gsap';
import { Magnetic } from '../motion/Magnetic';
import { ScrollVideo, hasVideo } from '../motion/ScrollVideo';
import { SplitReveal } from '../motion/SplitReveal';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { CtaBand } from '../ui/CtaBand';
import { CycleTrack } from '../ui/CycleTrack';
import { FoundersList, animateFounders } from '../ui/FoundersList';
import { ButtonLink, TextLink } from '../ui/links';
import { Photo, hasPhoto } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';
import { ServiceIndex } from '../ui/ServiceIndex';

const HeroField = lazy(() => import('../three/HeroField'));

const EASE = [0.22, 1, 0.36, 1] as const;
const SECTION_TITLE = 'display text-[clamp(2rem,4.6vw,4rem)]';

/**
 * Landing en dos actos, precedidos por el video de bienvenida.
 *
 * Entrada: el video WELCOME avanza con el scroll dentro de una sección fijada
 * (`ScrollVideo`). La página sigue solo cuando el video llega al final.
 *
 * Acto oscuro (hero + manifiesto): un campo de puntos en WebGL persiste detrás
 * de ambas secciones. Al avanzar el scroll la cámara entra en el campo y los
 * puntos pasan de dispersos a retícula: de la idea a la operación.
 *
 * Acto claro (soluciones, evidencia, respaldo): tipografía, filetes e índices.
 * Secciones fijadas: el video de entrada (en todas las pantallas) y la
 * evidencia (solo en escritorio).
 */
export function Home() {
  usePageTitle();
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, richEffects } = useMotionPreferences();
  const featured = PROJECT_CASES.find((item) => item.id === FEATURED_CASE_ID)!;
  const inspectionPhoto = hasPhoto('inicio-inspeccion');
  const labPhoto = hasPhoto('inicio-laboratorio');
  const welcomeVideo = hasVideo('welcome');

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add(MOTION, (context) => {
        const { desktop } = context.conditions as MotionConditions;
        const hero = q('[data-hero]')[0];
        const act = q('[data-act="navy"]')[0];

        // Hero: el texto delantero sale antes que el titular. La diferencia de
        // velocidad es la que crea la profundidad, no una sombra.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: hero, start: () => `top ${headerOffset()}px`, end: 'bottom top', scrub: 0.6 },
          })
          .to(
            q('[data-hero-title]'),
            {
              transformPerspective: 1100,
              transformOrigin: '50% 0%',
              yPercent: desktop ? 14 : 8,
              z: desktop ? -220 : -70,
              rotateX: desktop ? 12 : 4,
              autoAlpha: 0.1,
            },
            0,
          )
          // opacity y no autoAlpha: los botones del hero siguen siendo enfocables.
          .to(q('[data-hero-front]'), { yPercent: desktop ? -40 : -22, opacity: 0 }, 0);

        // La retícula estática cede protagonismo al campo 3D.
        gsap.to(q('[data-lattice]'), {
          autoAlpha: 0.3,
          ease: 'none',
          scrollTrigger: { trigger: act, start: 'top top', end: '45% top', scrub: 0.6 },
        });

        // Indicador de scroll: recorre su carril y desaparece al empezar a leer.
        gsap.to(q('[data-scroll-hint]'), {
          yPercent: 260,
          repeat: -1,
          duration: 1.7,
          ease: 'power2.inOut',
        });

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

        // Evidencia: barrido de inspección. Una cubierta baja por la foto con una
        // línea de luz en su borde, como la cámara revisando la pieza, mientras la
        // imagen se asienta desde un leve acercamiento. Solo transform.
        const photoCover = q('[data-evidence-cover]');
        const photoZoom = q('[data-evidence-zoom]');
        const withPhoto = photoCover.length > 0;

        // Único pin del sitio, solo en escritorio: primero la foto, después las cifras.
        if (desktop) {
          const evidence = q('[data-evidence]')[0] as HTMLElement;
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: evidence,
              start: () =>
                evidence.offsetHeight + headerOffset() > window.innerHeight ? 'bottom bottom' : `top ${headerOffset()}px`,
              end: withPhoto ? '+=170%' : '+=120%',
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (withPhoto) {
            timeline
              .fromTo(photoCover, { yPercent: 0 }, { yPercent: 101, ease: 'none', duration: 1.2 }, 0)
              .fromTo(photoZoom, { scale: 1.18 }, { scale: 1, ease: 'none', duration: 1.5 }, 0);
          }

          const figuresAt = withPhoto ? 1 : 0;
          timeline
            .from(q('[data-evidence-rule]'), { scaleX: 0, transformOrigin: '0% 50%', ease: 'none', duration: 1 }, figuresAt)
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
              figuresAt + 0.1,
            )
            .to({}, { duration: 0.5 });
        } else if (withPhoto) {
          // Móvil: el mismo barrido, ligado al scroll y sin fijar la sección.
          gsap
            .timeline({
              scrollTrigger: { trigger: q('[data-evidence-photo]')[0], start: 'top 85%', end: 'bottom 60%', scrub: 0.6 },
            })
            .fromTo(photoCover, { yPercent: 0 }, { yPercent: 101, ease: 'none' }, 0)
            .fromTo(photoZoom, { scale: 1.18 }, { scale: 1, ease: 'none' }, 0);
        }

        // Institucional: la foto del laboratorio se abre desde el centro, como la
        // cinta de una inauguración, y después acompaña el scroll con un parallax lento.
        const labFrame = q('[data-lab-photo]')[0];
        if (labFrame) {
          gsap
            .timeline({ scrollTrigger: { trigger: labFrame, start: 'top 88%', end: 'top 38%', scrub: 0.6 } })
            .fromTo(
              q('[data-lab-curtain]'),
              { xPercent: 0 },
              { xPercent: (index: number) => (index === 0 ? -101 : 101), ease: 'none' },
              0,
            )
            .fromTo(q('[data-lab-zoom]'), { scale: 1.2 }, { scale: 1, ease: 'none' }, 0);

          gsap.fromTo(
            q('[data-lab-parallax]'),
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: labFrame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        }

        // Cifras institucionales: el filete de cada una se dibuja, las cantidades
        // cuentan desde cero y el año sube desde su máscara (una fecha no se cuenta).
        // Se reproduce una vez, sin scrub: el dato nunca queda a medio mostrar.
        const metrics = q('[data-inst-metrics]')[0];
        if (metrics) {
          gsap
            .timeline({ scrollTrigger: { trigger: metrics, start: 'top 85%', once: true } })
            .fromTo(
              q('[data-inst-metric]'),
              { '--rule': 0 },
              { '--rule': 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 },
              0,
            )
            .from(
              q('[data-count-to]'),
              { textContent: 0, duration: 1.5, ease: 'power3.out', snap: { textContent: 1 }, stagger: 0.12 },
              0.15,
            )
            .from(q('[data-year]'), { yPercent: 110, duration: 0.9, ease: 'power4.out' }, 0.5)
            .from(
              q('[data-inst-metric] dt'),
              { y: 10, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 },
              0.3,
            );
        }

        // Socios fundadores: se traza el filete superior y cada institución entra
        // en orden, el nombre antes que su rol, con su línea dibujándose debajo.
        // Se crea aquí, después del pin de evidencia, para que su posición cuente
        // con el espacio que ese pin añade.
        const founders = q('[data-founders]')[0];
        if (founders) animateFounders(founders);
      });
    },
    { scope: rootRef, dependencies: [richEffects, reducedMotion] },
  );

  return (
    <div ref={rootRef}>
      {/* -------------------------------- ENTRADA -------------------------------- */}
      {/* Fuera del acto oscuro para que el campo 3D no se renderice oculto detrás del video. */}
      {welcomeVideo && (
        <div data-act="intro">
          <ScrollVideo name="welcome" />
        </div>
      )}

      {/* ------------------------------ ACTO OSCURO ------------------------------ */}
      <div data-act="navy" data-tone="navy" className="relative isolate bg-navy text-white">
        {/* Fondo del acto: el contenedor absoluto lo acota a este bloque y el
            hijo pegado lo mantiene en pantalla mientras dura el acto. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-clip">
          <div className="sticky top-0 h-[100svh]">
            <div data-lattice className="hero-lattice absolute inset-0" />
            <div className="hero-horizon absolute inset-x-0 bottom-0 h-1/2" />
            {richEffects && (
              <Suspense fallback={null}>
                <HeroField trigger="[data-act='navy']" />
              </Suspense>
            )}
            {/* Velo que garantiza el contraste del texto sobre el campo. */}
            <div className="absolute inset-0 bg-navy/35" />
          </div>
        </div>

        <section id={HERO_ID} data-hero className="relative flex min-h-[100svh] flex-col justify-center">
          <div className="container-site pb-14 pt-24 sm:pt-28">
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
              {/* Con el video delante, el titular se revela al llegar a él y no al cargar. */}
              <SplitReveal
                as="h1"
                mode={welcomeVideo ? 'scroll' : 'load'}
                delay={welcomeVideo ? 0 : 0.15}
                className="display mt-6 text-[clamp(2.25rem,7.6vw,7.25rem)] sm:mt-8"
              >
                {/* Los saltos son deliberados; el espacio antes de cada uno mantiene
                    legible el nombre accesible que SplitText toma del texto. */}
                Inteligencia <br />
                artificial, <br />
                de la idea a <br />
                la operación<span className="brand-dot">.</span>
              </SplitReveal>
            </div>

            <div data-hero-front>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
                className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-end"
              >
                <p className="max-w-[58ch] text-lg leading-relaxed text-mist sm:text-xl lg:col-span-7">
                  Acompañamos a empresas e instituciones desde la estrategia hasta la solución operando, con laboratorio
                  propio en el Parque de Investigación e Innovación Tecnológica (PIIT) de Nuevo León, formación
                  especializada y una red de más de 50 organizaciones aliadas.
                </p>
                <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
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

          {!reducedMotion && (
            <div data-hero-front className="container-site pb-10">
              <p className="flex items-center gap-3 text-sm text-mist">
                <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-white/25">
                  <span data-scroll-hint className="absolute inset-x-0 top-0 block h-4 bg-sky" />
                </span>
                Desplázate
              </p>
            </div>
          )}
        </section>

        <section aria-labelledby="que-hacemos" className="container-site pb-24 pt-6 sm:pb-32 lg:pb-40">
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
              <p className="text-mist">
                El CII.IA acompaña ese tramo completo en cinco etapas, desde decidir qué merece construirse hasta dejar
                la capacidad instalada en tu organización.
              </p>
              <TextLink to="/soluciones#ciclo">Cómo funciona cada etapa</TextLink>
            </div>
          </div>
          <div data-cycle className="mt-16 lg:mt-24">
            <CycleTrack tone="navy" />
          </div>
        </section>
      </div>

      {/* ------------------------------- ACTO CLARO ------------------------------ */}
      {/* `relative` en el acto claro: el acto oscuro es un contexto de
          apilamiento posicionado y, sin esto, su fondo se pintaría encima. */}
      <section aria-labelledby="soluciones" className="relative bg-paper">
        <div className="container-site py-20 sm:py-28 lg:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
            <SplitReveal as="h2" className={SECTION_TITLE}>
              <span id="soluciones">Soluciones</span>
            </SplitReveal>
            <p className="max-w-[44ch] text-lg text-graphite">
              Cinco líneas de trabajo, de la estrategia a la formación del equipo interno.
            </p>
          </div>
          <ServiceIndex />
        </div>
      </section>

      <section data-evidence aria-labelledby="evidencia" className="relative bg-surface">
        <div
          className={cn(
            'container-site grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-14',
            inspectionPhoto ? 'lg:items-center lg:py-20' : 'lg:py-32',
          )}
        >
          {inspectionPhoto && (
            <figure className="lg:col-span-4">
              {/* El fondo va en la capa interior: en el marco asomaba por las esquinas redondeadas. */}
              <div data-evidence-photo className="relative isolate aspect-[4/5] overflow-hidden rounded-[3px]">
                <div data-evidence-zoom className="photo-cold absolute inset-0 bg-navy">
                  <Photo
                    name="inicio-inspeccion"
                    alt="Operario con casco y tableta junto a una cámara de inspección que revisa piezas metálicas sobre una banda transportadora."
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                {!reducedMotion && (
                  <div data-evidence-cover aria-hidden="true" className="absolute inset-0 bg-surface">
                    <span className="absolute inset-x-0 top-0 h-[2px] bg-sky shadow-[0_0_14px_2px_rgb(92_169_219/0.45)]" />
                  </div>
                )}
              </div>
              {/* Ilustrativa: no es una foto del despliegue documentado. */}
              <figcaption className="mt-3 text-sm text-graphite">
                Imagen ilustrativa de inspección con visión por computadora.
              </figcaption>
            </figure>
          )}

          <div className={inspectionPhoto ? 'lg:col-span-8' : 'lg:col-span-12'}>
            <p className="text-graphite">Caso documentado en manufactura</p>
            <SplitReveal as="h2" className={`${SECTION_TITLE} mt-4`}>
              <span id="evidencia">{featured.title}</span>
            </SplitReveal>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">
              {featured.challenge} {featured.approach}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <TextLink to={`/casos/${featured.id}`}>Ver el caso</TextLink>
              <TextLink to="/casos">Ver las 12 soluciones documentadas</TextLink>
            </div>

            {/* Panel de cifras con inclinación al cursor (3d-card del kit). */}
            <CardContainer containerClassName="mt-12 block py-0" className="block w-full">
              <CardBody className="relative w-full pt-8">
                <span data-evidence-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-ink" />
                <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
                  {FEATURED_CASE_METRICS.map((metric, index) => (
                    <Reveal key={metric.label} delay={index * 0.08} className="flex flex-col-reverse">
                      <dt className="mt-3 text-graphite">{metric.label}</dt>
                      <dd
                        data-evidence-figure
                        className="figure text-[clamp(2.5rem,4.2vw,4rem)] leading-none text-navy"
                      >
                        {formatFigure(metric.value)}
                      </dd>
                    </Reveal>
                  ))}
                </dl>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </section>

      <section aria-labelledby="institucion" className="container-site relative bg-paper py-20 sm:py-28 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitReveal as="h2" className={SECTION_TITLE}>
              <span id="institucion">Gobierno, academia e industria</span>
            </SplitReveal>
            <p className="mt-6 text-lg leading-relaxed">
              El CII.IA se inauguró en 2021 en el PIIT, Nuevo León, dentro del programa federal de Centros de
              Innovación Industrial. Hoy articula un ecosistema de más de 50 organizaciones.
            </p>
            {labPhoto && (
              <figure className="mt-10">
                {/* `isolate` hace que Chrome recorte bien las esquinas con hijos transformados. */}
                <div data-lab-photo className="relative isolate aspect-[4/3] overflow-hidden rounded-[3px]">
                  {/* Margen vertical extra para que el parallax nunca descubra el borde. */}
                  <div data-lab-parallax className="absolute inset-x-0 -inset-y-[8%]">
                    <div data-lab-zoom className="photo-cold h-full w-full bg-navy">
                      <Photo
                        name="inicio-laboratorio"
                        alt="Laboratorio del CII.IA con su logotipo iluminado en la pared, un brazo robótico industrial naranja, estructuras de aluminio y globos negros y amarillos."
                        sizes="(min-width: 1024px) 36vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  {!reducedMotion && (
                    <>
                      <span data-lab-curtain aria-hidden="true" className="absolute inset-y-0 left-0 w-1/2 bg-paper" />
                      <span data-lab-curtain aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-paper" />
                    </>
                  )}
                </div>
                <figcaption className="mt-3 text-sm text-graphite">Laboratorio del CII.IA en el PIIT, Nuevo León.</figcaption>
              </figure>
            )}
            <dl data-inst-metrics className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
              {INSTITUTIONAL_METRICS.map((metric) => (
                <div
                  key={metric.id}
                  data-inst-metric
                  className="relative flex flex-col-reverse pt-4 before:absolute before:inset-x-0 before:top-0 before:h-px before:origin-left before:scale-x-[var(--rule,1)] before:bg-rule"
                >
                  <dt className="mt-2 text-[0.95rem] leading-snug text-graphite">{metric.label}</dt>
                  <dd className="figure text-4xl text-navy sm:text-5xl">
                    {/* La parte visual se anima; el lector de pantalla lee siempre el valor final. */}
                    <span aria-hidden="true">
                      {metric.kind === 'year' ? (
                        <span className="inline-block overflow-hidden align-bottom">
                          <span data-year className="inline-block">
                            {metric.value}
                          </span>
                        </span>
                      ) : (
                        <>
                          <span data-count-to>{metric.value}</span>
                          {metric.suffix}
                        </>
                      )}
                    </span>
                    <span className="sr-only">
                      {metric.value}
                      {metric.suffix}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Con la foto, la columna izquierda crece: centrar la lista la equilibra. */}
          <div className={cn('lg:col-span-6 lg:col-start-7', labPhoto && 'lg:self-center')}>
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
