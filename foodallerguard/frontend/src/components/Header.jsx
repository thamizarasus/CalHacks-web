import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Logo() {
  // Simple shield + radar placeholder (inline SVG)
  return (
    <div className="h-9 w-9 rounded-full bg-[#A64B29]/10 flex items-center justify-center ring-1 ring-[#A64B29]/20">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#A64B29]">
        <path fill="currentColor" d="M12 2l7 3v5c0 5-3.6 9.6-7 10-3.4-.4-7-5-7-10V5l7-3z"/>
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M12 7.5v1.5m4.5 3h-1.5M12 15v1.5M8.5 12H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const linkBase =
    "px-3 py-2 text-sm text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300 rounded-md";
  const isActive = (path) =>
    location.pathname === path ? "text-[#A64B29] font-semibold" : "";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Left: Logo + Brand */}
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-[#A64B29]">FoodAllerGuard</span>
              <span className="hidden sm:block text-xs text-slate-600">
                AI-Powered Allergy Risk Scanner
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/features" className={`${linkBase} ${isActive("/features")}`}>Features</Link>
            <Link to="/about" className={`${linkBase} ${isActive("/about")}`}>About</Link>
            <Link to="/contact" className={`${linkBase} ${isActive("/contact")}`}>Contact</Link>
            <Link
              to="/"
              className="ml-2 inline-flex items-center rounded-xl bg-[#A64B29] px-5 py-2 text-white text-sm font-medium shadow-sm hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A64B29]"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile: Hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300"
            aria-label="Open menu"
            aria-controls="mobile-menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeWidth="1.8" strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeWidth="1.8" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Panel */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-slate-100 overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1 bg-white">
          <Link to="/features" className={`${linkBase} block w-full text-left ${isActive("/features")}`}>Features</Link>
          <Link to="/about" className={`${linkBase} block w-full text-left ${isActive("/about")}`}>About</Link>
          <Link to="/contact" className={`${linkBase} block w-full text-left ${isActive("/contact")}`}>Contact</Link>
          <Link
            to="/"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#A64B29] px-5 py-2 text-white text-sm font-medium shadow-sm hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A64B29]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}