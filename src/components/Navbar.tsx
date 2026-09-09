import React, { useState, useEffect } from 'react';
import { CiiiaLogo } from './CiiiaLogo';
import { NavigationPage } from '../types';
import { 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  Building2, 
  HardDrive, 
  Award,
  Globe,
  Layers
} from 'lucide-react';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ES' | 'EN'>('ES');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#26282D] py-3.5 shadow-2xl' 
          : 'bg-gradient-to-b from-[#0A0A0B]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Physical Location Tag */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5CA9DB] rounded p-1 transition-transform hover:opacity-90 active:scale-95"
              aria-label="Ir al inicio de CII.IA"
            >
              <CiiiaLogo size="md" />
            </button>
            <div className="hidden xl:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#141518] border border-[#26282D] text-[11px] font-mono text-[#A8ACB3]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>PARQUE PIIT · MONTERREY, MÉXICO</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-[13px] font-mono tracking-wider text-[#D6D8DC]">
            {/* Qué hacemos with dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button 
                onClick={() => onNavigate('ai-execution')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded transition-colors hover:text-white hover:bg-[#141518]/60 ${
                  currentPage === 'ai-execution' ? 'text-[#5CA9DB] font-semibold bg-[#141518]' : ''
                }`}
              >
                <span>SOLUCIONES</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A8ACB3]" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-[#141518] border border-[#26282D] rounded-xl shadow-2xl p-2.5 z-50 text-left backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <button
                    onClick={() => { onNavigate('ai-execution'); setServicesDropdownOpen(false); }}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#1D1F23] transition-colors group"
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-[#5CA9DB] flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-[#5CA9DB]" />
                        AI EXECUTION
                      </span>
                      <span className="text-[9px] bg-[#0F2E42] text-[#8CC6EC] px-1.5 py-0.5 rounded font-mono">Planta</span>
                    </div>
                    <div className="text-[11px] text-[#A8ACB3] font-sans mt-1 leading-snug">
                      Proyectos a la medida, MLOps e integración en líneas de ensamble.
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('ai-lab'); setServicesDropdownOpen(false); }}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#1D1F23] transition-colors group"
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-[#5CA9DB] flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-[#5CA9DB]" />
                        AI LAB & PROTOTIPADO
                      </span>
                      <span className="text-[9px] bg-[#141518] border border-[#26282D] text-[#A8ACB3] px-1.5 py-0.5 rounded font-mono">PIIT</span>
                    </div>
                    <div className="text-[11px] text-[#A8ACB3] font-sans mt-1 leading-snug">
                      Celda robótica Fanuc/UR, drones con LiDAR y clusters NVIDIA.
                    </div>
                  </button>

                  <button
                    onClick={() => { onNavigate('academy'); setServicesDropdownOpen(false); }}
                    className="w-full text-left p-3 rounded-lg hover:bg-[#1D1F23] transition-colors group"
                  >
                    <div className="text-xs font-semibold text-white group-hover:text-[#5CA9DB] flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Award className="w-3.5 h-3.5 text-emerald-400" />
                        CII.IA ACADEMY
                      </span>
                      <span className="text-[9px] bg-emerald-950/60 border border-emerald-900 text-emerald-300 px-1.5 py-0.5 rounded font-mono">NVIDIA DLI</span>
                    </div>
                    <div className="text-[11px] text-[#A8ACB3] font-sans mt-1 leading-snug">
                      Certificaciones oficiales y formación técnica para ingeniería.
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button 
              onClick={() => onNavigate('ai-lab')}
              className={`px-3 py-2 rounded transition-colors hover:text-white hover:bg-[#141518]/60 ${
                currentPage === 'ai-lab' ? 'text-[#5CA9DB] font-semibold bg-[#141518]' : ''
              }`}
            >
              AI LAB
            </button>

            <button 
              onClick={() => onNavigate('casos')}
              className={`px-3 py-2 rounded transition-colors hover:text-white hover:bg-[#141518]/60 ${
                currentPage === 'casos' ? 'text-[#5CA9DB] font-semibold bg-[#141518]' : ''
              }`}
            >
              CASOS DE ÉXITO
            </button>

            <button 
              onClick={() => onNavigate('ecosistema')}
              className={`px-3 py-2 rounded transition-colors hover:text-white hover:bg-[#141518]/60 ${
                currentPage === 'ecosistema' ? 'text-[#5CA9DB] font-semibold bg-[#141518]' : ''
              }`}
            >
              ECOSISTEMA
            </button>
          </nav>

          {/* Right Action Tools: Language + Primary CTA */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="hidden sm:flex items-center bg-[#141518] rounded border border-[#26282D] text-[11px] font-mono p-0.5">
              <button 
                onClick={() => setCurrentLang('ES')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  currentLang === 'ES' ? 'bg-[#26282D] text-white font-bold' : 'text-[#A8ACB3] hover:text-white'
                }`}
              >
                ES
              </button>
              <button 
                onClick={() => setCurrentLang('EN')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  currentLang === 'EN' ? 'bg-[#26282D] text-white font-bold' : 'text-[#A8ACB3] hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Primary CTA button */}
            <button
              id="navbar-primary-cta"
              onClick={onOpenContact}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(92,169,219,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-95"
            >
              <span>AGENDAR SESIÓN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#5CA9DB] focus:outline-none"
              aria-label="Abrir menú de navegación móvil"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0B]/98 border-b border-[#26282D] px-6 py-6 text-left space-y-4 shadow-2xl backdrop-blur-xl animate-in fade-in duration-200">
          <div className="space-y-1">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 rounded text-sm font-mono ${
                currentPage === 'home' ? 'text-[#5CA9DB] bg-[#141518]' : 'text-white'
              }`}
            >
              INICIO
            </button>
            <button
              onClick={() => { onNavigate('ai-execution'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 rounded text-sm font-mono ${
                currentPage === 'ai-execution' ? 'text-[#5CA9DB] bg-[#141518]' : 'text-white'
              }`}
            >
              SOLUCIONES & AI EXECUTION
            </button>
            <button
              onClick={() => { onNavigate('ai-lab'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 rounded text-sm font-mono ${
                currentPage === 'ai-lab' ? 'text-[#5CA9DB] bg-[#141518]' : 'text-white'
              }`}
            >
              AI LAB / PROTOTIPADO EN PIIT
            </button>
            <button
              onClick={() => { onNavigate('academy'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 rounded text-sm font-mono ${
                currentPage === 'academy' ? 'text-[#5CA9DB] bg-[#141518]' : 'text-white'
              }`}
            >
              CII.IA ACADEMY (NVIDIA DLI)
            </button>
            <button
              onClick={() => { onNavigate('casos'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 rounded text-sm font-mono ${
                currentPage === 'casos' ? 'text-[#5CA9DB] bg-[#141518]' : 'text-white'
              }`}
            >
              CASOS DE ÉXITO
            </button>
            <button
              onClick={() => { onNavigate('ecosistema'); setMobileMenuOpen(false); }}
              className={`block w-full text-left py-2.5 px-3 rounded text-sm font-mono ${
                currentPage === 'ecosistema' ? 'text-[#5CA9DB] bg-[#141518]' : 'text-white'
              }`}
            >
              ECOSISTEMA & SOCIOS
            </button>
          </div>

          <div className="pt-4 border-t border-[#26282D] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[#A8ACB3]">
              <Globe className="w-4 h-4 text-[#5CA9DB]" />
              <button 
                onClick={() => setCurrentLang('ES')} 
                className={currentLang === 'ES' ? 'text-white font-bold' : ''}
              >
                ES
              </button>
              <span>/</span>
              <button 
                onClick={() => setCurrentLang('EN')} 
                className={currentLang === 'EN' ? 'text-white font-bold' : ''}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
              className="h-10 px-5 rounded bg-[#5CA9DB] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase"
            >
              AGENDAR SESIÓN
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
