"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 4000;

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const base = new THREE.Color("#CDFF00");
    const dim = new THREE.Color("#334400");

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 3;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      velocities[i3] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      const mix = Math.random();
      const c = base.clone().lerp(dim, mix);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    return { positions, velocities, colors };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position
      .array as Float32Array;
    const t = clock.getElapsedTime();

    const a0x = Math.cos(t * 0.3) * 2.5;
    const a0y = Math.sin(t * 0.5) * 1.5;
    const a0z = Math.sin(t * 0.3) * 2;

    const a1x = Math.sin(t * 0.4) * 2;
    const a1y = Math.cos(t * 0.35) * 2;
    const a1z = Math.cos(t * 0.45) * 2.5;

    const a2x = Math.sin(t * 0.25) * 3;
    const a2y = Math.sin(t * 0.6) * 1.5;
    const a2z = Math.cos(t * 0.5) * 1.5;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const px = posArr[i3],
        py = posArr[i3 + 1],
        pz = posArr[i3 + 2];

      let fx = 0,
        fy = 0,
        fz = 0;

      // Attractor 0
      let dx = a0x - px,
        dy = a0y - py,
        dz = a0z - pz;
      let dSq = dx * dx + dy * dy + dz * dz + 0.5;
      let f = 1.2 / dSq;
      fx += dx * f;
      fy += dy * f;
      fz += dz * f;

      // Attractor 1
      dx = a1x - px;
      dy = a1y - py;
      dz = a1z - pz;
      dSq = dx * dx + dy * dy + dz * dz + 0.5;
      f = 0.8 / dSq;
      fx += dx * f;
      fy += dy * f;
      fz += dz * f;

      // Attractor 2
      dx = a2x - px;
      dy = a2y - py;
      dz = a2z - pz;
      dSq = dx * dx + dy * dy + dz * dz + 0.5;
      f = 1.0 / dSq;
      fx += dx * f;
      fy += dy * f;
      fz += dz * f;

      // Damping + force
      velocities[i3] = velocities[i3] * 0.965 + fx * 0.006;
      velocities[i3 + 1] = velocities[i3 + 1] * 0.965 + fy * 0.006;
      velocities[i3 + 2] = velocities[i3 + 2] * 0.965 + fz * 0.006;

      // Velocity clamp
      const vx = velocities[i3],
        vy = velocities[i3 + 1],
        vz = velocities[i3 + 2];
      const vLen = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (vLen > 0.07) {
        const s = 0.07 / vLen;
        velocities[i3] *= s;
        velocities[i3 + 1] *= s;
        velocities[i3 + 2] *= s;
      }

      posArr[i3] += velocities[i3];
      posArr[i3 + 1] += velocities[i3 + 1];
      posArr[i3 + 2] += velocities[i3 + 2];

      // Soft boundary
      for (let j = 0; j < 3; j++) {
        if (Math.abs(posArr[i3 + j]) > 5.5) {
          posArr[i3 + j] *= 0.95;
          velocities[i3 + j] *= -0.5;
        }
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function AttractorParticles() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
