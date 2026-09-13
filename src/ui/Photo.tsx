import { PHOTOS } from '../data/photos.generated';

export function hasPhoto(name: string) {
  return name in PHOTOS;
}

interface PhotoProps {
  /** Nombre del original en assets/photos/, sin extensión. */
  name: string;
  alt: string;
  /** Ancho que ocupa la foto en pantalla, para que el navegador elija la variante. */
  sizes: string;
  className?: string;
  priority?: boolean;
}

/**
 * Foto responsiva generada por `npm run images`. Declara `width` y `height`
 * para que el navegador reserve el espacio y no haya saltos de layout. Si la
 * foto todavía no se ha procesado, no renderiza nada.
 */
export function Photo({ name, alt, sizes, className, priority = false }: PhotoProps) {
  const entry = PHOTOS[name];
  if (!entry) return null;

  const srcSet = entry.widths.map((width) => `/images/${name}-${width}.webp ${width}w`).join(', ');
  const largest = entry.widths[entry.widths.length - 1];

  return (
    <img
      src={`/images/${name}-${largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={entry.width}
      height={entry.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
