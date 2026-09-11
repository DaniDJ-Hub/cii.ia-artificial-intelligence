import { lazy, Suspense, useRef } from 'react';
import { motion } from 'motion/react';
import { BRAND_PAIRS, CLIENT_QUOTES, CONTACT_INFO, TAGLINE } from '../data/ciiiaData';
import { usePageTitle } from '../lib/usePageTitle';
import { MOTION, gsap, useGSAP } from '../motion/gsap';
import { useMotionPreferences } from '../motion/useMotionPreferences';
import { CtaBand } from '../ui/CtaBand';
import { FoundersList } from '../ui/FoundersList';
import { TextLink } from '../ui/links';
import { PageIntro } from '../ui/PageIntro';

const CobeGlobe = lazy(() => import('../../components/ui/CobeGlobe'));

const SECTION_TITLE = 'display text-[clamp(1.9rem,4vw,3.5rem)]';

/**
 * Solo la sede. El globo del kit marcaba Nueva York, Londres y Tokio, donde
 * el CII.IA no tiene presencia documentada.
 */
const SEDE_MARKERS: { location: [number, number]; size: number }[] = [
  { location: [25.6866, -100.3161], size: 0.1 },
];

export function Nosotros() {
  usePageTitle('Nosotros');
  const rootRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionPreferences();

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      // Principios: cada verbo se desliza hacia su lugar, alternando dirección.
      mm.add(MOTION.desktop, () => {
        q('[data-verb]').forEach((verb, index) => {
          gsap.from(verb, {
            xPercent: index % 2 === 0 ? -14 : 14,
            ease: 'none',
            scrollTrigger: { trigger: verb, start: 'top bottom', end: 'top 62%', scrub: 0.6 },
          });
        });
      });

      // Sede: el globo se acerca y se endereza mientras la sección cruza la pantalla.
      mm.add(MOTION, () => {
        gsap.fromTo(
          q('[data-globe]'),
          { transformPerspective: 1200, scale: 0.78, rotateX: 22, yPercent: 10 },
          {
            scale: 1,
            rotateX: 0,
            yPercent: -8,
            ease: 'none',
            scrollTrigger: { trigger: q('[data-sede]')[0], start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  return (
    <div ref={rootRef}>
      <PageIntro
        title="Nosotros"
        lead="El CII.IA es el Centro de Innovación Industrial en Inteligencia Artificial. Desde el PIIT, en Nuevo León, acompaña a empresas e instituciones a llevar la inteligencia artificial de la idea a la operación."
      />

      <section aria-labelledby="origen" className="border-t border-rule">
        <div className="container-site grid gap-12 py-20 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="origen" className={SECTION_TITLE}>
              Cinco instituciones fundadoras
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              El centro se inauguró en 2021 dentro del programa federal de Centros de Innovación Industrial. Lo fundaron
              cinco instituciones de gobierno, academia e industria, y Monterrey IT Clúster se encarga de su
              administración.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <FoundersList />
          </div>
        </div>
      </section>

      <section aria-labelledby="reto" className="bg-surface">
        <div className="container-site py-20 sm:py-24 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-12">
            <h2 id="reto" className={`${SECTION_TITLE} lg:col-span-6`}>
              Lo que escuchamos en las empresas
            </h2>
            <p className="text-lg leading-relaxed lg:col-span-5 lg:col-start-8">
              Solo el 5% de las empresas de Nuevo León cuenta con equipos internos de ciencia de datos. El CII.IA trabaja
              el tramo que va del piloto a la operación: prototipado en laboratorio propio, integración con los sistemas
              existentes, adopción acompañada en piso y gobernanza.
            </p>
          </div>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-10">
            {CLIENT_QUOTES.map((item) => (
              <figure key={item.id} className="border-t border-ink pt-6">
                <blockquote className="font-serif text-2xl italic leading-snug sm:text-3xl">«{item.quote}»</blockquote>
                <figcaption className="mt-5 text-graphite">{item.role}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="principios" className="container-site overflow-x-clip py-20 sm:py-24 lg:py-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="principios" className={`${SECTION_TITLE} lg:col-span-6`}>
            Cómo trabajamos
          </h2>
          <p className="text-lg text-graphite lg:col-span-5 lg:col-start-8">
            Así describe el CII.IA lo que hace, y lo que evita hacer.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink">
          {BRAND_PAIRS.map((pair, index) => (
            <motion.li
              key={pair.verb1}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              transition={{ duration: 0.6, delay: 0.04 * (index % 3), ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-rule py-5 sm:py-6"
            >
              <span
                data-verb
                className="font-display text-[clamp(1.6rem,4.2vw,3.25rem)] font-bold uppercase leading-none [font-stretch:112%]"
              >
                {pair.verb1},
              </span>
              <span className="font-serif text-xl italic text-graphite sm:text-2xl">{pair.verb2}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section data-sede aria-labelledby="sede" className="overflow-hidden border-t border-rule">
        <div className="container-site grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="sede" className={SECTION_TITLE}>
              {TAGLINE}
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-relaxed">
              Trabajamos desde el {CONTACT_INFO.location}, con un laboratorio propio para prototipar y validar soluciones
              antes de llevarlas a la operación.
            </p>
            <TextLink to="/soluciones/ai-lab" className="mt-6">
              Conocer el AI Lab
            </TextLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <div data-globe aria-hidden="true" className="mx-auto aspect-square w-full max-w-[440px]">
              {!reducedMotion && (
                <Suspense fallback={null}>
                  <CobeGlobe
                    size={440}
                    dark={0}
                    diffuse={1.4}
                    mapSamples={16000}
                    mapBrightness={6}
                    baseColor={[1, 1, 1]}
                    markerColor={[0.16, 0.45, 0.62]}
                    glowColor={[0.93, 0.95, 0.96]}
                    markers={SEDE_MARKERS}
                  />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Hablemos"
        body="Si tu organización está explorando la inteligencia artificial o tiene un proyecto detenido, cuéntanos en qué punto está."
      />
    </div>
  );
}
