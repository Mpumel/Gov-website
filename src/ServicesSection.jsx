import React, { useState } from "react";

const SERVICES = [
  {
    id: 1,
    title: "Electricity",
    description:
      "Report outages, check load shedding schedules and query prepaid meters.",
    link: "#electricity",
  },
  {
    id: 2,
    title: "Water & Sanitation",
    description:
      "Report burst pipes, no water supply or sewage issues in your area.",
    link: "#water",
  },
  {
    id: 3,
    title: "Roads & Potholes",
    description:
      "Log road defects, potholes and infrastructure damage on your street.",
    link: "#roads",
  },
  {
    id: 4,
    title: "Waste Collection",
    description:
      "Check your collection day, report missed pickups or illegal dumping.",
    link: "#waste",
  },
  {
    id: 5,
    title: "Public Safety",
    description:
      "Report broken streetlights, unsafe structures or crime hotspots.",
    link: "#safety",
  },
  {
    id: 6,
    title: "Health Services",
    description:
      "Find your nearest clinic, check operating hours and get referral info.",
    link: "#health",
  },
];

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={service.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex flex-col bg-white rounded-lg p-7 transition-all duration-200"
      style={{
        minHeight: "160px",
        border: hovered
          ? "1px solid var(--color-durban-gold)"
          : "1px solid #e8e2d8",
        boxShadow: hovered
          ? "0 6px 24px rgba(0,0,0,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "var(--text-event-title)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          marginBottom: "10px",
          color: hovered
            ? "var(--color-durban-gold)"
            : "var(--color-durban-dark)",
          transition: "color 0.2s",
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-event-desc)",
          fontWeight: 600,
          color: "#444",
          lineHeight: 1.6,
        }}
      >
        {service.description}
      </p>
    </a>
  );
}

export default function ServicesSection() {
  return (
    <section
      className="w-full py-20 px-6 md:px-12"
      style={{ background: "var(--color-durban-sand)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className="mb-10 pb-8"
          style={{ borderBottom: "1px solid #e0d8cc" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-section-title)",
              fontWeight: 800,
              color: "var(--color-durban-dark)",
              marginBottom: "6px",
            }}
          >
            City Services
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-section-sub)",
              color: "var(--color-durban-sub)",
            }}
          >
            Everything the city provides, in one place
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="mt-6 flex flex-col md:flex-row items-center  justify-between gap-4 px-8 py-8 rounded-xl"
          style={{ background: "var(--color-durban-green)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "30px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "var(--color-durban-sand)",
            }}
          >
            Can't find what you need?
          </p>
          <a
            href="#all-services"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-durban-sand)",
              border: "1px solid var(--color-durban-sand)",
              padding: "8px 20px",
              borderRadius: "6px",
              whiteSpace: "nowrap",
            }}
            className="transition-all duration-200 hover:bg-[#C8922A] hover:text-white"
          >
            See All Services →
          </a>
        </div>
      </div>
    </section>
  );
}
