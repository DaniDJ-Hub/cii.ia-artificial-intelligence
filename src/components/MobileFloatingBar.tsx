import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface MobileFloatingBarProps {
  onOpenContact: () => void;
}

export const MobileFloatingBar: React.FC<MobileFloatingBarProps> = ({ onOpenContact }) => {
  return (
    <div 
      id="mobile-bottom-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel-strong p-3 safe-area-bottom"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="text-left pl-1">
          <div className="text-[10px] font-mono text-[#5CA9DB] font-semibold tracking-wider uppercase">
            CII.IA · PIIT N.L.
          </div>
          <div className="text-xs font-mono text-white font-medium">
            Última milla en IA
          </div>
        </div>

        <button
          onClick={onOpenContact}
          className="h-12 px-5 rounded bg-[#5CA9DB] active:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 glow-accent-lg"
        >
          <span>AGENDAR SESIÓN</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
