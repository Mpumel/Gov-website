import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Home", "About", "Service", "Contact Us"];

  return (
    <header className="bg-[#192b19] text-white w-full px-6 py-4">
      
      {/* Main row */}
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        
        {/* Logo */}
        <div className="uppercase text-2xl font-serif font-extrabold tracking-widest cursor-pointer">
          Durban
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-1 font-semibold">
          {navLinks.map((link) => (
            <li
              key={link}
              className="cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-yellow-300/30 hover:text-yellow-300"
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Right side — language + mobile burger */}
        <div className="flex items-center gap-4">
          <span className="cursor-pointer font-bold bg-gradient-to-r from-green-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300">
            English
          </span>

          {/* Hamburger — only on mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu — slides in when open */}
      {menuOpen && (
        <ul className="md:hidden mt-4 flex flex-col space-y-1 font-semibold border-t border-white/10 pt-4">
          {navLinks.map((link) => (
            <li
              key={link}
              className="cursor-pointer px-4 py-3 rounded-md hover:bg-yellow-300/20 hover:text-yellow-300 transition-all duration-300"
            >
              {link}
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
