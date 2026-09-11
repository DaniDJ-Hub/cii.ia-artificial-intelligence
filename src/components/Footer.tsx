import React from 'react';
import { CiiiaLogo } from './CiiiaLogo';
import { NavigationPage } from '../types';
import { MapPin, Mail, Phone, ExternalLink, Shield } from 'lucide-react';
import CobeGlobe from '../../components/ui/CobeGlobe';
import FlowingMenu from '../../components/ui/FlowingMenu';

const MONOCHROME_TILE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect width="200" height="100" fill="#0F2E42"/><circle cx="100" cy="50" r="30" fill="#5CA9DB"/></svg>',
  );

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="relative bg-[#0A0A0B] pt-16 pb-12 text-left overflow-hidden">
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      <div className="ambient-glow -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Col 1 & 2: Brand & Physical Location */}
          <div className="lg:col-span-2 space-y-4 relative">
            {/* Tiny spinning globe, echoing "global solutions delivered locally" */}
            <div className="absolute -top-6 right-0 w-24 h-24 opacity-70 pointer-events-none hidden md:block">
              <CobeGlobe size={200} />
            </div>
            <CiiiaLogo size="lg" />
            
            <p className="text-xs font-mono text-[#5CA9DB] font-semibold tracking-widest uppercase">
              GLOBAL SOLUTIONS DELIVERED LOCALLY
            </p>

            <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed max-w-sm">
              Centro de Innovación Industrial en Inteligencia Artificial. El ecosistema público-privado que transforma el potencial algorítmico en productividad fabril tangible.
            </p>

            {/* Verified Physical Address at PIIT (Recommendation UX #9 from report) */}
            <div className="pt-2 text-xs font-mono text-[#D6D8DC] space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5CA9DB] shrink-0 mt-0.5" />
                <span>
                  Autopista al Aeropuerto Km 9.5, Parque de Investigación e Innovación Tecnológica (PIIT), C.P. 66629, Apodaca, Nuevo León, México.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#5CA9DB] shrink-0" />
                <a href="mailto:contacto@ciiia.mx" className="hover:text-[#5CA9DB] transition-colors">
                  contacto@ciiia.mx
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Capacidades & Soluciones */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              CAPACIDADES
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#A8ACB3]">
              <li>
                <button onClick={() => onNavigate('ai-execution')} className="hover:text-white transition-colors">
                  AI Execution (Proyectos)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-lab')} className="hover:text-white transition-colors">
                  AI Lab / Prototyping
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('academy')} className="hover:text-white transition-colors">
                  CII.IA Academy (NVIDIA DLI)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-execution')} className="hover:text-white transition-colors">
                  HIVA Agents Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai-execution')} className="hover:text-white transition-colors">
                  Programa IA para PYMES
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ecosistema & Red */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              ECOSISTEMA
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#A8ACB3]">
              <li>
                <button onClick={() => onNavigate('ecosistema')} className="hover:text-white transition-colors">
                  Tecnológico de Monterrey
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecosistema')} className="hover:text-white transition-colors">
                  UANL (Universidad de N.L.)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecosistema')} className="hover:text-white transition-colors">
                  CAINTRA Nuevo León
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecosistema')} className="hover:text-white transition-colors">
                  Secretaría de Economía N.L.
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ecosistema')} className="hover:text-white transition-colors">
                  Clústeres Automotriz & TI
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Normativa & Contacto */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              CERTIFICACIONES
            </h4>
            <div className="space-y-3 text-xs font-mono text-[#A8ACB3]">
              <div className="p-2.5 rounded glass-chip">
                <div className="text-white font-semibold">ISO/IEC 42001</div>
                <div className="text-[10px] text-[#6E737C]">AI Management System</div>
              </div>
              <div className="p-2.5 rounded glass-chip">
                <div className="text-white font-semibold">NVIDIA DLI Institute</div>
                <div className="text-[10px] text-[#6E737C]">Centro Oficial Certificado</div>
              </div>
              <button
                onClick={onOpenContact}
                className="w-full py-2 glass-chip hover:bg-[#5CA9DB] hover:border-[#5CA9DB] hover:text-[#0A0A0B] text-[#8CC6EC] rounded text-[11px] font-semibold transition-all glow-accent-sm"
              >
                CONTACTO DIRECTO →
              </button>
            </div>
          </div>
        </div>

        {/* Flowing quick-navigation marquee */}
        <div className="hidden sm:block h-56 border-b border-white/[0.08] mb-8">
          <FlowingMenu
            items={[
              { text: 'AI EXECUTION', image: MONOCHROME_TILE, onClick: () => onNavigate('ai-execution') },
              { text: 'AI LAB / PIIT', image: MONOCHROME_TILE, onClick: () => onNavigate('ai-lab') },
              { text: 'CII.IA ACADEMY', image: MONOCHROME_TILE, onClick: () => onNavigate('academy') },
              { text: 'ECOSISTEMA', image: MONOCHROME_TILE, onClick: () => onNavigate('ecosistema') },
            ]}
          />
        </div>

        {/* Bottom copyright and legal line */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#6E737C]">
          <div>
            © {new Date().getFullYear()} CII.IA® · Centro de Innovación Industrial en Inteligencia Artificial. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Aviso de Privacidad</span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">Términos de Servicio</span>
            <span>·</span>
            <span className="text-[#5CA9DB]">Fase 2 Rediseño Web High-Fidelity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
