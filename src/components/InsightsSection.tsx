import React from 'react';
import { INSIGHT_ARTICLES } from '../data/ciiiaData';
import { BookOpen, ArrowRight, Calendar, Clock, Sparkles } from 'lucide-react';
import { ExpandableCardList } from '../../components/ui/ExpandableCard';

const INSIGHT_COVER = 'https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?q=80&w=900&auto=format&fit=crop';

export const InsightsSection: React.FC = () => {
  return (
    <section 
      id="insights"
      className="py-24 sm:py-32 bg-[#141518] relative"
    >
      <div className="absolute top-0 left-0 right-0 divider-glow" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl text-left mb-16">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded glass-chip mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5CA9DB]"></span>
            <span className="text-[11px] font-mono tracking-[0.24em] text-[#5CA9DB] uppercase font-semibold">
              11 · INVESTIGACIÓN & PUBLICACIONES TÉCNICAS
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight mb-4">
            LO QUE ESTAMOS APRENDIENDO.
          </h2>

          <p className="text-base sm:text-lg text-[#A8ACB3] font-sans">
            Hallazgos de campo, benchmarks de latencia y guías normativas desarrolladas por nuestros investigadores y doctores en ciencia de datos.
          </p>
        </div>

        {/* Expandable reading list: click a headline to open the full summary */}
        <div className="mb-12 max-w-3xl">
          <ExpandableCardList
            cards={INSIGHT_ARTICLES.map((art) => ({
              title: art.title,
              description: `${art.category} · ${art.date}`,
              src: INSIGHT_COVER,
              ctaText: 'Leer',
              ctaLink: `https://${art.metricsMentioned}`,
              content: <p>{art.summary}</p>,
            }))}
          />
        </div>

        {/* 3 Rigorous Technical Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INSIGHT_ARTICLES.map((art) => (
            <article
              key={art.id}
              className="p-6 rounded-xl glass-card transition-all flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-4">
                  <span className="text-[#8CC6EC] px-2 py-0.5 rounded glass-panel font-semibold">
                    {art.category}
                  </span>
                  <span className="text-[#6E737C] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight group-hover:text-[#5CA9DB] transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-[#A8ACB3] font-sans leading-relaxed mb-6">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#6E737C]">{art.metricsMentioned}</span>
                <span className="text-white group-hover:text-[#5CA9DB] flex items-center gap-1">
                  Leer paper <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
