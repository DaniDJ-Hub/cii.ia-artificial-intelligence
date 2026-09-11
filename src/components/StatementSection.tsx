import React, { Suspense, lazy } from 'react';
import { Building2, MapPin, Award, CheckCircle2 } from 'lucide-react';
import DepthText from '../../components/ui/DepthText';

const CursorGrid = lazy(() => import('../../components/effects/CursorGrid'));

export const StatementSection: React.FC = () => {
  return (
    <section
      id="ciia"
      className="py-20 sm:py-28 bg-[#0A0A0B] relative overflow-hidden perspective-container"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      {/* Ambient interactive grid: precision lattice that lights up on hover */}
      <div className="pointer-events-none absolute inset-0">
        <Suspense fallback={null}>
          <CursorGrid cellSize={72} color="#5CA9DB" radius={160} maxOpacity={0.4} gridOpacity={0.04} />
        </Suspense>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* Section Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
          <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] font-semibold uppercase">
            QUÉ ES EL CII.IA
          </span>
        </div>

        {/* 3D depth-layered wordmark */}
        <div className="mb-8 flex justify-center">
          <DepthText text="CII.IA" fontSize="clamp(2.75rem, 9vw, 5.5rem)" depthColor="#5CA9DB" faceColor="#ffffff" />
        </div>

        {/* Clean Editorial Manifesto */}
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-bold leading-[1.3] tracking-tight max-w-4xl mx-auto mb-8">
          EL ECOSISTEMA PÚBLICO-PRIVADO QUE CONECTA LA{' '}
          <span className="text-[#5CA9DB]">INTELIGENCIA ARTIFICIAL</span> CON LA{' '}
          <span className="text-white">OPERACIÓN INDUSTRIAL EN MÉXICO.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#D6D8DC] font-sans max-w-3xl mx-auto leading-relaxed mb-12">
          Impulsado por el Tecnológico de Monterrey, la UANL, CAINTRA y el Gobierno de Nuevo León. Con sede operativa en el Parque de Investigación e Innovación Tecnológica (PIIT), no somos una consultora que entrega presentaciones teóricas: <span className="text-[#8CC6EC] font-semibold">diseñamos, probamos e industrializamos algoritmos que operan 24/7.</span>
        </p>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left mb-10">
          <div className="p-6 rounded-xl glass-panel tilt-hover">
            <div className="text-xs font-mono text-[#5CA9DB] font-bold mb-2">INFRAESTRUCTURA FÍSICA</div>
            <h3 className="font-display text-base font-bold text-white uppercase mb-2">
              AI Lab en el PIIT
            </h3>
            <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
              Celda robótica Fanuc/UR, drones con LiDAR, sensores termográficos y clúster GPU NVIDIA Jetson Orin para validar antes de invertir.
            </p>
          </div>

          <div className="p-6 rounded-xl glass-panel tilt-hover">
            <div className="text-xs font-mono text-[#5CA9DB] font-bold mb-2">RESPALDO INSTITUCIONAL</div>
            <h3 className="font-display text-base font-bold text-white uppercase mb-2">
              Consorcio Triple Hélice
            </h3>
            <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
              Certidumbre jurídica, continuidad de proyectos a largo plazo y vinculación directa con investigadores de posgrado y clústeres.
            </p>
          </div>

          <div className="p-6 rounded-xl glass-panel tilt-hover">
            <div className="text-xs font-mono text-[#5CA9DB] font-bold mb-2">GOBERNANZA & RIGOR</div>
            <h3 className="font-display text-base font-bold text-white uppercase mb-2">
              Norma ISO/IEC 42001
            </h3>
            <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
              Entornos aislados (air-gapped) que garantizan la propiedad intelectual, soberanía de fórmulas y confidencialidad absoluta.
            </p>
          </div>
        </div>

        {/* Location & Tagline */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A8ACB3]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#5CA9DB]" />
            <span>PIIT Monterrey: Autopista al Aeropuerto Km 9.5, Apodaca N.L.</span>
          </div>
          <span className="text-[#5CA9DB] font-semibold tracking-wider uppercase">
            GLOBAL SOLUTIONS DELIVERED LOCALLY
          </span>
        </div>

      </div>
    </section>
  );
};
