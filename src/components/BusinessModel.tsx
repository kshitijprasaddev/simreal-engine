"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const AttractorParticles = dynamic(() => import("./AttractorParticles"), {
  ssr: false,
});

const channels = [
  {
    num: "01",
    title: "Per Deployment License",
    desc: "Charge autonomy teams per compiled deployment. Every time a team pushes a policy from simulation to production hardware through SimReal, they pay a per unit or per device fee.",
    metric: "Per compile",
    scale: "Scales with device count",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="24" width="10" height="16" rx="2" />
        <rect x="19" y="16" width="10" height="24" rx="2" />
        <rect x="30" y="8" width="10" height="32" rx="2" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Platform Subscription",
    desc: "Monthly or annual subscription tiers based on team size, number of active deployments, and hardware targets. Scales with usage as fleets grow.",
    metric: "Monthly / Annual",
    scale: "Scales with team + fleet",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="14" />
        <path d="M24 10v14l8 8" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Enterprise Contracts",
    desc: "Custom on premise installations for large robotics and automotive companies who need dedicated infrastructure, SLA guarantees, and compliance certifications for safety critical deployments.",
    metric: "Custom pricing",
    scale: "On premise + SLA",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="14" width="28" height="22" rx="3" />
        <path d="M18 14V10a6 6 0 0 1 12 0v4" />
      </svg>
    ),
  },
];

const cardVariants = {
  enter: (d: number) => ({
    opacity: 0,
    y: d > 0 ? 80 : -80,
    scale: 0.92,
    rotateX: d > 0 ? 8 : -8,
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (d: number) => ({
    opacity: 0,
    y: d > 0 ? -60 : 60,
    scale: 0.92,
    rotateX: d > 0 ? -8 : 8,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function BusinessModel() {
  const [[active, direction], setActive] = useState([0, 0]);
  const ref = useRef(null);

  const go = (idx: number) => {
    setActive([idx, idx > active ? 1 : -1]);
  };

  const ch = channels[active];

  return (
    <section ref={ref} className="py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#CDFF00] mb-4">
            B2B Revenue Model
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] max-w-[640px]">
            How it makes money.
          </h2>
          <p className="text-white/40 mt-5 text-base md:text-lg max-w-[520px] leading-relaxed">
            Every company building autonomous systems hits the same
            deployment wall. SimReal would be the infrastructure they pay
            for to get past it.
          </p>
        </div>

        {/* === Desktop: Interactive staircase === */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-8 items-start">
            {/* Left: staircase selector */}
            <div className="col-span-4 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-[28px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-[#CDFF00]/10 via-[#CDFF00]/20 to-[#CDFF00]/10" />

              <div className="relative space-y-2">
                {channels.map((c, i) => {
                  const isActive = i === active;
                  return (
                    <motion.button
                      key={c.num}
                      onClick={() => go(i)}
                      className={`relative w-full text-left rounded-xl px-6 py-5 border transition-all duration-500 group cursor-pointer ${
                        isActive
                          ? "border-[#CDFF00]/30 bg-[#CDFF00]/[0.04]"
                          : "border-transparent bg-transparent hover:bg-[#0A0A0A]/40"
                      }`}
                      style={{ marginLeft: `${i * 24}px` }}
                    >
                      {/* Dot on the line */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1 : 0.5,
                          backgroundColor: isActive ? "#CDFF00" : "#333",
                        }}
                        className="absolute left-[-28px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                        style={{ marginLeft: `${-i * 24}px` }}
                      />

                      <div className="flex items-center gap-4">
                        <span
                          className={`text-xs font-mono tracking-[0.25em] transition-colors duration-300 ${
                            isActive ? "text-[#CDFF00]" : "text-white/20"
                          }`}
                        >
                          {c.num}
                        </span>
                        <div>
                          <p
                            className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                              isActive ? "text-white" : "text-white/40"
                            }`}
                          >
                            {c.title}
                          </p>
                          <p
                            className={`text-[10px] font-mono tracking-[0.15em] uppercase mt-1 transition-colors duration-300 ${
                              isActive ? "text-[#CDFF00]/50" : "text-white/15"
                            }`}
                          >
                            {c.metric}
                          </p>
                        </div>
                      </div>

                      {/* Active edge */}
                      {isActive && (
                        <motion.div
                          layoutId="bmEdge"
                          className="absolute right-0 top-2 bottom-2 w-[2px] bg-[#CDFF00] rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Right: detail card with particle bg */}
            <div className="col-span-8 relative min-h-[320px]" style={{ perspective: 1200 }}>
              {/* Particle attractor background */}
              <div className="absolute inset-0 -inset-x-4 -inset-y-8 opacity-50 pointer-events-none" style={{ height: "calc(100% + 64px)", minHeight: 400 }}>
                <AttractorParticles />
              </div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="border border-[#1A1A1A] rounded-2xl bg-[#0A0A0A]/70 backdrop-blur-sm p-10 md:p-12"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="text-[#CDFF00]/60">{ch.icon}</div>
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/15">
                      Revenue Channel {ch.num}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                    {ch.title}
                  </h3>
                  <p className="text-white/35 text-sm md:text-base leading-[1.85] mb-8 max-w-[520px]">
                    {ch.desc}
                  </p>

                  {/* Bottom tags */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[#1A1A1A]">
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#CDFF00]/20 text-[#CDFF00]/60">
                      {ch.metric}
                    </span>
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-[#1A1A1A] text-white/30">
                      {ch.scale}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* === Mobile: sequential cards === */}
        <div className="md:hidden space-y-4">
          {channels.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-[#1A1A1A] rounded-xl p-6 bg-[#0A0A0A]/60"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-[#CDFF00]/60">{c.icon}</div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#CDFF00]/40">
                  {c.num}
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-tight mb-2">
                {c.title}
              </h3>
              <p className="text-white/30 text-sm leading-[1.75]">{c.desc}</p>
              <div className="flex gap-3 mt-4">
                <span className="text-[9px] font-mono tracking-[0.15em] uppercase px-2 py-1 rounded-full border border-[#CDFF00]/15 text-[#CDFF00]/50">
                  {c.metric}
                </span>
                <span className="text-[9px] font-mono tracking-[0.15em] uppercase px-2 py-1 rounded-full border border-[#1A1A1A] text-white/25">
                  {c.scale}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
