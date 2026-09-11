import { useId, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACT_INFO, PROJECT_CASES, SERVICES_DATA } from '../data/ciiiaData';
import { cn } from '../lib/cn';
import { usePageTitle } from '../lib/usePageTitle';
import { PageIntro } from '../ui/PageIntro';

const INTERESTS = [
  ...SERVICES_DATA.map((service) => ({ id: service.id, label: service.title, hint: service.tagline })),
  { id: 'ecosistema', label: 'Ecosistema', hint: 'Colaborar o sumar a mi organización.' },
  { id: 'otro', label: 'Otro tema', hint: 'Algo que no está en esta lista.' },
];

const inputClasses =
  'mt-2 block w-full rounded-[3px] bg-surface px-3.5 text-base text-ink shadow-[inset_0_0_0_1px_var(--color-rule)] outline-none transition-shadow duration-200 hover:shadow-[inset_0_0_0_1px_var(--color-graphite)] focus-visible:shadow-[inset_0_0_0_2px_var(--color-steel)]';

/**
 * PENDIENTE: no hay backend. El formulario prepara un correo en la aplicación
 * del usuario para no simular un envío que no ocurre. Antes de conectarlo a un
 * servicio que guarde datos debe existir el aviso de privacidad.
 */
export function Contacto() {
  usePageTitle('Contacto');
  const [params] = useSearchParams();
  const presetCase = PROJECT_CASES.find((item) => item.id === params.get('caso'));
  const [interest, setInterest] = useState(
    () => INTERESTS.find((item) => item.id === params.get('interes'))?.id ?? '',
  );
  const [prepared, setPrepared] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const field = (name: string) => String(data.get(name) ?? '').trim();
    const interestLabel = INTERESTS.find((item) => item.id === interest)?.label ?? 'Sin especificar';

    const lines = [`Nombre: ${field('nombre')}`, `Organización: ${field('organizacion')}`, `Correo: ${field('correo')}`];
    if (field('telefono')) lines.push(`Teléfono: ${field('telefono')}`);
    lines.push(`Interés: ${interestLabel}`, '', field('mensaje'));

    const subject = `Contacto desde el sitio: ${interestLabel}`;
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setPrepared(true);
  };

  return (
    <>
      <PageIntro
        title="Contacto"
        lead="Cuéntanos qué necesitas y en qué punto está tu organización. Tu mensaje llega directamente al equipo del CII.IA."
      />

      <section aria-label="Formulario de contacto" className="border-t border-rule">
        <div className="container-site grid gap-16 py-16 sm:py-20 lg:grid-cols-12 lg:py-24">
          <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nombre" name="nombre" autoComplete="name" />
              <Field label="Organización" name="organizacion" autoComplete="organization" />
              <Field label="Correo" name="correo" type="email" autoComplete="email" />
              <Field label="Teléfono" name="telefono" type="tel" autoComplete="tel" optional />
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">
                ¿Qué te interesa? <span className="font-normal text-graphite">(opcional)</span>
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {INTERESTS.map((option) => {
                  const checked = interest === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        'flex cursor-pointer gap-3 rounded-[3px] bg-surface px-4 py-3 transition-shadow duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-steel',
                        checked
                          ? 'shadow-[inset_0_0_0_2px_var(--color-steel)]'
                          : 'shadow-[inset_0_0_0_1px_var(--color-rule)] hover:shadow-[inset_0_0_0_1px_var(--color-graphite)]',
                      )}
                    >
                      <input
                        type="radio"
                        name="interes"
                        value={option.id}
                        checked={checked}
                        onChange={() => setInterest(option.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-1 grid size-4 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors',
                          checked ? 'border-steel' : 'border-graphite',
                        )}
                      >
                        <span
                          className={cn(
                            'size-2 rounded-full bg-steel transition-transform duration-200',
                            checked ? 'scale-100' : 'scale-0',
                          )}
                        />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-bold uppercase [font-stretch:106%]">
                          {option.label}
                        </span>
                        <span className="mt-0.5 block text-[0.95rem] leading-snug text-graphite">{option.hint}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <MessageField
              defaultValue={presetCase ? `Me interesa una solución parecida al caso «${presetCase.title}».\n\n` : ''}
            />

            <div>
              <button
                type="submit"
                className="inline-flex h-12 items-center rounded-[3px] bg-navy px-6 font-semibold text-white transition-colors duration-200 hover:bg-steel active:translate-y-px"
              >
                Preparar correo
              </button>
              <p className="mt-3 max-w-[52ch] text-[0.95rem] text-graphite">
                Se abrirá tu aplicación de correo con el mensaje listo para enviarlo a {CONTACT_INFO.email}.
              </p>
              <AnimatePresence>
                {prepared && (
                  <motion.p
                    role="status"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 max-w-[52ch] border-l-2 border-steel pl-4"
                  >
                    Abrimos tu aplicación de correo con el mensaje. Si no se abrió, escríbenos directamente a{' '}
                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-semibold underline underline-offset-4">
                      {CONTACT_INFO.email}
                    </a>
                    .
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>

          <aside aria-labelledby="contacto-directo" className="lg:col-span-4 lg:col-start-9">
            <h2 id="contacto-directo" className="text-lg font-semibold">
              Contacto directo
            </h2>
            <dl className="mt-5 divide-y divide-rule border-y border-ink">
              <div className="py-5">
                <dt className="text-sm text-graphite">Correo</dt>
                <dd className="mt-1 text-lg">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="underline decoration-rule underline-offset-4 transition-colors hover:text-steel hover:decoration-steel"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-sm text-graphite">Teléfono</dt>
                <dd className="mt-1 text-lg">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    className="underline decoration-rule underline-offset-4 transition-colors hover:text-steel hover:decoration-steel"
                  >
                    {CONTACT_INFO.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-sm text-graphite">Sede</dt>
                <dd className="mt-1 text-lg leading-snug">{CONTACT_INFO.location}</dd>
              </div>
              <div className="py-5">
                <dt className="text-sm text-graphite">Redes</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2">
                    {CONTACT_INFO.social.map((network) => (
                      <li key={network.href}>
                        <a
                          href={network.href}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-rule underline-offset-4 transition-colors hover:text-steel hover:decoration-steel"
                        >
                          {network.label}
                          <span className="sr-only"> (abre en otra pestaña)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = 'text',
  autoComplete,
  optional = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  optional?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional && <span className="font-normal text-graphite"> (opcional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={!optional}
        autoComplete={autoComplete}
        spellCheck={type === 'email' ? false : undefined}
        className={cn(inputClasses, 'h-12')}
      />
    </div>
  );
}

function MessageField({ defaultValue }: { defaultValue: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        Mensaje
      </label>
      <textarea
        id={id}
        name="mensaje"
        required
        rows={6}
        defaultValue={defaultValue}
        className={cn(inputClasses, 'resize-y py-3 leading-relaxed')}
      />
    </div>
  );
}
