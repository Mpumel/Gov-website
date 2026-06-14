import { useState } from "react";
// -----------------------------------------------------------------------
// NEWS DATA — same structure, updated for visual consistency
// Added 'excerpt' for richer content like Services section descriptions
// -----------------------------------------------------------------------
const newsitems = [
  {
    id: 1,
    category: "city",
    title: "City Council Approves Budget",
    excerpt:
      "Record infrastructure investment planned for townships and coastal wards.",
    image: null,
    date: "April 16",
    color: "#1A2E1A", // forest green
  },
  {
    id: 2,
    category: "Infrastructure",
    title: "Umlazi Water Tower Complete",
    excerpt:
      "New reservoir brings reliable supply to 200,000 residents after years of shortages.",
    image: null,
    date: "March 3",
    color: "#00B4D8", // bright blue (matches Services water color)
  },
  {
    id: 3,
    category: "Transport",
    title: "N2 Resurfacing At 60%",
    excerpt:
      "Major highway upgrade on track for completion before holiday season rush.",
    image: null,
    date: "March 1",
    color: "#E63946", // bold red (matches Services roads color)
  },
];
// CATEGORY BADGE — same pattern as StatusBadge in Services
// Reusable component for visual consistency.
function CategoryBadge({ category, color }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full font-bold uppercase tracking-wide text-white"
      style={{ background: color }}
    >
      {category}
    </span>
  );
}
// PEEK CARD — the slim prev/next cards on sides
// Extracted to keep main component clean
function PeekingCard({ item, onClick, side }) {
  return (
    <div onClick={onClick} className="shrink-0 w-[12%] cursor-pointer group">
      <div
        className="w-full h-[320px] rounded-2xl opacity-30 group-hover:opacity-50  transition-opacity duration-300"
        style={{ background: item.color }}
      />

      <p className="text-xs text-gray-500 leading-snug line-clamp-2 mt-3 font-medium group-hover:text-gray-700 transition-colors">
        {item.title}
      </p>
    </div>
  );
}
// MAIN NEWS SECTION — rebuilt with Services section DNA

export default function NewsSection() {
  // State tracks which news item is currently shown
  const [isActive, setIsActive] = useState(0);
  // Navigation functions — same logic, cleaner syntax
  function goNext() {
    if (isActive < newsitems.length - 1) setIsActive((prev) => prev + 1);
  }
  function goPrev() {
    if (isActive > 0) setIsActive((prev) => prev - 1);
  }

  // Get adjacent items for peek cards
  const prev = isActive > 0 ? newsitems[isActive - 1] : null;
  const current = newsitems[isActive];
  const next = isActive < newsitems.length - 1 ? newsitems[isActive + 1] : null;

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12">
      <div className=" max-w-7xl mx-auto">
        <div className="mb-16">
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
      </div>
      {/* -----------------------------------------------------------------------
            CAROUSEL CONTAINER — flex layout with peek cards on sides
            ----------------------------------------------------------------------- */}
      <div className="flex items-start gap-6">
        {/* LEFT PEEK — previous item */}
        {prev ? (
          <PeekingCard item={prev} onClick={goPrev} side="prev" />
        ) : (
          // Spacer when no previous item — maintains layout balance
          <div className="shrink-0 w-[12%]" />
        )}
        {/* -----------------------------------------------------------------------
                    MAIN ACTIVE CARD — the star of the show
                    Uses Services card patterns: rounded-2xl, shadow, image + content split
                ----------------------------------------------------------------------- */}
        <div className="shrink-0 w-[76%]">
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            {/* CARD INNER — flex row like Services cards */}
            <div className="flex gap-0">
              {/* LEFT — image area (60% width) */}
              {/* Matches Services card image proportions */}
              <div
                className="w-[50%] shrink-0 h-[360px] relative overflow-hidden"
                style={{ background: current.color }}
              >
                {current.image ? (
                  <img
                    src={current.image}
                    alt={current.title}
                    className=" w-full h-full object-cover"
                  />
                ) : (
                  //placeholder
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white text-4xl ml-1">▶</span>
                    </div>
                  </div>
                )}
                {/* Date overlay — positioned like StatusBadge on Services cards */}
                <div className=" absolute top-6 left-6">
                  <span className="text-white/90 text-sm font-medium bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {current.date}
                  </span>
                </div>
              </div>
              {/* RIGHT — content area (40% width) */}
              {/* Generous padding, vertical centering with flex */}
              <div className="flex-1 p-10 flex flex-col justify-center gap-4">
                <CategoryBadge
                  category={current.category}
                  color={current.color}
                />

                <h3 className="text-3xl font-bold text-gray-900 leading-tight">
                  {current.title}
                </h3>

                {/* NEW: Excerpt text like Services descriptions */}
                <p className="text-gray-600 leading-relaxed text-lg">
                  {current.excerpt}
                </p>
              </div>
            </div>
            {/* -----------------------------------------------------------------------
                            CARD FOOTER — actions row
                            Matches Services bottom CTA strip styling
                        ----------------------------------------------------------------------- */}
          </div>
        </div>
      </div>
    </section>
  );
}
