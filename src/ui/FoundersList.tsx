import { FOUNDING_PARTNERS } from '../data/ciiiaData';
import { plainName, roleDetail } from '../lib/text';

export function FoundersList() {
  return (
    <ul className="border-t border-ink">
      {FOUNDING_PARTNERS.map((partner) => (
        <li key={partner.name} className="grid gap-1 border-b border-rule py-5 sm:grid-cols-12 sm:gap-6">
          <span className="text-lg font-semibold leading-snug sm:col-span-5">{plainName(partner.name)}</span>
          <span className="text-graphite sm:col-span-7">{roleDetail(partner.roleInEcosystem)}</span>
        </li>
      ))}
    </ul>
  );
}
