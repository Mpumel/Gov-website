import { useState } from "react";

const EVENTS = [
  {
    id: 1,
    category: "Community",
    title: "Durban July Charity Gala 2026",
    description:
      "An exclusive fundraising evening bringing together Durban's business leaders to support township development.",
    dateStart: "12 July 2026",
    dateEnd: "14 July 2026",
    time: "18:00 – 22:00",
    location: "Durban ICC",
    featured: true,
    color: "#1A2E1A",
    image: null,
  },
  {
    id: 2,
    category: "Music",
    title: "Umlazi Youth Music Festival",
    description:
      "Live performances across multiple stages celebrating Durban's emerging music talent. Free to attend.",
    dateStart: "20 July 2026",
    dateEnd: null,
    time: "10:00 – 18:00",
    location: "Umlazi Mega City",
    featured: false,
    color: "#1a3a4a",
    image: null,
  },
  {
    id: 3,
    category: "Culture",
    title: "Heritage Day Cultural March",
    description:
      "Thousands of residents march through the CBD celebrating South Africa's rich cultural heritage with live performances.",
    dateStart: "24 September 2026",
    dateEnd: null,
    time: "09:00 – 14:00",
    location: "City Hall, Durban CBD",
    featured: false,
    color: "#2a4a3a",
    image: null,
  },
  {
    id: 4,
    category: "Sport",
    title: "eThekwini Marathon 2026",
    description:
      "Durban's biggest annual road race with full, half, and fun run categories. All proceeds go to youth development.",
    dateStart: "8 August 2026",
    dateEnd: null,
    time: "06:00 – 12:00",
    location: "Moses Mabhida Stadium",
    featured: true,
    color: "#2a1a3a",
    image: null,
  },
];

function PeekCard({ event, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col cursor-pointer"
      style={{ width: "5%", flexShrink: 0, opacity: 0.4 }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.6)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.4)}
    >
      <div
        style={{
          background: event.color,
          minHeight: "440px",
          borderRadius: "10px",
          flex: 1,
        }}
      />
      <p
        style={{
          fontSize: "9px",
          color: "#888",
          marginTop: "6px",
          lineHeight: 1.4,
          fontFamily: "var(--font-body)",
        }}
      >
        {event.title}
      </p>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div
      className="flex-1 flex flex-col rounded-xl overflow-hidden bg-white"
      style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.08)", height: "440px" }}
    >
      {/* Image */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "48%", flexShrink: 0, padding: "12px" }}
      >
        <div className="absolute inset-0" style={{ background: event.color }} />
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 65%)",
            zIndex: 1,
          }}
        />

        {event.featured && (
          <span
            className="absolute top-2.5 right-2.5"
            style={{
              zIndex: 3,
              background: "var(--color-durban-dark)",
              color: "var(--color-durban-gold)",
              fontSize: "var(--text-event-tag)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: "3px",
              fontFamily: "var(--font-body)",
            }}
          >
            ★ Featured
          </span>
        )}

        <div className="relative" style={{ zIndex: 2, width: "100%" }}>
          <span
            className="inline-block mb-1.5"
            style={{
              background: "var(--color-durban-gold)",
              color: "#fff",
              fontSize: "7px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: "3px",
              fontFamily: "var(--font-body)",
            }}
          >
            {event.category}
          </span>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-event-title)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            {event.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div
        className="flex flex-col flex-1 justify-between"
        style={{ padding: "14px 16px", borderTop: "1px solid #f0ebe0" }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-event-desc)",
            fontWeight: 700,
            color: "#333",
            lineHeight: 1.6,
          }}
        >
          {event.description}
        </p>

        <div className="flex flex-col" style={{ gap: "6px" }}>
          <div className="flex items-center" style={{ gap: "7px" }}>
            <span
              style={{
                width: "12px",
                height: "1px",
                background: "var(--color-durban-gold)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-event-tag)",
                color: "#666",
              }}
            >
              {event.dateEnd
                ? `${event.dateStart} — ${event.dateEnd}`
                : event.dateStart}
            </span>
          </div>
          <div className="flex items-center" style={{ gap: "7px" }}>
            <span
              style={{
                width: "12px",
                height: "1px",
                background: "var(--color-durban-gold)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-event-tag)",
                color: "#666",
              }}
            >
              {event.time}
            </span>
          </div>
          <div className="flex items-center" style={{ gap: "7px" }}>
            <span
              style={{
                width: "12px",
                height: "1px",
                background: "var(--color-durban-gold)",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-event-tag)",
                color: "#666",
              }}
            >
              {event.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const VISIBLE_COUNT = 3;

  // Get the 3 visible events (with nulls if at the end)
  const visibleEvents = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    const idx = startIndex + i;
    return idx < EVENTS.length ? EVENTS[idx] : null;
  });

  // Peek cards: previous event before the window, next event after the window
  const prevEvent = startIndex > 0 ? EVENTS[startIndex - 1] : null;
  const nextEvent =
    startIndex + VISIBLE_COUNT < EVENTS.length
      ? EVENTS[startIndex + VISIBLE_COUNT]
      : null;

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < EVENTS.length;

  return (
    <section
      className="w-full py-20 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-durban-sand) 0%, var(--color-durban-ocean) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto mb-10">
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
          eThekwini Municipality
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
          Upcoming Events
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-section-sub)",
            color: "#999",
            letterSpacing: "0.05em",
          }}
        >
          What's happening across Durban
        </p>
      </div>

      <div
        className="max-w-7xl mx-auto flex items-stretch"
        style={{ gap: "10px" }}
      >
        {prevEvent ? (
          <PeekCard
            event={prevEvent}
            onClick={() => canGoPrev && setStartIndex((s) => s - 1)}
          />
        ) : (
          <div style={{ width: "5%", flexShrink: 0 }} />
        )}

        <div className="flex flex-1" style={{ gap: "10px" }}>
          {visibleEvents.map((event, i) =>
            event ? (
              <EventCard key={event.id} event={event} />
            ) : (
              <div
                key={`empty-${i}`}
                className="flex-1"
                style={{
                  height: "440px",
                  borderRadius: "12px",
                  background: "#f0ebe0",
                  opacity: 0.4,
                }}
              />
            ),
          )}
        </div>

        {nextEvent ? (
          <PeekCard
            event={nextEvent}
            onClick={() => canGoNext && setStartIndex((s) => s + 1)}
          />
        ) : (
          <div style={{ width: "5%", flexShrink: 0 }} />
        )}
      </div>

      {/* Dot indicators: one dot per possible starting position */}
      <div
        className="flex justify-center"
        style={{ gap: "6px", marginTop: "18px" }}
      >
        {Array.from({ length: EVENTS.length - VISIBLE_COUNT + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i)}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
              background:
                i === startIndex
                  ? "var(--color-durban-gold)"
                  : "var(--color-durban-wave)",
              transition: "background 0.2s",
            }}
          />
        ))}
      </div>
    </section>
  );
}
