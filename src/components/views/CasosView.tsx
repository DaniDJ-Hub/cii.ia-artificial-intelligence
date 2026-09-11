import React, { Suspense, lazy } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProjectsSection } from '../ProjectsSection';
import { ProjectCase } from '../../types';
import { PROJECT_CASES } from '../../data/ciiiaData';
import { FocusCards } from '../../../components/ui/FocusCards';

const DriftWall = lazy(() => import('../../../components/ui/DriftWall'));

const SECTOR_IMAGES: Record<string, string> = {
  Manufactura: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
  'Comercio y Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop',
  Multisectorial: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=600&auto=format&fit=crop',
  'Servicios Financieros': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop',
  'Seguridad Pública': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=600&auto=format&fit=crop',
  'Seguridad Industrial': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop',
};

interface CasosViewProps {
  onBackToHome: () => void;
  onSelectCase: (caseItem: ProjectCase) => void;
  selectedSectorFilter?: string | null;
  onClearSectorFilter?: () => void;
}

export const CasosView: React.FC<CasosViewProps> = ({
  onBackToHome,
  onSelectCase,
  selectedSectorFilter,
  onClearSectorFilter
}) => {
  return (
    <div className="pt-24 pb-20 bg-[#0A0A0B] text-left relative overflow-hidden">
      {/* Ambient drifting wall of every deployed case, columns scroll independently */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-25">
        <Suspense fallback={null}>
          <DriftWall
            items={PROJECT_CASES.map((c) => ({ image: SECTOR_IMAGES[c.sector], title: c.title }))}
            columns={6}
            tileWidth={160}
            tileHeight={104}
            speed={26}
          />
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8ACB3] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>REGRESAR AL HOMEPAGE</span>
        </button>

        {/* Focus-blur spotlight of the twelve deployed cases */}
        <div className="mb-16 mt-8">
          <h2 className="font-mono text-xs font-bold tracking-widest text-[#5CA9DB] uppercase mb-6">
            LOS 12 CASOS EN UNA MIRADA
          </h2>
          <FocusCards
            cards={PROJECT_CASES.map((c) => ({
              title: c.title,
              subtitle: `${c.sector} · ${c.metricHighlight} ${c.metricLabel}`,
              src: SECTOR_IMAGES[c.sector] || SECTOR_IMAGES.Manufactura,
            })).slice(0, 6)}
          />
        </div>

        <ProjectsSection
          onSelectCase={onSelectCase}
          selectedSectorFilter={selectedSectorFilter}
          onClearSectorFilter={onClearSectorFilter}
        />
      </div>
    </div>
  );
};
