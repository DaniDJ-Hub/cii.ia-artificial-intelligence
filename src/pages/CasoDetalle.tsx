import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FEATURED_CASE_ID, FEATURED_CASE_METRICS, PROJECT_CASES } from '../data/ciiiaData';
import { technologyLabel } from '../lib/cases';
import { formatFigure, toSentenceCase } from '../lib/text';
import { usePageTitle } from '../lib/usePageTitle';
import { CtaBand } from '../ui/CtaBand';
import { PageIntro } from '../ui/PageIntro';
import { Reveal } from '../ui/Reveal';
import { NotFound } from './NotFound';

export function CasoDetalle() {
  const { id } = useParams();
  const index = PROJECT_CASES.findIndex((item) => item.id === id);
  const caseItem = PROJECT_CASES[index];
  usePageTitle(caseItem?.title);

  if (!caseItem) return <NotFound />;

  const total = PROJECT_CASES.length;
  const previous = PROJECT_CASES[(index - 1 + total) % total];
  const next = PROJECT_CASES[(index + 1) % total];
  const isFeatured = caseItem.id === FEATURED_CASE_ID;

  const story = [
    { label: 'Reto', text: caseItem.challenge },
    { label: 'Enfoque', text: caseItem.approach },
    { label: 'Resultado', text: caseItem.outcome },
  ];

  return (
    <>
      <PageIntro breadcrumb={[{ to: '/casos', label: 'Casos' }]} title={caseItem.title} size="lg">
        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          <div>
            <dt className="text-sm text-graphite">Sector</dt>
            <dd className="mt-1 text-lg">{caseItem.sector}</dd>
          </div>
          <div>
            <dt className="text-sm text-graphite">Tecnología</dt>
            <dd className="mt-1 text-lg">{technologyLabel(caseItem.technology)}</dd>
          </div>
        </dl>
      </PageIntro>

      <section aria-label="Descripción del caso" className="border-t border-rule">
        <div className="container-site py-16 sm:py-20 lg:py-24">
          <dl>
            {story.map((block) => (
              <div
                key={block.label}
                className="grid gap-3 border-b border-rule py-8 first:border-t first:border-t-ink md:grid-cols-12 md:gap-6"
              >
                <dt className="text-lg font-semibold md:col-span-3">{block.label}</dt>
                <dd className="max-w-[48ch] text-xl leading-relaxed sm:text-2xl md:col-span-8 md:col-start-5">
                  {block.text}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-8 md:grid-cols-12 md:gap-6">
            <h2 className="text-lg font-semibold md:col-span-3">En cifras</h2>
            {isFeatured ? (
              <div className="md:col-span-8 md:col-start-5">
                <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
                  {FEATURED_CASE_METRICS.map((metric, metricIndex) => (
                    <Reveal key={metric.label} delay={metricIndex * 0.08} className="flex flex-col-reverse">
                      <dt className="mt-2 text-graphite">{metric.label}</dt>
                      <dd className="figure text-5xl leading-none text-navy">{formatFigure(metric.value)}</dd>
                    </Reveal>
                  ))}
                </dl>
                <p className="mt-8 text-sm text-graphite">Métricas documentadas en un despliegue de manufactura.</p>
              </div>
            ) : (
              <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 md:col-span-8 md:col-start-5">
                <span className="figure text-6xl leading-none text-navy">{caseItem.metricHighlight}</span>
                <span className="text-xl text-graphite">{toSentenceCase(caseItem.metricLabel)}</span>
              </p>
            )}
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-12 md:gap-6">
            <h2 className="text-lg font-semibold md:col-span-3">Temas</h2>
            <ul className="flex flex-wrap gap-2 md:col-span-8 md:col-start-5">
              {caseItem.tags.map((tag) => (
                <li key={tag} className="rounded-[3px] bg-surface px-2.5 py-1">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <nav aria-label="Otros casos" className="border-t border-rule">
        <div className="container-site grid sm:grid-cols-2">
          <Link to={`/casos/${previous.id}`} className="group flex flex-col gap-2 py-8 sm:pr-8">
            <span className="flex items-center gap-2 text-graphite">
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Caso anterior
            </span>
            <span className="font-display text-xl font-bold uppercase leading-tight [font-stretch:106%] transition-colors duration-300 group-hover:text-steel">
              {previous.title}
            </span>
          </Link>
          <Link
            to={`/casos/${next.id}`}
            className="group flex flex-col gap-2 border-t border-rule py-8 sm:items-end sm:border-l sm:border-t-0 sm:pl-8 sm:text-right"
          >
            <span className="flex items-center gap-2 text-graphite">
              Siguiente caso
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <span className="font-display text-xl font-bold uppercase leading-tight [font-stretch:106%] transition-colors duration-300 group-hover:text-steel">
              {next.title}
            </span>
          </Link>
        </div>
      </nav>

      <CtaBand
        title="¿Tienes un reto parecido?"
        body="Cuéntanos qué quieres resolver y revisamos si un enfoque similar aplica a tu operación."
        to={`/contacto?caso=${caseItem.id}`}
      />
    </>
  );
}
