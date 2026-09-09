import React, { useState, useEffect } from 'react';
import { BRAND_PAIRS } from '../data/ciiiaData';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CtaSectionProps {
  onOpenContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  const [activePairIndex, setActivePairIndex] = useState(0);

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
      className="py-24 sm:py-32 bg-[#0A0A0B] border-b border-[#26282D] relative overflow-hidden text-center"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#5CA9DB]/5 rounded-full blur-3xl pointer-events-none -z-0" />

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
          <button
            id="cta-final-button"
            onClick={onOpenContact}
            className="h-13 sm:h-14 px-8 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-sm font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-3 shadow-[0_0_35px_-5px_rgba(92,169,219,0.6)] active:scale-95 w-full sm:w-auto"
          >
            <span>AGENDA UNA SESIÓN EJECUTIVA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-[#26282D] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-[#A8ACB3]">
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
