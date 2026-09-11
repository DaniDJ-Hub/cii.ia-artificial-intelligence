import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { cn } from '@/lib/utils';

export interface CobeGlobeMarker {
  location: [number, number];
  size: number;
}

export interface CobeGlobeProps {
  className?: string;
  markers?: CobeGlobeMarker[];
  size?: number;
}

export const CobeGlobe = ({ className, markers, size = 560 }: CobeGlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    let phi = 0;
    let raf = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 3500,
      mapBrightness: 5,
      baseColor: [0.1, 0.15, 0.2],
      markerColor: [92 / 255, 169 / 255, 219 / 255],
      glowColor: [0.36, 0.66, 0.86],
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
    };
  }, [markers, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', maxWidth: size, height: 'auto', aspectRatio: '1 / 1' }}
      className={cn(className)}
    />
  );
};

export default CobeGlobe;
