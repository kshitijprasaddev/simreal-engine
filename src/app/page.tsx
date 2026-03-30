import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import TextReveal from "@/components/TextReveal";
import WireframeTerrain from "@/components/WireframeTerrain";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import BusinessModel from "@/components/BusinessModel";
import Markets from "@/components/Markets";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <TextReveal />
        <WireframeTerrain />
        <Experience />
        <TechStack />
        <BusinessModel />
        <Markets />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
