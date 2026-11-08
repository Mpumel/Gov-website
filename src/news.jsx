import { useState, useEffect } from "react";
import api from "./api/axios";

// Fallback colors for when news items don't have an image
const CARD_COLORS = ["#1A2E1A", "#00B4D8", "#E63946", "#2a4a3a", "#2a1a3a"];

function CategoryBadge({ category, color }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full font-bold uppercase tracking-wide text-white text-sm"
      style={{ background: color }}
    >
      {category}
    </span>
  );
}

function PeekingCard({ item, onClick, colorIndex }) {
  return (
    <div onClick={onClick} className="shrink-0 w-[12%] cursor-pointer group">
      <div
        className="w-full h-[320px] rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        style={{
          background:
            item.color || CARD_COLORS[colorIndex % CARD_COLORS.length],
        }}
      />
      <p className="text-xs text-gray-500 leading-snug line-clamp-2 mt-3 font-medium group-hover:text-gray-700 transition-colors">
        {item.title}
      </p>
    </div>
  );
}

export default function NewsSection() {
  const [active, setActive] = useState(0);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news from backend on mount
  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await api.get("/news");
        setNewsItems(res.data);
      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError("Could not load news.");
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  function goNext() {
    if (active < newsItems.length - 1) setActive((a) => a + 1);
  }
  function goPrev() {
    if (active > 0) setActive((a) => a - 1);
  }

  // -----------------------------------------------------------------------
  // LOADING STATE
  // -----------------------------------------------------------------------
  if (loading) {
    return (
      <section className="w-full bg-white py-20 px-6 md:px-12 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400 text-sm">Loading news...</p>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // ERROR STATE
  // -----------------------------------------------------------------------
  if (error) {
    return (
      <section className="w-full bg-white py-20 px-6 md:px-12 flex items-center justify-center min-h-[400px]">
        <p className="text-red-400 text-sm">{error}</p>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // EMPTY STATE
  // -----------------------------------------------------------------------
  if (newsItems.length === 0) {
    return (
      <section className="w-full bg-white py-20 px-6 md:px-12 flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400 text-sm">No news articles yet.</p>
      </section>
    );
  }

  const prev = active > 0 ? newsItems[active - 1] : null;
  const current = newsItems[active];
  const next = active < newsItems.length - 1 ? newsItems[active + 1] : null;

  // Assign a color based on index since DB doesn't store colors
  const currentColor = CARD_COLORS[active % CARD_COLORS.length];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto mb-16">
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
          eThekwini Municipality
        </p>
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Latest News
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl">
          Updates from City Hall and developments across Durban.
        </p>
      </div>

      <div className="flex items-start gap-6">
        {/* Left peek card */}
        {prev ? (
          <PeekingCard item={prev} onClick={goPrev} colorIndex={active - 1} />
        ) : (
          <div className="shrink-0 w-[12%]" />
        )}

        {/* Main active card */}
        <div className="shrink-0 w-[76%]">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="flex">
              {/* Image / color panel */}
              <div
                className="w-[50%] shrink-0 h-[360px] relative overflow-hidden flex items-center justify-center"
                style={{ background: currentColor }}
              >
                {current.image_url ? (
                  <img
                    src={current.image_url}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-4xl ml-1">▶</span>
                  </div>
                )}
                {/* Date overlay */}
                <div className="absolute top-6 left-6">
                  <span className="text-white/90 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {new Date(current.date).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-10 flex flex-col justify-center gap-4">
                <CategoryBadge
                  category={current.category || "News"}
                  color={currentColor}
                />
                <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                  {current.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {current.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right peek card */}
        {next ? (
          <PeekingCard item={next} onClick={goNext} colorIndex={active + 1} />
        ) : (
          <div className="shrink-0 w-[12%]" />
        )}
      </div>
    </section>
  );
}
