import React from 'react';
import { CORE_METRICS } from '../data/ciiiaData';
import { TrendingUp, BarChart3, CheckCircle, ShieldCheck } from 'lucide-react';

export const MetricsSection: React.FC = () => {
  return (
    <section 
      id="impacto"
      className="py-20 sm:py-28 bg-[#141518] border-b border-[#26282D] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0B] border border-[#26282D] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
            <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] uppercase font-semibold">
              IMPACTO MEDIBLE EN PRODUCCIÓN
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            MÉTRICAS AUDITADAS. <br />
            <span className="text-[#5CA9DB]">RESULTADOS EN LÍNEA DE PLANTA.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans leading-relaxed">
            Medimos el retorno en reducción de paros no programados, precisión en tiempo de ciclo e incremento de productividad operativa.
          </p>
        </div>

        {/* 4 Major Metrics in Aldrich Font */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_METRICS.map((metric) => (
            <div 
              key={metric.id}
              className="p-8 rounded-xl bg-[#0A0A0B] border border-[#26282D] hover:border-[#5CA9DB] transition-all duration-200 flex flex-col justify-between text-left group hover:-translate-y-1 shadow-lg"
            >
              <div>
                {/* Aldrich high-impact number */}
                <div className="font-data-numeric text-5xl sm:text-6xl font-bold tracking-tight text-white group-hover:text-[#5CA9DB] transition-colors mb-3 flex items-baseline">
                  <span>{metric.value}</span>
                </div>

                {/* Descriptor in Source Code Pro */}
                <h3 className="font-mono text-xs sm:text-sm font-bold text-white uppercase tracking-wider mb-2">
                  {metric.label}
                </h3>

                {/* Subtext */}
                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
                  {metric.subtext}
                </p>
              </div>

              {/* Sector tag */}
              <div className="mt-8 pt-4 border-t border-[#26282D] flex items-center justify-between text-[10px] font-mono text-[#6E737C]">
                <span>SECTOR VALIDADO</span>
                <span className="text-[#8CC6EC] font-semibold">{metric.sector}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
