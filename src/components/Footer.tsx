export default function Footer() {
  return (
    <footer className="py-6 border-t border-[#151515]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#2A2A2A] uppercase">
          SimReal Engine {new Date().getFullYear()}
        </span>
        <span className="text-[10px] font-mono tracking-[0.25em] text-[#2A2A2A] uppercase">
          Sim to Real. Automated.
        </span>
      </div>
    </footer>
  );
}
