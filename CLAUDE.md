# CII.IA · sitio institucional

Sitio del CII.IA (Centro de Innovación Industrial en Inteligencia Artificial). React 19, Vite, Tailwind CSS v4, React Router 7 y Motion.

## Comandos

- `npm run dev`: servidor local en http://localhost:3000
- `npm run lint`: verificación de tipos (`tsc --noEmit`)
- `npm run build`: build de producción en `dist/`. Al publicar, el hosting debe redirigir todas las rutas a `index.html`.

## Arquitectura

- `src/App.tsx` define las rutas: `/`, `/nosotros`, `/soluciones`, `/soluciones/:id`, `/casos`, `/casos/:id`, `/ecosistema`, `/contacto`.
- `src/pages/` tiene una página por ruta, `src/layout/` el encabezado, el pie y la navegación, y `src/ui/` las piezas reutilizables.
- La landing solo resume. El detalle vive en su página: no volver a agregar secciones completas a `/`.
- Investigación y Noticias se omitieron a propósito (sin publicaciones recientes). No crearlas sin contenido real.

## Reglas de contenido

- Todo dato visible sale de `src/data/ciiiaData.ts` y lleva su fuente en el comentario del bloque.
- No inventar cifras, clientes, marcas de equipo, certificaciones, precios, tiempos de respuesta ni testimonios. Si falta un dato, se omite o se marca `PENDIENTE_*` en el archivo de datos.
- No usar fotos de stock para representar instalaciones, equipo o proyectos del CII.IA.

## Sistema visual (base: ciiia.mx/brandguide)

- Color: solo los tokens de `@theme` en `src/index.css`. `navy` es el color de poder, `paper` el fondo, `steel` la interacción sobre fondo claro y `sky` sobre marino.
- Tipografía: títulos con `.display` (siempre en mayúsculas; Bw Aleta con Archivo expandida como sustituto), texto en Source Sans 3, datos en Source Code Pro, citas en Source Serif 4 y cifras en Aldrich (`.figure`).
- Estructura con filetes, índices y listas. Evitar rejillas de tarjetas idénticas, glassmorphism, glow, gradientes decorativos, etiquetas en mayúsculas monoespaciadas sobre cada título y cadenas del tipo «A · B · C».
- Numeración (01, 02…) solo para secuencias reales, como el ciclo de ejecución.

## Movimiento

- Dos capas: Motion para entradas y microinteracciones de componentes; GSAP + ScrollTrigger (`src/motion/gsap.ts`) para todo lo ligado al scroll y el 3D.
- Toda animación de scroll se registra con `useGSAP` (con `scope`) dentro de `gsap.matchMedia(MOTION)`. Con `prefers-reduced-motion: reduce` no se crea ninguna; `MotionConfig reducedMotion="user"` cubre Motion.
- No animar con GSAP un elemento que ya anima Motion: envolverlo y animar el contenedor. Para 3D usar `transformPerspective`; animar solo transform y opacity.
- El scroll 3D vive solo en: hero de inicio, titular «última milla», ciclo, índice de soluciones, evidencia (único pin, solo escritorio), bandas CTA, títulos de página, principios y sede en Nosotros, y marca del pie. No extenderlo a otras secciones sin una razón narrativa.
- Kit recuperado en `components/`. Integrados: `CursorGrid`, `Strands`, `LaserFlow`, `CobeGlobe`, `DepthText` y `3d-card`. Los que dependen de fotos o logotipos (`ScrollExpand`, `HeroParallax`, `TiltedCard`, galerías) esperan material real: no usarlos con imágenes de stock.
- Efectos WebGL pesados con `lazy` y solo si `useMotionPreferences().richEffects`.

## Skills del proyecto (`.claude/skills/`)

- `frontend-design` (Anthropic): cargarla antes de diseñar o rediseñar una página o componente.
- `web-design-guidelines` (Vercel): auditoría de accesibilidad y UX sobre los archivos modificados.
- `webapp-testing` (Anthropic): capturas y pruebas con Playwright en escritorio y móvil contra `npm run dev`.
