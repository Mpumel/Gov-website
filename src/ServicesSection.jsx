import React, { useState, useEffect } from "react";
import api from "./api/axios";

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={
        service.link || `#${service.name?.toLowerCase().replace(/\s+/g, "-")}`
      }
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
      {/* Status dot — shows operational/disrupted state from the database */}
      {service.status && (
        <span
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{
            background:
              service.status === "operational" ? "#22c55e" : "#E63946",
          }}
          title={service.status}
        />
      )}

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
        {/* Backend uses 'name', hardcoded data used 'title' — handle both */}
        {service.name || service.title}
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
  // services holds data from the backend
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services from backend when component mounts
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Could not load services.");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []); // empty array = run once on mount

  // -----------------------------------------------------------------------
  // LOADING STATE
  // -----------------------------------------------------------------------
  if (loading) {
    return (
      <section
        className="w-full py-20 px-6 md:px-12 flex items-center justify-center"
        style={{ background: "var(--color-durban-sand)", minHeight: "400px" }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-durban-sub)",
            fontSize: "var(--text-section-sub)",
          }}
        >
          Loading services...
        </p>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // ERROR STATE
  // -----------------------------------------------------------------------
  if (error) {
    return (
      <section
        className="w-full py-20 px-6 md:px-12 flex items-center justify-center"
        style={{ background: "var(--color-durban-sand)", minHeight: "400px" }}
      >
        <p style={{ color: "#E63946", fontFamily: "var(--font-body)" }}>
          {error}
        </p>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // EMPTY STATE — database has no services yet
  // -----------------------------------------------------------------------
  if (services.length === 0) {
    return (
      <section
        className="w-full py-20 px-6 md:px-12 flex items-center justify-center"
        style={{ background: "var(--color-durban-sand)", minHeight: "400px" }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-durban-sub)",
          }}
        >
          No services available.
        </p>
      </section>
    );
  }

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

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* CTA strip */}
        <div
          className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-8 py-8 rounded-xl"
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
