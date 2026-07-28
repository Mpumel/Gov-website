export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Services", href: "#services" },
    { label: "News & Events", href: "#news" },
    { label: "City Council", href: "#council" },
    { label: "Tourism", href: "#tourism" },
    { label: "About eThekwini", href: "#about" },
  ];

  const socials = [
    { icon: "ti-brand-facebook", label: "Facebook", href: "#" },
    { icon: "ti-brand-x", label: "Twitter/X", href: "#" },
    { icon: "ti-brand-youtube", label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-[#0F1F0F] rounded-t-xl text-white">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#C8922A] flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-[#0F1F0F]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 9.75L12 3l9 6.75V21H3V9.75z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 21V12h6v9"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold tracking-wide">
                eThekwini Municipality
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-5 max-w-[220px]">
              Serving the people of Durban and the greater eThekwini region.
            </p>
            <div className="flex gap-2">
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
                >
                  <i className={`ti ${icon} text-base`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C8922A] mb-4">
              Quick links
            </p>
            <ul className="flex flex-col gap-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#C8922A] mb-4">
              Contact us
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-3 items-start">
                <span className="text-[#C8922A] mt-0.5 flex-shrink-0">📍</span>
                <span className="text-sm text-white/55 leading-relaxed">
                  73 Langalibalele St
                  <br />
                  Durban, 4001
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-[#C8922A] flex-shrink-0">📞</span>
                <a
                  href="tel:0803113111"
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  080 311 3111
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-[#C8922A] flex-shrink-0">✉️</span>
                <a
                  href="mailto:info@durban.gov.za"
                  className="text-sm text-white/55 hover:text-white transition-colors"
                >
                  info@durban.gov.za
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-[#C8922A] flex-shrink-0">🕐</span>
                <span className="text-sm text-white/55">
                  Mon–Fri, 07:30–16:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal strip */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 py-5 text-xs text-white/30">
          <p>© {year} eThekwini Municipality. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/60 transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Terms of use
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
