"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Features", href: "/features" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Ambassadors", href: "/ambassadors" },
  { label: "FAQ", href: "/faq" },
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close lang dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = () => setLangOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [langOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4 pointer-events-none">
      {/* Main pill */}
      <div className="pointer-events-auto w-full max-w-5xl bg-blue-200 rounded-full shadow-2xl shadow-blue-900/40 px-3 py-3 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center pl-2 shrink-0 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/tikkety-main-logo.png"
            alt="Tikkety Logo"
            width={120}
            height={32}
            priority
            style={{ width: "120px", height: "auto" }}
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-md font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-blue-700"
                      : "text-blue-700/80 hover:text-blue-700 hover:bg-white/10"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right section — lang pill + mobile toggle */}
        <div className="flex items-center gap-2 pr-1 shrink-0">
          {/* Language pill */}
          <div className="relative hidden lg:block" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 border border-blue-700 text-sm font-semibold text-blue-700 hover:bg-white/25 transition-colors"
            >
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span>{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-blue-700/70 transition-transform duration-200 ${
                  langOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-blue-900 border border-white/15 rounded-2xl shadow-2xl shadow-blue-900/50 py-1.5 min-w-[110px] overflow-hidden">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangOpen(false);
                    }}
                    className={`flex items-center gap-2.5 w-full px-4 py-2 text-sm transition-colors ${
                      currentLang.code === lang.code
                        ? "bg-white/20 text-white font-semibold"
                        : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-full text-blue-700 hover:bg-white/15 transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer — sits below the pill */}
      <div
        className={`pointer-events-auto absolute top-[calc(100%_-_12px)] left-4 right-4 max-w-5xl mx-auto overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 bg-blue-900 rounded-3xl border border-white/15 shadow-2xl shadow-blue-900/50 overflow-hidden">
          <ul className="px-4 pt-4 pb-2 flex flex-col gap-0.5">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "text-blue-100/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile language strip */}
          <div className="px-4 pb-4 pt-2 border-t border-white/10 mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    currentLang.code === lang.code
                      ? "bg-white/20 text-white"
                      : "text-blue-100/70 hover:text-white hover:bg-white/10"
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