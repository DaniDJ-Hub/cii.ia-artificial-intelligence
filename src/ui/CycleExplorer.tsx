import { useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { EXECUTION_STAGES, SERVICES_DATA } from '../data/ciiiaData';
import { cn } from '../lib/cn';

const STEP_KEYS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

/** Pestañas accesibles (patrón ARIA tabs) para recorrer el ciclo de ejecución. */
export function CycleExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = EXECUTION_STAGES[activeIndex];
  const services = SERVICES_DATA.filter((service) => service.stageMapping.includes(stage.id));
  const total = EXECUTION_STAGES.length;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (event.key in STEP_KEYS) next = (activeIndex + STEP_KEYS[event.key] + total) % total;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = total - 1;
    if (next === null) return;
    event.preventDefault();
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div
        role="tablist"
        aria-label="Etapas del ciclo de ejecución"
        onKeyDown={handleKeyDown}
        className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-t lg:border-ink lg:px-0"
      >
        {EXECUTION_STAGES.map((item, index) => {
          const selected = index === activeIndex;
          return (
            <button
              key={item.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`etapa-tab-${item.id}`}
              aria-selected={selected}
              aria-controls="etapa-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'relative isolate flex shrink-0 items-baseline gap-3 rounded-[3px] px-4 py-3 text-left transition-colors lg:rounded-none lg:border-b lg:border-rule lg:py-5 lg:pl-6',
                selected ? 'text-ink' : 'text-graphite hover:text-ink',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="etapa-activa"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-[3px] bg-paper lg:right-auto lg:w-1 lg:rounded-none lg:bg-steel"
                  transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                />
              )}
              <span className="font-mono text-sm">{item.number}</span>
              <span className="font-display text-lg font-bold uppercase [font-stretch:108%] lg:text-2xl">{item.name}</span>
            </button>
          );
        })}
      </div>

      <div
        id="etapa-panel"
        role="tabpanel"
        aria-labelledby={`etapa-tab-${stage.id}`}
        tabIndex={0}
        className="rounded-[3px] lg:col-span-7 lg:col-start-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <p className="text-graphite">{stage.focus}</p>
            <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-none [font-stretch:108%] sm:text-4xl">
              {stage.deliverable}
            </h3>
            <p className="mt-6 max-w-[60ch] text-lg leading-relaxed">{stage.description}</p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-graphite">Productos y actividades</dt>
                <dd className="mt-3">
                  <ul className="space-y-2">
                    {stage.products.map((product) => (
                      <li key={product} className="border-l-2 border-steel pl-3">
                        {product}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-graphite">Soluciones que intervienen</dt>
                <dd className="mt-3">
                  <ul className="space-y-2">
                    {services.map((service) => (
                      <li key={service.id}>
                        <Link
                          to={`/soluciones/${service.id}`}
                          className="font-semibold underline decoration-rule underline-offset-4 transition-colors hover:text-steel hover:decoration-steel"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
