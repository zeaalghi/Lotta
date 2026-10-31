"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  formatDuration,
  formatPillar,
  formatPrice,
  formatRegency,
  formatShortDuration,
  PACKAGES,
  UI_TEXT,
} from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";

export default function ExplorePage() {
  const {
    lang,
    localizeHref,
    setActivePackageModal,
    chooseRouteAndGoToGuides,
  } = useLotta();

  const [activePillar, setActivePillar] = useState<
    "all" | "mountain" | "beach" | "heritage"
  >("all");
  const [selectedRegency, setSelectedRegency] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get("pillar");
      if (p === "mountain" || p === "beach" || p === "heritage") {
        setActivePillar(p);
      }
    } catch {
      // ignore
    }
  }, []);

  const t = UI_TEXT[lang];

  const regencies = [
    "all",
    "Lombok Timur",
    "Lombok Tengah",
    "Lombok Utara",
    "Lombok Barat",
  ];

  const hasActiveFilter =
    activePillar !== "all" ||
    selectedRegency !== "all" ||
    searchTerm.trim() !== "";

  const resetAllFilters = () => {
    setActivePillar("all");
    setSelectedRegency("all");
    setSearchTerm("");
  };

  const filteredPackages = useMemo(() => {
    return PACKAGES.filter((pkg) => {
      if (activePillar !== "all" && pkg.pillar !== activePillar) {
        return false;
      }
      if (
        selectedRegency !== "all" &&
        !pkg.regency.toLowerCase().includes(selectedRegency.toLowerCase())
      ) {
        return false;
      }
      if (searchTerm.trim() !== "") {
        const q = searchTerm.toLowerCase();
        const inNames = pkg.destinationNames.toLowerCase().includes(q);
        const inTitle = pkg.title[lang].toLowerCase().includes(q);
        const inDesc = pkg.desc[lang].toLowerCase().includes(q);
        const inRegency = pkg.regency.toLowerCase().includes(q);
        return inNames || inTitle || inDesc || inRegency;
      }
      return true;
    });
  }, [activePillar, selectedRegency, searchTerm, lang]);

  return (
    <div className="py-8 sm:py-12 bg-forest-canvas min-h-screen">
      <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-forest-header text-white rounded-3xl p-6 sm:p-10 mb-8 border border-forest-title shadow-md">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-2">
            DIREKTORI LENGKAP 24 DESTINASI WISATA LOMBOK
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t.pillarsHeader}
          </h1>
          <p className="text-sm sm:text-base text-forest-pill max-w-3xl leading-relaxed">
            {t.pillarsSub}
          </p>
        </div>

        {/* Filter Bar (Flex-Wrap, Never Clipped) */}
        <div className="bg-forest-alt border border-forest-border rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap"
              role="tablist"
              aria-label="Destination Pillar Filter"
            >
              {[
                {
                  id: "all" as const,
                  label:
                    lang === "id"
                      ? `Semua Destinasi (${PACKAGES.length})`
                      : lang === "en"
                      ? `All Destinations (${PACKAGES.length})`
                      : `Tutte (${PACKAGES.length})`,
                },
                {
                  id: "mountain" as const,
                  label: `${t.pillarMountain} (8)`,
                },
                {
                  id: "beach" as const,
                  label: `${t.pillarBeach} (8)`,
                },
                {
                  id: "heritage" as const,
                  label: `${t.pillarHeritage} (8)`,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activePillar === tab.id}
                  onClick={() => setActivePillar(tab.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition shrink-0 ${
                    activePillar === tab.id
                      ? "bg-forest-header text-white shadow-sm"
                      : "bg-white text-forest-header border border-forest-border hover:bg-forest-card/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="w-full lg:w-72">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  lang === "id"
                    ? "Cari gunung, bukit, pantai, desa..."
                    : lang === "en"
                    ? "Search mountain, hill, beach, village..."
                    : "Cerca montagna, spiaggia, villaggio..."
                }
                aria-label="Search Destinations"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest-input text-sm text-forest-header placeholder:text-forest-body/60 focus:outline-none focus:ring-2 focus:ring-forest-primary"
              />
            </div>
          </div>

          {/* Regency Filter Chips + Result Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-forest-border/70">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title mr-1 shrink-0">
                {lang === "id"
                  ? "Filter:"
                  : lang === "en"
                  ? "Filter:"
                  : "Filtro:"}
              </span>
              {regencies.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegency(reg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition shrink-0 ${
                    selectedRegency === reg
                      ? "bg-forest-primary text-white"
                      : "bg-white border border-forest-border text-forest-header hover:bg-forest-card"
                  }`}
                >
                  {reg === "all"
                    ? lang === "id"
                      ? "Semua Wilayah"
                      : lang === "en"
                      ? "All Regions"
                      : "Tutte le Regioni"
                    : reg}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-forest-body">
              <span>
                {t.showingCount} {filteredPackages.length} / {PACKAGES.length}
              </span>
              {hasActiveFilter && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-3 py-1 rounded-lg bg-forest-header text-white font-extrabold hover:bg-forest-title transition"
                >
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Empty State or Destinations Grid */}
        {filteredPackages.length === 0 ? (
          <div className="bg-white border-2 border-forest-border rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-sm">
            <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
              {lang === "id"
                ? "FILTER TIDAK DITEMUKAN"
                : lang === "en"
                ? "NO DESTINATIONS MATCH THIS FILTER"
                : "NESSUNA DESTINAZIONE TROVATA"}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-forest-header mb-2">
              {lang === "id"
                ? "Tidak ada destinasi pada kombinasi kategori & kabupaten ini"
                : lang === "en"
                ? "No destinations match this pillar & regency filter"
                : "Nessuna destinazione corrisponde ai filtri selezionati"}
            </h2>
            <p className="text-xs sm:text-sm text-forest-body leading-relaxed mb-6">
              {lang === "id"
                ? "Informasi Geografis: Seluruh 8 program pendakian menginap Gunung Rinjani & Bukit Sembalun berlokasi di Kabupaten Lombok Timur dan Kabupaten Lombok Utara."
                : lang === "en"
                ? "Geographical Note: All 8 overnight Mount Rinjani & Sembalun Hill expeditions are located in East Lombok and North Lombok Regencies."
                : "Nota Geografica: Tutte le 8 spedizioni in montagna sul Rinjani e Sembalun si trovano a Lombok Est e Lombok Nord."}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
            >
              {lang === "id"
                ? "Tampilkan Semua 24 Destinasi"
                : lang === "en"
                ? "Show All 24 Destinations"
                : "Mostra Tutte le 24 Destinazioni"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <article
                key={pkg.id}
                className="bg-white border border-forest-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  {/* Clean Visual Image without Cramped Text */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-forest-header">
                    <img
                      src={pkg.image}
                      alt={pkg.destinationNames}
                      className="w-full h-full object-cover transition duration-300 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-header/60 via-transparent to-black/20" />

                    {/* Top Left: Clean Best Seller Badge (if applicable) */}
                    {pkg.isBestSeller && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-stone-900 shadow-sm border border-amber-300/60">
                          BEST SELLER
                        </span>
                      </div>
                    )}

                    {/* Top Right: Short Duration Badge - Never collides with left badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-black/60 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                        {formatShortDuration(pkg.duration, lang)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content with Generous Breathing Room */}
                  <div className="p-4 sm:p-6">
                    {/* Regency & Category Meta */}
                    <div className="flex items-center justify-between text-xs font-bold text-forest-primary mb-1.5 sm:mb-2 gap-2">
                      <span className="flex items-center gap-1.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-forest-primary shrink-0" />
                        <span className="truncate font-extrabold tracking-wider uppercase text-[11px]">
                          {formatRegency(pkg.regency, lang)}
                        </span>
                      </span>
                      <span className="text-[10px] font-bold text-forest-body bg-forest-canvas px-2.5 py-0.5 rounded-md border border-forest-border/60 shrink-0">
                        {formatPillar(pkg.pillar, lang)}
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-extrabold text-forest-header mb-1.5 sm:mb-2 leading-snug line-clamp-2">
                      {pkg.title[lang]}
                    </h2>

                    {/* Rute & Destinasi - 1 line on mobile, 2 lines on desktop */}
                    <div className="text-[11px] sm:text-xs text-forest-title font-medium leading-relaxed mb-2.5 sm:mb-3 bg-forest-canvas/70 p-2 sm:p-2.5 rounded-xl border border-forest-border/50 line-clamp-1 sm:line-clamp-2">
                      <span className="font-extrabold text-forest-header">
                        {lang === "id"
                          ? "Destinasi: "
                          : lang === "en"
                          ? "Destinations: "
                          : "Destinazioni: "}
                      </span>
                      {pkg.destinationNames}
                    </div>

                    <p className="text-xs text-forest-body leading-relaxed mb-3 sm:mb-4 line-clamp-2">
                      {pkg.desc[lang]}
                    </p>

                    {/* Explicit Highlights List - Cleanly tucked into desktop view, omitted on mobile to prevent scroll fatigue */}
                    <ul className="hidden sm:block space-y-1.5 pt-3 border-t border-forest-border/60 text-xs text-forest-title mb-4">
                      {pkg.highlights[lang].map((hl) => (
                        <li key={hl} className="flex items-start gap-2">
                          <span className="font-bold text-forest-primary">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Spacious All-In Price Section */}
                    <div className="pt-2.5 sm:pt-3 border-t border-forest-border/60 flex items-baseline justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-forest-body block">
                          {lang === "id"
                            ? "Harga per Pax (All-in)"
                            : lang === "en"
                            ? "Price per Pax (All-in)"
                            : "Prezzo per Persona"}
                        </span>
                        <span className="text-lg sm:text-xl font-extrabold text-forest-header tracking-tight">
                          {formatPrice(pkg.priceIdr, lang)}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-forest-primary bg-forest-primary/10 px-2 py-0.5 sm:py-1 rounded-md border border-forest-primary/20 shrink-0">
                        {lang === "id"
                          ? "All-In & Berlisensi"
                          : lang === "en"
                          ? "All-In & Licensed"
                          : "Tutto Incluso"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2 border-t border-forest-border/60 grid grid-cols-2 gap-2">
                  <Link
                    href={localizeHref(`/explore/${pkg.id}`)}
                    className="w-full py-2 sm:py-2.5 px-2 rounded-xl bg-forest-pill hover:bg-forest-card text-forest-header text-[11px] sm:text-xs font-extrabold transition text-center truncate"
                  >
                    {lang === "id"
                      ? "Detail Trip →"
                      : lang === "en"
                      ? "Trip Details →"
                      : "Dettagli →"}
                  </Link>
                  <button
                    type="button"
                    onClick={() => chooseRouteAndGoToGuides(pkg.id)}
                    className="w-full py-2 sm:py-2.5 px-2 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-[11px] sm:text-xs font-extrabold transition text-center shadow-sm truncate"
                  >
                    {lang === "id"
                      ? "Pilih Guide →"
                      : lang === "en"
                      ? "Pick Guide →"
                      : "Scegli Guida →"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
