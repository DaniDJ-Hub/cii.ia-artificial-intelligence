import React from 'react';

interface CiiiaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
}

export const CiiiaLogo: React.FC<CiiiaLogoProps> = ({ 
  className = '', 
  size = 'md',
  showSubtitle = true 
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
    hero: 'h-14 md:h-16'
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision continuous-line geometric monogram of CII.IA */}
      <svg 
        viewBox="0 0 120 38" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeClasses[size]} w-auto text-white`}
        aria-label="Logotipo oficial de CII.IA"
      >
        {/* 'C' shape with continuous rounded line */}
        <path 
          d="M 28 8 C 16 8 8 13 8 19 C 8 25 16 30 28 30" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Dot 1 */}
        <circle cx="37" cy="28" r="2.5" fill="#5CA9DB" />
        
        {/* First 'I' */}
        <line x1="47" y1="8" x2="47" y2="30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* Second 'I' */}
        <line x1="58" y1="8" x2="58" y2="30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* Dot 2 */}
        <circle cx="67" cy="28" r="2.5" fill="#5CA9DB" />
        
        {/* 'I' in IA */}
        <line x1="77" y1="8" x2="77" y2="30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        
        {/* 'A' with continuous line */}
        <path 
          d="M 88 30 L 98 8 L 108 30" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <line x1="92" y1="22" x2="104" y2="22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
        
        {/* Registered symbol */}
        <circle cx="114" cy="9" r="3.5" stroke="#A8ACB3" strokeWidth="0.8" fill="none" />
        <text x="114" y="11" fill="#A8ACB3" fontSize="4.5" fontFamily="monospace" textAnchor="middle">R</text>
      </svg>

      {showSubtitle && (
        <div className="hidden sm:flex flex-col border-l border-[#42464E] pl-2.5 py-0.5 justify-center">
          <span className="text-[10px] font-mono tracking-[0.2em] text-[#A8ACB3] uppercase leading-none">
            ARTIFICIAL INTELLIGENCE
          </span>
          <span className="text-[9px] font-mono tracking-[0.15em] text-[#5CA9DB] font-medium leading-tight mt-0.5">
            EXECUTION HUB
          </span>
        </div>
      )}
    </div>
  );
};
