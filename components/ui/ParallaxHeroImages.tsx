import React, { useEffect, useMemo, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { cn } from '@/lib/utils';

type Position = 'top-left' | 'top-right' | 'mid-left' | 'mid-right' | 'bottom-left' | 'bottom-right' | 'far-left' | 'far-right';

type ImagePosition = { src: string; position: Position; depth: number; delay: number };

const positionStyles: Record<Position, { top: string; left?: string; right?: string }> = {
  'top-left': { top: '8%', left: '4%' },
  'top-right': { top: '8%', right: '4%' },
  'mid-left': { top: '38%', left: '6%' },
  'mid-right': { top: '38%', right: '6%' },
  'bottom-left': { top: '68%', left: '4%' },
  'bottom-right': { top: '68%', right: '4%' },
  'far-left': { top: '52%', left: '2%' },
  'far-right': { top: '52%', right: '2%' },
};

const positionOrder: Position[] = [
  'top-left',
  'top-right',
  'mid-left',
  'mid-right',
  'bottom-left',
  'bottom-right',
  'far-left',
  'far-right',
];

const depthValues = [0.3, 0.35, 0.9, 0.85, 0.4, 0.45, 0.25, 0.2];
const SPRING_CONFIG = { damping: 25, stiffness: 120 };

export interface ParallaxHeroImagesProps {
  images: string[];
  className?: string;
  imageClassName?: string;
}

export const ParallaxHeroImages = ({ images, className, imageClassName }: ParallaxHeroImagesProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(mouseY, SPRING_CONFIG);

  const positions = useMemo(() => {
    const limitedImages = images.slice(0, 8);
    return limitedImages.map((src, index) => ({
      src,
      position: positionOrder[index],
      depth: depthValues[index],
      delay: index * 0.12,
    }));
  }, [images]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {positions.map((pos, index) => (
        <ParallaxImage
          key={`${pos.src}-${index}`}
          {...pos}
          imageClassName={imageClassName}
          smoothMouseX={smoothMouseX}
          smoothMouseY={smoothMouseY}
        />
      ))}
    </div>
  );
};

interface ParallaxImageProps extends ImagePosition {
  imageClassName?: string;
  smoothMouseX: MotionValue<number>;
  smoothMouseY: MotionValue<number>;
}

const ParallaxImage = memo(function ParallaxImage({
  src,
  position,
  depth,
  delay,
  imageClassName,
  smoothMouseX,
  smoothMouseY,
}: ParallaxImageProps) {
  const maxOffset = 40;
  const translateX = useTransform(smoothMouseX, [-1, 1], [-maxOffset * depth, maxOffset * depth]);
  const translateY = useTransform(smoothMouseY, [-1, 1], [-maxOffset * depth, maxOffset * depth]);
  const posStyle = positionStyles[position];

  return (
    <motion.div
      className="absolute"
      style={{ top: posStyle.top, left: posStyle.left, right: posStyle.right, x: translateX, y: translateY, zIndex: Math.round(depth * 10) }}
      initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.9 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={cn(
          'aspect-4/3 h-16 w-24 rounded-lg object-cover opacity-70 shadow-lg ring-1 ring-white/10 sm:h-32 sm:w-48 md:h-40 md:w-64',
          imageClassName,
        )}
      />
    </motion.div>
  );
});
