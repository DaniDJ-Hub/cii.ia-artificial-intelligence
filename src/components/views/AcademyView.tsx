import React from 'react';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, BookOpen, Users, Shield, Cpu } from 'lucide-react';

interface AcademyViewProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export const AcademyView: React.FC<AcademyViewProps> = ({ onBackToHome, onOpenContact }) => {
  const academyTracks = [
    {
      code: 'TRACK-01',
      title: 'Visión Computacional para Inspección de Calidad (NVIDIA DLI)',
      target: 'Ingenieros de Calidad y Desarrolladores de Software',
      duration: '32 horas (Práctico en GPU)',
      cert: 'Certificado oficial NVIDIA DLI',
      desc: 'Entrenamiento de redes convolucionales y modelos YOLO/Transformer para detección de defectos en tiempo real sobre hardware NVIDIA Jetson.'
    },
    {
      code: 'TRACK-02',
      title: 'MLOps & Mantenimiento Predictivo Industrial',
      target: 'Ingenieros de Confiabilidad y Científicos de Datos',
      duration: '40 horas',
      cert: 'Certificación CII.IA Specialist',
      desc: 'Procesamiento de series temporales de vibración, descomposición FFT, detección precoz de anomalías y pipeline de despliegue continuo.'
    },
    {
      code: 'TRACK-03',
      title: 'IA Generativa & Sistemas RAG para Operaciones',
      target: 'Líderes de TI y Desarrolladores Full-Stack',
      duration: '24 horas',
      cert: 'Certificación CII.IA Specialist',
      desc: 'Implementación de copilotos técnicos locales (air-gapped) sobre manuales de maquinaria, planos y diagramas eléctricos sin fuga de datos.'
    },
    {
      code: 'TRACK-04',
      title: 'Robótica Colaborativa e Inferencia en el Borde',
      target: 'Ingenieros de Automatización y Mecatrónica',
      duration: '36 horas (En Laboratorio PIIT)',
      cert: 'Certificación Práctica en Celda',
      desc: 'Programación de brazos robóticos y visión guiada para tareas de bin picking y manipulación autónoma en la celda de manufactura.'
    },
    {
      code: 'TRACK-05',
      title: 'Gobernanza de IA & Cumplimiento ISO/IEC 42001',
      target: 'C-Level, Directores Jurídicos y CISOs',
      duration: '16 horas',
      cert: 'Auditor Interno de Gobernanza',
      desc: 'Diseño del marco institucional de gobernanza ética, trazabilidad de algoritmos, gestión de riesgos legales y soberanía de la información.'
    },
    {
      code: 'TRACK-06',
      title: 'IA para Directores de Planta y Operaciones',
      target: 'Gerentes de Planta y Directores de Manufactura',
      duration: '16 horas',
      cert: 'Certificado de Gestión Estratégica',
      desc: 'Identificación de cuellos de botella con alto ROI, cálculo de payback de proyectos de automatización cognitiva y gestión del cambio en piso.'
    },
    {
      code: 'TRACK-07',
      title: 'Fundamentos de Inteligencia Artificial para Empresas',
      target: 'Equipos Multidisciplinarios y Mandos Medios',
      duration: '12 horas',
      cert: 'Acreditación Básica CII.IA',
      desc: 'Desmitificación de la IA, conceptos clave de Machine Learning, casos de éxito en la industria mexicana y oportunidades de aplicación rápida.'
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

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141518] border border-[#26282D] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono tracking-[0.24em] text-emerald-400 uppercase font-semibold">
              CII.IA ACADEMY · NVIDIA DEEP LEARNING INSTITUTE
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            CATALIZAMOS, NO INSTRUIMOS.
          </h1>

          <p className="text-base sm:text-lg text-[#D6D8DC] font-sans leading-relaxed">
            Formación especializada de alto nivel técnico avalada por NVIDIA y la red de socios fundadores. Siete rutas de especialización diseñadas para cerrar la brecha de talento entre la ciencia de datos y la operación de planta.
          </p>
        </div>

        {/* NVIDIA Credential Banner */}
        <div className="p-6 rounded-xl bg-[#0F2E42]/40 border border-[#29729F]/50 flex flex-wrap items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#0A0A0B] border border-[#26282D] rounded-lg text-emerald-400">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                CENTRO OFICIAL CERTIFICADO NVIDIA DLI
              </h3>
              <p className="text-xs text-[#A8ACB3] font-sans mt-0.5">
                Instructores certificados por NVIDIA con acceso a plataformas GPU en la nube y laboratorios presenciales en el PIIT.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenContact}
            className="h-10 px-5 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold uppercase transition-colors"
          >
            SOLICITAR PROGRAMA IN-COMPANY
          </button>
        </div>

        {/* 7 Product Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {academyTracks.map((track, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-xl bg-[#141518] border border-[#26282D] hover:border-[#5CA9DB] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-[#5CA9DB] font-bold">
                    {track.code}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">
                    {track.cert}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-2">
                  {track.title}
                </h3>

                <div className="text-xs font-mono text-[#8CC6EC] mb-3">
                  Dirigido a: {track.target} · {track.duration}
                </div>

                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed mb-6">
                  {track.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#26282D] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6E737C]">Modalidad híbrida / in-plant</span>
                <button
                  onClick={onOpenContact}
                  className="text-xs font-mono text-[#5CA9DB] hover:text-white font-semibold flex items-center gap-1"
                >
                  Temario y fechas <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
