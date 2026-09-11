import React, { useState, useRef } from 'react';
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

export interface AnimatedTooltipItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

export const AnimatedTooltip = ({ items }: { items: AnimatedTooltipItem[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      const target = event.target as HTMLImageElement;
      const halfWidth = target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="group relative -mr-3"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 260, damping: 10 } }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ translateX, rotate, whiteSpace: 'nowrap' }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-8 -bottom-px z-30 h-px w-[60%] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />
                <div className="relative z-30 text-sm font-semibold text-[var(--text-primary)]">{item.name}</div>
                <div className="text-xs text-[var(--text-muted)]">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative h-12 w-12 rounded-full border-2 border-[var(--border)] object-cover object-top transition duration-300 group-hover:z-30 group-hover:scale-110 group-hover:border-[var(--accent)]"
          />
        </div>
      ))}
    </>
  );
};
