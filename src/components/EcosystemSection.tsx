import React, { useState } from 'react';
import { FOUNDING_PARTNERS, ALL_PARTNERS } from '../data/ciiiaData';
import { Building2, Shield, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';

interface EcosystemSectionProps {
  onOpenContact: () => void;
  onNavigateToEcosystemPage: () => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({ 
  onOpenContact,
  onNavigateToEcosystemPage 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Aliados (50+)' },
    { id: 'Shareholders', label: 'Socios Fundadores' },
    { id: 'Tech', label: 'Tecnología Global' },
    { id: 'Academy & Research', label: 'Clústeres & Academia' },
    { id: 'AI Specialized', label: 'Especializados & Robótica' },
    { id: 'Platforms', label: 'Plataformas & PIIT' },
  ];

  const filteredPartners = ALL_PARTNERS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <section 
      id="ecosistema"
      className="py-20 sm:py-28 bg-[#141518] border-b border-[#26282D] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A0A0B] border border-[#26282D] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]" />
            <span className="text-[11px] font-mono tracking-widest text-[#5CA9DB] uppercase font-semibold">
              RESPALDO INSTITUCIONAL & TRIPLE HÉLICE
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            NO SOMOS UN PROVEEDOR. <br />
            <span className="text-[#5CA9DB]">SOMOS UNA RED ARTICULADA.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans leading-relaxed">
            Más de 50 organizaciones aliadas y 5 socios fundadores que brindan certidumbre jurídica, continuidad a largo plazo y acceso a infraestructura de clase mundial.
          </p>
        </div>

        {/* 5 Founding Partners Spotlight */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-xs font-bold tracking-widest text-[#5CA9DB] uppercase">
              LOS 5 SOCIOS FUNDADORES
            </h3>
            <span className="text-xs font-mono text-[#6E737C]">Gobernanza & Consejo Directivo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOUNDING_PARTNERS.map((partner, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-xl bg-[#0A0A0B] border border-[#26282D] hover:border-[#5CA9DB] transition-all text-left flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-[#8CC6EC] px-2.5 py-0.5 rounded-full bg-[#141518] border border-[#26282D] font-semibold">
                      SOCIO 0{idx + 1}
                    </span>
                    <Building2 className="w-4 h-4 text-[#5CA9DB]" />
                  </div>

                  <h4 className="font-display text-lg font-bold text-white uppercase tracking-tight mb-3">
                    {partner.name}
                  </h4>

                  <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
                    {partner.roleInEcosystem}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#26282D] flex items-center gap-2 text-[11px] font-mono text-[#5CA9DB]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Participación Activa en Consejo</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-left">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#0A0A0B] text-[#5CA9DB] font-bold border border-[#3D8FC4]/50 shadow-sm'
                  : 'text-[#A8ACB3] hover:text-white bg-[#0A0A0B]/60 border border-[#26282D]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Partner Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredPartners.map((partner, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#0A0A0B] border border-[#26282D] hover:border-[#42464E] text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-white">{partner.name}</span>
                  <span className="text-[10px] font-mono text-[#8CC6EC] px-2 py-0.5 rounded bg-[#141518]">
                    {partner.category}
                  </span>
                </div>
                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed">
                  {partner.roleInEcosystem}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Alliance banner */}
        <div className="p-8 rounded-xl bg-[#0A0A0B] border border-[#26282D] flex flex-wrap items-center justify-between gap-6 text-left">
          <div>
            <span className="text-xs font-mono text-[#5CA9DB] uppercase tracking-wider font-semibold">
              MEMBRESÍAS & VINCULACIÓN
            </span>
            <h4 className="font-display text-2xl font-bold text-white uppercase mt-1">
              ¿TU EMPRESA FORMA PARTE DEL ECOSISTEMA?
            </h4>
            <p className="text-xs sm:text-sm text-[#A8ACB3] font-sans mt-1 max-w-xl">
              Accede a horas de laboratorio en el PIIT, becas NVIDIA DLI, transferencia tecnológica y pruebas de concepto asistidas.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="h-11 px-6 rounded bg-[#5CA9DB] hover:bg-[#8CC6EC] text-[#0A0A0B] text-xs font-mono font-bold tracking-wider uppercase transition-colors flex items-center gap-2"
          >
            <span>POSTULAR EMPRESA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
