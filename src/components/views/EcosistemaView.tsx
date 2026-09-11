import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { EcosystemSection } from '../EcosystemSection';
import { ALL_PARTNERS } from '../../data/ciiiaData';
import InfiniteSpiral from '../../../components/ui/InfiniteSpiral';
import { HeroParallax } from '../../../components/ui/HeroParallax';

const PARTNER_LOGO_COLORS = ['#5CA9DB', '#29729F', '#8CC6EC', '#0F2E42', '#3D8FC4', '#1D1F23'];

const partnerTile = (name: string, color: string): string => {
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="${color}"/><text x="50%" y="55%" font-family="Arial" font-size="90" font-weight="700" fill="#0A0A0B" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const heroParallaxProducts = ALL_PARTNERS.slice(0, 10).map((p, i) => ({
  title: p.name,
  link: '#',
  thumbnail: partnerTile(p.name, PARTNER_LOGO_COLORS[i % PARTNER_LOGO_COLORS.length]),
}));

interface EcosistemaViewProps {
  onBackToHome: () => void;
  onOpenContact: () => void;
}

export const EcosistemaView: React.FC<EcosistemaViewProps> = ({
  onBackToHome,
  onOpenContact
}) => {
  return (
    <div className="pt-24 pb-20 bg-[#0A0A0B] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8ACB3] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>REGRESAR AL HOMEPAGE</span>
        </button>

        {/* Parallax wall of allied logos, scroll-driven 3D perspective rows */}
        <HeroParallax
          products={heroParallaxProducts}
          heading="MÁS DE 50 ORGANIZACIONES ALIADAS"
          subheading="Tecnología, academia, gobierno y clústeres industriales, articulados en un mismo ecosistema."
        />

        <EcosystemSection
          onOpenContact={onOpenContact}
          onNavigateToEcosystemPage={() => {}}
        />

        {/* Spiraling gallery of the wider network */}
        <div className="mt-4 mb-16">
          <h2 className="font-mono text-xs font-bold tracking-widest text-[#5CA9DB] uppercase mb-6">
            LA RED COMPLETA, EN MOVIMIENTO
          </h2>
          <div className="h-[420px] rounded-xl glass-panel overflow-hidden">
            <InfiniteSpiral
              items={ALL_PARTNERS.map((p, i) => ({
                src: partnerTile(p.name, PARTNER_LOGO_COLORS[i % PARTNER_LOGO_COLORS.length]),
                alt: p.name,
                label: p.name,
              }))}
              cardWidth={84}
              cardHeight={84}
              radius={150}
              grayscale={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
