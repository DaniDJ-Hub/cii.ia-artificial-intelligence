import { motion } from 'motion/react';

export const LoaderOne = () => {
  const transition = (x: number) => ({
    duration: 1,
    repeat: Infinity,
    repeatType: 'loop' as const,
    delay: x * 0.2,
    ease: 'easeInOut' as const,
  });
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={transition(i)}
          className="h-3 w-3 rounded-full bg-[var(--accent)]"
        />
      ))}
    </div>
  );
};

export const LoaderFive = ({ text }: { text: string }) => (
  <div
    className="font-display font-bold"
    style={{ ['--shadow-color' as string]: 'var(--accent)' }}
  >
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{
          scale: [1, 1.1, 1],
          textShadow: ['0 0 0 var(--shadow-color)', '0 0 6px var(--shadow-color)', '0 0 0 var(--shadow-color)'],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: 'loop',
          delay: i * 0.05,
          ease: 'easeInOut',
          repeatDelay: 2,
        }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
    ))}
  </div>
);
