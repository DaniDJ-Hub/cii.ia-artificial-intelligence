import React, { useState, useRef, useEffect } from 'react';
import { Activity, ShieldAlert, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

interface TelemetryPoint {
  t: number;
  val: number;
  temp: number;
  isAnomaly?: boolean;
  status: string;
}

export const HeroDataVisualization: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'vibration' | 'temperature' | 'fft'>('vibration');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isLive, setIsLive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate realistic industrial vibration time-series data with 2 anomaly clusters
  const points: TelemetryPoint[] = [
    { t: 0, val: 3.2, temp: 42.1, status: 'NORMAL' },
    { t: 10, val: 3.4, temp: 42.3, status: 'NORMAL' },
    { t: 20, val: 3.1, temp: 42.0, status: 'NORMAL' },
    { t: 30, val: 3.5, temp: 42.8, status: 'NORMAL' },
    { t: 40, val: 4.8, temp: 44.1, status: 'NORMAL' },
    { t: 50, val: 5.6, temp: 45.3, status: 'EVALUANDO' },
    { t: 60, val: 8.9, temp: 51.2, isAnomaly: true, status: 'ALERTA ISO 10816' },
    { t: 70, val: 9.4, temp: 53.6, isAnomaly: true, status: 'FATIGA PREVENTIVA' },
    { t: 80, val: 4.9, temp: 48.0, status: 'POST-CORRECCIÓN' },
    { t: 90, val: 3.6, temp: 45.2, status: 'NORMAL' },
    { t: 100, val: 3.3, temp: 43.1, status: 'NORMAL' },
    { t: 110, val: 3.7, temp: 43.4, status: 'NORMAL' },
    { t: 120, val: 7.2, temp: 49.8, status: 'MICRO-PICOS' },
    { t: 130, val: 9.8, temp: 58.4, isAnomaly: true, status: 'DESALINEACIÓN DETECTADA' },
    { t: 140, val: 4.2, temp: 46.2, status: 'NORMALIZANDO' },
    { t: 150, val: 3.5, temp: 43.0, status: 'ESTABLE' },
  ];

  // SVG dimensions
  const svgWidth = 560;
  const svgHeight = 220;
  const padX = 40;
  const padY = 30;

  const minVal = 0;
  const maxVal = 12;

  const getX = (index: number) => padX + (index / (points.length - 1)) * (svgWidth - padX * 2);
  const getY = (val: number) => svgHeight - padY - ((val - minVal) / (maxVal - minVal)) * (svgHeight - padY * 2);

  // Generate smooth SVG path
  const pathD = points.reduce((acc, pt, i) => {
    const x = getX(i);
    const y = getY(pt.val);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  // Fill path for subtle gradient underneath
  const areaD = `${pathD} L ${getX(points.length - 1)} ${svgHeight - padY} L ${getX(0)} ${svgHeight - padY} Z`;

  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[6];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, (mouseX - padX) / (svgWidth - padX * 2)));
    const idx = Math.round(ratio * (points.length - 1));
    setHoverIndex(idx);
  };

  return (
    <div 
      ref={containerRef}
      id="hero-data-visualization"
      className="relative w-full rounded-lg border border-[#26282D] bg-[#141518]/90 backdrop-blur-sm p-5 shadow-2xl overflow-hidden"
    >
      {/* Structural technical header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26282D] pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5CA9DB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5CA9DB]"></span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-wider text-white font-semibold uppercase">
                TELEMETRÍA EN PRODUCCIÓN · CASO 02
              </span>
              <span className="text-[9px] font-mono bg-[#0F2E42] text-[#8CC6EC] px-1.5 py-0.5 rounded border border-[#29729F]/40">
                PIIT REAL-DATA
              </span>
            </div>
            <p className="text-[11px] text-[#A8ACB3] font-mono">
              Turbocompresor 450kW · Frecuencia de muestreo 10 kHz
            </p>
          </div>
        </div>

        {/* Channel selectors */}
        <div className="flex items-center gap-1 bg-[#0A0A0B] p-1 rounded border border-[#26282D]">
          <button
            onClick={() => setActiveChannel('vibration')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeChannel === 'vibration' 
                ? 'bg-[#1D1F23] text-white font-medium border border-[#42464E]' 
                : 'text-[#A8ACB3] hover:text-white'
            }`}
          >
            Vibración RMS
          </button>
          <button
            onClick={() => setActiveChannel('temperature')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeChannel === 'temperature' 
                ? 'bg-[#1D1F23] text-white font-medium border border-[#42464E]' 
                : 'text-[#A8ACB3] hover:text-white'
            }`}
          >
            Temperatura (°C)
          </button>
          <button
            onClick={() => setActiveChannel('fft')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeChannel === 'fft' 
                ? 'bg-[#1D1F23] text-white font-medium border border-[#42464E]' 
                : 'text-[#A8ACB3] hover:text-white'
            }`}
          >
            FFT Espectral
          </button>
        </div>
      </div>

      {/* Main interactive SVG Time-Series Chart */}
      <div className="relative">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto cursor-crosshair select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIndex(null)}
          aria-label="Gráfica de telemetría y detección de anomalías"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5CA9DB" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#5CA9DB" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#29729F" />
              <stop offset="45%" stopColor="#5CA9DB" />
              <stop offset="70%" stopColor="#8CC6EC" />
              <stop offset="100%" stopColor="#5CA9DB" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[2, 4, 6, 8, 10].map((level) => {
            const y = getY(level);
            return (
              <g key={level}>
                <line
                  x1={padX}
                  y1={y}
                  x2={svgWidth - padX}
                  y2={y}
                  stroke="#26282D"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padX - 8}
                  y={y + 3}
                  fill="#6E737C"
                  fontSize="9"
                  fontFamily="'Source Code Pro', monospace"
                  textAnchor="end"
                >
                  {level}g
                </text>
              </g>
            );
          })}

          {/* Threshold alert line ISO 10816 */}
          <line
            x1={padX}
            y1={getY(7.1)}
            x2={svgWidth - padX}
            y2={getY(7.1)}
            stroke="#F87171"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
          <text
            x={svgWidth - padX - 4}
            y={getY(7.1) - 4}
            fill="#F87171"
            fontSize="8"
            fontFamily="'Source Code Pro', monospace"
            textAnchor="end"
          >
            LÍMITE CRÍTICO ISO 10816 (7.1 mm/s)
          </text>

          {/* Fill area */}
          <path d={areaD} fill="url(#areaGradient)" />

          {/* Main stroke line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Anomaly nodes and indicators */}
          {points.map((pt, i) => {
            const x = getX(i);
            const y = getY(pt.val);

            if (pt.isAnomaly) {
              return (
                <g key={i} className="animate-pulse">
                  <circle cx={x} cy={y} r="8" fill="#0F2E42" stroke="#5CA9DB" strokeWidth="1.5" />
                  <circle cx={x} cy={y} r="3.5" fill="#FFFFFF" />
                  <text
                    x={x}
                    y={y - 12}
                    fill="#5CA9DB"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="'Source Code Pro', monospace"
                    textAnchor="middle"
                  >
                    ANOMALÍA
                  </text>
                </g>
              );
            }

            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill="#42464E"
                className="hover:fill-white transition-colors"
              />
            );
          })}

          {/* Active cursor tracking vertical needle */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padY}
                x2={getX(hoverIndex)}
                y2={svgHeight - padY}
                stroke="#5CA9DB"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(points[hoverIndex].val)}
                r="5"
                fill="#5CA9DB"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>

        {/* Interactive telemetry readout strip */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#26282D] text-left">
          <div className="bg-[#0A0A0B] p-2.5 rounded border border-[#26282D]">
            <div className="text-[10px] font-mono text-[#A8ACB3] uppercase">Aceleración RMS</div>
            <div className="text-lg font-mono text-white font-semibold flex items-baseline gap-1">
              <span className="font-data-numeric text-[#5CA9DB]">{activePoint.val.toFixed(1)}</span>
              <span className="text-[10px] text-[#A8ACB3]">mm/s²</span>
            </div>
          </div>

          <div className="bg-[#0A0A0B] p-2.5 rounded border border-[#26282D]">
            <div className="text-[10px] font-mono text-[#A8ACB3] uppercase">Temp. Rodamiento</div>
            <div className="text-lg font-mono text-white font-semibold flex items-baseline gap-1">
              <span className="font-data-numeric text-white">{activePoint.temp.toFixed(1)}</span>
              <span className="text-[10px] text-[#A8ACB3]">°C</span>
            </div>
          </div>

          <div className="bg-[#0A0A0B] p-2.5 rounded border border-[#26282D]">
            <div className="text-[10px] font-mono text-[#A8ACB3] uppercase">Diagnóstico ML</div>
            <div className="text-xs font-mono text-white font-medium truncate mt-1">
              {activePoint.isAnomaly ? (
                <span className="text-[#5CA9DB] font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> ALERTA PREVENTIVA
                </span>
              ) : (
                <span className="text-[#A8ACB3] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> OPERACIÓN ESTABLE
                </span>
              )}
            </div>
          </div>

          <div className="bg-[#0A0A0B] p-2.5 rounded border border-[#26282D]">
            <div className="text-[10px] font-mono text-[#A8ACB3] uppercase">Horizonte de Falla</div>
            <div className="text-lg font-mono text-white font-semibold flex items-baseline gap-1">
              <span className="font-data-numeric text-[#8CC6EC]">14</span>
              <span className="text-[10px] text-[#A8ACB3]">DÍAS DE ANTELACIÓN</span>
            </div>
          </div>
        </div>

        {/* Footnote matching design principles: real evidence */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-[#6E737C] font-mono">
          <span>* Mueve el cursor sobre la serie temporal para inspeccionar puntos de telemetría.</span>
          <span className="text-[#5CA9DB] hidden sm:inline">Algoritmo MLOps CII.IA · Latencia 12ms</span>
        </div>
      </div>
    </div>
  );
};
