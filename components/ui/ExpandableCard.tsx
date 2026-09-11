import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';

export interface ExpandableCardItem {
  title: string;
  description: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: React.ReactNode;
}

export function ExpandableCardList({ cards }: { cards: ExpandableCardItem[] }) {
  const [active, setActive] = useState<ExpandableCardItem | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActive(null);
    }
    document.body.style.overflow = active ? 'hidden' : '';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 h-full w-full bg-black/60"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 z-[100] grid place-items-center p-4">
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-raised)] text-white"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
            >
              ×
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="flex h-full max-h-[90%] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] md:h-fit"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img src={active.src} alt={active.title} className="h-72 w-full object-cover object-top" />
              </motion.div>
              <div>
                <div className="flex items-start justify-between p-5">
                  <div>
                    <motion.h3 layoutId={`title-${active.title}-${id}`} className="font-display font-bold text-[var(--text-primary)]">
                      {active.title}
                    </motion.h3>
                    <motion.p layoutId={`description-${active.description}-${id}`} className="text-sm text-[var(--text-muted)]">
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    className="shrink-0 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[#04121c]"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="relative px-5 pb-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex max-h-52 flex-col gap-3 overflow-auto text-sm text-[var(--text-secondary)]"
                  >
                    {active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="mx-auto flex w-full flex-col gap-3">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="flex cursor-pointer flex-col items-center justify-between gap-4 rounded-xl border border-[var(--border)] p-4 transition hover:border-[var(--accent)] md:flex-row"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img src={card.src} alt={card.title} className="h-32 w-32 rounded-lg object-cover object-top md:h-14 md:w-14" />
              </motion.div>
              <div>
                <motion.h3 layoutId={`title-${card.title}-${id}`} className="text-center font-semibold text-[var(--text-primary)] md:text-left">
                  {card.title}
                </motion.h3>
                <motion.p layoutId={`description-${card.description}-${id}`} className="text-center text-sm text-[var(--text-muted)] md:text-left">
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="rounded-full bg-[var(--surface-raised)] px-4 py-2 text-sm font-bold text-[var(--text-primary)] transition hover:bg-[var(--accent)] hover:text-[#04121c]"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}
