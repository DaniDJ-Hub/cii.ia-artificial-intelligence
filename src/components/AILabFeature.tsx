import React from 'react';
import { Cpu, HardDrive, Compass, Layers, CheckCircle2, ArrowRight, Shield, Zap } from 'lucide-react';

interface AILabFeatureProps {
  onOpenContact: () => void;
  onNavigateToLabPage: () => void;
}

export const AILabFeature: React.FC<AILabFeatureProps> = ({ 
  onOpenContact,
  onNavigateToLabPage 
}) => {
  const labAssets = [
    {
      title: 'CELDA DE MANUFACTURA INDUSTRIAL',
      desc: 'Brazo robótico articulado Fanuc y Universal Robots para validación de agarre, ensamble y visión en movimiento.',
      spec: 'Capacidad de carga 10kg · Precisión ±0.03mm'
    },
    {
      title: 'FLOTA DE DRONES AUTÓNOMOS',
      desc: 'Drones equipados con LiDAR indoor, cámaras termográficas y sistemas SLAM para inspección de tanques y almacenes.',
      spec: 'Navegación GPS-Denied · Sensores Flir'
    },
    {
      title: 'DATA CENTER EDGE & CLUSTERS',
      desc: 'Nodos NVIDIA Jetson Orin, servidores Dell PowerEdge y conectividad industrial directa OPC-UA y MQTT.',
      spec: 'Inferencia de ultra-baja latencia (sub-10ms)'
    },
    {
      title: 'ENTORNO DE REALIDAD MIXTA (VR/AR)',
      desc: 'Simulación de gemelos digitales para entrenamiento de operadores antes de intervenir líneas activas.',
      spec: 'Entornos hápticos y visuales 1:1'
    }
  ];

  const labCycle = [
    { step: '01', name: 'SANDBOX', desc: 'Ingesta de datos crudos y validación de hipótesis en entorno seguro sin riesgo operativo.' },
    { step: '02', name: 'MVP', desc: 'Primer algoritmo funcional probado sobre hardware similar al de la planta de destino.' },
    { step: '03', name: 'PoC FÍSICA', desc: 'Demostración en la celda de manufactura del laboratorio con piezas y tolerancias reales.' },
    { step: '04', name: 'INDUSTRIALIZACIÓN', desc: 'Integración en piso de planta, certificación ISO 42001, gobernanza y MLOps continuo.' }
  ];

  return (
    <section 
      id="ailab"
      className="py-24 sm:py-32 bg-[#141518] border-b border-[#26282D] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0A0A0B] border border-[#26282D] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]"></span>
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#5CA9DB] uppercase font-semibold">
              07 · INFRAESTRUCTURA FÍSICA PROPIA · PIIT
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            AQUÍ SE CONSTRUYE. NO SE TEORIZA.
          </h2>

          <p className="text-base sm:text-lg text-[#D6D8DC] font-sans">
            Un espacio donde tu reto se convierte en prototipo funcional antes de convertirse en una inversión de capital millonaria. Ubicado en el Parque de Investigación e Innovación Tecnológica (PIIT) en Apodaca, Nuevo León.
          </p>
        </div>

        {/* 4 Physical Lab Assets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {labAssets.map((asset, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-lg bg-[#0A0A0B] border border-[#26282D] hover:border-[#5CA9DB] transition-all flex flex-col justify-between text-left"
            >
              <div>
                <div className="text-xs font-mono text-[#5CA9DB] font-bold mb-3">
                  ACTIVO 0{idx + 1}
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-2">
                  {asset.title}
                </h3>
                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed mb-4">
                  {asset.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#26282D] text-[10px] font-mono text-[#8CC6EC]">
                {asset.spec}
              </div>
            </div>
          ))}
        </div>

        {/* The Sandbox -> MVP -> PoC -> Industrialization Cycle */}
        <div className="p-8 sm:p-10 rounded-xl bg-[#0A0A0B] border border-[#26282D] text-left mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono text-[#5CA9DB] uppercase tracking-wider font-semibold">
                METODOLOGÍA DE PROTOTIPADO RÁPIDO
              </span>
              <h3 className="font-display text-2xl font-bold text-white uppercase mt-1">
                EL CAMINO HACIA LA LÍNEA DE PRODUCCIÓN
              </h3>
            </div>
            <button
              onClick={onNavigateToLabPage}
              className="text-xs font-mono text-[#8CC6EC] hover:text-white flex items-center gap-1.5 underline decoration-[#5CA9DB] underline-offset-4"
            >
              <span>Ver especificaciones completas del laboratorio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {labCycle.map((item, idx) => (
              <div key={idx} className="relative p-5 rounded-lg bg-[#141518] border border-[#26282D]">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-data-numeric text-xl font-bold text-[#5CA9DB]">{item.step}</span>
                  <div className="w-2 h-2 rounded-full bg-[#5CA9DB]/60"></div>
                </div>
                <h4 className="font-mono text-sm font-bold text-white uppercase mb-2">{item.name}</h4>
                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visit CTA */}
        <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-lg bg-[#0F2E42]/40 border border-[#29729F]/50">
          <div className="text-left">
            <h4 className="font-display text-lg font-bold text-white uppercase">
              ¿Quieres presenciar las capacidades en vivo?
            </h4>
            <p className="text-xs text-[#D6D8DC] font-sans mt-1">
              Coordinamos visitas técnicas guiadas para directores de planta, ingenieros y equipos de innovación.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <span>AGENDAR VISITA AL LABORATORIO</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
