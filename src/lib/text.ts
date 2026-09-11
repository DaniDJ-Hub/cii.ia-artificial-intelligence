const LOCALE = 'es-MX';

/** 'PAROS DE LÍNEA' → 'Paros de línea'. Solo para etiquetas sin nombres propios. */
export function toSentenceCase(label: string) {
  const lower = label.toLocaleLowerCase(LOCALE);
  return lower.charAt(0).toLocaleUpperCase(LOCALE) + lower.slice(1);
}

/** 'Empresa socia · desarrolla y opera HIVA' → 'Desarrolla y opera HIVA'. */
export function roleDetail(role: string) {
  const parts = role.split(' · ');
  if (parts.length === 1) return role;
  const detail = parts.slice(1).join(', ');
  return detail.charAt(0).toLocaleUpperCase(LOCALE) + detail.slice(1);
}

/** 'FIME · UANL' → 'FIME, UANL'. */
export function plainName(name: string) {
  return name.split(' · ').join(', ');
}

/** '-55%' → '−55%' con signo menos tipográfico. */
export function formatFigure(value: string) {
  return value.replace(/^-/, '−');
}
