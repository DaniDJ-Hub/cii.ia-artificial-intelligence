import { useEffect } from 'react';

const DEFAULT_TITLE = 'CII.IA | Centro de Innovación Industrial en Inteligencia Artificial';

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | CII.IA` : DEFAULT_TITLE;
  }, [title]);
}
