"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const paragraph =
  "The biggest bottleneck in autonomy is not training the model. It is getting it onto real hardware. What if one tool could close that gap entirely?";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

export default function TextReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
  });

  const words = paragraph.split(" ");

  return (
    <section ref={ref} className="py-40 md:py-64">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <p className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-[1.2] tracking-tight flex flex-wrap gap-x-[0.35em]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}
