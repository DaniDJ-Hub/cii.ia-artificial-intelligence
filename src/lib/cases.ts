import type { ProjectCase } from '../types';

export const TECHNOLOGIES: { id: string; label: string; value: ProjectCase['technology'] }[] = [
  { id: 'vision', label: 'Visión por computadora', value: 'Visión Computacional' },
  { id: 'datos', label: 'Ciencia de datos', value: 'Ciencia de Datos' },
  { id: 'generativa', label: 'IA generativa', value: 'IA Generativa' },
  { id: 'robotica', label: 'Robótica y drones', value: 'Robótica y Drones' },
];

export function technologyLabel(value: ProjectCase['technology']) {
  return TECHNOLOGIES.find((technology) => technology.value === value)?.label ?? value;
}
