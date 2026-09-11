import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/ciiiaData';
import { ArrowRight, Check, HardDrive, Cpu, Award, Zap, Layers, ChevronRight } from 'lucide-react';
import { NavigationPage } from '../types';
import CardSwap, { Card } from '../../components/ui/CardSwap';
import OptionWheel from '../../components/ui/OptionWheel';

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
      className="py-20 sm:py-28 bg-[#0A0A0B] relative perspective-container"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header + rotating flagship differentiators */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          <div className="lg:col-span-7 max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-4">
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

            {/* Quick jump wheel across the 5 lines of service */}
            <div className="mt-8 hidden sm:block h-40 max-w-xs">
              <OptionWheel
                items={SERVICES_DATA.map((s) => s.title)}
                defaultSelected={0}
                fontSize={1.05}
                spacing={1.6}
                onChange={(index) => setActiveTab(SERVICES_DATA[index].id)}
              />
            </div>
          </div>

          {/* Flagship differentiators, stacked & auto-swapping */}
          <div className="lg:col-span-5 relative h-64 hidden lg:block">
            <CardSwap width={340} height={220} cardDistance={40} verticalDistance={44} delay={4500} pauseOnHover>
              <Card className="p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#5CA9DB] uppercase font-bold">Activo diferenciador</span>
                <h4 className="font-display text-lg font-bold text-white uppercase">AI Lab en el PIIT</h4>
                <p className="text-xs text-[#A8ACB3]">Celda robótica, drones y clúster GPU para validar antes de invertir.</p>
              </Card>
              <Card className="p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">NVIDIA DLI</span>
                <h4 className="font-display text-lg font-bold text-white uppercase">CII.IA Academy</h4>
                <p className="text-xs text-[#A8ACB3]">Certificación oficial para que la capacidad se quede en tu equipo.</p>
              </Card>
              <Card className="p-6 flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#8CC6EC] uppercase font-bold">HIVA</span>
                <h4 className="font-display text-lg font-bold text-white uppercase">Agentes que ejecutan</h4>
                <p className="text-xs text-[#A8ACB3]">Plataforma de asistentes virtuales que entienden, responden y actúan.</p>
              </Card>
            </CardSwap>
          </div>
        </div>

        {/* 5 Interactive Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES_DATA.map((service) => {
            const isHovered = activeTab === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveTab(service.id)}
                className={`p-7 rounded-xl glass-card transition-all duration-300 flex flex-col justify-between text-left group relative ${
                  isHovered ? '!border-[#5CA9DB]/50 -translate-y-1.5 !shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_0_0_1px_rgba(92,169,219,0.15),0_30px_60px_-22px_rgba(0,0,0,0.75),0_0_40px_-8px_rgba(92,169,219,0.35)]' : ''
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="p-2 rounded-lg glass-chip group-hover:border-[#5CA9DB]/40 transition-colors">
                      {getServiceIcon(service.id)}
                    </div>
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full glass-chip text-[#8CC6EC] font-semibold">
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
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/[0.08]">
                    {service.points.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#D6D8DC]">
                        <Check className="w-3.5 h-3.5 text-[#5CA9DB] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
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
          <div className="relative p-7 rounded-xl bg-gradient-to-br from-[#0F2E42]/50 via-[#141518]/70 to-[#0A0A0B]/70 backdrop-blur-xl border border-[#29729F]/40 glow-accent-sm tilt-hover flex flex-col justify-between text-left overflow-hidden">
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
              className="h-11 px-5 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all glow-accent-sm hover:scale-[1.02] flex items-center justify-center gap-2"
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
