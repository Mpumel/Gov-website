import { useState, useEffect, useRef } from "react";

const SA_LANGUAGES = [
  { code: "EN", name: "English" },
  { code: "ZU", name: "isiZulu" },
  { code: "XH", name: "isiXhosa" },
  { code: "AF", name: "Afrikaans" },
  { code: "ST", name: "Sesotho" },
  { code: "TN", name: "Setswana" },
  { code: "SS", name: "siSwati" },
  { code: "VE", name: "Tshivenda" },
  { code: "TS", name: "Xitsonga" },
  { code: "NR", name: "isiNdebele" },
  { code: "NSO", name: "Sepedi" },
];

const WORLD_LANGUAGES = [
  { code: "FR", name: "Français" },
  { code: "ES", name: "Español" },
  { code: "PT", name: "Português" },
  { code: "AR", name: "العربية" },
  { code: "HI", name: "हिन्दी" },
  { code: "ZH", name: "中文" },
  { code: "DE", name: "Deutsch" },
  { code: "JA", name: "日本語" },
];

const NAV_LINKS = [
  "Home",
  "Services",
  "News",
  "Events",
  "About",
  "Tourism",
  "Council",
];

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ code: "EN", name: "English" });
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleScroll() {
      setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  function select(lang) {
    setSelected(lang);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-[#C8922A]/40 rounded
        text-white/70 text-sm px-3 py-1.5 tracking-wide
        hover:border-[#C8922A] hover:text-white transition-all"
      >
        🌐 {selected.code} — {selected.name}
        <span className="text-[#C8922A]">▾</span>
      </button>

      {open && (
        <div
          className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2
          bg-[#0F1F0F] border border-[#C8922A]/30 rounded-md z-50
          min-w-[200px] max-h-[280px] overflow-y-auto shadow-xl"
        >
          <p
            className="text-xs uppercase tracking-widest text-[#C8922A]
            px-4 py-2.5 border-b border-white/5"
          >
            South African languages
          </p>
          {SA_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className="block w-full text-left px-4 py-2.5 text-sm
              text-white/60 hover:bg-[#C8922A]/10 hover:text-[#C8922A] transition-colors"
            >
              {lang.name}
            </button>
          ))}
          <p
            className="text-xs uppercase tracking-widest text-[#C8922A]
            px-4 py-2.5 border-y border-white/5"
          >
            World languages
          </p>
          {WORLD_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className="block w-full text-left px-4 py-2.5 text-sm
              text-white/60 hover:bg-[#C8922A]/10 hover:text-[#C8922A] transition-colors"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setVisible(current < lastScroll || current < 50);
      setLastScroll(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500
      ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* TOP BAR — dark, logo + language + auth */}
      <div className="bg-[#0F1F0F] px-6 md:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col leading-none cursor-pointer gap-1">
          <span className="uppercase font-extrabold text-2xl tracking-widest text-white">
            eThekwini
          </span>
          <span className="text-[#C8922A] text-[11px] tracking-[0.3em] uppercase font-semibold">
            Municipality
          </span>
        </div>

        {/* Language selector — centered */}
        <div className="hidden md:block">
          <LanguageSelector />
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/register"
            className="text-sm text-white/50 hover:text-white transition-colors tracking-wide"
          >
            Register
          </a>
          <div className="w-px h-4 bg-white/15" />
          <a
            href="/login"
            className="text-sm font-semibold uppercase tracking-widest border
            border-[#C8922A]/50 rounded-sm text-[#C8922A] px-4 py-1.5
            hover:bg-[#C8922A] hover:text-[#0F1F0F] transition-all"
          >
            Sign in
          </a>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* MAIN NAV BAR — white */}
      <div className="hidden md:flex bg-white border-b border-gray-200 px-6 md:px-12 items-center justify-between h-14">
        <nav className="flex items-center h-full">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium uppercase tracking-wider text-gray-500
              px-4 h-14 flex items-center border-b-2 border-transparent
              hover:text-[#0F1F0F] hover:border-[#C8922A] transition-all"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Search — stronger border so it doesn't fade into white bg */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search eThekwini..."
              className="bg-transparent text-sm text-gray-600 outline-none w-36 placeholder:text-gray-400"
            />
          </div>
          <button className="text-sm font-semibold uppercase tracking-wide bg-[#0F1F0F] text-white px-5 py-2 rounded-sm hover:bg-[#C8922A] transition-colors">
            Report issue
          </button>
        </div>
      </div>

      {/* Gold closing stripe */}
      <div className="hidden md:block h-[3px] bg-gradient-to-r from-[#C8922A] via-[#e8b84b] to-[#C8922A]" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F1F0F] border-t border-white/10 px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4">
            {NAV_LINKS.map((link) => (
              <li key={link} className="border-b border-white/5">
                <a
                  href={`#${link.toLowerCase()}`}
                  className="block px-4 py-3 text-white/70 hover:text-white
                  uppercase text-xs tracking-widest font-semibold transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="/register"
              className="flex-1 text-center text-xs font-bold uppercase tracking-widest
              border border-white/20 text-white/60 px-4 py-3 hover:text-white transition-colors"
            >
              Register
            </a>
            <a
              href="/login"
              className="flex-1 text-center text-xs font-bold uppercase tracking-widest
              border border-[#C8922A] text-[#C8922A] px-4 py-3
              hover:bg-[#C8922A] hover:text-[#0F1F0F] transition-all"
            >
              Sign in
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
