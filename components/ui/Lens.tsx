import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

export const Lens = ({ children, zoomFactor = 1.6, lensSize = 170, hovering, setHovering }: LensProps) => {
  const [localHovering, setLocalHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isHovering = hovering !== undefined ? hovering : localHovering;
  const updateHovering = setHovering ?? setLocalHovering;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - left, y: e.clientY - top });
  }

  return (
    <div
      ref={containerRef}
      className="relative z-0 overflow-hidden rounded-2xl"
      onMouseEnter={() => updateHovering(true)}
      onMouseLeave={() => updateHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
          style={{
            maskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
            transformOrigin: `${position.x}px ${position.y}px`,
            backgroundColor: 'var(--canvas)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            {children}
          </div>
          <div
            className="absolute rounded-full border-2 border-[var(--accent)]"
            style={{
              width: lensSize,
              height: lensSize,
              left: position.x - lensSize / 2,
              top: position.y - lensSize / 2,
              boxShadow: '0 0 24px rgba(92,169,219,0.4)',
            }}
          />
        </motion.div>
      )}
    </div>
  );
};
