import {
  MetricItem,
  ClientQuote,
  ExecutionStage,
  ServiceItem,
  ProjectCase,
  EcosystemPartner,
  InsightArticle
} from '../types';

/**
 * ============================================================================
 * FUENTE DE CONTENIDO · CII.IA
 * ============================================================================
 *
 * REGLA: en este archivo no entra ningún dato que no esté respaldado por una
 * fuente. Cada bloque declara su origen. Donde no hay dato, hay un marcador
 * explícito — nunca una cifra plausible.
 *
 * FUENTES
 *   [DECK]  Presentaciones comerciales CII.IA 2026 (Ejecutiva 2030 v1.03/v1.06,
 *           Academy v1.03, HIVA v1.05, IA para PYMES v1.04, WS IA+Innovación v1.05)
 *   [WEB]   ciiia.mx, auditado en vivo el 09/09/2026
 *   [MARCA] ciiia.mx/brandguide — manual de identidad corporativa
 *   [PUB]   Fuentes públicas externas (PROSOFT, prensa de la inauguración 2021)
 *
 * MARCADORES
 *   PENDIENTE_Rxx  Falta un insumo del equipo CII.IA. La referencia Rxx
 *                  corresponde al Anexo 1 del reporte de Fase 1.
 *
 * NO AÑADIR: nombres de cliente, porcentajes de precisión, tiempos de
 * despliegue, marcas de hardware, ahorros en pesos ni conteos de empresas
 * sin que alguien del CII.IA los confirme por escrito.
 * ============================================================================
 */

/** Texto único para todo campo sin dato. Feo a propósito: debe estorbar. */
export const SIN_DATO = '—';

/* ---------------------------------------------------------------------------
 * MÉTRICAS
 * Fuente: [DECK] Ejecutiva 2030 v1.06, lámina «CII.IA in action».
 * Las tres primeras pertenecen TODAS al mismo caso (Sistema de Inspección).
 * El archivo anterior las repartía entre sectores distintos: eso era falso.
 * ------------------------------------------------------------------------- */
export const CORE_METRICS: MetricItem[] = [
  {
    id: 'm1',
    value: '-55%',
    numericTarget: 55,
    prefix: '-',
    suffix: '%',
    label: 'PAROS DE LÍNEA',
    subtext: 'Sistema de inspección con visión por computadora. Métrica documentada en un despliegue de manufactura.',
    sector: 'Manufactura'
  },
  {
    id: 'm2',
    value: '-60%',
    numericTarget: 60,
    prefix: '-',
    suffix: '%',
    label: 'TIEMPO DE INSPECCIÓN',
    subtext: 'Mismo despliegue. La inspección deja de ser un cuello de botella del proceso.',
    sector: 'Manufactura'
  },
  {
    id: 'm3',
    value: '-30%',
    numericTarget: 30,
    prefix: '-',
    suffix: '%',
    label: 'DESPERDICIO',
    subtext: 'Mismo despliegue. Se suma una reducción del 28% en tiempo improductivo.',
    sector: 'Manufactura'
  },
  {
    id: 'm4',
    value: '12',
    numericTarget: 12,
    suffix: '',
    label: 'SOLUCIONES DOCUMENTADAS',
    subtext: 'Soluciones de IA documentadas por el CII.IA en manufactura, comercio, servicios financieros y seguridad.',
    sector: 'Multisectorial'
  }
];

/* ---------------------------------------------------------------------------
 * MÉTRICAS INSTITUCIONALES (hero)
 * Fuente: [DECK] + [PUB]. Son las únicas cuatro cifras institucionales
 * verificables hoy. PENDIENTE_R8: empresas atendidas y personas capacitadas
 * serían más potentes, pero hoy no existen públicamente.
 * ------------------------------------------------------------------------- */
export const INSTITUTIONAL_METRICS = [
  { id: 'i1', value: 12, suffix: '', label: 'Soluciones documentadas' },
  { id: 'i2', value: 50, suffix: '+', label: 'Organizaciones aliadas' },
  { id: 'i3', value: 5, suffix: '', label: 'Socios fundadores' },
  { id: 'i4', value: 2021, suffix: '', label: 'Inauguración en el PIIT, Nuevo León' }
];

/* ---------------------------------------------------------------------------
 * CITAS DE CLIENTE
 * Fuente: [DECK] Ejecutiva 2030, lámina «El problema no es la IA…».
 * SOLO EXISTEN DOS CITAS TEXTUALES. El deck no atribuye cargo, empresa ni
 * sector: por eso role/industry quedan sin atribución.
 * No añadir más citas sin material de respaldo. Es testimonio de terceros:
 * inventarlo es un riesgo reputacional, no un problema de redacción.
 * ------------------------------------------------------------------------- */
export const CLIENT_QUOTES: ClientQuote[] = [
  {
    id: 'q1',
    quote: 'Llevo más de un año tratando de lanzar asistentes virtuales.',
    role: 'Voz de cliente recogida por CII.IA',
    industry: SIN_DATO
  },
  {
    id: 'q2',
    quote: 'Ingeniería trae soluciones a la planta, pero en piso nadie entiende cómo usarlas.',
    role: 'Voz de cliente recogida por CII.IA',
    industry: SIN_DATO
  }
];

/* ---------------------------------------------------------------------------
 * VERBOS DE MARCA
 * Fuente: [MARCA] sección de voz. Son NUEVE pares exactos y están aprobados.
 * El archivo anterior conservaba cuatro e inventaba cinco.
 * ------------------------------------------------------------------------- */
export const BRAND_PAIRS = [
  { verb1: 'DESCUBRIMOS', verb2: 'no diagnosticamos' },
  { verb1: 'GUIAMOS', verb2: 'no entrenamos' },
  { verb1: 'CATALIZAMOS', verb2: 'no instruimos' },
  { verb1: 'MATERIALIZAMOS', verb2: 'no adoctrinamos' },
  { verb1: 'EDUCAMOS', verb2: 'no damos sermones' },
  { verb1: 'DEMOSTRAMOS', verb2: 'no solo hablamos' },
  { verb1: 'INNOVAMOS', verb2: 'no imitamos' },
  { verb1: 'INTERRUMPIMOS', verb2: 'no vamos con la corriente' },
  { verb1: 'LIDERAMOS', verb2: 'no seguimos' }
];

/* ---------------------------------------------------------------------------
 * CICLO DE EJECUCIÓN
 * Fuente: [DECK] lámina «Ciclo de Ejecución de IA» y «Mapa Estratégico»
 * (Motor de Co-Creación + Fábrica de Inteligencia).
 * Retirado: «retornos verificables en menos de 6 meses», que no está en
 * ninguna fuente y es una promesa comercial cuantificada.
 * ------------------------------------------------------------------------- */
export const EXECUTION_STAGES: ExecutionStage[] = [
  {
    id: 'descubrir',
    number: '01',
    name: 'DESCUBRIR',
    slug: 'descubrir',
    focus: 'Estrategia y priorización de casos de uso',
    deliverable: 'Roadmap de Adopción IA a 6–12 meses',
    products: ['Workshop IA + Innovación', 'Masterclass ejecutiva', 'Assessment'],
    description: 'Identificamos los retos operativos donde la inteligencia artificial tiene sentido y los ordenamos por impacto y viabilidad. Nada se construye antes de saber qué merece construirse.'
  },
  {
    id: 'disenar',
    number: '02',
    name: 'DISEÑAR',
    slug: 'disenar',
    focus: 'Arquitectura, integración y gobernanza',
    deliverable: 'Blueprint técnico y modelo operativo',
    products: ['Arquitectura e integración', 'Gobernanza de datos y ética', 'Ciberseguridad'],
    description: 'Definimos datos, integración, modelo y gobernanza. El diseño contempla desde el principio cómo se va a mantener la solución, no solo cómo se va a demostrar.'
  },
  {
    id: 'desarrollar',
    number: '03',
    name: 'DESARROLLAR',
    slug: 'desarrollar',
    focus: 'Prototipado en laboratorio propio',
    deliverable: 'Sandbox → MVP → PoC',
    products: ['AI Lab', 'AI Learning Factory NL', 'Modelos a la medida'],
    description: 'Construimos y probamos en el laboratorio del PIIT, con equipo físico. El prototipo se valida contra las condiciones de tu operación antes de convertirse en inversión.'
  },
  {
    id: 'desplegar',
    number: '04',
    name: 'DESPLEGAR',
    slug: 'desplegar',
    focus: 'Puesta en operación y adopción',
    deliverable: 'Integración y despliegue en operación',
    products: ['Integración', 'HIVA', 'Change management', 'CII.IA Academy'],
    description: 'Integramos con los sistemas existentes y acompañamos la adopción en piso, que es donde la mayoría de los proyectos se detienen.'
  },
  {
    id: 'escalar',
    number: '05',
    name: 'ESCALAR',
    slug: 'escalar',
    focus: 'Industrialización y eficiencia operativa',
    deliverable: 'Operación continua y optimización',
    products: ['Industrialización', 'Optimización', 'Formación del equipo interno'],
    description: 'Industrializamos lo que ya funciona y formamos al equipo interno para que la capacidad se quede en tu organización. Escalar no es repetir el piloto: es hacerlo sostenible.'
  }
];

/* ---------------------------------------------------------------------------
 * SERVICIOS
 * Fuente: [DECK] portafolio 2026 · [WEB] para el precio de la certificación DLI.
 *
 * PRECIOS VERIFICADOS
 *   Workshop IA + Innovación ....... MXN $85,000            [DECK]
 *   Certificación NVIDIA DLI ....... MXN $7,950             [WEB] ciiia.mx/nvidia
 *   HIVA licencia anual ............ USD $7,950             [DECK]
 *   HIVA implementación ............ USD $3,500 pago único  [DECK]
 *   Programa PYMES ................. MXN $100,000 estimado  [DECK]
 * Retirados por inventados: «Desde MXN $120,000» (AI Lab) y
 * «Desde MXN $25,000 por participante» (Academy).
 *
 * technicalSpecs: retiradas todas las marcas de hardware (Fanuc, Universal
 * Robots, Matrice, Jetson, MQTT/OPC UA). PENDIENTE_R13: nadie ha confirmado
 * qué equipo hay realmente en el laboratorio.
 * ------------------------------------------------------------------------- */
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-execution',
    title: 'AI EXECUTION',
    previousName: 'Antes: AI Consulting',
    category: 'Estrategia y ejecución',
    badge: 'TRANSFORMADO',
    tagline: 'Convertimos estrategia en soluciones operando.',
    description: 'Una consultora entrega recomendaciones. Nosotros acompañamos hasta que la solución opera, con arquitectura, gobernanza y adopción en piso.',
    points: [
      'Workshop IA + Innovación: ideación y priorización de casos de uso',
      'Roadmap de Adopción IA a 6–12 meses',
      'Proyectos a la medida: ciencia de datos, visión, IA generativa, XR y gemelos digitales'
    ],
    startingPrice: 'Workshop desde MXN $85,000',
    stageMapping: ['descubrir', 'disenar'],
    technicalSpecs: ['Masterclass ejecutiva', 'Workshop de 6–8 h', 'Roadmap priorizado']
  },
  {
    id: 'ai-lab',
    title: 'AI LAB / PROTOTYPING',
    previousName: 'Laboratorio de prototipado',
    category: 'Infraestructura física',
    badge: 'ACTIVO DIFERENCIADOR',
    tagline: 'Tu reto en prototipo antes de ser inversión.',
    description: 'Infraestructura física propia en el PIIT: celda de manufactura, robots, drones, equipo de realidad virtual, dispositivos edge y data center. Es un activo que muy pocos tienen en México.',
    points: [
      'Ciclo Sandbox → MVP → PoC → Industrialización',
      'Validación con equipo industrial antes de tocar la línea de producción',
      'Modelos propios y adaptados: datos sintéticos, visión y asistentes'
    ],
    // PENDIENTE_D1: definir si se publica precio o rango para el laboratorio.
    startingPrice: 'A cotizar según alcance',
    stageMapping: ['disenar', 'desarrollar'],
    technicalSpecs: ['Celda de manufactura', 'Robótica y drones', 'Realidad virtual', 'Edge y data center']
  },
  {
    id: 'academy',
    title: 'CII.IA ACADEMY',
    previousName: 'Antes: AI Training',
    category: 'Formación',
    badge: 'NVIDIA DLI',
    tagline: 'Que la capacidad se quede dentro de tu organización.',
    description: 'Formación ejecutiva y técnica. El CII.IA imparte certificaciones del NVIDIA Deep Learning Institute y programas corporativos a la medida.',
    points: [
      'Siete líneas de producto, de programas ejecutivos a tracks técnicos',
      'Certificaciones NVIDIA Deep Learning Institute',
      'Programas corporativos adaptados al reto de cada organización'
    ],
    startingPrice: 'Certificación NVIDIA DLI desde MXN $7,950',
    stageMapping: ['desplegar', 'escalar'],
    // PENDIENTE_R14: el catálogo vigente en ciiia.mx tiene un solo curso activo.
    technicalSpecs: ['NVIDIA DLI', 'Programas ejecutivos', 'Programas corporativos'],
    // Fuente: [WEB] ciiia.mx/nvidia, página vigente de la certificación.
    externalLink: { label: 'Certificación NVIDIA DLI en ciiia.mx', href: 'https://ciiia.mx/nvidia' }
  },
  {
    id: 'hiva',
    title: 'HIVA',
    category: 'Plataforma de agentes',
    // CORREGIDO: decía «PLATAFORMA PROPIA». hiva.pro publica
    // «© 2026 Kernel Servicios en Informática SA de C.V.» y Kernel figura como
    // shareholder del ecosistema CII.IA. PENDIENTE_D2.
    badge: 'PLATAFORMA DEL ECOSISTEMA',
    tagline: 'Agentes que entienden, responden y ejecutan.',
    description: 'Plataforma empresarial de agentes virtuales con cinco capas: agente, modelo de lenguaje, base de conocimiento, integración y seguridad empresarial.',
    points: [
      'Integración con ERP, CRM, bases de datos, documentos, data lakes y APIs',
      'Despliegue SaaS multi-tenant, instancia dedicada o en tu infraestructura',
      'Base de conocimiento y flujos de trabajo configurables por agente'
    ],
    startingPrice: 'Licencia anual USD $7,950 + implementación USD $3,500',
    stageMapping: ['desplegar', 'escalar'],
    technicalSpecs: ['SaaS multi-tenant', 'Instancia dedicada', 'On-premise', 'Seguridad empresarial']
  },
  {
    id: 'pymes',
    title: 'IA PARA PYMES',
    previousName: 'Programa de Innovación Empresarial con IA',
    category: 'Acceso y competitividad',
    badge: 'PROGRAMA INSTITUCIONAL',
    tagline: 'Capacidades de clase mundial sin equipo interno.',
    description: 'Solo el 5% de las empresas de Nuevo León —principalmente trasnacionales— cuenta con equipos internos de ciencia de datos. Este programa existe para el otro 95%.',
    points: [
      'Adopción de IA: diagnóstico, casos de uso, MVP funcional e implementación',
      'Consultoría preferencial',
      'Formación especializada'
    ],
    startingPrice: 'Valor estimado del proyecto MXN $100,000 · con apoyo institucional',
    stageMapping: ['descubrir', 'desarrollar'],
    technicalSpecs: ['Diagnóstico', 'MVP funcional', 'Acompañamiento']
  }
];

/* ---------------------------------------------------------------------------
 * CASOS
 * Fuente: [DECK] Ejecutiva 2030 v1.06, láminas «CII.IA in action».
 * Son las doce soluciones que el CII.IA documenta. El deck da tecnología y,
 * en un caso, métricas porcentuales. NO da cliente, sector concreto, tiempo de
 * despliegue ni cifras de precisión.
 *
 * Por eso aquí:
 *   anonymizedClient  → SIN_DATO en todos. PENDIENTE_R7.
 *   deploymentTime    → SIN_DATO en todos. No hay una sola fuente.
 *   metricHighlight   → cifra real, o el número de componentes de la solución.
 *
 * El archivo anterior traía doce casos con clientes, semanas de despliegue y
 * ahorros en pesos que no existen en ninguna fuente. Se eliminaron por
 * completo, incluidos cuatro casos (energía, cadena de frío, espacios
 * confinados y e-waste) que no forman parte del portafolio documentado.
 * ------------------------------------------------------------------------- */
export const PROJECT_CASES: ProjectCase[] = [
  {
    id: 'caso-01',
    title: 'Sistema de Inspección',
    sector: 'Manufactura',
    technology: 'Visión Computacional',
    metricHighlight: '-55%',
    metricLabel: 'PAROS DE LÍNEA',
    challenge: 'La inspección manual no alcanza el ritmo de la línea y los defectos se detectan tarde.',
    approach: 'Inspección automatizada con visión por computadora integrada al proceso productivo.',
    outcome: '55% menos paros, 28% menos tiempo improductivo, 30% menos desperdicio y 60% menos tiempo de inspección.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Visión por computadora', 'Calidad', 'Manufactura']
  },
  {
    id: 'caso-02',
    title: 'Mantenimiento Predictivo',
    sector: 'Manufactura',
    technology: 'Ciencia de Datos',
    metricHighlight: '3',
    metricLabel: 'MODELOS DE MACHINE LEARNING',
    challenge: 'El mantenimiento reactivo genera paros no programados en equipo crítico.',
    approach: 'Tres modelos de machine learning sobre datos de operación del equipo.',
    outcome: 'Detección de anomalías, predicción de fallo y estimación de vida útil.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Ciencia de datos', 'Confiabilidad', 'Mantenimiento']
  },
  {
    id: 'caso-03',
    title: 'Plataforma Inteligente de Producción',
    sector: 'Manufactura',
    technology: 'IA Generativa',
    metricHighlight: '7',
    metricLabel: 'COMPONENTES DE LA PLATAFORMA',
    challenge: 'Las decisiones de producción se toman sin visibilidad integrada del proceso.',
    approach: 'Plataforma que combina modelo predictivo, analítica de operación y asistente virtual.',
    outcome: 'Modelo predictivo, OEE, sistema de recomendación, eficiencia operativa, análisis de operación, variables exógenas y asistente virtual.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['IA generativa', 'Ciencia de datos', 'OEE']
  },
  {
    id: 'caso-04',
    title: 'Inspección de Calidad',
    sector: 'Manufactura',
    technology: 'Visión Computacional',
    metricHighlight: '4',
    metricLabel: 'CAPACIDADES EN TIEMPO REAL',
    challenge: 'La detección de defectos depende del criterio y la fatiga del inspector.',
    approach: 'Visión por computadora en tiempo real sobre la línea.',
    outcome: 'Detección de defectos, clasificación, medición y métricas de productividad.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Visión por computadora', 'Calidad']
  },
  {
    id: 'caso-05',
    title: 'Plataforma de Asistentes Virtuales',
    sector: 'Multisectorial',
    technology: 'IA Generativa',
    metricHighlight: '4',
    metricLabel: 'CAPACIDADES DEL AGENTE',
    challenge: 'Las organizaciones necesitan asistentes que además de responder, ejecuten.',
    approach: 'Plataforma empresarial para crear asistentes virtuales inteligentes.',
    outcome: 'Agentes capaces de entender, responder, ejecutar y aprender.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['IA generativa', 'Agentes', 'HIVA']
  },
  {
    id: 'caso-06',
    title: 'Sistema de Recomendación',
    sector: 'Comercio y Retail',
    technology: 'IA Generativa',
    metricHighlight: '3',
    metricLabel: 'PALANCAS DE RENDIMIENTO',
    challenge: 'Las decisiones comerciales se toman sin modelar el comportamiento del cliente.',
    approach: 'Análisis de comportamiento y agente de recomendaciones sobre variables comerciales.',
    outcome: 'Mejores rendimientos en margen, ingreso y volumen.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Ciencia de datos', 'IA generativa', 'Comercial']
  },
  {
    id: 'caso-07',
    title: 'Sistema de Visión Retail',
    sector: 'Comercio y Retail',
    technology: 'Visión Computacional',
    metricHighlight: '5',
    metricLabel: 'DIMENSIONES DE ANÁLISIS',
    challenge: 'El comportamiento del cliente en piso de venta no se mide.',
    approach: 'Visión por computadora sobre las cámaras del punto de venta.',
    outcome: 'Segmentación y conteo, mapas de calor, análisis demográfico, flujo y permanencia, y detección de emociones.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Visión por computadora', 'Retail']
  },
  {
    id: 'caso-08',
    title: 'Sistema de Visión para Seguridad',
    sector: 'Seguridad Industrial',
    technology: 'Visión Computacional',
    metricHighlight: '4',
    metricLabel: 'CAPAS DE DETECCIÓN',
    challenge: 'El cumplimiento de seguridad depende de supervisión humana intermitente.',
    approach: 'Visión por computadora sobre las cámaras existentes de la instalación.',
    outcome: 'Detección de equipo de protección personal, zonas restringidas, situaciones de riesgo y prevención de incidentes.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Visión por computadora', 'Seguridad industrial', 'EPP']
  },
  {
    id: 'caso-09',
    title: 'Detección de Intrusos',
    sector: 'Seguridad Industrial',
    technology: 'Robótica y Drones',
    metricHighlight: '2',
    metricLabel: 'MODOS DE VIGILANCIA',
    challenge: 'La vigilancia perimetral de instalaciones extensas es costosa y discontinua.',
    approach: 'Visión por computadora combinada con drones para cobertura perimetral.',
    outcome: 'Detección de personas y de comportamientos intrusivos en el perímetro.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Drones', 'Visión por computadora', 'Perímetro']
  },
  {
    id: 'caso-10',
    title: 'Análisis de Comportamiento de Cartera',
    sector: 'Servicios Financieros',
    technology: 'Ciencia de Datos',
    metricHighlight: '3',
    metricLabel: 'COMPONENTES DEL SISTEMA',
    challenge: 'El deterioro de cartera se detecta cuando el incumplimiento ya se materializó.',
    approach: 'Modelos para identificar desviaciones tempranas en el comportamiento de pago.',
    outcome: 'Detección temprana, alertas priorizadas y un asistente interno que explica qué cambió, por qué importa y qué acciones considerar.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Ciencia de datos', 'IA generativa', 'Riesgo']
  },
  {
    id: 'caso-11',
    title: 'Detección de Anomalías y Planeación de Demanda',
    sector: 'Multisectorial',
    technology: 'Ciencia de Datos',
    metricHighlight: '3',
    metricLabel: 'CAPACIDADES DE PLANEACIÓN',
    challenge: 'La planeación de demanda se apoya en históricos sin considerar variables externas.',
    approach: 'Modelos de pronóstico con detección de anomalías y simulación de escenarios.',
    outcome: 'Planeación de demanda, pronóstico de ventas y simulación de escenarios.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Ciencia de datos', 'Pronóstico', 'Planeación']
  },
  {
    id: 'caso-12',
    title: 'Plataforma de Incidencia Delictiva',
    sector: 'Seguridad Pública',
    technology: 'Ciencia de Datos',
    metricHighlight: '4',
    metricLabel: 'MÓDULOS DE LA PLATAFORMA',
    challenge: 'Las fuentes de información sobre incidencia están dispersas y sin modelo predictivo.',
    approach: 'Integración de fuentes y modelado espacial y temporal de la incidencia.',
    outcome: 'Mapas de calor, pronóstico, integración de fuentes y análisis de comportamiento.',
    deploymentTime: SIN_DATO,
    anonymizedClient: SIN_DATO,
    tags: ['Ciencia de datos', 'IA generativa', 'Sector público']
  }
];

/* ---------------------------------------------------------------------------
 * SOCIOS FUNDADORES
 * Fuente: [PUB] documentación de PROSOFT y prensa de la inauguración (2021).
 *
 * CORRECCIÓN IMPORTANTE. El archivo anterior listaba Tecnológico de Monterrey
 * y CAINTRA como socios fundadores, y omitía CIMAT y PROSOFT. El Tec participa
 * en el ecosistema a través de su AI Hub, pero no como fundador. CAINTRA no
 * aparece en ninguna fuente del CII.IA.
 * PENDIENTE_R9: confirmar redacción y permiso de mención con cada institución.
 * ------------------------------------------------------------------------- */
export const FOUNDING_PARTNERS: EcosystemPartner[] = [
  {
    name: 'PROSOFT · Gobierno de México',
    category: 'Shareholders',
    roleInEcosystem: 'Socio fundador · Programa federal de Centros de Innovación Industrial',
    isFoundingPartner: true
  },
  {
    name: 'Gobierno del Estado de Nuevo León',
    category: 'Shareholders',
    roleInEcosystem: 'Socio fundador · Sede en el Parque de Investigación e Innovación Tecnológica',
    isFoundingPartner: true
  },
  {
    name: 'Monterrey IT Clúster (Csoftmty)',
    category: 'Shareholders',
    roleInEcosystem: 'Socio fundador · Administración del centro y vinculación con la industria de TI',
    isFoundingPartner: true
  },
  {
    name: 'Universidad Autónoma de Nuevo León',
    category: 'Shareholders',
    roleInEcosystem: 'Socio fundador · Formación de talento y transferencia tecnológica',
    isFoundingPartner: true
  },
  {
    name: 'CIMAT',
    category: 'Shareholders',
    roleInEcosystem: 'Socio fundador · Centro de Investigación en Matemáticas',
    isFoundingPartner: true
  }
];

/* ---------------------------------------------------------------------------
 * ECOSISTEMA
 * Fuente: [DECK] lámina «CII.IA® ECOSYSTEM».
 * Solo organizaciones que aparecen en esa lámina. Retirados por no figurar:
 * Dell Technologies y «Universal Robots / Fanuc Ecosystem».
 * roleInEcosystem describe la categoría en la que el propio deck las coloca,
 * sin atribuirles alcances contractuales que no conocemos.
 * PENDIENTE_R9: permiso de uso de logotipo y vigencia de cada alianza.
 * PENDIENTE_R10: la afirmación «primer NVIDIA preferred partner en América
 * Latina» aparece en material del CII.IA pero no está confirmada como vigente.
 * No se publica hasta que alguien la respalde.
 * ------------------------------------------------------------------------- */
export const ALL_PARTNERS: EcosystemPartner[] = [
  ...FOUNDING_PARTNERS,

  { name: 'NVIDIA', category: 'Tech', roleInEcosystem: 'Aliado tecnológico · Deep Learning Institute' },
  { name: 'IBM', category: 'Tech', roleInEcosystem: 'Aliado tecnológico' },
  { name: 'Microsoft', category: 'Tech', roleInEcosystem: 'Aliado tecnológico' },
  { name: 'Intel', category: 'Tech', roleInEcosystem: 'Aliado tecnológico' },
  { name: 'Qualcomm', category: 'Tech', roleInEcosystem: 'Aliado tecnológico' },
  { name: 'KUKA', category: 'Tech', roleInEcosystem: 'Aliado tecnológico · Robótica industrial' },

  { name: 'Microsoft Azure', category: 'Platforms', roleInEcosystem: 'Plataforma de nube' },
  { name: 'Amazon Web Services', category: 'Platforms', roleInEcosystem: 'Plataforma de nube' },
  { name: 'Google Cloud', category: 'Platforms', roleInEcosystem: 'Plataforma de nube' },
  { name: 'H2O.ai', category: 'Platforms', roleInEcosystem: 'Plataforma de IA' },
  { name: 'AVEVA', category: 'Platforms', roleInEcosystem: 'Plataforma industrial' },
  { name: 'REKOR', category: 'Platforms', roleInEcosystem: 'Plataforma de visión' },

  { name: 'Tecnológico de Monterrey · AI Hub', category: 'Academy & Research', roleInEcosystem: 'Academia e investigación' },
  { name: 'FIME · UANL', category: 'Academy & Research', roleInEcosystem: 'Academia e investigación' },
  { name: 'Université de Montréal', category: 'Academy & Research', roleInEcosystem: 'Academia internacional' },
  { name: 'Universidad Externado de Colombia', category: 'Academy & Research', roleInEcosystem: 'Academia internacional' },
  { name: 'INCmty', category: 'Academy & Research', roleInEcosystem: 'Ecosistema de innovación' },

  { name: 'Nuevo León 4.0', category: 'AI Specialized', roleInEcosystem: 'Iniciativa estatal de Industria 4.0' },
  { name: 'CLAUT', category: 'AI Specialized', roleInEcosystem: 'Clúster automotriz de Nuevo León' },
  { name: 'CLELAC', category: 'AI Specialized', roleInEcosystem: 'Clúster de electrodomésticos' },
  { name: 'AMT', category: 'AI Specialized', roleInEcosystem: 'Organismo del ecosistema industrial' },
  { name: 'mxTI', category: 'AI Specialized', roleInEcosystem: 'Consejo nacional de clústeres de TI' },

  { name: 'Kernel', category: 'Shareholders', roleInEcosystem: 'Empresa socia · desarrolla y opera HIVA' },
  { name: 'Microsip', category: 'Shareholders', roleInEcosystem: 'Empresa socia' },
  { name: 'Novalan', category: 'Shareholders', roleInEcosystem: 'Empresa socia' },
  { name: 'Northware', category: 'Shareholders', roleInEcosystem: 'Empresa socia' },
  { name: 'SIT Consultores', category: 'Shareholders', roleInEcosystem: 'Empresa socia' },
  { name: 'PCG', category: 'Shareholders', roleInEcosystem: 'Empresa socia' }
];

/* ---------------------------------------------------------------------------
 * INSIGHTS
 * Fuente: [WEB] ciiia.mx/noticiasciiia, auditado el 09/09/2026.
 *
 * Los tres artículos del archivo anterior eran inventados, incluidos un
 * «muestreo de 45 empresas» y «latencias de 8.2 ms medidas en celda real».
 * Publicar investigación falsa desde un centro de investigación es el peor
 * riesgo de todo el sitio. Sustituidos por artículos reales publicados.
 *
 * ADVERTENCIA: el más reciente es de enero de 2025. La sección no debe
 * lanzarse sin reactivar la publicación. PENDIENTE_R18: responsable editorial.
 * ------------------------------------------------------------------------- */
export const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'ins-1',
    title: 'La IA Generativa: cómo está transformando el mundo empresarial',
    category: 'Industria',
    date: '15 de enero de 2025',
    readTime: SIN_DATO,
    summary: 'Publicado en el blog del CII.IA.',
    metricsMentioned: 'ciiia.mx/noticiasciiia'
  },
  {
    id: 'ins-2',
    title: 'La IA en la manufactura: un cambio de paradigma',
    category: 'Industria',
    date: '3 de diciembre de 2024',
    readTime: SIN_DATO,
    summary: 'Publicado en el blog del CII.IA.',
    metricsMentioned: 'ciiia.mx/noticiasciiia'
  },
  {
    id: 'ins-3',
    title: 'Visión por computadora en la detección de fallos de producción',
    category: 'Investigación',
    date: '14 de noviembre de 2024',
    readTime: SIN_DATO,
    summary: 'Cómo la visión por computadora transforma la manufactura mediante detección de fallos en tiempo real.',
    metricsMentioned: 'ciiia.mx/noticiasciiia'
  }
];

/* ---------------------------------------------------------------------------
 * SECTORES
 * Los conteos se derivan de PROJECT_CASES y suman exactamente 12.
 * El archivo anterior declaraba conteos que sumaban 16 sobre 12 casos.
 * ------------------------------------------------------------------------- */
export const INDUSTRIAL_SECTORS = [
  { id: 'manufactura', name: 'Manufactura', casesCount: 4, highlight: 'Inspección, calidad, mantenimiento predictivo y producción' },
  { id: 'retail', name: 'Comercio y Retail', casesCount: 2, highlight: 'Recomendación comercial y analítica de piso de venta' },
  { id: 'seguridad-industrial', name: 'Seguridad Industrial', casesCount: 2, highlight: 'Equipo de protección personal y vigilancia perimetral' },
  { id: 'multisectorial', name: 'Multisectorial', casesCount: 2, highlight: 'Asistentes virtuales y planeación de demanda' },
  { id: 'financiero', name: 'Servicios Financieros', casesCount: 1, highlight: 'Detección temprana de deterioro de cartera' },
  { id: 'publico', name: 'Seguridad Pública', casesCount: 1, highlight: 'Análisis y pronóstico de incidencia delictiva' }
];

/* ---------------------------------------------------------------------------
 * CASO DESTACADO
 * Fuente: [DECK] Ejecutiva 2030 v1.06, lámina «CII.IA in action».
 * Las cuatro cifras pertenecen al mismo despliegue (caso-01). La de tiempo
 * improductivo ya estaba en CORE_METRICS (m3.subtext) y en caso-01.outcome.
 * ------------------------------------------------------------------------- */
export const FEATURED_CASE_ID = 'caso-01';

export const FEATURED_CASE_METRICS = [
  { value: '-55%', label: 'Paros de línea' },
  { value: '-60%', label: 'Tiempo de inspección' },
  { value: '-30%', label: 'Desperdicio' },
  { value: '-28%', label: 'Tiempo improductivo' }
];

/* ---------------------------------------------------------------------------
 * CONTACTO
 * Fuente: [WEB] ciiia.mx/contacto, consultado el 11/09/2026.
 * PENDIENTE: dirección postal completa de la sede. No se publica una calle
 * sin que el CII.IA la confirme.
 * PENDIENTE: aviso de privacidad. El formulario no debe conectarse a un
 * servicio que almacene datos hasta que exista.
 * ------------------------------------------------------------------------- */
export const CONTACT_INFO = {
  email: 'contacto@ciiia.mx',
  phoneDisplay: '+52 81 2000 2127',
  phoneHref: 'tel:+528120002127',
  location: 'Parque de Investigación e Innovación Tecnológica (PIIT), Apodaca, Nuevo León',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cii-ia/' },
    { label: 'Facebook', href: 'https://www.facebook.com/CII.IA1/' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCz3SuYojOMFFs5re1oMRiBg' }
  ]
};

/** Fuente: [WEB] ciiia.mx, portada. */
export const TAGLINE = 'Global Solutions delivered Locally';

/* ---------------------------------------------------------------------------
 * NOTA FINAL
 * HERO_CONCEPTS (los conceptos A/B/C del proceso de diseño) se eliminó de este
 * archivo. Era código muerto y material de proceso: no pertenece al sitio.
 * ------------------------------------------------------------------------- */
