import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Condiciones para gsap.matchMedia. Toda animación de scroll se registra
 * dentro de ellas: con prefers-reduced-motion: reduce no se crea ninguna.
 */
export const MOTION = {
  desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
} as const;

export type MotionConditions = Record<keyof typeof MOTION, boolean>;

/** Alto del encabezado sticky: los pins y los inicios se calculan debajo de él. */
export const headerOffset = () => document.querySelector<HTMLElement>('header')?.offsetHeight ?? 0;

export { gsap, ScrollTrigger, SplitText, useGSAP };
