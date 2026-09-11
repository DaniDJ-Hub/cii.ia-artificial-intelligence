/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

export interface FluidGlassProps {
  className?: string;
  geometry?: 'icosahedron' | 'sphere' | 'torus';
  scale?: number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  followPointer?: boolean;
  autoRotate?: boolean;
  color?: string;
}

function GlassShape({
  geometry = 'icosahedron',
  scale = 1.4,
  ior = 1.15,
  thickness = 1.6,
  chromaticAberration = 0.06,
  followPointer = true,
  autoRotate = true,
  color = '#5CA9DB',
}: Omit<FluidGlassProps, 'className'>) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { viewport, pointer, camera } = state;
    if (followPointer) {
      const v = viewport.getCurrentViewport(camera, [0, 0, 0]);
      const destX = (pointer.x * v.width) / 4;
      const destY = (pointer.y * v.height) / 4;
      easing.damp3(ref.current.position, [destX, destY, 0], 0.25, delta);
    }
    if (autoRotate) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={ref} scale={scale}>
      {geometry === 'sphere' && <sphereGeometry args={[1, 64, 64]} />}
      {geometry === 'torus' && <torusGeometry args={[0.8, 0.35, 32, 100]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 4]} />}
      <MeshTransmissionMaterial
        ior={ior}
        thickness={thickness}
        chromaticAberration={chromaticAberration}
        anisotropy={0.15}
        roughness={0.05}
        transmission={1}
        color={color}
        distortion={0.2}
        distortionScale={0.4}
        temporalDistortion={0.15}
      />
    </mesh>
  );
}

export default function FluidGlass({ className = '', ...props }: FluidGlassProps) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0, 4], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.8]}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 4]} intensity={1.4} />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#5CA9DB" />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />
      <GlassShape {...props} />
    </Canvas>
  );
}
