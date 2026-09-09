import React from 'react';
import { InteractiveHeroCanvas } from './InteractiveHeroCanvas';
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Cpu, HardDrive, Zap } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onNavigateToCases: () => void;
  onNavigateToEcosystem: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onNavigateToCases,
}) => {
  return (
    <section 
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-28 sm:pt-32 pb-16 overflow-hidden border-b border-[#26282D]"
    >
      {/* Interactive Future-Forward Neural Canvas (Particles, Nodes, Dynamic Connections, Mouse Reactive) */}
      <InteractiveHeroCanvas />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column (Cols 1-7): Editorial High-Impact Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill with live pulse */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#141518]/90 border border-[#26282D] backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#D6D8DC] uppercase">
                CENTRO DE INNOVACIÓN INDUSTRIAL EN IA · PIIT N.L.
              </span>
            </div>

            {/* Powerful Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.08] mb-6 drop-shadow-sm">
              <span className="block text-white">INTELIGENCIA ARTIFICIAL</span>
              <span className="block text-[#5CA9DB] mt-1">QUE OPERA EN PISO DE PLANTA.</span>
            </h1>

            {/* Concise, Scannable Subheadline */}
            <p className="text-base sm:text-lg text-[#D6D8DC] leading-relaxed max-w-[62ch] font-sans font-normal mb-8">
              Transformamos el potencial algorítmico en productividad fabril tangible. Del laboratorio en el Parque de Investigación e Innovación Tecnológica (PIIT) al despliegue directo en líneas de ensamble, con gobernanza y retorno de inversión medible.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                id="hero-primary-cta"
                onClick={onOpenContact}
                className="h-12 sm:h-13 px-7 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-3 shadow-[0_0_30px_-5px_rgba(92,169,219,0.55)] active:scale-95 w-full sm:w-auto"
              >
                <span>AGENDAR SESIÓN EJECUTIVA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onNavigateToCases}
                className="h-12 sm:h-13 px-6 rounded bg-[#141518]/80 hover:bg-[#1D1F23] text-white text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase border border-[#26282D] hover:border-[#42464E] transition-all flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>VER CASOS REALES</span>
                <ChevronRight className="w-4 h-4 text-[#5CA9DB]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-[#26282D]/80 flex flex-wrap items-center gap-6 text-xs font-mono text-[#A8ACB3]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5CA9DB]" />
                <span>Norma ISO/IEC 42001</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>Partner Oficial NVIDIA DLI</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#8CC6EC]" />
                <span>Consorcio Triple Hélice</span>
              </div>
            </div>
          </div>

          {/* Right Column (Cols 8-12): Floating Interactive Telemetry & Industrial AI Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left pointer-events-none sm:pointer-events-auto">
            
            {/* Live Model Ingestion & Telemetry Monitor */}
            <div className="p-5 rounded-xl bg-[#0A0A0B]/80 border border-[#26282D] backdrop-blur-xl shadow-2xl hover:border-[#5CA9DB]/60 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-[#26282D] text-xs font-mono">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Activity className="w-4 h-4 text-[#5CA9DB]" />
                  <span>INSPECCIÓN EN TIEMPO REAL · CELDA PIIT</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-900">
                  ACTIVO
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-4">
                <div>
                  <div className="text-[10px] font-mono text-[#A8ACB3] uppercase">Precisión en Línea</div>
                  <div className="font-data-numeric text-3xl font-bold text-white mt-0.5">
                    99.4<span className="text-[#5CA9DB] text-xl">%</span>
                  </div>
                  <div className="text-[9px] font-mono text-[#6E737C]">Tolerancia ±0.03mm</div>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-[#A8ACB3] uppercase">Latencia Inferencia Edge</div>
                  <div className="font-data-numeric text-3xl font-bold text-white mt-0.5">
                    4.2<span className="text-emerald-400 text-xl">ms</span>
                  </div>
                  <div className="text-[9px] font-mono text-[#6E737C]">NVIDIA Jetson Orin</div>
                </div>
              </div>

              {/* Sparkline mini-indicator */}
              <div className="pt-3 border-t border-[#26282D] flex items-center justify-between text-[10px] font-mono text-[#A8ACB3]">
                <span>STREAM: 2,400 FPS / CAM-01 A CAM-04</span>
                <span className="text-[#8CC6EC]">SUB-10MS SLA</span>
              </div>
            </div>

            {/* Industrial Deployment Card */}
            <div className="p-5 rounded-xl bg-[#141518]/80 border border-[#26282D] backdrop-blur-xl shadow-xl flex items-center justify-between hover:border-[#3D8FC4]/50 transition-all">
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-[#5CA9DB] font-semibold uppercase tracking-wider">
                  INFRAESTRUCTURA FÍSICA INSTALADA
                </div>
                <div className="font-display text-sm font-bold text-white uppercase">
                  Robótica Fanuc/UR · Drones LiDAR · Data Center
                </div>
                <div className="text-xs text-[#A8ACB3] font-sans">
                  Validación física previa antes de intervenir maquinaria activa.
                </div>
              </div>
              <div className="p-3 bg-[#0A0A0B] border border-[#26282D] rounded-lg shrink-0 ml-4">
                <HardDrive className="w-5 h-5 text-[#5CA9DB]" />
              </div>
            </div>

            {/* Verified ROI Indicator */}
            <div className="p-4 rounded-xl bg-[#0F2E42]/40 border border-[#29729F]/40 backdrop-blur-md flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-[#5CA9DB]" />
                <span className="text-[#D6D8DC]">Retorno promedio de inversión reportado:</span>
              </div>
              <span className="font-data-numeric text-lg font-bold text-white bg-[#0A0A0B] px-2.5 py-0.5 rounded border border-[#26282D]">
                4.2x ROI
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
