# CII.IA · Dirección de fotografía

El sitio usa **fotografía real del CII.IA**. Nada de banco de imágenes ni de
renders genéricos: esa vía ya se descartó porque hacía ver el sitio como una
plantilla y porque presentar instalaciones que no son las propias es
sencillamente falso.

Si de una sección no hay foto real, esa sección va sin imagen. Es preferible
una página honesta y tipográfica a una foto prestada.

## Tratamiento

Del manual de marca (ciiia.mx/brandguide): blanco y negro en tonos fríos,
contrastado con algún toque de color, con lectura «futurista y dinámica».

En la práctica:

- Base desaturada con viraje frío, coherente con `navy` y `steel`.
- El único color que puede sobrevivir es el de un elemento de seguridad o una
  señal de la propia planta. No se añade color que no estuviera en la escena.
- Sin filtros de moda, sin viñeta pesada, sin halos.
- El tratamiento lo aplica el sitio por CSS, así que **las fotos se entregan sin
  editar**: así se puede cambiar el revelado sin volver a pedir material.

## Qué encargar

### Prioridad 1

| Foto | Dónde va | Por qué |
| --- | --- | --- |
| AI Lab: celda de manufactura, dron, cómputo edge y una general del espacio | `/soluciones/ai-lab` | Es el diferenciador físico del centro; hoy se afirma sin demostrarse |
| Sede en el PIIT: exterior e interior | `/nosotros` | Ancla «Global Solutions delivered Locally» en un lugar que existe |
| Caso de inspección en operación | Inicio, bloque de evidencia | Acompaña las cifras documentadas |

### Prioridad 2

| Foto | Dónde va |
| --- | --- |
| Sesión de Academy con personas trabajando | `/soluciones/academy` |
| Detalle por caso, o al menos por sector | `/casos` y `/casos/:id` |
| Retratos del equipo o la dirección | `/nosotros` |

Para `/ecosistema` no hacen falta fotos sino **logotipos**, y hace falta permiso
de cada organización (`PENDIENTE_R9` en `ciiiaData.ts`).

## Cómo encuadrar

1. **Aire a un lado.** Un tercio de la composición se reserva al titular. Sin
   ese espacio la foto no se puede usar como portada.
2. **Luz rasante.** Marca el metal y la textura del equipo. Evitar el flash
   frontal, que aplana y delata la foto improvisada.
3. **Dos versiones de cada escena:** horizontal 3:2 y vertical 4:5.
4. **Gente trabajando, no posando.** Nadie mirando a cámara ni con los brazos
   cruzados.
5. **Sin marcas de terceros** visibles que no estén autorizadas.

## Especificaciones de entrega

- 2400 px de ancho como mínimo, sin recortar y sin editar.
- JPEG de máxima calidad o el original de cámara.
- Archivos a `public/images/`, con nombre descriptivo en minúsculas y guiones
  (`ai-lab-celda-manufactura.jpg`).
- El sitio genera las variantes WebP y AVIF y los tamaños responsivos.

## Requisitos que no son negociables

- **Texto alternativo** por foto, describiendo lo que se ve. Sin él la imagen no
  se publica.
- **Consentimiento por escrito** de toda persona identificable.
- **Autorización del cliente** si la foto se tomó en sus instalaciones.
- El pie de foto dice lo que la imagen es. Una foto del laboratorio no se
  presenta como si fuera una planta en operación.
