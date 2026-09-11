import { ALL_PARTNERS } from '../data/ciiiaData';
import type { EcosystemPartner } from '../types';
import { plainName, roleDetail } from '../lib/text';
import { usePageTitle } from '../lib/usePageTitle';
import { CtaBand } from '../ui/CtaBand';
import { FoundersList } from '../ui/FoundersList';
import { PageIntro } from '../ui/PageIntro';

const SECTION_TITLE = 'display text-[clamp(1.9rem,4vw,3.5rem)]';

/** `generic` es el rol que comparte todo el grupo; no se repite bajo cada nombre. */
const GROUPS: { category: EcosystemPartner['category']; title: string; generic?: string }[] = [
  { category: 'Tech', title: 'Tecnología', generic: 'Aliado tecnológico' },
  { category: 'Platforms', title: 'Plataformas' },
  { category: 'Academy & Research', title: 'Academia e investigación', generic: 'Academia e investigación' },
  { category: 'AI Specialized', title: 'Industria y clústeres' },
  { category: 'Shareholders', title: 'Empresas socias', generic: 'Empresa socia' },
];

function partnerDetail(partner: EcosystemPartner, generic?: string) {
  if (partner.roleInEcosystem.includes(' · ')) return roleDetail(partner.roleInEcosystem);
  return partner.roleInEcosystem === generic ? null : partner.roleInEcosystem;
}

export function Ecosistema() {
  usePageTitle('Ecosistema');

  return (
    <>
      <PageIntro
        title="Ecosistema"
        lead="Más de 50 organizaciones de tecnología, academia, gobierno e industria forman parte del ecosistema del CII.IA. Aquí están sus socios fundadores y una selección de aliados."
      />

      <section aria-labelledby="fundadores" className="border-t border-rule">
        <div className="container-site grid gap-10 py-20 sm:py-24 lg:grid-cols-12">
          <h2 id="fundadores" className={`${SECTION_TITLE} lg:col-span-5`}>
            Socios fundadores
          </h2>
          <div className="lg:col-span-6 lg:col-start-7">
            <FoundersList />
          </div>
        </div>
      </section>

      <section aria-labelledby="aliados" className="bg-surface">
        <div className="container-site py-20 sm:py-24 lg:py-28">
          <div className="mb-12 grid gap-6 lg:grid-cols-12">
            <h2 id="aliados" className={`${SECTION_TITLE} lg:col-span-6`}>
              Organizaciones aliadas
            </h2>
            <p className="text-lg text-graphite lg:col-span-5 lg:col-start-8">
              Agrupadas por el papel que desempeñan dentro del ecosistema.
            </p>
          </div>

          {GROUPS.map((group) => {
            const members = ALL_PARTNERS.filter(
              (partner) => partner.category === group.category && !partner.isFoundingPartner,
            );
            return (
              <div key={group.category} className="grid gap-6 border-t border-ink py-8 lg:grid-cols-12">
                <h3 className="text-lg font-semibold lg:col-span-3">{group.title}</h3>
                <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  {members.map((partner) => {
                    const detail = partnerDetail(partner, group.generic);
                    return (
                      <li key={partner.name}>
                        <span className="block text-lg font-semibold leading-snug">{plainName(partner.name)}</span>
                        {detail && <span className="mt-0.5 block leading-snug text-graphite">{detail}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CtaBand
        title="Suma a tu organización"
        body="Si representas a una empresa, universidad, clúster o institución y quieres colaborar con el CII.IA, escríbenos."
        to="/contacto?interes=ecosistema"
        action="Proponer una colaboración"
      />
    </>
  );
}
