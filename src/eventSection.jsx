import { useState, useEffect } from "react";
import api from "./api/axios"; // Assuming you have an API utility for fetching data

// -----------------------------------------------------------------------
// FALLBACK COLORS — used when the backend doesn't supply one
// Cycles through these for visual variety across event cards
// -----------------------------------------------------------------------
const CARD_COLORS = ["#1A2E1A", "#1a3a4a", "#2a4a3a", "#2a1a3a"];

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
          background: event.color || CARD_COLORS[0],
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

function EventCard({ event, colorIndex }) {
  // Format the date from PostgreSQL ISO string to readable format
  // e.g. "2026-07-12T00:00:00.000Z" → "12 July 2026"
  function formatDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const cardColor = event.color || CARD_COLORS[colorIndex % CARD_COLORS.length];
  const formattedDate = formatDate(event.date);

  return (
    <div
      className="flex-1 flex flex-col rounded-xl overflow-hidden bg-white"
      style={{ boxShadow: "0 4px 18px rgba(0,0,0,0.08)", height: "440px" }}
    >
      {/* Image / color banner */}
      <div
        className="relative flex items-end overflow-hidden"
        style={{ height: "48%", flexShrink: 0, padding: "12px" }}
      >
        <div className="absolute inset-0" style={{ background: cardColor }} />
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {/* Gradient overlay so text is readable over the image/color */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.05) 65%)",
            zIndex: 1,
          }}
        />

        {/* Featured badge */}
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

        {/* Category + title overlaid on image */}
        <div className="relative" style={{ zIndex: 2, width: "100%" }}>
          <span
            className="inline-block mb-1.5"
            style={{
              background: "var(--color-durban-gold)",
              color: "#fff",
              fontSize: "var(--text-event-tag)",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "2px 7px",
              borderRadius: "3px",
              fontFamily: "var(--font-body)",
            }}
          >
            {event.category || "General"}
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

      {/* Card body — description + meta */}
      <div
        className="flex flex-col flex-1 gap-7"
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

        {/* Date, time, location — gold dash as bullet */}
        <div className="flex flex-col" style={{ gap: "6px" }}>
          {formattedDate && (
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
                className="font-bold"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-event-tag)",
                  color: "#666",
                }}
              >
                {formattedDate}
              </span>
            </div>
          )}

          {event.time && (
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
                className="font-bold"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-event-tag)",
                  color: "#666",
                }}
              >
                {event.time}
              </span>
            </div>
          )}

          {event.location && (
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
                className="font-bold"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-event-tag)",
                  color: "#666",
                }}
              >
                {event.location}
              </span>
              {/* Price — shows Free or ticket price */}
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
                  className="font-bold"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--text-event-tag)",
                    color: event.price === "Free" ? "#16a34a" : "#666",
                  }}
                >
                  {event.price || "Free"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EventsSection() {
  const [startIndex, setStartIndex] = useState(0);
  // events holds the data fetched from the backend
  const [events, setEvents] = useState([]);
  // loading and error states for UX feedback
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const VISIBLE_COUNT = 3;

  // Fetch events from backend when component mounts
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Could not load events.");
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []); // empty array = run once on mount

  const visibleEvents = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
    const idx = startIndex + i;
    return idx < events.length ? events[idx] : null;
  });

  const prevEvent = startIndex > 0 ? events[startIndex - 1] : null;
  const nextEvent =
    startIndex + VISIBLE_COUNT < events.length
      ? events[startIndex + VISIBLE_COUNT]
      : null;

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + VISIBLE_COUNT < events.length;

  // -----------------------------------------------------------------------
  // LOADING STATE — shown while waiting for the API response
  // -----------------------------------------------------------------------
  if (loading) {
    return (
      <section
        className="w-full py-20 px-6 md:px-12 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, var(--color-durban-sand) 0%, var(--color-durban-ocean) 100%)",
          minHeight: "500px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-durban-sub)",
            fontSize: "var(--text-section-sub)",
          }}
        >
          Loading events...
        </p>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // ERROR STATE — shown if the API call fails
  // -----------------------------------------------------------------------
  if (error) {
    return (
      <section
        className="w-full py-20 px-6 md:px-12 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, var(--color-durban-sand) 0%, var(--color-durban-ocean) 100%)",
          minHeight: "500px",
        }}
      >
        <p style={{ color: "#E63946", fontFamily: "var(--font-body)" }}>
          {error}
        </p>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // EMPTY STATE — shown if the database has no events yet
  // -----------------------------------------------------------------------
  if (events.length === 0) {
    return (
      <section
        className="w-full py-20 px-6 md:px-12 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, var(--color-durban-sand) 0%, var(--color-durban-ocean) 100%)",
          minHeight: "500px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-durban-sub)",
          }}
        >
          No upcoming events.
        </p>
      </section>
    );
  }

  return (
    <section
      className="w-full py-20 px-6 md:px-12 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-durban-sand) 0%, var(--color-durban-ocean) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto mb-10">
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
            color: "var(--color-durban-sub)",
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
        {/* Left peek card — previous event */}
        {prevEvent ? (
          <PeekCard
            event={prevEvent}
            onClick={() => canGoPrev && setStartIndex((s) => s - 1)}
          />
        ) : (
          <div style={{ width: "5%", flexShrink: 0 }} />
        )}

        {/* Visible event cards */}
        <div className="flex flex-1" style={{ gap: "10px" }}>
          {visibleEvents.map((event, i) =>
            event ? (
              <EventCard key={event.id} event={event} colorIndex={i} />
            ) : (
              // Empty placeholder to maintain layout when fewer than 3 events
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

        {/* Right peek card — next event */}
        {nextEvent ? (
          <PeekCard
            event={nextEvent}
            onClick={() => canGoNext && setStartIndex((s) => s + 1)}
          />
        ) : (
          <div style={{ width: "5%", flexShrink: 0 }} />
        )}
      </div>

      {/* Dot indicators — one per carousel position */}
      <div
        className="flex justify-center"
        style={{ gap: "6px", marginTop: "18px" }}
      >
        {Array.from(
          { length: Math.max(0, events.length - VISIBLE_COUNT + 1) },
          (_, i) => (
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
          ),
        )}
      </div>
    </section>
  );
}
