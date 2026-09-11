import { cn } from '@/lib/utils';
import { useState } from 'react';
import { motion, type Variants } from 'motion/react';

const CARD_SPACING = 28;

export interface RevealCard {
  activeSrc: string;
  idleSrc: string;
  label: string;
}

export interface HeroCardsRevealProps {
  mainSrc: string;
  cards: RevealCard[];
  className?: string;
}

const spring = { type: 'spring' as const, visualDuration: 0.5, bounce: 0.2 };

export const HeroCardsReveal = ({ mainSrc, cards, className }: HeroCardsRevealProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isHovered = activeIndex !== null;

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, staggerDirection: -1 } },
  };

  const cardVariants: Variants = {
    hidden: (offset: number) => ({ x: offset }),
    visible: { x: 0, transition: spring },
  };

  return (
    <div className={cn('relative flex h-full w-full items-center justify-center', className)}>
      <motion.div className="relative flex h-full w-full max-w-md" variants={containerVariants} initial="hidden" animate="visible">
        <img src={mainSrc} alt="" className="absolute inset-y-0 left-0 h-full w-1/3 object-contain opacity-80" loading="lazy" />
        {cards.map((card, index) => {
          const shouldShift = activeIndex !== null && index > activeIndex;
          const isActive = activeIndex === index;
          const entranceOffset = -index * CARD_SPACING;
          const leftPct = 15 + index * 12;
          return (
            <motion.div
              key={card.activeSrc}
              className="group absolute bottom-0 z-20 h-full w-1/3 cursor-pointer"
              style={{ left: `${leftPct}%` }}
              variants={cardVariants}
              custom={entranceOffset}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => setActiveIndex((current) => (current === index ? null : index))}
            >
              <motion.div className="relative h-full w-full" animate={{ x: shouldShift ? 40 : 0 }} transition={spring}>
                <img
                  src={card.activeSrc}
                  alt={card.label}
                  className={cn('absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity group-hover:opacity-100', isActive && 'opacity-100')}
                />
                <img
                  src={card.idleSrc}
                  alt={card.label}
                  className={cn('absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity group-hover:opacity-0', isActive && 'opacity-0')}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default HeroCardsReveal;
