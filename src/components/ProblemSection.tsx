import React, { Suspense, lazy } from 'react';
import { Cpu, ShieldAlert } from 'lucide-react';
import { CLIENT_QUOTES } from '../data/ciiiaData';

const Strands = lazy(() => import('../../components/effects/Strands'));

/**
 * Las citas se leen de CLIENT_QUOTES. Solo existen dos con respaldo documental.
 * Las tres que estaban aquí escritas a mano eran inventadas: se eliminaron.
 * No volver a escribir citas en el componente. Si aparece material nuevo,
 * se agrega en ciiiaData.ts con su fuente.
 */
export const ProblemSection: React.FC = () => {
  const icons = [Cpu, ShieldAlert];
  const challenges = CLIENT_QUOTES.map((q, i) => ({
    icon: icons[i % icons.length],
    title: q.role.toUpperCase(),
    quote: `«${q.quote}»`,
    tag: 'Voz de cliente',
  }));

  return (
    <section
      id="reto"
      className="py-20 sm:py-28 bg-[#141518] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      {/* Ambient generative strands: the tangled threads of a problem being resolved */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]">
        <Suspense fallback={null}>
          <Strands colors={['#5CA9DB', '#29729F', '#8FC7EA']} count={4} speed={0.3} amplitude={0.6} opacity={0.7} />
        </Suspense>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-chip mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
            <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] uppercase font-semibold">
              EL RETO INDUSTRIAL
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            NADIE TIENE UN PROBLEMA <br />
            <span className="text-[#5CA9DB]">DE INTELIGENCIA ARTIFICIAL.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans leading-relaxed">
            Solo el 5% de las empresas en Nuevo León —principalmente trasnacionales— cuenta con equipos internos de ciencia de datos. El resto no necesita otra prueba de concepto: necesita que alguien recorra el tramo que va del piloto a la operación.
          </p>
        </div>

        {/* 3 Core Industrial Challenge Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {challenges.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-xl glass-card transition-all duration-200 flex flex-col justify-between text-left group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg glass-panel flex items-center justify-center group-hover:border-[#5CA9DB]/40 transition-colors">
                      <Icon className="w-5 h-5 text-[#5CA9DB]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded glass-panel">
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-3">
                    {c.title}
                  </h3>

                  <p className="font-quote-style text-sm sm:text-base text-[#D6D8DC] italic leading-relaxed border-l border-[#5CA9DB]/60 pl-3">
                    {c.quote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Takeaway */}
        <div className="p-6 sm:p-8 rounded-xl glass-chip flex flex-wrap items-center justify-between gap-6 text-left">
          <div className="max-w-2xl">
            <h4 className="font-display text-xl font-bold text-white uppercase">
              EL PROBLEMA NO ES LA IA. <span className="text-[#5CA9DB]">ES LA ÚLTIMA MILLA.</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#A8ACB3] font-sans mt-1 leading-relaxed">
              El CII.IA se especializa en el tramo final: prototipado en laboratorio propio, integración con los sistemas existentes, adopción acompañada en piso y gobernanza.
            </p>
          </div>
          <div className="text-xs font-mono text-[#5CA9DB] font-semibold flex items-center gap-1.5">
            <span>ISO/IEC 42001</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        </div>

      </div>
    </section>
  );
};
