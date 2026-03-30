"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Float, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function RotatingKnot() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.15;
    ref.current.rotation.x += delta * 0.08;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh ref={ref} position={[0, 1.2, 0]} castShadow>
        <torusKnotGeometry args={[0.65, 0.22, 128, 32]} />
        <meshPhysicalMaterial
          color="#111111"
          metalness={1}
          roughness={0.03}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  );
}

function Orbs() {
  const g1 = useRef<THREE.Mesh>(null!);
  const g2 = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    g1.current.position.x = Math.sin(t * 0.4) * 1.6;
    g1.current.position.z = Math.cos(t * 0.4) * 1.1;
    g1.current.position.y = 0.7 + Math.sin(t * 0.8) * 0.3;
    g1.current.rotation.y = t * 0.3;

    g2.current.position.x = Math.cos(t * 0.3) * 1.4;
    g2.current.position.z = Math.sin(t * 0.35) * 1.4;
    g2.current.position.y = 1.3 + Math.cos(t * 0.6) * 0.35;
    g2.current.rotation.x = t * 0.25;
    g2.current.rotation.z = t * 0.15;
  });

  return (
    <>
      <mesh ref={g1} castShadow>
        <icosahedronGeometry args={[0.22, 2]} />
        <meshPhysicalMaterial
          color="#CDFF00"
          metalness={0.7}
          roughness={0.1}
          emissive="#CDFF00"
          emissiveIntensity={0.25}
        />
      </mesh>
      <mesh ref={g2} castShadow>
        <octahedronGeometry args={[0.18, 0]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={1}
          roughness={0.02}
          envMapIntensity={2.5}
        />
      </mesh>
    </>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#070707", 5, 14]} />
      <ambientLight intensity={0.08} />
      <spotLight
        position={[3, 6, 3]}
        intensity={1}
        color="#CDFF00"
        angle={0.5}
        penumbra={0.8}
        castShadow
        shadow-mapSize={[512, 512]}
      />
      <pointLight position={[-3, 3, -2]} intensity={0.2} color="#ffffff" />

      <RotatingKnot />
      <Orbs />

      {/* Reflective ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[24, 24]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#070707"
          metalness={0.5}
          mirror={0}
        />
      </mesh>

      <Environment preset="night" />
    </>
  );
}

export default function ReflectionScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows={{ type: THREE.BasicShadowMap }}
        camera={{ position: [0, 2.2, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
