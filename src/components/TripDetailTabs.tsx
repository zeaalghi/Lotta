"use client";

import React, { useState } from "react";
import type { DestinationPackage, Lang } from "@/data/lotta-content";
import { getTripDetails } from "@/lib/trip-details";

interface TripDetailTabsProps {
  pkg: DestinationPackage;
  lang: Lang;
  className?: string;
}

export function TripDetailTabs({ pkg, lang, className = "" }: TripDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "inclusions" | "what-to-bring" | "itinerary"
  >("overview");

  const details = getTripDetails(pkg, lang);

  const tabLabels = {
    overview: {
      id: "Trip Overview",
      en: "Trip Overview",
      it: "Panoramica Trip",
    },
    inclusions: {
      id: "Inclusion & Exclusions",
      en: "Inclusion & Exclusions",
      it: "Inclusioni ed Esclusioni",
    },
    whatToBring: {
      id: "What to Bring",
      en: "What to Bring",
      it: "Cosa Portare",
    },
    itinerary: {
      id: "Itinerary",
      en: "Itinerary",
      it: "Itinerario",
    },
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 4 Interactive Tab Buttons (Horizontal Rail) */}
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-forest-border/80 pb-2"
        role="tablist"
        aria-label="Trip Details Tabs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
            activeTab === "overview"
              ? "bg-forest-header text-white shadow-sm"
              : "bg-white text-forest-header border border-forest-border hover:bg-forest-card"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-forest-primary" />
          <span>{tabLabels.overview[lang]}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "inclusions"}
          onClick={() => setActiveTab("inclusions")}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
            activeTab === "inclusions"
              ? "bg-forest-header text-white shadow-sm"
              : "bg-white text-forest-header border border-forest-border hover:bg-forest-card"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-forest-primary" />
          <span>{tabLabels.inclusions[lang]}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "what-to-bring"}
          onClick={() => setActiveTab("what-to-bring")}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
            activeTab === "what-to-bring"
              ? "bg-forest-header text-white shadow-sm"
              : "bg-white text-forest-header border border-forest-border hover:bg-forest-card"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-forest-primary" />
          <span>{tabLabels.whatToBring[lang]}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "itinerary"}
          onClick={() => setActiveTab("itinerary")}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center gap-2 ${
            activeTab === "itinerary"
              ? "bg-forest-header text-white shadow-sm"
              : "bg-white text-forest-header border border-forest-border hover:bg-forest-card"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-forest-primary" />
          <span>{tabLabels.itinerary[lang]}</span>
        </button>
      </div>

      {/* Tab 1: TRIP OVERVIEW */}
      {activeTab === "overview" && (
        <div className="bg-white border border-forest-border rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm animate-fadeIn">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
              {lang === "id"
                ? "GAMBARAN UMUM PERJALANAN"
                : lang === "en"
                ? "TRIP OVERVIEW & HIGHLIGHTS"
                : "PANORAMICA DEL VIAGGIO"}
            </div>
            <h4 className="text-base sm:text-lg font-extrabold text-forest-header leading-snug">
              {pkg.title[lang]}
            </h4>
          </div>

          <p className="text-xs sm:text-sm text-forest-body leading-relaxed">
            {details.overviewText}
          </p>

          <div className="pt-3 border-t border-forest-border/70">
            <div className="text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2.5">
              {lang === "id"
                ? "Titik Keunggulan Destinasi Ini:"
                : lang === "en"
                ? "Key Tour Highlights:"
                : "Punti Salienti del Tour:"}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {details.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-forest-alt border border-forest-border/60 text-xs text-forest-header font-bold"
                >
                  <span className="shrink-0 w-5 h-5 rounded-md bg-forest-primary text-white text-[10px] font-extrabold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: INCLUSION & EXCLUSIONS */}
      {activeTab === "inclusions" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
          {/* Included Card */}
          <div className="bg-white border-2 border-forest-primary/50 rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-title">
                {lang === "id"
                  ? "Sudah Termasuk (Included)"
                  : lang === "en"
                  ? "What's Included"
                  : "Incluso nel Pacchetto"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-forest-primary text-white">
                {details.inclusions.length} Item
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-forest-header">
              {details.inclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="shrink-0 font-extrabold text-forest-primary text-sm leading-none mt-0.5">
                    [+]
                  </span>
                  <span className="font-semibold leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded Card */}
          <div className="bg-forest-alt border border-forest-border rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-forest-body">
                {lang === "id"
                  ? "Tidak Termasuk (Exclusions)"
                  : lang === "en"
                  ? "Not Included (Exclusions)"
                  : "Non Incluso"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-forest-pill text-forest-title">
                {details.exclusions.length} Item
              </span>
            </div>
            <ul className="space-y-2.5 text-xs text-forest-body">
              {details.exclusions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="shrink-0 font-bold text-forest-border text-sm leading-none mt-0.5">
                    [-]
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Tab 3: WHAT TO BRING */}
      {activeTab === "what-to-bring" && (
        <div className="bg-white border border-forest-border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
              {lang === "id"
                ? "PERLENGKAPAN YANG DISARANKAN"
                : lang === "en"
                ? "RECOMMENDED PACKING LIST"
                : "COSA PORTARE CON SÉ"}
            </div>
            <p className="text-xs text-forest-body">
              {lang === "id"
                ? "Daftar barang penting yang wajib dibawa agar trip Anda berjalan aman, nyaman, dan berkesan:"
                : lang === "en"
                ? "Essential checklist to ensure your trip is safe, comfortable, and enjoyable:"
                : "Lista delle cose essenziali per viaggiare in sicurezza e comodità:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {details.whatToBring.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-forest-pill border border-forest-border/80 text-xs text-forest-header"
              >
                <span className="shrink-0 w-6 h-6 rounded-lg bg-forest-header text-forest-sage font-extrabold text-[11px] flex items-center justify-center">
                  0{idx + 1}
                </span>
                <span className="font-semibold leading-relaxed pt-0.5">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: ITINERARY TIMELINE */}
      {activeTab === "itinerary" && (
        <div className="bg-white border border-forest-border rounded-2xl p-5 sm:p-6 shadow-sm space-y-4 animate-fadeIn">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary mb-1">
              {lang === "id"
                ? "RUNDOWN & JADWAL RUTE PERJALANAN"
                : lang === "en"
                ? "TOUR ITINERARY & STOPS"
                : "ITINERARIO E TAPPE"}
            </div>
            <p className="text-xs text-forest-body">
              {lang === "id"
                ? "Rangkaian perkiraan jadwal perjalanan dari penjemputan hingga kepulangan:"
                : lang === "en"
                ? "Estimated itinerary breakdown from initial pickup through trip conclusion:"
                : "Orari e tappe stimate dall'inizio alla fine del tour:"}
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-4 pt-3 border-l-2 border-forest-primary/40 ml-3 sm:ml-4">
            {details.itinerary.map((stop, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-forest-primary border-4 border-white shadow-sm group-hover:scale-110 transition" />
                <div className="p-3.5 rounded-xl bg-forest-alt border border-forest-border/70 hover:border-forest-primary transition">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-forest-header text-forest-sage text-[10px] font-extrabold tracking-wider uppercase mb-1">
                    {stop.timeOrDay}
                  </span>
                  <p className="text-xs text-forest-header font-bold leading-relaxed">
                    {stop.activity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
