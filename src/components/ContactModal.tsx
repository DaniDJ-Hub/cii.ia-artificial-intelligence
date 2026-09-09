import React, { useState } from 'react';
import { X, ArrowRight, CheckCircle2, Building, Mail, User, Phone, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  preloadedCaseTitle?: string | null;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  preloadedCaseTitle
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStage, setSelectedStage] = useState<string>('piloto-atorado');
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    email: '',
    phone: '',
    details: preloadedCaseTitle ? `Interés específico en: ${preloadedCaseTitle}` : '',
  });

  if (!isOpen) return null;

  const stageOptions = [
    {
      id: 'no-empezado',
      title: 'No he empezado',
      quote: '«Me pidieron explorar IA en la empresa y no sé por dónde empezar con fundamentos técnicos.»',
      recommended: 'Workshop IA + Innovación · Masterclass Ejecutiva'
    },
    {
      id: 'ideas-sueltas',
      title: 'Tengo iniciativas sueltas',
      quote: '«Tenemos varias ideas y demos en distintas áreas, pero ninguna avanza a plan de negocio.»',
      recommended: 'Roadmap de Adopción & Blueprint de Arquitectura'
    },
    {
      id: 'soy-pyme',
      title: 'Soy una PYME Industrial',
      quote: '«No tengo equipo de datos propio ni presupuesto de corporativo multinacional.»',
      recommended: 'Programa de Innovación Empresarial con IA para PYMES'
    },
    {
      id: 'piloto-atorado',
      title: 'Tengo un piloto atorado',
      quote: '«El algoritmo funcionó en la demo de la laptop, pero no opera en la línea de ensamble.»',
      recommended: 'AI Execution · Proyectos a la medida & AI Lab PIIT'
    },
    {
      id: 'capacitar-equipo',
      title: 'Necesito capacitar a mi equipo',
      quote: '«Queremos desarrollar capacidades técnicas internas de ingeniería de datos y MLOps.»',
      recommended: 'CII.IA Academy · Certificaciones oficiales NVIDIA DLI'
    },
    {
      id: 'quiero-aliarme',
      title: 'Quiero aliarme al ecosistema',
      quote: '«Represento a un clúster, universidad, gobierno o empresa de tecnología industrial.»',
      recommended: 'Membresías del Ecosistema CII.IA & Vinculación'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Show confirmation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl rounded-xl bg-[#141518] border border-[#26282D] shadow-2xl p-6 sm:p-10 my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-lg bg-[#1D1F23] text-[#A8ACB3] hover:text-white transition-colors"
          aria-label="Cerrar formulario de contacto"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar (Recommendation UX #1: Two-step qualification) */}
        {step < 3 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-[#5CA9DB] font-semibold">
                PASO 0{step} DE 02: {step === 1 ? 'ETAPA DE MADUREZ' : 'DATOS DEL CONTACTO'}
              </span>
              <span className="text-[#6E737C]">Cualificación Técnica</span>
            </div>
            <div className="w-full bg-[#0A0A0B] h-1 rounded overflow-hidden">
              <div 
                className="bg-[#5CA9DB] h-full transition-all duration-300"
                style={{ width: step === 1 ? '50%' : '100%' }}
              />
            </div>
          </div>
        )}

        {/* Step 1: "¿En qué etapa estás?" */}
        {step === 1 && (
          <div>
            <span className="text-xs font-mono text-[#5CA9DB] uppercase tracking-wider font-semibold">
              CUESTIONARIO DE ENFOQUE
            </span>
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mt-1 mb-2">
              ¿EN QUÉ ETAPA SE ENCUENTRA TU EMPRESA?
            </h3>
            <p className="text-xs text-[#A8ACB3] font-sans mb-6">
              Selecciona la situación que mejor describe tu reto actual para asignarte al director técnico correspondiente.
            </p>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
              {stageOptions.map((opt) => {
                const isSelected = selectedStage === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedStage(opt.id)}
                    className={`w-full p-3.5 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'bg-[#1D1F23] border-[#5CA9DB] shadow-sm'
                        : 'bg-[#0A0A0B] border-[#26282D] hover:border-[#42464E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-mono text-xs font-bold uppercase ${
                        isSelected ? 'text-[#5CA9DB]' : 'text-white'
                      }`}>
                        {opt.title}
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-[#5CA9DB] bg-[#5CA9DB]' : 'border-[#42464E]'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                      </div>
                    </div>
                    <p className="font-quote-style text-xs text-[#D6D8DC] italic mb-1.5">
                      {opt.quote}
                    </p>
                    <div className="text-[10px] font-mono text-[#8CC6EC]">
                      Ruta sugerida: {opt.recommended}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#26282D] flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>CONTINUAR AL PASO 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Form fields tailored */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-mono text-[#5CA9DB] uppercase tracking-wider font-semibold">
                ETAPA SELECCIONADA: {stageOptions.find(o => o.id === selectedStage)?.title}
              </span>
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight mt-1 mb-1">
                COMPLETA TUS DATOS INSTITUCIONALES
              </h3>
              <p className="text-xs text-[#A8ACB3] font-sans mb-4">
                La sesión ejecutiva se agenda directamente con ingenieros del CII.IA bajo acuerdo de confidencialidad (NDA).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-[#A8ACB3] mb-1">Nombre completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6E737C] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ing. Carlos Garza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0A0A0B] border border-[#26282D] rounded px-3 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-[#5CA9DB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A8ACB3] mb-1">Puesto / Cargo *</label>
                <input
                  type="text"
                  required
                  placeholder="Director de Operaciones / Planta"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-[#26282D] rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#5CA9DB]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A8ACB3] mb-1">Empresa / Organización *</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#6E737C] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Grupo Industrial S.A. de C.V."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#0A0A0B] border border-[#26282D] rounded px-3 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-[#5CA9DB]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#A8ACB3] mb-1">Correo institucional *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6E737C] absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="cgarza@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0A0A0B] border border-[#26282D] rounded px-3 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-[#5CA9DB]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A8ACB3] mb-1">Teléfono de contacto directo</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#6E737C] absolute left-3 top-3" />
                <input
                  type="tel"
                  placeholder="+52 (81) 8000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0A0A0B] border border-[#26282D] rounded px-3 py-2.5 pl-9 text-xs text-white focus:outline-none focus:border-[#5CA9DB]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[#A8ACB3] mb-1">Describe brevemente tu reto u objetivo de planta</label>
              <textarea
                rows={3}
                placeholder="Ejemplo: Queremos reducir paros en la línea de ensamble #2 o entrenar a 15 técnicos con NVIDIA DLI..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-[#0A0A0B] border border-[#26282D] rounded p-2.5 text-xs text-white focus:outline-none focus:border-[#5CA9DB]"
              />
            </div>

            <div className="pt-4 border-t border-[#26282D] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-mono text-[#A8ACB3] hover:text-white"
              >
                ← Volver al paso 1
              </button>

              <button
                type="submit"
                className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <span>CONFIRMAR Y AGENDAR SESIÓN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Confirmation message with real expectation */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#0F2E42] border border-[#5CA9DB] flex items-center justify-center mx-auto mb-6 text-[#5CA9DB]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono text-[#5CA9DB] font-bold uppercase tracking-wider block mb-2">
              SOLICITUD REGISTRADA EN EL HUB
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-4">
              HEMOS RECIBIDO TU INFORMACIÓN
            </h3>

            <p className="text-xs sm:text-sm text-[#D6D8DC] font-sans max-w-md mx-auto leading-relaxed mb-6">
              Un director técnico del CII.IA con especialidad en tu sector revisará los detalles y te contactará en menos de 24 horas hábiles para coordinar la sesión o la visita al laboratorio en el PIIT.
            </p>

            <div className="p-4 rounded bg-[#0A0A0B] border border-[#26282D] max-w-md mx-auto text-left text-xs font-mono text-[#A8ACB3] mb-6 space-y-1">
              <div>Contacto: <span className="text-white">{formData.email || 'correo registrado'}</span></div>
              <div>Empresa: <span className="text-white">{formData.company || 'empresa registrada'}</span></div>
              <div>Sede: <span className="text-[#5CA9DB]">PIIT Monterrey, Nuevo León</span></div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded bg-[#1D1F23] hover:bg-[#26282D] text-white text-xs font-mono font-semibold transition-colors"
            >
              CERRAR Y REGRESAR AL SITIO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
