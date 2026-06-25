"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, Globe, LogIn, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Features", href: "/home#how-it-works" },
  { label: "Testimonials", href: "/home#testimonials" },
  { label: "Ambassadors", href: "/ambassadors" },
  { label: "FAQ", href: "/home#faq" },
];

const LANGUAGES = [
  { code: "NG", label: "NG", flag: "🇳🇬" },
  { code: "US", label: "US", flag: "🇺🇸" },
  { code: "UK", label: "UK", flag: "🇬🇧" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Scroll listener for glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  // Only exact-path links get the active highlight.
  // Hash anchor links (Features, Testimonials, FAQ) can't be reliably
  // detected without an IntersectionObserver, so we never mark them active.
  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href;
  };

  const isLandingPage = pathname === "/";

  return (
    <header
      className={`fixed left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 ${
        isLandingPage && !scrolled
          ? "top-12 md:top-10 pt-4"
          : "top-0 pt-4"
      }`}
    >
      {/* ── Main pill bar ── */}
      <div
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 ${
          scrolled
            ? "bg-white/45 backdrop-blur-xl shadow-lg shadow-slate-900/10 border border-slate-200/50"
            : "bg-white backdrop-blur-md shadow-md shadow-slate-900/5 border border-white/40"
        } rounded-full px-3 py-3 flex items-center justify-between gap-4`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center pl-1 hover:opacity-85 transition-opacity"
        >
          <Image
            src="/tikkety-main-logo.png"
            alt="Tikkety"
            width={120}
            height={34}
            priority
            style={{ width: "120px", height: "auto" }}
            className="object-contain"
          />
        </Link>

        {/* ── Desktop nav links (centred) ── */}
        <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 shadow-sm"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ── Desktop right section ── */}
        <div className="hidden lg:flex items-center gap-1 pr-1 shrink-0">
          {/* Language picker */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-colors"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-4 h-4 text-zinc-400" />
              <span>{currentLang.flag}</span>
              <span className="font-semibold">{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white/98 backdrop-blur-xl rounded-2xl border border-zinc-200/50 shadow-xl py-1.5 min-w-[100px] overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                      currentLang.code === lang.code
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-zinc-200 mx-1" />

          {/* Log in */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80 transition-all duration-200 group"
          >
            <LogIn className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
            Log in
          </Link>

          {/* Get Started CTA */}
          {/* <Link
            href="/register"
            className="group relative flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35 overflow-hidden"
          > */}
            {/* shimmer */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Sparkles className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Get Started</span>
          </Link> */}
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden p-2 rounded-full text-zinc-600 hover:bg-zinc-100/80 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={`pointer-events-auto absolute top-[calc(100%_-_8px)] left-4 right-4 max-w-6xl mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mt-1 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl shadow-indigo-950/10 overflow-hidden">
          {/* Nav links */}
          <ul className="px-3 pt-5 pb-2 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700"
                        : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile auth buttons */}
          <div className="px-3 pb-3 pt-1 flex flex-col gap-2 border-t border-zinc-100/80">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileOpen(false)}
              className="group relative flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md shadow-indigo-500/25 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Sparkles className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10">Get Started</span>
            </Link>
          </div>

          {/* Mobile language strip */}
          <div className="px-3 pb-4 pt-1 border-t border-zinc-100/80">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2 px-1">Language</p>
            <div className="flex items-center gap-2 flex-wrap">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    currentLang.code === lang.code
                      ? "bg-indigo-100 text-indigo-700 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {lang.flag} {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}