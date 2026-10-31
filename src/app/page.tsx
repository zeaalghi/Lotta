"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  formatDuration,
  formatPillar,
  formatPrice,
  formatRegency,
  formatShortDuration,
  PACKAGES,
  STORY_TRAILERS,
  UI_TEXT,
} from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";
import { localizeWeatherMetric } from "@/lib/weather-telemetry";

export default function HomePage() {
  const {
    lang,
    localizeHref,
    weatherData,
    setActiveTrailer,
    setActivePackageModal,
    chooseRouteAndGoToGuides,
  } = useLotta();

  const t = UI_TEXT[lang];
  const [activeHeroWeatherTab, setActiveHeroWeatherTab] = useState<"summit" | "south" | "gili">("summit");
  const featuredStories = STORY_TRAILERS.slice(0, 6);
  const featuredDestinations = [
    PACKAGES.find((p) => p.id === "pkg-secret-gili-sekotong") || PACKAGES[14], // Secret Gili Snorkeling (Nanggu, Sudak, Kedis)
    PACKAGES.find((p) => p.id === "pkg-pink-beach-tangsi") || PACKAGES[10], // Pink Beach & Pulau Pasir
    PACKAGES.find((p) => p.id === "pkg-tanjung-aan-merese") || PACKAGES[8], // Tanjung Aan, Selong Belanak & Merese
    PACKAGES.find((p) => p.id === "pkg-bukit-pergasingan") || PACKAGES[4], // Bukit Pergasingan 2D1N Sembalun
    PACKAGES.find((p) => p.id === "pkg-desa-adat-senaru") || PACKAGES[19], // Air Terjun Sendang Gile & Tiu Kelep
    PACKAGES.find((p) => p.id === "pkg-desa-sade-ende") || PACKAGES[16], // Desa Adat Sade, Ende & Tenun Sukarara
  ];

  const summitZone = weatherData.zones.summit;
  const southZone = weatherData.zones.south;
  const giliZone = weatherData.zones.gili;

  return (
    <div>
      {/* 1. HERO GOLDEN RATIO SECTION (1.618fr : 1fr) */}
      <section className="relative overflow-hidden border-b border-forest-border bg-gradient-to-b from-forest-alt to-forest-canvas py-6 sm:py-12 lg:py-16">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="phi-grid items-stretch">
            {/* Primary Column (61.8%) */}
            <div className="flex flex-col justify-between bg-forest-header text-white rounded-3xl p-5 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden border border-forest-title">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-title border border-forest-primary/40 text-forest-sage text-[10px] sm:text-xs font-extrabold tracking-widest uppercase mb-3 sm:mb-5">
                  <span>{t.heroTag}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-tight text-white mb-3 sm:mb-4">
                  {t.heroTitle}
                </h1>
                <p className="text-forest-pill text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl line-clamp-3 sm:line-clamp-none mb-5 sm:mb-7">
                  {t.heroSubtitle}
                </p>
              </div>

              <div>
                {/* Mobile-First Button Cluster */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 mb-5 sm:mb-7">
                  <Link
                    href={localizeHref("/explore")}
                    className="col-span-2 sm:col-span-1 text-center px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-sm transition shadow-md"
                  >
                    {t.btnExplore} →
                  </Link>
                  <Link
                    href={localizeHref("/guides")}
                    className="text-center px-3 py-2.5 sm:px-6 sm:py-3.5 rounded-xl bg-forest-title/90 hover:bg-forest-primary/40 text-forest-sage border border-forest-sage/30 font-bold text-xs sm:text-sm transition truncate"
                  >
                    {t.btnFindGuide}
                  </Link>
                  <Link
                    href={localizeHref("/stories")}
                    className="text-center px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-xl bg-forest-header/90 hover:bg-forest-title text-forest-sage border border-forest-sage/30 font-bold text-xs sm:text-sm transition truncate"
                  >
                    {t.viewAllStoriesBtn}
                  </Link>
                </div>

                {/* Metric Summary Strip (3-col inline on all screens) */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3.5 pt-4 sm:pt-5 border-t border-forest-title/80 text-center sm:text-left">
                  <div className="min-w-0">
                    <div className="text-lg sm:text-2xl font-extrabold text-forest-sage">
                      {lang === "id"
                        ? "24 Destinasi"
                        : lang === "en"
                        ? "24 Destinations"
                        : "24 Destinazioni"}
                    </div>
                    <div className="text-[10px] sm:text-xs text-forest-pill/80 mt-0.5 truncate">
                      {lang === "id"
                        ? "Gunung, Pantai & Budaya"
                        : lang === "en"
                        ? "Mountains, Beach, Heritage"
                        : "Montagne, Spiagge, Cultura"}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-2xl font-extrabold text-forest-sage">
                      {lang === "id"
                        ? "12 Cerita"
                        : lang === "en"
                        ? "12 Stories"
                        : "12 Storie"}
                    </div>
                    <div className="text-[10px] sm:text-xs text-forest-pill/80 mt-0.5 truncate">
                      {lang === "id"
                        ? "Legenda & Sejarah"
                        : lang === "en"
                        ? "Legends & History"
                        : "Leggende e Storia"}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-2xl font-extrabold text-forest-sage">
                      {lang === "id"
                        ? "100% Berlisensi"
                        : lang === "en"
                        ? "100% Certified"
                        : "100% Certificate"}
                    </div>
                    <div className="text-[10px] sm:text-xs text-forest-pill/80 mt-0.5 truncate">
                      {lang === "id"
                        ? "HPI NTB • 14 Bahasa"
                        : lang === "en"
                        ? "HPI NTB • 14 Languages"
                        : "HPI NTB • 14 Lingue"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Column (38.2%) — Live Telemetry & Quick Destination Directory */}
            <div className="flex flex-col justify-between gap-4 sm:gap-5">
              <div className="bg-forest-card/80 border border-forest-border rounded-3xl p-5 sm:p-6 flex-1 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title">
                      {t.liveStatusLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-forest-primary text-white">
                      LIVE
                    </span>
                  </div>

                  {/* Mobile Zone Tab Switch (sm:hidden) */}
                  <div className="flex sm:hidden items-center gap-1.5 p-1 rounded-xl bg-forest-canvas border border-forest-border mb-3">
                    <button
                      type="button"
                      onClick={() => setActiveHeroWeatherTab("summit")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition truncate ${
                        activeHeroWeatherTab === "summit"
                          ? "bg-forest-primary text-white shadow-xs"
                          : "text-forest-body hover:text-forest-header"
                      }`}
                    >
                      Rinjani
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHeroWeatherTab("south")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition truncate ${
                        activeHeroWeatherTab === "south"
                          ? "bg-forest-primary text-white shadow-xs"
                          : "text-forest-body hover:text-forest-header"
                      }`}
                    >
                      Pantai
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveHeroWeatherTab("gili")}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-extrabold transition truncate ${
                        activeHeroWeatherTab === "gili"
                          ? "bg-forest-primary text-white shadow-xs"
                          : "text-forest-body hover:text-forest-header"
                      }`}
                    >
                      Gili
                    </button>
                  </div>

                  {/* Mobile Active Single Zone Display */}
                  <div className="sm:hidden">
                    {activeHeroWeatherTab === "summit" && (
                      <div className="p-3.5 rounded-2xl bg-forest-canvas border border-forest-border">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-forest-title">
                            {t.zoneSummit}
                          </span>
                          <span className="text-sm font-extrabold text-forest-header shrink-0">
                            {localizeWeatherMetric(summitZone.temp, lang)}
                          </span>
                        </div>
                        <div className="text-xs text-forest-body mt-1 flex items-center justify-between gap-2">
                          <span className="truncate">{summitZone.status[lang]}</span>
                          <span className="font-bold shrink-0">
                            {lang === "id" ? "Angin" : lang === "en" ? "Wind" : "Vento"} {localizeWeatherMetric(summitZone.wind, lang)}
                          </span>
                        </div>
                      </div>
                    )}
                    {activeHeroWeatherTab === "south" && (
                      <div className="p-3.5 rounded-2xl bg-forest-canvas border border-forest-border">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-forest-title">
                            {t.zoneSouth}
                          </span>
                          <span className="text-sm font-extrabold text-forest-header shrink-0">
                            {localizeWeatherMetric(southZone.temp, lang)}
                          </span>
                        </div>
                        <div className="text-xs text-forest-body mt-1 flex items-center justify-between gap-2">
                          <span className="truncate">{southZone.status[lang]}</span>
                          <span className="font-bold shrink-0">
                            {localizeWeatherMetric(southZone.wind, lang)}
                          </span>
                        </div>
                      </div>
                    )}
                    {activeHeroWeatherTab === "gili" && (
                      <div className="p-3.5 rounded-2xl bg-forest-canvas border border-forest-border">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-forest-title">
                            {t.zoneGili}
                          </span>
                          <span className="text-sm font-extrabold text-forest-header shrink-0">
                            {localizeWeatherMetric(giliZone.temp, lang)}
                          </span>
                        </div>
                        <div className="text-xs text-forest-body mt-1 flex items-center justify-between gap-2">
                          <span className="truncate">{giliZone.status[lang]}</span>
                          <span className="font-bold shrink-0">
                            {localizeWeatherMetric(giliZone.visibility, lang)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Desktop Full Stack of 3 Zones (hidden sm:block) */}
                  <div className="hidden sm:block space-y-2.5">
                    <div className="p-3.5 rounded-2xl bg-forest-canvas border border-forest-border">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-forest-title">
                          {t.zoneSummit}
                        </span>
                        <span className="text-sm font-extrabold text-forest-header shrink-0">
                          {localizeWeatherMetric(summitZone.temp, lang)}
                        </span>
                      </div>
                      <div className="text-xs text-forest-body mt-1 flex items-center justify-between gap-2">
                        <span className="truncate">{summitZone.status[lang]}</span>
                        <span className="font-bold shrink-0">
                          {lang === "id" ? "Angin" : lang === "en" ? "Wind" : "Vento"} {localizeWeatherMetric(summitZone.wind, lang)}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-forest-canvas border border-forest-border">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-forest-title">
                          {t.zoneSouth}
                        </span>
                        <span className="text-sm font-extrabold text-forest-header shrink-0">
                          {localizeWeatherMetric(southZone.temp, lang)}
                        </span>
                      </div>
                      <div className="text-xs text-forest-body mt-1 flex items-center justify-between gap-2">
                        <span className="truncate">{southZone.status[lang]}</span>
                        <span className="font-bold shrink-0">
                          {localizeWeatherMetric(southZone.wind, lang)}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-forest-canvas border border-forest-border">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-forest-title">
                          {t.zoneGili}
                        </span>
                        <span className="text-sm font-extrabold text-forest-header shrink-0">
                          {localizeWeatherMetric(giliZone.temp, lang)}
                        </span>
                      </div>
                      <div className="text-xs text-forest-body mt-1 flex items-center justify-between gap-2">
                        <span className="truncate">{giliZone.status[lang]}</span>
                        <span className="font-bold shrink-0">
                          {localizeWeatherMetric(giliZone.visibility, lang)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 pt-3 border-t border-forest-border/80 flex items-center justify-between gap-2">
                  <span className="text-xs text-forest-body font-semibold">
                    {lang === "id"
                      ? "Cek angin & ombak"
                      : lang === "en"
                      ? "Check wind & waves"
                      : "Controlla vento e onde"}
                  </span>
                  <Link
                    href={localizeHref("/weather")}
                    className="px-3 py-1.5 rounded-lg bg-forest-header text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider hover:bg-forest-title transition whitespace-nowrap"
                  >
                    {t.navWeather} →
                  </Link>
                </div>
              </div>

              {/* Destination Directory Card */}
              <div className="bg-forest-pill border border-forest-border rounded-3xl p-4 sm:p-6 shadow-sm">
                <div className="text-xs font-extrabold uppercase tracking-wider text-forest-title mb-1.5">
                  {lang === "id"
                    ? "CAKUPAN DESTINASI LENGKAP LOMBOK"
                    : lang === "en"
                    ? "COMPLETE LOMBOK DESTINATION COVERAGE"
                    : "COPERTURA COMPLETA DELLE DESTINAZIONI"}
                </div>
                <p className="text-xs text-forest-body leading-relaxed mb-3 line-clamp-3 sm:line-clamp-none">
                  <strong>
                    {lang === "id"
                      ? "Gunung & Bukit:"
                      : lang === "en"
                      ? "Mountains & Hills:"
                      : "Montagne e Colline:"}
                  </strong>{" "}
                  Puncak Rinjani 3.726m, Segara Anak, Torean, Pergasingan, Sempana, Anak Dara, Nanggi, Kondo, Bao Ritip, Dandaun.
                  <br />
                  <strong>
                    {lang === "id"
                      ? "Pantai & Gili:"
                      : lang === "en"
                      ? "Beaches & Gilis:"
                      : "Spiagge e Isole Gili:"}
                  </strong>{" "}
                  Tanjung Aan, Mawun, Selong Belanak, Merese, Pink Tangsi, Tanjung Ringgit, Gili Kondo, Gili Trawangan, Meno, Air, Nanggu.
                  <br />
                  <strong>
                    {lang === "id"
                      ? "Heritage Budaya:"
                      : lang === "en"
                      ? "Cultural Heritage:"
                      : "Patrimonio Culturale:"}
                  </strong>{" "}
                  Desa Sade, Ende, Sukarara, Sembalun Bumbung, Masbagik, Masjid Kuno Bayan Beleq, Senaru, Pura Lingsar, Taman Narmada.
                </p>
                <Link
                  href={localizeHref("/explore")}
                  className="inline-block w-full sm:w-auto text-center px-4 py-2.5 rounded-xl bg-forest-primary text-white text-xs font-extrabold uppercase tracking-wider hover:bg-forest-hover transition"
                >
                  {t.viewAllDestinationsBtn} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORIES SECTION (Links to /stories for full 12-story catalog) */}
      <section className="py-8 sm:py-16 border-b border-forest-border bg-forest-canvas">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-1">
                {lang === "id"
                  ? "KATALOG CERITA DESTINASI LOMBOK"
                  : lang === "en"
                  ? "LOMBOK DESTINATION STORY CATALOG"
                  : "CATALOGO DELLE STORIE DI LOMBOK"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-header tracking-tight">
                {t.storiesHeader}
              </h2>
              <p className="text-xs sm:text-base text-forest-body mt-1">
                {t.storiesSub}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary sm:hidden">
                {lang === "id" ? "Geser →" : lang === "en" ? "Swipe →" : "Scorri →"}
              </span>
              <Link
                href={localizeHref("/stories")}
                className="hidden sm:inline-block px-5 py-3 rounded-xl bg-forest-header hover:bg-forest-title text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
              >
                {t.viewAllStoriesBtn} →
              </Link>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
            {featuredStories.map((story) => (
              <article
                key={story.id}
                className="min-w-[85vw] max-w-[340px] sm:min-w-0 sm:max-w-none snap-start shrink-0 sm:shrink group bg-white border border-forest-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <Link
                    href={localizeHref(`/explore/${story.packageId || "pkg-explore-rinjani"}`)}
                    className="block relative h-44 sm:h-48 overflow-hidden bg-forest-header"
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

                  <div className="p-4 sm:p-6">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                      {story.regency} • {story.elevationOrDepth}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-forest-header mb-1.5 sm:mb-2 leading-snug line-clamp-2">
                      <Link
                        href={localizeHref(`/explore/${story.packageId || "pkg-explore-rinjani"}`)}
                        className="hover:text-forest-primary transition"
                      >
                        {story.title[lang]}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-forest-body leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {story.summary38[lang]}
                    </p>
                  </div>
                </div>

                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2.5 border-t border-forest-border/60 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTrailer(story)}
                    className="w-full py-2 sm:py-2.5 px-2 rounded-xl bg-forest-pill hover:bg-forest-card text-forest-header text-[11px] sm:text-xs font-extrabold transition text-center truncate"
                  >
                    {t.readTrailerLink}
                  </button>
                  <Link
                    href={localizeHref(`/explore/${story.packageId || "pkg-explore-rinjani"}`)}
                    className="w-full py-2 sm:py-2.5 px-2 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-[11px] sm:text-xs font-extrabold transition text-center shadow-sm truncate"
                  >
                    {t.viewTripDetailBtn}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 sm:hidden text-center">
            <Link
              href={localizeHref("/stories")}
              className="inline-block px-5 py-2.5 rounded-xl bg-forest-header text-white text-xs font-extrabold uppercase tracking-wider transition"
            >
              {t.viewAllStoriesBtn} →
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED BEST SELLER PACKAGES & 3 PILLARS */}
      <section className="py-8 sm:py-16 border-b border-forest-border bg-forest-alt">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-1">
                {t.bestSellersEyebrow}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-header tracking-tight">
                {t.bestSellersHeader}
              </h2>
              <p className="text-xs sm:text-base text-forest-body mt-1 max-w-3xl">
                {t.bestSellersSub}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary sm:hidden">
                {lang === "id" ? "Geser →" : lang === "en" ? "Swipe →" : "Scorri →"}
              </span>
              <Link
                href={localizeHref("/explore")}
                className="hidden sm:inline-block px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
              >
                {t.viewAllDestinationsBtn} →
              </Link>
            </div>
          </div>

          {/* 6 Curated Best Seller Destination Cards in Horizontal Snap Carousel on Mobile */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 sm:overflow-visible">
            {featuredDestinations.map((pkg) => (
              <article
                key={pkg.id}
                className="min-w-[85vw] max-w-[340px] sm:min-w-0 sm:max-w-none snap-start shrink-0 sm:shrink bg-white border border-forest-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
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

                    <h3 className="text-base sm:text-lg font-extrabold text-forest-header mb-1.5 sm:mb-2 leading-snug line-clamp-2">
                      {pkg.title[lang]}
                    </h3>

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

                    <p className="text-xs text-forest-body leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                      {pkg.desc[lang]}
                    </p>

                    {/* All-In Price Section */}
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

          <div className="mt-4 sm:hidden text-center">
            <Link
              href={localizeHref("/explore")}
              className="inline-block px-5 py-2.5 rounded-xl bg-forest-primary text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
            >
              {t.viewAllDestinationsBtn} →
            </Link>
          </div>

          {/* 3 Pillar Quick Navigation Directory with All 24 Destinations */}
          <div className="mt-8 sm:mt-16 pt-8 sm:pt-12 border-t border-forest-border">
            <div className="flex items-end justify-between mb-4 sm:mb-6 gap-4">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-1">
                  {lang === "id"
                    ? "3 PILAR WISATA LOMBOK • 24 DESTINASI LENGKAP"
                    : lang === "en"
                    ? "3 LOMBOK TOURISM PILLARS • 24 COMPLETE DESTINATIONS"
                    : "3 PILASTRI DI LOMBOK • 24 DESTINAZIONI COMPLETE"}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-forest-header">
                  {t.pillarsHeader}
                </h3>
                <p className="text-xs sm:text-sm text-forest-body mt-1 max-w-2xl">
                  {t.pillarsSub}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary sm:hidden">
                  {lang === "id" ? "Geser →" : lang === "en" ? "Swipe →" : "Scorri →"}
                </span>
                <Link
                  href={localizeHref("/explore")}
                  className="hidden sm:inline-block text-xs font-extrabold text-forest-primary hover:text-forest-hover transition"
                >
                  {t.viewAllDestinationsBtn} →
                </Link>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible">
              <Link
                href={localizeHref("/explore?pillar=mountain")}
                className="min-w-[80vw] max-w-[300px] sm:min-w-0 sm:max-w-none snap-start shrink-0 sm:shrink p-4 sm:p-5 rounded-2xl bg-white border border-forest-border hover:border-forest-primary transition group shadow-sm"
              >
                <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                  PILAR 1 • 8 PROGRAM MENGINAP
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-forest-header group-hover:text-forest-primary transition mb-1 sm:mb-1.5">
                  {t.pillarMountain}
                </h4>
                <p className="text-xs text-forest-body leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Puncak Rinjani 3.726m, Danau Segara Anak, Aik Kalak, Lembah Torean, Bukit Pergasingan, Bukit Sempana, Bukit Nanggi, Kondo, Dandaun.
                </p>
              </Link>

              <Link
                href={localizeHref("/explore?pillar=beach")}
                className="min-w-[80vw] max-w-[300px] sm:min-w-0 sm:max-w-none snap-start shrink-0 sm:shrink p-4 sm:p-5 rounded-2xl bg-white border border-forest-border hover:border-forest-primary transition group shadow-sm"
              >
                <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                  PILAR 2 • 8 ZONA PESISIR &amp; GILI
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-forest-header group-hover:text-forest-primary transition mb-1 sm:mb-1.5">
                  {t.pillarBeach}
                </h4>
                <p className="text-xs text-forest-body leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Tanjung Aan, Mawun, Selong Belanak, Merese, Pantai Pink Tangsi, Tanjung Ringgit, Gili Kondo, Gili Trawangan, Meno, Air, Nanggu.
                </p>
              </Link>

              <Link
                href={localizeHref("/explore?pillar=heritage")}
                className="min-w-[80vw] max-w-[300px] sm:min-w-0 sm:max-w-none snap-start shrink-0 sm:shrink p-4 sm:p-5 rounded-2xl bg-white border border-forest-border hover:border-forest-primary transition group shadow-sm"
              >
                <div className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                  PILAR 3 • 8 KORIDOR BUDAYA SASAK
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-forest-header group-hover:text-forest-primary transition mb-1 sm:mb-1.5">
                  {t.pillarHeritage}
                </h4>
                <p className="text-xs text-forest-body leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Desa Sade, Ende, Sukarara, Sembalun Bumbung, Masbagik, Masjid Kuno Bayan Beleq, Senaru, Pura Lingsar, Taman Narmada.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GUIDE NETWORK CTA BANNER */}
      <section className="py-12 sm:py-16 bg-forest-canvas">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-header text-white rounded-3xl p-7 sm:p-12 border border-forest-title shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-2">
                {lang === "id"
                  ? "JARINGAN PEMANDU LOKAL RESMI BERLISENSI HPI NTB"
                  : lang === "en"
                  ? "OFFICIAL NETWORK OF LICENSED HPI LOCAL HOSTS"
                  : "RETE UFFICIALE DI GUIDE LOCALI CERTIFICATE HPI"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                {t.guidesHeader}
              </h2>
              <p className="text-sm sm:text-base text-forest-pill leading-relaxed">
                {t.guidesSub}
              </p>
            </div>
            <div className="flex flex-wrap gap-3.5 shrink-0 w-full sm:w-auto">
              <Link
                href={localizeHref("/guides")}
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-sm transition shadow-md"
              >
                {t.btnFindGuide}
              </Link>
              <Link
                href={localizeHref("/explore")}
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-forest-title hover:bg-forest-primary/40 text-forest-pill border border-forest-sage/30 font-bold text-sm transition"
              >
                {t.viewAllDestinationsBtn}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
