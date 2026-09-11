import { usePageTitle } from '../lib/usePageTitle';
import { CtaBand } from '../ui/CtaBand';
import { CycleExplorer } from '../ui/CycleExplorer';
import { PageIntro } from '../ui/PageIntro';
import { ServiceIndex } from '../ui/ServiceIndex';

export function Soluciones() {
  usePageTitle('Soluciones');

  return (
    <>
      <PageIntro
        title="Soluciones"
        lead="Cinco líneas de trabajo que cubren el ciclo completo: decidir qué merece construirse, probarlo en laboratorio, ponerlo a operar y dejar la capacidad instalada en tu organización."
      />

      <section aria-label="Líneas de solución" className="container-site pb-20 sm:pb-28">
        <ServiceIndex detailed />
      </section>

      <section id="ciclo" aria-labelledby="ciclo-titulo" className="scroll-mt-20 bg-surface">
        <div className="container-site py-20 sm:py-28 lg:py-32">
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12">
            <h2 id="ciclo-titulo" className="display text-[clamp(2rem,4.6vw,4rem)] lg:col-span-6">
              Ciclo de ejecución
            </h2>
            <p className="text-lg text-graphite lg:col-span-5 lg:col-start-8">
              Cada proyecto recorre cinco etapas. Elige una para ver qué se entrega y qué soluciones intervienen.
            </p>
          </div>
          <CycleExplorer />
        </div>
      </section>

      <CtaBand
        title="¿No sabes por dónde empezar?"
        body="Cuéntanos en qué punto está tu organización y te orientamos sobre la etapa y la solución que corresponden."
      />
    </>
  );
}
