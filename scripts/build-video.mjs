/**
 * Pipeline de video para scroll (scrubbing).
 *
 * Lee los originales de assets/video/ y genera en public/video/ versiones pensadas
 * para que el scroll controle `currentTime`, no para reproducirse:
 *
 * - Fotograma clave cada pocos frames y sin B-frames. Un MP4 normal trae uno cada
 *   5 s: cada seek obliga a decodificar hasta 150 frames y el video avanza a
 *   saltos (medido con WELCOME.mp4: ~90 ms por seek el original, ~5 ms este).
 * - Sin audio, con el índice al principio (faststart) para poder buscar pronto.
 * - Dos anchos: escritorio y móvil. Más un póster del primer fotograma y un fijo
 *   para movimiento reducido.
 *
 * Escribe src/data/videos.generated.ts con medidas, duración y rutas.
 *
 * Uso: npm run video
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ffmpegPath from 'ffmpeg-static';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(ROOT, 'assets/video');
const OUTPUT = resolve(ROOT, 'public/video');
const MANIFEST = resolve(ROOT, 'src/data/videos.generated.ts');
const EXTENSIONS = new Set(['.mp4', '.mov', '.m4v', '.webm']);

/**
 * `gop`: frames entre fotogramas clave. Más bajo = seek más rápido y archivo más
 * pesado. `crf`: calidad de x264 (más bajo = mejor).
 */
const VARIANTS = [
  { key: 'desktop', width: 1280, gop: 10, crf: 23 },
  { key: 'mobile', width: 960, gop: 8, crf: 25 },
];

/**
 * Segundo del fotograma fijo que se muestra con movimiento reducido. Si un video
 * no aparece aquí se usa el primer fotograma.
 *
 * welcome: el robot de frente con el logotipo del CII.IA en el pecho. El primer
 * fotograma repite el titular del hero, que está justo debajo.
 */
const STILLS = { welcome: 23.5 };

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ffmpeg(args) {
  return new Promise((done, fail) => {
    const child = spawn(ffmpegPath, ['-hide_banner', '-y', ...args], { stdio: ['ignore', 'ignore', 'pipe'] });
    let log = '';
    child.stderr.on('data', (chunk) => (log += chunk));
    child.on('error', fail);
    child.on('close', (code) => (code === 0 ? done(log) : fail(new Error(`ffmpeg terminó con código ${code}\n${log.slice(-2000)}`))));
  });
}

/** Duración, medidas y fps del original, leídos de la salida de ffmpeg. */
async function probe(file) {
  // Sin salida: ffmpeg imprime la información y termina con error, que se ignora.
  const log = await ffmpeg(['-i', file]).catch((error) => error.message);
  const duration = log.match(/Duration: (\d+):(\d+):([\d.]+)/);
  const video = log.match(/Video: .*?, (\d{2,5})x(\d{2,5})[, ].*?([\d.]+) fps/);
  if (!duration || !video) throw new Error(`No pude leer la información de ${file}`);
  return {
    duration: +duration[1] * 3600 + +duration[2] * 60 + +duration[3],
    width: +video[1],
    height: +video[2],
    fps: +video[3],
  };
}

if (!ffmpegPath || !existsSync(ffmpegPath)) {
  throw new Error('No encontré ffmpeg. Ejecuta `npm install` (instala ffmpeg-static).');
}

const sources = existsSync(SOURCE) ? (await readdir(SOURCE)).filter((file) => EXTENSIONS.has(extname(file).toLowerCase())) : [];
if (sources.length === 0) {
  console.log(`No hay originales en ${SOURCE}. Guarda los videos ahí y vuelve a ejecutar.`);
  process.exit(0);
}

await mkdir(OUTPUT, { recursive: true });

const manifest = {};
const seen = new Map();
for (const file of sources) {
  const name = slugify(basename(file, extname(file)));
  if (seen.has(name)) throw new Error(`«${file}» y «${seen.get(name)}» producen el mismo nombre: ${name}`);
  seen.set(name, file);

  const input = resolve(SOURCE, file);
  const info = await probe(input);
  console.log(`  ${name}: ${info.width}×${info.height}, ${info.fps} fps, ${info.duration.toFixed(2)} s`);

  for (const existing of await readdir(OUTPUT)) {
    if (existing.startsWith(`${name}-`)) await rm(resolve(OUTPUT, existing));
  }

  const files = {};
  let size = { width: 0, height: 0 };
  for (const variant of VARIANTS) {
    const width = Math.min(variant.width, info.width);
    const height = Math.round((info.height / info.width) * width / 2) * 2;
    const out = `${name}-${width}.mp4`;
    await ffmpeg([
      '-i', input,
      '-an',
      '-vf', `scale=${width}:${height}:flags=lanczos`,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', String(variant.crf),
      '-profile:v', 'high',
      '-pix_fmt', 'yuv420p',
      '-g', String(variant.gop),
      '-keyint_min', String(variant.gop),
      '-sc_threshold', '0',
      '-bf', '0',
      '-movflags', '+faststart',
      resolve(OUTPUT, out),
    ]);
    files[variant.key] = `/video/${out}`;
    if (variant.key === 'desktop') size = { width, height };
    const megabytes = (await stat(resolve(OUTPUT, out))).size / 1e6;
    console.log(`    ${variant.key}: ${out} (${megabytes.toFixed(1)} MB, clave cada ${variant.gop} frames)`);
  }

  // Póster: el primer fotograma, para que no haya salto cuando el video carga.
  const poster = `${name}-poster.webp`;
  await ffmpeg(['-i', input, '-frames:v', '1', '-vf', `scale=${size.width}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '80', resolve(OUTPUT, poster)]);

  const stillAt = Math.min(STILLS[name] ?? 0, Math.max(0, info.duration - 0.1));
  const still = `${name}-still.webp`;
  await ffmpeg(['-ss', String(stillAt), '-i', input, '-frames:v', '1', '-vf', `scale=${size.width}:-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '80', resolve(OUTPUT, still)]);

  manifest[name] = {
    ...size,
    duration: +info.duration.toFixed(3),
    sources: files,
    poster: `/video/${poster}`,
    still: `/video/${still}`,
  };
}

const entries = Object.keys(manifest)
  .sort()
  .map((name) => `  '${name}': ${JSON.stringify(manifest[name], null, 2).replace(/\n/g, '\n  ')},`);

await writeFile(
  MANIFEST,
  `// Generado por scripts/build-video.mjs. No editar a mano: ejecutar \`npm run video\`.\n\n` +
    `export interface VideoEntry {\n  width: number;\n  height: number;\n  duration: number;\n  sources: { desktop: string; mobile: string };\n  poster: string;\n  still: string;\n}\n\n` +
    `export const VIDEOS: Record<string, VideoEntry> = {\n${entries.join('\n')}\n};\n`,
);

console.log(`\nListo: ${Object.keys(manifest).length} video(s) en public/video/ y manifiesto actualizado.`);
