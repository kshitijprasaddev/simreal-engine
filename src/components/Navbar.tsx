"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 150);
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
        scrolled ? "bg-[#070707]/80 backdrop-blur-xl" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <a href="#" className="text-sm font-mono tracking-[0.3em] uppercase text-[#EDEDED]">
          SimReal
        </a>

        <div className="hidden md:flex items-center gap-10">
          {["Pipeline", "Markets"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#555] hover:text-[#EDEDED] transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        <a
          href="mailto:hello@simreal.dev"
          className="text-[11px] font-mono tracking-[0.15em] uppercase px-5 py-2.5 border border-[#333] rounded-full hover:bg-[#CDFF00] hover:text-[#070707] hover:border-[#CDFF00] transition-all duration-300"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
