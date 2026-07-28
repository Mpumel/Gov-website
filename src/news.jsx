import { useState } from "react";

const newsItems = [
  {
    id: 1,
    category: "City",
    title: "City Council Approves Budget",
    excerpt:
      "Record infrastructure investment planned for townships and coastal wards.",
    image: null,
    date: "April 16",
    color: "#1A2E1A",
  },
  {
    id: 2,
    category: "Infrastructure",
    title: "Umlazi Water Tower Complete",
    excerpt:
      "New reservoir brings reliable supply to 200,000 residents after years of shortages.",
    image: null,
    date: "March 3",
    color: "#00B4D8",
  },
  {
    id: 3,
    category: "Transport",
    title: "N2 Resurfacing At 60%",
    excerpt:
      "Major highway upgrade on track for completion before holiday season rush.",
    image: null,
    date: "March 1",
    color: "#E63946",
  },
];

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

function PeekingCard({ item, onClick }) {
  return (
    <div onClick={onClick} className="shrink-0 w-[12%] cursor-pointer group">
      <div
        className="w-full h-[320px] rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
        style={{ background: item.color }}
      />
      <p className="text-xs text-gray-500 leading-snug line-clamp-2 mt-3 font-medium group-hover:text-gray-700 transition-colors">
        {item.title}
      </p>
    </div>
  );
}

export default function NewsSection() {
  const [active, setActive] = useState(0);

  function goNext() {
    if (active < newsItems.length - 1) setActive((a) => a + 1);
  }
  function goPrev() {
    if (active > 0) setActive((a) => a - 1);
  }

  const prev = active > 0 ? newsItems[active - 1] : null;
  const current = newsItems[active];
  const next = active < newsItems.length - 1 ? newsItems[active + 1] : null;

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
        {prev ? (
          <PeekingCard item={prev} onClick={goPrev} />
        ) : (
          <div className="shrink-0 w-[12%]" />
        )}

        <div className="shrink-0 w-[76%]">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="flex">
              <div
                className="w-[50%] shrink-0 h-[360px] relative overflow-hidden flex items-center justify-center"
                style={{ background: current.color }}
              >
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-4xl ml-1">▶</span>
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className="text-white/90 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {current.date}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-10 flex flex-col justify-center gap-4">
                <CategoryBadge
                  category={current.category}
                  color={current.color}
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

        {next ? (
          <PeekingCard item={next} onClick={goNext} />
        ) : (
          <div className="shrink-0 w-[12%]" />
        )}
      </div>
    </section>
  );
}
