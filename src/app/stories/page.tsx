"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatPillar, formatRegency, STORY_TRAILERS, UI_TEXT } from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";

export default function StoriesPage() {
  const {
    lang,
    localizeHref,
    setActiveTrailer,
  } = useLotta();

  const [selectedPillar, setSelectedPillar] = useState<
    "all" | "mountain" | "beach" | "heritage"
  >("all");
  const [selectedRegency, setSelectedRegency] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPillar, selectedRegency, searchQuery]);

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
    setCurrentPage(1);
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

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE) || 1;

  const startStory =
    filteredStories.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endStory = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredStories.length
  );

  const paginatedStories = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStories.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredStories, currentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const el = document.getElementById("stories-catalog-grid");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 220, behavior: "smooth" });
      }
    }
  };

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
              className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap"
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
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shrink-0 ${
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-forest-border/70">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0 sm:flex-wrap">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title mr-1 shrink-0">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition shrink-0 ${
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
                {filteredStories.length === 0
                  ? (lang === "id"
                    ? "0 cerita"
                    : lang === "en"
                    ? "0 stories"
                    : "0 storie")
                  : lang === "id"
                  ? `${t.showingCount} ${startStory}–${endStory} dari ${filteredStories.length} cerita`
                  : lang === "en"
                  ? `${t.showingCount} ${startStory}–${endStory} of ${filteredStories.length} stories`
                  : `${t.showingCount} ${startStory}–${endStory} di ${filteredStories.length} storie`}
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
          <>
            <div id="stories-catalog-grid" className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {paginatedStories.map((story) => (
                <article
                  key={story.id}
                  onClick={() => setActiveTrailer(story)}
                  className="group bg-white border border-forest-border hover:border-forest-primary rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition cursor-pointer"
                >
                  <div>
                    {/* Clean Visual Cover Photo */}
                    <div className="relative aspect-[4/3] sm:h-44 w-full overflow-hidden bg-forest-header">
                      <img
                        src={story.image}
                        alt={story.destinationName}
                        className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-header/60 via-transparent to-black/20" />

                      {/* Top Left: Clean Short Pillar Tag */}
                      <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5">
                        <span className="px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-forest-primary text-white shadow-xs">
                          {story.pillar === "mountain"
                            ? (lang === "id" ? "GUNUNG" : lang === "en" ? "MOUNTAIN" : "MONTAGNA")
                            : story.pillar === "beach"
                            ? (lang === "id" ? "PANTAI" : lang === "en" ? "BEACH" : "SPIAGGIA")
                            : (lang === "id" ? "BUDAYA" : lang === "en" ? "CULTURE" : "CULTURA")}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-4">
                      {/* Regency & Elevation */}
                      <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1 truncate">
                        <span>{formatRegency(story.regency, lang)}</span>
                        <span className="text-forest-body/70 font-semibold ml-1.5">• {story.elevationOrDepth}</span>
                      </div>

                      {/* Story Title */}
                      <h2 className="text-xs sm:text-sm font-extrabold text-forest-header group-hover:text-forest-primary transition leading-snug line-clamp-2 mb-1">
                        {story.title[lang]}
                      </h2>

                      {/* Destination Name */}
                      <p className="text-[11px] sm:text-xs text-forest-body font-medium truncate">
                        {story.destinationName}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-3 sm:p-4 pt-0">
                    <div className="pt-2.5 border-t border-forest-border/60 flex items-center justify-between gap-1">
                      <span className="text-[10px] sm:text-xs font-semibold text-forest-body">
                        {lang === "id"
                          ? "Kisah Lokal"
                          : lang === "en"
                          ? "Local Story"
                          : "Storia Locale"}
                      </span>
                      <span className="text-[11px] sm:text-xs font-extrabold text-forest-primary group-hover:translate-x-0.5 transition-transform shrink-0">
                        {lang === "id" ? "Baca Kisah →" : lang === "en" ? "Read Story →" : "Leggi →"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav
                aria-label="Navigasi Halaman Cerita"
                className="mt-8 pt-6 border-t border-forest-border flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs text-forest-body font-semibold">
                  {lang === "id"
                    ? `Halaman ${currentPage} dari ${totalPages} (${filteredStories.length} cerita)`
                    : lang === "en"
                    ? `Page ${currentPage} of ${totalPages} (${filteredStories.length} stories)`
                    : `Pagina ${currentPage} di ${totalPages} (${filteredStories.length} storie)`}
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-forest-border text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-forest-card"
                  >
                    {lang === "id" ? "← Sebelumnya" : lang === "en" ? "← Prev" : "← Prec"}
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded-lg text-xs font-extrabold transition ${
                        currentPage === page
                          ? "bg-forest-header text-white shadow-xs"
                          : "border border-forest-border text-forest-header hover:bg-forest-card"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-forest-border text-xs font-bold transition disabled:opacity-40 disabled:cursor-not-allowed hover:bg-forest-card"
                  >
                    {lang === "id" ? "Berikutnya →" : lang === "en" ? "Next →" : "Succ →"}
                  </button>
                </div>
              </nav>
            )}
          </>
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
