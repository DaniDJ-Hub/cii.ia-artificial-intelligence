import React from 'react';
import { INDUSTRIAL_SECTORS } from '../data/ciiiaData';
import { Factory, Cog, Truck, Zap, Activity, Flame, Shield, ArrowRight } from 'lucide-react';

interface IndustriesSectionProps {
  onSelectSector: (sectorName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectSector }) => {
  return (
    <section 
      id="industrias"
      className="py-24 sm:py-32 bg-[#0A0A0B] border-b border-[#26282D] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141518] border border-[#26282D] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]"></span>
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#5CA9DB] uppercase font-semibold">
              08 · APLICABILIDAD INDUSTRIAL
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            EXPERIENCIA PROBADA EN 8 SECTORES CLAVE.
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans">
            La IA genérica fracasa porque desconoce los estándares de cada industria. En el CII.IA entendemos desde normas IATF 16949 y OEE automotriz hasta normativas COFEPRIS y tarifas horarias de energía.
          </p>
        </div>

        {/* 8 Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIAL_SECTORS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSector(sec.name)}
              className="p-6 rounded-xl bg-[#141518] border border-[#26282D] hover:border-[#5CA9DB] transition-all text-left flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded bg-[#0A0A0B] border border-[#26282D]">
                    {sec.casesCount} CASOS DESPLEGADOS
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#42464E] group-hover:text-[#5CA9DB] group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-2 group-hover:text-[#5CA9DB] transition-colors">
                  {sec.name}
                </h3>

                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
                  {sec.highlight}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#26282D] flex items-center justify-between text-[11px] font-mono text-[#6E737C]">
                <span>FILTRAR CASOS</span>
                <span className="text-white group-hover:text-[#5CA9DB]">VER PRUEBAS →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
