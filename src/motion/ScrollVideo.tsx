import { useRef, useState } from 'react';
import { VIDEOS } from '../data/videos.generated';
import { MOTION, ScrollTrigger, gsap, headerOffset, useGSAP, type MotionConditions } from './gsap';
import { useMotionPreferences } from './useMotionPreferences';

export function hasVideo(name: string) {
  return name in VIDEOS;
}

/** Scroll que consume el video completo, en altos de pantalla. */
const SCROLL_LENGTH = { desktop: 4.5, mobile: 3.5 };

/**
 * Qué tan rápido la imagen alcanza la posición del scroll (1/s). Lenis ya suaviza
 * la rueda; esto cubre los saltos grandes (barra, teclado, un gesto largo en
 * táctil) para que el video recorra el tramo en vez de saltar.
 */
const FOLLOW = 14;

/** Por debajo de medio fotograma no vale la pena pedir otro seek. */
const EPSILON = 1 / 60;

/**
 * Video cuyo avance lo decide el scroll, no el tiempo.
 *
 * La sección se fija debajo del encabezado y el recorrido del scroll se traduce
 * en `currentTime`: se detiene cuando el scroll se detiene y retrocede si el
 * usuario sube. Al llegar al final se suelta el pin y la página sigue.
 *
 * El archivo tiene que venir de `npm run video` (fotograma clave cada pocos
 * frames); con un MP4 normal cada seek tarda y el video avanza a saltos.
 *
 * Con movimiento reducido no hay pin ni video: se muestra un fotograma fijo.
 */
export function ScrollVideo({ name }: { name: string }) {
  const entry = VIDEOS[name];
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion } = useMotionPreferences();
  // La fuente se elige una sola vez: cambiarla al redimensionar volvería a descargar el video.
  const [src] = useState(() =>
    window.matchMedia('(min-width: 768px)').matches ? entry?.sources.desktop : entry?.sources.mobile,
  );

  useGSAP(
    () => {
      const root = rootRef.current;
      const pinned = pinRef.current;
      const video = videoRef.current;
      if (!entry || !root || !pinned || !video) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION, (context) => {
        const { desktop } = context.conditions as MotionConditions;
        const q = gsap.utils.selector(root);

        const duration = () => (Number.isFinite(video.duration) && video.duration > 0 ? video.duration : entry.duration);
        // Nunca el instante exacto del final: algunos navegadores pintan negro en t = duration.
        const lastFrame = () => duration() - 0.04;

        let progress = 0;
        let shown = 0;
        let running = false;

        const settled = () =>
          video.readyState >= HTMLMediaElement.HAVE_METADATA &&
          !video.seeking &&
          Math.abs(video.currentTime - Math.min(progress * duration(), lastFrame())) < EPSILON;

        const tick = (_time: number, deltaMs: number) => {
          if (video.readyState < HTMLMediaElement.HAVE_METADATA) return;
          const target = Math.min(progress * duration(), lastFrame());
          // Interpolación independiente de los fps.
          shown += (target - shown) * (1 - Math.exp((-FOLLOW * deltaMs) / 1000));
          if (Math.abs(target - shown) < EPSILON) shown = target;

          // Un seek nuevo solo cuando terminó el anterior: encadenarlos sin esperar
          // cancela cada uno antes de pintarse y la imagen se queda congelada.
          if (!video.seeking && Math.abs(video.currentTime - shown) >= EPSILON) video.currentTime = shown;

          root.style.setProperty('--progress', String(Math.min(1, shown / lastFrame())));
          if (!trigger.isActive && settled() && shown === target) {
            gsap.ticker.remove(tick);
            running = false;
          }
        };

        const follow = (value: number) => {
          progress = value;
          if (!running) {
            running = true;
            gsap.ticker.add(tick);
          }
        };

        const trigger = ScrollTrigger.create({
          trigger: pinned,
          start: () => `top ${headerOffset()}px`,
          end: () => `+=${Math.round(window.innerHeight * (desktop ? SCROLL_LENGTH.desktop : SCROLL_LENGTH.mobile))}`,
          pin: true,
          anticipatePin: 1,
          // Antes que los demás triggers de la página: todos van debajo y su
          // posición depende del espacio que añade este pin.
          refreshPriority: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => follow(self.progress),
          onRefresh: (self) => follow(self.progress),
        });

        // Al soltarse, la imagen sale más lenta que la página y se oscurece hacia el
        // marino del hero. Sin escala: encoger el cuadro dejaba ver sus bordes.
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: pinned,
              start: () => trigger.end,
              end: () => trigger.end + pinned.offsetHeight,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(q('[data-video-frame]'), { yPercent: 0 }, { yPercent: 35 }, 0)
          .fromTo(q('[data-video-veil]'), { opacity: 0 }, { opacity: 0.85 }, 0);

        // Con la metadata ya se conoce la duración: sincronizar con el scroll actual
        // (una recarga a media página, por ejemplo).
        const onMetadata = () => follow(trigger.progress);
        video.addEventListener('loadedmetadata', onMetadata);

        // iOS no pinta los seeks de un video que nunca se reprodujo. Un play/pause
        // al primer toque lo habilita; el tick corrige el par de frames que avance.
        const unlock = () => {
          video
            .play()
            .then(() => video.pause())
            .catch(() => {});
        };
        if (!desktop) window.addEventListener('touchstart', unlock, { once: true, passive: true });

        return () => {
          gsap.ticker.remove(tick);
          running = false;
          video.removeEventListener('loadedmetadata', onMetadata);
          window.removeEventListener('touchstart', unlock);
          root.style.removeProperty('--progress');
        };
      });
    },
    { scope: rootRef, dependencies: [reducedMotion] },
  );

  if (!entry) return null;

  return (
    // El pin envuelve a la sección en su propio contenedor: este div exterior es
    // de React y no se mueve, así el resto de la página nunca pierde su referencia.
    <div ref={rootRef}>
      <section
        ref={pinRef}
        data-tone="navy"
        className="relative isolate h-[calc(100svh-4rem)] overflow-hidden bg-navy text-white lg:h-[calc(100svh-5rem)]"
      >
        <div data-video-frame className="absolute inset-0">
          {reducedMotion ? (
            <img src={entry.still} alt="" width={entry.width} height={entry.height} className="scroll-video" />
          ) : (
            <video
              ref={videoRef}
              src={src}
              poster={entry.poster}
              width={entry.width}
              height={entry.height}
              style={{ aspectRatio: `${entry.width} / ${entry.height}` }}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden="true"
              tabIndex={-1}
              className="scroll-video"
            />
          )}
          {/* Funden el video con el encabezado y con el hero, que son marinos. */}
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[12%] bg-linear-to-b from-navy to-transparent" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[18%] bg-linear-to-t from-navy to-transparent" />
        </div>
        {!reducedMotion && (
          // Avance del recorrido: el mismo valor que muestra el video, no el del scroll.
          <div aria-hidden="true" className="container-site absolute inset-x-0 bottom-0 pb-6 sm:pb-8">
            <p
              className="text-sm text-mist"
              style={{ opacity: 'clamp(0, calc(1 - var(--progress, 0) * 25), 1)' }}
            >
              Desplázate
            </p>
            <div className="mt-3 h-px bg-white/20">
              <div className="h-full origin-left bg-sky" style={{ transform: 'scaleX(var(--progress, 0))' }} />
            </div>
          </div>
        )}

        {/* Al final del DOM: oscurece también la barra de avance al salir. */}
        <div data-video-veil aria-hidden="true" className="absolute inset-0 bg-navy opacity-0" />
      </section>
    </div>
  );
}
