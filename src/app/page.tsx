"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
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
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug text-white mb-3 sm:mb-4">
                  {t.heroTitle}
                </h1>
                <p className="text-forest-pill text-xs sm:text-base leading-relaxed max-w-2xl mb-5 sm:mb-7">
                  {t.heroSubtitle}
                </p>

                {/* Mobile-First Button Cluster — placed directly under subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                  <Link
                    href={localizeHref("/explore")}
                    className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-xs sm:text-sm transition shadow-md whitespace-nowrap"
                  >
                    {t.btnExplore} →
                  </Link>
                  <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
                    <Link
                      href={localizeHref("/guides")}
                      className="text-center px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-forest-title/90 hover:bg-forest-primary/40 text-forest-sage border border-forest-sage/30 font-bold text-xs sm:text-sm transition whitespace-nowrap"
                    >
                      {lang === "id" ? "Pesan Pemandu" : lang === "en" ? "Book Guide" : "Prenota Guida"}
                    </Link>
                    <Link
                      href={localizeHref("/stories")}
                      className="text-center px-3 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-forest-header/90 hover:bg-forest-title text-forest-sage border border-forest-sage/30 font-bold text-xs sm:text-sm transition whitespace-nowrap"
                    >
                      {lang === "id" ? "Katalog Kisah" : lang === "en" ? "Story Catalog" : "Catalogo Storie"}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Metric Summary Strip (3-col inline on all screens) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-5 border-t border-forest-title/80 text-center sm:text-left mt-4 sm:mt-6">
                <div className="min-w-0">
                  <div className="text-xl sm:text-3xl font-black text-forest-sage tracking-tight">
                    24
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 truncate">
                    {lang === "id" ? "Destinasi" : lang === "en" ? "Destinations" : "Destinazioni"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-forest-pill/80 mt-0.5 truncate">
                    {lang === "id" ? "Paket All-In" : lang === "en" ? "All-In Packages" : "Tutto Incluso"}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-3xl font-black text-forest-sage tracking-tight">
                    12
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 truncate">
                    {lang === "id" ? "Kisah Budaya" : lang === "en" ? "Local Stories" : "Storie Locali"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-forest-pill/80 mt-0.5 truncate">
                    {lang === "id" ? "Legenda Asli" : lang === "en" ? "Oral Legends" : "Tradizioni"}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-3xl font-black text-forest-sage tracking-tight">
                    100%
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5 truncate">
                    {lang === "id" ? "Pemandu HPI" : lang === "en" ? "Certified HPI" : "Guide HPI"}
                  </div>
                  <div className="text-[10px] sm:text-xs text-forest-pill/80 mt-0.5 truncate">
                    {lang === "id" ? "Berlisensi NTB" : lang === "en" ? "Official NTB" : "Ufficiali NTB"}
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

              {/* Destination Directory Card — Compact 3-Pillar Overview */}
              <div className="bg-forest-pill border border-forest-border rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-forest-title">
                    {lang === "id"
                      ? "CAKUPAN 24 DESTINASI RESMI"
                      : lang === "en"
                      ? "OFFICIAL 24 DESTINATION COVERAGE"
                      : "COPERTURA DI 24 DESTINAZIONI"}
                  </div>
                  <Link
                    href={localizeHref("/explore")}
                    className="text-xs font-extrabold text-forest-primary hover:underline shrink-0"
                  >
                    {t.viewAllDestinationsBtn} →
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-white/80 border border-forest-border/60">
                    <div className="text-xs font-extrabold text-forest-header">
                      {lang === "id" ? "8 Gunung" : lang === "en" ? "8 Peaks" : "8 Vette"}
                    </div>
                    <div className="text-[10px] text-forest-body mt-0.5 truncate">
                      {lang === "id" ? "Rinjani & Bukit" : lang === "en" ? "Rinjani & Hills" : "Rinjani e Colline"}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-forest-border/60">
                    <div className="text-xs font-extrabold text-forest-header">
                      {lang === "id" ? "8 Pantai" : lang === "en" ? "8 Beaches" : "8 Spiagge"}
                    </div>
                    <div className="text-[10px] text-forest-body mt-0.5 truncate">
                      {lang === "id" ? "Selatan & Gili" : lang === "en" ? "South & Gilis" : "Costa Sud e Gili"}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/80 border border-forest-border/60">
                    <div className="text-xs font-extrabold text-forest-header">
                      {lang === "id" ? "8 Budaya" : lang === "en" ? "8 Culture" : "8 Cultura"}
                    </div>
                    <div className="text-[10px] text-forest-body mt-0.5 truncate">
                      {lang === "id" ? "Desa & Heritage" : lang === "en" ? "Villages & Sites" : "Borghi e Tradizioni"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED STORIES SECTION (Links to /stories for full 12-story catalog) */}
      <section className="py-8 sm:py-16 border-b border-forest-border bg-forest-canvas">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
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
            <Link
              href={localizeHref("/stories")}
              className="self-start sm:self-auto px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-forest-header hover:bg-forest-title text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm whitespace-nowrap"
            >
              {t.viewAllStoriesBtn} →
            </Link>
          </div>

          {/* 6 Curated Stories in 2-Column Grid (Uniform with Destination Cards) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
            {featuredStories.map((story) => (
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

                  {/* Body */}
                  <div className="p-3 sm:p-4">
                    {/* Regency & Elevation (Desktop only to prevent awkward truncated text on mobile 2-col grid) */}
                    <div className="hidden sm:block text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1 truncate">
                      <span>{formatRegency(story.regency, lang)}</span>
                      <span className="text-forest-body/70 font-semibold ml-1.5">• {story.elevationOrDepth}</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-extrabold text-forest-header group-hover:text-forest-primary transition leading-snug line-clamp-2 mb-1">
                      {story.title[lang]}
                    </h3>

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
        </div>
      </section>

      {/* 3. FEATURED BEST SELLER PACKAGES & 3 PILLARS */}
      <section className="py-8 sm:py-16 border-b border-forest-border bg-forest-alt">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
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
            <Link
              href={localizeHref("/explore")}
              className="self-start sm:self-auto px-4 py-2 sm:px-5 sm:py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm shrink-0 whitespace-nowrap"
            >
              {t.viewAllDestinationsBtn} →
            </Link>
          </div>

          {/* 6 Curated Best Seller Destination Cards in 2-Column E-Commerce Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3">
            {featuredDestinations.map((pkg) => (
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
                  <div className="p-3 sm:p-4">
                    {/* Regency & Category Meta (Desktop only to prevent awkward truncated text on mobile 2-col grid) */}
                    <div className="hidden sm:block text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1 truncate">
                      <span>{formatRegency(pkg.regency, lang)}</span>
                      <span className="text-forest-body/70 font-semibold ml-1.5">• {formatPillar(pkg.pillar, lang)}</span>
                    </div>

                    {/* Product Title (2 lines clamp) */}
                    <h3 className="text-xs sm:text-sm font-extrabold text-forest-header group-hover:text-forest-primary transition leading-snug line-clamp-2">
                      {pkg.title[lang]}
                    </h3>
                  </div>
                </div>

                {/* E-Commerce Price & CTA Footer */}
                <div className="p-3 sm:p-4 pt-0">
                  <div className="pt-2.5 border-t border-forest-border/60 flex items-end justify-between gap-1">
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

          {/* 3 Pillar Quick Navigation Directory with All 24 Destinations */}
          <div className="mt-8 sm:mt-16 pt-8 sm:pt-12 border-t border-forest-border">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
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
                <Link
                  href={localizeHref("/explore")}
                  className="text-xs font-extrabold text-forest-primary hover:text-forest-hover transition"
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
