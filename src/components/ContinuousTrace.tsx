import React from 'react';

interface ContinuousTraceProps {
  currentSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const ContinuousTrace: React.FC<ContinuousTraceProps> = ({ 
  currentSection, 
  onNavigateSection 
}) => {
  const sections = [
    { id: 'hero', name: 'Inicio' },
    { id: 'reto', name: 'El Reto' },
    { id: 'ciia', name: 'CII.IA' },
    { id: 'capacidades', name: 'Capacidades' },
    { id: 'soluciones', name: 'Soluciones' },
    { id: 'impacto', name: 'Impacto' },
    { id: 'casos', name: 'Casos Reales' },
    { id: 'ecosistema', name: 'Ecosistema' },
    { id: 'cta', name: 'Contacto' },
  ];

  return (
    <aside 
      className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end pointer-events-auto select-none"
      aria-label="Indicador de navegación de página"
    >
      <div className="flex flex-col gap-3.5 items-end">
        {sections.map((sec) => {
          const isActive = currentSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onNavigateSection(sec.id)}
              className="group relative flex items-center gap-2.5 py-1 focus:outline-none"
              title={sec.name}
            >
              {/* Floating label on hover or active */}
              <span 
                className={`text-[11px] font-mono tracking-wider uppercase transition-all duration-200 ${
                  isActive 
                    ? 'opacity-100 text-[#5CA9DB] font-semibold translate-x-0' 
                    : 'opacity-0 group-hover:opacity-100 text-[#A8ACB3] translate-x-2 group-hover:translate-x-0'
                }`}
              >
                {sec.name}
              </span>

              {/* Dot indicator */}
              <div 
                className={`transition-all duration-200 rounded-full ${
                  isActive 
                    ? 'w-2.5 h-6 bg-[#5CA9DB] shadow-[0_0_12px_rgba(92,169,219,0.6)]' 
                    : 'w-2 h-2 bg-[#26282D] group-hover:bg-[#8CC6EC]'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};
