"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import SplitFlapText from "./SplitFlapText";

const ReflectionScene = dynamic(() => import("./ReflectionScene"), {
  ssr: false,
});

const layers = [
  {
    label: "Layer 01",
    title: "NVIDIA Omniverse + Isaac Sim",
    short: "Simulation",
    desc: "Physically accurate digital twin environment where policies are trained. Isaac Sim handles robot specific scenarios. SimReal sits directly on top, ingesting policies the moment they exit simulation.",
    color: "#CDFF00",
  },
  {
    label: "Layer 02",
    title: "Omniverse Replicator + Formal Methods",
    short: "Verification",
    desc: "Synthetic data generation and domain randomization to stress test policies across thousands of edge cases. Formal verification catches catastrophic behaviors before they leave the virtual world.",
    color: "#CDFF00",
  },
  {
    label: "Layer 03",
    title: "TensorRT + Cross Compilation",
    short: "Compilation",
    desc: "TensorRT optimizes inference for Jetson devices. SimReal extends this to non NVIDIA targets like Qualcomm RB5 and custom FPGAs, creating a universal hardware abstraction layer.",
    color: "#CDFF00",
  },
  {
    label: "Layer 04",
    title: "ROS 2 + Isaac ROS",
    short: "Deployment",
    desc: "GPU accelerated perception and navigation packages. Compiled policies ship as containerized ROS 2 nodes with telemetry, OTA updates, and fleet management hooks built in.",
    color: "#CDFF00",
  },
];

/* One layer card in the scroll-driven stack */
function StackLayer({
  layer,
  index,
  progress,
  total,
}: {
  layer: (typeof layers)[0];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;

  /* slide in from right, land at slight vertical offset */
  const x = useTransform(progress, [segStart, segEnd], [600, 0]);
  const opacity = useTransform(progress, [segStart, segStart + 0.05], [0, 1]);
  const yOffset = index * 8;

  /* glow when in its segment */
  const borderOpacity = useTransform(
    progress,
    [segStart, segEnd - 0.02, segEnd],
    [0.08, 0.4, 0.08],
  );

  return (
    <motion.div
      style={{
        x,
        opacity,
        y: yOffset,
        borderColor: useTransform(
          borderOpacity,
          (o) => `rgba(205, 255, 0, ${o})`,
        ),
      }}
      className="border rounded-xl p-6 md:p-8 bg-[#0A0A0A]/80 backdrop-blur-sm mb-4"
    >
      <div className="flex items-start gap-6">
        {/* Left: vertical label */}
        <div className="hidden md:flex flex-col items-center shrink-0 w-16">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#CDFF00]/50 uppercase">
            {layer.label}
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#CDFF00]/30 to-transparent mt-3" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 md:hidden">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#CDFF00]/50 uppercase">
              {layer.label}
            </span>
          </div>
          <p className="text-[#CDFF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-1">
            {layer.short}
          </p>
          <h3 className="text-lg md:text-xl font-bold tracking-tight mb-3">
            {layer.title}
          </h3>
          <p className="text-white/35 text-sm leading-[1.75] max-w-[520px]">
            {layer.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  /* active layer index for the diagram */
  const [activeIdx, setActiveIdx] = useState(0);

  /* track which layer is most visible */
  layers.forEach((_, i) => {
    const segMid = (i + 0.5) / layers.length;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, (v) => {
      const dist = Math.abs(v - segMid);
      if (dist < 0.5 / layers.length && activeIdx !== i) {
        setActiveIdx(i);
      }
      return v;
    });
  });

  return (
    <section ref={ref} className="py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#CDFF00] mb-4">
            Technical Approach
          </p>
          <SplitFlapText className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] max-w-[640px]">
            Built on the NVIDIA autonomy stack.
          </SplitFlapText>
          <p className="text-white/40 mt-5 text-base md:text-lg max-w-[520px] leading-relaxed">
            SimReal would not reinvent the wheel. It sits on top of
            Omniverse, Isaac Sim, TensorRT, and ROS 2 as the missing
            connective layer.
          </p>
        </div>

        {/* Desktop: diagram + stacking layers */}
        <div className="hidden md:grid grid-cols-12 gap-10 items-start">
          {/* Left: 3D reflection scene */}
          <div className="col-span-5 sticky top-32">
            <div className="relative h-[440px] rounded-2xl overflow-hidden border border-[#1A1A1A] bg-[#070707]">
              <ReflectionScene />
              {/* Layer label overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#CDFF00]/60"
                >
                  {layers[activeIdx].short}
                </motion.div>
              </div>
            </div>
            {/* Progress bar below */}
            <div className="mt-4 flex gap-2">
              {layers.map((l, i) => (
                <div
                  key={l.label}
                  className={`flex-1 h-[2px] rounded-full transition-colors duration-500 ${
                    i <= activeIdx ? "bg-[#CDFF00]" : "bg-[#1A1A1A]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: scroll-driven detail cards */}
          <div className="col-span-7">
            {layers.map((layer, i) => (
              <StackLayer
                key={layer.label}
                layer={layer}
                index={i}
                progress={scrollYProgress}
                total={layers.length}
              />
            ))}
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {layers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-[#1A1A1A] rounded-xl p-6 bg-[#0A0A0A]/60"
            >
              <p className="text-[#CDFF00] text-[11px] font-mono tracking-[0.2em] uppercase mb-1">
                {layer.short}
              </p>
              <h3 className="text-lg font-bold tracking-tight mb-2">
                {layer.title}
              </h3>
              <p className="text-white/30 text-sm leading-[1.75]">
                {layer.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
