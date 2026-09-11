export interface MetricItem {
  id: string;
  value: string;
  numericTarget: number;
  suffix: string;
  prefix?: string;
  label: string;
  subtext: string;
  sector: string;
}

export interface ClientQuote {
  id: string;
  quote: string;
  role: string;
  industry: string;
}

export interface ExecutionStage {
  id: string;
  number: string;
  name: string;
  slug: string;
  focus: string;
  deliverable: string;
  products: string[];
  description: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  previousName?: string;
  category: string;
  badge: string;
  tagline: string;
  description: string;
  points: string[];
  startingPrice: string;
  stageMapping: string[];
  technicalSpecs: string[];
  externalLink?: { label: string; href: string };
}

export interface ProjectCase {
  id: string;
  title: string;
  sector: string;
  technology: 'Visión Computacional' | 'Ciencia de Datos' | 'IA Generativa' | 'Robótica y Drones';
  metricHighlight: string;
  metricLabel: string;
  challenge: string;
  approach: string;
  outcome: string;
  deploymentTime: string;
  anonymizedClient: string;
  tags: string[];
}

export interface EcosystemPartner {
  name: string;
  category: 'Tech' | 'Shareholders' | 'Academy & Research' | 'AI Specialized' | 'Platforms';
  roleInEcosystem: string;
  isFoundingPartner?: boolean;
}

export interface InsightArticle {
  id: string;
  title: string;
  category: 'Investigación' | 'Industria' | 'Academy' | 'Gobernanza';
  readTime: string;
  date: string;
  summary: string;
  metricsMentioned: string;
}
