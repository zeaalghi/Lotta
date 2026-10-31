"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
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
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredPackages.map((pkg) => (
              <Link
                key={pkg.id}
                href={localizeHref(`/explore/${pkg.id}`)}
                className="group bg-white border border-forest-border hover:border-forest-primary rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition"
              >
                <div>
                  {/* Clean Visual Cover Photo */}
                  <div className="relative aspect-[4/3] sm:h-44 w-full overflow-hidden bg-forest-header">
                    <img
                      src={pkg.image}
                      alt={pkg.destinationNames}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-header/60 via-transparent to-black/20" />

                    {/* Top Left: Clean Best Seller Badge (if applicable) */}
                    {pkg.isBestSeller && (
                      <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
                        <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-stone-900 shadow-sm border border-amber-300/60">
                          BEST SELLER
                        </span>
                      </div>
                    )}

                    {/* Top Right: Short Duration Badge */}
                    <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5">
                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded text-[10px] sm:text-[11px] font-extrabold bg-black/60 text-white backdrop-blur-xs border border-white/20 shadow-sm">
                        {formatShortDuration(pkg.duration, lang)}
                      </span>
                    </div>
                  </div>

                  {/* E-Commerce Product Card Body */}
                  <div className="p-2.5 sm:p-4">
                    {/* Regency & Category Meta */}
                    <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-forest-primary mb-1 sm:mb-1.5 gap-1">
                      <span className="truncate uppercase font-extrabold tracking-wider">
                        {formatRegency(pkg.regency, lang)}
                      </span>
                      <span className="shrink-0 text-[9px] sm:text-[10px] text-forest-body font-semibold">
                        {formatPillar(pkg.pillar, lang)}
                      </span>
                    </div>

                    {/* Product Title (2 lines clamp) */}
                    <h2 className="text-xs sm:text-sm font-extrabold text-forest-header group-hover:text-forest-primary transition leading-snug line-clamp-2">
                      {pkg.title[lang]}
                    </h2>
                  </div>
                </div>

                {/* E-Commerce Price & CTA Footer */}
                <div className="p-2.5 sm:p-4 pt-0">
                  <div className="pt-2 border-t border-forest-border/60 flex items-end justify-between gap-1">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-semibold uppercase text-forest-body block leading-tight">
                        {lang === "id"
                          ? "All-In / pax"
                          : lang === "en"
                          ? "All-In / pax"
                          : "Tutto Incluso"}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-forest-header tracking-tight block">
                        {formatPrice(pkg.priceIdr, lang)}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-forest-primary group-hover:translate-x-0.5 transition-transform shrink-0">
                      {lang === "id" ? "Detail →" : lang === "en" ? "Details →" : "Dettagli →"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
