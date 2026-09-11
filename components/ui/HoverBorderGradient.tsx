import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('TOP');

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: 'radial-gradient(20.7% 50% at 50% 0%, var(--accent) 0%, rgba(92,169,219,0) 100%)',
    LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, var(--accent) 0%, rgba(92,169,219,0) 100%)',
    BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, var(--accent) 0%, rgba(92,169,219,0) 100%)',
    RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, var(--accent) 0%, rgba(92,169,219,0) 100%)',
  };

  const highlight = 'radial-gradient(75% 181% at 50% 50%, #8fc7ea 0%, rgba(92,169,219,0) 100%)';

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  // `Tag` is a dynamic element type; cast to a permissive signature so the
  // JSX factory doesn't collapse its props to `never`.
  const Component = Tag as React.ComponentType<Record<string, unknown>>;

  return (
    <Component
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-nowrap items-center justify-center gap-2 overflow-visible rounded-full border border-[var(--border)] bg-[var(--surface)]/60 p-px decoration-clone transition duration-500 hover:bg-[var(--surface-raised)]',
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          'z-10 w-auto rounded-[inherit] bg-[var(--canvas)] px-5 py-2.5 text-sm font-semibold text-[var(--text-primary)]',
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)', position: 'absolute', width: '100%', height: '100%' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration }}
      />
      <div className="absolute inset-[2px] z-[1] flex-none rounded-[100px] bg-[var(--canvas)]" />
    </Component>
  );
}
