import { useMemo, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useTransform, animate, type MotionValue } from 'motion/react';

type OrbitShape = 'ellipse' | 'circle';

interface OrbitImagesProps {
  images?: string[];
  altPrefix?: string;
  shape?: OrbitShape;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
}

interface OrbitItemProps {
  item: ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  fill: boolean;
}

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function generateCirclePath(cx: number, cy: number, r: number): string {
  return generateEllipsePath(cx, cy, r, r);
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }: OrbitItemProps) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetDistance = useTransform(progress, (p: number) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  return (
    <motion.div
      className="absolute select-none will-change-transform"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div style={{ transform: `rotate(${-rotation}deg)` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = 'Ecosystem partner',
  shape = 'ellipse',
  baseWidth = 1400,
  radiusX = 620,
  radiusY = 160,
  radius = 300,
  rotation = -6,
  duration = 42,
  itemSize = 72,
  direction = 'normal',
  fill = true,
  className = '',
  showPath = false,
  pathColor = 'rgba(92,169,219,0.18)',
  pathWidth = 1.5,
  paused = false,
  centerContent,
  responsive = true,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    if (shape === 'circle') return generateCirclePath(designCenterX, designCenterY, radius);
    return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
  }, [shape, designCenterX, designCenterY, radiusX, radiusY, radius]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, direction, paused]);

  const items = images.map((src, index) => (
    <img key={src} src={src} alt={`${altPrefix} ${index + 1}`} draggable={false} className="h-full w-full object-contain" />
  ));

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${className}`}
      style={{ width: '100%', aspectRatio: '1 / 1' }}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: baseWidth,
          height: baseWidth,
          transform: scale !== null ? `translate(-50%, -50%) scale(${scale})` : undefined,
          visibility: scale === null ? 'hidden' : undefined,
          transformOrigin: 'center center',
        }}
      >
        <div className="relative h-full w-full" style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center center' }}>
          {showPath && (
            <svg width="100%" height="100%" viewBox={`0 0 ${baseWidth} ${baseWidth}`} className="pointer-events-none absolute inset-0">
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}
          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>
      {centerContent && <div className="absolute inset-0 z-10 flex items-center justify-center">{centerContent}</div>}
    </div>
  );
}
