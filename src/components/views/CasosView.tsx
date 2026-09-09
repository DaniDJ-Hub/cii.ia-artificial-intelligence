import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProjectsSection } from '../ProjectsSection';
import { ProjectCase } from '../../types';

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
    <div className="pt-24 pb-20 bg-[#0A0A0B] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8ACB3] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>REGRESAR AL HOMEPAGE</span>
        </button>

        <ProjectsSection 
          onSelectCase={onSelectCase}
          selectedSectorFilter={selectedSectorFilter}
          onClearSectorFilter={onClearSectorFilter}
        />
      </div>
    </div>
  );
};
