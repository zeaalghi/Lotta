export type Lang = "id" | "en" | "it";

export interface StoryTrailer {
  id: string;
  packageId?: string;
  pillar: "mountain" | "beach" | "heritage";
  regency: string;
  destinationName: string;
  image: string;
  elevationOrDepth: string;
  title: Record<Lang, string>;
  summary38: Record<Lang, string>;
  hook38Full: Record<Lang, string>;
  locked62Clue: Record<Lang, string>;
  relatedPackageTitle: string;
}

export interface DestinationPackage {
  id: string;
  pillar: "mountain" | "beach" | "heritage";
  subCategory: string;
  regency: string;
  destinationNames: string;
  badge: Record<Lang, string>;
  duration: string;
  image: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
  highlights: Record<Lang, string[]>;
  storyTeaser: Record<Lang, string>;
  priceIdr: number;
}

export const SPECIALTY_OPTIONS = [
  "All Languages / Specialties",
  "English Guide",
  "Italian Guide",
  "Indonesian Guide",
  "Komodo Adventure and Sailing Guide",
  "Malay Guide",
  "German Guide",
  "Arabic Guide",
  "Korean Guide",
  "Mandarin Guide",
  "Spanish Guide",
  "French Guide",
  "Japanese Guide",
  "Dutch Guide",
  "Russian Guide",
] as const;

export const SPECIALTY_LABELS: Record<string, Record<Lang, string>> = {
  "All Languages / Specialties": {
    id: "Semua Bahasa / Spesialisasi",
    en: "All Languages / Specialties",
    it: "Tutte le Lingue / Specialità",
  },
  "English Guide": {
    id: "Pemandu Bahasa Inggris",
    en: "English Guide",
    it: "Guida Lingua Inglese",
  },
  "Italian Guide": {
    id: "Pemandu Bahasa Italia",
    en: "Italian Guide",
    it: "Guida Lingua Italiana",
  },
  "Indonesian Guide": {
    id: "Pemandu Bahasa Indonesia / Sasak",
    en: "Indonesian / Sasak Guide",
    it: "Guida Indonesiano / Sasak",
  },
  "Komodo Adventure and Sailing Guide": {
    id: "Pemandu Pelayaran & Komodo",
    en: "Komodo Sailing & Adventure Guide",
    it: "Guida Nautica e Komodo",
  },
  "Malay Guide": {
    id: "Pemandu Bahasa Melayu",
    en: "Malay Guide",
    it: "Guida Lingua Malese",
  },
  "German Guide": {
    id: "Pemandu Bahasa Jerman",
    en: "German Guide",
    it: "Guida Lingua Tedesca",
  },
  "Arabic Guide": {
    id: "Pemandu Bahasa Arab",
    en: "Arabic Guide",
    it: "Guida Lingua Araba",
  },
  "Korean Guide": {
    id: "Pemandu Bahasa Korea",
    en: "Korean Guide",
    it: "Guida Lingua Coreana",
  },
  "Mandarin Guide": {
    id: "Pemandu Bahasa Mandarin",
    en: "Mandarin Guide",
    it: "Guida Lingua Mandarino",
  },
  "Spanish Guide": {
    id: "Pemandu Bahasa Spanyol",
    en: "Spanish Guide",
    it: "Guida Lingua Spagnola",
  },
  "French Guide": {
    id: "Pemandu Bahasa Prancis",
    en: "French Guide",
    it: "Guida Lingua Francese",
  },
  "Japanese Guide": {
    id: "Pemandu Bahasa Jepang",
    en: "Japanese Guide",
    it: "Guida Lingua Giapponese",
  },
  "Dutch Guide": {
    id: "Pemandu Bahasa Belanda",
    en: "Dutch Guide",
    it: "Guida Lingua Olandese",
  },
  "Russian Guide": {
    id: "Pemandu Bahasa Rusia",
    en: "Russian Guide",
    it: "Guida Lingua Russa",
  },
};

export function formatRegency(regency: string, lang: Lang): string {
  if (!regency) return "";
  if (lang === "en") {
    return regency
      .replace(/Kab\.\s+Lombok\s+Timur/gi, "East Lombok Regency")
      .replace(/Kab\.\s+Lombok\s+Tengah/gi, "Central Lombok Regency")
      .replace(/Kab\.\s+Lombok\s+Barat/gi, "West Lombok Regency")
      .replace(/Kab\.\s+Lombok\s+Utara/gi, "North Lombok Regency")
      .replace(/Kota\s+Mataram/gi, "Mataram City");
  }
  if (lang === "it") {
    return regency
      .replace(/Kab\.\s+Lombok\s+Timur/gi, "Distretto di Lombok Est")
      .replace(/Kab\.\s+Lombok\s+Tengah/gi, "Distretto di Lombok Centrale")
      .replace(/Kab\.\s+Lombok\s+Barat/gi, "Distretto di Lombok Ovest")
      .replace(/Kab\.\s+Lombok\s+Utara/gi, "Distretto di Lombok Nord")
      .replace(/Kota\s+Mataram/gi, "Città di Mataram");
  }
  return regency;
}

export function formatDuration(duration: string, lang: Lang): string {
  if (!duration) return "";
  if (lang === "id") {
    return duration
      .replace(/Overnight Camping/gi, "Camping Menginap")
      .replace(/Day Trip/gi, "Tur Harian")
      .replace(/Half Day/gi, "Setengah Hari")
      .replace(/Full Day/gi, "Sehari Penuh")
      .replace(/Island Hopping/gi, "Jelajah Antarpulau")
      .replace(/Coastal Beach/gi, "Wisata Pesisir")
      .replace(/Heritage/gi, "Heritage Budaya");
  }
  if (lang === "it") {
    return duration
      .replace(/Overnight Camping/gi, "Tenda Notturna")
      .replace(/Day Trip/gi, "Escursione Giornaliera")
      .replace(/Half Day/gi, "Mezza Giornata")
      .replace(/Full Day/gi, "Giornata Intera")
      .replace(/Island Hopping/gi, "Giro delle Isole")
      .replace(/Coastal Beach/gi, "Spiaggia e Costa")
      .replace(/Heritage/gi, "Patrimonio Storico");
  }
  return duration;
}

export function formatPrice(priceIdr: number, lang: Lang): string {
  if (lang === "en") {
    return `IDR ${priceIdr.toLocaleString("en-US")}`;
  }
  if (lang === "it") {
    return `IDR ${priceIdr.toLocaleString("it-IT")}`;
  }
  return `Rp ${priceIdr.toLocaleString("id-ID")}`;
}

export const UI_TEXT: Record<
  Lang,
  {
    navHome: string;
    navStories: string;
    navExplore: string;
    navWeather: string;
    navGuides: string;
    heroTag: string;
    heroTitle: string;
    heroSubtitle: string;
    btnExplore: string;
    btnFindGuide: string;
    liveStatusLabel: string;
    storiesHeader: string;
    storiesSub: string;
    readTrailerLink: string;
    pillarsHeader: string;
    pillarsSub: string;
    pillarMountain: string;
    pillarBeach: string;
    pillarHeritage: string;
    selectRouteLink: string;
    weatherHeader: string;
    weatherSub: string;
    zoneSummit: string;
    zoneSouth: string;
    zoneGili: string;
    guidesHeader: string;
    guidesSub: string;
    filterGenderLabel: string;
    genderAll: string;
    genderFemale: string;
    genderMale: string;
    filterLangLabel: string;
    searchNamePlaceholder: string;
    bookWithLottaBtn: string;
    bookingPanelTitle: string;
    bookingPanelSub: string;
    selectPackageLabel: string;
    selectedGuideLabel: string;
    teamAssignedOption: string;
    sendWhatsAppBtn: string;
    showingCount: string;
    loadMoreBtn: string;
    pagePrevBtn: string;
    pageNextBtn: string;
    pageLabel: string;
    viewAllStoriesBtn: string;
    viewAllDestinationsBtn: string;
    tripDateLabel: string;
    guestsLabel: string;
    adultsLabel: string;
    childrenLabel: string;
    pickupLocationLabel: string;
    pickupPlaceholder: string;
    priceBreakdownTitle: string;
    pricePerPerson: string;
    totalPriceLabel: string;
    deposit30Label: string;
    balance70Label: string;
    bankTransferTitle: string;
    copyAccountBtn: string;
    copiedNotice: string;
    confirmWhatsAppModalTitle: string;
    confirmWhatsAppModalSub: string;
    viewTripDetailBtn: string;
    oralHeritageLabel: string;
    oralHeritageSOP: string;
    exploreStoryCatalogLink: string;
    tourPackageAvailableBadge: string;
  }
> = {
  id: {
    navHome: "Beranda",
    navStories: "Katalog Cerita",
    navExplore: "Semua Destinasi",
    navWeather: "Cuaca & Ombak",
    navGuides: "Pesan Pemandu",
    heroTag: "LAUT • GUNUNG • HERITAGE LOMBOK",
    heroTitle: "BEYOND THE HORIZON OF LOMBOK: LIVING HERITAGE, UNTOLD STORIES.",
    heroSubtitle:
      "Jelajahi seluruh destinasi Gunung & Bukit menginap, Pantai per Kabupaten, dan Desa Heritage Budaya Lombok. Baca pengantar kisah lokalnya di sini, pantau cuaca puncak Rinjani & tinggi ombak pantai secara real-time, lalu dengarkan cerita utuhnya langsung bersama Guide LOTTA di lokasi.",
    btnExplore: "Lihat Semua Destinasi",
    btnFindGuide: "Pesan Pemandu Resmi",
    liveStatusLabel: "PANTAUAN CUACA & OMBAK REAL-TIME",
    storiesHeader: "Katalog Cerita Lokal & Legenda Destinasi Lombok",
    storiesSub: "Pengantar kisah di tiap destinasi — cerita utuhnya dituturkan langsung oleh Guide LOTTA saat Anda tiba di lokasi",
    readTrailerLink: "Baca Pengantar Cerita",
    pillarsHeader: "Daftar Lengkap Semua Destinasi Wisata Lombok",
    pillarsSub:
      "Seluruh program Gunung & Bukit dikemas wajib menginap (camping). Destinasi Laut/Pantai dan Heritage Budaya ditulis lengkap per Kabupaten.",
    pillarMountain: "Gunung & Bukit (Semua Menginap)",
    pillarBeach: "Laut & Pantai (Per Kabupaten)",
    pillarHeritage: "Heritage Budaya (Per Kabupaten)",
    selectRouteLink: "Lihat Detail & Pilih Destinasi",
    weatherHeader: "Telemetri Cuaca Puncak Rinjani & Gelombang Pantai",
    weatherSub:
      "Data meteorologi dan gelombang laut real-time berdasarkan koordinat Puncak Rinjani, pesisir selatan Lombok Tengah, dan perairan Gili.",
    zoneSummit: "Puncak Rinjani & Sembalun",
    zoneSouth: "Pantai Selatan (Lombok Tengah)",
    zoneGili: "Perairan Gili (Utara & Timur)",
    guidesHeader: "Jelajahi Lombok Bersama Pemandu Lokal Terverifikasi",
    guidesSub:
      "Pesan perjalanan privat dan pemandu berlisensi resmi HPI dengan transparansi penuh. Tentukan destinasi, jadwal, dan preferensi bahasa untuk pengalaman berwisata yang aman, nyaman, dan berkesan.",
    filterGenderLabel: "Preferensi Gender Guide",
    genderAll: "Semua Gender",
    genderFemale: "Female Guide (Wanita)",
    genderMale: "Male Guide (Pria)",
    filterLangLabel: "Bahasa / Spesialisasi Pemandu",
    searchNamePlaceholder: "Cari nama pemandu...",
    bookWithLottaBtn: "Pilih via LOTTA",
    bookingPanelTitle: "Konfigurasi Destinasi & Pemandu LOTTA",
    bookingPanelSub:
      "Tim LOTTA akan menugaskan pemandu berlisensi terbaik sesuai preferensi bahasa & gender Anda, atau pilih nama pemandu tertentu dari katalog.",
    selectPackageLabel: "1. Pilih Destinasi Gunung, Pantai, atau Heritage",
    selectedGuideLabel: "2. Preferensi Personel Guide",
    teamAssignedOption: "Ditugaskan Otomatis oleh Tim LOTTA (Sesuai Gender & Bahasa)",
    sendWhatsAppBtn: "Kirim Permintaan Resmi ke Tim LOTTA",
    showingCount: "Menampilkan",
    loadMoreBtn: "Tampilkan Lebih Banyak Guide",
    pagePrevBtn: "Sebelumnya",
    pageNextBtn: "Berikutnya",
    pageLabel: "Halaman",
    viewAllStoriesBtn: "Lihat Semua 12 Cerita Destinasi",
    viewAllDestinationsBtn: "Lihat Semua 24 Destinasi Lengkap",
    tripDateLabel: "Tanggal Perjalanan",
    guestsLabel: "Jumlah Tamu & Peserta",
    adultsLabel: "Dewasa",
    childrenLabel: "Anak-anak (di bawah 12 thn)",
    pickupLocationLabel: "Lokasi Penjemputan",
    pickupPlaceholder: "Nama Hotel di Lombok / Bandara LOP / Pelabuhan...",
    priceBreakdownTitle: "Rincian Biaya & Ketentuan Pembayaran",
    pricePerPerson: "Harga per orang",
    totalPriceLabel: "Total Estimasi Biaya",
    deposit30Label: "Down Payment / DP (30%)",
    balance70Label: "Pelunasan Saat Mulai Trip (70%)",
    bankTransferTitle: "Rekening Resmi Pembayaran DP",
    copyAccountBtn: "Salin No. Rekening Mandiri",
    copiedNotice: "Nomor Rekening Berhasil Disalin!",
    confirmWhatsAppModalTitle: "Konfirmasi Pesanan Perjalanan LOTTA",
    confirmWhatsAppModalSub: "Periksa kembali rincian perjalanan Anda di bawah ini sebelum dialihkan ke WhatsApp resmi Tim LOTTA.",
    viewTripDetailBtn: "Detail Trip →",
    oralHeritageLabel: "Kisah Tradisi Lisan & Latar Belakang Budaya",
    oralHeritageSOP: "SOP Panduan Budaya LOTTA: Di lokasi destinasi, Pemandu Resmi HPI Anda akan menuturkan secara langsung sejarah lisan, filosofi penamaan bukit/pantai, serta tata krama adat Sasak yang hidup di kawasan ini.",
    exploreStoryCatalogLink: "Lihat Seluruh 12 Kisah Budaya di Katalog Cerita",
    tourPackageAvailableBadge: "Paket Tur Tersedia",
  },
  en: {
    navHome: "Home",
    navStories: "Story Catalog",
    navExplore: "All Destinations",
    navWeather: "Weather & Wave",
    navGuides: "Book a Guide",
    heroTag: "SEA • MOUNTAIN • HERITAGE OF LOMBOK",
    heroTitle: "BEYOND THE HORIZON OF LOMBOK: LIVING HERITAGE, UNTOLD STORIES.",
    heroSubtitle:
      "Explore every overnight mountain peak, regency beach, and cultural heritage village across Lombok. Read the opening local stories here, check live Rinjani weather & coastal swells, and experience the full oral history on-site with your LOTTA Guide.",
    btnExplore: "View All Destinations",
    btnFindGuide: "Book Certified Local Guide",
    liveStatusLabel: "LIVE WEATHER & SWELL TELEMETRY",
    storiesHeader: "Lombok Local Stories & Destination Legends Catalog",
    storiesSub: "Opening stories from each destination — the complete oral history is shared live on-site by your LOTTA Guide",
    readTrailerLink: "Read Opening Story",
    pillarsHeader: "Complete Directory of Lombok Destinations",
    pillarsSub:
      "All Mountain & Hill programs are strictly overnight camping experiences. Coastal Beaches and Cultural Heritage destinations are listed in full by Regency.",
    pillarMountain: "Mountains & Hills (All Overnight)",
    pillarBeach: "Sea & Beaches (By Regency)",
    pillarHeritage: "Cultural Heritage (By Regency)",
    selectRouteLink: "View Details & Select Destination",
    weatherHeader: "Live Rinjani Summit Weather & Coastal Wave Intelligence",
    weatherSub:
      "Real-time meteorological and marine wave data powered by exact coordinates for Mount Rinjani, Central Lombok South Coast, and the Gili Islands.",
    zoneSummit: "Rinjani Summit & Sembalun",
    zoneSouth: "South Swell (Central Lombok)",
    zoneGili: "Gili Waters (North & East)",
    guidesHeader: "Explore Lombok with Certified Local Hosts",
    guidesSub:
      "Book your private journey and HPI-certified local host with full price transparency. Choose your destination, dates, and language preference for an authentic, worry-free Lombok adventure.",
    filterGenderLabel: "Guide Gender Preference",
    genderAll: "All Genders",
    genderFemale: "Female Guide",
    genderMale: "Male Guide",
    filterLangLabel: "Guide Language / Specialty",
    searchNamePlaceholder: "Search guide name...",
    bookWithLottaBtn: "Request via LOTTA",
    bookingPanelTitle: "LOTTA Destination & Guide Assignment",
    bookingPanelSub:
      "Let the LOTTA concierge assign the best available guide based on your language & gender preference, or request a specific guide from our roster.",
    selectPackageLabel: "1. Select Mountain, Beach, or Heritage Destination",
    selectedGuideLabel: "2. Guide Assignment Preference",
    teamAssignedOption: "Curated & Assigned by LOTTA (Matched by Gender & Language)",
    sendWhatsAppBtn: "Send Official Request to LOTTA Team",
    showingCount: "Showing",
    loadMoreBtn: "Load More Guides",
    pagePrevBtn: "Previous",
    pageNextBtn: "Next",
    pageLabel: "Page",
    viewAllStoriesBtn: "Explore All 12 Destination Stories",
    viewAllDestinationsBtn: "Explore All 24 Destinations",
    tripDateLabel: "Trip Date",
    guestsLabel: "Guests & Travelers",
    adultsLabel: "Adults",
    childrenLabel: "Children (under 12)",
    pickupLocationLabel: "Pickup Location",
    pickupPlaceholder: "Hotel in Lombok / Airport (LOP) / Harbor...",
    priceBreakdownTitle: "Price Breakdown & Payment Terms",
    pricePerPerson: "Price per person",
    totalPriceLabel: "Total Estimated Price",
    deposit30Label: "Down Payment / DP (30%)",
    balance70Label: "Balance Due on Tour Day (70%)",
    bankTransferTitle: "Official Bank Account for Deposit",
    copyAccountBtn: "Copy Mandiri Account",
    copiedNotice: "Account Number Copied!",
    confirmWhatsAppModalTitle: "Confirm Your LOTTA Trip Booking",
    confirmWhatsAppModalSub: "Please review your booking summary below before proceeding to the official LOTTA WhatsApp channel.",
    viewTripDetailBtn: "Trip Details →",
    oralHeritageLabel: "Living Oral Tradition & Cultural Heritage",
    oralHeritageSOP: "LOTTA Cultural SOP: On-site at the destination, your licensed HPI guide will personally share the oral history, sacred place-name origins, and living Sasak customs of this landscape.",
    exploreStoryCatalogLink: "Browse All 12 Cultural Stories in Catalog",
    tourPackageAvailableBadge: "Official Tour",
  },
  it: {
    navHome: "Home",
    navStories: "Catalogo Storie",
    navExplore: "Destinazioni",
    navWeather: "Meteo e Onde",
    navGuides: "Prenota Guida",
    heroTag: "MARE • MONTAGNA • PATRIMONIO DI LOMBOK",
    heroTitle: "BEYOND THE HORIZON OF LOMBOK: LIVING HERITAGE, UNTOLD STORIES.",
    heroSubtitle:
      "Esplora tutte le vette con pernottamento, le spiagge per distretto e i villaggi storici di Lombok. Leggi qui l'introduzione alle storie locali, controlla il meteo della vetta Rinjani e le onde in tempo reale, e ascolta la storia completa sul posto con la tua guida LOTTA.",
    btnExplore: "Tutte le Destinazioni",
    btnFindGuide: "Prenota Guida Certificata",
    liveStatusLabel: "METEO E ONDE IN TEMPO REALE",
    storiesHeader: "Catalogo delle Storie Locali e Leggende di Lombok",
    storiesSub: "Storie introduttive per ogni destinazione — il racconto completo è condiviso dal vivo sul posto dalla tua guida LOTTA",
    readTrailerLink: "Leggi l'Introduzione",
    pillarsHeader: "Elenco Completo delle Destinazioni di Lombok",
    pillarsSub:
      "Tutti i pacchetti Montagna e Collina prevedono il pernottamento in tenda. Le spiagge e il patrimonio culturale sono elencati per distretto.",
    pillarMountain: "Montagne e Colline (Con Pernottamento)",
    pillarBeach: "Mare e Spiagge (Per Distretto)",
    pillarHeritage: "Patrimonio Culturale (Per Distretto)",
    selectRouteLink: "Dettagli e Scegli Destinazione",
    weatherHeader: "Meteo Vetta Rinjani e Onde della Costa in Tempo Reale",
    weatherSub:
      "Dati meteorologici e marini in tempo reale per il Monte Rinjani, la costa sud di Lombok Centrale e le isole Gili.",
    zoneSummit: "Vetta Rinjani e Sembalun",
    zoneSouth: "Costa Sud (Lombok Centrale)",
    zoneGili: "Acque di Gili (Nord ed Est)",
    guidesHeader: "Esplora Lombok con Guide Locali Certificate",
    guidesSub:
      "Prenota il tuo tour privato e la tua guida certificata HPI con totale trasparenza. Seleziona destinazione, date e preferenze linguistiche per un'esperienza autentica e senza pensieri.",
    filterGenderLabel: "Preferenza Genere Guida",
    genderAll: "Tutti i Generi",
    genderFemale: "Guida Donna (Female)",
    genderMale: "Guida Uomo (Male)",
    filterLangLabel: "Lingua / Specialità della Guida",
    searchNamePlaceholder: "Cerca nome guida...",
    bookWithLottaBtn: "Richiedi via LOTTA",
    bookingPanelTitle: "Configurazione Destinazione e Guida LOTTA",
    bookingPanelSub:
      "Il team LOTTA assegnerà la migliore guida certificata in base alle tue preferenze di lingua e genere.",
    selectPackageLabel: "1. Scegli Destinazione Montagna, Mare o Cultura",
    selectedGuideLabel: "2. Preferenza Assegnazione Guida",
    teamAssignedOption: "Assegnata dal Team LOTTA (In base a Genere e Lingua)",
    sendWhatsAppBtn: "Invia Richiesta Ufficiale al Team LOTTA",
    showingCount: "Mostrando",
    loadMoreBtn: "Mostra Altre Guide",
    pagePrevBtn: "Precedente",
    pageNextBtn: "Successivo",
    pageLabel: "Pagina",
    viewAllStoriesBtn: "Vedi Tutte le 12 Storie",
    viewAllDestinationsBtn: "Vedi Tutte le 24 Destinazioni",
    tripDateLabel: "Data del Viaggio",
    guestsLabel: "Numero Partecipanti",
    adultsLabel: "Adulti",
    childrenLabel: "Bambini (sotto 12 anni)",
    pickupLocationLabel: "Punto di Ritiro",
    pickupPlaceholder: "Hotel a Lombok / Aeroporto (LOP) / Porto...",
    priceBreakdownTitle: "Dettaglio Prezzo e Condizioni di Pagamento",
    pricePerPerson: "Prezzo a persona",
    totalPriceLabel: "Totale Stimato",
    deposit30Label: "Anticipo / Acconto (30%)",
    balance70Label: "Saldo al Giorno del Tour (70%)",
    bankTransferTitle: "Conto Bancario Ufficiale per l'Acconto",
    copyAccountBtn: "Copia Conto Mandiri",
    copiedNotice: "Numero di Conto Copiato!",
    confirmWhatsAppModalTitle: "Conferma la Prenotazione LOTTA",
    confirmWhatsAppModalSub: "Verifica il riepilogo del tuo viaggio prima di essere reindirizzato al canale WhatsApp ufficiale di LOTTA.",
    viewTripDetailBtn: "Dettagli Trip →",
    oralHeritageLabel: "Tradizione Orale e Patrimonio Culturale",
    oralHeritageSOP: "SOP Culturale LOTTA: Sul posto, la guida ufficiale HPI narrerà direttamente la storia orale, il significato dei luoghi e le tradizioni locali Sasak.",
    exploreStoryCatalogLink: "Esplora Tutte le 12 Storie nel Catalogo",
    tourPackageAvailableBadge: "Tour Ufficiale",
  },
};

export const STORY_TRAILERS: StoryTrailer[] = [
  {
    id: "trailer-segara-anak",
    packageId: "pkg-explore-rinjani",
    pillar: "mountain",
    regency: "Kab. Lombok Timur & Utara",
    destinationName: "Danau Segara Anak & Aik Kalak",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "2.008 mdpl",
    relatedPackageTitle: "Danau Segara Anak & Mata Air Panas Aik Kalak (Kab. Lombok Timur & Utara)",
    title: {
      id: "Kabut Kaldera Segara Anak & Mata Air Aik Kalak",
      en: "The Sudden Caldera Mist of Segara Anak & Aik Kalak Spring",
      it: "La Nebbia della Caldera Segara Anak e la Sorgente Aik Kalak",
    },
    summary38: {
      id: "Di ketinggian 2.008m tepi Danau Segara Anak, kabut yang turun mendadak dipercaya masyarakat Sembalun sebagai pengingat etika adat di kawasan kaldera...",
      en: "At 2,008m beside Segara Anak crater lake, sudden mist is revered by Sembalun elders as a reminder of unwritten mountain customs...",
      it: "A 2.008m lungo il lago Segara Anak, la nebbia improvvisa ricorda le antiche regole tradizionali della montagna...",
    },
    hook38Full: {
      id: "Pada ketinggian 2.008 meter di tepi Danau Segara Anak, terdapat mata air panas alami Aik Kalak yang dihormati masyarakat Sasak. Dahulu, kawasan kaldera ini menjadi tempat menyepi para leluhur untuk membaca tanda-tanda keseimbangan alam Pulau Lombok...",
      en: "At 2,008 meters along the shore of Segara Anak crater lake lies the Aik Kalak thermal spring, revered by the Sasak people as a sacred sanctuary where elders read the natural balance of Lombok...",
      it: "A 2.008 metri sulle rive del lago vulcanico Segara Anak si trova la sorgente termale Aik Kalak, venerata dal popolo Sasak...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Mengapa tebing timur kaldera pantang ditunjuk secara langsung, dan bagaimana tradisi penghormatan di mata air Aik Kalak? Dengarkan kisah utuhnya saat berkemah di Segara Anak bersama Guide LOTTA.",
      en: "61.8% On-Site Story: Why must climbers never point directly at the eastern caldera wall, and what is the tradition at Aik Kalak spring? Hear the complete oral history at camp with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Perché non bisogna mai indicare la parete orientale della caldera? Ascolta il racconto completo intorno al fuoco con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-tenun-sade",
    packageId: "pkg-desa-sade-ende",
    pillar: "heritage",
    regency: "Kab. Lombok Tengah",
    destinationName: "Desa Adat Sade & Sukarara",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Desa Adat Sasak",
    relatedPackageTitle: "Desa Adat Sade & Desa Adat Ende (Kab. Lombok Tengah)",
    title: {
      id: "Sandi Rahasia di Balik Benang Tenun Subahnale",
      en: "The Hidden Cipher Woven into Subahnale Threads",
      it: "Il Codice Segreto Intrecciato nei Tessuti Subahnale",
    },
    summary38: {
      id: "Motif geometris di Desa Adat Sade dan Sukarara bukan sekadar hiasan mata, melainkan kode tentang silsilah keluarga dan kesiapan menikah...",
      en: "The geometric patterns woven in Sade and Sukarara encode family lineage, vows, and marriage readiness...",
      it: "I motivi geometrici tessuti a Sade e Sukarara racchiudono codici segreti su lignaggio e promesse matrimoniali...",
    },
    hook38Full: {
      id: "Di lorong Desa Adat Sade dan Sukarara, para perempuan menenun motif Subahnale yang begitu rumit hingga penenunnya mengucapkan tasbih setiap kali menyelesaikan satu pola. Jika hitungan benangnya meleset satu helai saja pada hari tertentu, kain tersebut disimpan khusus...",
      en: "Along the lanes of Sade and Sukarara villages, women weave the intricate Subahnale motif. If a single thread count slips on certain days, the cloth carries a personal story meant only for family...",
      it: "Nei vicoli dei villaggi tradizionali di Sade e Sukarara, le donne tessono il complesso motivo Subahnale tramandato da generazioni...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Kombinasi warna benang apa yang menandakan penolakan halus terhadap lamaran, dan apa makna sejati arsitektur Bale Tani? Guide LOTTA akan mempertemukan Anda langsung dengan penenun senior di desa.",
      en: "61.8% On-Site Story: Which thread color combination signals a polite refusal of a marriage proposal? Your LOTTA Guide will introduce you directly to the village master weavers.",
      it: "61.8% Storia Completa sul Posto: Quale combinazione di colori indica un rifiuto gentile di matrimonio? La tua guida LOTTA ti farà incontrare direttamente le maestre tessitrici.",
    },
  },
  {
    id: "trailer-tanjung-ringgit",
    packageId: "pkg-pink-beach-tangsi",
    pillar: "beach",
    regency: "Kab. Lombok Timur",
    destinationName: "Pantai Pink Tangsi & Tanjung Ringgit",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Tebing 40m • Samudra Hindia",
    relatedPackageTitle: "Pantai Pink (Tangsi) & Tebing Tanjung Ringgit (Kab. Lombok Timur)",
    title: {
      id: "Mata Air Tawar di Bawah Tebing Karang Tanjung Ringgit",
      en: "The Hidden Freshwater Spring Beneath Tanjung Ringgit Cliffs",
      it: "La Sorgente d'Acqua Dolce Sotto le Scogliere di Tanjung Ringgit",
    },
    summary38: {
      id: "Di balik pasir merah muda Pantai Pink Tangsi dan tebing curam 40 meter Tanjung Ringgit, mengalir mata air tawar tepat di bibir Samudra Hindia...",
      en: "Beyond the pink sands of Tangsi and 40-meter limestone cliffs of Tanjung Ringgit flows a secret freshwater spring at the edge of the ocean...",
      it: "Oltre la sabbia rosa di Tangsi e le scogliere di Tanjung Ringgit scorre una sorgente segreta d'acqua dolce sul bordo dell'oceano...",
    },
    hook38Full: {
      id: "Banyak pengunjung berhenti di Pantai Pink Tangsi hanya untuk berfoto singkat, tanpa menyadari beberapa kilometer di ujung semenanjung Tanjung Ringgit terdapat lorong peninggalan sejarah dan mata air tawar tersembunyi di bawah tebing karang yang hanya muncul saat air laut surut...",
      en: "Most visitors stop at Pink Beach for photos without realizing that at the tip of the Tanjung Ringgit peninsula lies a hidden coastal cavern and a freshwater spring beneath the limestone cliff that emerges only at low tide...",
      it: "Molti visitatori si fermano a Pink Beach senza sapere che sulla punta di Tanjung Ringgit si nascondono grotte storiche e una sorgente d'acqua dolce accessibile solo con la bassa marea...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Bagaimana pelaut kuno membaca warna buih gelombang di celah tebing Tanjung Ringgit untuk memprediksi angin selatan? Temukan titik rahasianya bersama Guide LOTTA.",
      en: "61.8% On-Site Story: How did ancient Sasak sailors read the sea foam in this cliff chasm to predict southern swells? Discover the exact vantage point with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Come leggevano la schiuma del mare gli antichi marinai Sasak? Scoprilo sul posto con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-puncak-rinjani",
    packageId: "pkg-only-summit",
    pillar: "mountain",
    regency: "Kab. Lombok Timur",
    destinationName: "Puncak Gunung Rinjani 3.726m",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "3.726 mdpl",
    relatedPackageTitle: "Puncak Gunung Rinjani 3.726 mdpl (Kab. Lombok Timur)",
    title: {
      id: "Punggungan Letter E & Fajar di Titik Tertinggi 3.726 mdpl",
      en: "The Letter E Ridge & Dawn at the 3,726m True Summit",
      it: "Il Crinale Letter E e l'Alba sulla Vetta di 3.726 Metri",
    },
    summary38: {
      id: "Tepat sebelum mencapai puncak 3.726 mdpl, pendaki melewati punggungan pasir vulkanik curam berbentuk huruf E yang menguji langkah terakhir...",
      en: "Just below the 3,726m summit, climbers cross a narrow volcanic ridge shaped like the letter E framing both Bali and Sumbawa...",
      it: "Poco prima della vetta di 3.726m, gli scalatori attraversano una cresta vulcanica a forma di lettera E...",
    },
    hook38Full: {
      id: "Pendakian menuju Puncak Rinjani dimulai pukul dua dini hari dari Plawangan Sembalun. Saat cahaya pertama muncul di ufuk timur, bayangan piramida raksasa Gunung Rinjani jatuh memanjang hingga menutupi Selat Alas...",
      en: "The summit push begins at 2:00 AM from Sembalun Crater Rim. As first light breaks, Rinjani casts a giant triangular shadow stretching across the strait...",
      it: "L'attacco alla vetta inizia alle 02:00 da Plawangan Sembalun. All'alba, l'ombra piramidale del Rinjani si proietta sullo stretto...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Dari mana asal penamaan titik-titik peristirahatan para porter senior Sembalun di jalur puncak? Dengarkan langsung saat summit bersama Guide LOTTA.",
      en: "61.8% On-Site Story: How did senior Sembalun guides name each landmark along the summit ridge? Hear the story during your ascent with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Come sono nati i nomi tradizionali lungo la cresta finale? Scoprilo con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-bukit-pergasingan",
    packageId: "pkg-bukit-pergasingan",
    pillar: "mountain",
    regency: "Kab. Lombok Timur",
    destinationName: "Bukit Pergasingan Sembalun",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "1.670 mdpl • Camping",
    relatedPackageTitle: "Bukit Pergasingan Sembalun (Kab. Lombok Timur)",
    title: {
      id: "Petak Sawah Kaldera Purba dari Puncak Bukit Pergasingan",
      en: "Ancient Caldera Patchwork Fields from Pergasingan Hill",
      it: "I Campi Geometrici della Caldera da Bukit Pergasingan",
    },
    summary38: {
      id: "Dari tenda kemah Bukit Pergasingan, lembah Sembalun terlihat seperti permadani geometris yang menyimpan jejak letusan Samalas tahun 1257...",
      en: "From your overnight tent on Pergasingan Hill, Sembalun valley unfolds like a geometric tapestry formed over the 1257 Samalas caldera...",
      it: "Dalla tenda su Bukit Pergasingan, la valle di Sembalun appare come un mosaico geometrico nato dall'eruzione del Samalas del 1257...",
    },
    hook38Full: {
      id: "Bukit Pergasingan di ketinggian 1.670 mdpl menawarkan sudut pandang terbaik menghadap langsung dinding timur Gunung Rinjani. Nama Pergasingan sendiri berasal dari tradisi permainan gasing kayu raksasa masyarakat Sembalun seusai panen raya...",
      en: "Rising to 1,670m, Pergasingan Hill faces the eastern wall of Mount Rinjani. Its name comes from the traditional giant wooden spinning tops played by Sembalun farmers after harvest...",
      it: "A 1.670 metri, Bukit Pergasingan guarda la parete orientale del Rinjani e prende il nome dalle antiche trottole di legno tradizionali...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Bagaimana sistem pembagian air dan kalender tanam adat Sembalun membentuk pola warna petak sawah tersebut? Nikmati kisahnya di depan api unggun bersama Guide LOTTA.",
      en: "61.8% On-Site Story: How did Sembalun's traditional agricultural calendar shape the valley's patchwork geometry? Hear it around the campfire with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Come funziona l'antico calendario agricolo di Sembalun? Ascoltalo intorno al fuoco con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-7-summits-sembalun",
    packageId: "pkg-7-summits",
    pillar: "mountain",
    regency: "Kab. Lombok Timur",
    destinationName: "7 Summits Sembalun (Sempana, Anak Dara, Nanggi)",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "1.900m – 3.726m",
    relatedPackageTitle: "7 Summits Sembalun (Kab. Lombok Timur)",
    title: {
      id: "Cincin Tujuh Puncak Penjaga Lembah Sembalun",
      en: "The Ring of Seven Guardian Peaks Around Sembalun Valley",
      it: "L'Anello delle Sette Vette Custodi della Valle di Sembalun",
    },
    summary38: {
      id: "Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, dan Bao Ritip membentuk benteng cincin alami yang mengelilingi Sembalun...",
      en: "Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, and Bao Ritip form a natural volcanic amphitheater around Sembalun...",
      it: "Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan e Bao Ritip formano una corona vulcanica attorno a Sembalun...",
    },
    hook38Full: {
      id: "Setiap bukit di lingkar 7 Summits Sembalun memiliki karakter medan dan cerita tersendiri—mulai dari punggungan sabana panjang di Bukit Sempana, tanjakan Tanjakan Cinta di Bukit Anak Dara, hingga keheningan tertinggi di Bukit Nanggi...",
      en: "Each peak in the 7 Summits Sembalun ring holds its own terrain and lore—from the sweeping savanna ridge of Sempana to Anak Dara and the quiet heights of Bukit Nanggi...",
      it: "Ogni vetta delle 7 Summits di Sembalun custodisce paesaggi e racconti unici, dalle savane di Sempana fino a Anak Dara e Bukit Nanggi...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Urutan pendakian mana yang paling ideal mengikuti arah angin musim kemarau Sembalun, dan apa arti nama Bao Ritip serta Lembah Gedong? Jelajahi bersama Guide LOTTA.",
      en: "61.8% On-Site Story: What is the origin behind the names Bao Ritip and Lembah Gedong? Experience the full 7 Summits trail stories with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Qual è il significato dei nomi Bao Ritip e Lembah Gedong? Scoprilo in tenda con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-lembah-torean",
    packageId: "pkg-torean-gua-susu",
    pillar: "mountain",
    regency: "Kab. Lombok Utara",
    destinationName: "Jalur Lembah Torean & Gua Susu",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Lembah Kaldera Utara",
    relatedPackageTitle: "Jalur Lembah Torean, Gua Susu & Air Terjun Penimbungan (Kab. Lombok Utara)",
    title: {
      id: "Sungai Kokok Putih, Air Terjun Penimbungan & Gua Susu Torean",
      en: "Kokok Putih Canyon, Penimbungan Waterfall & Susu Cave",
      it: "Il Canyon di Torean, la Cascata Penimbungan e la Grotta Susu",
    },
    summary38: {
      id: "Jalur Torean membelah ngarai vulkanik curam tempat aliran sungai hangat dari Danau Segara Anak terjun menembus hutan hujan tropis...",
      en: "The Torean trail carves through a dramatic canyon where thermal waters from Segara Anak plunge through lush rainforest...",
      it: "Il sentiero di Torean attraversa un canyon vulcanico dove le acque calde del lago Segara Anak scorrono nella foresta...",
    },
    hook38Full: {
      id: "Berbeda dengan jalur sabana Sembalun, jalur Torean di Kabupaten Lombok Utara membawa pendaki menyusuri dasar lembah di antara tebing batu raksasa, melewati Air Terjun Penimbungan setinggi lebih dari 100 meter dan celah sempit Gua Susu yang hangat oleh uap bumi...",
      en: "Unlike Sembalun's open savanna, North Lombok's Torean route follows the canyon floor past the 100-meter Penimbungan waterfall and the steam-warmed chamber of Susu Cave...",
      it: "Il percorso di Torean a Lombok Settentrionale segue il fondo del canyon passando accanto alla cascata Penimbungan e alla grotta termale Gua Susu...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Mengapa tetesan mineral putih di dalam Gua Susu dihormati oleh peziarah adat lintas generasi? Dengarkan kisahnya sepanjang ekspedisi Torean bersama Guide LOTTA.",
      en: "61.8% On-Site Story: Why have local pilgrims visited the mineral drips of Susu Cave for generations? Hear the full story along the Torean traverse with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Perché la Grotta Susu è considerata sacra da generazioni? Scoprilo lungo il canyon con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-tanjung-aan-mandalika",
    packageId: "pkg-tanjung-aan-merese",
    pillar: "beach",
    regency: "Kab. Lombok Tengah",
    destinationName: "Pantai Tanjung Aan, Mawun & Bukit Merese",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Pesisir Selatan Lombok Tengah",
    relatedPackageTitle: "Pantai Tanjung Aan & Bukit Merese (Kab. Lombok Tengah)",
    title: {
      id: "Pasir Merica Tanjung Aan, Bukit Merese & Legenda Putri Mandalika",
      en: "Pepper Sands of Tanjung Aan, Merese Hill & Princess Mandalika",
      it: "La Sabbia di Tanjung Aan, Bukit Merese e la Principessa Mandalika",
    },
    summary38: {
      id: "Di antara tanjung Bukit Merese dan Pantai Seger, masyarakat Sasak berkumpul setiap bulan ke-10 penanggalan adat untuk tradisi Bau Nyale...",
      en: "Between Merese Hill and Seger Reef, Sasak communities gather each year on the 10th traditional lunar month for the Bau Nyale sea ceremony...",
      it: "Tra la collina di Merese e la costa di Tanjung Aan si rinnova ogni anno l'antica tradizione del Bau Nyale...",
    },
    hook38Full: {
      id: "Pantai Tanjung Aan memiliki butiran pasir unik menyerupai merica yang berubah halus saat mendekati garis air. Dari puncak Bukit Merese di sebelahnya, terlihat jelas lekuk teluk tempat legenda Putri Mandalika memilih terjun ke laut demi mencegah peperangan antar kerajaan...",
      en: "Tanjung Aan is famed for its round pepper-like coral sand grains. From the headland of Merese Hill, you look directly over the reef where Princess Mandalika leaped into the sea to preserve peace across the island...",
      it: "Tanjung Aan è celebre per la sua sabbia corallina unica. Dalla collina di Merese si ammira la baia legata alla leggenda della Principessa Mandalika...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Bagaimana tetua adat menghitung malam kemunculan Nyale melalui rasi bintang Rowot dan tanda hujan angin? Dengarkan di atas Bukit Merese bersama Guide LOTTA.",
      en: "61.8% On-Site Story: How do traditional astronomers calculate the exact night of Bau Nyale using the Rowot star cluster? Hear it on Merese Hill with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Come calcolano gli anziani la notte esatta del Bau Nyale osservando le stelle? Scoprilo a Bukit Merese con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-bayan-beleq-senaru",
    packageId: "pkg-masjid-kuno-bayan",
    pillar: "heritage",
    regency: "Kab. Lombok Utara",
    destinationName: "Masjid Kuno Bayan Beleq & Desa Senaru",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Cagar Budaya Abad ke-16",
    relatedPackageTitle: "Masjid Kuno Bayan Beleq (Abad ke-16) (Kab. Lombok Utara)",
    title: {
      id: "Masjid Kuno Bayan Beleq Abad ke-16 & Hukum Adat Hutan Awiq-Awiq",
      en: "The 16th-Century Bayan Beleq Mosque & Awiq-Awiq Forest Law",
      it: "L'Antica Moschea di Bayan Beleq (XVI Secolo) e la Foresta di Senaru",
    },
    summary38: {
      id: "Berdiri sejak abad ke-16 dengan dinding anyaman bambu dan atap ijuk, Masjid Kuno Bayan Beleq menjadi saksi awal masuknya Islam di Lombok...",
      en: "Standing since the 16th century with woven bamboo walls and palm-fiber roof, Bayan Beleq is the oldest mosque on Lombok...",
      it: "Costruita nel XVI secolo con pareti di bambù intrecciato, la moschea di Bayan Beleq è il più antico monumento islamico di Lombok...",
    },
    hook38Full: {
      id: "Di lereng utara Gunung Rinjani, masyarakat adat Bayan dan Senaru menjaga kelestarian mata air melalui hukum adat Awiq-Awiq yang ketat. Siapa pun yang menebang pohon di hutan larangan wajib menjalani sidang adat dan mengganti dengan pengorbanan ternak...",
      en: "On Rinjani's northern slopes, the communities of Bayan and Senaru protect their mountain springs through strict Awiq-Awiq customary law forbidding timber cutting in sacred forest zones...",
      it: "Sulle pendici settentrionali del Rinjani, le comunità di Bayan e Senaru proteggono le foreste e le sorgenti attraverso l'antica legge consuetudinaria Awiq-Awiq...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Apa fungsi ketujuh makam leluhur yang mengelilingi bangunan utama Masjid Kuno Bayan Beleq? Telusuri bersama Guide LOTTA di Bayan dan Senaru.",
      en: "61.8% On-Site Story: Who are the ancestral figures resting in the shrines surrounding Bayan Beleq Mosque? Explore the full history on-site with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Qual è la storia dei mausolei ancestrali attorno alla moschea di Bayan Beleq? Scoprilo sul posto con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-3-gili-meno-air-trawangan",
    packageId: "pkg-3-gili-utara",
    pillar: "beach",
    regency: "Kab. Lombok Utara",
    destinationName: "Gili Trawangan, Gili Meno & Gili Air",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Perairan Konservasi Penyu",
    relatedPackageTitle: "Gili Trawangan, Gili Meno & Gili Air (Kab. Lombok Utara)",
    title: {
      id: "Danau Air Asin Gili Meno & Jejak Pelaut Bugis di Tiga Gili",
      en: "Gili Meno's Saltwater Lake & Bugis Seafarers of the Three Gilis",
      it: "Il Lago Salato di Gili Meno e i Navigatori delle Tre Isole Gili",
    },
    summary38: {
      id: "Jauh sebelum dikenal dunia sebagai pulau bebas kendaraan bermotor, Gili Air, Gili Meno, dan Gili Trawangan menyimpan sejarah pelaut lintas selat...",
      en: "Long before becoming world-famous motor-free islands, Gili Air, Gili Meno, and Gili Trawangan were vital maritime outposts...",
      it: "Molto prima di diventare celebri isole senza motori, Gili Air, Gili Meno e Gili Trawangan custodivano antiche storie marinare...",
    },
    hook38Full: {
      id: "Di tengah pulau Gili Meno yang tenang terdapat danau air asin alami yang dikelilingi hutan bakau purba. Sementara di perairan dangkal sekitarnya, penyu hijau berenang bebas di atas terumbu karang dengan visibilitas air mencapai lebih dari 20 meter...",
      en: "At the center of tranquil Gili Meno lies a natural saltwater lake ringed by mangroves, while green sea turtles glide over coral gardens in 20+ meter visibility...",
      it: "Al centro della tranquilla Gili Meno si trova un lago salato naturale circondato da mangrovie, mentre le tartarughe marine nuotano nelle acque cristalline...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Dari mana asal nama 'Gili Air', 'Gili Meno', dan 'Gili Trawangan' dalam catatan lisan pelaut lokal? Dengarkan kisahnya saat berlayar bersama Guide LOTTA.",
      en: "61.8% On-Site Story: How did Gili Air, Gili Meno, and Gili Trawangan get their names in local maritime oral history? Hear it on the water with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Qual è l'origine dei nomi Gili Air, Gili Meno e Gili Trawangan? Scoprilo durante la navigazione con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-sembalun-bumbung-masbagik",
    packageId: "pkg-sembalun-bumbung",
    pillar: "heritage",
    regency: "Kab. Lombok Timur",
    destinationName: "Desa Adat Sembalun Bumbung & Masbagik",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Situs 7 Rumah Leluhur",
    relatedPackageTitle: "7 Rumah Adat Kuno Sembalun Bumbung (Kab. Lombok Timur)",
    title: {
      id: "Tujuh Rumah Leluhur Sembalun Bumbung & Tembikar Tanah Liat Masbagik",
      en: "The Seven Ancestral Houses of Sembalun Bumbung & Masbagik Pottery",
      it: "Le Sette Case Ancestrali di Sembalun Bumbung e la Ceramica di Masbagik",
    },
    summary38: {
      id: "Di Desa Beleq Sembalun Bumbung, hanya berdiri tepat tujuh rumah adat beratap jerami yang menjadi cikal bakal pemukiman lereng Rinjani...",
      en: "In Desa Beleq at Sembalun Bumbung stand exactly seven thatched ancestral homes believed to be the original settlement after ancient volcanic upheavals...",
      it: "A Sembalun Bumbung sorgono esattamente sette case ancestrali con tetto di paglia, il primo insediamento storico alle pendici del Rinjani...",
    },
    hook38Full: {
      id: "Kompleks 7 Rumah Adat Sembalun Bumbung memiliki aturan adat bahwa jumlah bangunannya tidak boleh dikurangi maupun ditambah. Sementara di dataran rendah Lombok Timur, para perajin Masbagik mempertahankan teknik pembakaran gerabah tanah liat di ruang terbuka...",
      en: "Customary law decrees that the seven houses of Desa Beleq may never be increased or decreased in number, while in Masbagik, artisans fire hand-shaped clay pottery in open straw kilns...",
      it: "La legge tradizionale stabilisce che le sette case di Desa Beleq non possano mai aumentare né diminuire di numero...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Mengapa keturunan penghuni ketujuh rumah tersebut wajib membangun rumah baru di luar pagar batu situs Desa Beleq? Kunjungi langsung bersama Guide LOTTA.",
      en: "61.8% On-Site Story: Why must descendants build outside the stone perimeter of Desa Beleq? Step inside the heritage compound with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Perché i discendenti devono costruire fuori dal recinto sacro di Desa Beleq? Visitalo con la tua guida LOTTA.",
    },
  },
  {
    id: "trailer-lingsar-narmada-sekotong",
    packageId: "pkg-pura-lingsar",
    pillar: "heritage",
    regency: "Kab. Lombok Barat",
    destinationName: "Pura Lingsar, Taman Narmada & Sekotong",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80",
    elevationOrDepth: "Warisan Sejarah 1714",
    relatedPackageTitle: "Pura Lingsar (Harmoni Kemaliq & Gaduh 1714) (Kab. Lombok Barat)",
    title: {
      id: "Harmoni Kemaliq Pura Lingsar & Replika Gunung Rinjani di Taman Narmada",
      en: "Sacred Harmony of Pura Lingsar & the Royal Rinjani Replica at Narmada",
      it: "L'Armonia di Pura Lingsar e la Replica Reale del Rinjani a Narmada",
    },
    summary38: {
      id: "Dibangun pada abad ke-18, Pura Lingsar dan Taman Air Narmada di Kabupaten Lombok Barat menyimpan simbol persaudaraan dan kosmologi Gunung Rinjani...",
      en: "Built in the 18th century in West Lombok, Pura Lingsar and Narmada Water Palace embody interfaith harmony and the sacred cosmology of Mount Rinjani...",
      it: "Costruiti nel XVIII secolo a Lombok Occidentale, Pura Lingsar e il Palazzo d'Acqua di Narmada celebrano l'armonia culturale e la sacralità del Rinjani...",
    },
    hook38Full: {
      id: "Ketika raja tidak lagi sanggup mendaki Puncak Rinjani yang tinggi untuk menghaturkan upacara Pekelem di Danau Segara Anak, para arsitek kerajaan merancang Taman Air Narmada sebagai tiruan presisi topografi Gunung Rinjani lengkap dengan mata air alaminya...",
      en: "When the aging king could no longer climb 3,726m Mount Rinjani for the annual crater lake ceremony, royal architects engineered Narmada Water Palace as a living topographical replica of Rinjani and Segara Anak...",
      it: "Quando l'anziano re non poté più scalare il Monte Rinjani, gli architetti reali progettarono i giardini d'acqua di Narmada come replica esatta del vulcano e del lago Segara Anak...",
    },
    locked62Clue: {
      id: "61.8% Kisah Lanjutan di Lokasi: Mengapa di dalam satu kompleks Pura Lingsar terdapat bangunan Gaduh dan Kemaliq yang dirayakan bersama dalam tradisi Perang Topat? Dengarkan langsung di lokasi bersama Guide LOTTA.",
      en: "61.8% On-Site Story: How do the Gaduh and Kemaliq shrines unite two traditions every year during the Perang Topat festival? Hear the full story at Lingsar with your LOTTA Guide.",
      it: "61.8% Storia Completa sul Posto: Come si svolge la storica celebrazione del Perang Topat a Pura Lingsar? Scoprilo sul posto con la tua guida LOTTA.",
    },
  },
];

export const SUBCATEGORIES = {
  mountain: [
    { id: "all", label: { id: "Semua Destinasi Gunung & Bukit (8)", en: "All Mountain & Hill Destinations (8)", it: "Tutte le Destinazioni Montagna (8)" } },
    { id: "7-summits", label: { id: "7 Summits Rinjani Sembalun", en: "7 Summits Rinjani Sembalun", it: "7 Summits Rinjani Sembalun" } },
    { id: "explore-rinjani", label: { id: "Explore Rinjani (Segara Anak & Torean)", en: "Explore Rinjani (Segara Anak & Torean)", it: "Explore Rinjani (Segara Anak & Torean)" } },
    { id: "only-summit", label: { id: "Only Summit Rinjani (3.726 mdpl)", en: "Only Summit Rinjani (3,726m)", it: "Only Summit Rinjani (3.726m)" } },
    { id: "bukit-menginap", label: { id: "Bukit Menginap (Pergasingan, Sempana, Anak Dara, Nanggi)", en: "Overnight Hills (Pergasingan, Sempana, Anak Dara, Nanggi)", it: "Colline con Pernottamento (Pergasingan, Sempana, Anak Dara, Nanggi)" } },
  ],
  beach: [
    { id: "all", label: { id: "Semua Kabupaten (8 Destinasi Pantai & Gili)", en: "All Regencies (8 Beach & Gili Destinations)", it: "Tutti i Distretti (8 Destinazioni Mare)" } },
    { id: "lombok-tengah", label: { id: "Kab. Lombok Tengah (Tanjung Aan, Mawun, Selong Belanak, Merese)", en: "Central Lombok (Tanjung Aan, Mawun, Selong Belanak, Merese)", it: "Lombok Centrale (Tanjung Aan, Mawun, Selong Belanak, Merese)" } },
    { id: "lombok-timur", label: { id: "Kab. Lombok Timur (Pantai Pink, Tanjung Ringgit, Gili Kondo, Petagan, Bidara)", en: "East Lombok (Pink Beach, Tanjung Ringgit, Gili Kondo, Petagan, Bidara)", it: "Lombok Orientale (Pink Beach, Tanjung Ringgit, Gili Kondo)" } },
    { id: "lombok-utara", label: { id: "Kab. Lombok Utara (Gili Trawangan, Meno, Air & Pantai Sire)", en: "North Lombok (Gili Trawangan, Meno, Air & Sire Beach)", it: "Lombok Settentrionale (Gili Trawangan, Meno, Air e Sire)" } },
    { id: "lombok-barat", label: { id: "Kab. Lombok Barat (Gili Kedis, Sudak, Nanggu & Teluk Mekaki)", en: "West Lombok (Gili Kedis, Sudak, Nanggu & Mekaki Bay)", it: "Lombok Occidentale (Gili Kedis, Sudak, Nanggu e Mekaki)" } },
  ],
  heritage: [
    { id: "all", label: { id: "Semua Kabupaten (8 Destinasi Heritage Budaya)", en: "All Regencies (8 Cultural Heritage Destinations)", it: "Tutti i Distretti (8 Destinazioni Culturali)" } },
    { id: "lombok-tengah", label: { id: "Kab. Lombok Tengah (Desa Sade, Ende, Sukarara & Bau Nyale)", en: "Central Lombok (Sade, Ende, Sukarara & Bau Nyale)", it: "Lombok Centrale (Sade, Ende, Sukarara e Bau Nyale)" } },
    { id: "lombok-utara", label: { id: "Kab. Lombok Utara (Masjid Kuno Bayan Beleq & Desa Adat Senaru)", en: "North Lombok (Bayan Beleq Ancient Mosque & Senaru Village)", it: "Lombok Settentrionale (Moschea Bayan Beleq e Senaru)" } },
    { id: "lombok-timur", label: { id: "Kab. Lombok Timur (7 Rumah Adat Sembalun Bumbung & Gerabah Masbagik)", en: "East Lombok (Sembalun Bumbung 7 Houses & Masbagik Pottery)", it: "Lombok Orientale (Case di Sembalun Bumbung e Masbagik)" } },
    { id: "lombok-barat", label: { id: "Kab. Lombok Barat (Pura Lingsar & Taman Air Kerajaan Narmada)", en: "West Lombok (Pura Lingsar & Narmada Royal Water Palace)", it: "Lombok Occidentale (Pura Lingsar e Palazzo Narmada)" } },
  ],
};

export const PACKAGES: DestinationPackage[] = [
  // ===========================================================================
  // PILAR 1: GUNUNG & BUKIT (8 DESTINASI EKSPLISIT — 100% WAJIB MENGINAP)
  // ===========================================================================
  {
    id: "pkg-7-summits",
    pillar: "mountain",
    subCategory: "7-summits",
    regency: "Kab. Lombok Timur",
    destinationNames: "Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, Bao Ritip",
    duration: "Multi-Expedition / Overnight Camping",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • 7 Puncak Sembalun",
      en: "Mandatory Overnight • 7 Peaks",
      it: "Pernottamento • 7 Vette Sembalun",
    },
    title: {
      id: "7 Summits Sembalun (Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, Bao Ritip)",
      en: "7 Summits Sembalun (Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, Bao Ritip)",
      it: "7 Summits Sembalun (Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, Bao Ritip)",
    },
    desc: {
      id: "Program penaklukan lengkap 7 puncak lingkar kaldera Sembalun: Gunung Rinjani (3.726m), Bukit Sempana, Lembah Gedong, Bukit Kondo, Bukit Anak Dara, Bukit Pergasingan, dan Bukit Bao Ritip.",
      en: "Complete expedition across all 7 peaks framing Sembalun valley: Rinjani (3,726m), Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, and Bao Ritip.",
      it: "Programma completo sulle 7 vette che circondano la valle di Sembalun: Rinjani, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan e Bao Ritip.",
    },
    highlights: {
      id: ["100% Paket Menginap (Full Camping Gear)", " Mencakup Ketujuh Puncak Resmi Sembalun", "Pendampingan Guide Resmi & Kisah Sejarah Tiap Punggungan"],
      en: ["100% Overnight Camping Logistics", "Covers All 7 Official Sembalun Peaks", "Guided Oral History Across Every Ridge"],
      it: ["Logistica Completa in Tenda", "Include Tutte le 7 Vette di Sembalun", "Storie Locali con Guida Certificata"],
    },
    storyTeaser: {
      id: "Mengapa ketujuh puncak Sembalun disebut sebagai cincin penjaga kawah purba Samalas yang meletus tahun 1257?",
      en: "Why are the seven peaks of Sembalun revered as the guardian ring of the ancient 1257 Samalas super-eruption?",
      it: "Perché le sette vette di Sembalun sono considerate l'anello custode dell'antico vulcano Samalas del 1257?",
    },
    priceIdr: 4500000,
  },
  {
    id: "pkg-explore-rinjani",
    pillar: "mountain",
    subCategory: "explore-rinjani",
    regency: "Kab. Lombok Timur & Utara",
    destinationNames: "Kaldera Rinjani, Danau Segara Anak (2.008m), Mata Air Panas Aik Kalak",
    duration: "3D2N / 4D3N Overnight Camping",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Segara Anak 3D2N/4D3N",
      en: "Overnight • Segara Anak 3D2N/4D3N",
      it: "Pernottamento • Segara Anak 3G2N/4G3N",
    },
    title: {
      id: "Danau Segara Anak & Mata Air Panas Aik Kalak (Explore Rinjani)",
      en: "Segara Anak Crater Lake & Aik Kalak Thermal Springs (Explore Rinjani)",
      it: "Lago Segara Anak e Sorgenti Termali Aik Kalak (Explore Rinjani)",
    },
    desc: {
      id: "Ekspedisi menginap 3D2N/4D3N menuruni kaldera menuju tepi Danau Segara Anak (2.008 mdpl), berendam di sumber air panas alami Aik Kalak, dan menyaksikan kerucut vulkanik Gunung Baru Jari.",
      en: "3D2N/4D3N caldera expedition camping beside Segara Anak Lake (2,008m), soaking in Aik Kalak natural thermal springs, and viewing Mount Baru Jari.",
      it: "Spedizione di 3G2N/4G3N con campo sulle rive del lago Segara Anak (2.008m) e sorgenti termali Aik Kalak.",
    },
    highlights: {
      id: ["Kemah Tepi Danau Segara Anak (2.008 mdpl)", "Sumber Air Panas Alami Aik Kalak", "Panorama Gunung Baru Jari di Tengah Kaldera"],
      en: ["Lakeside Camping at Segara Anak (2,008m)", "Aik Kalak Natural Thermal Springs", "Direct View of Mount Baru Jari Cone"],
      it: ["Campo sulle Rive del Lago Segara Anak", "Sorgenti Termali Aik Kalak", "Vista sul Vulcano Baru Jari"],
    },
    storyTeaser: {
      id: "Kisah Gunung Baru Jari di tengah Danau Segara Anak dan pantangan adat di mata air Aik Kalak.",
      en: "The oral legend of Mount Baru Jari and the sacred traditions of Aik Kalak spring.",
      it: "La leggenda del cono vulcanico Baru Jari e delle sorgenti sacre di Aik Kalak.",
    },
    priceIdr: 3500000,
  },
  {
    id: "pkg-only-summit",
    pillar: "mountain",
    subCategory: "only-summit",
    regency: "Kab. Lombok Timur",
    destinationNames: "Plawangan Sembalun (2.639m) & Puncak Rinjani (3.726 mdpl)",
    duration: "2D1N Overnight Summit",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Puncak 3.726 mdpl",
      en: "Overnight • 3,726m Summit",
      it: "Pernottamento • Vetta 3.726m",
    },
    title: {
      id: "Puncak Gunung Rinjani 3.726 mdpl (Only Summit 2D1N via Sembalun)",
      en: "Mount Rinjani 3,726m True Summit (Only Summit 2D1N via Sembalun)",
      it: "Vetta del Monte Rinjani 3.726m (Only Summit 2G1N via Sembalun)",
    },
    desc: {
      id: "Pendakian menginap 2 hari 1 malam berkemah di Plawangan Sembalun (2.639m) yang difokuskan untuk mengejar matahari terbit di titik tertinggi Dewi Anjani (3.726 mdpl).",
      en: "Focused 2-day, 1-night ascent camping at Sembalun Crater Rim (2,639m) to reach the 3,726m summit at sunrise.",
      it: "Salita di 2 giorni e 1 notte con campo a Plawangan Sembalun (2.639m) per raggiungere la vetta di 3.726m all'alba.",
    },
    highlights: {
      id: ["Kemah di Plawangan Sembalun (2.639 mdpl)", "Summit Attack Pukul 02.00 WITA via Letter E", "Panorama 360 Derajat dari Gunung Agung hingga Tambora"],
      en: ["Sembalun Crater Rim Camp (2,639m)", "02:00 AM Guided Summit Push via Letter E", "360-Degree Horizon from Bali to Sumbawa"],
      it: ["Campo Plawangan Sembalun (2.639m)", "Attacco alla Vetta alle 02:00", "Panorama a 360 Gradi dall'Alba"],
    },
    storyTeaser: {
      id: "Titik batas 'Letter E' di punggungan puncak yang menyimpan kisah perjuangan para perintis jalur Rinjani.",
      en: "The story behind the 'Letter E' ridge just below the 3,726m summit.",
      it: "La storia del crinale finale prima della vetta di 3.726 metri.",
    },
    priceIdr: 3100000,
  },
  {
    id: "pkg-torean-gua-susu",
    pillar: "mountain",
    subCategory: "explore-rinjani",
    regency: "Kab. Lombok Utara",
    destinationNames: "Jalur Lembah Torean, Gua Susu & Air Terjun Penimbungan",
    duration: "3D2N / 4D3N Overnight Canyon Traverse",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Lembah Torean & Gua Susu",
      en: "Overnight • Torean Canyon & Susu Cave",
      it: "Pernottamento • Canyon Torean e Gua Susu",
    },
    title: {
      id: "Jalur Lembah Torean, Gua Susu & Air Terjun Penimbungan",
      en: "Torean Canyon Trail, Susu Cave & Penimbungan Waterfall",
      it: "Sentiero del Canyon Torean, Grotta Susu e Cascata Penimbungan",
    },
    desc: {
      id: "Lintas ngarai vulkanik dari kaldera menuju Desa Torean (Kab. Lombok Utara) melewati Gua Susu, aliran sungai belerang Kokok Putih, dan Air Terjun Penimbungan.",
      en: "Dramatic canyon traverse from the caldera down to Torean village (North Lombok) past Susu Cave, Kokok Putih river, and Penimbungan Waterfall.",
      it: "Traversata del canyon vulcanico fino al villaggio di Torean passando per la Grotta Susu e la cascata Penimbungan.",
    },
    highlights: {
      id: ["Menyusuri Ngarai Sungai Kokok Putih", "Eksplorasi Uap Hangat Alami Gua Susu", "Panorama Air Terjun Penimbungan (>100 Meter)"],
      en: ["Kokok Putih Volcanic Canyon Trail", "Natural Thermal Steam of Susu Cave", "100m+ Penimbungan Waterfall Viewpoint"],
      it: ["Sentiero nel Canyon Kokok Putih", "Grotta Termale Naturale Gua Susu", "Cascata Penimbungan di oltre 100 Metri"],
    },
    storyTeaser: {
      id: "Mengapa tetesan air mineral putih di dalam Gua Susu dihormati oleh masyarakat adat lereng utara?",
      en: "Why are the white mineral drops inside Susu Cave revered by northern highland communities?",
      it: "Perché le gocce minerali della Grotta Susu sono venerate dalle comunità locali?",
    },
    priceIdr: 3200000,
  },
  {
    id: "pkg-bukit-pergasingan",
    pillar: "mountain",
    subCategory: "bukit-menginap",
    regency: "Kab. Lombok Timur",
    destinationNames: "Bukit Pergasingan Sembalun (1.670 mdpl)",
    duration: "2D1N Mandatory Overnight Camping",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Bukit Pergasingan",
      en: "Overnight Camp • Pergasingan Hill",
      it: "Campeggio • Bukit Pergasingan",
    },
    title: {
      id: "Bukit Pergasingan Sembalun (Camping Menginap 2D1N)",
      en: "Bukit Pergasingan Sembalun (2D1N Overnight Camping)",
      it: "Bukit Pergasingan Sembalun (Campeggio 2G1N)",
    },
    desc: {
      id: "Berkemah 2 hari 1 malam di punggungan Bukit Pergasingan (1.670 mdpl) menghadap petak sawah warna-warni Sembalun dan dinding raksasa Gunung Rinjani.",
      en: "2D1N overnight camping on Pergasingan Hill (1,670m) overlooking the geometric patchwork fields of Sembalun and Mount Rinjani.",
      it: "Campeggio di 2 giorni e 1 notte su Bukit Pergasingan (1.670m) con vista sui campi geometrici di Sembalun e sul Rinjani.",
    },
    highlights: {
      id: ["Wajib Menginap 2D1N (Full Tenda & Makan Hangat)", "Sunset Petak Sawah Sembalun & Langit Milky Way", "Cerita Api Unggun Sejarah Kaldera Samalas"],
      en: ["Mandatory 2D1N Camping Setup & Warm Meals", "Sembalun Patchwork Sunset & Milky Way Sky", "Campfire Storytelling on Samalas Caldera History"],
      it: ["Campeggio Obbligatorio 2G1N con Tenda e Pasti", "Tramonto sui Campi di Sembalun e Via Lattea", "Racconti intorno al Fuoco con la Guida"],
    },
    storyTeaser: {
      id: "Asal-usul tradisi gasing kayu raksasa di atas punggungan Bukit Pergasingan seusai musim panen.",
      en: "The origin of the giant wooden spinning-top tradition atop Pergasingan Hill.",
      it: "L'origine della tradizione delle grandi trottole di legno su Bukit Pergasingan.",
    },
    priceIdr: 1900000,
  },
  {
    id: "pkg-bukit-sempana",
    pillar: "mountain",
    subCategory: "bukit-menginap",
    regency: "Kab. Lombok Timur",
    destinationNames: "Bukit Sempana Sembalun (2.329 mdpl)",
    duration: "2D1N Mandatory Overnight Camping",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Bukit Sempana",
      en: "Overnight Camp • Sempana Hill",
      it: "Campeggio • Bukit Sempana",
    },
    title: {
      id: "Bukit Sempana Sembalun (Camping Menginap 2D1N)",
      en: "Bukit Sempana Sembalun (2D1N Overnight Camping)",
      it: "Bukit Sempana Sembalun (Campeggio 2G1N)",
    },
    desc: {
      id: "Paket menginap 2 hari 1 malam di Bukit Sempana (2.329 mdpl) dengan lanskap punggungan sabana panjang yang memukau di sisi timur kaldera Sembalun.",
      en: "2D1N overnight camping on Sempana Hill (2,329m) featuring dramatic rolling savanna ridges on the eastern rim of Sembalun.",
      it: "Campeggio di 2G1N su Bukit Sempana (2.329m) lungo le creste della savana orientale di Sembalun.",
    },
    highlights: {
      id: ["Kemah di Sabana Punggungan Bukit Sempana (2.329m)", "Sunrise Lautan Awan & Dinding Kaldera Timur", "100% Paket Menginap bersama Guide & Porter"],
      en: ["Savanna Ridge Camp at 2,329m", "Sea of Clouds Sunrise & Eastern Caldera Wall", "100% Overnight Guided Camping Experience"],
      it: ["Campo sulla Cresta della Savana a 2.329m", "Alba sul Mare di Nuvole", "Esperienza Completa in Tenda con Guida"],
    },
    storyTeaser: {
      id: "Kisah jalur kuno para pencari kayu cendana dan obat hutan di sabana Bukit Sempana.",
      en: "Stories of traditional herbalists along the savanna ridges of Sempana Hill.",
      it: "I racconti degli antichi sentieri lungo la savana di Bukit Sempana.",
    },
    priceIdr: 1850000,
  },
  {
    id: "pkg-bukit-anak-dara",
    pillar: "mountain",
    subCategory: "bukit-menginap",
    regency: "Kab. Lombok Timur",
    destinationNames: "Bukit Anak Dara Sembalun (1.923 mdpl)",
    duration: "2D1N Mandatory Overnight Camping",
    image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Bukit Anak Dara",
      en: "Overnight Camp • Anak Dara Hill",
      it: "Campeggio • Bukit Anak Dara",
    },
    title: {
      id: "Bukit Anak Dara Sembalun (Camping Menginap 2D1N)",
      en: "Bukit Anak Dara Sembalun (2D1N Overnight Camping)",
      it: "Bukit Anak Dara Sembalun (Campeggio 2G1N)",
    },
    desc: {
      id: "Paket berkemah 2 hari 1 malam di puncak Bukit Anak Dara (1.923 mdpl), melewati Tanjakan Cinta dan menikmati matahari terbit tepat di hadapan siluet Gunung Rinjani.",
      en: "2D1N overnight camping on Anak Dara Hill (1,923m), ascending Tanjakan Cinta for a direct sunrise view facing Mount Rinjani.",
      it: "Campeggio di 2G1N su Bukit Anak Dara (1.923m) con vista diretta sull'alba di fronte al Monte Rinjani.",
    },
    highlights: {
      id: ["Kemah Puncak Bukit Anak Dara (1.923 mdpl)", "Jalur Hutan Pinus & Sabana Tanjakan Cinta", "100% Paket Menginap (Tanpa Tek-Tok)"],
      en: ["Summit Ridge Camp at 1,923m", "Pine Forest & Tanjakan Cinta Savanna Trail", "Strictly Overnight Camping Package"],
      it: ["Campo in Vetta a 1.923m", "Sentiero nella Foresta e Savana", "Pacchetto Esclusivo con Pernottamento"],
    },
    storyTeaser: {
      id: "Asal-usul legenda lokal di balik penamaan Bukit Anak Dara di desa Sembalun Lawang.",
      en: "The local Sembalun Lawang legend behind the name Bukit Anak Dara.",
      it: "La leggenda locale di Sembalun Lawang legata al nome Bukit Anak Dara.",
    },
    priceIdr: 1850000,
  },
  {
    id: "pkg-bukit-nanggi",
    pillar: "mountain",
    subCategory: "bukit-menginap",
    regency: "Kab. Lombok Timur",
    destinationNames: "Bukit Nanggi Sembalun (2.300 mdpl)",
    duration: "2D1N Mandatory Overnight Camping",
    image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Wajib Menginap • Bukit Nanggi",
      en: "Overnight Camp • Nanggi Hill",
      it: "Campeggio • Bukit Nanggi",
    },
    title: {
      id: "Bukit Nanggi Sembalun (Camping Menginap 2D1N)",
      en: "Bukit Nanggi Sembalun (2D1N Overnight Camping)",
      it: "Bukit Nanggi Sembalun (Campeggio 2G1N)",
    },
    desc: {
      id: "Berkemah 2 hari 1 malam di titik tertinggi bukit selatan Sembalun Bumbung (2.300 mdpl) dengan pemandangan Selat Alas hingga Pulau Sumbawa.",
      en: "2D1N overnight camp atop Bukit Nanggi (2,300m) in Sembalun Bumbung overlooking both Mount Rinjani and the Alas Strait to Sumbawa.",
      it: "Campeggio di 2G1N su Bukit Nanggi (2.300m) con vista sul Rinjani e sullo stretto di Alas fino a Sumbawa.",
    },
    highlights: {
      id: ["Kemah di Puncak Bukit Nanggi (2.300 mdpl)", "Panorama Ganda: Lembah Sembalun & Selat Alas", "Suasana Kemah Tenang & Langit Bintang Jernih"],
      en: ["High Camp at 2,300m on Bukit Nanggi", "Dual Panorama: Sembalun Valley & Alas Strait", "Quiet Wilderness Camp & Starry Night Sky"],
      it: ["Campo in Quota a 2.300m su Bukit Nanggi", " Doppio Panorama: Valle di Sembalun e Stretto di Alas", "Cielo Stellato Incontaminato"],
    },
    storyTeaser: {
      id: "Mengapa puncak Bukit Nanggi menjadi tempat pengamatan arah angin dan musim bagi tetua Sembalun Bumbung?",
      en: "Why Bukit Nanggi served as a seasonal weather lookout for Sembalun Bumbung elders.",
      it: "Perché Bukit Nanggi era il punto di osservazione delle stagioni per gli anziani di Sembalun.",
    },
    priceIdr: 1900000,
  },

  // ===========================================================================
  // PILAR 2: LAUT & PANTAI (8 DESTINASI EKSPLISIT PER KABUPATEN)
  // ===========================================================================
  {
    id: "pkg-tanjung-aan-merese",
    pillar: "beach",
    subCategory: "lombok-tengah",
    regency: "Kab. Lombok Tengah",
    destinationNames: "Pantai Tanjung Aan & Bukit Merese",
    duration: "Full Day / Custom Coastal",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Pantai Tanjung Aan & Bukit Merese",
      en: "Tanjung Aan & Merese Hill",
      it: "Tanjung Aan e Bukit Merese",
    },
    title: {
      id: "Pantai Tanjung Aan & Bukit Merese",
      en: "Tanjung Aan Beach & Merese Hill Headland",
      it: "Spiaggia di Tanjung Aan e Promontorio di Bukit Merese",
    },
    desc: {
      id: "Teluk kembar berpasir merica di Pantai Tanjung Aan berpadu dengan panorama tanjung hijau Bukit Merese yang menghadap Samudra Hindia di Kabupaten Lombok Tengah.",
      en: "Twin pepper-sand bays at Tanjung Aan paired with the sweeping ocean headland of Merese Hill in Central Lombok Regency.",
      it: "Le doppie baie di sabbia corallina di Tanjung Aan e il promontorio panoramico di Bukit Merese a Lombok Centrale.",
    },
    highlights: {
      id: ["Pasir Merica Unik Pantai Tanjung Aan", "Sunset 360 Derajat di Puncak Bukit Merese", "Kisah Legenda Putri Mandalika di Pesisir Selatan"],
      en: ["Unique Pepper-Sand Shore of Tanjung Aan", "360-Degree Sunset on Merese Hill", "On-Site Legend of Princess Mandalika"],
      it: ["Sabbia Corallina di Tanjung Aan", "Tramonto Panoramico su Bukit Merese", "Il Racconto della Principessa Mandalika"],
    },
    storyTeaser: {
      id: "Mengapa cacing laut Nyale hanya muncul satu kali dalam setahun tepat di karang pesisir sekitar Tanjung Aan?",
      en: "Why do the sacred Nyale sea worms appear only once a year along this exact stretch of reef?",
      it: "Perché i sacri Nyale compaiono solo una volta all'anno lungo questa scogliera?",
    },
    priceIdr: 700000,
  },
  {
    id: "pkg-mawun-selong-belanak",
    pillar: "beach",
    subCategory: "lombok-tengah",
    regency: "Kab. Lombok Tengah",
    destinationNames: "Pantai Mawun & Pantai Selong Belanak",
    duration: "Full Day Surf & Cove",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Pantai Mawun & Selong Belanak",
      en: "Mawun & Selong Belanak",
      it: "Mawun e Selong Belanak",
    },
    title: {
      id: "Pantai Mawun & Pantai Selong Belanak",
      en: "Mawun Horseshoe Cove & Selong Belanak Beach",
      it: "Baia di Mawun e Spiaggia di Selong Belanak",
    },
    desc: {
      id: "Teluk tapal kuda biru kehijauan di Pantai Mawun yang diapit dua bukit tinggi, dilanjutkan ke garis pantai landai berpasir sehalus tepung di Pantai Selong Belanak.",
      en: "The turquoise horseshoe bay of Mawun framed by twin hills, paired with the powdery crescent shore and gentle surf of Selong Belanak.",
      it: "La baia a ferro di cavallo di Mawun e la lunga spiaggia di sabbia finissima di Selong Belanak a Lombok Centrale.",
    },
    highlights: {
      id: ["Berenang di Teluk Tapal Kuda Pantai Mawun", "Belajar Selancar & Sunset di Pantai Selong Belanak", "Melihat Tradisi Penggembala Kerbau Pesisir"],
      en: ["Swimming in Mawun Horseshoe Cove", "Gentle Surf & Sunset at Selong Belanak", "Iconic Coastal Water Buffalo Crossing"],
      it: ["Nuoto nella Baia di Mawun", "Surf e Tramonto a Selong Belanak", "Tradizioni Costiere di Lombok Centrale"],
    },
    storyTeaser: {
      id: "Bagaimana dua bukit pengapit Teluk Mawun meredam arus besar Samudra Hindia menjadi laguna tenang?",
      en: "How the twin headlands of Mawun calm the raw Indian Ocean swell into a sheltered bay.",
      it: "Come i due promontori di Mawun proteggono la baia dalle onde dell'Oceano Indiano.",
    },
    priceIdr: 700000,
  },
  {
    id: "pkg-pink-beach-tangsi",
    pillar: "beach",
    subCategory: "lombok-timur",
    regency: "Kab. Lombok Timur",
    destinationNames: "Pantai Pink (Tangsi), Pantai Segui & Tebing Tanjung Ringgit",
    duration: "Full Day East Coast",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Pantai Pink Tangsi & Tanjung Ringgit",
      en: "Pink Beach & Tanjung Ringgit",
      it: "Pink Beach e Tanjung Ringgit",
    },
    title: {
      id: "Pantai Pink (Tangsi) & Tebing Karang Tanjung Ringgit",
      en: "Pink Beach (Tangsi) & Tanjung Ringgit Ocean Cliffs",
      it: "Pink Beach (Tangsi) e Scogliere di Tanjung Ringgit",
    },
    desc: {
      id: "Hamparan pasir merah muda alami dari serpihan koral Homotrema rubrum di Pantai Pink Tangsi dan Pantai Segui, serta tebing karang 40 meter di ujung Tanjung Ringgit.",
      en: "Natural blush-pink sands formed by red coral fragments at Tangsi and Segui beaches, paired with the 40-meter cliffs of Tanjung Ringgit.",
      it: "Sabbia rosa naturale a Tangsi e Segui unita alle imponenti scogliere di 40 metri di Tanjung Ringgit a Lombok Orientale.",
    },
    highlights: {
      id: ["Jelajah Pantai Pink 1 (Tangsi), Pink 2 (Segui) & Gili Petelu", "Tebing Samudra & Gua Sejarah Tanjung Ringgit", "Mata Air Tawar Rahasia di Bawah Tebing Karang"],
      en: ["Pink Beach 1 (Tangsi), Pink Beach 2 (Segui) & Gili Petelu", "40m Ocean Cliffs & Historic Caverns of Tanjung Ringgit", "Hidden Freshwater Spring at Low Tide"],
      it: ["Pink Beach 1, Pink Beach 2 e Isolotto di Gili Petelu", "Scogliere di 40m a Tanjung Ringgit", "Sorgente d'Acqua Dolce Nascosta"],
    },
    storyTeaser: {
      id: "Kisah mata air tawar di kaki tebing Tanjung Ringgit yang tidak pernah asin meski terendam pasang laut.",
      en: "The secret freshwater spring at the base of Tanjung Ringgit that stays sweet even after high tide.",
      it: "Il segreto della sorgente d'acqua dolce alla base delle scogliere di Tanjung Ringgit.",
    },
    priceIdr: 1250000,
  },
  {
    id: "pkg-gili-kondo-petagan",
    pillar: "beach",
    subCategory: "lombok-timur",
    regency: "Kab. Lombok Timur",
    destinationNames: "Gili Kondo, Gili Petagan, Gili Bidara & Gili Kapal",
    duration: "Full Day / Island Hopping",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Gili Kondo, Petagan & Bidara",
      en: "Gili Kondo, Petagan & Bidara",
      it: "Gili Kondo, Petagan e Bidara",
    },
    title: {
      id: "Gili Kondo, Gili Petagan, Gili Bidara & Gili Kapal",
      en: "Gili Kondo, Gili Petagan, Gili Bidara & Gili Kapal",
      it: "Gili Kondo, Gili Petagan, Gili Bidara e Gili Kapal",
    },
    desc: {
      id: "Empat gili tenang di timur laut Kabupaten Lombok Timur: hutan bakau purba Gili Petagan, taman koral Gili Kondo & Gili Bidara, serta pulau pasir timbul Gili Kapal.",
      en: "Four tranquil islands off northeast East Lombok: the ancient mangrove channels of Gili Petagan, coral gardens of Gili Kondo & Bidara, and Gili Kapal sandbar.",
      it: "Quattro isole tranquille a Lombok Orientale: le mangrovie di Gili Petagan, i coralli di Gili Kondo e Bidara e la lingua di sabbia di Gili Kapal.",
    },
    highlights: {
      id: ["Menyusuri Lorong Hutan Bakau Purba Gili Petagan", "Snorkeling Koral Utuh di Gili Kondo & Gili Bidara", "Berjalan di Pulau Pasir Timbul Gili Kapal berlatar Rinjani"],
      en: ["Boat Safari Through Gili Petagan Mangrove Channels", "Pristine Coral Snorkeling at Gili Kondo & Bidara", "Gili Kapal Sandbar with Mount Rinjani Backdrop"],
      it: ["Canali di Mangrovie di Gili Petagan", "Snorkeling a Gili Kondo e Gili Bidara", "Lingua di Sabbia di Gili Kapal"],
    },
    storyTeaser: {
      id: "Mengapa hutan bakau Gili Petagan menjadi benteng alami yang dijaga ketat sejak berabad-abad lalu?",
      en: "How Gili Petagan's ancient mangrove forest has sheltered eastern fishermen for centuries.",
      it: "Come l'antica foresta di mangrovie di Gili Petagan protegge la costa orientale da secoli.",
    },
    priceIdr: 1600000,
  },
  {
    id: "pkg-3-gili-utara",
    pillar: "beach",
    subCategory: "lombok-utara",
    regency: "Kab. Lombok Utara",
    destinationNames: "Gili Trawangan, Gili Meno & Gili Air",
    duration: "Full Day / Overnight Island",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Gili Trawangan, Gili Meno & Gili Air",
      en: "Gili Trawangan, Meno & Air",
      it: "Gili Trawangan, Meno e Air",
    },
    title: {
      id: "Gili Trawangan, Gili Meno & Gili Air",
      en: "Gili Trawangan, Gili Meno & Gili Air",
      it: "Gili Trawangan, Gili Meno e Gili Air",
    },
    desc: {
      id: "Tiga pulau bebas polusi kendaraan bermotor di Kabupaten Lombok Utara dengan konservasi penyu hijau, patung bawah air, dan danau air asin alami di Gili Meno.",
      en: "Three car-free coral islands in North Lombok Regency featuring sea turtle sanctuaries, underwater sculptures, and Gili Meno's inland saltwater lake.",
      it: "Le tre celebri isole senza auto di Lombok Settentrionale con tartarughe marine, sculture subacquee e il lago salato di Gili Meno.",
    },
    highlights: {
      id: ["Snorkeling Titik Penyu Hijau di Gili Meno & Gili Air", "Eksplorasi Danau Asin & Hutan Bakau Gili Meno", "Bersepeda Keliling Pulau & Sunset di Gili Trawangan"],
      en: ["Green Sea Turtle Snorkeling at Gili Meno & Air", "Gili Meno Saltwater Lake & Bird Sanctuary", "Island Cycling & Sunset on Gili Trawangan"],
      it: ["Snorkeling con le Tartarughe a Gili Meno e Air", "Lago Salato di Gili Meno", "Giro in Bicicletta e Tramonto a Gili Trawangan"],
    },
    storyTeaser: {
      id: "Sejarah para pelaut Bugis dan Mandar yang pertama kali membuka pemukiman dan memberi nama ketiga Gili.",
      en: "How Bugis and Mandar seafarers first settled and named the three Gili islands.",
      it: "La storia degli antichi navigatori che diedero il nome alle tre isole Gili.",
    },
    priceIdr: 1200000,
  },
  {
    id: "pkg-pantai-sire",
    pillar: "beach",
    subCategory: "lombok-utara",
    regency: "Kab. Lombok Utara",
    destinationNames: "Pantai Sire & Pesisir Tanjung",
    duration: "Half / Full Day North Coast",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Pantai Sire • Lombok Utara",
      en: "Sire Beach • North Lombok",
      it: "Spiaggia di Sire • Nord",
    },
    title: {
      id: "Pantai Sire & Pesisir Tanjung (Lombok Utara)",
      en: "Sire Beach & Tanjung Coastline (North Lombok)",
      it: "Spiaggia di Sire e Costa di Tanjung (Lombok Nord)",
    },
    desc: {
      id: "Garis pantai tenang berhias deretan pohon kelapa di Kabupaten Lombok Utara dengan latar langsung kemegahan Gunung Rinjani di sisi timur dan gugusan 3 Gili di sisi barat.",
      en: "Palm-fringed tranquil shoreline in North Lombok offering a rare dual vista of Mount Rinjani to the east and the three Gili islands across the strait.",
      it: "Spiaggia tranquilla orlata di palme a Lombok Settentrionale con vista diretta sul Monte Rinjani e sulle isole Gili.",
    },
    highlights: {
      id: ["Panorama Langsung Gunung Rinjani dari Tepi Pantai Sire", "Perairan Dangkal Tenang untuk Kayak & Snorkeling", "Menyaksikan Perahu Cadik Nelayan Tradisional Tanjung"],
      en: ["Direct Mount Rinjani View from Sire Shoreline", "Calm Lagoon Waters for Kayaking & Swimming", "Traditional Outrigger Fishing Boats of Tanjung"],
      it: ["Vista sul Monte Rinjani dalla Spiaggia di Sire", "Acque Calme Ideali per Nuoto e Kayak", "Barche Tradizionali dei Pescatori di Tanjung"],
    },
    storyTeaser: {
      id: "Tradisi syukuran laut masyarakat pesisir Sire dan Tanjung setiap musim tangkap ikan.",
      en: "Maritime thanksgiving traditions of the Sire and Tanjung coastal communities.",
      it: "Le antiche tradizioni marinare della costa di Sire e Tanjung.",
    },
    priceIdr: 750000,
  },
  {
    id: "pkg-secret-gili-sekotong",
    pillar: "beach",
    subCategory: "lombok-barat",
    regency: "Kab. Lombok Barat",
    destinationNames: "Gili Kedis, Gili Sudak & Gili Nanggu (Sekotong)",
    duration: "Full Day Southwest Island Hopping",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Gili Kedis, Sudak & Nanggu",
      en: "Gili Kedis, Sudak & Nanggu",
      it: "Gili Kedis, Sudak e Nanggu",
    },
    title: {
      id: "Gili Kedis, Gili Sudak & Gili Nanggu (Secret Gilis Sekotong)",
      en: "Gili Kedis, Gili Sudak & Gili Nanggu (Secret Gilis of Sekotong)",
      it: "Gili Kedis, Gili Sudak e Gili Nanggu (Gili Segrete di Sekotong)",
    },
    desc: {
      id: "Eksplorasi tiga pulau tenang di semenanjung Sekotong, Kabupaten Lombok Barat: pulau pasir mungil berbentuk hati di Gili Kedis, santap siang laut di Gili Sudak, dan taman ikan jinak di Gili Nanggu.",
      en: "Explore three serene islands in Sekotong, West Lombok: the tiny heart-shaped sandbar of Gili Kedis, grilled seafood on Gili Sudak, and reef sanctuaries at Gili Nanggu.",
      it: "Tre isole tranquille a Sekotong (Lombok Occidentale): l'isolotto di Gili Kedis, Gili Sudak e la barriera corallina di Gili Nanggu.",
    },
    highlights: {
      id: ["Pulau Pasir Mungil Gili Kedis yang Bisa Dikelilingi 5 Menit", "Snorkeling Ribuan Ikan Karang Jinak di Gili Nanggu", "Santap Siang Ikan Bakar Segar di Tepi Gili Sudak"],
      en: ["Tiny Gili Kedis Island Walkable in 5 Minutes", "Calm Reef Snorkeling at Gili Nanggu", "Fresh Beachside Grilled Fish on Gili Sudak"],
      it: ["L'Isolotto di Sabbia di Gili Kedis", "Snorkeling nella Laguna di Gili Nanggu", "Pranzo di Pesce sulla Spiaggia di Gili Sudak"],
    },
    storyTeaser: {
      id: "Kisah teluk-teluk tenang Sekotong yang menjadi lokasi budidaya mutiara laut selatan terbaik di NTB.",
      en: "How Sekotong's sheltered bays became home to world-renowned South Sea pearl cultivation.",
      it: "Come le baie protette di Sekotong sono diventate celebri per le perle dei Mari del Sud.",
    },
    priceIdr: 800000,
  },
  {
    id: "pkg-teluk-mekaki",
    pillar: "beach",
    subCategory: "lombok-barat",
    regency: "Kab. Lombok Barat",
    destinationNames: "Teluk Mekaki & Pesisir Selatan Sekotong",
    duration: "Full Day Scenic Bay",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Teluk Mekaki • Lombok Barat",
      en: "Mekaki Bay • West Lombok",
      it: "Baia di Mekaki • Lombok Ovest",
    },
    title: {
      id: "Teluk Mekaki & Bukit Pesisir Sekotong Selatan",
      en: "Mekaki Bay & Southern Sekotong Coastal Hills",
      it: "Baia di Mekaki e Colline Costiere di Sekotong Sud",
    },
    desc: {
      id: "Teluk melengkung berbentuk amfiteater alami dengan gradasi air biru pirus di ujung barat daya Kabupaten Lombok Barat yang masih sangat sunyi dan alami.",
      en: "A dramatic natural amphitheater bay of turquoise water tucked in the far southwest corner of West Lombok Regency.",
      it: "Una spettacolare baia ad anfiteatro dalle acque turchesi nell'estremo sud-ovest di Lombok Occidentale.",
    },
    highlights: {
      id: ["Panorama Teluk Mekaki dari Jalan Punggungan Bukit", "Pantai Pasir Putih Sunyi Bebas Keramaian", "Rute Eksplorasi Pesisir Selatan Sekotong"],
      en: ["Panoramic Ridge Overlook Above Mekaki Bay", "Untouched White-Sand Shoreline", "Scenic Southwest Coastal Drive"],
      it: ["Vista Panoramica dall'Alto sulla Baia di Mekaki", "Spiaggia Incontaminata e Silenziosa", "Percorso Panoramico Costiero a Sekotong"],
    },
    storyTeaser: {
      id: "Sejarah jalur lintas pesisir barat daya yang menghubungkan pelabuhan tua Lembar dengan teluk selatan.",
      en: "Stories of the old southwest coastal trails linking Lembar harbor to the southern bays.",
      it: "La storia degli antichi sentieri costieri del sud-ovest di Lombok.",
    },
    priceIdr: 750000,
  },

  // ===========================================================================
  // PILAR 3: HERITAGE BUDAYA (8 DESTINASI EKSPLISIT PER KABUPATEN)
  // ===========================================================================
  {
    id: "pkg-desa-sade-ende",
    pillar: "heritage",
    subCategory: "lombok-tengah",
    regency: "Kab. Lombok Tengah",
    destinationNames: "Desa Adat Sade & Desa Adat Ende",
    duration: "Half / Full Day Sasak Heritage",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Desa Adat Sade & Desa Adat Ende",
      en: "Sade & Ende Traditional Villages",
      it: "Villaggi Tradizionali Sade ed Ende",
    },
    title: {
      id: "Desa Adat Sade & Desa Adat Ende",
      en: "Sade & Ende Traditional Sasak Villages",
      it: "Villaggi Tradizionali Sasak di Sade ed Ende",
    },
    desc: {
      id: "Menelusuri lorong rumah adat Bale Tani dan Lumbung beratap alang-alang yang tahan gempa di Desa Adat Sade dan Desa Adat Ende, Kabupaten Lombok Tengah.",
      en: "Walk through earthquake-resilient Bale Tani houses and iconic rice barns in the living Sasak villages of Sade and Ende in Central Lombok.",
      it: "Scopri le case antisismiche Bale Tani e i granai tradizionali nei villaggi Sasak di Sade ed Ende a Lombok Centrale.",
    },
    highlights: {
      id: ["Arsitektur Bale Tani & Lumbung Asli Suku Sasak", "Dialog Langsung Bersama Warga & Pemandu Lokal Desa", "Pertunjukan Musik Gendang Beleq & Peresean"],
      en: ["Authentic Sasak Bale Tani & Lumbung Architecture", "Direct Dialogue with Village Elders", "Traditional Gendang Beleq & Peresean Heritage"],
      it: ["Architettura Originale Bale Tani e Lumbung", "Incontro Diretto con gli Anziani del Villaggio", "Tradizioni Musicali e Culturali Sasak"],
    },
    storyTeaser: {
      id: "Mengapa pintu rumah adat Bale Tani dibuat rendah sehingga setiap tamu wajib menundukkan kepala saat masuk?",
      en: "Why is the entrance of every Bale Tani house intentionally built low so every guest must bow upon entering?",
      it: "Perché l'ingresso di ogni casa tradizionale Bale Tani è costruito basso?",
    },
    priceIdr: 750000,
  },
  {
    id: "pkg-tenun-sukarara-mandalika",
    pillar: "heritage",
    subCategory: "lombok-tengah",
    regency: "Kab. Lombok Tengah",
    destinationNames: "Sentra Tenun Sukarara & Situs Bau Nyale Pantai Seger",
    duration: "Half / Full Day Weaving & Folklore",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Sentra Tenun Sukarara & Situs Bau Nyale",
      en: "Sukarara Weaving & Bau Nyale Site",
      it: "Tessitura Sukarara e Sito Bau Nyale",
    },
    title: {
      id: "Sentra Tenun Sukarara & Situs Legenda Putri Mandalika (Bau Nyale)",
      en: "Sukarara Handweaving Center & Princess Mandalika Bau Nyale Site",
      it: "Centro di Tessitura Sukarara e Sito della Leggenda di Mandalika",
    },
    desc: {
      id: "Menyaksikan langsung pembuatan kain songket dan tenun ikat motif Subahnale di Desa Sukarara, serta mengunjungi Bukit Seger tempat berawalnya tradisi Bau Nyale.",
      en: "Witness master weavers crafting gold-threaded Songket and Subahnale textiles in Sukarara, followed by the legendary Bau Nyale coast at Seger.",
      it: "Amira le maestre tessitrici di Sukarara mentre creano i preziosi tessuti Songket e Subahnale, e visita il sito costiero di Bau Nyale.",
    },
    highlights: {
      id: ["Mencoba Alat Tenun Gedogan Tradisional di Sukarara", "Mempelajari Makna Filosofis Motif Subahnale, Keker & Lumbung", "Mengunjungi Monumen & Tebing Legenda Putri Mandalika"],
      en: ["Hands-On Traditional Loom Experience in Sukarara", "Decoding Subahnale & Keker Sacred Motifs", "Visiting the Princess Mandalika Headland at Seger"],
      it: ["Esperienza Diretta al Telaio Tradizionale di Sukarara", "Significato Filosofico dei Motivi Subahnale", "Visita al Promontorio della Principessa Mandalika"],
    },
    storyTeaser: {
      id: "Mengapa setiap gadis di Desa Sukarara diwajibkan menguasai tenun motif warisan sebelum melangsungkan pernikahan?",
      en: "Why every young woman in Sukarara traditionally masters sacred weaving patterns before marriage.",
      it: "Perché ogni giovane donna di Sukarara impara l'arte della tessitura prima del matrimonio.",
    },
    priceIdr: 750000,
  },
  {
    id: "pkg-masjid-kuno-bayan",
    pillar: "heritage",
    subCategory: "lombok-utara",
    regency: "Kab. Lombok Utara",
    destinationNames: "Masjid Kuno Bayan Beleq (Abad ke-16)",
    duration: "Full Day North Heritage",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Masjid Kuno Bayan Beleq (Abad ke-16)",
      en: "Bayan Beleq Ancient Mosque (16th C.)",
      it: "Antica Moschea Bayan Beleq (XVI Sec.)",
    },
    title: {
      id: "Masjid Kuno Bayan Beleq (Cagar Budaya Abad ke-16)",
      en: "Bayan Beleq Ancient Mosque (16th-Century Heritage Site)",
      it: "Antica Moschea di Bayan Beleq (Monumento del XVI Secolo)",
    },
    desc: {
      id: "Masjid tertua di Pulau Lombok yang berdiri sejak abad ke-16 di Kecamatan Bayan, Kabupaten Lombok Utara, dengan konstruksi bambu, atap ijuk, dan makam para penyebar Islam awal.",
      en: "The oldest mosque on Lombok Island, standing since the 16th century in Bayan, North Lombok, built with bamboo walls, palm-fiber roof, and ancestral shrines.",
      it: "La moschea più antica dell'isola di Lombok, eretta nel XVI secolo a Bayan con pareti di bambù e tetto in fibra naturale.",
    },
    highlights: {
      id: ["Arsitektur Asli Abad ke-16 Tanpa Paku Besi", "Kompleks Makam Leluhur Gauz Abdul Razak", "Penjelasan Sejarah Masuknya Islam di Lombok Utara"],
      en: ["Original 16th-Century Joinery Without Iron Nails", "Ancestral Shrines Surrounding the Mosque", "In-Depth History of Early Islam in North Lombok"],
      it: ["Architettura Originale del XVI Secolo Senza Chiodi", "Mausolei Storici di Bayan", "Storia Antica di Lombok Settentrionale"],
    },
    storyTeaser: {
      id: "Bagaimana prosesi adat peremajaan atap bambu dan ijuk Masjid Kuno Bayan Beleq dilakukan secara gotong royong?",
      en: "How the traditional community restoration ceremony for Bayan Beleq's bamboo roof is performed.",
      it: "Come si svolge l'antica cerimonia comunitaria per il restauro del tetto di Bayan Beleq.",
    },
    priceIdr: 850000,
  },
  {
    id: "pkg-desa-adat-senaru",
    pillar: "heritage",
    subCategory: "lombok-utara",
    regency: "Kab. Lombok Utara",
    destinationNames: "Desa Adat Senaru, Hutan Adat Awiq-Awiq & Air Terjun Sendang Gile",
    duration: "Full Day Highland Culture & Nature",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Desa Adat Senaru & Hutan Awiq-Awiq",
      en: "Senaru Village & Awiq-Awiq Forest",
      it: "Villaggio di Senaru e Foresta Sacra",
    },
    title: {
      id: "Desa Adat Senaru, Hukum Adat Hutan Awiq-Awiq & Sendang Gile",
      en: "Senaru Customary Village, Awiq-Awiq Forest & Sendang Gile Waterfall",
      it: "Villaggio Tradizionale di Senaru, Foresta Awiq-Awiq e Cascate",
    },
    desc: {
      id: "Mengunjungi kompleks rumah adat tertua di gerbang utara Rinjani, mempelajari kearifan hukum adat Awiq-Awiq penjaga hutan dan mata air, serta menyegarkan diri di Air Terjun Sendang Gile & Tiu Kelep.",
      en: "Visit the oldest customary hamlet at Rinjani's northern gate, learn about Awiq-Awiq forest conservation laws, and trek to Sendang Gile and Tiu Kelep waterfalls.",
      it: "Visita il villaggio tradizionale di Senaru alle pendici settentrionali del Rinjani, scopri le leggi forestali Awiq-Awiq e le cascate di Sendang Gile.",
    },
    highlights: {
      id: ["Kompleks Karang Bajo & Desa Adat Senaru", "Falsafah Hukum Adat Hutan Awiq-Awiq Lereng Rinjani", "Trekking Ringan ke Air Terjun Sendang Gile & Tiu Kelep"],
      en: ["Traditional Senaru & Karang Bajo Hamlets", "Awiq-Awiq Customary Forest Protection Philosophy", "Guided Walk to Sendang Gile & Tiu Kelep Waterfalls"],
      it: ["Nucleo Storico di Senaru e Karang Bajo", "Filosofia di Tutela Forestale Awiq-Awiq", "Escursione alle Cascate Sendang Gile e Tiu Kelep"],
    },
    storyTeaser: {
      id: "Bagaimana hukum adat Awiq-Awiq di Senaru menjaga mata air tidak pernah kering selama ratusan tahun?",
      en: "How Senaru's Awiq-Awiq customary law has kept mountain springs flowing for centuries.",
      it: "Come la legge tradizionale Awiq-Awiq ha protetto le sorgenti del Rinjani per secoli.",
    },
    priceIdr: 855000,
  },
  {
    id: "pkg-sembalun-bumbung",
    pillar: "heritage",
    subCategory: "lombok-timur",
    regency: "Kab. Lombok Timur",
    destinationNames: "7 Rumah Adat Kuno Sembalun Bumbung (Desa Beleq)",
    duration: "Half / Full Day Highland Heritage",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "7 Rumah Adat Sembalun Bumbung",
      en: "7 Ancestral Houses of Sembalun",
      it: "7 Case Ancestrali di Sembalun",
    },
    title: {
      id: "7 Rumah Adat Kuno Sembalun Bumbung (Situs Desa Beleq)",
      en: "The 7 Ancient Ancestral Houses of Sembalun Bumbung (Desa Beleq)",
      it: "Le 7 Case Ancestrali Antiche di Sembalun Bumbung (Desa Beleq)",
    },
    desc: {
      id: "Situs bersejarah Desa Beleq di Sembalun Bumbung, Kabupaten Lombok Timur, yang melestarikan tujuh rumah adat pertama cikal bakal masyarakat lereng timur Gunung Rinjani.",
      en: "The historic Desa Beleq compound in Sembalun Bumbung, East Lombok, preserving the seven original ancestral homes of the eastern Rinjani highlands.",
      it: "Il sito storico di Desa Beleq a Sembalun Bumbung (Lombok Orientale) che conserva le sette case originarie degli antenati di Sembalun.",
    },
    highlights: {
      id: ["Meninjau Langsung 7 Bangunan Asli Desa Beleq", "Kisah Babad Selaparang & Leluhur Sembalun", "Kebun Kopi Arabika & Hortikultura Lereng Rinjani"],
      en: ["Inside the 7 Original Ancestral Homes of Desa Beleq", "Chronicles of Selaparang & Sembalun Founders", "Highland Arabica Coffee & Orchard Walk"],
      it: ["Visita alle 7 Case Storiche di Desa Beleq", "Storia degli Antenati della Valle di Sembalun", "Piantagioni di Caffè Arabica d'Alta Quota"],
    },
    storyTeaser: {
      id: "Mengapa jumlah rumah di dalam pagar batu Desa Beleq tidak pernah boleh ditambah melebihi tujuh bangunan?",
      en: "Why the number of houses inside Desa Beleq's stone wall may never exceed seven.",
      it: "Perché il numero di case dentro il recinto sacro di Desa Beleq deve rimanere sempre sette.",
    },
    priceIdr: 800000,
  },
  {
    id: "pkg-gerabah-masbagik",
    pillar: "heritage",
    subCategory: "lombok-timur",
    regency: "Kab. Lombok Timur",
    destinationNames: "Sentra Gerabah Tanah Liat Masbagik & Penakak",
    duration: "Half Day Craft & Culture",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Sentra Gerabah Masbagik",
      en: "Masbagik Clay Pottery Center",
      it: "Centro Ceramica di Masbagik",
    },
    title: {
      id: "Sentra Gerabah Tanah Liat Masbagik (Lombok Timur)",
      en: "Masbagik Traditional Earth-Fired Pottery Village (East Lombok)",
      it: "Villaggio della Ceramica Tradizionale di Masbagik (Lombok Est)",
    },
    desc: {
      id: "Menyaksikan kepiawaian perajin Desa Penakak, Kecamatan Masbagik, Kabupaten Lombok Timur dalam membentuk dan membakar tembikar tanah liat secara tradisional.",
      en: "Experience the craftsmanship of Penakak village in Masbagik, East Lombok, where artisans hand-shape and fire traditional terracotta pottery.",
      it: "Scopri l'arte dei maestri vasai di Masbagik a Lombok Orientale, dove la terracotta viene modellata a mano e cotta secondo la tradizione.",
    },
    highlights: {
      id: ["Praktik Langsung Membentuk Gerabah Tanah Liat", "Melihat Proses Pembakaran Tradisional dengan Jerami", "Koleksi Kendi Maling & Tembikar Anyaman Rotan"],
      en: ["Hands-On Clay Shaping Workshop with Local Artisans", "Traditional Open-Air Straw Firing Process", "Iconic 'Kendi Maling' Trick Water Pitchers"],
      it: ["Laboratorio Pratico di Lavorazione dell'Argilla", "Cottura Tradizionale all'Aperto", "Le Celebri Brocche Tradizionali 'Kendi Maling'"],
    },
    storyTeaser: {
      id: "Bagaimana cara kerja 'Kendi Maling' khas Lombok yang diisi air dari bagian bawah namun tidak tumpah saat diletakkan?",
      en: "How does Lombok's famous 'Kendi Maling' pitcher fill from the bottom without spilling a drop?",
      it: "Come funziona la celebre brocca 'Kendi Maling' che si riempie dal fondo senza versare acqua?",
    },
    priceIdr: 700000,
  },
  {
    id: "pkg-pura-lingsar",
    pillar: "heritage",
    subCategory: "lombok-barat",
    regency: "Kab. Lombok Barat",
    destinationNames: "Pura Lingsar (Kompleks Gaduh & Kemaliq 1714)",
    duration: "Half Day West Heritage",
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Pura Lingsar (Sejak 1714)",
      en: "Pura Lingsar (Since 1714)",
      it: "Tempio Pura Lingsar (Dal 1714)",
    },
    title: {
      id: "Pura Lingsar (Simbol Harmoni Kemaliq & Gaduh Sejak 1714)",
      en: "Pura Lingsar (1714 Symbol of Kemaliq & Gaduh Cultural Harmony)",
      it: "Pura Lingsar (Simbolo di Armonia Culturale dal 1714)",
    },
    desc: {
      id: "Kompleks bersejarah di Kabupaten Lombok Barat yang berdiri sejak 1714, menyatukan bangunan Pura Gaduh dan Kemaliq sebagai simbol kerukunan masyarakat Sasak dan Bali.",
      en: "Built in 1714 in West Lombok Regency, Pura Lingsar unites the Gaduh and Kemaliq shrines as a living monument to Sasak and Balinese harmony.",
      it: "Fondato nel 1714 a Lombok Occidentale, il complesso di Pura Lingsar unisce i santuari di Gaduh e Kemaliq in un simbolo vivente di armonia.",
    },
    highlights: {
      id: ["Menjelajahi Kompleks Pura Gaduh & Kolam Suci Kemaliq", "Kisah Sejarah Tradisi Tahunan Perang Topat", "Mata Air Alami Lingsar yang Tak Pernah Surut"],
      en: ["Explore Both Gaduh Temple & Sacred Kemaliq Spring", "History of the Annual Perang Topat Rice-Cake Festival", "Sacred Eel Pond & Natural Springs of Lingsar"],
      it: ["Visita al Tempio Gaduh e alla Sorgente Sacra Kemaliq", "Storia della Festa Tradizionale Perang Topat", "Le Sorgenti Naturali Storiche di Lingsar"],
    },
    storyTeaser: {
      id: "Mengapa tradisi Perang Topat di Pura Lingsar selalu digelar tepat saat waktu " +
        "Rarak Kembang Waru (gugurnya bunga waru menjelang senja)?",
      en: "Why the annual Perang Topat ceremony begins precisely at 'Rarak Kembang Waru' when hibiscus blossoms fall at dusk.",
      it: "Perché la cerimonia del Perang Topat inizia esattamente al tramonto quando cadono i fiori di ibisco.",
    },
    priceIdr: 700000,
  },
  {
    id: "pkg-taman-air-narmada",
    pillar: "heritage",
    subCategory: "lombok-barat",
    regency: "Kab. Lombok Barat",
    destinationNames: "Taman Air Kerajaan Narmada & Balai Petirtaan",
    duration: "Half Day Royal Garden",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
    badge: {
      id: "Taman Air Kerajaan Narmada",
      en: "Narmada Royal Water Palace",
      it: "Palazzo sull'Acqua di Narmada",
    },
    title: {
      id: "Taman Air Kerajaan Narmada (Replika Topografi Gunung Rinjani)",
      en: "Narmada Royal Water Palace (Topographical Replica of Mount Rinjani)",
      it: "Palazzo Reale sull'Acqua di Narmada (Replica del Monte Rinjani)",
    },
    desc: {
      id: "Taman kerajaan seluas lebih dari 2 hektare di Kabupaten Lombok Barat yang dibangun pada tahun 1727 sebagai miniatur Gunung Rinjani dan Danau Segara Anak.",
      en: "Constructed in 1727 across two hectares in West Lombok Regency as a royal scale miniature of Mount Rinjani and Segara Anak crater lake.",
      it: "Costruito nel 1727 su oltre due ettari a Lombok Occidentale come miniatura reale del Monte Rinjani e del lago Segara Anak.",
    },
    highlights: {
      id: ["Arsitektur Teras Bertingkat Replika Kawah Segara Anak", "Balai Petirtaan Mata Air Alami Gunung Rinjani", "Balai Loji & Taman Peristirahatan Raja"],
      en: ["Terraced Gardens Replicating Segara Anak Caldera", "Balai Petirtaan Natural Mountain Spring Pavilion", "Historic Royal Pavilions & Heritage Gardens"],
      it: ["Giardini Terrazzati che Replicano la Caldera Segara Anak", "Fonte Naturale Balai Petirtaan", "Padiglioni Storici Reali di Narmada"],
    },
    storyTeaser: {
      id: "Pertemuan tiga aliran mata air bawah tanah dari Gunung Rinjani di dalam Balai Petirtaan Narmada.",
      en: "How three underground mountain springs from Rinjani converge inside Narmada's Balai Petirtaan.",
      it: "Come tre sorgenti sotterranee del Monte Rinjani convergono nel padiglione Balai Petirtaan di Narmada.",
    },
    priceIdr: 700000,
  },
];

export function findPackage(queryOrId?: string | null): DestinationPackage {
  if (!queryOrId) return PACKAGES[0];
  const q = queryOrId.trim().toLowerCase();

  // 1. Direct ID match (e.g. "pkg-3-gili-utara", "pkg-desa-sade-ende")
  const byId = PACKAGES.find((p) => p.id.toLowerCase() === q);
  if (byId) return byId;

  // 2. Exact Title / destination match in any language
  const byTitle = PACKAGES.find(
    (p) =>
      p.title.id.toLowerCase() === q ||
      p.title.en.toLowerCase() === q ||
      p.title.it.toLowerCase() === q ||
      p.destinationNames.toLowerCase() === q
  );
  if (byTitle) return byTitle;

  // 3. Substring match
  const bySub = PACKAGES.find(
    (p) =>
      q.includes(p.destinationNames.toLowerCase()) ||
      p.destinationNames.toLowerCase().includes(q) ||
      q.includes(p.title.id.toLowerCase()) ||
      p.title.id.toLowerCase().includes(q) ||
      q.includes(p.id.replace("pkg-", "").toLowerCase())
  );
  if (bySub) return bySub;

  // 4. Keyword tokens (especially Gili Meno, Sade, Segara Anak, Torean, etc.)
  const keywords: Array<{ key: string; id: string }> = [
    { key: "meno", id: "pkg-3-gili-utara" },
    { key: "trawangan", id: "pkg-3-gili-utara" },
    { key: "gili air", id: "pkg-3-gili-utara" },
    { key: "segara anak", id: "pkg-explore-rinjani" },
    { key: "aik kalak", id: "pkg-explore-rinjani" },
    { key: "torean", id: "pkg-torean-gua-susu" },
    { key: "pergasingan", id: "pkg-bukit-pergasingan" },
    { key: "sempana", id: "pkg-bukit-sempana" },
    { key: "anak dara", id: "pkg-bukit-anak-dara" },
    { key: "nanggi", id: "pkg-bukit-nanggi" },
    { key: "7 summit", id: "pkg-7-summits" },
    { key: "only summit", id: "pkg-only-summit" },
    { key: "puncak rinjani", id: "pkg-only-summit" },
    { key: "tanjung aan", id: "pkg-tanjung-aan-merese" },
    { key: "merese", id: "pkg-tanjung-aan-merese" },
    { key: "mawun", id: "pkg-mawun-selong-belanak" },
    { key: "selong belanak", id: "pkg-mawun-selong-belanak" },
    { key: "pink", id: "pkg-pink-beach-tangsi" },
    { key: "tangsi", id: "pkg-pink-beach-tangsi" },
    { key: "ringgit", id: "pkg-pink-beach-tangsi" },
    { key: "petagan", id: "pkg-gili-kondo-petagan" },
    { key: "kondo", id: "pkg-gili-kondo-petagan" },
    { key: "sire", id: "pkg-pantai-sire" },
    { key: "nanggu", id: "pkg-secret-gili-sekotong" },
    { key: "sudak", id: "pkg-secret-gili-sekotong" },
    { key: "kedis", id: "pkg-secret-gili-sekotong" },
    { key: "sekotong", id: "pkg-secret-gili-sekotong" },
    { key: "mekaki", id: "pkg-teluk-mekaki" },
    { key: "sade", id: "pkg-desa-sade-ende" },
    { key: "ende", id: "pkg-desa-sade-ende" },
    { key: "sukarara", id: "pkg-tenun-sukarara-mandalika" },
    { key: "mandalika", id: "pkg-tenun-sukarara-mandalika" },
    { key: "bayan", id: "pkg-masjid-kuno-bayan" },
    { key: "senaru", id: "pkg-desa-adat-senaru" },
    { key: "bumbung", id: "pkg-sembalun-bumbung" },
    { key: "masbagik", id: "pkg-gerabah-masbagik" },
    { key: "lingsar", id: "pkg-pura-lingsar" },
    { key: "narmada", id: "pkg-taman-air-narmada" },
  ];

  for (const item of keywords) {
    if (q.includes(item.key)) {
      const match = PACKAGES.find((p) => p.id === item.id);
      if (match) return match;
    }
  }

  return PACKAGES[0];
}
