"use client";

import React from "react";
import Link from "next/link";
import {
  findPackage,
  formatDuration,
  formatPrice,
  formatRegency,
  STORY_TRAILERS,
  UI_TEXT,
} from "@/data/lotta-content";
import { useLotta } from "@/components/LottaShell";
import { TripDetailTabs } from "@/components/TripDetailTabs";

interface PackageDetailViewProps {
  packageId: string;
}

export function PackageDetailView({ packageId }: PackageDetailViewProps) {
  const { lang, chooseRouteAndGoToGuides } = useLotta();
  const pkg = findPackage(packageId);
  const t = UI_TEXT[lang];
  const relatedStory = STORY_TRAILERS.find((s) => s.packageId === pkg.id);

  const deposit30 = Math.round(pkg.priceIdr * 0.3);

  return (
    <div className="py-8 sm:py-12 bg-forest-canvas min-h-screen pb-36">
      <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-forest-body font-semibold mb-6 flex-wrap"
        >
          <Link href="/" className="hover:text-forest-header transition">
            {t.navHome}
          </Link>
          <span>/</span>
          <Link href="/explore" className="hover:text-forest-header transition">
            {t.navExplore}
          </Link>
          <span>/</span>
          <span className="text-forest-header font-bold truncate max-w-xs sm:max-w-md">
            {pkg.destinationNames}
          </span>
        </nav>

        {/* Hero Banner with Header Specs */}
        <div className="bg-forest-header text-white rounded-3xl overflow-hidden border border-forest-title shadow-xl mb-8">
          <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden bg-forest-title">
            <img
              src={pkg.image}
              alt={pkg.destinationNames}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-header via-forest-header/40 to-transparent" />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase bg-forest-primary text-white shadow-md">
                {pkg.badge[lang]}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-forest-header/90 text-forest-sage border border-forest-sage/40 backdrop-blur-sm">
                {formatDuration(pkg.duration, lang)}
              </span>
            </div>

            {/* Title & Regency at Bottom of Image */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
              <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-1.5">
                {formatRegency(pkg.regency, lang)}
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {pkg.title[lang]}
              </h1>
            </div>
          </div>

          {/* Quick Spec Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 bg-forest-title/95 border-t border-forest-primary/30 text-left">
            <div>
              <div className="text-[11px] font-extrabold uppercase text-forest-sage tracking-wider">
                {lang === "id" ? "Harga per Orang" : lang === "en" ? "Price per Person" : "Prezzo per Persona"}
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                {formatPrice(pkg.priceIdr, lang)}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-extrabold uppercase text-forest-sage tracking-wider">
                {t.deposit30Label}
              </div>
              <div className="text-lg sm:text-xl font-extrabold text-forest-sage mt-0.5">
                {formatPrice(deposit30, lang)}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-extrabold uppercase text-forest-sage tracking-wider">
                {lang === "id" ? "Durasi Trip" : lang === "en" ? "Trip Duration" : "Durata"}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                {formatDuration(pkg.duration, lang)}
              </div>
            </div>

            <div>
              <div className="text-[11px] font-extrabold uppercase text-forest-sage tracking-wider">
                {lang === "id" ? "Pemandu Resmi" : lang === "en" ? "Official Guide" : "Guida Ufficiale"}
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                Lisensi HPI NTB
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Main Layout: Left = 4 Tabs & Culture, Right = Sticky Booking Action */}
        <div className="phi-grid items-start">
          {/* Main Left Column (61.8%) */}
          <div className="space-y-6">
            {/* 4 INTERACTIVE TABS */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-forest-title text-forest-sage text-[11px] font-extrabold uppercase tracking-wider mb-3">
                {lang === "id"
                  ? "PANDUAN LENGKAP DETAIL TRIP"
                  : lang === "en"
                  ? "COMPLETE TRIP GUIDELINES"
                  : "GUIDA COMPLETA DEL TOUR"}
              </div>
              <TripDetailTabs pkg={pkg} lang={lang} />
            </div>

            {/* Cultural Living Heritage & Oral Tradition Section */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-forest-border shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-primary">
                  {t.oralHeritageLabel}
                </div>
                {relatedStory && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-forest-pill text-forest-title">
                    {relatedStory.elevationOrDepth}
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-forest-header mb-2 leading-snug">
                  {relatedStory ? relatedStory.title[lang] : pkg.title[lang]}
                </h3>
                <p className="text-xs sm:text-sm text-forest-body leading-relaxed">
                  {relatedStory ? relatedStory.hook38Full[lang] : pkg.storyTeaser[lang]}
                </p>
              </div>

              {/* Cultural Guide SOP Guarantee */}
              <div className="p-4 rounded-2xl bg-forest-alt border border-forest-border/80">
                <p className="text-xs text-forest-body leading-relaxed font-medium">
                  {t.oralHeritageSOP}
                </p>
              </div>

              {/* Link back to Stories Catalog */}
              <div className="pt-2">
                <Link
                  href="/stories"
                  className="text-xs font-extrabold text-forest-primary hover:text-forest-header transition inline-flex items-center gap-1"
                >
                  ← {t.exploreStoryCatalogLink}
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (38.2%): Sticky Booking CTA Card */}
          <aside className="bg-forest-header text-white rounded-3xl p-6 sm:p-8 border border-forest-title shadow-xl lg:sticky lg:top-24 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-forest-title text-forest-sage text-[11px] font-extrabold uppercase tracking-wider mb-3">
                {lang === "id"
                  ? "BOOKING RESMI SATU PINTU"
                  : lang === "en"
                  ? "OFFICIAL DIRECT RESERVATION"
                  : "PRENOTAZIONE UFFICIALE"}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                {lang === "id"
                  ? "Tertarik dengan Rute Ini?"
                  : lang === "en"
                  ? "Ready for This Journey?"
                  : "Pronto per Questo Tour?"}
              </h2>
              <p className="text-xs text-forest-pill/90 leading-relaxed">
                {lang === "id"
                  ? "Lanjutkan ke halaman pemilihan Guide untuk menentukan tanggal keberangkatan, jumlah peserta, dan melihat simulasi Down Payment 30%."
                  : lang === "en"
                  ? "Proceed to Guide Selection to set your departure date, traveler count, and review the 30% Down Payment calculation."
                  : "Procedi alla selezione della guida per impostare la data e il numero di partecipanti."}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-forest-title border border-forest-primary/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-forest-sage font-bold">{t.pricePerPerson}:</span>
                <span className="text-base font-extrabold text-white">
                  {formatPrice(pkg.priceIdr, lang)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-forest-primary/40">
                <span className="text-forest-sage font-bold">{t.deposit30Label}:</span>
                <span className="text-sm font-extrabold text-forest-sage">
                  {formatPrice(deposit30, lang)}
                </span>
              </div>
            </div>

            {/* Direct Button to Guides page with pre-selected package */}
            <div>
              <button
                type="button"
                onClick={() => chooseRouteAndGoToGuides(pkg.id)}
                className="w-full py-4 px-5 rounded-2xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-sm tracking-wide transition shadow-lg text-center"
              >
                {lang === "id"
                  ? "Pilih Rute Ini & Cari Guide →"
                  : lang === "en"
                  ? "Choose This Route & Pick Guide →"
                  : "Scegli Questo Itinerario →"}
              </button>
              <p className="text-[11px] text-center text-forest-sage/90 mt-2.5">
                {lang === "id"
                  ? "Pemesanan langsung terhubung ke WhatsApp resmi tim LOTTA."
                  : "Direct booking verified through official LOTTA WhatsApp team."}
              </p>
            </div>

            {/* Back to Catalog Link */}
            <div className="pt-2 text-center border-t border-forest-title">
              <Link
                href="/explore"
                className="text-xs font-extrabold text-forest-sage hover:text-white transition"
              >
                ← {lang === "id" ? "Kembali ke Katalog Destinasi" : "Back to All Destinations"}
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM BAR FOR INSTANT BOOKING */}
      <div className="lg:hidden fixed bottom-[64px] inset-x-0 z-30 px-3 pb-2 pointer-events-none">
        <div className="max-w-lg mx-auto bg-forest-header text-white border-2 border-forest-sage/60 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 pointer-events-auto">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-forest-sage truncate">
              {pkg.destinationNames}
            </div>
            <div className="text-xs font-extrabold text-white">
              {formatPrice(pkg.priceIdr, lang)} / {lang === "id" ? "orang" : "pax"}
            </div>
            <div className="text-[10px] text-forest-pill truncate">
              DP 30%: {formatPrice(deposit30, lang)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => chooseRouteAndGoToGuides(pkg.id)}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold shadow-md transition"
          >
            {lang === "id" ? "Pesan Rute →" : "Book Route →"}
          </button>
        </div>
      </div>
    </div>
  );
}
