/**
 * Pipeline de fotografías del sitio.
 *
 * Lee los originales de assets/photos/, aplica el recorte configurado y genera
 * variantes WebP en public/images/. Escribe src/data/photos.generated.ts con las
 * medidas y los anchos disponibles, que es lo que usa el componente <Photo>.
 *
 * Decodifica y codifica con el Chromium instalado (Edge o Chrome), así que no
 * depende de binarios nativos de npm.
 *
 * Uso: npm run images [-- "<ruta a msedge.exe o chrome.exe>"]
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(ROOT, 'assets/photos');
const OUTPUT = resolve(ROOT, 'public/images');
const MANIFEST = resolve(ROOT, 'src/data/photos.generated.ts');
const DEVTOOLS_PORT = 9341;

const TARGET_WIDTHS = [480, 768, 1080, 1440, 2048];
const MAX_WIDTH = 2048;
const QUALITY = 0.82;
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

/**
 * Recortes como fracciones del original, válidos para cualquier resolución.
 *
 * inicio-inspeccion: deja fuera el monitor, que muestra cifras que no están
 * documentadas (24.98 mm, ±0.05 mm, 0.42 s). Se recorta el archivo y no por CSS
 * para que la versión con esas cifras nunca llegue a publicarse.
 */
const CROPS = {
  'inicio-inspeccion': { x: 0.098, y: 0, width: 0.533, height: 1 },
};

/**
 * Logotipos: se convierten a tinta de la marca sobre fondo transparente, se
 * invierten si vienen sobre fondo oscuro y se recortan a su contenido. Así un
 * muro de logos de orígenes distintos se lee como un solo sistema.
 */
const LOGO_PATTERN = /instituciones-fundadoras/;
const LOGO_WIDTHS = [240, 480];
const LOGO_INK = [14, 26, 36]; // --color-ink #0e1a24

/** 'nosotros-Global Solutions' → 'nosotros-global-solutions'. */
function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const BROWSERS = [
  process.env.CHROME_PATH,
  `${process.env['ProgramFiles(x86)']}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.ProgramFiles}\\Microsoft\\Edge\\Application\\msedge.exe`,
  `${process.env.ProgramFiles}\\Google\\Chrome\\Application\\chrome.exe`,
  '/usr/bin/google-chrome',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/** Se ejecuta dentro del navegador: recorta, reduce por mitades y exporta WebP. */
async function processImage(dataUrl, crop, targetWidths, maxWidth, quality) {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();

  const area = crop ?? { x: 0, y: 0, width: 1, height: 1 };
  const sx = Math.round(image.naturalWidth * area.x);
  const sy = Math.round(image.naturalHeight * area.y);
  const sw = Math.round(image.naturalWidth * area.width);
  const sh = Math.round(image.naturalHeight * area.height);

  const base = document.createElement('canvas');
  base.width = sw;
  base.height = sh;
  base.getContext('2d').drawImage(image, sx, sy, sw, sh, 0, 0, sw, sh);

  // Solo anchos claramente menores que el recorte, más el recorte mismo (sin ampliar).
  const widths = [...new Set([...targetWidths.filter((w) => w <= sw * 0.9), Math.min(sw, maxWidth)])].sort((a, b) => a - b);

  const variants = [];
  for (const width of widths) {
    // Reducir por mitades evita el aliasing de un único drawImage grande → pequeño.
    let source = base;
    while (source.width / 2 >= width) {
      const half = document.createElement('canvas');
      half.width = Math.round(source.width / 2);
      half.height = Math.round(source.height / 2);
      const context = half.getContext('2d');
      context.imageSmoothingQuality = 'high';
      context.drawImage(source, 0, 0, half.width, half.height);
      source = half;
    }
    const output = document.createElement('canvas');
    output.width = width;
    output.height = Math.round((sh / sw) * width);
    const context = output.getContext('2d');
    context.imageSmoothingQuality = 'high';
    context.drawImage(source, 0, 0, output.width, output.height);
    variants.push({ width, height: output.height, dataUrl: output.toDataURL('image/webp', quality) });
  }

  return { width: sw, height: sh, variants };
}

/** Se ejecuta dentro del navegador: logotipo → tinta sobre transparente, recortado. */
async function processLogo(dataUrl, targetWidths, ink, quality) {
  const image = new Image();
  image.src = dataUrl;
  await image.decode();

  const w = image.naturalWidth;
  const h = image.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const pixels = context.getImageData(0, 0, w, h);
  const data = pixels.data;
  const luminance = (i) => (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;

  // Fondo oscuro si el borde opaco es mayoritariamente oscuro: entonces se invierte.
  let borderSum = 0;
  let borderCount = 0;
  const sampleBorder = (x, y) => {
    const i = (y * w + x) * 4;
    if (data[i + 3] > 128) {
      borderSum += luminance(i);
      borderCount += 1;
    }
  };
  for (let x = 0; x < w; x += 1) {
    sampleBorder(x, 0);
    sampleBorder(x, h - 1);
  }
  for (let y = 0; y < h; y += 1) {
    sampleBorder(0, y);
    sampleBorder(w - 1, y);
  }
  const invert = borderCount > 0 && borderSum / borderCount < 0.5;

  // Tinta = cuánto se aleja del fondo. Se normaliza para que el trazo más fuerte
  // sea opaco y se descarta el ruido tenue (brillos, degradados del fondo).
  const amount = new Float32Array(w * h);
  let strongest = 0;
  for (let p = 0; p < w * h; p += 1) {
    const i = p * 4;
    const l = luminance(i);
    const value = (invert ? l : 1 - l) * (data[i + 3] / 255);
    amount[p] = value;
    if (value > strongest) strongest = value;
  }
  // Los logos sobre fondo oscuro suelen traer resplandores o degradados: al
  // invertirlos quedan como manchas grises, así que su umbral es más alto.
  const floor = invert ? 0.42 : 0.1;
  const ceiling = Math.max(strongest * 0.85, floor + 0.01);

  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let p = 0; p < w * h; p += 1) {
    const alpha = Math.min(1, Math.max(0, (amount[p] - floor) / (ceiling - floor)));
    const i = p * 4;
    data[i] = ink[0];
    data[i + 1] = ink[1];
    data[i + 2] = ink[2];
    data[i + 3] = Math.round(alpha * 255);
    if (data[i + 3] > 8) {
      const x = p % w;
      const y = Math.floor(p / w);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  context.putImageData(pixels, 0, 0);

  // Recorte al contenido con un margen mínimo.
  const pad = Math.round(Math.max(maxX - minX, maxY - minY) * 0.02);
  const sx = Math.max(0, minX - pad);
  const sy = Math.max(0, minY - pad);
  const sw = Math.min(w, maxX + pad + 1) - sx;
  const sh = Math.min(h, maxY + pad + 1) - sy;

  const trimmed = document.createElement('canvas');
  trimmed.width = sw;
  trimmed.height = sh;
  trimmed.getContext('2d').drawImage(canvas, sx, sy, sw, sh, 0, 0, sw, sh);

  const widths = [...new Set([...targetWidths.filter((width) => width <= sw * 0.9), Math.min(sw, targetWidths[targetWidths.length - 1])])].sort((a, b) => a - b);
  const variants = widths.map((width) => {
    const output = document.createElement('canvas');
    output.width = width;
    output.height = Math.round((sh / sw) * width);
    const outputContext = output.getContext('2d');
    outputContext.imageSmoothingQuality = 'high';
    outputContext.drawImage(trimmed, 0, 0, output.width, output.height);
    return { width, height: output.height, dataUrl: output.toDataURL('image/webp', quality) };
  });

  return { width: sw, height: sh, variants, inverted: invert };
}

async function devtools(path, method = 'GET') {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      return await (await fetch(`http://127.0.0.1:${DEVTOOLS_PORT}${path}`, { method })).json();
    } catch {
      await sleep(250);
    }
  }
  throw new Error('DevTools no respondió');
}

const sources = existsSync(SOURCE)
  ? (await readdir(SOURCE)).filter((file) => MIME[extname(file).toLowerCase()])
  : [];

if (sources.length === 0) {
  console.log(`No hay originales en ${SOURCE}. Guarda las fotos ahí y vuelve a ejecutar.`);
  process.exit(0);
}

const browserPath = process.argv[2] ?? BROWSERS.find((path) => existsSync(path));
if (!browserPath) throw new Error('No encontré Edge ni Chrome. Pasa la ruta como argumento o define CHROME_PATH.');

await mkdir(OUTPUT, { recursive: true });

const browser = spawn(
  browserPath,
  [
    '--headless=new',
    `--remote-debugging-port=${DEVTOOLS_PORT}`,
    `--user-data-dir=${resolve(ROOT, 'node_modules/.cache/photo-pipeline')}`,
    '--no-first-run',
    '--disable-extensions',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

try {
  await devtools('/json/version');
  const target = await devtools('/json/new?about:blank', 'PUT');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((done) => socket.addEventListener('open', done, { once: true }));

  let nextId = 0;
  const pending = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { done, fail } = pending.get(message.id);
      pending.delete(message.id);
      message.error ? fail(new Error(message.error.message)) : done(message.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((done, fail) => {
      nextId += 1;
      pending.set(nextId, { done, fail });
      socket.send(JSON.stringify({ id: nextId, method, params }));
    });

  await send('Runtime.enable');

  const manifest = {};
  const seen = new Map();
  for (const file of sources) {
    const extension = extname(file).toLowerCase();
    const name = slugify(basename(file, extname(file)));
    if (seen.has(name)) throw new Error(`«${file}» y «${seen.get(name)}» producen el mismo nombre: ${name}`);
    seen.set(name, file);

    const bytes = await readFile(resolve(SOURCE, file));
    const dataUrl = `data:${MIME[extension]};base64,${bytes.toString('base64')}`;
    const isLogo = LOGO_PATTERN.test(name);

    const { result, exceptionDetails } = await send('Runtime.evaluate', {
      expression: isLogo
        ? `(${processLogo.toString()})(${JSON.stringify(dataUrl)}, ${JSON.stringify(LOGO_WIDTHS)}, ${JSON.stringify(LOGO_INK)}, ${QUALITY})`
        : `(${processImage.toString()})(${JSON.stringify(dataUrl)}, ${JSON.stringify(CROPS[name] ?? null)}, ${JSON.stringify(TARGET_WIDTHS)}, ${MAX_WIDTH}, ${QUALITY})`,
      awaitPromise: true,
      returnByValue: true,
    });
    if (exceptionDetails) throw new Error(`${file}: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`);

    // Borrar variantes anteriores de esta foto para no dejar anchos huérfanos.
    for (const existing of await readdir(OUTPUT)) {
      if (new RegExp(`^${name}-\\d+\\.webp$`).test(existing)) await rm(resolve(OUTPUT, existing));
    }

    const { width, height, variants } = result.value;
    for (const variant of variants) {
      const buffer = Buffer.from(variant.dataUrl.slice(variant.dataUrl.indexOf(',') + 1), 'base64');
      await writeFile(resolve(OUTPUT, `${name}-${variant.width}.webp`), buffer);
    }

    manifest[name] = { width, height, widths: variants.map((variant) => variant.width) };
    const note = isLogo ? ` (logotipo${result.value.inverted ? ', invertido' : ''})` : CROPS[name] ? ' (recortada)' : '';
    console.log(`  ${name}${note}: ${width}×${height} → ${variants.map((variant) => `${variant.width}w`).join(', ')}`);
  }

  const entries = Object.keys(manifest)
    .sort()
    .map((name) => {
      const entry = manifest[name];
      return `  '${name}': { width: ${entry.width}, height: ${entry.height}, widths: [${entry.widths.join(', ')}] },`;
    });

  await writeFile(
    MANIFEST,
    `// Generado por scripts/build-images.mjs. No editar a mano: ejecutar \`npm run images\`.\n\n` +
      `export interface PhotoEntry {\n  width: number;\n  height: number;\n  widths: number[];\n}\n\n` +
      `export const PHOTOS: Record<string, PhotoEntry> = {\n${entries.join('\n')}\n};\n`,
  );

  console.log(`\nListo: ${Object.keys(manifest).length} fotos en public/images/ y manifiesto actualizado.`);
  socket.close();
} finally {
  browser.kill();
}
