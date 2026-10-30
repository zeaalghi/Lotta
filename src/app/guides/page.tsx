"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  findPackage,
  formatDuration,
  formatPrice,
  formatRegency,
  PACKAGES,
  SPECIALTY_LABELS,
  SPECIALTY_OPTIONS,
  UI_TEXT,
} from "@/data/lotta-content";
import {
  ALL_GUIDES,
  buildSingleGateWhatsAppUrl,
  filterGuides,
  GenderFilter,
  getGenderCounts,
  getSpecialtyCounts,
} from "@/lib/guides-catalog";
import { useLotta } from "@/components/LottaShell";
import { TripDetailTabs } from "@/components/TripDetailTabs";

function GuidesContent() {
  const searchParams = useSearchParams();
  const routeParam =
    searchParams.get("route") ||
    searchParams.get("dest") ||
    searchParams.get("destination");

  const {
    lang,
    selectedRoute,
    setSelectedRoute,
    selectedGuide,
    setSelectedGuide,
  } = useLotta();

  // Booking Flow State
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  }, []);

  const [tripDate, setTripDate] = useState<string>(defaultDate);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [copiedBank, setCopiedBank] = useState<boolean>(false);

  // Guide Filters
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("all");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>(
    "All Languages / Specialties"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 6;
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  useEffect(() => {
    if (routeParam && routeParam.trim().length > 0) {
      const matched = findPackage(routeParam);
      setSelectedRoute(matched.id);
    }
  }, [routeParam, setSelectedRoute]);

  const t = UI_TEXT[lang];

  const specialtyCounts = useMemo(() => getSpecialtyCounts(ALL_GUIDES), []);
  const genderCounts = useMemo(() => getGenderCounts(ALL_GUIDES), []);

  const hasActiveFilter =
    genderFilter !== "all" ||
    specialtyFilter !== "All Languages / Specialties" ||
    searchQuery.trim() !== "";

  const resetAllGuideFilters = () => {
    setGenderFilter("all");
    setSpecialtyFilter("All Languages / Specialties");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const filteredGuides = useMemo(
    () =>
      filterGuides(ALL_GUIDES, {
        gender: genderFilter,
        specialty: specialtyFilter,
        searchQuery,
      }),
    [genderFilter, specialtyFilter, searchQuery]
  );

  const totalPages = Math.max(1, Math.ceil(filteredGuides.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredGuides.length);

  const displayedGuides = useMemo(
    () => filteredGuides.slice(startIndex, startIndex + pageSize),
    [filteredGuides, startIndex, pageSize]
  );

  const handlePageChange = (newPage: number) => {
    const target = Math.min(Math.max(1, newPage), totalPages);
    setCurrentPage(target);
    if (typeof window !== "undefined") {
      const el = document.getElementById("guide-roster-list");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const paginationRange = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safeCurrentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages];
    }
    if (safeCurrentPage >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  }, [safeCurrentPage, totalPages]);

  const activePackageObj = useMemo(() => {
    return findPackage(selectedRoute);
  }, [selectedRoute]);

  // Real-time Pricing Calculations
  const unitPrice = activePackageObj.priceIdr || 750000;
  const adultsTotal = unitPrice * adults;
  const childrenTotal = Math.round(unitPrice * 0.5 * children);
  const totalPrice = adultsTotal + childrenTotal;
  const depositAmount = Math.round(totalPrice * 0.3); // 30% Down Payment
  const remainingAmount = totalPrice - depositAmount; // 70% Pelunasan

  const handleCopyBank = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText("1610007723179");
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 2500);
    }
  };

  const handleConfirmWhatsApp = () => {
    const whatsappUrl = buildSingleGateWhatsAppUrl({
      lang,
      selectedRoute: `${activePackageObj.destinationNames} (${activePackageObj.duration})`,
      genderFilter,
      specialtyFilter,
      selectedGuide,
      tripDate,
      adults,
      children,
      pickupLocation: pickupLocation.trim() || undefined,
      totalPrice,
      depositAmount,
      remainingAmount,
    });
    setShowConfirmModal(false);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="py-8 sm:py-12 bg-forest-canvas min-h-screen pb-36">
      <div className="max-w-lotta mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="bg-forest-header text-white rounded-3xl p-6 sm:p-9 mb-8 border border-forest-title shadow-md">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-sage mb-2">
            326 HPI-CERTIFIED MULTILINGUAL GUIDES • BOOKING RESMI SATU PINTU • DP 30%
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
            {t.guidesHeader}
          </h1>
          <p className="text-sm sm:text-base text-forest-pill max-w-3xl leading-relaxed mb-6">
            {lang === "id"
              ? "Pesan paket perjalanan & pemandu resmi LOTTA dengan sistem harga transparan. Tentukan destinasi, tanggal, dan jumlah peserta di bawah ini untuk melihat simulasi total biaya serta rincian DP 30%."
              : lang === "en"
              ? "Book your official LOTTA trip & licensed guide with transparent pricing. Select your destination, date, and traveler count below to review the total estimated cost and 30% deposit requirement."
              : "Prenota il tuo tour LOTTA con prezzi trasparenti. Seleziona destinazione, data e partecipanti qui sotto per calcolare il costo totale e l'acconto del 30%."}
          </p>

          {/* 4-Step Progress Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-forest-title">
            <div className="p-3 rounded-2xl bg-forest-title/90 border border-forest-primary/40 flex items-center gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-lg bg-forest-primary text-white font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase text-white truncate">
                  {lang === "id" ? "1. Destinasi" : lang === "en" ? "1. Destination" : "1. Destinazione"}
                </div>
                <div className="text-[10px] text-forest-pill/80 truncate">24 Pilihan Resmi</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-forest-title/90 border border-forest-primary/40 flex items-center gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-lg bg-forest-primary text-white font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase text-white truncate">
                  {lang === "id" ? "2. Tanggal & Pax" : lang === "en" ? "2. Date & Pax" : "2. Data e Pax"}
                </div>
                <div className="text-[10px] text-forest-pill/80 truncate">Jadwal & Tamu</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-forest-title/90 border border-forest-primary/40 flex items-center gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-lg bg-forest-primary text-white font-extrabold text-xs flex items-center justify-center">
                3
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase text-white truncate">
                  {lang === "id" ? "3. Pilihan Guide" : lang === "en" ? "3. Guide Roster" : "3. Scelta Guida"}
                </div>
                <div className="text-[10px] text-forest-pill/80 truncate">326 Guide / Auto</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-forest-title/90 border border-forest-primary/40 flex items-center gap-2.5">
              <span className="shrink-0 w-6 h-6 rounded-lg bg-forest-primary text-white font-extrabold text-xs flex items-center justify-center">
                4
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase text-white truncate">
                  {lang === "id" ? "4. Rincian & DP" : lang === "en" ? "4. Price & DP" : "4. Prezzo e DP"}
                </div>
                <div className="text-[10px] text-forest-pill/80 truncate">Down Payment 30%</div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1: DESTINATION & PACKAGE SELECTOR */}
        <div className="bg-forest-alt border-2 border-forest-primary/40 rounded-2xl p-5 sm:p-6 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-forest-header text-forest-sage text-[11px] font-extrabold uppercase tracking-wider mb-2">
                {lang === "id"
                  ? "LANGKAH 1 • PILIH DESTINASI TUJUAN"
                  : lang === "en"
                  ? "STEP 1 • CHOOSE TARGET DESTINATION"
                  : "PASSO 1 • SELEZIONA DESTINAZIONE"}
              </div>
              <label
                htmlFor="top-route-select"
                className="block text-base sm:text-lg font-extrabold text-forest-header mb-1"
              >
                {lang === "id"
                  ? "Pilih Paket Destinasi Wisata Lombok:"
                  : lang === "en"
                  ? "Select Lombok Tour Package:"
                  : "Seleziona Itinerario di Lombok:"}
              </label>
              <div className="flex flex-wrap items-center gap-2 text-xs text-forest-body">
                <span>{formatRegency(activePackageObj.regency, lang)}</span>
                <span>•</span>
                <span className="font-bold text-forest-title">{formatDuration(activePackageObj.duration, lang)}</span>
                <span>•</span>
                <span className="font-extrabold text-forest-header bg-forest-card px-2 py-0.5 rounded-md">
                  {formatPrice(unitPrice, lang)} / {lang === "id" ? "orang" : lang === "en" ? "person" : "persona"}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-[480px]">
              <select
                id="top-route-select"
                value={activePackageObj.id}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-forest-primary text-sm font-bold text-forest-header shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-header"
              >
                {PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.destinationNames} — {formatPrice(pkg.priceIdr, lang)} ({formatDuration(pkg.duration, lang)})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 4 TABS DETAIL TRIP: TRIP OVERVIEW • INCLUSION & EXCLUSIONS • WHAT TO BRING • ITINERARY */}
        <div className="mb-8">
          <TripDetailTabs pkg={activePackageObj} lang={lang} />
        </div>

        {/* STEP 2: TRIP LOGISTICS & GUESTS (Interactive Booking Bar) */}
        <div className="bg-white border-2 border-forest-border rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-forest-title text-forest-sage text-[11px] font-extrabold uppercase tracking-wider mb-4">
            {lang === "id"
              ? "LANGKAH 2 • JADWAL & JUMLAH TAMU"
              : lang === "en"
              ? "STEP 2 • DATE & TRAVELERS"
              : "PASSO 2 • DATA E PARTECIPANTI"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Trip Date Picker */}
            <div>
              <label
                htmlFor="trip-date-input"
                className="block text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2"
              >
                {t.tripDateLabel}
              </label>
              <input
                id="trip-date-input"
                type="date"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-3.5 py-2.5 rounded-xl bg-forest-alt border border-forest-input text-sm font-bold text-forest-header focus:outline-none focus:ring-2 focus:ring-forest-primary"
              />
            </div>

            {/* Adults Counter */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2">
                {t.adultsLabel} ({formatPrice(unitPrice, lang)})
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-xl bg-forest-alt hover:bg-forest-card border border-forest-border text-forest-header font-extrabold text-lg flex items-center justify-center transition"
                  aria-label="Decrease adults"
                >
                  -
                </button>
                <div className="flex-1 text-center font-extrabold text-sm sm:text-base text-forest-header py-2 bg-forest-alt rounded-xl border border-forest-border">
                  {adults} {lang === "id" ? "Dewasa" : lang === "en" ? "Adults" : "Adulti"}
                </div>
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.min(20, prev + 1))}
                  className="w-10 h-10 rounded-xl bg-forest-alt hover:bg-forest-card border border-forest-border text-forest-header font-extrabold text-lg flex items-center justify-center transition"
                  aria-label="Increase adults"
                >
                  +
                </button>
              </div>
            </div>

            {/* Children Counter (50% Rate) */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2">
                {t.childrenLabel} (50%)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                  className="w-10 h-10 rounded-xl bg-forest-alt hover:bg-forest-card border border-forest-border text-forest-header font-extrabold text-lg flex items-center justify-center transition"
                  aria-label="Decrease children"
                >
                  -
                </button>
                <div className="flex-1 text-center font-extrabold text-sm sm:text-base text-forest-header py-2 bg-forest-alt rounded-xl border border-forest-border">
                  {children} {lang === "id" ? "Anak" : lang === "en" ? "Children" : "Bambini"}
                </div>
                <button
                  type="button"
                  onClick={() => setChildren((prev) => Math.min(10, prev + 1))}
                  className="w-10 h-10 rounded-xl bg-forest-alt hover:bg-forest-card border border-forest-border text-forest-header font-extrabold text-lg flex items-center justify-center transition"
                  aria-label="Increase children"
                >
                  +
                </button>
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <label
                htmlFor="pickup-location-input"
                className="block text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2"
              >
                {t.pickupLocationLabel}
              </label>
              <input
                id="pickup-location-input"
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder={t.pickupPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-forest-alt border border-forest-input text-xs sm:text-sm text-forest-header placeholder:text-forest-body/60 focus:outline-none focus:ring-2 focus:ring-forest-primary"
              />
            </div>
          </div>
        </div>

        <div className="phi-grid items-start">
          {/* Left Column (61.8%): STEP 3 — Guide Selection & 326 Guides Roster */}
          <div>
            {/* Guide Assignment Mode Selector */}
            <div
              id="guide-roster-list"
              className="bg-forest-alt border border-forest-border rounded-2xl p-5 sm:p-6 mb-6 space-y-5 scroll-mt-20"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-forest-header text-forest-sage text-[11px] font-extrabold uppercase tracking-wider mb-2">
                  {lang === "id"
                    ? "LANGKAH 3 • PILIH GUIDE ATAU AUTO-ASSIGN"
                    : lang === "en"
                    ? "STEP 3 • GUIDE SELECTION OR AUTO-ASSIGN"
                    : "PASSO 3 • SELEZIONA GUIDA"}
                </div>
                <h2 className="text-lg font-extrabold text-forest-header">
                  {lang === "id"
                    ? "Preferensi Pemandu Resmi LOTTA"
                    : lang === "en"
                    ? "Official LOTTA Guide Preference"
                    : "Preferenza Guida Ufficiale LOTTA"}
                </h2>
              </div>

              {/* Two Clear Mode Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedGuide(null)}
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    selectedGuide === null
                      ? "bg-forest-header text-white border-forest-header shadow-md"
                      : "bg-white text-forest-header border-forest-border hover:border-forest-primary"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider">
                      {lang === "id"
                        ? "Opsi A: Auto-Assign (Rekomendasi)"
                        : lang === "en"
                        ? "Option A: Auto-Assigned by LOTTA"
                        : "Opzione A: Assegnazione Automatica"}
                    </span>
                    {selectedGuide === null && (
                      <span className="px-2 py-0.5 rounded bg-forest-primary text-white text-[10px] font-extrabold">
                        {lang === "id" ? "AKTIF" : lang === "en" ? "ACTIVE" : "ATTIVA"}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      selectedGuide === null
                        ? "text-forest-pill"
                        : "text-forest-body"
                    }`}
                  >
                    {lang === "id"
                      ? "Paling praktis: Tim LOTTA akan menugaskan Guide berlisensi HPI terbaik yang siap dan fasih berbahasa sesuai kebutuhan Anda."
                      : lang === "en"
                      ? "Easiest: The LOTTA team will assign the top licensed HPI guide available for your date and preferred language."
                      : "La scelta più comoda: il team LOTTA assegnerà la migliore guida disponibile."}
                  </p>
                </button>

                <div
                  className={`p-4 rounded-xl border-2 text-left transition ${
                    selectedGuide !== null
                      ? "bg-forest-header text-white border-forest-header shadow-md"
                      : "bg-white text-forest-header border-forest-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider">
                      {lang === "id"
                        ? "Opsi B: Pilih Guide Spesifik"
                        : lang === "en"
                        ? "Option B: Pick from Roster"
                        : "Opzione B: Scegli dal Catalogo"}
                    </span>
                    {selectedGuide !== null && (
                      <span className="px-2 py-0.5 rounded bg-forest-primary text-white text-[10px] font-extrabold">
                        {lang === "id" ? "TERPILIH" : lang === "en" ? "SELECTED" : "SELEZIONATA"}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      selectedGuide !== null
                        ? "text-forest-pill"
                        : "text-forest-body"
                    }`}
                  >
                    {selectedGuide
                      ? `${selectedGuide.name} (${selectedGuide.specialty})`
                      : lang === "id"
                      ? "Klik '+ Pilih Guide Ini' pada kartu di bawah jika ingin mengajukan pemandu favorit tertentu."
                      : lang === "en"
                      ? "Click '+ Select This Guide' on any card below to request a specific guide."
                      : "Clicca '+ Seleziona Guida' per richiedere una guida specifica."}
                  </p>
                </div>
              </div>

              {/* Guide Filters & Search */}
              <div className="pt-4 border-t border-forest-border/80 space-y-4">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2">
                    {t.filterGenderLabel}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "all" as const, label: `${t.genderAll} (${ALL_GUIDES.length})` },
                      { value: "Female" as const, label: `${t.genderFemale} (${genderCounts.Female})` },
                      { value: "Male" as const, label: `${t.genderMale} (${genderCounts.Male})` },
                    ].map((btn) => (
                      <button
                        key={btn.value}
                        type="button"
                        onClick={() => {
                          setGenderFilter(btn.value);
                          setCurrentPage(1);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition ${
                          genderFilter === btn.value
                            ? "bg-forest-header text-white shadow-sm"
                            : "bg-white border border-forest-border text-forest-header hover:bg-forest-card"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="specialty-select"
                      className="block text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2"
                    >
                      {t.filterLangLabel}
                    </label>
                    <select
                      id="specialty-select"
                      value={specialtyFilter}
                      onChange={(e) => {
                        setSpecialtyFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-forest-input text-sm font-bold text-forest-header focus:outline-none focus:ring-2 focus:ring-forest-primary"
                    >
                      {SPECIALTY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {SPECIALTY_LABELS[opt]?.[lang] || opt}{" "}
                          ({opt === "All Languages / Specialties"
                            ? ALL_GUIDES.length
                            : specialtyCounts[opt] || 0})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="guide-search"
                      className="block text-xs font-extrabold uppercase tracking-wider text-forest-title mb-2"
                    >
                      {t.searchNamePlaceholder}
                    </label>
                    <input
                      id="guide-search"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder={t.searchNamePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-forest-input text-sm text-forest-header placeholder:text-forest-body/60 focus:outline-none focus:ring-2 focus:ring-forest-primary"
                    />
                  </div>
                </div>

                <div className="text-xs font-bold text-forest-body flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-forest-border/70">
                  <span>
                    {filteredGuides.length > 0 ? (
                      <>
                        {lang === "id"
                          ? `Menampilkan ${startIndex + 1}–${endIndex} dari ${filteredGuides.length} Guide`
                          : lang === "en"
                          ? `Showing ${startIndex + 1}–${endIndex} of ${filteredGuides.length} Guides`
                          : `Mostrando ${startIndex + 1}–${endIndex} di ${filteredGuides.length} Guide`}
                        {" • "}
                        <span className="text-forest-header font-extrabold">
                          {t.pageLabel} {safeCurrentPage} / {totalPages}
                        </span>
                      </>
                    ) : (
                      <span>
                        {lang === "id"
                          ? "0 Guide ditemukan"
                          : lang === "en"
                          ? "0 Guides found"
                          : "0 Guide trovate"}
                      </span>
                    )}
                  </span>
                  {hasActiveFilter && (
                    <button
                      type="button"
                      onClick={resetAllGuideFilters}
                      className="px-3 py-1 rounded-lg bg-forest-header text-white font-extrabold hover:bg-forest-title transition"
                    >
                      {lang === "id" ? "Reset Filter" : lang === "en" ? "Reset Filters" : "Reimposta"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Guides Grid / Empty State */}
            {displayedGuides.length === 0 ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-white border border-forest-border text-center space-y-3">
                <div className="font-extrabold text-base text-forest-header">
                  {lang === "id"
                    ? "Tidak ada pemandu yang cocok dengan filter"
                    : lang === "en"
                    ? "No guides match your filter criteria"
                    : "Nessuna guida corrisponde ai criteri"}
                </div>
                <p className="text-xs text-forest-body max-w-md mx-auto leading-relaxed">
                  {lang === "id"
                    ? "Silakan coba ubah kata kunci pencarian nama atau reset filter untuk menampilkan kembali seluruh 326 pemandu resmi."
                    : lang === "en"
                    ? "Try adjusting your search query or reset the filter to browse the full 326 official guide roster."
                    : "Prova a modificare la ricerca o reimposta i filtri per vedere tutte le 326 guide."}
                </p>
                <button
                  type="button"
                  onClick={resetAllGuideFilters}
                  className="px-4 py-2 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold transition shadow-sm"
                >
                  {lang === "id"
                    ? "Tampilkan Semua 326 Guide"
                    : lang === "en"
                    ? "Show All 326 Guides"
                    : "Mostra Tutte le 326 Guide"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayedGuides.map((guide) => {
                  const isSelected = selectedGuide?.id === guide.id;
                  return (
                    <div
                      key={guide.id}
                      className={`p-4 sm:p-5 rounded-2xl border-2 transition flex flex-col justify-between gap-4 ${
                        isSelected
                          ? "bg-forest-card/90 border-forest-header shadow-md"
                          : "bg-white border-forest-border hover:border-forest-primary"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-extrabold text-sm sm:text-base text-forest-header leading-snug">
                            {guide.name}
                          </div>
                          {isSelected && (
                            <span className="shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-forest-header text-white">
                              {lang === "id" ? "Terpilih" : lang === "en" ? "Selected" : "Scelta"}
                            </span>
                          )}
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs">
                          <span className="font-semibold text-forest-title">
                            {guide.gender === "Female"
                              ? lang === "id"
                                ? "Pemandu Wanita"
                                : lang === "en"
                                ? "Female Guide"
                                : "Guida Donna"
                              : lang === "id"
                              ? "Pemandu Pria"
                              : lang === "en"
                              ? "Male Guide"
                              : "Guida Uomo"}
                          </span>
                          <span className="text-forest-border">•</span>
                          <span className="text-[11px] font-bold text-forest-body">
                            Lisensi HPI NTB
                          </span>
                        </div>

                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {guide.specialties.map((spec) => (
                            <span
                              key={spec}
                              className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-forest-pill text-forest-title border border-forest-border/60"
                            >
                              {SPECIALTY_LABELS[spec]?.[lang] || spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedGuide(null);
                          } else {
                            setSelectedGuide(guide);
                          }
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl font-extrabold text-xs transition uppercase tracking-wider ${
                          isSelected
                            ? "bg-forest-header text-white hover:bg-forest-title"
                            : "bg-forest-alt hover:bg-forest-primary text-forest-header hover:text-white border border-forest-border"
                        }`}
                      >
                        {isSelected
                          ? lang === "id"
                            ? "✓ Guide Terpilih (Klik untuk Batal)"
                            : lang === "en"
                            ? "✓ Selected (Click to Remove)"
                            : "✓ Selezionata (Clicca per Rimuovere)"
                          : lang === "id"
                          ? "+ Pilih Guide Ini"
                          : lang === "en"
                          ? "+ Select This Guide"
                          : "+ Seleziona Guida"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav
                aria-label="Navigasi Halaman Guide"
                className="mt-6 p-3.5 sm:p-4 rounded-2xl bg-white border border-forest-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3"
              >
                {/* Previous & Next Buttons Wrapper for Mobile (side-by-side) / Desktop */}
                <div className="flex items-center justify-between gap-2 w-full sm:w-auto order-2 sm:order-1">
                  <button
                    type="button"
                    disabled={safeCurrentPage <= 1}
                    onClick={() => handlePageChange(safeCurrentPage - 1)}
                    className={`flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                      safeCurrentPage <= 1
                        ? "bg-forest-alt text-forest-body/40 cursor-not-allowed border border-forest-border/40"
                        : "bg-forest-alt hover:bg-forest-header hover:text-white text-forest-header border border-forest-border shadow-sm"
                    }`}
                  >
                    <span>←</span>
                    <span>{t.pagePrevBtn}</span>
                  </button>

                  <button
                    type="button"
                    disabled={safeCurrentPage >= totalPages}
                    onClick={() => handlePageChange(safeCurrentPage + 1)}
                    className={`sm:hidden flex-1 px-3.5 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                      safeCurrentPage >= totalPages
                        ? "bg-forest-alt text-forest-body/40 cursor-not-allowed border border-forest-border/40"
                        : "bg-forest-alt hover:bg-forest-header hover:text-white text-forest-header border border-forest-border shadow-sm"
                    }`}
                  >
                    <span>{t.pageNextBtn}</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Page Number Pills (Smart Windowing) */}
                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center order-1 sm:order-2">
                  {paginationRange.map((item, idx) => {
                    if (typeof item === "string") {
                      return (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-1.5 py-1 text-xs font-bold text-forest-body/60 select-none"
                        >
                          …
                        </span>
                      );
                    }
                    const isActive = item === safeCurrentPage;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handlePageChange(item)}
                        aria-current={isActive ? "page" : undefined}
                        className={`min-w-[34px] sm:min-w-[36px] h-9 px-2 rounded-xl text-xs font-extrabold transition flex items-center justify-center ${
                          isActive
                            ? "bg-forest-primary text-white shadow-md font-black"
                            : "bg-forest-canvas hover:bg-forest-card text-forest-header border border-forest-border/80"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                {/* Next Button (Desktop) */}
                <button
                  type="button"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  className={`hidden sm:flex px-4 py-2.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition items-center justify-center gap-1.5 order-3 ${
                    safeCurrentPage >= totalPages
                      ? "bg-forest-alt text-forest-body/40 cursor-not-allowed border border-forest-border/40"
                      : "bg-forest-alt hover:bg-forest-header hover:text-white text-forest-header border border-forest-border shadow-sm"
                  }`}
                >
                  <span>{t.pageNextBtn}</span>
                  <span>→</span>
                </button>
              </nav>
            )}
          </div>

          {/* Right Column (38.2%): STEP 4 — Price Breakdown & WhatsApp Confirmation Panel */}
          <aside
            id="booking-summary-panel"
            className="bg-forest-header text-white rounded-3xl p-6 sm:p-8 border border-forest-title shadow-xl lg:sticky lg:top-24 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-forest-title text-forest-sage text-[11px] font-extrabold uppercase tracking-wider mb-3">
                {lang === "id"
                  ? "LANGKAH 4 • RINCIAN BIAYA & DP 30%"
                  : lang === "en"
                  ? "STEP 4 • PRICE BREAKDOWN & 30% DP"
                  : "PASSO 4 • DETTAGLIO PREZZO E DP"}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                {t.priceBreakdownTitle}
              </h2>
              <p className="text-xs text-forest-pill/90 leading-relaxed">
                {lang === "id"
                  ? "Berikut simulasi resmi pesanan Anda. Untuk mengamankan slot perjalanan dan Guide, pembayaran Down Payment (DP) sebesar 30% dibayarkan via transfer bank."
                  : lang === "en"
                  ? "Official summary of your reservation. To confirm your trip and lock in your guide, a 30% Down Payment is required via bank transfer."
                  : "Riepilogo ufficiale della prenotazione con acconto del 30%."}
              </p>
            </div>

            {/* Selected Route & Guide Summary */}
            <div className="p-4 rounded-2xl bg-forest-title border border-forest-primary/50 space-y-3">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-forest-sage">
                  {lang === "id" ? "Destinasi Terpilih:" : "Selected Destination:"}
                </div>
                <div className="font-extrabold text-sm text-white mt-0.5">
                  {activePackageObj.destinationNames}
                </div>
                <div className="text-xs text-forest-pill">
                  {formatDuration(activePackageObj.duration, lang)} • {formatRegency(activePackageObj.regency, lang)}
                </div>
              </div>

              <div className="pt-2 border-t border-forest-primary/40 flex items-center justify-between text-xs">
                <span className="text-forest-sage font-bold">{t.tripDateLabel}:</span>
                <span className="font-extrabold text-white">{tripDate || "-"}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-forest-sage font-bold">{t.guestsLabel}:</span>
                <span className="font-extrabold text-white">
                  {adults} {lang === "id" ? "Dewasa" : "Adults"}
                  {children > 0 && `, ${children} ${lang === "id" ? "Anak" : "Children"}`}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-forest-sage font-bold">Guide:</span>
                <span className="font-extrabold text-forest-sage text-right truncate max-w-[180px]">
                  {selectedGuide ? selectedGuide.name : t.teamAssignedOption}
                </span>
              </div>
            </div>

            {/* Price Calculation Card */}
            <div className="p-5 rounded-2xl bg-white text-forest-header space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-xs">
                <span className="text-forest-body">
                  {t.pricePerPerson} ({adults}x):
                </span>
                <span className="font-bold">{formatPrice(adultsTotal, lang)}</span>
              </div>

              {children > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-forest-body">
                    Anak-anak (50% x {children}):
                  </span>
                  <span className="font-bold">{formatPrice(childrenTotal, lang)}</span>
                </div>
              )}

              <div className="pt-2 border-t border-forest-border flex items-baseline justify-between">
                <span className="text-xs font-extrabold text-forest-header uppercase">
                  {t.totalPriceLabel}:
                </span>
                <span className="text-lg sm:text-xl font-extrabold text-forest-header">
                  {formatPrice(totalPrice, lang)}
                </span>
              </div>

              {/* DP 30% Box */}
              <div className="p-3 rounded-xl bg-forest-pill border border-forest-border space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-forest-title">
                    {t.deposit30Label}:
                  </span>
                  <span className="font-extrabold text-forest-title text-base">
                    {formatPrice(depositAmount, lang)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-forest-body">
                  <span>{t.balance70Label}:</span>
                  <span className="font-bold">{formatPrice(remainingAmount, lang)}</span>
                </div>
              </div>
            </div>

            {/* Official Bank Mandiri Copy Box */}
            <div className="p-4 rounded-2xl bg-forest-title/80 border border-forest-primary/50 text-xs space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-forest-sage">
                {t.bankTransferTitle}
              </div>
              <div className="flex items-center justify-between gap-2 bg-forest-header p-2.5 rounded-xl border border-forest-sage/30">
                <div className="min-w-0">
                  <div className="text-[11px] text-forest-pill">Bank Mandiri</div>
                  <div className="font-extrabold text-sm tracking-wide text-white font-mono">
                    1610007723179
                  </div>
                  <div className="text-[10px] text-forest-sage truncate">
                    a.n MUHAMMAD ZEA AL GHIF
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyBank}
                  className="shrink-0 px-3 py-2 rounded-lg bg-forest-primary hover:bg-forest-hover text-white text-[11px] font-extrabold transition shadow-sm"
                >
                  {copiedBank ? t.copiedNotice : t.copyAccountBtn}
                </button>
              </div>
              <p className="text-[10px] text-forest-pill/80 leading-normal">
                {lang === "id"
                  ? "*Bukti transfer DP 30% dapat dikirimkan langsung ke WhatsApp Tim LOTTA saat mengonfirmasi pesanan."
                  : "*Transfer receipt for the 30% deposit can be shared directly via WhatsApp upon confirmation."}
              </p>
            </div>

            {/* WhatsApp CTA Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-4 px-5 rounded-2xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-sm tracking-wide transition shadow-lg"
              >
                {t.sendWhatsAppBtn} →
              </button>
              <p className="text-[11px] text-center text-forest-sage/90 mt-2.5">
                {lang === "id"
                  ? "Anda akan melihat layar pratinjau konfirmasi sebelum membuka WhatsApp."
                  : lang === "en"
                  ? "Review confirmation summary before opening WhatsApp."
                  : "Verifica l'anteprima prima di aprire WhatsApp."}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE FLOATING SUMMARY DOCK (Total + DP 30% + WhatsApp Button) */}
      <div className="lg:hidden fixed bottom-[64px] inset-x-0 z-30 px-3 pb-2 pointer-events-none">
        <div className="max-w-lg mx-auto bg-forest-header text-white border-2 border-forest-sage/60 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 pointer-events-auto">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-forest-sage truncate">
              {activePackageObj.destinationNames}
            </div>
            <div className="text-xs font-extrabold text-white">
              Total: {formatPrice(totalPrice, lang)}
            </div>
            <div className="text-[10px] text-forest-pill truncate">
              DP 30%: {formatPrice(depositAmount, lang)} • {adults} Pax
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold shadow-md transition"
          >
            {lang === "id" ? "Pesan via WA →" : "Book via WA →"}
          </button>
        </div>
      </div>

      {/* CONFIRMATION PREVIEW MODAL */}
      {showConfirmModal && (
        <div
          className="fixed inset-0 z-50 bg-forest-header/80 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-booking-title"
        >
          <div className="bg-forest-canvas border-2 border-forest-primary rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-1">
              {t.confirmWhatsAppModalTitle}
            </div>
            <h3
              id="confirm-booking-title"
              className="text-xl sm:text-2xl font-extrabold text-forest-header mb-2"
            >
              {lang === "id"
                ? "Ringkasan Resmi Pesanan Perjalanan"
                : lang === "en"
                ? "Official Trip Reservation Summary"
                : "Riepilogo Ufficiale della Prenotazione"}
            </h3>
            <p className="text-xs sm:text-sm text-forest-body mb-5">
              {t.confirmWhatsAppModalSub}
            </p>

            <div className="p-4 rounded-2xl bg-white border border-forest-border space-y-3 text-xs sm:text-sm mb-6">
              <div>
                <span className="text-[11px] font-extrabold uppercase text-forest-primary block">
                  1. Destinasi & Durasi:
                </span>
                <span className="font-extrabold text-forest-header">
                  {activePackageObj.destinationNames} ({formatDuration(activePackageObj.duration, lang)})
                </span>
              </div>

              <div className="pt-2 border-t border-forest-border/60">
                <span className="text-[11px] font-extrabold uppercase text-forest-primary block">
                  2. Tanggal & Peserta:
                </span>
                <span className="font-extrabold text-forest-header">
                  {tripDate || "-"} • {adults} Dewasa{children > 0 && `, ${children} Anak`}
                </span>
                {pickupLocation.trim() && (
                  <div className="text-xs text-forest-body mt-0.5">
                    Penjemputan: {pickupLocation.trim()}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-forest-border/60">
                <span className="text-[11px] font-extrabold uppercase text-forest-primary block">
                  3. Guide Resmi:
                </span>
                <span className="font-extrabold text-forest-header">
                  {selectedGuide
                    ? `${selectedGuide.name} (${selectedGuide.specialty})`
                    : t.teamAssignedOption}
                </span>
              </div>

              <div className="pt-2 border-t border-forest-border/60">
                <span className="text-[11px] font-extrabold uppercase text-forest-primary block">
                  4. Rincian Biaya & DP 30%:
                </span>
                <div className="font-extrabold text-forest-header text-sm">
                  Total: {formatPrice(totalPrice, lang)}
                </div>
                <div className="text-xs font-bold text-forest-title mt-0.5">
                  Down Payment (DP 30%): {formatPrice(depositAmount, lang)}
                </div>
                <div className="text-[11px] text-forest-body">
                  Sisa Pelunasan (70%): {formatPrice(remainingAmount, lang)}
                </div>
                <div className="text-[11px] text-forest-body mt-1 font-mono">
                  Rek. Mandiri: 1610007723179 (MUHAMMAD ZEA AL GHIF)
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-forest-pill hover:bg-forest-card text-forest-header font-extrabold text-xs uppercase tracking-wider transition"
              >
                {lang === "id" ? "← Ubah Pilihan" : "← Edit Selection"}
              </button>
              <button
                type="button"
                onClick={handleConfirmWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white font-extrabold text-xs uppercase tracking-wider transition shadow-md"
              >
                {lang === "id" ? "Ya, Buka WhatsApp LOTTA →" : "Yes, Open WhatsApp →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GuidesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-forest-header font-bold text-sm">
          Loading LOTTA Guides...
        </div>
      }
    >
      <GuidesContent />
    </Suspense>
  );
}
