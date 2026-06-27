import { useState } from "react";

const SERVICES = [
  {
    id: 1,
    title: "Electricity",
    status: "disruption",
    statusLabel: "Stage 4 Active",
    link: "#electricity",
  },
  {
    id: 2,
    title: "Water & Sanitation",
    status: "normal",
    statusLabel: "All Systems Normal",
    link: "#water",
  },
  {
    id: 3,
    title: "Roads & Potholes",
    status: "disruption",
    statusLabel: "N2 Works Ongoing",
    link: "#roads",
  },
  {
    id: 4,
    title: "Waste Collection",
    status: "normal",
    statusLabel: "On Schedule",
    link: "#waste",
  },
  {
    id: 5,
    title: "Public Safety",
    status: "normal",
    statusLabel: "Operational",
    link: "#safety",
  },
  {
    id: 6,
    title: "Health Services",
    status: "critical",
    statusLabel: "Addington — High Volume",
    link: "#health",
  },
];

const STATUS_DOT = {
  normal: "bg-[#4a7c3f]",
  disruption: "bg-[#C8922A] animate-pulse",
  critical: "bg-[#a83232] animate-ping",
};

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={service.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex flex-col p-6 rounded-xl border transition-all duration-200 cursor-pointer
        ${
          hovered
            ? "bg-durban-card-hover border-durban-gold"
            : "bg-durban-card border-durban-border"
        }`}
      style={{ minHeight: "150px" }}
    >
      <h3
        className="uppercase mb-5 transition-colors duration-200"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: hovered
            ? "var(--color-durban-gold)"
            : "var(--color-durban-dark)",
        }}
      >
        {service.title}
      </h3>

      <div className="flex items-center gap-2">
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${STATUS_DOT[service.status]}`}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            letterSpacing: "0.08em",
            color: "#888",
          }}
        >
          {service.statusLabel}
        </span>
      </div>

      <span
        className="absolute bottom-4 right-4 text-xs transition-all duration-200"
        style={{
          color: hovered ? "var(--color-durban-gold)" : "#ccc",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
        }}
      >
        →
      </span>
    </a>
  );
}

export default function ServicesSection() {
  return (
    <section className="relative w-full bg-durban-sand py-20 px-6 md:px-16 overflow-hidden">
      {/* Background SVG — waves + sun, positioned to show sun at top right */}
      <svg
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
        viewBox="0 0 700 520"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin meet"
      >
        {/* Sun — anchored top right, always visible */}
        <circle
          cx="672"
          cy="44"
          r="22"
          fill="none"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <circle
          cx="672"
          cy="44"
          r="15"
          fill="none"
          stroke="#c8b89a"
          strokeWidth="0.5"
          opacity="0.45"
        />
        <circle cx="672" cy="44" r="8" fill="#c8b89a" opacity="0.2" />
        <line
          x1="672"
          y1="12"
          x2="672"
          y2="5"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="672"
          y1="76"
          x2="672"
          y2="83"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="640"
          y1="44"
          x2="633"
          y2="44"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="704"
          y1="44"
          x2="711"
          y2="44"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="649"
          y1="21"
          x2="644"
          y2="16"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="695"
          y1="67"
          x2="700"
          y2="72"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="695"
          y1="21"
          x2="700"
          y2="16"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />
        <line
          x1="649"
          y1="67"
          x2="644"
          y2="72"
          stroke="#c8b89a"
          strokeWidth="0.8"
          opacity="0.5"
        />

        {/* Waves */}
        <path
          d="M-50 130 Q100 90 220 140 Q340 190 470 120 Q570 75 750 145"
          stroke="#c8b89a"
          strokeWidth="0.6"
          fill="none"
          opacity="0.45"
        />
        <path
          d="M-50 230 Q130 185 270 240 Q390 290 530 215 Q630 170 750 240"
          stroke="#c8b89a"
          strokeWidth="0.6"
          fill="none"
          opacity="0.38"
        />
        <path
          d="M-50 350 Q110 305 260 360 Q390 410 510 330 Q615 285 750 355"
          stroke="#c8b89a"
          strokeWidth="0.6"
          fill="none"
          opacity="0.32"
        />
        <path
          d="M-50 460 Q170 410 300 470 Q440 525 570 440 Q660 400 750 460"
          stroke="#c8b89a"
          strokeWidth="0.6"
          fill="none"
          opacity="0.28"
        />

        {/* Dots */}
        {[40, 110, 180, 250, 320, 390, 460, 530, 600].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={175}
            r="1.2"
            fill="#c8b89a"
            opacity="0.55"
          />
        ))}
      </svg>

      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto mb-10">
        <p
          className="uppercase mb-2"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            letterSpacing: "0.25em",
            color: "var(--color-durban-gold)",
          }}
        >
          eThekwini Municipality
        </p>
        <h2
          className="uppercase mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "var(--color-durban-dark)",
          }}
        >
          City Services
        </h2>
        <p
          className="border-b border-durban-wave pb-5"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "16px",
            letterSpacing: "0.08em",
            color: "#999",
          }}
        >
          Status reflects current conditions across Durban
        </p>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SERVICES.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* CTA bar */}
      <div className="relative z-10 max-w-6xl mx-auto mt-5 bg-durban-dark px-8 py-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "25px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "var(--color-durban-sand)",
          }}
        >
          Can't find what you need?
        </p>
        <a
          href="#directory"
          className="border border-durban-gold text-durban-gold hover:bg-durban-gold hover:text-white transition-all duration-200 rounded-md"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            padding: "8px 16px",
            textTransform: "uppercase",
          }}
        >
          Full Directory →
        </a>
      </div>
    </section>
  );
}
