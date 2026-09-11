# CII.IA · sitio institucional

Propuesta de sitio para el CII.IA, Centro de Innovación Industrial en Inteligencia Artificial.

## Ejecutar en local

Requisito: Node.js.

1. Instalar dependencias: `npm install`
2. Iniciar el servidor: `npm run dev` (http://localhost:3000)
3. Verificar tipos: `npm run lint`

## Estructura

| Ruta | Contenido |
| --- | --- |
| `/` | Qué es el CII.IA, qué hace, soluciones, un caso, respaldo institucional y contacto |
| `/nosotros` | Origen, socios fundadores, principios de trabajo y sede |
| `/soluciones` | Las cinco líneas y el ciclo de ejecución |
| `/soluciones/:id` | Detalle de cada solución |
| `/casos` | Las doce soluciones documentadas, con filtros por sector y tecnología |
| `/casos/:id` | Reto, enfoque y resultado de cada caso |
| `/ecosistema` | Socios fundadores y organizaciones aliadas |
| `/contacto` | Formulario y datos de contacto |

El contenido vive en `src/data/ciiiaData.ts`, con la fuente de cada dato. Las reglas de diseño, contenido y movimiento están en `CLAUDE.md`.
