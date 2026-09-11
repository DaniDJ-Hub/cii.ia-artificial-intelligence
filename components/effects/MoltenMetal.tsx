import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export type MoltenMetalColorMode = 'molten' | 'ember' | 'frost';

export interface MoltenMetalProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: MoltenMetalColorMode;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const colorModeToFloat = (mode: MoltenMetalColorMode): number => (mode === 'ember' ? 1 : mode === 'frost' ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uScale;
uniform float uDetail;
uniform float uGlow;
uniform float uCoreSize;
uniform float uSwirl;
uniform float uFold;
uniform float uBlackPoint;
uniform float uBrightness;
uniform float uColorMode;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform bool uEnableMouse;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;
  vec2 drift = vec2(0.0);
  if (uEnableMouse) {
    drift = (uMouse - 0.5) * uMouseStrength * 2.0;
  }
  p += drift;
  vec2 i = p;
  float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p);
  float rot = d + time + p.x * uSwirl;
  float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;
  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp;
    float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }
  c /= 6.0;
  float intensity = max(c - uBlackPoint, 0.0) * uBrightness;
  float g = clamp(intensity, 0.0, 1.0);
  float mid = 0.5;
  if (uColorMode > 1.5) mid = 0.65;
  else if (uColorMode > 0.5) mid = 0.35;
  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));
  float a = g;
  if (uGrain > 0.5) {
    float gr = hash(gl_FragCoord.xy + iTime);
    a += (gr - 0.5) * uGrainIntensity;
  }
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}
`;

type MoltenMetalCtx = { renderer: InstanceType<typeof Renderer>; program: InstanceType<typeof Program>; mesh: InstanceType<typeof Mesh> };
const ctxMap = new WeakMap<HTMLDivElement, MoltenMetalCtx>();

const MoltenMetal: React.FC<MoltenMetalProps> = ({
  color1 = '#5CA9DB',
  color2 = '#29729F',
  color3 = '#0A0A0B',
  speed = 0.3,
  scale = 4,
  detail = 3,
  glow = 1.5,
  coreSize = 0.09,
  swirl = 0.8,
  fold = -0.18,
  blackPoint = 0.05,
  brightness = 1.2,
  colorMode = 'molten',
  grain = true,
  grainIntensity = 0.04,
  mouseInteraction = true,
  mouseStrength = 0.25,
  opacity = 0.85,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: 0.3 },
        uScale: { value: 4 },
        uDetail: { value: 3 },
        uGlow: { value: 1.5 },
        uCoreSize: { value: 0.09 },
        uSwirl: { value: 0.8 },
        uFold: { value: -0.18 },
        uBlackPoint: { value: 0.05 },
        uBrightness: { value: 1.2 },
        uColorMode: { value: 0 },
        uGrain: { value: 1 },
        uGrainIntensity: { value: 0.04 },
        uOpacity: { value: 0.85 },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseStrength: { value: 0.25 },
        uEnableMouse: { value: true },
        uColor1: { value: new Float32Array([1, 1, 1]) },
        uColor2: { value: new Float32Array([1, 1, 1]) },
        uColor3: { value: new Float32Array([1, 1, 1]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctxMap.set(container, { renderer, program, mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const targetMouse: [number, number] = [0.5, 0.5];
    const currentMouse: [number, number] = [0.5, 0.5];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    const handleMouseLeave = () => {
      targetMouse[0] = 0.5;
      targetMouse[1] = 0.5;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      const m = program.uniforms.uMouse.value as Float32Array;
      m[0] = currentMouse[0];
      m[1] = currentMouse[1];
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener('visibilitychange', onVisibility);
    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      ctxMap.delete(container);
      if (canvas.parentNode === container) container.removeChild(canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = ctxMap.get(container);
    if (!ctx) return;
    const u = ctx.program.uniforms;
    u.uSpeed.value = speed;
    u.uScale.value = scale;
    u.uDetail.value = detail;
    u.uGlow.value = glow;
    u.uCoreSize.value = Math.max(coreSize, 0.001);
    u.uSwirl.value = swirl;
    u.uFold.value = fold;
    u.uBlackPoint.value = blackPoint;
    u.uBrightness.value = brightness;
    u.uColorMode.value = colorModeToFloat(colorMode);
    u.uGrain.value = grain ? 1 : 0;
    u.uGrainIntensity.value = grainIntensity;
    u.uOpacity.value = opacity;
    u.uMouseStrength.value = mouseStrength;
    u.uEnableMouse.value = mouseInteraction;
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const c3 = hexToRgb(color3);
    (u.uColor1.value as Float32Array).set(c1);
    (u.uColor2.value as Float32Array).set(c2);
    (u.uColor3.value as Float32Array).set(c3);
  }, [color1, color2, color3, speed, scale, detail, glow, coreSize, swirl, fold, blackPoint, brightness, colorMode, grain, grainIntensity, mouseInteraction, mouseStrength, opacity]);

  return <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`.trim()} />;
};

export default MoltenMetal;
