import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/use-reduced-motion';

const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Decide qué efectos del kit se montan. Los WebGL pesados (Strands, LaserFlow,
 * DepthText) solo en escritorio y sin preferencia de movimiento reducido.
 */
export function useMotionPreferences() {
  const reducedMotion = usePrefersReducedMotion();
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => setDesktop(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return { reducedMotion, desktop, richEffects: desktop && !reducedMotion };
}
