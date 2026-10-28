"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  formatDuration,
  formatPrice,
  formatRegency,
  PACKAGES,
  UI_TEXT,
} from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";

export default function ExplorePage() {
  const {
    lang,
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
              className="flex flex-wrap gap-2"
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
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition ${
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
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-forest-border/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title mr-1">
                {lang === "id"
                  ? "Filter Kabupaten:"
                  : lang === "en"
                  ? "Filter by Regency:"
                  : "Filtra per Reggenza:"}
              </span>
              {regencies.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegency(reg)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${
                    selectedRegency === reg
                      ? "bg-forest-primary text-white"
                      : "bg-white border border-forest-border text-forest-header hover:bg-forest-card"
                  }`}
                >
                  {reg === "all"
                    ? lang === "id"
                      ? "Semua Kabupaten"
                      : lang === "en"
                      ? "All Regencies"
                      : "Tutte le Reggenze"
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
                  <div className="relative h-48 overflow-hidden bg-forest-header">
                    <img
                      src={pkg.image}
                      alt={pkg.destinationNames}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-header/90 via-forest-header/20 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-forest-primary text-white shadow-sm">
                        {formatDuration(pkg.duration, lang)}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-forest-header/90 text-forest-sage border border-forest-sage/40 shadow-sm">
                        {formatPrice(pkg.priceIdr, lang)}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-xs font-extrabold text-white leading-snug">
                      {pkg.destinationNames}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                      {formatRegency(pkg.regency, lang)}
                    </div>
                    <h2 className="text-lg font-extrabold text-forest-header mb-2 leading-snug">
                      {pkg.title[lang]}
                    </h2>
                    <p className="text-sm text-forest-body leading-relaxed mb-4">
                      {pkg.desc[lang]}
                    </p>

                    {/* Explicit Highlights List */}
                    <ul className="space-y-1.5 pt-3 border-t border-forest-border/60 text-xs text-forest-title">
                      {pkg.highlights[lang].map((hl) => (
                        <li key={hl} className="flex items-start gap-2">
                          <span className="font-bold text-forest-primary">
                            •
                          </span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-3 border-t border-forest-border/60 flex flex-col sm:grid sm:grid-cols-2 gap-2">
                  <Link
                    href={`/explore/${pkg.id}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-forest-pill hover:bg-forest-card text-forest-header text-xs font-extrabold transition text-center"
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
                    className="w-full py-2.5 px-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold transition text-center"
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
