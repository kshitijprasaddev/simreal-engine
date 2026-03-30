"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

/* ── Flowing grid terrain ────────────────────────────────── */

function Terrain() {
  const meshRef = useRef<THREE.LineSegments>(null!);
  const cols = 120;
  const rows = 60;
  const width = 28;
  const depth = 16;

  const { positions, indices } = useMemo(() => {
    const pos = new Float32Array((cols + 1) * (rows + 1) * 3);
    const idx: number[] = [];

    // Build vertex positions
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const i = (r * (cols + 1) + c) * 3;
        pos[i] = (c / cols - 0.5) * width;
        pos[i + 1] = 0;
        pos[i + 2] = (r / rows - 0.5) * depth;
      }
    }

    // Build line indices (horizontal + vertical grid lines)
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = r * (cols + 1) + c;
        idx.push(a, a + 1);
      }
    }
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r < rows; r++) {
        const a = r * (cols + 1) + c;
        idx.push(a, a + (cols + 1));
      }
    }

    return {
      positions: pos,
      indices: new Uint32Array(idx),
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const geo = meshRef.current?.geometry;
    if (!geo) return;

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        const i = (r * (cols + 1) + c) * 3;
        const x = arr[i];
        const z = arr[i + 2];

        // Multi-octave displacement
        const y =
          Math.sin(x * 0.4 + t * 0.35) * 0.55 +
          Math.sin(z * 0.6 + t * 0.25) * 0.4 +
          Math.sin((x + z) * 0.25 + t * 0.45) * 0.35 +
          Math.sin(x * 0.8 - t * 0.2) * 0.15 +
          Math.cos(z * 1.2 + t * 0.15) * 0.1;

        arr[i + 1] = y;
      }
    }

    pos.needsUpdate = true;
  });

  return (
    <lineSegments ref={meshRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, 0.5, 2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="index"
          args={[indices, 1]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#CDFF00" transparent opacity={0.12} />
    </lineSegments>
  );
}

/* ── Floating accent lines ───────────────────────────────── */

function AccentLines() {
  const groupRef = useRef<THREE.Group>(null!);
  const lineCount = 8;

  const lines = useMemo(() => {
    return Array.from({ length: lineCount }, (_, i) => {
      const pts = 80;
      const positions = new Float32Array(pts * 3);
      const baseY = (i / lineCount - 0.5) * 6;
      const baseZ = (Math.random() - 0.5) * 4;

      for (let p = 0; p < pts; p++) {
        const frac = p / (pts - 1);
        positions[p * 3] = (frac - 0.5) * 24;
        positions[p * 3 + 1] = baseY;
        positions[p * 3 + 2] = baseZ;
      }

      return { positions, index: i, baseY, baseZ };
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const children = groupRef.current?.children;
    if (!children) return;

    for (let l = 0; l < lineCount; l++) {
      const line = children[l] as THREE.Line;
      const geo = line.geometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      const pts = arr.length / 3;
      const { baseY, baseZ } = lines[l];

      for (let p = 0; p < pts; p++) {
        const x = arr[p * 3];
        arr[p * 3 + 1] =
          baseY +
          Math.sin(x * 0.3 + t * 0.5 + l * 1.2) * 0.8 +
          Math.sin(x * 0.15 + t * 0.3) * 0.5;
        arr[p * 3 + 2] =
          baseZ + Math.sin(x * 0.2 + t * 0.4 + l * 0.8) * 0.3;
      }

      pos.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map(({ positions, index }) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#CDFF00"
            transparent
            opacity={0.04 + (index % 3) * 0.02}
          />
        </line>
      ))}
    </group>
  );
}

/* ── Intersection dots ───────────────────────────────────── */

function GridDots() {
  const ref = useRef<THREE.Points>(null!);
  const spacing = 6;
  const cols = 20;
  const rows = 12;

  const positions = useMemo(() => {
    const pos = new Float32Array(cols * rows * 3);
    let idx = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos[idx++] = (c / cols - 0.5) * 28;
        pos[idx++] = 0;
        pos[idx++] = (r / rows - 0.5) * 16;
      }
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const geo = ref.current?.geometry;
    if (!geo) return;

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let i = 0; i < cols * rows; i++) {
      const x = arr[i * 3];
      const z = arr[i * 3 + 2];
      arr[i * 3 + 1] =
        Math.sin(x * 0.4 + t * 0.35) * 0.55 +
        Math.sin(z * 0.6 + t * 0.25) * 0.4 +
        Math.sin((x + z) * 0.25 + t * 0.45) * 0.35 +
        Math.sin(x * 0.8 - t * 0.2) * 0.15 +
        Math.cos(z * 1.2 + t * 0.15) * 0.1;
    }

    pos.needsUpdate = true;
  });

  return (
    <points ref={ref} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, 0.5, 2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#CDFF00"
        size={0.03}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Horizon glow (simple plane) ─────────────────────────── */

function HorizonGlow() {
  return (
    <mesh position={[0, -2.5, -6]} rotation={[-0.2, 0, 0]}>
      <planeGeometry args={[40, 8]} />
      <meshBasicMaterial color="#CDFF00" transparent opacity={0.015} side={THREE.DoubleSide} />
    </mesh>
  );
}

/* ── Main scene ──────────────────────────────────────────── */

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#070707", 6, 18]} />
      <Terrain />
      <GridDots />
      <AccentLines />
      <HorizonGlow />
    </>
  );
}

/* ── Exported component ──────────────────────────────────── */

export default function WireframeTerrain() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      {/* Gradient edges */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#070707] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070707] to-transparent" />
      </div>

      <motion.div style={{ opacity, y }} className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 4, 10], fov: 50, near: 0.1, far: 30 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </motion.div>

      {/* Center label */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <motion.div
          style={{ opacity }}
          className="text-center"
        >
          <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-[#CDFF00]/50 mb-3">
            Infrastructure
          </p>
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white/90">
            Built for the edge.
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
