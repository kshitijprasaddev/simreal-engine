"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SplitFlapText from "./SplitFlapText";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="contact" className="py-40 md:py-56">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <SplitFlapText
          className="text-5xl md:text-[6rem] lg:text-[8rem] font-bold tracking-tighter leading-[0.88]"
          accentClass="text-[#CDFF00]"
        >{"Let's build\nthis together."}</SplitFlapText>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#555] text-base md:text-lg mt-8 max-w-[480px] mx-auto leading-relaxed"
        >
          We are looking for technical co-founders, early pilot partners, and mentorship from the TUM.ai ecosystem to bring SimReal from concept to production.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="mailto:hello@simreal.dev"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#CDFF00] text-[#070707] font-semibold text-sm tracking-wide rounded-full hover:bg-[#D8FF40] transition-colors duration-300"
          >
            hello@simreal.dev
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-10 py-4 border border-[#333] text-sm tracking-wide rounded-full hover:border-[#555] hover:text-white transition-all duration-300"
          >
            Connect on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
