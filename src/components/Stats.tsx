"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "$2.4M+", label: "Average cost per failed deployment cycle" },
  { value: "73%", label: "Of sim-trained policies fail on first deploy" },
  { value: "6-12mo", label: "Typical manual integration timeline" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 border-y border-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-[#1A1A1A]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="md:px-12 first:md:pl-0 last:md:pr-0"
            >
              <div className="text-4xl md:text-6xl font-bold text-[#EDEDED] mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-sm text-[#555] leading-relaxed max-w-[240px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
