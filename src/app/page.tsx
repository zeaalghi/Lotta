"use client";

import React from "react";
import Link from "next/link";
import {
  formatPrice,
  formatRegency,
  PACKAGES,
  STORY_TRAILERS,
  UI_TEXT,
} from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";
import { localizeWeatherMetric } from "@/lib/weather-telemetry";

export default function HomePage() {
  const {
    lang,
    weatherData,
    setActiveTrailer,
    setActivePackageModal,
    chooseRouteAndGoToGuides,
  } = useLotta();

  const t = UI_TEXT[lang];
  const featuredStories = STORY_TRAILERS.slice(0, 6);
  const featuredDestinations = [
    PACKAGES[0], // 7 Summits Sembalun
    PACKAGES[4], // Bukit Pergasingan
    PACKAGES[8], // Pantai Tanjung Aan & Bukit Merese
    PACKAGES[10], // Pantai Pink Tangsi & Tanjung Ringgit
    PACKAGES[16], // Desa Adat Sade & Desa Adat Ende
    PACKAGES[18], // Masjid Kuno Bayan Beleq
  ];

  const summitZone = weatherData.zones.summit;
  const southZone = weatherData.zones.south;
  const giliZone = weatherData.zones.gili;

  return (
    <div>
      {/* 1. HERO GOLDEN RATIO SECTION (1.618fr : 1fr) */}
      <section className="relative overflow-hidden border-b border-forest-border bg-gradient-to-b from-forest-alt to-forest-canvas py-8 sm:py-12 lg:py-16">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="phi-grid items-stretch">
            {/* Primary Column (61.8%) */}
            <div className="flex flex-col justify-between bg-forest-header text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden border border-forest-title">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-title border border-forest-primary/40 text-forest-sage text-xs font-extrabold tracking-widest uppercase mb-5">
                  <span>{t.heroTag}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-[1.15] text-white mb-4">
                  {t.heroTitle}
                </h1>
                <p className="text-forest-pill text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-7">
                  {t.heroSubtitle}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mb-7">
                  <Link
                    href="/explore"
                    className="text-center px-6 py-3.5 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-sm transition shadow-md"
                  >
                    {t.btnExplore}
                  </Link>
                  <Link
                    href="/guides"
                    className="text-center px-6 py-3.5 rounded-xl bg-forest-title hover:bg-forest-primary/40 text-forest-pill border border-forest-sage/30 font-bold text-sm transition"
                  >
                    {t.btnFindGuide}
                  </Link>
                  <Link
                    href="/stories"
                    className="text-center px-5 py-3.5 rounded-xl bg-forest-header hover:bg-forest-title text-forest-sage border border-forest-sage/30 font-bold text-sm transition"
                  >
                    {t.viewAllStoriesBtn}
                  </Link>
                </div>

                {/* Metric Summary Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5 border-t border-forest-title/80 text-left">
                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl font-extrabold text-forest-sage">
                      {lang === "id"
                        ? "24 Destinasi"
                        : lang === "en"
                        ? "24 Destinations"
                        : "24 Destinazioni"}
                    </div>
                    <div className="text-xs text-forest-pill/80 mt-0.5">
                      {lang === "id"
                        ? "Gunung, Pantai & Heritage"
                        : lang === "en"
                        ? "Mountains, Beaches & Heritage"
                        : "Montagne, Spiagge e Cultura"}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl font-extrabold text-forest-sage">
                      {lang === "id"
                        ? "12 Cerita"
                        : lang === "en"
                        ? "12 Stories"
                        : "12 Storie"}
                    </div>
                    <div className="text-xs text-forest-pill/80 mt-0.5">
                      {lang === "id"
                        ? "Legenda & Sejarah Lisan"
                        : lang === "en"
                        ? "Legends & Oral History"
                        : "Leggende e Storia Orale"}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl sm:text-2xl font-extrabold text-forest-sage">
                      {lang === "id"
                        ? "326 Guide"
                        : lang === "en"
                        ? "326 Guides"
                        : "326 Guide"}
                    </div>
                    <div className="text-xs text-forest-pill/80 mt-0.5">
                      {lang === "id"
                        ? "36 Wanita • 290 Pria • 14 Bahasa"
                        : lang === "en"
                        ? "36 Female • 290 Male • 14 Languages"
                        : "36 Donne • 290 Uomini • 14 Lingue"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Column (38.2%) — Live Telemetry & Quick Destination Directory */}
            <div className="flex flex-col justify-between gap-5">
              <div className="bg-forest-card/80 border border-forest-border rounded-3xl p-6 flex-1 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title">
                      {t.liveStatusLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-forest-primary text-white">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-2.5">
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

                <div className="mt-4 pt-3.5 border-t border-forest-border/80 flex items-center justify-between gap-2">
                  <span className="text-xs text-forest-body font-semibold">
                    {lang === "id"
                      ? "Cek detail angin & gelombang"
                      : lang === "en"
                      ? "Check full wind & wave data"
                      : "Controlla vento e onde"}
                  </span>
                  <Link
                    href="/weather"
                    className="px-3.5 py-1.5 rounded-lg bg-forest-header text-white text-xs font-extrabold uppercase tracking-wider hover:bg-forest-title transition whitespace-nowrap"
                  >
                    {t.navWeather} →
                  </Link>
                </div>
              </div>

              {/* Explicit Destination Directory Card */}
              <div className="bg-forest-pill border border-forest-border rounded-3xl p-5 sm:p-6 shadow-sm">
                <div className="text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2">
                  {lang === "id"
                    ? "CAKUPAN DESTINASI LENGKAP LOMBOK"
                    : lang === "en"
                    ? "COMPLETE LOMBOK DESTINATION COVERAGE"
                    : "COPERTURA COMPLETA DELLE DESTINAZIONI"}
                </div>
                <p className="text-xs text-forest-body leading-relaxed mb-3">
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
                  Tanjung Aan, Mawun, Selong Belanak, Merese, Pink Tangsi, Tanjung Ringgit, Gili Kondo, Gili Trawangan, Gili Meno, Gili Air, Sire, Gili Kedis, Sudak, Nanggu, Mekaki.
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
                  href="/explore"
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
      <section className="py-12 sm:py-16 border-b border-forest-border bg-forest-canvas">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-1.5">
                {lang === "id"
                  ? "KATALOG CERITA DESTINASI LOMBOK"
                  : lang === "en"
                  ? "LOMBOK DESTINATION STORY CATALOG"
                  : "CATALOGO DELLE STORIE DI LOMBOK"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-header tracking-tight">
                {t.storiesHeader}
              </h2>
              <p className="text-sm sm:text-base text-forest-body mt-1">
                {t.storiesSub}
              </p>
            </div>
            <Link
              href="/stories"
              className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-forest-header hover:bg-forest-title text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
            >
              {t.viewAllStoriesBtn} →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <article
                key={story.id}
                className="group bg-white border border-forest-border rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
              >
                <div>
                  <Link
                    href={`/explore/${story.packageId || "pkg-explore-rinjani"}`}
                    className="block relative h-48 overflow-hidden bg-forest-header"
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
                      {story.regency} • {story.elevationOrDepth}
                    </div>
                    <h3 className="text-lg font-extrabold text-forest-header mb-2 leading-snug">
                      <Link
                        href={`/explore/${story.packageId || "pkg-explore-rinjani"}`}
                        className="hover:text-forest-primary transition"
                      >
                        {story.title[lang]}
                      </Link>
                    </h3>
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
                    href={`/explore/${story.packageId || "pkg-explore-rinjani"}`}
                    className="w-full py-2.5 px-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold transition text-center shadow-sm"
                  >
                    {t.viewTripDetailBtn}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS ACROSS 3 PILLARS (Links to /explore for all 24 destinations) */}
      <section className="py-12 sm:py-16 border-b border-forest-border bg-forest-alt">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-1.5">
                3 PILAR WISATA LOMBOK — 24 DESTINASI LENGKAP
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-header tracking-tight">
                {t.pillarsHeader}
              </h2>
              <p className="text-sm sm:text-base text-forest-body mt-1 max-w-3xl">
                {t.pillarsSub}
              </p>
            </div>
            <Link
              href="/explore"
              className="w-full sm:w-auto text-center px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition shadow-sm"
            >
              {t.viewAllDestinationsBtn} →
            </Link>
          </div>

          {/* 3 Pillar Quick Navigation Cards with All Destination Names Written Out */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <Link
              href="/explore?pillar=mountain"
              className="p-6 rounded-2xl bg-white border border-forest-border hover:border-forest-primary transition group shadow-sm"
            >
              <div className="text-xs font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                PILAR 1 • 8 PROGRAM MENGINAP
              </div>
              <h3 className="text-lg font-extrabold text-forest-header group-hover:text-forest-primary transition mb-2">
                {t.pillarMountain}
              </h3>
              <p className="text-xs text-forest-body leading-relaxed">
                Puncak Gunung Rinjani 3.726m, Danau Segara Anak, Aik Kalak, Jalur Lembah Torean, Bukit Pergasingan, Bukit Sempana, Bukit Anak Dara, Bukit Nanggi, Bukit Kondo, Bukit Bao Ritip, Bukit Dandaun.
              </p>
            </Link>

            <Link
              href="/explore?pillar=beach"
              className="p-6 rounded-2xl bg-white border border-forest-border hover:border-forest-primary transition group shadow-sm"
            >
              <div className="text-xs font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                PILAR 2 • 8 ZONA PESISIR &amp; GILI
              </div>
              <h3 className="text-lg font-extrabold text-forest-header group-hover:text-forest-primary transition mb-2">
                {t.pillarBeach}
              </h3>
              <p className="text-xs text-forest-body leading-relaxed">
                Lombok Tengah (Tanjung Aan, Mawun, Selong Belanak, Merese), Lombok Timur (Pantai Pink Tangsi, Tanjung Ringgit, Gili Kondo, Bidara, Petagan), Lombok Utara (Gili Trawangan, Meno, Air, Pantai Sire), Lombok Barat (Gili Kedis, Sudak, Nanggu, Mekaki).
              </p>
            </Link>

            <Link
              href="/explore?pillar=heritage"
              className="p-6 rounded-2xl bg-white border border-forest-border hover:border-forest-primary transition group shadow-sm"
            >
              <div className="text-xs font-extrabold uppercase tracking-wider text-forest-primary mb-1">
                PILAR 3 • 8 KORIDOR BUDAYA SASAK
              </div>
              <h3 className="text-lg font-extrabold text-forest-header group-hover:text-forest-primary transition mb-2">
                {t.pillarHeritage}
              </h3>
              <p className="text-xs text-forest-body leading-relaxed">
                Lombok Tengah (Desa Adat Sade, Desa Ende, Desa Tenun Sukarara, Bau Nyale), Lombok Timur (7 Rumah Adat Sembalun Bumbung, Gerabah Masbagik), Lombok Utara (Masjid Kuno Bayan Beleq, Desa Adat Senaru), Lombok Barat (Pura Lingsar, Taman Narmada).
              </p>
            </Link>
          </div>

          {/* 6 Highlighted Destination Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((pkg) => (
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
                        {pkg.duration}
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
                    <h3 className="text-lg font-extrabold text-forest-header mb-2 leading-snug">
                      {pkg.title[lang]}
                    </h3>
                    <p className="text-sm text-forest-body leading-relaxed">
                      {pkg.desc[lang]}
                    </p>
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
        </div>
      </section>

      {/* 4. GUIDE NETWORK CTA BANNER */}
      <section className="py-12 sm:py-16 bg-forest-canvas">
        <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-forest-header text-white rounded-3xl p-7 sm:p-12 border border-forest-title shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-2">
                {lang === "id"
                  ? "JARINGAN 326 GUIDE BERSERTIFIKAT HPI NTB"
                  : lang === "en"
                  ? "OFFICIAL NETWORK OF 326 CERTIFIED GUIDES (HPI NTB)"
                  : "RETE UFFICIALE DI 326 GUIDE CERTIFICATE (HPI NTB)"}
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
                href="/guides"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-sm transition shadow-md"
              >
                {t.btnFindGuide}
              </Link>
              <Link
                href="/explore"
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
