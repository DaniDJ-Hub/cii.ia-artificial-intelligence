import React, { Suspense, lazy } from 'react';
import { ArrowLeft, ArrowRight, HardDrive, Cpu, Compass, Video, Layers, CheckCircle2, MapPin } from 'lucide-react';
import ScrollExpand from '../../../components/ui/ScrollExpand';
import HeroCardsReveal from '../../../components/ui/HeroCardsReveal';
import { usePrefersReducedMotion } from '../../../hooks/use-reduced-motion';

const FluidGlass = lazy(() => import('../../../components/effects/FluidGlass'));

const LAB_HERO_IMAGE = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop';

const LAB_CARD_IMAGES = [
  { active: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500&auto=format&fit=crop', idle: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=500&auto=format&fit=crop&sat=-100', label: 'Robótica' },
  { active: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop', idle: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=500&auto=format&fit=crop&sat=-100', label: 'LiDAR' },
  { active: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=500&auto=format&fit=crop', idle: 'https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=500&auto=format&fit=crop&sat=-100', label: 'GPU Edge' },
];

interface AiLabViewProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export const AiLabView: React.FC<AiLabViewProps> = ({ onBackToHome, onOpenContact }) => {
  const reducedMotion = usePrefersReducedMotion();
  const labEquipment = [
    {
      category: 'ROBÓTICA & MANUFACTURA',
      name: 'Celda Articulada Fanuc & Universal Robots (UR10e)',
      specs: '6 grados de libertad · Carga 10-16 kg · Repetibilidad ±0.03 mm',
      applications: 'Ensamble de precisión, bin picking óptico, inspección de soldadura en tiempo real.'
    },
    {
      category: 'INSPECCIÓN AÉREA & LIDAR',
      name: 'Flota Matrice 300 RTK con Sensores Térmicos Flir',
      specs: 'Posicionamiento centimétrico RTK · Cámaras radiométricas 640x512',
      applications: 'Inspección de tanques de combustible, subestaciones eléctricas y techumbres industriales.'
    },
    {
      category: 'CÓMPUTO EDGE & INFERENCIA',
      name: 'Clusters NVIDIA Jetson Orin & Dell PowerEdge',
      specs: '275 TOPS por nodo · Conectividad TSN · Interfaces industriales OPC UA / Profinet',
      applications: 'Modelos de visión convolucional y LLMs locales desplegados directamente en pie de máquina.'
    },
    {
      category: 'METROLOGÍA & VISIÓN 3D',
      name: 'Cámaras Estroboscópicas & Escáner Láser de Línea',
      specs: 'Hasta 500 fps a resolución 4K · Iluminación polarizada y ultravioleta',
      applications: 'Detección de microfisuras, rugosidad superficial y alineación dimensional milimétrica.'
    },
    {
      category: 'GEMELOS DIGITALES & VR',
      name: 'Simulador Háptico y Sala Inmersiva VR',
      specs: 'Renderizado en Unreal Engine 5 conectado a telemetría MQTT real',
      applications: 'Validación ergonómica y pruebas de estrés de algoritmos antes de interferir con planta viva.'
    },
    {
      category: 'GOBERNANZA & SEGURIDAD',
      name: 'Entorno Aislado Air-Gapped para Datos Críticos',
      specs: 'Norma ISO/IEC 42001 · Servidores dedicados sin fuga a internet público',
      applications: 'Procesamiento de secretos industriales, formulaciones químicas y planos propietarios.'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#0A0A0B] text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8ACB3] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>REGRESAR AL HOMEPAGE</span>
        </button>

        {/* Header (Pantalla 04) */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded glass-panel mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]"></span>
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#5CA9DB] uppercase font-semibold">
              INFRAESTRUCTURA FÍSICA INSTALADA · PARQUE PIIT
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            AQUÍ SE CONSTRUYE.
          </h1>

          <p className="text-base sm:text-lg text-[#D6D8DC] font-sans leading-relaxed">
            Un espacio donde tu reto industrial se convierte en prototipo funcional antes de convertirse en inversión de capital. Sede en el Parque de Investigación e Innovación Tecnológica (PIIT), Apodaca, Nuevo León.
          </p>
        </div>

        {/* Scroll-driven reveal of the physical lab floor */}
        <div className="mb-16 h-[70vh] rounded-2xl overflow-hidden glass-panel relative">
          <ScrollExpand
            src={LAB_HERO_IMAGE}
            alt="Piso del AI Lab en el PIIT"
            title="AQUÍ SE VALIDA ANTES DE INVERTIR"
            scrollHint="Desplázate para abrir el laboratorio"
          />
        </div>

        {/* Equipment preview, hover to reveal each category */}
        <div className="mb-16">
          <h3 className="font-mono text-xs font-bold text-[#5CA9DB] tracking-widest uppercase mb-4">
            VISTAZO RÁPIDO AL EQUIPAMIENTO
          </h3>
          <div className="h-[420px] rounded-xl glass-panel overflow-hidden">
            <HeroCardsReveal
              mainSrc={LAB_HERO_IMAGE}
              cards={LAB_CARD_IMAGES.map((c) => ({ activeSrc: c.active, idleSrc: c.idle, label: c.label }))}
            />
          </div>
        </div>

        {/* Ambient floating glass shape: a literal "fluid glass" lens over the lab narrative */}
        {!reducedMotion && (
          <div className="mb-16 h-64 rounded-xl glass-panel glow-accent-sm overflow-hidden relative">
            <Suspense fallback={null}>
              <FluidGlass geometry="icosahedron" scale={1.2} followPointer autoRotate color="#5CA9DB" />
            </Suspense>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 text-center">
              <p className="font-display text-sm sm:text-base text-white/70 uppercase tracking-wide max-w-md">
                Cada prototipo pasa por este lente antes de tocar tu línea de producción
              </p>
            </div>
          </div>
        )}

        {/* Location Banner */}
        <div className="p-4 rounded-lg glass-panel flex items-center justify-between gap-4 mb-12 text-xs font-mono">
          <div className="flex items-center gap-2 text-white">
            <MapPin className="w-4 h-4 text-[#5CA9DB]" />
            <span>PIIT Monterrey: Autopista al Aeropuerto Km 9.5, Apodaca NL</span>
          </div>
          <span className="text-[#8CC6EC] hidden sm:inline">Laboratorio de Grado Industrial 100% Operativo</span>
        </div>

        {/* Detailed Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {labEquipment.map((eq, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl glass-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-mono text-[#5CA9DB] font-bold uppercase mb-2">
                  {eq.category}
                </div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-2">
                  {eq.name}
                </h3>
                <div className="p-2.5 rounded glass-chip text-[11px] font-mono text-[#8CC6EC] mb-3">
                  {eq.specs}
                </div>
                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
                  {eq.applications}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Disponible para pruebas industriales</span>
              </div>
            </div>
          ))}
        </div>

        {/* How We Work: 6-Step Protocol */}
        <div className="p-8 sm:p-10 rounded-xl glass-panel mb-12">
          <h3 className="font-mono text-xs font-bold text-[#5CA9DB] tracking-widest uppercase mb-2">
            PROTOCOLO TÉCNICO DE LABORATORIO
          </h3>
          <h2 className="font-display text-2xl font-bold text-white uppercase mb-8">
            CÓMO SE TRABAJA EN EL AI LAB
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Recepción de Muestras', desc: 'Envío de piezas defectuosas, telemetría o sensores para calibración inicial.' },
              { num: '02', title: 'Banco de Pruebas', desc: 'Montaje de iluminación, cámaras y sensores en la celda robótica.' },
              { num: '03', title: 'Entrenamiento & Fine-Tuning', desc: 'Ajuste de modelos sobre clusters NVIDIA Jetson y servidores locales.' },
              { num: '04', title: 'Medición de Tasa de Error', desc: 'Evaluación de falsos positivos y falsos negativos bajo norma industrial.' },
              { num: '05', title: 'Stress Testing', desc: 'Pruebas a velocidad máxima simulada de línea de producción (24/7).' },
              { num: '06', title: 'Traslado a Planta', desc: 'Empaquetado de hardware validado para instalación directa en sitio.' },
            ].map((step, i) => (
              <div key={i} className="p-4 rounded-lg glass-chip">
                <div className="font-data-numeric text-lg font-bold text-[#5CA9DB] mb-1">{step.num}</div>
                <div className="font-mono text-xs font-bold text-white uppercase mb-1">{step.title}</div>
                <div className="text-xs text-[#A8ACB3] font-sans">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="p-8 rounded-xl bg-[#0F2E42]/30 backdrop-blur-md border border-[#29729F]/40 glow-accent-sm flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white uppercase">
              Agenda una visita presencial a nuestras instalaciones
            </h3>
            <p className="text-xs text-[#D6D8DC] font-sans mt-1">
              Trae una muestra de tus piezas o registros de fallas para realizar una prueba de concepto preliminar.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <span>COORDINAR VISITA AL PIIT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
