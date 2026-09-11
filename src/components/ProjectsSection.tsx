import React, { useState } from 'react';
import { PROJECT_CASES } from '../data/ciiiaData';
import { ProjectCase } from '../types';
import { Filter, Eye, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import TiltedCard from '../../components/ui/TiltedCard';
import GradualBlur from '../../components/ui/GradualBlur';

const SECTOR_IMAGES: Record<string, string> = {
  Manufactura: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop',
  'Comercio y Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop',
  Multisectorial: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=900&auto=format&fit=crop',
  'Servicios Financieros': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop',
  'Seguridad Pública': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=900&auto=format&fit=crop',
  'Seguridad Industrial': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop',
};
const DEFAULT_CASE_IMAGE = 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=900&auto=format&fit=crop';

interface ProjectsSectionProps {
  onSelectCase: (caseItem: ProjectCase) => void;
  selectedSectorFilter?: string | null;
  onClearSectorFilter?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  onSelectCase,
  selectedSectorFilter,
  onClearSectorFilter 
}) => {
  const [techFilter, setTechFilter] = useState<string>('all');
  const [internalSectorFilter, setInternalSectorFilter] = useState<string>('all');

  const activeSector = selectedSectorFilter || (internalSectorFilter !== 'all' ? internalSectorFilter : null);

  const filteredCases = PROJECT_CASES.filter((item) => {
    const matchTech = techFilter === 'all' || item.technology === techFilter;
    const matchSector = !activeSector || activeSector === 'all' || item.sector.toLowerCase().includes(activeSector.toLowerCase());
    return matchTech && matchSector;
  });

  return (
    <section 
      id="casos"
      className="py-20 sm:py-28 bg-[#0A0A0B] relative"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
            <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] uppercase font-semibold">
              CASOS DE ESTUDIO REALES
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            EVIDENCIA EN OPERACIÓN. <br />
            <span className="text-[#5CA9DB]">SOLUCIONES INDUSTRIALES DESPLEGADAS.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans leading-relaxed">
            Explora proyectos implementados en manufactura pesada, logística y procesos continuos en México. Haz clic en cualquier tarjeta para ver el reto, la arquitectura y el resultado.
          </p>
        </div>

        {/* Featured cases: interactive tilt spotlight strip */}
        <div className="relative mb-12">
          <div className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {PROJECT_CASES.slice(0, 6).map((c) => (
              <div key={c.id} onClick={() => onSelectCase(c)} className="shrink-0 w-56 cursor-pointer">
                <TiltedCard
                  imageSrc={SECTOR_IMAGES[c.sector] || DEFAULT_CASE_IMAGE}
                  altText={c.title}
                  captionText={`${c.metricHighlight} · ${c.metricLabel}`}
                  containerHeight="200px"
                  containerWidth="100%"
                  imageHeight="200px"
                  imageWidth="100%"
                  rotateAmplitude={10}
                  scaleOnHover={1.05}
                  displayOverlayContent
                  overlayContent={
                    <div className="w-full px-3 pb-2 pt-16 bg-gradient-to-t from-black/85 to-transparent rounded-b-2xl">
                      <div className="text-[10px] font-mono text-[#8CC6EC] uppercase">{c.sector}</div>
                      <div className="font-display text-sm font-bold text-white leading-tight">{c.title}</div>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
          <GradualBlur position="right" width="4rem" height="100%" target="parent" strength={2.5} />
          <GradualBlur position="left" width="4rem" height="100%" target="parent" strength={2.5} />
        </div>

        {/* Filters Bar: Tech & Active Sector */}
        <div className="mb-10 p-3 sm:p-4 rounded-xl glass-panel flex flex-wrap items-center justify-between gap-4 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-[#A8ACB3] uppercase mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#5CA9DB]" />
              Tecnología:
            </span>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'Visión Computacional', label: 'Visión Computacional' },
              { id: 'Ciencia de Datos', label: 'ML & Datos' },
              { id: 'IA Generativa', label: 'IA Gen & RAG' },
              { id: 'Robótica y Drones', label: 'Robótica' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTechFilter(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  techFilter === t.id
                    ? 'glass-chip text-[#5CA9DB] font-bold !border-[#3D8FC4]/50 glow-accent-sm'
                    : 'text-[#A8ACB3] hover:text-white bg-transparent'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {activeSector && activeSector !== 'all' && (
            <div className="flex items-center gap-2 bg-[#0A0A0B] px-3 py-1.5 rounded-lg border border-white/[0.08]">
              <span className="text-[11px] font-mono text-white">Sector: {activeSector}</span>
              <button
                onClick={() => {
                  if (onClearSectorFilter) onClearSectorFilter();
                  setInternalSectorFilter('all');
                }}
                className="text-[10px] font-mono text-[#F87171] hover:underline"
              >
                [Limpiar]
              </button>
            </div>
          )}
        </div>

        {/* 12 Cases Grid with Aldrich Metric First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelectCase(c)}
              className="p-6 rounded-xl glass-card transition-all duration-200 cursor-pointer flex flex-col justify-between text-left group"
            >
              <div>
                {/* Tech tag and deployment time */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-[#8CC6EC] px-2.5 py-0.5 rounded-full glass-chip">
                    {c.technology}
                  </span>
                  <span className="text-[10px] font-mono text-[#6E737C]">
                    {c.deploymentTime}
                  </span>
                </div>

                {/* Metric in Aldrich (Highest Visual Weight) */}
                <div className="mb-4">
                  <div className="font-data-numeric text-4xl sm:text-5xl font-bold text-white group-hover:text-[#5CA9DB] transition-colors leading-none mb-1.5">
                    {c.metricHighlight}
                  </div>
                  <div className="text-[11px] font-mono tracking-wider text-[#A8ACB3] uppercase font-semibold">
                    {c.metricLabel}
                  </div>
                </div>

                {/* Case Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-white uppercase tracking-tight mb-2 group-hover:text-white">
                  {c.title}
                </h3>

                {/* Challenge snippet */}
                <p className="text-xs text-[#A8ACB3] font-sans line-clamp-2 leading-relaxed mb-4">
                  {c.challenge}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {c.tags.map((tg, idx) => (
                    <span key={idx} className="text-[9px] font-mono text-[#6E737C] px-2 py-0.5 rounded glass-chip">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Sector & Action */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-[#6E737C] truncate max-w-[170px]">{c.sector}</span>
                <span className="text-[#5CA9DB] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver caso <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
