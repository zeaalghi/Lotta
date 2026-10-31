"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  formatPrice,
  Lang,
  PACKAGES,
  StoryTrailer,
  DestinationPackage,
  UI_TEXT,
} from "@/data/lotta-content";
import {
  FALLBACK_WEATHER_TELEMETRY,
  WeatherTelemetryResponse,
} from "@/lib/weather-telemetry";
import type { GuideRecord } from "@/lib/guides-catalog";
import { TripDetailTabs } from "@/components/TripDetailTabs";
import {
  getLangFromPathname,
  localizedPath,
  stripLangPrefix,
  switchLanguagePath,
} from "@/lib/seo";

interface LottaContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  localizeHref: (href: string) => string;
  weatherData: WeatherTelemetryResponse;
  activeTrailer: StoryTrailer | null;
  setActiveTrailer: (trailer: StoryTrailer | null) => void;
  activePackageModal: DestinationPackage | null;
  setActivePackageModal: (pkg: DestinationPackage | null) => void;
  selectedRoute: string;
  setSelectedRoute: (route: string) => void;
  selectedGuide: GuideRecord | null;
  setSelectedGuide: (guide: GuideRecord | null) => void;
  chooseRouteAndGoToGuides: (routeTitle: string) => void;
}

const LottaContext = createContext<LottaContextValue | null>(null);

export function useLotta(): LottaContextValue {
  const ctx = useContext(LottaContext);
  if (!ctx) {
    throw new Error("useLotta must be used inside LottaShell");
  }
  return ctx;
}

export function LottaShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [lang, setLangState] = useState<Lang>(() => getLangFromPathname(pathname));
  const [weatherData, setWeatherData] = useState<WeatherTelemetryResponse>(
    FALLBACK_WEATHER_TELEMETRY
  );
  const [activeTrailer, setActiveTrailer] = useState<StoryTrailer | null>(null);
  const [activePackageModal, setActivePackageModal] =
    useState<DestinationPackage | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>(
    PACKAGES[0].title.id
  );
  const [selectedGuide, setSelectedGuide] = useState<GuideRecord | null>(null);

  // Sync language with URL pathname
  useEffect(() => {
    const urlLang = getLangFromPathname(pathname);
    setLangState(urlLang);
    try {
      document.documentElement.lang = urlLang;
    } catch {
      // ignore
    }
  }, [pathname]);

  const setLang = (nextLang: Lang) => {
    setLangState(nextLang);
    try {
      window.localStorage.setItem("lotta_lang", nextLang);
      document.documentElement.lang = nextLang;
    } catch {
      // ignore storage error
    }
    const target = switchLanguagePath(pathname, nextLang);
    if (target !== pathname) {
      router.push(target);
    }
  };

  const localizeHref = (href: string): string => {
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return href;
    }
    return localizedPath(href, lang);
  };

  useEffect(() => {
    let mounted = true;
    fetch("/api/weather")
      .then((res) => (res.ok ? res.json() : null))
      .then((json: WeatherTelemetryResponse | null) => {
        if (mounted && json && json.zones) {
          setWeatherData(json);
        }
      })
      .catch(() => {
        // fallback remains active
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveTrailer(null);
        setActivePackageModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const chooseRouteAndGoToGuides = (routeTitle: string) => {
    setSelectedRoute(routeTitle);
    setActiveTrailer(null);
    setActivePackageModal(null);
    router.push(localizeHref(`/guides?route=${encodeURIComponent(routeTitle)}`));
  };

  const t = UI_TEXT[lang];

  const navItems = [
    {
      href: "/",
      label: t.navHome,
      mobileLabel: lang === "id" ? "Beranda" : "Home",
      stepCode: "01",
    },
    {
      href: "/stories",
      label: t.navStories,
      mobileLabel:
        lang === "id" ? "Cerita" : lang === "en" ? "Stories" : "Storie",
      stepCode: "02",
    },
    {
      href: "/explore",
      label: t.navExplore,
      mobileLabel:
        lang === "id" ? "Destinasi" : lang === "en" ? "Explore" : "Mappa",
      stepCode: "03",
    },
    {
      href: "/weather",
      label: t.navWeather,
      mobileLabel:
        lang === "id" ? "Cuaca" : lang === "en" ? "Weather" : "Meteo",
      stepCode: "04",
    },
    {
      href: "/guides",
      label: t.navGuides,
      mobileLabel:
        lang === "id" ? "Pesan Pemandu" : lang === "en" ? "Book Guide" : "Guida",
      stepCode: "05",
    },
  ];

  const isRouteActive = (href: string) => {
    const clean = stripLangPrefix(pathname);
    if (href === "/") return clean === "/";
    return clean === href || clean.startsWith(`${href}/`);
  };

  return (
    <LottaContext.Provider
      value={{
        lang,
        setLang,
        localizeHref,
        weatherData,
        activeTrailer,
        setActiveTrailer,
        activePackageModal,
        setActivePackageModal,
        selectedRoute,
        setSelectedRoute,
        selectedGuide,
        setSelectedGuide,
        chooseRouteAndGoToGuides,
      }}
    >
      <div className="min-h-screen flex flex-col bg-forest-canvas text-forest-header font-sans">
        {/* TOP STICKY HEADER (No Sidebar, Clean Forest Palette) */}
        <header className="sticky top-0 z-40 bg-forest-header text-white border-b border-forest-title/80 shadow-md">
          <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href={localizeHref("/")}
                className="flex items-center gap-2.5 transition shrink-0 group py-1"
                aria-label="LOTTA Tour & Travel Home"
              >
                <img
                  src="/lotta-logo-navbar.png"
                  alt="LOTTA Tour & Travel"
                  className="h-10 sm:h-11 w-auto object-contain transition group-hover:opacity-95"
                />
              </Link>
            </div>

            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-1.5 lg:gap-2 text-sm font-semibold"
            >
              {navItems.map((item) => {
                const active = isRouteActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={localizeHref(item.href)}
                    className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
                      active
                        ? "bg-forest-primary text-white shadow-sm font-bold"
                        : "text-forest-pill hover:text-white hover:bg-forest-title/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Language Switcher */}
            <div
              className="flex items-center gap-1 bg-forest-title p-1 rounded-xl border border-forest-primary/40 shrink-0"
              role="group"
              aria-label="Language Selector"
            >
              {(["id", "en", "it"] as Lang[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase transition ${
                    lang === code
                      ? "bg-forest-primary text-white shadow-sm"
                      : "text-forest-sage hover:text-white"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1">{children}</main>

        {/* STORY MODAL */}
        {activeTrailer && (
          <div
            className="fixed inset-0 z-50 bg-forest-header/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="story-modal-title"
          >
            <div className="bg-forest-canvas border border-forest-border rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-forest-primary text-white">
                    {activeTrailer.destinationName}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-forest-pill text-forest-title">
                    {activeTrailer.regency} • {activeTrailer.elevationOrDepth}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTrailer(null)}
                  className="shrink-0 text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-xl bg-forest-pill text-forest-header hover:bg-forest-card transition"
                >
                  {lang === "id" ? "Tutup" : lang === "en" ? "Close" : "Chiudi"}
                </button>
              </div>

              <h3
                id="story-modal-title"
                className="text-xl sm:text-2xl font-extrabold text-forest-header mb-4 leading-snug"
              >
                {activeTrailer.title[lang]}
              </h3>

              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-forest-border mb-6">
                <p className="text-sm sm:text-base text-forest-body leading-relaxed">
                  {activeTrailer.hook38Full[lang]}
                </p>
              </div>

              <div className="pt-4 border-t border-forest-border space-y-3">
                <div className="text-xs text-forest-body font-semibold">
                  {lang === "id"
                    ? `Rute Terkait: ${activeTrailer.relatedPackageTitle}`
                    : lang === "en"
                    ? `Related Route: ${activeTrailer.relatedPackageTitle}`
                    : `Percorso Correlato: ${activeTrailer.relatedPackageTitle}`}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <Link
                    href={localizeHref(
                      `/explore/${activeTrailer.packageId || "pkg-explore-rinjani"}`
                    )}
                    onClick={() => setActiveTrailer(null)}
                    className="py-3 px-4 rounded-xl bg-forest-header hover:bg-forest-title text-white font-extrabold text-xs uppercase tracking-wider text-center transition shadow-sm"
                  >
                    {lang === "id"
                      ? "Lihat Detail Trip Lengkap →"
                      : lang === "en"
                      ? "View Full Trip Details →"
                      : "Vedi Dettagli Completi →"}
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      chooseRouteAndGoToGuides(
                        activeTrailer.packageId || activeTrailer.relatedPackageTitle
                      )
                    }
                    className="py-3 px-4 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-xs uppercase tracking-wider text-center transition shadow-sm"
                  >
                    {lang === "id"
                      ? "Pilih Rute & Cari Guide →"
                      : lang === "en"
                      ? "Select Route & Find Guide →"
                      : "Scegli Guida →"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DESTINATION DETAIL MODAL */}
        {activePackageModal && (
          <div
            className="fixed inset-0 z-50 bg-forest-header/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-modal-title"
          >
            <div className="bg-forest-canvas border border-forest-border rounded-t-3xl sm:rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-forest-primary text-white">
                    {activePackageModal.badge[lang]}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-forest-pill text-forest-header">
                    {activePackageModal.duration}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePackageModal(null)}
                  className="shrink-0 text-xs font-extrabold uppercase tracking-wider px-3.5 py-2 rounded-xl bg-forest-pill text-forest-header hover:bg-forest-card transition"
                >
                  {lang === "id" ? "Tutup" : lang === "en" ? "Close" : "Chiudi"}
                </button>
              </div>

              <div className="text-xs font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                {activePackageModal.destinationNames}
              </div>

              <h3
                id="package-modal-title"
                className="text-xl sm:text-2xl font-extrabold text-forest-header mb-3 leading-snug"
              >
                {activePackageModal.title[lang]}
              </h3>

              <p className="text-sm text-forest-body leading-relaxed mb-5">
                {activePackageModal.desc[lang]}
              </p>

              {/* Interactive 4 Tabs: Trip Overview • Inclusion & Exclusions • What to Bring • Itinerary */}
              <TripDetailTabs
                pkg={activePackageModal}
                lang={lang}
                className="mb-5"
              />

              <div className="p-4 rounded-2xl bg-forest-pill border border-forest-border mb-4">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-title mb-1">
                  {lang === "id"
                    ? "PENGANTAR KISAH LOKAL DESTINASI INI"
                    : lang === "en"
                    ? "LOCAL STORY INTRODUCTION FOR THIS DESTINATION"
                    : "INTRODUZIONE ALLA STORIA LOCALE"}
                </div>
                <p className="text-xs sm:text-sm text-forest-body leading-relaxed">
                  {activePackageModal.storyTeaser[lang]}
                </p>
              </div>

              {/* Price & DP 30% Summary Box */}
              <div className="p-4 rounded-2xl bg-forest-alt border border-forest-border mb-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                <div>
                  <div className="text-[10px] font-extrabold uppercase text-forest-body">
                    {t.pricePerPerson}
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-forest-header">
                    {formatPrice(activePackageModal.priceIdr, lang)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-extrabold uppercase text-forest-primary">
                    {t.deposit30Label}
                  </div>
                  <div className="text-sm font-extrabold text-forest-title">
                    {formatPrice(Math.round(activePackageModal.priceIdr * 0.3), lang)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    chooseRouteAndGoToGuides(activePackageModal.id)
                  }
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-xs uppercase tracking-wider transition shadow-sm"
                >
                  {lang === "id"
                    ? "Pilih Destinasi Ini & Lanjut ke Pemilihan Guide →"
                    : lang === "en"
                    ? "Choose This Destination & Proceed to Guide Selection →"
                    : "Scegli Destinazione e Vai alle Guide →"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER (extra pb-28 on mobile so bottom dock never covers footer text) */}
        <footer className="bg-forest-header text-forest-pill border-t border-forest-title pt-12 pb-28 md:pb-12">
          <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-forest-title/60">
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <Link href="/" className="inline-block mb-3" aria-label="LOTTA Home">
                  <img
                    src="/lotta-logo-navbar.png"
                    alt="LOTTA Tour & Travel"
                    className="h-11 sm:h-12 w-auto object-contain"
                  />
                </Link>
                <div className="text-xs font-semibold text-forest-sage mb-2">
                  Lombok Official Guide Network &amp; Tour Operator
                </div>
                <p className="text-xs text-forest-body leading-relaxed mb-4">
                  Beyond the Horizon of Lombok: Living Heritage, Untold Stories.
                  Pemandu lokal berlisensi resmi HPI NTB dengan transparansi penuh tanpa perantara.
                </p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest-title/30 border border-forest-sage/20 text-[11px] font-bold text-forest-sage">
                  <span>HPI NTB Official Partner</span>
                </div>
              </div>

              {/* Navigation / Directory */}
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-4">
                  {lang === "id"
                    ? "EKSPLORASI"
                    : lang === "en"
                    ? "EXPLORE"
                    : "ESPLORA"}
                </div>
                <ul className="space-y-2.5 text-xs text-forest-body">
                  <li>
                    <Link
                      href={localizeHref("/explore")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "24 Destinasi Lengkap"
                        : lang === "en"
                        ? "All 24 Destinations"
                        : "Tutte le 24 Destinazioni"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizeHref("/stories")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "Katalog Cerita & Legenda"
                        : lang === "en"
                        ? "Stories & Legends Catalog"
                        : "Catalogo Storie e Leggende"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizeHref("/guides")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "Pemandu Resmi Berlisensi"
                        : lang === "en"
                        ? "Official Licensed Guides"
                        : "Guide Ufficiali Certificate"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizeHref("/weather")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "Pantauan Cuaca & Ombak"
                        : lang === "en"
                        ? "Live Weather & Wave Telemetry"
                        : "Meteo e Onde in Tempo Reale"}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support Column (matches user's reference) */}
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-4">
                  {lang === "id"
                    ? "BANTUAN & LEGAL"
                    : lang === "en"
                    ? "SUPPORT & LEGAL"
                    : "ASSISTENZA E NOTE LEGALI"}
                </div>
                <ul className="space-y-2.5 text-xs text-forest-body">
                  <li>
                    <Link
                      href={localizeHref("/faq")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "FAQ (Pertanyaan Umum)"
                        : lang === "en"
                        ? "FAQ (Frequently Asked Questions)"
                        : "Domande Frequenti (FAQ)"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizeHref("/terms")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "Syarat & Ketentuan"
                        : lang === "en"
                        ? "Terms & Conditions"
                        : "Termini e Condizioni"}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizeHref("/privacy")}
                      className="hover:text-white transition font-medium"
                    >
                      {lang === "id"
                        ? "Kebijakan Privasi"
                        : lang === "en"
                        ? "Privacy Policy"
                        : "Informativa sulla Privacy"}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Column (matches user's reference) */}
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-4">
                  {lang === "id"
                    ? "KONTAK KAMI"
                    : lang === "en"
                    ? "CONTACT US"
                    : "CONTATTI"}
                </div>
                <div className="space-y-3 text-xs text-forest-body">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-forest-sage/80 mb-0.5">
                      {lang === "id" ? "WhatsApp / Telepon" : "WhatsApp / Phone"}
                    </div>
                    <a
                      href="https://wa.me/6287728770032"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-forest-sage transition font-bold text-sm block"
                    >
                      +62 877-2877-0032
                    </a>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-forest-sage/80 mb-0.5">
                      Email
                    </div>
                    <span className="text-forest-sage/70 font-medium">
                      {lang === "id"
                        ? "Sedang Disiapkan"
                        : lang === "en"
                        ? "In Progress"
                        : "In Preparazione"}
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-forest-sage/80 mb-0.5">
                      {lang === "id" ? "Alamat Kantor / Hub" : "Office Address"}
                    </div>
                    <p className="text-forest-sage/90 leading-relaxed">
                      Sintung, Pringgarata, Lombok Tengah, NTB 83562
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright & Disclaimer Bar */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-forest-sage/80 gap-3">
              <div>
                &copy; {new Date().getFullYear()} LOTTA. All rights reserved.
              </div>
              <div className="text-center sm:text-right">
                {lang === "id"
                  ? "Pemberdayaan Pemandu Lokal Resmi Lombok & HPI DPD NTB"
                  : lang === "en"
                  ? "Official Licensed Lombok Tour Guides & HPI NTB Empowerment"
                  : "Valorizzazione delle Guide Turistiche Ufficiali di Lombok e HPI NTB"}
              </div>
            </div>
          </div>
        </footer>

        {/* MOBILE FIXED BOTTOM NAVIGATION BAR (< 768px) — Uniform 5-Col Grid across all phone widths */}
        <nav
          aria-label="Mobile Bottom Navigation"
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-forest-header/95 backdrop-blur-md text-white border-t border-forest-title/90 shadow-[0_-6px_24px_rgba(0,0,0,0.28)] mobile-bottom-nav"
        >
          <div className="max-w-lg mx-auto grid grid-cols-5 gap-1 px-2 pt-1.5 pb-1">
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={localizeHref(item.href)}
                  className={`flex flex-col items-center justify-center text-center min-h-[48px] px-1 py-1.5 rounded-xl transition-all ${
                    active
                      ? "bg-forest-primary text-white shadow-sm"
                      : "text-forest-pill/85 hover:text-white hover:bg-forest-title/60"
                  }`}
                >
                  <span
                    className={`h-1 w-5 rounded-full mb-1 transition-all ${
                      active ? "bg-white" : "bg-forest-sage/30"
                    }`}
                  />
                  <span className="text-[11px] leading-tight font-extrabold tracking-tight truncate w-full">
                    {item.mobileLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </LottaContext.Provider>
  );
}
