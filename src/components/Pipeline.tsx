"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  {
    num: "01",
    title: "Ingest",
    desc: "Upload trained policies from any simulation framework.",
    image: "/ingest.jpg",
  },
  {
    num: "02",
    title: "Validate",
    desc: "Automated safety checks against real world constraints.",
    image: "/data.jpg",
  },
  {
    num: "03",
    title: "Compile",
    desc: "Optimize for target hardware. Sub 5ms edge inference.",
    image: "/compile.jpg",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Ship production ready ROS 2 nodes to any platform.",
    image: "/deploy.jpg",
  },
];

function PipelineCard({ step }: { step: (typeof steps)[0] }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div
      ref={ref}
      className="group relative h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden"
    >
      {/* Parallax image */}
      <motion.div style={{ y: imgY }} className="absolute inset-[-20%]">
        <Image src={step.image} alt="" fill className="object-cover" />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/90 via-[#070707]/30 to-[#070707]/10" />

      {/* Content pinned to bottom */}
      <div className="relative z-10 h-full flex items-end p-8 md:p-14">
        <div>
          <span className="text-[#CDFF00] font-mono text-xs tracking-[0.3em] block mb-3">
            {step.num}
          </span>
          <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
            {step.title}
          </h3>
          <p className="text-white/50 mt-4 text-base md:text-lg max-w-[400px]">
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Pipeline() {
  return (
    <section id="pipeline" className="py-12 md:py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#CDFF00] mb-4">
          How It Works
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-16 md:mb-24 max-w-[560px] tracking-tight leading-[1.05]">
          Four steps from trained model to deployed system.
        </h2>

        <div className="space-y-6 md:space-y-8">
          {steps.map((step) => (
            <PipelineCard key={step.num} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}
