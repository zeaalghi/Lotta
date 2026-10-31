"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UI_TEXT } from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";
import { localizeWeatherMetric } from "@/lib/weather-telemetry";

export default function WeatherPage() {
  const { lang, localizeHref, weatherData } = useLotta();
  const [weatherZone, setWeatherZone] = useState<"summit" | "south" | "gili">(
    "summit"
  );

  const t = UI_TEXT[lang];
  const currentWeather = weatherData.zones[weatherZone];

  const zoneCards = [
    {
      id: "summit" as const,
      label: t.zoneSummit,
      coords: "8.411°S, 116.457°E • 3.726 mdpl",
      destinations:
        "Puncak Rinjani 3.726m, Pelawangan Sembalun, Danau Segara Anak, Bukit Pergasingan, Bukit Sempana, Bukit Anak Dara, Bukit Nanggi, Bukit Kondo, Bao Ritip & Dandaun",
      data: weatherData.zones.summit,
    },
    {
      id: "south" as const,
      label: t.zoneSouth,
      coords: "8.912°S, 116.285°E • Samudra Hindia",
      destinations:
        "Pantai Tanjung Aan, Pantai Mawun, Pantai Selong Belanak, Bukit Merese, Pantai Mawi, Pantai Are Guling & Pantai Mekaki Sekotong",
      data: weatherData.zones.south,
    },
    {
      id: "gili" as const,
      label: t.zoneGili,
      coords: "8.352°S, 116.046°E • Selat Lombok & Alas",
      destinations:
        "Gili Trawangan, Gili Meno, Gili Air, Pantai Sire, Pantai Senggigi, Gili Nanggu, Gili Sudak, Gili Kedis, Pantai Pink Tangsi, Tanjung Ringgit & Gili Kondo",
      data: weatherData.zones.gili,
    },
  ];

  const activeZoneMeta =
    zoneCards.find((z) => z.id === weatherZone) || zoneCards[0];

  return (
    <div className="py-8 sm:py-12 bg-forest-canvas min-h-screen">
      <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-forest-header text-white rounded-3xl p-6 sm:p-10 mb-8 border border-forest-title shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-forest-sage">
              {t.liveStatusLabel}
            </span>
            <span className="px-3 py-1 rounded-full bg-forest-title border border-forest-primary/40 text-[11px] font-bold text-forest-pill">
              Open-Meteo Weather &amp; Marine • Auto-Refresh 30m ISR
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            {t.weatherHeader}
          </h1>
          <p className="text-sm sm:text-base text-forest-pill max-w-3xl leading-relaxed">
            {t.weatherSub}
          </p>
        </div>

        {/* Full-Width Non-Clipped Zone Selector Buttons */}
        <div
          className="bg-forest-alt border border-forest-border rounded-2xl p-4 sm:p-5 mb-8"
          role="tablist"
          aria-label="Zona Telemetri Cuaca Lombok"
        >
          <div className="text-xs font-extrabold uppercase tracking-wider text-forest-title mb-3">
            {lang === "id"
              ? "Pilih Zona Pantauan Cuaca & Gelombang:"
              : lang === "en"
              ? "Select Weather & Wave Monitoring Zone:"
              : "Seleziona Zona Meteo e Onde:"}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {zoneCards.map((zone) => {
              const active = weatherZone === zone.id;
              return (
                <button
                  key={zone.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setWeatherZone(zone.id)}
                  className={`text-left p-4 rounded-xl border-2 transition ${
                    active
                      ? "bg-forest-header text-white border-forest-header shadow-md"
                      : "bg-white text-forest-header border-forest-border hover:border-forest-primary"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-extrabold">{zone.label}</span>
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full shrink-0 ${
                        active
                          ? "bg-forest-primary text-white"
                          : "bg-forest-pill text-forest-title"
                      }`}
                    >
                      {localizeWeatherMetric(zone.data.temp, lang)}
                    </span>
                  </div>
                  <div
                    className={`text-[11px] font-bold mb-1.5 ${
                      active ? "text-forest-sage" : "text-forest-primary"
                    }`}
                  >
                    {zone.coords}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      active ? "text-forest-pill" : "text-forest-body"
                    }`}
                  >
                    {zone.destinations}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Zone Golden Ratio Detail Card */}
        <div className="bg-forest-header text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-forest-title mb-10">
          <div className="phi-grid items-center">
            {/* Left 61.8%: Metrics & Recommendation */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-forest-primary text-white text-xs font-extrabold uppercase tracking-wider">
                  {currentWeather.status[lang]}
                </span>
                <span className="px-3 py-1 rounded-full bg-forest-title text-forest-sage text-xs font-bold">
                  {activeZoneMeta.coords}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                {activeZoneMeta.label}
              </h2>
              <p className="text-xs sm:text-sm text-forest-sage mb-5">
                {activeZoneMeta.destinations}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
                <div className="p-4 rounded-2xl bg-forest-title/80 border border-forest-primary/30">
                  <div className="text-[11px] uppercase tracking-wider text-forest-sage font-semibold">
                    {lang === "id"
                      ? "Suhu Udara"
                      : lang === "en"
                      ? "Temperature"
                      : "Temperatura"}
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {localizeWeatherMetric(currentWeather.temp, lang)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-forest-title/80 border border-forest-primary/30">
                  <div className="text-[11px] uppercase tracking-wider text-forest-sage font-semibold">
                    {lang === "id"
                      ? "Kecepatan Angin"
                      : lang === "en"
                      ? "Wind Speed"
                      : "Velocità Vento"}
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-1">
                    {localizeWeatherMetric(currentWeather.wind, lang)}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-forest-title/80 border border-forest-primary/30">
                  <div className="text-[11px] uppercase tracking-wider text-forest-sage font-semibold">
                    {lang === "id"
                      ? "Kelembapan Udara"
                      : lang === "en"
                      ? "Humidity"
                      : "Umidità"}
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-1">
                    {currentWeather.humidity}
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-forest-title/80 border border-forest-primary/30">
                  <div className="text-[11px] uppercase tracking-wider text-forest-sage font-semibold">
                    {lang === "id"
                      ? "Jarak Pandang"
                      : lang === "en"
                      ? "Visibility"
                      : "Visibilità"}
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white mt-1">
                    {localizeWeatherMetric(currentWeather.visibility, lang)}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-forest-title/60 border border-forest-sage/30 text-sm text-forest-pill leading-relaxed">
                <strong className="text-forest-sage uppercase tracking-wider text-xs block mb-1">
                  {lang === "id"
                    ? "Rekomendasi Keselamatan & Operasional Lapangan LOTTA:"
                    : lang === "en"
                    ? "LOTTA Field Safety & Operational Advisory:"
                    : "Avviso Operativo Sul Campo LOTTA:"}
                </strong>
                {currentWeather.recommendation[lang]}
              </div>
            </div>

            {/* Right 38.2%: Swell / Elevation Box */}
            <div className="bg-forest-title rounded-2xl p-6 border border-forest-primary/40 flex flex-col justify-between h-full">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-2">
                  {lang === "id"
                    ? "INDIKATOR GELOMBANG & ELEVASI"
                    : lang === "en"
                    ? "WAVE & ELEVATION TELEMETRY"
                    : "TELEMETRIA ONDE ED ELEVAZIONE"}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {localizeWeatherMetric(currentWeather.wave, lang)}
                </div>
                <p className="text-xs text-forest-pill/90 leading-relaxed mb-6">
                  {lang === "id"
                    ? "Seluruh jadwal pendakian menginap Gunung/Bukit dan penyeberangan perahu Gili disesuaikan dengan pembaruan cuaca lapangan bersama Guide LOTTA Anda."
                    : lang === "en"
                    ? "All overnight Mountain/Hill treks and Gili boat crossings are synchronized with live field weather updates through your assigned LOTTA Guide."
                    : "Tutti i trekking notturni e le traversate verso le Gili sono sincronizzati con il meteo in tempo reale."}
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <Link
                  href={localizeHref("/guides")}
                  className="w-full text-center px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-xs uppercase tracking-wider transition"
                >
                  {t.btnFindGuide}
                </Link>
                <Link
                  href={localizeHref("/explore")}
                  className="w-full text-center px-5 py-2.5 rounded-xl bg-forest-header hover:bg-forest-primary/30 text-forest-sage border border-forest-sage/30 font-extrabold text-xs uppercase tracking-wider transition"
                >
                  {t.viewAllDestinationsBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* All 3 Zones Side-by-Side Comparison */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-forest-header mb-5">
          {lang === "id"
            ? "Ringkasan Kondisi Seluruh Destinasi Gunung, Pantai & Gili"
            : lang === "en"
            ? "All Mountain, Beach & Gili Destination Conditions Summary"
            : "Riepilogo Condizioni di Tutte le Destinazioni"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {zoneCards.map((zone) => (
            <div
              key={zone.id}
              className="bg-white border border-forest-border rounded-2xl p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-forest-primary">
                    {zone.data.status[lang]}
                  </span>
                  <span className="text-lg font-extrabold text-forest-header">
                    {localizeWeatherMetric(zone.data.temp, lang)}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-forest-header mb-1">
                  {zone.label}
                </h3>
                <div className="text-[11px] font-bold text-forest-title mb-2">
                  {zone.coords}
                </div>
                <p className="text-xs text-forest-body leading-relaxed mb-4">
                  <strong>
                    {lang === "id"
                      ? "Destinasi:"
                      : lang === "en"
                      ? "Destinations:"
                      : "Destinazioni:"}
                  </strong>{" "}
                  {zone.destinations}
                </p>
              </div>
              <div className="pt-4 border-t border-forest-border/70 text-xs text-forest-title space-y-1">
                <div>
                  <strong>
                    {lang === "id"
                      ? "Angin:"
                      : lang === "en"
                      ? "Wind:"
                      : "Vento:"}
                  </strong>{" "}
                  {localizeWeatherMetric(zone.data.wind, lang)} •{" "}
                  <strong>
                    {lang === "id"
                      ? "Kelembapan:"
                      : lang === "en"
                      ? "Humidity:"
                      : "Umidità:"}
                  </strong>{" "}
                  {zone.data.humidity}
                </div>
                <div>
                  <strong>
                    {lang === "id"
                      ? "Ombak / Gelombang:"
                      : lang === "en"
                      ? "Wave / Swell:"
                      : "Onde / Swell:"}
                  </strong>{" "}
                  {localizeWeatherMetric(zone.data.wave, lang)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
