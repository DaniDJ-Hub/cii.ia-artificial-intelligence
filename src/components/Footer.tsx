import React from 'react';
import { CiiiaLogo } from './CiiiaLogo';
import { NavigationPage } from '../types';
import { MapPin, Mail, Phone, ExternalLink, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenContact }) => {
  return (
    <footer className="bg-[#0A0A0B] border-t border-[#26282D] pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#26282D]">
          {/* Col 1 & 2: Brand & Physical Location */}
          <div className="lg:col-span-2 space-y-4">
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
              <div className="p-2.5 rounded bg-[#141518] border border-[#26282D]">
                <div className="text-white font-semibold">ISO/IEC 42001</div>
                <div className="text-[10px] text-[#6E737C]">AI Management System</div>
              </div>
              <div className="p-2.5 rounded bg-[#141518] border border-[#26282D]">
                <div className="text-white font-semibold">NVIDIA DLI Institute</div>
                <div className="text-[10px] text-[#6E737C]">Centro Oficial Certificado</div>
              </div>
              <button
                onClick={onOpenContact}
                className="w-full py-2 bg-[#1D1F23] hover:bg-[#5CA9DB] hover:text-[#0A0A0B] text-[#8CC6EC] rounded text-[11px] font-semibold transition-colors"
              >
                CONTACTO DIRECTO →
              </button>
            </div>
          </div>
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
