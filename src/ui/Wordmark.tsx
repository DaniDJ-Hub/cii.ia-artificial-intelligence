import { cn } from '../lib/cn';

/**
 * Wordmark provisional. PENDIENTE: sustituir por el archivo oficial del
 * logotipo (ciiia.mx/brandguide). El punto entre CII e IA es el rasgo que la
 * marca define como distintivo, por eso es lo único con color propio.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      translate="no"
      className={cn(
        'inline-flex items-baseline font-display text-[1.4rem] font-bold uppercase leading-none tracking-[-0.01em] [font-stretch:112%]',
        className,
      )}
    >
      CII<span className="brand-dot">.</span>IA
      <span className="ml-0.5 self-start text-[0.42em] font-normal">®</span>
    </span>
  );
}
