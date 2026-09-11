import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export const Tooltip = ({
  content,
  children,
  containerClassName,
}: {
  content: string | React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [height, setHeight] = useState(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isVisible, content]);

  const calculatePosition = (mouseX: number, mouseY: number) => {
    if (!contentRef.current || !containerRef.current) return { x: mouseX + 12, y: mouseY + 12 };
    const tooltip = contentRef.current;
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const tooltipWidth = 240;
    const tooltipHeight = tooltip.scrollHeight;
    const absoluteX = containerRect.left + mouseX;
    const absoluteY = containerRect.top + mouseY;
    let finalX = mouseX + 12;
    let finalY = mouseY + 12;
    if (absoluteX + 12 + tooltipWidth > viewportWidth) finalX = mouseX - tooltipWidth - 12;
    if (absoluteX + finalX < 0) finalX = -containerRect.left + 12;
    if (absoluteY + 12 + tooltipHeight > viewportHeight) finalY = mouseY - tooltipHeight - 12;
    if (absoluteY + finalY < 0) finalY = -containerRect.top + 12;
    return { x: finalX, y: finalY };
  };

  const updateMousePosition = (mouseX: number, mouseY: number) => {
    setMouse({ x: mouseX, y: mouseY });
    setPosition(calculatePosition(mouseX, mouseY));
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsVisible(true);
    const rect = e.currentTarget.getBoundingClientRect();
    updateMousePosition(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
    setIsVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isVisible) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateMousePosition(e.clientX - rect.left, e.clientY - rect.top);
  };

  useEffect(() => {
    if (isVisible && contentRef.current) {
      setPosition(calculatePosition(mouse.x, mouse.y));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, height, mouse.x, mouse.y]);

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-block', containerClassName)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={String(isVisible)}
            initial={{ height: 0, opacity: 1 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="pointer-events-none absolute z-50 min-w-60 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-raised)] shadow-xl"
            style={{ top: position.y, left: position.x }}
          >
            <div ref={contentRef} className="p-3 text-sm text-[var(--text-secondary)]">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
