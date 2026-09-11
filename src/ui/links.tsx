import { Link, type LinkProps } from 'react-router';
import { cn } from '../lib/cn';

type ButtonTone = 'navy' | 'sky' | 'outline' | 'outline-light';
type ButtonSize = 'sm' | 'md';

const TONES: Record<ButtonTone, string> = {
  navy: 'bg-navy text-white hover:bg-steel',
  sky: 'bg-sky text-navy-deep hover:bg-white',
  outline: 'text-ink shadow-[inset_0_0_0_1.5px_currentColor] hover:bg-ink hover:text-paper',
  'outline-light':
    'text-white shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.5)] hover:bg-white hover:text-navy hover:shadow-none',
};

export function buttonClasses(tone: ButtonTone = 'navy', size: ButtonSize = 'md') {
  return cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-[3px] font-semibold transition-[background-color,color,box-shadow] duration-200 active:translate-y-px',
    size === 'sm' ? 'h-10 px-4 text-[0.95rem]' : 'h-12 px-6 text-base',
    TONES[tone],
  );
}

export function ButtonLink({
  tone,
  size,
  className,
  ...props
}: LinkProps & { tone?: ButtonTone; size?: ButtonSize }) {
  return <Link {...props} className={cn(buttonClasses(tone, size), className)} />;
}

export function TextLink({ className, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        'inline-block font-semibold underline decoration-[color-mix(in_srgb,currentColor_35%,transparent)] decoration-1 underline-offset-[0.35em] transition-[text-decoration-color] duration-200 hover:decoration-current',
        className,
      )}
    />
  );
}
