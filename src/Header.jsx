// import { useState } from "react";

// export default function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   const navLinks = ["Home", "About", "Service", "Contact Us"];

//   return (
//     <header className="bg-[#192b19] text-white w-full px-6 py-4">
//       {/* Main row */}
//       <div className="flex items-center justify-between max-w-6xl mx-auto">
//         {/* Logo */}
//         <div className="uppercase text-2xl font-serif font-extrabold tracking-widest cursor-pointer">
//           Durban
//         </div>

//         {/* Desktop Nav */}
//         <ul className="hidden md:flex items-center space-x-1 font-semibold">
//           {navLinks.map((link) => (
//             <li
//               key={link}
//               className="cursor-pointer px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-yellow-300/30 hover:text-yellow-300"
//             >
//               {link}
//             </li>
//           ))}
//         </ul>

//         {/* Right side — language + mobile burger */}
//         <div className="flex items-center gap-4">
//           <span className="cursor-pointer font-bold bg-gradient-to-r from-green-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300">
//             English
//           </span>

//           {/* Hamburger — only on mobile */}
//           <button
//             className="md:hidden flex flex-col gap-1.5 cursor-pointer"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <span
//               className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
//             />
//             <span
//               className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
//             />
//             <span
//               className={`block h-0.5 w-6 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu — slides in when open */}
//       {menuOpen && (
//         <ul className="md:hidden mt-4 flex flex-col space-y-1 font-semibold border-t border-white/10 pt-4">
//           {navLinks.map((link) => (
//             <li
//               key={link}
//               className="cursor-pointer px-4 py-3 rounded-md hover:bg-yellow-300/20 hover:text-yellow-300 transition-all duration-300"
//             >
//               {link}
//             </li>
//           ))}
//         </ul>
//       )}
//     </header>
//   );
// }
//
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  const navLinks = ["Home", "About", "Services", "Contact"];

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
      {/* Top thin gold line — identity stripe */}
      <div className="w-full h-1 bg-[#C8922A]" />

      <div className="bg-[#0F1F0F] text-white px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo */}
          <div className="flex flex-col leading-none cursor-pointer">
            <span className="uppercase font-extrabold text-2xl tracking-widest text-white">
              eThekwini
            </span>
            <span className="text-[#C8922A] text-xs tracking-[0.3em] uppercase font-semibold">
              Municipality
            </span>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1 font-semibold text-sm">
            {navLinks.map((link) => (
              <li
                key={link}
                className="cursor-pointer px-4 py-2 text-white/70 hover:text-white 
                transition-colors duration-200 tracking-wide uppercase text-xs"
              >
                {link}
              </li>
            ))}
          </ul>

          {/* Right — Report button + burger */}
          <div className="flex items-center gap-4">
            <button
              className="hidden md:block text-xs font-bold uppercase tracking-widest 
              border border-[#C8922A] text-[#C8922A] px-4 py-2 
              hover:bg-[#C8922A] hover:text-white transition-all duration-300"
            >
              Report Issue
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 
                ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 
                ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 
                ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0F1F0F] border-t border-white/10 px-6 pb-6">
          <ul className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <li
                key={link}
                className="cursor-pointer px-4 py-3 text-white/70 hover:text-white 
                uppercase text-xs tracking-widest font-semibold 
                border-b border-white/5 transition-colors duration-200"
              >
                {link}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 w-full text-xs font-bold uppercase tracking-widest 
            border border-[#C8922A] text-[#C8922A] px-4 py-3
            hover:bg-[#C8922A] hover:text-white transition-all duration-300"
          >
            Report Issue
          </button>
        </div>
      )}
    </header>
  );
}
