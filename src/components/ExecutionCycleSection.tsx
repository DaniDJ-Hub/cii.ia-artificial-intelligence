import React, { useState } from 'react';
import { EXECUTION_STAGES } from '../data/ciiiaData';
import { ArrowRight, CheckCircle2, ChevronRight, Cpu, Layers, HardDrive, ShieldCheck } from 'lucide-react';
import Stepper, { Step } from '../../components/ui/Stepper';

interface ExecutionCycleSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ExecutionCycleSection: React.FC<ExecutionCycleSectionProps> = ({ onSelectService }) => {
  const [activeStageId, setActiveStageId] = useState<string>('desarrollar');

  const activeStage = EXECUTION_STAGES.find((s) => s.id === activeStageId) || EXECUTION_STAGES[2];

  return (
    <section 
      id="capacidades"
      className="py-20 sm:py-28 bg-[#141518] relative"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-chip mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
            <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] uppercase font-semibold">
              CAPACIDADES & METODOLOGÍA
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            DE LA HIPÓTESIS AL PISO DE PLANTA <br />
            <span className="text-[#5CA9DB]">EN CINCO ETAPAS AUDITADAS.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans leading-relaxed">
            Un marco metódico para convertir incertidumbre técnica en retorno sobre inversión. Selecciona cada etapa para explorar entregables y criterios de validación.
          </p>
        </div>

        {/* 5 Stages Interactive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {EXECUTION_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                  isActive
                    ? 'glass-chip !border-[#5CA9DB] glow-accent-sm -translate-y-0.5'
                    : 'bg-[#0A0A0B]/60 border-white/[0.08] hover:border-[#42464E]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-data-numeric text-xs font-bold text-[#5CA9DB]">
                    {stage.number}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#5CA9DB]' : 'bg-[#26282D]'}`} />
                </div>

                <div>
                  <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-tight mb-1">
                    {stage.name}
                  </h3>
                  <div className="text-[11px] font-mono text-[#8CC6EC]">
                    {stage.focus}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card for Active Stage */}
        <div className="p-8 sm:p-10 rounded-xl glass-chip text-left transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 text-xs font-mono text-[#5CA9DB] font-semibold uppercase mb-2">
                <span>ETAPA {activeStage.number}</span>
                <span>·</span>
                <span>{activeStage.name}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase mb-4">
                {activeStage.deliverable}
              </h3>

              <p className="text-sm sm:text-base text-[#D6D8DC] font-sans leading-relaxed mb-6">
                {activeStage.description}
              </p>

              {/* Products/Activities Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono text-[#A8ACB3] uppercase font-semibold">
                  ACTIVIDADES CLAVE & CRITERIOS DE SALIDA:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-white">
                  {activeStage.products.map((act, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded glass-panel">
                      <CheckCircle2 className="w-4 h-4 text-[#5CA9DB] shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Meta Column */}
            <div className="lg:col-span-4 p-6 rounded-xl glass-panel space-y-4">
              <div>
                <div className="text-[10px] font-mono text-[#6E737C] uppercase">ENTORNO DE VALIDACIÓN</div>
                <div className="text-xs font-mono text-white font-semibold mt-1">
                  {activeStage.id === 'desarrollar' || activeStage.id === 'sandbox' 
                    ? 'AI Lab en PIIT (Celda Robótica & Clúster GPU)' 
                    : 'Piso de Planta del Cliente & Conectividad Edge'}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono text-[#6E737C] uppercase">NORMA DE CUMPLIMIENTO</div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mt-1">
                  ISO/IEC 42001 & Seguridad Industrial
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => onSelectService(activeStage.id)}
                  className="w-full py-2.5 bg-[#1D1F23] hover:bg-[#5CA9DB] hover:text-[#0A0A0B] text-white text-xs font-mono font-bold rounded transition-colors flex items-center justify-center gap-1.5 uppercase"
                >
                  <span>MÁS DETALLES DE ESTA ETAPA</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Guided walkthrough: same 5 stages as a step-by-step interactive journey */}
        <div className="mt-16">
          <div className="text-xs font-mono text-[#A8ACB3] uppercase font-semibold mb-4 text-left">
            RECORRE LA METODOLOGÍA PASO A PASO
          </div>
          <Stepper
            initialStep={1}
            backButtonText="Anterior"
            nextButtonText="Siguiente etapa"
            onStepChange={(step) => {
              const stage = EXECUTION_STAGES[step - 1];
              if (stage) setActiveStageId(stage.id);
            }}
          >
            {EXECUTION_STAGES.map((stage) => (
              <Step key={stage.id}>
                <div className="text-xs font-mono text-[#5CA9DB] font-semibold uppercase mb-2">
                  ETAPA {stage.number} · {stage.focus}
                </div>
                <h4 className="font-display text-xl font-bold text-white uppercase mb-3">{stage.name}</h4>
                <p className="text-sm text-[#D6D8DC] leading-relaxed">{stage.description}</p>
              </Step>
            ))}
          </Stepper>
        </div>

      </div>
    </section>
  );
};
