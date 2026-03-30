"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import SplitFlapText from "./SplitFlapText";

const markets = [
  {
    title: "Drone Delivery",
    image: "/DPD drone delivery.jpg",
  },
  {
    title: "Agricultural Robotics",
    image: "/Robots_Motors_in_Agriculture-750x415-f50_50.jpg",
  },
  {
    title: "Autonomous Vehicles",
    image: "/autonomous vehicle.jpg",
  },
  {
    title: "Industrial Automation",
    image: "/deploy.jpg",
  },
];

export default function Markets() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-75%"]);

  return (
    <section ref={ref} id="markets" className="relative h-[200vh]" style={{ position: "relative" }}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full mb-10">
          <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#CDFF00] mb-4">
            Where This Applies
          </p>
          <SplitFlapText className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05]">{"Any industry deploying\nautonomous systems."}</SplitFlapText>
        </div>

        {/* Horizontal scroll track */}
        <motion.div style={{ x }} className="flex gap-4 pl-6 md:pl-12">
          {markets.map((m) => (
            <div
              key={m.title}
              className="group relative w-[70vw] md:w-[30vw] h-[35vh] md:h-[40vh] rounded-xl overflow-hidden shrink-0"
            >
              <Image
                src={m.image}
                alt={m.title}
                fill
                sizes="(min-width: 768px) 30vw, 70vw"
                className="object-cover img-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/80 via-[#070707]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="text-lg md:text-2xl font-bold tracking-tight">
                  {m.title}
                </h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
