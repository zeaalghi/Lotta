"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { formatRegency, STORY_TRAILERS, UI_TEXT } from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";

export default function StoriesPage() {
  const {
    lang,
    localizeHref,
    setActiveTrailer,
    chooseRouteAndGoToGuides,
  } = useLotta();

  const [selectedPillar, setSelectedPillar] = useState<
    "all" | "mountain" | "beach" | "heritage"
  >("all");
  const [selectedRegency, setSelectedRegency] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const t = UI_TEXT[lang];

  const regencyOptions = [
    "all",
    "Lombok Timur",
    "Lombok Tengah",
    "Lombok Utara",
    "Lombok Barat",
  ];

  const hasActiveFilter =
    selectedPillar !== "all" ||
    selectedRegency !== "all" ||
    searchQuery.trim() !== "";

  const resetAllFilters = () => {
    setSelectedPillar("all");
    setSelectedRegency("all");
    setSearchQuery("");
  };

  const filteredStories = useMemo(() => {
    return STORY_TRAILERS.filter((story) => {
      if (selectedPillar !== "all" && story.pillar !== selectedPillar) {
        return false;
      }
      if (
        selectedRegency !== "all" &&
        !story.regency.toLowerCase().includes(selectedRegency.toLowerCase())
      ) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const inTitle = story.title[lang].toLowerCase().includes(q);
        const inDest = story.destinationName.toLowerCase().includes(q);
        const inSummary = story.summary38[lang].toLowerCase().includes(q);
        const inRegency = story.regency.toLowerCase().includes(q);
        return inTitle || inDest || inSummary || inRegency;
      }
      return true;
    });
  }, [selectedPillar, selectedRegency, searchQuery, lang]);

  return (
    <div className="py-8 sm:py-12 bg-forest-canvas min-h-screen">
      <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-forest-header text-white rounded-3xl p-6 sm:p-10 mb-8 border border-forest-title shadow-md">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-2">
            {lang === "id"
              ? "12 KISAH LOKAL, LEGENDA & SEJARAH LISAN LOMBOK"
              : lang === "en"
              ? "12 LOCAL STORIES, LEGENDS & ORAL HISTORIES OF LOMBOK"
              : "12 STORIE LOCALI, LEGGENDE E TRADIZIONI ORALI DI LOMBOK"}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t.storiesHeader}
          </h1>
          <p className="text-sm sm:text-base text-forest-pill max-w-3xl leading-relaxed">
            {t.storiesSub}
          </p>
        </div>

        {/* Filter Controls (Non-Clipped Flex Wrap) */}
        <div className="bg-forest-alt border border-forest-border rounded-2xl p-5 sm:p-6 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Pillar Filter Buttons */}
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter Cerita Berdasarkan Pilar"
            >
              {[
                {
                  id: "all" as const,
                  label:
                    lang === "id"
                      ? `Semua Cerita (${STORY_TRAILERS.length})`
                      : lang === "en"
                      ? `All Stories (${STORY_TRAILERS.length})`
                      : `Tutte (${STORY_TRAILERS.length})`,
                },
                {
                  id: "mountain" as const,
                  label: t.pillarMountain,
                },
                {
                  id: "beach" as const,
                  label: t.pillarBeach,
                },
                {
                  id: "heritage" as const,
                  label: t.pillarHeritage,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedPillar(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition ${
                    selectedPillar === tab.id
                      ? "bg-forest-header text-white shadow-sm"
                      : "bg-white text-forest-header border border-forest-border hover:bg-forest-card/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-72">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === "id"
                    ? "Cari nama destinasi atau cerita..."
                    : lang === "en"
                    ? "Search destination or story..."
                    : "Cerca destinazione o storia..."
                }
                aria-label="Search Stories"
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-forest-input text-sm text-forest-header placeholder:text-forest-body/60 focus:outline-none focus:ring-2 focus:ring-forest-primary"
              />
            </div>
          </div>

          {/* Regency Filter Chips + Result Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-forest-border/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title mr-1">
                {lang === "id"
                  ? "Kabupaten:"
                  : lang === "en"
                  ? "Regency:"
                  : "Reggenza:"}
              </span>
              {regencyOptions.map((reg) => (
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
                {t.showingCount} {filteredStories.length} /{" "}
                {STORY_TRAILERS.length}
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

        {/* Empty State or Story Catalog Grid */}
        {filteredStories.length === 0 ? (
          <div className="bg-white border-2 border-forest-border rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto my-6 shadow-sm">
            <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
              {lang === "id"
                ? "FILTER TIDAK DITEMUKAN"
                : lang === "en"
                ? "NO MATCHING STORIES FOR THIS FILTER"
                : "NESSUNA STORIA TROVATA"}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-forest-header mb-2">
              {lang === "id"
                ? "Belum ada cerita pada kombinasi kategori & kabupaten ini"
                : lang === "en"
                ? "No stories match this category & regency combination"
                : "Nessuna storia corrisponde a questa combinazione di filtri"}
            </h2>
            <p className="text-xs sm:text-sm text-forest-body leading-relaxed mb-6">
              {lang === "id"
                ? "Catatan: Seluruh cerita pendakian Gunung Rinjani & Bukit Sembalun berada di wilayah Kabupaten Lombok Timur dan Kabupaten Lombok Utara."
                : lang === "en"
                ? "Note: All Mount Rinjani & Sembalun Hill stories are located in East Lombok and North Lombok Regencies."
                : "Nota: Tutte le storie sul Monte Rinjani e Sembalun si trovano a Lombok Est e Lombok Nord."}
            </p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="px-6 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
            >
              {lang === "id"
                ? "Tampilkan Semua 12 Cerita"
                : lang === "en"
                ? "Show All 12 Stories"
                : "Mostra Tutte le 12 Storie"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                className="group bg-white border border-forest-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <Link
                    href={localizeHref(`/explore/${story.packageId || "pkg-explore-rinjani"}`)}
                    className="block relative h-52 overflow-hidden bg-forest-header"
                  >
                    <img
                      src={story.image}
                      alt={story.destinationName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-header/90 via-forest-header/20 to-transparent" />
                    <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 max-w-[60%]">
                      <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-forest-header/90 text-forest-sage border border-forest-sage/40 backdrop-blur-sm shadow-sm truncate">
                        {t.tourPackageAvailableBadge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block px-3 py-1 rounded-lg text-xs font-extrabold bg-forest-primary text-white shadow-sm">
                        {story.destinationName}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5 sm:p-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1.5">
                      {formatRegency(story.regency, lang)} • {story.elevationOrDepth}
                    </div>
                    <h2 className="text-lg font-extrabold text-forest-header mb-2 leading-snug">
                      <Link
                        href={localizeHref(`/explore/${story.packageId || "pkg-explore-rinjani"}`)}
                        className="hover:text-forest-primary transition"
                      >
                        {story.title[lang]}
                      </Link>
                    </h2>
                    <p className="text-sm text-forest-body leading-relaxed line-clamp-3">
                      {story.summary38[lang]}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-3 border-t border-forest-border/60 flex flex-col sm:grid sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTrailer(story)}
                    className="w-full py-2.5 px-3 rounded-xl bg-forest-pill hover:bg-forest-card text-forest-header text-xs font-extrabold transition text-center"
                  >
                    {t.readTrailerLink}
                  </button>
                  <Link
                    href={localizeHref(`/explore/${story.packageId || "pkg-explore-rinjani"}`)}
                    className="w-full py-2.5 px-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold transition text-center shadow-sm"
                  >
                    {t.viewTripDetailBtn}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom CTA to /explore and /guides */}
        <div className="mt-12 p-7 sm:p-8 rounded-3xl bg-forest-card/80 border border-forest-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-forest-header">
              {lang === "id"
                ? "Ingin Melihat Daftar Lengkap 24 Destinasi Gunung, Pantai & Heritage?"
                : lang === "en"
                ? "Want to Browse All 24 Mountain, Beach & Heritage Destinations?"
                : "Vuoi Esplorare Tutte le 24 Destinazioni?"}
            </h3>
            <p className="text-sm text-forest-body mt-1">
              {lang === "id"
                ? "Lihat detail rute, durasi, dan seluruh nama bukit, pantai, serta desa adat di halaman Semua Destinasi."
                : lang === "en"
                ? "See route details, durations, and all hills, beaches, and cultural villages on the All Destinations page."
                : "Scopri tutti i dettagli nella pagina Tutte le Destinazioni."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href={localizeHref("/explore")}
              className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-forest-header hover:bg-forest-title text-white text-xs font-extrabold uppercase tracking-wider transition"
            >
              {t.viewAllDestinationsBtn}
            </Link>
            <Link
              href={localizeHref("/guides")}
              className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition"
            >
              {t.btnFindGuide}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
