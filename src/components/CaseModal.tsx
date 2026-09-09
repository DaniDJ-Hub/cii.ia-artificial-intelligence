import React from 'react';
import { ProjectCase } from '../types';
import { X, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Gauge, Building } from 'lucide-react';

interface CaseModalProps {
  caseItem: ProjectCase | null;
  onClose: () => void;
  onOpenContactWithCase: (caseTitle: string) => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({ 
  caseItem, 
  onClose, 
  onOpenContactWithCase 
}) => {
  if (!caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl rounded-xl bg-[#141518] border border-[#26282D] shadow-2xl p-6 sm:p-10 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-[#1D1F23] text-[#A8ACB3] hover:text-white hover:bg-[#26282D] transition-colors"
          aria-label="Cerrar modal de caso"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Case Meta header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded bg-[#0A0A0B] border border-[#26282D] font-semibold">
            {caseItem.technology}
          </span>
          <span className="text-[10px] font-mono text-[#A8ACB3] px-2 py-0.5 rounded bg-[#0A0A0B] border border-[#26282D]">
            {caseItem.sector}
          </span>
          <span className="text-[10px] font-mono text-[#6E737C]">
            Despliegue: {caseItem.deploymentTime}
          </span>
        </div>

        {/* Metric Highlight in Aldrich font */}
        <div className="my-6 p-6 rounded-lg bg-[#0A0A0B] border border-[#26282D] flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#A8ACB3] uppercase">MÉTRICA DE IMPACTO PRINCIPAL</div>
            <div className="font-data-numeric text-5xl font-bold text-[#5CA9DB] my-1">
              {caseItem.metricHighlight}
            </div>
            <div className="text-xs font-mono text-white font-semibold uppercase tracking-wider">
              {caseItem.metricLabel}
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-[#6E737C] block">Cliente verificado:</span>
            <span className="text-xs font-mono text-[#8CC6EC] font-medium">{caseItem.anonymizedClient}</span>
          </div>
        </div>

        {/* Case Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-6">
          {caseItem.title}
        </h3>

        {/* Structured Sections: Reto, Enfoque, Resultado */}
        <div className="space-y-6 text-sm text-[#D6D8DC]">
          <div className="p-4 rounded bg-[#0A0A0B] border border-[#26282D]">
            <h4 className="text-xs font-mono font-bold text-[#F87171] uppercase mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              EL RETO OPERATIVO
            </h4>
            <p className="font-sans leading-relaxed text-[#A8ACB3]">
              {caseItem.challenge}
            </p>
          </div>

          <div className="p-4 rounded bg-[#0A0A0B] border border-[#26282D]">
            <h4 className="text-xs font-mono font-bold text-[#5CA9DB] uppercase mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              EL ENFOQUE TÉCNICO & ARQUITECTURA
            </h4>
            <p className="font-sans leading-relaxed text-[#A8ACB3]">
              {caseItem.approach}
            </p>
          </div>

          <div className="p-4 rounded bg-[#0A0A0B] border border-[#26282D]">
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              RESULTADO AUDITADO EN PRODUCCIÓN
            </h4>
            <p className="font-sans leading-relaxed text-white">
              {caseItem.outcome}
            </p>
          </div>
        </div>

        {/* CTA with preloaded case */}
        <div className="mt-8 pt-6 border-t border-[#26282D] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#A8ACB3]">
            ¿Tienes un reto similar en tu planta u operación?
          </div>
          <button
            onClick={() => onOpenContactWithCase(caseItem.title)}
            className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2"
          >
            <span>SOLICITAR EVALUACIÓN PARA ESTE CASO</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
