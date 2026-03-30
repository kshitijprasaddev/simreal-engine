export default function Footer() {
  return (
    <footer className="border-t border-[#151515]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Top row */}
        <div className="py-16 md:py-24 grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span className="text-sm font-mono tracking-[0.3em] uppercase text-[#EDEDED] block mb-4">
              SimReal
            </span>
            <p className="text-sm text-[#444] leading-relaxed max-w-[280px]">
              The deployment compiler for autonomous systems. From simulation to real hardware in minutes.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#555] mb-5">
                Platform
              </h4>
              <ul className="space-y-3">
                {["Pipeline", "Markets", "Tech Stack"].map((l) => (
                  <li key={l}>
                    <a
                      href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                      className="text-sm text-[#333] hover:text-[#EDEDED] transition-colors duration-300"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#555] mb-5">
                Connect
              </h4>
              <ul className="space-y-3">
                {["Email", "LinkedIn", "GitHub"].map((l) => (
                  <li key={l}>
                    <span className="text-sm text-[#333] hover:text-[#EDEDED] transition-colors duration-300 cursor-pointer">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Status */}
          <div className="md:text-right">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CDFF00] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#444]">
                Active Development
              </span>
            </div>
            <p className="text-sm text-[#333] leading-relaxed">
              A TUM.ai E-Hub Proposal
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[#111] flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#1A1A1A] uppercase">
            &copy; {new Date().getFullYear()} SimReal Engine
          </span>
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#1A1A1A] uppercase">
            Sim to Real. Automated.
          </span>
        </div>
      </div>
    </footer>
  );
}
