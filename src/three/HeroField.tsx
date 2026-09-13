import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollTrigger, useGSAP } from '../motion/gsap';

/**
 * Campo de inspección: una nube de puntos que pasa de dispersa a retícula
 * mientras la cámara avanza, recorrida por una línea de barrido.
 *
 * Es la lectura visual de lo que hace el centro —datos sueltos que se ordenan
 * hasta volverse un sistema que opera— y del recorrido «de la idea a la
 * operación». El progreso viene del scroll del acto oscuro de la landing.
 *
 * Todo el morfeo ocurre en la GPU: dos posiciones por punto y una interpolación
 * en el vertex shader. Sin trabajo por punto en el hilo principal.
 */

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uScan;
  uniform vec2 uPointer;

  attribute vec3 aGrid;
  attribute float aSeed;

  varying float vScan;
  varying float vDepth;

  void main() {
    float eased = uProgress * uProgress * (3.0 - 2.0 * uProgress);
    vec3 pos = mix(position, aGrid, eased);

    // Deriva orgánica: fuerte mientras los datos están sueltos, casi nula al
    // quedar alineados.
    float drift = 1.0 - eased;
    pos.x += sin(uTime * 0.24 + aSeed * 6.283) * (0.35 * drift + 0.04);
    pos.y += cos(uTime * 0.19 + aSeed * 4.712) * (0.35 * drift + 0.04);
    pos.z += sin(uTime * 0.16 + aSeed * 3.141) * 0.30 * drift;

    pos.xy += uPointer * 0.25;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float dist = max(-mvPosition.z, 0.001);

    vScan = 1.0 - smoothstep(0.0, 0.42, abs(pos.y - uScan));
    vDepth = clamp(1.0 - dist / 16.0, 0.0, 1.0);

    // Puntos finos: el campo es una textura de fondo, nunca una mancha que
    // compita con el texto.
    gl_PointSize = uSize * (0.75 + 0.5 * vScan) * (16.0 / dist);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  precision mediump float;

  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform float uOpacity;

  varying float vScan;
  varying float vDepth;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = dot(coord, coord);
    if (dist > 0.25) discard;

    float alpha = smoothstep(0.25, 0.02, dist);
    vec3 color = mix(uColor, uAccent, vScan * 0.85);
    gl_FragColor = vec4(color, alpha * uOpacity * (0.15 + 0.85 * vDepth) * (0.30 + 0.70 * vScan));
  }
`;

function buildGeometry(count: number) {
  const geometry = new THREE.BufferGeometry();
  const scatter = new Float32Array(count * 3);
  const grid = new Float32Array(count * 3);
  const seed = new Float32Array(count);

  const layers = 4;
  const perLayer = Math.ceil(count / layers);
  const columns = Math.ceil(Math.sqrt(perLayer * 2.2));
  const rows = Math.ceil(perLayer / columns);

  for (let i = 0; i < count; i += 1) {
    // Disperso: volumen ancho y suelto.
    scatter[i * 3] = (Math.random() - 0.5) * 19;
    scatter[i * 3 + 1] = (Math.random() - 0.5) * 11;
    scatter[i * 3 + 2] = (Math.random() - 0.5) * 11 - 2;

    // Ordenado: retícula en cuatro capas de profundidad.
    const layer = Math.floor(i / perLayer);
    const index = i % perLayer;
    const column = index % columns;
    const row = Math.floor(index / columns);
    grid[i * 3] = (column / (columns - 1) - 0.5) * 15.5;
    grid[i * 3 + 1] = (row / Math.max(rows - 1, 1) - 0.5) * 7.6;
    grid[i * 3 + 2] = 2.2 - layer * 1.7;

    seed[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(scatter, 3));
  geometry.setAttribute('aGrid', new THREE.BufferAttribute(grid, 3));
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 24);

  return geometry;
}

function Field({ progress, count }: { progress: React.RefObject<number>; count: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  const smoothed = useRef(0);
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const geometry = useMemo(() => buildGeometry(count), [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: 1.35 },
      uScan: { value: -4 },
      uPointer: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Color('#2b6285') },
      uAccent: { value: new THREE.Color('#79b9e2') },
      uOpacity: { value: 0.72 },
    }),
    [],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.targetY = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const step = Math.min(1, delta * 3.2);
    smoothed.current += ((progress.current ?? 0) - smoothed.current) * step;
    const value = smoothed.current;

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uProgress.value = value;
    // Barrido continuo de abajo hacia arriba, como una inspección en línea.
    material.uniforms.uScan.value = -4.2 + ((state.clock.elapsedTime * 0.6) % 8.4);

    pointer.current.x += (pointer.current.targetX - pointer.current.x) * Math.min(1, delta * 2.2);
    pointer.current.y += (pointer.current.targetY - pointer.current.y) * Math.min(1, delta * 2.2);
    material.uniforms.uPointer.value.set(pointer.current.x, pointer.current.y);

    // Viaje de cámara: entra en el campo conforme avanza el acto.
    camera.position.z = 8.6 - value * 5.2;
    camera.position.y = value * 0.75;
    camera.rotation.x = -value * 0.06;

    const points = pointsRef.current;
    if (points) {
      points.rotation.y = (1 - value) * 0.34 + pointer.current.x * 0.05;
      points.rotation.x = (1 - value) * -0.12 + pointer.current.y * 0.04;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** `trigger`: selector del bloque cuyo scroll controla el recorrido. */
export function HeroField({ trigger }: { trigger: string }) {
  const progress = useRef(0);
  const [active, setActive] = useState(true);
  const count = useMemo(() => (window.innerWidth < 1280 ? 3600 : 5600), []);

  useGSAP(
    () => {
      const element = document.querySelector(trigger);
      if (!element) return;
      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: 'bottom top',
        onUpdate: (self) => {
          progress.current = self.progress;
        },
        // Fuera del acto no se dibuja ni un frame.
        onToggle: (self) => setActive(self.isActive),
      });
      return () => scrollTrigger.kill();
    },
    { dependencies: [trigger] },
  );

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 8.6], fov: 46 }}
      style={{ pointerEvents: 'none' }}
    >
      <Field progress={progress} count={count} />
    </Canvas>
  );
}

export default HeroField;
