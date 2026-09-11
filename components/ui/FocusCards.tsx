import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export type FocusCard = {
  title: string;
  subtitle?: string;
  src: string;
};

const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: FocusCard;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'relative h-60 w-full overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 ease-out md:h-96',
        hovered !== null && hovered !== index && 'scale-[0.98] blur-sm',
      )}
    >
      <img src={card.src} alt={card.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent px-4 py-6 transition-opacity duration-300',
          hovered === index ? 'opacity-100' : 'opacity-70',
        )}
      >
        <div className="font-display text-lg font-semibold text-white md:text-xl">{card.title}</div>
        {card.subtitle && <div className="mt-1 text-sm text-[var(--text-muted)]">{card.subtitle}</div>}
      </div>
      <div
        className="pointer-events-none absolute inset-0 border-2 border-[var(--accent)] opacity-0 transition-opacity duration-300"
        style={{ opacity: hovered === index ? 0.5 : 0 }}
      />
    </div>
  ),
);
Card.displayName = 'FocusCard';

export function FocusCards({ cards }: { cards: FocusCard[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
      {cards.map((card, index) => (
        <Card key={card.title} card={card} index={index} hovered={hovered} setHovered={setHovered} />
      ))}
    </div>
  );
}
