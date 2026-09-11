import { usePageTitle } from '../lib/usePageTitle';
import { ButtonLink } from '../ui/links';
import { PageIntro } from '../ui/PageIntro';

export function NotFound() {
  usePageTitle('Página no encontrada');

  return (
    <PageIntro title="Página no encontrada" lead="La dirección que buscas no existe o cambió de lugar.">
      <div className="mt-10 flex flex-wrap gap-3 pb-16">
        <ButtonLink to="/">Ir al inicio</ButtonLink>
        <ButtonLink to="/soluciones" tone="outline">
          Ver soluciones
        </ButtonLink>
      </div>
    </PageIntro>
  );
}
