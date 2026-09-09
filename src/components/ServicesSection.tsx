import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/ciiiaData';
import { ArrowRight, Check, HardDrive, Cpu, Award, Zap, Layers, ChevronRight } from 'lucide-react';
import { NavigationPage } from '../types';

interface ServicesSectionProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onNavigate, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].id);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'ai-execution':
        return <Layers className="w-5 h-5 text-[#5CA9DB]" />;
      case 'ai-lab':
        return <HardDrive className="w-5 h-5 text-[#5CA9DB]" />;
      case 'training':
        return <Award className="w-5 h-5 text-emerald-400" />;
      case 'hiva':
        return <Zap className="w-5 h-5 text-[#8CC6EC]" />;
      default:
        return <Cpu className="w-5 h-5 text-[#5CA9DB]" />;
    }
  };

  const getTargetPage = (id: string): NavigationPage => {
    switch (id) {
      case 'ai-execution': return 'ai-execution';
      case 'ai-lab': return 'ai-lab';
      case 'training': return 'academy';
      default: return 'ai-execution';
    }
  };

  return (
    <section 
      id="soluciones"
      className="py-20 sm:py-28 bg-[#0A0A0B] border-b border-[#26282D] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141518] border border-[#26282D] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
            <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] uppercase font-semibold">
              SOLUCIONES & SERVICIOS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            INGENIERÍA APLICADA. <br />
            <span className="text-[#5CA9DB]">DE LA IDEA A LA OPERACIÓN.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans leading-relaxed">
            Evolucionamos la oferta técnica para cubrir desde la concepción algorítmica hasta la validación física en laboratorio y el despliegue con garantía operativa.
          </p>
        </div>

        {/* 5 Interactive Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES_DATA.map((service) => {
            const isHovered = activeTab === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveTab(service.id)}
                className={`p-7 rounded-xl bg-[#141518] border transition-all duration-300 flex flex-col justify-between text-left group relative ${
                  isHovered 
                    ? 'border-[#5CA9DB] shadow-[0_0_30px_-5px_rgba(92,169,219,0.25)] -translate-y-1 bg-[#141518]' 
                    : 'border-[#26282D] hover:border-[#42464E]'
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="p-2 rounded-lg bg-[#0A0A0B] border border-[#26282D] group-hover:border-[#5CA9DB]/40 transition-colors">
                      {getServiceIcon(service.id)}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A0A0B] border border-[#26282D] text-[#8CC6EC] font-semibold">
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-2 group-hover:text-[#5CA9DB] transition-colors">
                    {service.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-xs sm:text-sm text-[#A8ACB3] font-sans leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-[#26282D]">
                    {service.points.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#D6D8DC]">
                        <Check className="w-3.5 h-3.5 text-[#5CA9DB] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-[#26282D] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#6E737C]">
                    {service.startingPrice}
                  </span>

                  <button
                    onClick={() => onNavigate(getTargetPage(service.id))}
                    className="text-xs font-mono text-[#5CA9DB] hover:text-white font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Detalles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Custom In-Plant Consultation */}
          <div className="p-7 rounded-xl bg-gradient-to-br from-[#0F2E42]/50 via-[#141518] to-[#0A0A0B] border border-[#29729F]/40 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono text-[#5CA9DB] font-bold uppercase tracking-wider">
                  SOLUCIÓN A LA MEDIDA
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-2">
                ¿TIENES UN RETO OPERATIVO NO CONVENCIONAL?
              </h3>

              <p className="text-xs sm:text-sm text-[#D6D8DC] font-sans leading-relaxed mb-6">
                Diseñamos consorcios específicos para retos de alta complejidad con apoyo del Parque de Investigación e Innovación Tecnológica (PIIT).
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="h-11 px-5 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>SOLICITAR DIAGNÓSTICO TÉCNICO</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
