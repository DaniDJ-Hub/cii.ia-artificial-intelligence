import { Link, useParams } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { EXECUTION_STAGES, SERVICES_DATA } from '../data/ciiiaData';
import { toSentenceCase } from '../lib/text';
import { usePageTitle } from '../lib/usePageTitle';
import { CtaBand } from '../ui/CtaBand';
import { PageIntro } from '../ui/PageIntro';
import { NotFound } from './NotFound';

export function SolucionDetalle() {
  const { id } = useParams();
  const index = SERVICES_DATA.findIndex((item) => item.id === id);
  const service = SERVICES_DATA[index];
  usePageTitle(service?.title);

  if (!service) return <NotFound />;

  const next = SERVICES_DATA[(index + 1) % SERVICES_DATA.length];
  const stages = EXECUTION_STAGES.filter((stage) => service.stageMapping.includes(stage.id));

  return (
    <>
      <PageIntro breadcrumb={[{ to: '/soluciones', label: 'Soluciones' }]} title={service.title} lead={service.tagline}>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-graphite">
          <span>{service.category}</span>
          {service.previousName && <span>{service.previousName}</span>}
        </p>
      </PageIntro>

      <section aria-label="Detalle" className="border-t border-rule">
        <div className="container-site grid gap-14 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            <p className="max-w-[52ch] text-xl leading-relaxed sm:text-2xl">{service.description}</p>

            <h2 className="mt-14 text-lg font-semibold">Qué incluye</h2>
            <ul className="mt-5 border-t border-ink">
              {service.points.map((point) => (
                <li key={point} className="border-b border-rule py-4 text-lg leading-snug">
                  {point}
                </li>
              ))}
            </ul>

            {service.externalLink && (
              <a
                href={service.externalLink.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-1.5 font-semibold underline decoration-rule underline-offset-4 transition-colors hover:text-steel hover:decoration-steel"
              >
                {service.externalLink.label}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only"> (abre en otra pestaña)</span>
              </a>
            )}
          </div>

          <aside aria-label="Resumen" className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-rule border-y border-ink">
              <div className="py-5">
                <dt className="text-sm text-graphite">Inversión de referencia</dt>
                <dd className="mt-1.5 font-mono leading-snug">{service.startingPrice}</dd>
              </div>
              <div className="py-5">
                <dt className="text-sm text-graphite">Componentes</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {service.technicalSpecs.map((spec) => (
                      <li key={spec} className="rounded-[3px] bg-surface px-2.5 py-1 text-[0.95rem]">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-sm text-graphite">Etapas del ciclo</dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {stages.map((stage) => (
                      <li key={stage.id}>
                        <Link
                          to="/soluciones#ciclo"
                          className="underline decoration-rule underline-offset-4 transition-colors hover:text-steel hover:decoration-steel"
                        >
                          <span className="font-mono text-sm text-graphite">{stage.number}</span>{' '}
                          {toSentenceCase(stage.name)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <nav aria-label="Otras soluciones" className="border-t border-rule">
        <Link
          to={`/soluciones/${next.id}`}
          className="container-site group flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-10 sm:py-12"
        >
          <span className="text-graphite">Siguiente solución</span>
          <span className="flex items-center gap-4">
            <span className="font-display text-[clamp(1.6rem,4vw,3rem)] font-bold uppercase leading-none [font-stretch:110%] transition-colors duration-300 group-hover:text-steel">
              {next.title}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="size-7 shrink-0 transition-transform duration-300 ease-out-quart group-hover:translate-x-1.5"
            />
          </span>
        </Link>
      </nav>

      <CtaBand
        title="Hablemos de tu proyecto"
        body="Cuéntanos tu reto. El equipo te orienta sobre alcance, formato e inversión."
        to={`/contacto?interes=${service.id}`}
      />
    </>
  );
}
