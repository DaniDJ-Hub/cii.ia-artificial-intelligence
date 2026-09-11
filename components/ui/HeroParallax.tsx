import React from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'motion/react';

export interface HeroParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax = ({ products, heading, subheading }: { products: HeroParallaxProduct[]; heading?: string; subheading?: string }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 500]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -500]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [12, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-300, 100]), springConfig);

  return (
    <div ref={ref} className="relative flex h-[180vh] flex-col self-auto overflow-hidden py-24 antialiased [perspective:1000px] [transform-style:preserve-3d]">
      {(heading || subheading) && (
        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
          {heading && <h2 className="font-display text-2xl font-bold text-[var(--text-primary)] md:text-4xl">{heading}</h2>}
          {subheading && <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--text-muted)]">{subheading}</p>}
        </div>
      )}
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="mb-14 flex flex-row-reverse space-x-14 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="mb-14 flex flex-row space-x-14">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({ product, translate }: { product: HeroParallaxProduct; translate: MotionValue<number> }) => {
  return (
    <motion.div style={{ x: translate }} whileHover={{ y: -14 }} key={product.title} className="group/product relative h-56 w-[22rem] shrink-0">
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          className="absolute inset-0 h-full w-full rounded-xl border border-[var(--border)] object-cover object-left-top"
          alt={product.title}
          loading="lazy"
        />
      </a>
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded-xl bg-black opacity-0 transition-opacity group-hover/product:opacity-60" />
      <h2 className="absolute bottom-3 left-4 font-display text-sm text-white opacity-0 transition-opacity group-hover/product:opacity-100">{product.title}</h2>
    </motion.div>
  );
};
