import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react';
import { EXECUTION_STAGES } from '../data/ciiiaData';
import { cn } from '../lib/cn';

type Tone = 'paper' | 'navy';

const TONES = {
  paper: {
    rail: 'bg-rule',
    fill: 'bg-steel',
    node: 'border-steel bg-paper',
    dot: 'bg-steel',
    number: 'text-graphite',
    focus: 'text-graphite',
  },
  navy: {
    rail: 'bg-white/20',
    fill: 'bg-sky',
    node: 'border-sky bg-navy',
    dot: 'bg-sky',
    number: 'text-mist',
    focus: 'text-mist',
  },
} as const;

/**
 * Las cinco etapas del ciclo como un recorrido. La línea avanza con el scroll
 * y cada etapa se marca al alcanzarla: es la idea «de la idea a la operación»
 * dicha con movimiento, no un adorno.
 */
export function CycleTrack({ tone = 'paper' }: { tone?: Tone }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });
  const lastIndex = EXECUTION_STAGES.length - 1;
  const styles = TONES[tone];

  return (
    <div ref={ref} className="relative">
      <span
        aria-hidden="true"
        className={cn(
          'absolute bottom-0 left-[7px] top-0 w-px md:bottom-auto md:left-0 md:right-0 md:top-[7px] md:h-px md:w-auto',
          styles.rail,
        )}
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: progress }}
        className={cn('absolute bottom-0 left-[6px] top-0 w-[3px] origin-top md:hidden', styles.fill)}
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className={cn('absolute left-0 right-0 top-[6px] hidden h-[3px] origin-left md:block', styles.fill)}
      />

      <ol className="relative grid gap-10 md:grid-cols-5 md:gap-8">
        {EXECUTION_STAGES.map((stage, index) => (
          <li key={stage.id} className="relative pl-9 md:pl-0 md:pt-11">
            <StageNode progress={progress} threshold={(index / lastIndex) * 0.92} styles={styles} />
            <span className={cn('font-mono text-sm', styles.number)}>{stage.number}</span>
            <h3 className="mt-1 font-display text-xl font-bold uppercase leading-tight [font-stretch:108%]">
              {stage.name}
            </h3>
            <p className={cn('mt-2 leading-snug', styles.focus)}>{stage.focus}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StageNode({
  progress,
  threshold,
  styles,
}: {
  progress: MotionValue<number>;
  threshold: number;
  styles: (typeof TONES)[Tone];
}) {
  const fill = useTransform(progress, (value) => (value >= threshold ? 1 : 0));

  return (
    <span
      aria-hidden="true"
      className={cn(
        'absolute left-0 top-[5px] grid size-[15px] place-items-center rounded-full border-2 md:top-0',
        styles.node,
      )}
    >
      <motion.span
        style={{ scale: fill }}
        className={cn('size-[7px] rounded-full transition-transform duration-300', styles.dot)}
      />
    </span>
  );
}
