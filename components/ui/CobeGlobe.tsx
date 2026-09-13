import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';

export interface CobeGlobeMarker {
  location: [number, number];
  size: number;
}

type Rgb = [number, number, number];

export interface CobeGlobeProps {
  className?: string;
  markers?: CobeGlobeMarker[];
  size?: number;
  /** 1 = globo oscuro (valor original del kit), 0 = versión para fondos claros. */
  dark?: number;
  baseColor?: Rgb;
  markerColor?: Rgb;
  glowColor?: Rgb;
  mapSamples?: number;
  mapBrightness?: number;
  diffuse?: number;
}

const DEFAULT_BASE: Rgb = [0.1, 0.15, 0.2];
const DEFAULT_MARKER: Rgb = [92 / 255, 169 / 255, 219 / 255];
const DEFAULT_GLOW: Rgb = [0.36, 0.66, 0.86];

export const CobeGlobe = ({
  className,
  markers,
  size = 560,
  dark = 1,
  baseColor = DEFAULT_BASE,
  markerColor = DEFAULT_MARKER,
  glowColor = DEFAULT_GLOW,
  mapSamples = 3500,
  mapBrightness = 5,
  diffuse = 1.2,
}: CobeGlobeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // cobe 2 envuelve el canvas en un div propio (insertBefore + append) y añade
    // nodos al DOM. Si el canvas lo renderiza React, al desmontar solo el globo
    // React intenta retirarlo de un padre donde ya no está y la app entera se cae
    // («removeChild: the node to be removed is not a child»). Por eso el canvas se
    // crea aquí, dentro de un contenedor que React nunca reconcilia.
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    container.appendChild(canvas);

    let phi = 0;
    let raf = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor,
      markerColor,
      glowColor,
      markers: markers ?? [
        { location: [25.6866, -100.3161], size: 0.1 }, // Monterrey
        { location: [19.4326, -99.1332], size: 0.05 }, // CDMX
        { location: [40.7128, -74.006], size: 0.05 }, // NYC
        { location: [51.5072, -0.1276], size: 0.05 }, // London
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
      ],
    });

    const animate = () => {
      phi += 0.0045;
      globe.update({ phi });
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      // Retira lo que cobe haya dejado (canvas, envoltorio, marcadores).
      container.replaceChildren();
    };
    // Los colores se leen al crear el globo; pasar constantes para no recrearlo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, size, dark, mapSamples]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', maxWidth: size, aspectRatio: '1 / 1' }}
      className={cn(className)}
    />
  );
};

export default CobeGlobe;
