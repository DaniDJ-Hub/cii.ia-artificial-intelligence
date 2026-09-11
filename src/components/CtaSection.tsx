import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BRAND_PAIRS } from '../data/ciiiaData';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { HoverBorderGradient } from '../../components/ui/HoverBorderGradient';
import { usePrefersReducedMotion } from '../../hooks/use-reduced-motion';

const LaserFlow = lazy(() => import('../../components/effects/LaserFlow'));

interface CtaSectionProps {
  onOpenContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  const [activePairIndex, setActivePairIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePairIndex((prev) => (prev + 1) % BRAND_PAIRS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const activePair = BRAND_PAIRS[activePairIndex];

  return (
    <section 
      id="cta"
      className="py-24 sm:py-32 bg-[#0A0A0B] relative overflow-hidden text-center"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5CA9DB]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Dramatic ambient laser beam, the visual "next step" the copy talks about */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <Suspense fallback={null}>
            <LaserFlow color="#5CA9DB" backgroundColor="#0A0A0B" wispDensity={0.8} fogIntensity={0.25} />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Rotating Identity Principle */}
        <div className="h-20 sm:h-24 flex flex-col items-center justify-center mb-6 select-none">
          <div className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white transition-all duration-300">
            <span className="text-[#5CA9DB]">{activePair.verb1}</span>,{' '}
            <span className="text-[#D6D8DC] font-light">{activePair.verb2}</span>.
          </div>
        </div>

        {/* Primary Headline */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-6">
          CONSTRUYAMOS EL SIGUIENTE PASO.
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#A8ACB3] font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
          Cuéntanos el reto de tu empresa. Evaluamos la factibilidad técnica sin costo y te presentamos una ruta de implementación con retorno de inversión estimado.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <HoverBorderGradient
            as="button"
            id="cta-final-button"
            onClick={onOpenContact}
            containerClassName="rounded"
            className="!px-8 !py-0 h-13 sm:h-14 text-sm font-mono font-bold tracking-wider uppercase flex items-center gap-3"
          >
            <span>AGENDA UNA SESIÓN EJECUTIVA</span>
            <ArrowRight className="w-4 h-4" />
          </HoverBorderGradient>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#A8ACB3]">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5CA9DB]" />
            <span>Respuesta en menos de 24 horas</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#5CA9DB]" />
            <span>Directores técnicos e ingenieros</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#5CA9DB]" />
            <span>Acuerdo de Confidencialidad (NDA)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
