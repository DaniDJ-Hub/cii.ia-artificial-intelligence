import React from 'react';
import { INDUSTRIAL_SECTORS } from '../data/ciiiaData';
import { Factory, Cog, Truck, Zap, Activity, Flame, Shield, ArrowRight } from 'lucide-react';
import AccordionGallery from '../../components/ui/AccordionGallery';

const SECTOR_GALLERY_IMAGES: Record<string, string> = {
  manufactura: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop',
  retail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop',
  'seguridad-industrial': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop',
  multisectorial: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=900&auto=format&fit=crop',
  financiero: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop',
  publico: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=900&auto=format&fit=crop',
};

interface IndustriesSectionProps {
  onSelectSector: (sectorName: string) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectSector }) => {
  return (
    <section 
      id="industrias"
      className="py-24 sm:py-32 bg-[#0A0A0B] relative"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded glass-panel mb-4">
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

        {/* Interactive sector gallery: hover to expand */}
        <div className="mb-10 hidden md:block">
          <AccordionGallery
            items={INDUSTRIAL_SECTORS.map((sec) => ({
              image: SECTOR_GALLERY_IMAGES[sec.id],
              label: sec.name,
            }))}
            defaultIndex={0}
            height={360}
            trigger="hover"
          />
        </div>

        {/* 8 Sectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIAL_SECTORS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => onSelectSector(sec.name)}
              className="p-6 rounded-xl glass-card transition-all text-left flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded glass-chip">
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

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#6E737C]">
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
