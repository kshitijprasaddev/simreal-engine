"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl md:text-[2.8rem] font-bold leading-[1.08] mb-8">
              The biggest bottleneck in autonomy is not training the AI. It is deploying it.
            </h2>
            <p className="text-[#666] text-lg leading-relaxed">
              Companies invest millions training models in flawless simulations, then spend months making them work on real hardware. SimReal Engine closes that gap automatically.
            </p>
            <div className="h-px bg-[#222] mt-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=90"
              alt=""
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
