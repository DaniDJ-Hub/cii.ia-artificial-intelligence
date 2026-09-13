# CII.IA · sitio institucional

Sitio del CII.IA (Centro de Innovación Industrial en Inteligencia Artificial). React 19, Vite, Tailwind CSS v4, React Router 7 y Motion.

## Comandos

- `npm run dev`: servidor local en http://127.0.0.1:3000 (escucha en IPv4; con `localhost` Windows puede resolver a IPv6 y fallar)
- `npm run lint`: verificación de tipos (`tsc --noEmit`)
- `npm run build`: build de producción en `dist/`. Al publicar, el hosting debe redirigir todas las rutas a `index.html`.

## Arquitectura

- `src/App.tsx` define las rutas: `/`, `/nosotros`, `/soluciones`, `/soluciones/:id`, `/casos`, `/casos/:id`, `/ecosistema`, `/contacto`.
- `src/pages/` tiene una página por ruta, `src/layout/` el encabezado, el pie y la navegación, y `src/ui/` las piezas reutilizables.
- La landing solo resume. El detalle vive en su página: no volver a agregar secciones completas a `/`.
- Investigación y Noticias se omitieron a propósito (sin publicaciones recientes). No crearlas sin contenido real.

## Imágenes

- El sitio usa **fotografía real del CII.IA**. La guía de encargo, tratamiento, encuadre y especificaciones está en `docs/art-direction.md`.
- Prohibido el banco de imágenes y los renders genéricos. Si no hay foto real de algo, esa sección va sin imagen.
- Los originales van **sin editar** en `assets/photos/` (nunca en `public/`). `npm run images` los recorta si hace falta, genera variantes WebP en `public/images/` y actualiza `src/data/photos.generated.ts`. Usa el Edge o Chrome instalado: no requiere dependencias nativas.
- El pipeline normaliza los nombres de archivo (`nosotros-Global Solutions.jpg` → `nosotros-global-solutions`): en el código siempre se usa el nombre normalizado. Dos archivos que produzcan el mismo nombre detienen el proceso.
- Logotipos: los archivos cuyo nombre contiene `instituciones-fundadoras` se convierten a tinta de la marca sobre fondo transparente, se invierten si vienen sobre fondo oscuro y se recortan a su contenido (`LOGO_PATTERN` en el script). Se referencian desde `FOUNDING_PARTNERS[].logo` y se muestran con `<FoundersList showLogos />`, con `alt=""` porque el nombre ya está escrito al lado.
- Recortes en `CROPS` de `scripts/build-images.mjs`, como fracciones del original. Se recorta **el archivo**, no por CSS, cuando lo que se quita no debe publicarse (p. ej. `inicio-inspeccion` excluye un monitor con cifras no documentadas).
- En las páginas se usa `<Photo name=… alt=… sizes=…>` dentro de un contenedor `.photo-cold`, que aplica el blanco y negro frío. Si la foto no se ha procesado, `Photo` no renderiza nada y `hasPhoto()` permite adaptar el layout.
- Animaciones de foto en inicio: barrido de inspección en «Sistema de inspección» (cubierta que baja con línea de luz, dentro del pin de escritorio) y apertura desde el centro con parallax en «Gobierno, academia e industria». Solo transform; con movimiento reducido no se montan las cubiertas.
- Foto de encabezado de página: se pasa por `PageIntro media={…}`, no como `children`. En escritorio va en 5 columnas junto al título y el texto, alineada por abajo; debajo en móvil. Como `children` ocupaba todo el ancho bajo el texto y dejaba media pantalla vacía.
- Animaciones de foto en Nosotros: el encabezado se abre de izquierda a derecha al cargar y luego hace parallax; los logotipos de fundadores se trazan en cadena (`animateFounders`); la foto de «Global Solutions delivered Locally» se expande desde un encuadre cerrado hasta el ancho completo con el scroll.
- Cada foto necesita texto alternativo descriptivo y, si aparecen personas identificables, su consentimiento por escrito. Una imagen que no es del CII.IA lleva pie «ilustrativa».

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

- Tres capas: Lenis (`src/motion/SmoothScroll.tsx`) para el scroll suave, GSAP + ScrollTrigger (`src/motion/gsap.ts`) para todo lo ligado al scroll y el 3D, y Motion para entradas y microinteracciones de componentes.
- Lenis va conectado al ticker de GSAP y a `ScrollTrigger.update`. Mueve el scroll nativo, así que `sticky` y `fixed` siguen funcionando. Para desplazar por código usar `useLenis()`, no `window.scrollTo`.
- **Cuidado con el puente de Lenis.** La conexión con el ticker vive en un componente hijo de `ReactLenis` que toma la instancia con `useLenis()` (ver `SmoothScroll.tsx`). Si se hace con una `ref` desde el mismo componente que renderiza `ReactLenis`, el ticker puede quedar apuntando a una instancia que no es la viva: Lenis cancela la rueda con `preventDefault` y la página deja de moverse por completo. Al probar el scroll hay que usar eventos de rueda reales; `window.scrollTo` no pasa por ese camino y oculta el fallo.
- Opciones de Lenis: solo `lerp` (hoy `0.12`), nunca `lerp` y `duration` a la vez. Subir `lerp` hace el scroll más inmediato; bajarlo, más deslizante.
- Toda animación de scroll se registra con `useGSAP` (con `scope`) dentro de `gsap.matchMedia(MOTION)`. Con `prefers-reduced-motion: reduce` no se crea ninguna, Lenis no se monta y el campo 3D no existe; `MotionConfig reducedMotion="user"` cubre Motion.
- No animar con GSAP un elemento que ya anima Motion: envolverlo y animar el contenedor. Para 3D usar `transformPerspective`; animar solo transform y opacity.
- Reveals de texto con `SplitReveal` (SplitText por líneas, con máscara). No partir párrafos largos: solo títulos.
- Datos institucionales (cifras y socios fundadores en inicio): se reproducen **una vez**, sin scrub, para que un dato nunca quede a medio mostrar. Las cantidades cuentan con `textContent` + `snap` (GSAP las restaura al revertir); las fechas (`kind: 'year'` en los datos) no se cuentan, suben desde su máscara. El valor final va siempre en un `sr-only`.
- Filetes animables: pseudo-elementos con `scale-x-[var(--rule,1)]`. GSAP anima `--rule`; sin animación valen 1 y se ven completos (así `FoundersList` sirve igual en Nosotros y Ecosistema).
- El scroll 3D vive solo en: acto oscuro de inicio (campo WebGL + hero + manifiesto), índice de soluciones, evidencia (único pin, solo escritorio), bandas CTA, títulos de página, principios y sede en Nosotros, y marca del pie. No extenderlo a otras secciones sin una razón narrativa.
- `src/three/HeroField.tsx` es el campo de puntos del acto oscuro: dos posiciones por punto interpoladas en el vertex shader, cámara movida por el progreso del scroll y `frameloop` apagado fuera del acto. Si crece, mantener el morfeo en la GPU.
- `animateFounders(list)` (en `FoundersList.tsx`) es la animación compartida de la lista de socios. Se llama desde la página, no desde el componente: en inicio debe crearse después del pin de evidencia para que su posición cuente con el espacio del pin.
- **Nunca dejar que una librería mueva un nodo que renderiza React.** `cobe` envuelve su canvas en un div propio; por eso `CobeGlobe` crea el canvas dentro de un contenedor que React no reconcilia. Con el canvas en JSX, activar «reducir movimiento» con Nosotros abierto dejaba la app en blanco (`removeChild`).
- Kit en `components/`. Integrados hoy: `LaserFlow` (banda CTA de inicio), `CobeGlobe` (Nosotros), `DepthText` (pie) y `3d-card` (evidencia). `CursorGrid` y `Strands` quedaron fuera del hero al llegar el campo 3D. Los que dependen de fotos o logotipos (`ScrollExpand`, `HeroParallax`, `TiltedCard`, galerías) esperan material real: no usarlos con imágenes de stock.
- Efectos WebGL pesados con `lazy` y solo si `useMotionPreferences().richEffects` (escritorio sin movimiento reducido).

## Skills del proyecto (`.claude/skills/`)

- `frontend-design` (Anthropic): cargarla antes de diseñar o rediseñar una página o componente.
- `web-design-guidelines` (Vercel): auditoría de accesibilidad y UX sobre los archivos modificados.
- `webapp-testing` (Anthropic): capturas y pruebas con Playwright en escritorio y móvil.
- `awwwards-animations`: patrones de scroll premium, Lenis, cursor y transiciones de página.
- `gsap-*` (GreenSock, oficiales): `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-react`, `gsap-plugins`, `gsap-utils`, `gsap-performance`, `gsap-frameworks`.
- `threejs-*` (11 skills): fundamentos, geometría, materiales, shaders, animación, interacción, post-procesado y demás, para trabajar `src/three/`.
- `design-dna`: identidad visual en tres dimensiones. El perfil del sitio vive en `docs/design-dna.json` y es la referencia para nuevas piezas y assets; actualizarlo cuando cambie el sistema visual.
