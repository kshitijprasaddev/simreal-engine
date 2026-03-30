export default function Marquee() {
  const items = [
    "OMNIVERSE",
    "ISAAC SIM",
    "TENSORRT",
    "ROS 2",
    "JETSON",
    "EDGE INFERENCE",
    "SIM TO REAL",
    "B2B INFRA",
  ];
  const repeated = [...items, ...items];

  return (
    <div className="py-5 border-y border-[#151515] overflow-hidden">
      <div className="marquee-track whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center mx-8">
            <span className="text-[13px] font-mono tracking-[0.25em] text-[#2A2A2A] uppercase">
              {item}
            </span>
            <span className="ml-8 w-1 h-1 rounded-full bg-[#CDFF00] opacity-30" />
          </span>
        ))}
      </div>
    </div>
  );
}
