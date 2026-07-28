import { useState } from "react";

const PLACES = [
  {
    id: 1,
    name: "Moses Mabhida Stadium",
    area: "Durban CBD",
    category: "Architecture & Sport",
    type: "known",
    color: "linear-gradient(135deg, #1a3a2a, #2a5a3a)",
    featured: true,
    image: null,
  },
  {
    id: 2,
    name: "uShaka Marine World",
    area: "Point",
    category: "Waterfront",
    type: "known",
    color: "linear-gradient(135deg, #1a2a4a, #2a3a6a)",
    featured: false,
    image: null,
  },
  {
    id: 3,
    name: "Silverglen Nature Reserve",
    area: "Chatsworth",
    category: "Nature",
    type: "hidden",
    color: "linear-gradient(135deg, #3a2a1a, #5a3a2a)",
    featured: false,
    image: null,
  },
  {
    id: 4,
    name: "The Bluff Viewpoint",
    area: "Bluff",
    category: "Scenic",
    type: "hidden",
    color: "linear-gradient(135deg, #2a1a3a, #3a2a5a)",
    featured: false,
    image: null,
  },
  {
    id: 5,
    name: "Golden Mile Beach",
    area: "Beachfront",
    category: "Coast",
    type: "known",
    color: "linear-gradient(135deg, #1a3a3a, #2a5a5a)",
    featured: false,
    image: null,
  },
];

const FILTERS = ["All", "Known", "Hidden Gems"];

function PlaceCard({ place, featured = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden cursor-pointer"
      style={{ borderRadius: "12px", gridRow: featured ? "span 2" : "span 1" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ background: place.color }} />
      {place.image && (
        <img
          src={place.image}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.0) 55%)",
        }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "rgba(15,31,15,0.55)", opacity: hovered ? 1 : 0 }}
      />

      {/* Content */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300"
        style={{
          padding: "14px",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <span
          className="inline-block mb-1.5"
          style={{
            fontSize: "7px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "2px 8px",
            borderRadius: "3px",
            fontFamily: "var(--font-body)",
            background:
              place.type === "known"
                ? "var(--color-durban-gold)"
                : "var(--color-durban-dark)",
            color: place.type === "known" ? "#fff" : "#a8c8a8",
          }}
        >
          {place.type === "known" ? "Known" : "Hidden Gem"}
        </span>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: featured ? "18px" : "13px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
          }}
        >
          {place.name}
        </div>
        <div
          style={{
            fontSize: "10px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "4px",
            letterSpacing: "0.05em",
            fontFamily: "var(--font-body)",
          }}
        >
          {place.area} · {place.category}
        </div>
      </div>
    </div>
  );
}

export default function TourDurban() {
  const [filter, setFilter] = useState("All");

  const filtered = PLACES.filter((p) => {
    if (filter === "Known") return p.type === "known";
    if (filter === "Hidden Gems") return p.type === "hidden";
    return true;
  });

  const featured = filtered.find((p) => p.featured) || filtered[0];
  const rest = filtered.filter((p) => p.id !== featured?.id).slice(0, 4);

  return (
    <section
      className="w-full py-20 px-6 md:px-12"
      style={{ background: "var(--color-durban-ocean)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-section-label)",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--color-durban-gold)",
              marginBottom: "8px",
            }}
          >
            Explore eThekwini
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-section-title)",
              fontWeight: 800,
              color: "var(--color-durban-dark)",
              marginBottom: "6px",
            }}
          >
            Tour Durban
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-section-sub)",
              color: "#999",
            }}
          >
            From iconic landmarks to spots only locals know
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "6px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "all 0.2s",
                background:
                  filter === f ? "var(--color-durban-dark)" : "transparent",
                color: filter === f ? "var(--color-durban-gold)" : "#888",
                border:
                  filter === f
                    ? "1px solid var(--color-durban-dark)"
                    : "1px solid #c8b89a",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {featured && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1fr",
              gridTemplateRows: "220px 180px",
              gap: "10px",
            }}
          >
            <PlaceCard place={featured} featured={true} />
            {rest.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        )}

        {/* View all */}
        <div className="text-center mt-6">
          <a
            href="#all-places"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-durban-gold)",
              borderBottom: "1px solid var(--color-durban-gold)",
              paddingBottom: "2px",
              cursor: "pointer",
            }}
          >
            Explore all destinations →
          </a>
        </div>
      </div>
    </section>
  );
}
