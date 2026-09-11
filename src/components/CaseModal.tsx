import React from 'react';
import { motion } from 'motion/react';
import { ProjectCase } from '../types';
import { X, ArrowRight, CheckCircle2, ShieldAlert, Cpu, Gauge, Building } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from '../../components/ui/3d-card';
import { Lens } from '../../components/ui/Lens';
import { usePrefersReducedMotion } from '../../hooks/use-reduced-motion';

const CASE_SECTOR_IMAGES: Record<string, string> = {
  Manufactura: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop',
  'Comercio y Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop',
  Multisectorial: 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=900&auto=format&fit=crop',
  'Servicios Financieros': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop',
  'Seguridad Pública': 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=900&auto=format&fit=crop',
  'Seguridad Industrial': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=900&auto=format&fit=crop',
};
const DEFAULT_CASE_MODAL_IMAGE = 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=900&auto=format&fit=crop';

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
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto perspective-container">
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 24, rotateX: 4 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        className="relative w-full max-w-3xl rounded-xl glass-panel-strong glow-accent-lg p-6 sm:p-10 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg glass-chip text-[#A8ACB3] hover:text-white hover:border-[#5CA9DB]/50 transition-colors"
          aria-label="Cerrar modal de caso"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Case Meta header */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded glass-chip font-semibold">
            {caseItem.technology}
          </span>
          <span className="text-[10px] font-mono text-[#A8ACB3] px-2 py-0.5 rounded glass-chip">
            {caseItem.sector}
          </span>
          <span className="text-[10px] font-mono text-[#6E737C]">
            Despliegue: {caseItem.deploymentTime}
          </span>
        </div>

        {/* Representative sector visual with hover-zoom lens */}
        <div className="mb-6 rounded-lg overflow-hidden border border-white/[0.08]">
          <Lens zoomFactor={1.8} lensSize={140}>
            <img
              src={CASE_SECTOR_IMAGES[caseItem.sector] || DEFAULT_CASE_MODAL_IMAGE}
              alt={caseItem.sector}
              className="w-full h-40 sm:h-48 object-cover"
            />
          </Lens>
        </div>

        {/* Metric Highlight in Aldrich font, tilts gently in 3D on hover */}
        <CardContainer containerClassName="!py-0 mb-0" className="w-full">
          <CardBody className="w-full h-auto">
            <CardItem translateZ={30} className="w-full">
              <div className="my-0 p-6 rounded-lg glass-chip flex items-center justify-between w-full">
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
            </CardItem>
          </CardBody>
        </CardContainer>

        {/* Case Title */}
        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-6">
          {caseItem.title}
        </h3>

        {/* Structured Sections: Reto, Enfoque, Resultado */}
        <div className="space-y-6 text-sm text-[#D6D8DC]">
          <div className="p-4 rounded glass-chip">
            <h4 className="text-xs font-mono font-bold text-[#F87171] uppercase mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              EL RETO OPERATIVO
            </h4>
            <p className="font-sans leading-relaxed text-[#A8ACB3]">
              {caseItem.challenge}
            </p>
          </div>

          <div className="p-4 rounded glass-chip">
            <h4 className="text-xs font-mono font-bold text-[#5CA9DB] uppercase mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              EL ENFOQUE TÉCNICO & ARQUITECTURA
            </h4>
            <p className="font-sans leading-relaxed text-[#A8ACB3]">
              {caseItem.approach}
            </p>
          </div>

          <div className="p-4 rounded glass-chip">
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
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
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
      </motion.div>
    </div>
  );
};
