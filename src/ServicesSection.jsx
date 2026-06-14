import { useState } from "react";

// -----------------------------------------------------------------------
// SERVICE DATA — change the content here, not in the JSX
// Each service has a status so citizens immediately know if there's
// an active issue in their area — this is the feature most gov sites miss
// -----------------------------------------------------------------------
const SERVICES = [
  {
    id: 1,
    icon: "⚡",
    title: "Electricity",
    description: "Report outages, check load shedding schedules, and query prepaid meters.",
    status: "disruption", // "normal" | "disruption" | "critical"
    statusLabel: "Stage 4 Active",
    link: "#electricity",
    color: "#C8922A", // durban-gold
  },
  {
    id: 2,
    icon: "💧",
    title: "Water & Sanitation",
    description: "Report burst pipes, no water supply, or sewage issues in your area.",
    status: "normal",
    statusLabel: "All Systems Normal",
    link: "#water",
    color: "#2563EB",
  },
  {
    id: 3,
    icon: "🚧",
    title: "Roads & Potholes",
    description: "Log road defects, potholes, and infrastructure damage on your street.",
    status: "disruption",
    statusLabel: "N2 Works Ongoing",
    link: "#roads",
    color: "#B5451B", // durban-earth
  },
  {
    id: 4,
    icon: "🗑️",
    title: "Waste Collection",
    description: "Check your collection day, report missed pickups, or illegal dumping.",
    status: "normal",
    statusLabel: "On Schedule",
    link: "#waste",
    color: "#1A2E1A", // durban-forest
  },
  {
    id: 5,
    icon: "🛡️",
    title: "Public Safety",
    description: "Report broken streetlights, unsafe structures, or crime hotspots.",
    status: "normal",
    statusLabel: "Operational",
    link: "#safety",
    color: "#1A2E1A",
  },
  {
    id: 6,
    icon: "🏥",
    title: "Health Services",
    description: "Find your nearest clinic, check operating hours, and get referral info.",
    status: "critical",
    statusLabel: "Addington — High Volume",
    link: "#health",
    color: "#C0392B",
  },
];

const STATUS_STYLES = {
  normal:     { dot: "bg-green-500",  badge: "bg-green-50 text-green-700 border-green-200" },
  disruption: { dot: "bg-amber-500 animate-pulse", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  critical:   { dot: "bg-red-500 animate-ping",  badge: "bg-red-50 text-red-700 border-red-200" },
};

// -----------------------------------------------------------------------
// INDIVIDUAL SERVICE CARD
// -----------------------------------------------------------------------
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_STYLES[service.status];

  return (
    <a
      href={service.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100
        shadow-sm hover:shadow-xl hover:shadow-gray-200/80 transition-all duration-500 hover:-translate-y-1"
      style={{
        // Staggered fade-in on load using inline style
        // (Tailwind can't do dynamic animation-delay values)
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Colored top bar — the service's identity color */}
      <div
        className="h-1.5 w-full transition-all duration-500"
        style={{ backgroundColor: hovered ? service.color : "#E5E7EB" }}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Icon + title */}
        <div className="flex items-start justify-between">
          <div>
            <span
              className="text-3xl mb-2 block transition-transform duration-300 group-hover:scale-110"
            >
              {service.icon}
            </span>
            <h3 className="text-lg font-bold text-[#1C1C1C] font-serif">{service.title}</h3>
          </div>

          {/* Status indicator */}
          <div className={`flex items-center gap-1.5 border text-xs font-semibold px-2.5 py-1 rounded-full ${status.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {service.statusLabel}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {service.description}
        </p>

        {/* CTA */}
        <div
          className="flex items-center gap-2 text-sm font-bold transition-all duration-300"
          style={{ color: hovered ? service.color : "#6B7280" }}
        >
          <span>Access Service</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </a>
  );
}

// -----------------------------------------------------------------------
// SERVICES SECTION
// -----------------------------------------------------------------------
export default function ServicesSection() {
  return (
    <section className="w-full bg-[#F5F0E8] py-20 px-6 md:px-16">

      {/* Section header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="uppercase tracking-widest text-[#C8922A] text-xs font-bold mb-2">
              eThekwini Municipality
            </p>
            <h2 className="text-4xl font-extrabold text-[#1C1C1C] font-serif leading-tight">
              City Services
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md">
              The services most residents need. Status updates reflect current conditions in Durban.
            </p>
          </div>

          {/* "View all services" link */}
          <a
            href="#all-services"
            className="text-sm font-bold text-[#1A2E1A] border-b-2 border-[#C8922A] pb-0.5 hover:text-[#C8922A] transition-colors duration-300 whitespace-nowrap"
          >
            View all services →
          </a>
        </div>

        {/* Live status legend */}
        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200">
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Status key:</span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Normal
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Disruption
          </span>
          <span className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Critical
          </span>
        </div>
      </div>

      {/* Services grid — 3 cols on desktop, 2 on tablet, 1 on mobile */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="max-w-6xl mx-auto mt-10 bg-[#1A2E1A] rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-white font-bold text-lg">Can't find what you need?</p>
          <p className="text-white/60 text-sm mt-0.5">
            Browse the full directory of eThekwini municipal services.
          </p>
        </div>
        <a
          href="#directory"
          className="bg-[#C8922A] hover:bg-amber-500 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-300 whitespace-nowrap"
        >
          Full Services Directory
        </a>
      </div>
    </section>
  );
}
