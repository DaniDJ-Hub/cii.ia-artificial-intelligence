import { useId, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { INDUSTRIAL_SECTORS, PROJECT_CASES } from '../data/ciiiaData';
import { TECHNOLOGIES, technologyLabel } from '../lib/cases';
import { cn } from '../lib/cn';
import { usePageTitle } from '../lib/usePageTitle';
import { CtaBand } from '../ui/CtaBand';
import { buttonClasses } from '../ui/links';
import { PageIntro } from '../ui/PageIntro';

type FilterKey = 'sector' | 'tecnologia';

export function Casos() {
  usePageTitle('Casos');
  const [params, setParams] = useSearchParams();
  const sector = INDUSTRIAL_SECTORS.find((item) => item.id === params.get('sector'));
  const technology = TECHNOLOGIES.find((item) => item.id === params.get('tecnologia'));
  const hasFilters = Boolean(sector || technology);

  const cases = PROJECT_CASES.filter(
    (item) => (!sector || item.sector === sector.name) && (!technology || item.technology === technology.value),
  );

  const toggle = (key: FilterKey, value: string) => {
    const next = new URLSearchParams(params);
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const clearFilters = () => setParams({}, { replace: true, preventScrollReset: true });

  return (
    <>
      <PageIntro
        title="Casos"
        lead="Doce soluciones de inteligencia artificial documentadas por el CII.IA en manufactura, comercio, servicios financieros y seguridad."
      />

      <section aria-label="Filtros" className="container-site">
        <div className="grid gap-6 border-y border-rule py-6 lg:grid-cols-12 lg:gap-10">
          <FilterGroup label="Sector" className="lg:col-span-7">
            {INDUSTRIAL_SECTORS.map((item) => (
              <Chip
                key={item.id}
                pressed={sector?.id === item.id}
                count={PROJECT_CASES.filter((c) => c.sector === item.name).length}
                onClick={() => toggle('sector', item.id)}
              >
                {item.name}
              </Chip>
            ))}
          </FilterGroup>
          <FilterGroup label="Tecnología" className="lg:col-span-5">
            {TECHNOLOGIES.map((item) => (
              <Chip
                key={item.id}
                pressed={technology?.id === item.id}
                count={PROJECT_CASES.filter((c) => c.technology === item.value).length}
                onClick={() => toggle('tecnologia', item.id)}
              >
                {item.label}
              </Chip>
            ))}
          </FilterGroup>
        </div>

        <div className="flex min-h-14 items-center justify-between gap-4 py-4 text-graphite">
          <p aria-live="polite">
            {hasFilters ? `${cases.length} de ${PROJECT_CASES.length} casos` : `${PROJECT_CASES.length} casos`}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="underline underline-offset-4 transition-colors hover:text-ink"
            >
              Quitar filtros
            </button>
          )}
        </div>
      </section>

      <section aria-label="Lista de casos" className="container-site pb-20 sm:pb-28">
        {cases.length === 0 ? (
          <div className="border-t border-ink py-16">
            <p className="text-xl">Ningún caso coincide con esa combinación de filtros.</p>
            <button type="button" onClick={clearFilters} className={cn(buttonClasses('outline'), 'mt-6')}>
              Quitar filtros
            </button>
          </div>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="hidden border-b border-ink pb-3 text-sm text-graphite md:grid md:grid-cols-12 md:gap-6"
            >
              <span className="md:col-span-5">Caso</span>
              <span className="md:col-span-3">Sector</span>
              <span className="md:col-span-3">Tecnología</span>
            </div>
            <motion.ul layout className="relative border-t border-ink md:border-t-0">
              <AnimatePresence initial={false} mode="popLayout">
                {cases.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-b border-rule"
                  >
                    <Link
                      to={`/casos/${item.id}`}
                      className="group relative isolate grid gap-2 py-6 outline-offset-0 md:grid-cols-12 md:items-baseline md:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 -inset-x-3 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out-quart group-hover:scale-x-100 group-focus-visible:scale-x-100 sm:-inset-x-5"
                      />
                      <span className="md:col-span-5">
                        <span className="block font-display text-xl font-bold uppercase leading-tight [font-stretch:106%] transition-colors duration-300 group-hover:text-steel sm:text-2xl">
                          {item.title}
                        </span>
                        <span className="mt-2 block leading-snug text-graphite">{item.challenge}</span>
                      </span>
                      <span className="flex flex-wrap gap-x-4 text-graphite md:contents">
                        <span className="md:col-span-3">{item.sector}</span>
                        <span className="md:col-span-3">{technologyLabel(item.technology)}</span>
                      </span>
                      <ArrowRight
                        aria-hidden="true"
                        className="hidden size-5 justify-self-end text-graphite transition-[transform,color] duration-300 ease-out-quart group-hover:translate-x-1 group-hover:text-steel md:col-span-1 md:block"
                      />
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </>
        )}
      </section>

      <CtaBand
        title="¿Tienes un reto parecido?"
        body="Cuéntanos qué quieres resolver. Revisamos si alguna de estas soluciones aplica a tu operación."
      />
    </>
  );
}

function FilterGroup({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId} className={className}>
      <p id={labelId} className="mb-3 text-sm text-graphite">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  pressed,
  count,
  onClick,
  children,
}: {
  pressed: boolean;
  count: number;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-[0.95rem] transition-[background-color,color,box-shadow] duration-200',
        pressed
          ? 'bg-navy text-white'
          : 'bg-surface text-ink shadow-[inset_0_0_0_1px_var(--color-rule)] hover:shadow-[inset_0_0_0_1px_var(--color-ink)]',
      )}
    >
      {children}
      <span className={cn('font-mono text-xs', pressed ? 'text-mist' : 'text-graphite')}>{count}</span>
    </button>
  );
}
