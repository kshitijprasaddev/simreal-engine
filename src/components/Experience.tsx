"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── 3D Scene ─────────────────────────────────────────────── */

function CoreKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.08;
    ref.current.rotation.y = t * 0.14;
  });
  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1.6, 0.45, 300, 64]} />
        <meshStandardMaterial
          color="#CDFF00"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

function OuterRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.15) * 0.3;
    ref.current.rotation.z = t * 0.06;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[3.2, 0.015, 64, 256]} />
      <meshBasicMaterial color="#CDFF00" transparent opacity={0.12} />
    </mesh>
  );
}

function InnerRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.09;
    ref.current.rotation.x = Math.PI / 3 + Math.cos(t * 0.12) * 0.2;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.01, 64, 200]} />
      <meshBasicMaterial color="#CDFF00" transparent opacity={0.08} />
    </mesh>
  );
}

function Particles() {
  const count = 800;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#CDFF00"
        size={0.012}
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[6, 6, 6]} intensity={0.7} color="#CDFF00" />
      <pointLight position={[-4, -2, 4]} intensity={0.3} color="#ffffff" />
      <pointLight position={[0, -5, -3]} intensity={0.2} color="#CDFF00" />
      <CoreKnot />
      <OuterRing />
      <InnerRing />
      <Particles />
    </>
  );
}

/* ── Card data ────────────────────────────────────────────── */

const steps = [
  {
    num: "01",
    title: "Ingest",
    headline: "Accept policies from any simulator",
    desc: "The idea is to build a universal import layer that accepts trained neural policies from Isaac Sim, Gazebo, CARLA, AirSim, or any custom environment and normalizes them into a common intermediate representation.",
    image: "/ingest.jpg",
  },
  {
    num: "02",
    title: "Validate",
    headline: "Catch failures before they happen",
    desc: "An automated verification stage that stress tests every policy against physics constraints and edge cases before it ever touches real hardware. The vision is a growing database of failure scenarios drawn from real world incident data.",
    image: "/data.jpg",
  },
  {
    num: "03",
    title: "Compile",
    headline: "Target any edge hardware",
    desc: "A compiler that translates PyTorch and JAX computation graphs into optimized binaries for platforms like NVIDIA Jetson, Qualcomm RB5, or custom FPGAs. The goal is sub 5ms inference at the edge with zero cloud dependency.",
    image: "/compile.jpg",
  },
  {
    num: "04",
    title: "Deploy",
    headline: "From binary to robot in one step",
    desc: "The final stage would generate containerized ROS 2 nodes ready for any robot, drone, or autonomous vehicle, with OTA updates, telemetry, and rollback safeguards built into the workflow.",
    image: "/deploy.jpg",
  },
];

/* ── Slide transitions ────────────────────────────────────── */

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const textVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ── Component ────────────────────────────────────────────── */

export default function Experience() {
  const [[active, direction], setActive] = useState([0, 0]);

  const next = useCallback(
    () => setActive(([a]) => [(a + 1) % steps.length, 1]),
    [],
  );
  const prev = useCallback(
    () => setActive(([a]) => [(a - 1 + steps.length) % steps.length, -1]),
    [],
  );

  const step = steps[active];

  return (
    <section id="pipeline" className="relative py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12 md:mb-20">
        <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#CDFF00] mb-4">
          The Concept
        </p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] max-w-[640px]">
          How it would work.
        </h2>
        <p className="text-white/40 mt-5 text-base md:text-lg max-w-[540px] leading-relaxed">
          Autonomy teams spend most of their engineering hours on deployment
          tooling instead of building intelligence. SimReal is the idea of
          compressing that entire workflow into one automated pipeline.
        </p>
      </div>

      {/* ── Desktop layout ────────────────────────────────── */}
      <div className="hidden md:block max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="relative grid grid-cols-12 gap-8 items-center min-h-[600px]">
          {/* 3D scene - center / left */}
          <div className="col-span-7 relative h-[600px]">
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
              style={{ background: "transparent" }}
            >
              <Scene />
            </Canvas>

            {/* Step indicator overlaid on canvas bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
              {steps.map((s, i) => (
                <button
                  key={s.num}
                  onClick={() =>
                    setActive(([prev]) => [i, i > prev ? 1 : -1])
                  }
                  className={`w-10 h-[3px] rounded-full transition-all duration-500 ${
                    i === active
                      ? "bg-[#CDFF00] w-16"
                      : "bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Card - right side */}
          <div className="col-span-5 relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-lg"
              >
                {/* Image */}
                <div className="relative h-[260px] overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 40vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />

                  {/* Arrows on image */}
                  <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                    <button
                      onClick={prev}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#CDFF00] hover:bg-[#CDFF00]/10 transition-all duration-300"
                    >
                      <ChevronLeft size={18} className="text-white/70" />
                    </button>
                    <button
                      onClick={next}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#CDFF00] hover:bg-[#CDFF00]/10 transition-all duration-300"
                    >
                      <ChevronRight size={18} className="text-white/70" />
                    </button>
                  </div>
                </div>

                {/* Text content */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={active}
                    custom={direction}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="p-7"
                  >
                    <span className="text-[#CDFF00] font-mono text-xs tracking-[0.3em] block mb-2">
                      Step {step.num}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-sm mb-4">
                      {step.headline}
                    </p>
                    <p className="text-white/35 text-sm leading-[1.75]">
                      {step.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Mobile layout ─────────────────────────────────── */}
      <div className="md:hidden px-6">
        {/* 3D scene compact */}
        <div className="relative h-[320px] -mx-6 mb-8">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        </div>

        {/* Active card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#0A0A0A]/90"
          >
            <div className="relative h-[200px]">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 90vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <span className="text-[#CDFF00] font-mono text-xs tracking-[0.3em] block mb-2">
                Step {step.num}
              </span>
              <h3 className="text-xl font-bold tracking-tight mb-1">
                {step.title}
              </h3>
              <p className="text-white/50 text-xs mb-3">{step.headline}</p>
              <p className="text-white/35 text-sm leading-[1.75]">
                {step.desc}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile nav */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {steps.map((s, i) => (
              <button
                key={s.num}
                onClick={() =>
                  setActive(([prev]) => [i, i > prev ? 1 : -1])
                }
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === active
                    ? "bg-[#CDFF00] w-10"
                    : "bg-white/15 w-6"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center"
            >
              <ChevronLeft size={16} className="text-white/60" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center"
            >
              <ChevronRight size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
