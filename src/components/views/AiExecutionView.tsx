import React, { Suspense, lazy } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Layers, Check, Database } from 'lucide-react';
import { SERVICES_DATA, EXECUTION_STAGES } from '../../data/ciiiaData';
import { usePrefersReducedMotion } from '../../../hooks/use-reduced-motion';
import CardNav from '../../../components/ui/CardNav';
import { CiiiaLogo } from '../CiiiaLogo';

const MoltenMetal = lazy(() => import('../../../components/effects/MoltenMetal'));

interface AiExecutionViewProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export const AiExecutionView: React.FC<AiExecutionViewProps> = ({ onBackToHome, onOpenContact }) => {
  const service = SERVICES_DATA[0]; // AI Execution
  const reducedMotion = usePrefersReducedMotion();

  const deliverables = [
    {
      title: 'Workshop IA + Innovación',
      desc: 'Sesión ejecutiva de 16 horas para mapear retos de planta, evaluar factibilidad de datos y estimar ROI proyectado.',
      timeline: 'Semana 1-2',
      pricing: 'Desde MXN $85,000'
    },
    {
      title: 'Blueprint de Arquitectura & Integración',
      desc: 'Diseño técnico de canalización de datos, protocolos industriales (OPC-UA/MQTT), gobernanza ISO 42001 y ciberseguridad.',
      timeline: 'Semana 3-5',
      pricing: 'Desde MXN $140,000'
    },
    {
      title: 'Proyectos a la Medida Llave en Mano',
      desc: 'Desarrollo e integración directa en líneas de ensamble o servidores de planta con garantía de confiabilidad y MLOps continuo.',
      timeline: '8 a 14 semanas',
      pricing: 'Cotización según alcance y hardware'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#0A0A0B] text-left relative overflow-hidden">
      {/* Ambient molten-metal current: strategy being forged into execution */}
      {!reducedMotion && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-40">
          <Suspense fallback={null}>
            <MoltenMetal color1="#5CA9DB" color2="#29729F" color3="#0A0A0B" speed={0.22} opacity={0.6} />
          </Suspense>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8ACB3] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>REGRESAR AL HOMEPAGE</span>
        </button>

        {/* Header (Pantalla 03) */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded glass-panel mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]"></span>
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#5CA9DB] uppercase font-semibold">
              CAPACIDADES INDUSTRIALES · AI EXECUTION
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            DE LA IDEA A LA OPERACIÓN.
          </h1>

          <p className="text-base sm:text-lg text-[#D6D8DC] font-sans leading-relaxed">
            Convertimos la estrategia de inteligencia artificial en planes ejecutables y soluciones operando en piso de planta. Superamos la trampa de la consultoría tradicional entregando ingeniería tangible.
          </p>
        </div>

        {/* 3 Core Deliverables Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {deliverables.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl glass-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded glass-chip">
                    FASE 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-[#6E737C]">{item.timeline}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-3">
                  {item.title}
                </h3>

                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08]">
                <div className="text-[10px] font-mono text-[#6E737C] uppercase">PRECIO REFERENCIAL</div>
                <div className="text-xs font-mono text-white font-bold mb-4">{item.pricing}</div>
                <button
                  onClick={onOpenContact}
                  className="w-full py-2 bg-[#1D1F23] hover:bg-[#5CA9DB] hover:text-[#0A0A0B] text-white text-xs font-mono font-medium rounded transition-colors"
                >
                  SOLICITAR PROPUESTA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick-access card menu to related resources */}
        <div className="relative h-[300px] sm:h-[280px] mb-16">
          <CardNav
            logo={<CiiiaLogo size="sm" />}
            baseColor="#141518"
            menuColor="#ffffff"
            buttonBgColor="#5CA9DB"
            buttonTextColor="#0A0A0B"
            items={[
              {
                label: 'Recursos técnicos',
                bgColor: '#0F2E42',
                textColor: '#fff',
                links: [
                  { label: 'Sitio oficial CII.IA', href: 'https://ciiia.mx', ariaLabel: 'Ir a ciiia.mx' },
                  { label: 'Blog de investigación', href: 'https://ciiia.mx/noticiasciiia', ariaLabel: 'Ir al blog' },
                ],
              },
              {
                label: 'Otras rutas',
                bgColor: '#1D1F23',
                textColor: '#fff',
                links: [
                  { label: 'Certificación NVIDIA DLI', href: 'https://ciiia.mx/nvidia', ariaLabel: 'Ir a certificación NVIDIA DLI' },
                  { label: 'Agendar sesión ejecutiva', ariaLabel: 'Agendar sesión ejecutiva', onClick: onOpenContact },
                ],
              },
              {
                label: 'Sede',
                bgColor: '#26282D',
                textColor: '#fff',
                links: [{ label: 'PIIT · Apodaca, N.L.', href: 'https://ciiia.mx', ariaLabel: 'Ubicación del PIIT' }],
              },
            ]}
          />
        </div>

        {/* Six Steps Commercial Pathway (Pantalla 03) */}
        <div className="p-8 sm:p-10 rounded-xl glass-panel mb-12">
          <h3 className="font-mono text-xs font-bold text-[#5CA9DB] tracking-widest uppercase mb-2">
            RUTA COMERCIAL DE SEIS PASOS
          </h3>
          <h2 className="font-display text-2xl font-bold text-white uppercase mb-8">
            CÓMO TRABAJA EL CII.IA CON TU EQUIPO
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Diagnóstico & NDA', desc: 'Firma de acuerdo de confidencialidad y revisión de datos disponibles.' },
              { num: '02', title: 'Workshop de Retos', desc: 'Sesión técnica para jerarquizar iniciativas según retorno sobre inversión.' },
              { num: '03', title: 'Blueprint Técnico', desc: 'Definición de arquitectura, sensores y requerimientos de cómputo edge.' },
              { num: '04', title: 'Validación en Lab', desc: 'Pruebas del modelo en la celda robótica y servidores del PIIT.' },
              { num: '05', title: 'Piloto en Planta', desc: 'Instalación en una sola máquina o línea de producción controlada.' },
              { num: '06', title: 'Escalamiento & MLOps', desc: 'Despliegue a toda la planta con monitoreo continuo y soporte.' },
            ].map((step, i) => (
              <div key={i} className="p-4 rounded-lg glass-chip">
                <div className="font-data-numeric text-lg font-bold text-[#5CA9DB] mb-1">{step.num}</div>
                <div className="font-mono text-xs font-bold text-white uppercase mb-1">{step.title}</div>
                <div className="text-xs text-[#A8ACB3] font-sans">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA banner */}
        <div className="p-8 rounded-xl bg-[#0F2E42]/30 backdrop-blur-md border border-[#29729F]/40 glow-accent-sm flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white uppercase">
              ¿Listo para dar el paso hacia la ejecución?
            </h3>
            <p className="text-xs text-[#D6D8DC] font-sans mt-1">
              Agendamos una sesión inicial de diagnóstico técnico sin costo con un especialista de tu sector.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <span>AGENDAR SESIÓN EJECUTIVA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
