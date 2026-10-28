import type { DestinationPackage, Lang } from "@/data/lotta-content";

export interface ItineraryItem {
  timeOrDay: string;
  activity: string;
}

export interface TripDetailContent {
  overviewText: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  whatToBring: string[];
  itinerary: ItineraryItem[];
}

export function getTripDetails(
  pkg: DestinationPackage,
  lang: Lang
): TripDetailContent {
  const isMountain = pkg.pillar === "mountain";
  const isBeach = pkg.pillar === "beach";

  if (isMountain) {
    const inclusions =
      lang === "en"
        ? [
            "Official Licensed HPI NTB Mountain Guide",
            "Complete Camping Kit: Dome Tent, Foam Mattress & Sleeping Bag",
            "Warm Camp Meals (Fresh Dinner & Morning Breakfast)",
            "Mineral Water & Hot Coffee/Tea at Campsite",
            "National Park / Conservation Entry Tickets & Trekker Insurance",
            "Logistics Porter Support for Tents & Cooking Equipment",
          ]
        : lang === "it"
        ? [
            "Guida di Montagna Certificata HPI NTB",
            "Attrezzatura da Campeggio: Tenda, Materassino e Sacco a Pelo",
            "Pasti Caldi al Campo (Cena e Colazione)",
            "Acqua Minerale e Tè/Caffè Caldo al Tramonto",
            "Biglietti d'Ingresso al Parco Nazionale e Assicurazione",
            "Assistenza Porter per il Trasporto delle Tende",
          ]
        : [
            "Pemandu Gunung Resmi Berlisensi HPI NTB",
            "Peralatan Kemah Lengkap: Tenda Dome, Matras Busa & Sleeping Bag",
            "Makan Hangat Selama Kemah (Makan Malam & Sarapan Pagi)",
            "Air Mineral & Kopi/Teh Hangat di Area Perkemahan",
            "Tiket Masuk Kawasan Konservasi & Asuransi Resmi Pendaki",
            "Porter Logistik Pembawa Tenda & Perlengkapan Masak",
          ];

    const exclusions =
      lang === "en"
        ? [
            "Flight or ferry tickets to Lombok Island",
            "Personal warm clothing (windbreaker, thermal layers, gloves)",
            "Personal travel expenses & discretionary gratuities for guide/porter",
          ]
        : lang === "it"
        ? [
            "Biglietti aerei o marittimi per l'isola di Lombok",
            "Abbigliamento termico personale (giacca antivento, guanti)",
            "Spese personali e mance facoltative per guida e porter",
          ]
        : [
            "Transport antar-pulau / tiket penerbangan menuju Lombok",
            "Perlengkapan pakaian hangat pribadi (jaket windbreaker, kupluk, sarung tangan)",
            "Pengeluaran belanja pribadi & tips sukarela untuk guide/porter",
          ];

    const whatToBring =
      lang === "en"
        ? [
            "Windproof mountain jacket / warm fleece layer",
            "Sturdy hiking boots or trail running shoes with good grip",
            "Flexible trekking pants & 2 pairs of warm socks",
            "Headlamp with spare batteries",
            "Personal first-aid medication & reusable water tumbler",
            "Rain poncho & waterproof dry bag for electronics",
            "Cash in IDR for personal needs along the trail",
          ]
        : lang === "it"
        ? [
            "Giacca a vento da montagna o pile pesante",
            "Scarpe da trekking con suola scolpita antiscivolo",
            "Pantaloni lunghi comodi e calze termiche",
            "Torcia frontale con batterie di ricambio",
            "Farmaci personali e borraccia per l'acqua",
            "Mantella antipioggia e sacca impermeabile per smartphone",
            "Denaro contante per esigenze personali lungo il percorso",
          ]
        : [
            "Jaket gunung penahan angin (windbreaker/fleece tebal)",
            "Sepatu trekking dengan sol bergerigi kokoh",
            "Celana panjang elastis & 2 pasang kaus kaki hangat",
            "Senter kepala (headlamp) dengan baterai cadangan",
            "Obat-obatan pribadi & botol minum isi ulang (tumbler)",
            "Jas hujan poncho & kantung tahan air untuk gadget",
            "Uang tunai secukupnya untuk keperluan di pos peristirahatan",
          ];

    const itinerary: ItineraryItem[] =
      lang === "en"
        ? [
            {
              timeOrDay: "Day 1 • 07:30",
              activity:
                "Hotel pickup or basecamp meeting, health registration & briefing with LOTTA guide.",
            },
            {
              timeOrDay: "Day 1 • 08:30",
              activity:
                "Begin ascent through savanna foothills and lush mountain forest slopes.",
            },
            {
              timeOrDay: "Day 1 • 12:30",
              activity:
                "Warm lunch break prepared along the trail by our camp crew.",
            },
            {
              timeOrDay: "Day 1 • 16:30",
              activity:
                "Reach the summit ridge / crater rim campsite; tents prepared by porters.",
            },
            {
              timeOrDay: "Day 1 • 18:00",
              activity:
                "Golden sunset viewing over Lombok panorama, followed by hot dinner under the stars.",
            },
            {
              timeOrDay: "Day 2 • 05:30",
              activity:
                "Early wake-up for panoramic sunrise over mountain peaks, hot tea & breakfast.",
            },
            {
              timeOrDay: "Day 2 • 08:00",
              activity:
                "Morning photography, pack personal belongings, and begin the guided descent.",
            },
            {
              timeOrDay: "Day 2 • 13:30",
              activity:
                "Arrive at finish basecamp, debriefing, and transfer back to hotel.",
            },
          ]
        : lang === "it"
        ? [
            {
              timeOrDay: "Giorno 1 • 07:30",
              activity:
                "Prelievo in hotel o incontro al campo base, registrazione e briefing.",
            },
            {
              timeOrDay: "Giorno 1 • 08:30",
              activity:
                "Inizio del trekking attraverso la savana e i pendii boscosi.",
            },
            {
              timeOrDay: "Giorno 1 • 12:30",
              activity: "Sosta pranzo caldo preparato dallo staff lungo il sentiero.",
            },
            {
              timeOrDay: "Giorno 1 • 16:30",
              activity:
                "Arrivo al campo tendato panoramico sulla cresta montuosa.",
            },
            {
              timeOrDay: "Giorno 1 • 18:00",
              activity:
                "Tramonto dorato sulla vallata e cena calda sotto le stelle.",
            },
            {
              timeOrDay: "Giorno 2 • 05:30",
              activity:
                "Alba spettacolare tra le nuvole, tè caldo e prima colazione.",
            },
            {
              timeOrDay: "Giorno 2 • 08:00",
              activity:
                "Foto ricordo, riordino del campo e inizio della discesa guidata.",
            },
            {
              timeOrDay: "Giorno 2 • 13:30",
              activity:
                "Ritorno al punto di partenza e trasferimento in hotel.",
            },
          ]
        : [
            {
              timeOrDay: "Hari 1 • 07:30",
              activity:
                "Penjemputan dari hotel / pos basecamp, pemeriksaan tiket, dan briefing keselamatan bersama Guide LOTTA.",
            },
            {
              timeOrDay: "Hari 1 • 08:30",
              activity:
                "Memulai pendakian melintasi sabana terbuka dan jalur hutan lereng yang sejuk.",
            },
            {
              timeOrDay: "Hari 1 • 12:30",
              activity:
                "Istirahat makan siang hangat di pos peristirahatan resmi bersama porter.",
            },
            {
              timeOrDay: "Hari 1 • 16:30",
              activity:
                "Tiba di area perkemahan punggungan puncak / bibir kaldera, porter menyiapkan tenda.",
            },
            {
              timeOrDay: "Hari 1 • 18:00",
              activity:
                "Menyaksikan pemandangan sunset keemasan di atas awan, dilanjutkan makan malam di bawah langit malam.",
            },
            {
              timeOrDay: "Hari 2 • 05:30",
              activity:
                "Menikmati matahari terbit (sunrise) spektakuler di hadapan siluet gunung, kopi/teh hangat & sarapan.",
            },
            {
              timeOrDay: "Hari 2 • 08:00",
              activity:
                "Sesi dokumentasi panorama, merapikan perlengkapan, dan memulai perjalanan turun.",
            },
            {
              timeOrDay: "Hari 2 • 13:30",
              activity:
                "Tiba kembali di pos awal dan diantar kembali ke hotel atau destinasi selanjutnya.",
            },
          ];

    return {
      overviewText: pkg.desc[lang],
      highlights: pkg.highlights[lang],
      inclusions,
      exclusions,
      whatToBring,
      itinerary,
    };
  }

  if (isBeach) {
    const inclusions =
      lang === "en"
        ? [
            "Official Licensed HPI Marine & Coastal Tour Guide",
            "Traditional Outrigger Boat / Private Boat Charter",
            "Complete Snorkeling Gear (Mask, Snorkel, Fins & Life Jacket)",
            "All Coastal Entry Fees & Gili Conservation Tickets",
            "Chilled Bottled Mineral Water Throughout Tour",
            "Underwater Photo & Video Assistance",
          ]
        : lang === "it"
        ? [
            "Guida Turistica Costiera e Marina Certificata HPI",
            "Barca Tradizionale Privata per Giro Isole",
            "Attrezzatura Snorkeling Completa (Maschera, Pinne e Giubbotto)",
            "Tutti i Biglietti d'Ingresso alle Spiagge e Aree Protette",
            "Acqua Minerale Fresca a Bordo Durante la Giornata",
            "Assistenza per Foto Subacquee con Tartarughe e Coralli",
          ]
        : [
            "Pemandu Wisata Pesisir & Maritim Berlisensi HPI NTB",
            "Perahu Kayu Tradisional / Private Boat Carter",
            "Peralatan Snorkeling Lengkap (Masker, Snorkel, Fins & Jaket Pelampung)",
            "Seluruh Tiket Masuk Kawasan Wisata Pesisir & Retribusi Konservasi Gili",
            "Air Mineral Dingin Sepanjang Perjalanan",
            "Bantuan Pengambilan Foto & Video Underwater",
          ];

    const exclusions =
      lang === "en"
        ? [
            "Lunch at beachfront restaurant (flexible local recommendations)",
            "Personal souvenir shopping & bicycle rentals on the island",
            "Discretionary gratuities for boat captain and guide",
          ]
        : lang === "it"
        ? [
            "Pranzo nei ristoranti sulla spiaggia (scelta libera)",
            "Noleggio biciclette sull'isola e acquisti personali",
            "Mance facoltative per il capitano della barca e la guida",
          ]
        : [
            "Santap siang di restoran pantai / pulau (tersedia banyak pilihan kuliner lokal)",
            "Pengeluaran pribadi, sewa sepeda di gili & belanja oleh-oleh",
            "Tips sukarela untuk kapten perahu dan pemandu",
          ];

    const whatToBring =
      lang === "en"
        ? [
            "Swimwear & comfortable spare dry clothing",
            "Bath towel & UV sunglasses",
            "Reef-safe sunscreen lotion",
            "Dry bag / waterproof pouch for smartphone & camera",
            "Water shoes or comfortable beach sandals",
            "Cash in IDR for seaside lunch & island activities",
          ]
        : lang === "it"
        ? [
            "Costume da bagno e cambio di vestiti asciutti",
            "Telo mare e occhiali da sole protettivi",
            "Crema solare reef-safe ecologica per i coralli",
            "Borsetta impermeabile (dry bag) per cellulare e portafoglio",
            "Scarpette da scoglio o ciabatte da spiaggia",
            "Denaro contante per il pranzo sulla spiaggia",
          ]
        : [
            "Pakaian renang & baju ganti kering yang nyaman",
            "Handuk mandi & kacamata hitam pelindung UV",
            "Krim tabir surya ramah koral (reef-safe sunscreen)",
            "Kantung tahan air (dry bag) untuk ponsel dan barang berharga",
            "Sandal pantai atau sepatu air (water shoes)",
            "Uang tunai secukupnya untuk santap siang & aktivitas di pulau",
          ];

    const itinerary: ItineraryItem[] =
      lang === "en"
        ? [
            {
              timeOrDay: "08:00",
              activity:
                "Hotel pickup and scenic panoramic drive toward departure harbor.",
            },
            {
              timeOrDay: "09:30",
              activity:
                "Board private charter boat and set sail across crystal-clear turquoise waters.",
            },
            {
              timeOrDay: "10:30",
              activity:
                "First snorkeling stop: marine turtle sanctuary & underwater statues.",
            },
            {
              timeOrDay: "12:30",
              activity:
                "Island beach landing for fresh grilled seafood lunch and coastal relaxation.",
            },
            {
              timeOrDay: "14:00",
              activity:
                "Leisure stroll, swimming in calm lagoons, or island bicycle ride.",
            },
            {
              timeOrDay: "16:00",
              activity:
                "Second snorkeling session admiring vibrant blue corals and tropical clownfish.",
            },
            {
              timeOrDay: "17:30",
              activity:
                "Late afternoon scenic coastal cruise back to the mainland harbor.",
            },
            {
              timeOrDay: "18:30",
              activity:
                "Arrive back at harbor dock and comfortable transfer back to your hotel.",
            },
          ]
        : lang === "it"
        ? [
            {
              timeOrDay: "08:00",
              activity:
                "Prelievo in hotel e viaggio panoramico lungo la costa fino al molo.",
            },
            {
              timeOrDay: "09:30",
              activity:
                "Imbarco su barca privata verso le acque turchesi delle isole.",
            },
            {
              timeOrDay: "10:30",
              activity:
                "Prima sessione di snorkeling con tartarughe marine e sculture sommerse.",
            },
            {
              timeOrDay: "12:30",
              activity:
                "Sbarco sull'isola per pranzo a base di pesce fresco e relax sulla sabbia bianca.",
            },
            {
              timeOrDay: "14:00",
              activity:
                "Tempo libero per passeggiare, nuotare o fare un giro in bicicletta.",
            },
            {
              timeOrDay: "16:00",
              activity:
                "Seconda tappa di snorkeling tra formazioni di coralli azzurri.",
            },
            {
              timeOrDay: "17:30",
              activity:
                "Rientro in barca con i colori caldi del tramonto sulla costa.",
            },
            {
              timeOrDay: "18:30",
              activity:
                "Arrivo al molo e trasferimento di ritorno al vostro hotel.",
            },
          ]
        : [
            {
              timeOrDay: "08:00",
              activity:
                "Penjemputan di hotel dan perjalanan darat berpanorama indah menuju dermaga keberangkatan.",
            },
            {
              timeOrDay: "09:30",
              activity:
                "Naik perahu private charter menuju spot terumbu karang pertama di perairan jernih.",
            },
            {
              timeOrDay: "10:30",
              activity:
                "Sesi snorkeling terpandu bersama penyu hijau dan patung bawah air yang magis.",
            },
            {
              timeOrDay: "12:30",
              activity:
                "Menepi di pulau untuk santap siang hidangan laut khas pesisir & bersantai di pantai pasir putih.",
            },
            {
              timeOrDay: "14:00",
              activity:
                "Waktu santai: berkeliling pulau, berenang di laguna tenang, atau menikmati kelapa muda.",
            },
            {
              timeOrDay: "16:00",
              activity:
                "Spot snorkeling kedua mengamati keindahan terumbu karang biru dan ribuan ikan karang.",
            },
            {
              timeOrDay: "17:30",
              activity:
                "Berlayar kembali saat senja menyapa garis pantai Lombok.",
            },
            {
              timeOrDay: "18:30",
              activity:
                "Tiba kembali di pelabuhan dan diantar nyaman kembali ke hotel Anda.",
            },
          ];

    return {
      overviewText: pkg.desc[lang],
      highlights: pkg.highlights[lang],
      inclusions,
      exclusions,
      whatToBring,
      itinerary,
    };
  }

  // Heritage / Culture Pillar
  const inclusions =
    lang === "en"
      ? [
          "Licensed HPI Heritage Guide Fluent in Sasak Oral History",
          "All Traditional Village Entrance Fees & Community Donations",
          "Official Sasak Traditional Sarong / Sash Loan for Sacred Sites",
          "Interactive Hands-on Weaving or Pottery Crafting Workshop",
          "Chilled Bottled Mineral Water Throughout Tour",
          "Comfortable Air-Conditioned Transportation",
        ]
      : lang === "it"
      ? [
          "Guida Culturale Certificata HPI Esperta in Storia Sasak",
          "Tutti i Biglietti e Donazioni ai Villaggi Tradizionali",
          "Prestito del Sarong Tradizionale per i Luoghi Sacri",
          "Laboratorio Pratico di Tessitura o Lavorazione della Ceramica",
          "Acqua Minerale Fresca Durante la Giornata",
          "Trasporto Confortevole con Aria Condizionata",
        ]
      : [
          "Pemandu Heritage Berlisensi HPI NTB Fasih Sejarah Lisan Sasak",
          "Seluruh Tiket Masuk & Donasi Cagar Budaya Desa Tradisional",
          "Peminjaman Sarung Adat / Selendang Tenun Sasak untuk Tempat Sakral",
          "Praktek Langsung Menenun Tradisional atau Kerajinan Tangan",
          "Air Mineral Dingin Sepanjang Perjalanan",
          "Transportasi Nyaman Ber-AC",
        ];

  const exclusions =
    lang === "en"
      ? [
          "Lunch (Guide will recommend authentic Sasak culinary venues)",
          "Purchases of master-grade handwoven songket textiles or ceramics",
          "Discretionary tips for village elders and guide",
        ]
      : lang === "it"
      ? [
          "Pranzo (La guida indicherà ottimi ristoranti tipici Sasak)",
          "Acquisti di tessuti pregiati songket o manufatti in ceramica",
          "Mance facoltative per gli anziani del villaggio e la guida",
        ]
      : [
          "Santap siang kuliner lokal (Guide akan merekomendasikan resto khas Sasak terbaik)",
          "Belanja kain tenun songket asli atau kerajinan langsung dari pengrajin",
          "Tips sukarela untuk tetua adat dan pemandu",
        ];

  const whatToBring =
    lang === "en"
      ? [
          "Modest clothing covering shoulders and knees out of cultural respect",
          "Comfortable walking shoes or sneakers for historical village pathways",
          "Sun hat & UV sunglasses",
          "Camera or smartphone with ample storage for architecture photography",
          "Cash in IDR for purchasing authentic artisanal crafts directly",
        ]
      : lang === "it"
      ? [
          "Abbigliamento decoroso che copra spalle e ginocchia",
          "Scarpe da camminata comode per i vicoli storici in pietra",
          "Cappello parasole e occhiali da sole",
          "Macchina fotografica o smartphone con memoria libera",
          "Denaro contante per sostenere le maestre artigiane del villaggio",
        ]
      : [
          "Pakaian sopan yang menutupi bahu dan lutut (menghormati tata krama adat)",
          "Sepatu jalan atau sneakers yang nyaman untuk lorong berbatu desa",
          "Topi pelindung terik matahari & kacamata hitam",
          "Kamera atau ponsel dengan baterai terisi penuh untuk foto budaya",
          "Uang tunai secukupnya untuk membeli kain tenun langsung dari penenun asli",
        ];

  const itinerary: ItineraryItem[] =
    lang === "en"
      ? [
          {
            timeOrDay: "09:00",
            activity:
              "Hotel pickup by your official LOTTA Heritage Guide in comfortable private transport.",
          },
          {
            timeOrDay: "09:45",
            activity:
              "Arrive at first Traditional Heritage Village; greeted by village elders with oral history context.",
          },
          {
            timeOrDay: "10:30",
            activity:
              "Walking tour among earthquake-resilient Bale Tani homes and ancient sacred rice lumbungs.",
          },
          {
            timeOrDay: "11:30",
            activity:
              "Hands-on traditional weaving or pottery demonstration alongside senior artisans.",
          },
          {
            timeOrDay: "13:00",
            activity:
              "Authentic Sasak lunch break (such as Ayam Taliwang & Plecing Kangkung).",
          },
          {
            timeOrDay: "14:30",
            activity:
              "Guided exploration of secondary historic sanctuary (Ancient Mosque or Sacred Royal Springs).",
          },
          {
            timeOrDay: "16:30",
            activity:
              "Afternoon stop at scenic rural landscapes before beginning return journey.",
          },
          {
            timeOrDay: "17:30",
            activity:
              "Drop-off back at your hotel enriched with authentic living heritage memories.",
          },
        ]
      : lang === "it"
      ? [
          {
            timeOrDay: "09:00",
            activity:
              "Prelievo in hotel con la guida culturale ufficiale LOTTA.",
          },
          {
            timeOrDay: "09:45",
            activity:
              "Arrivo al villaggio tradizionale, incontro con gli anziani e introduzione alla storia locale.",
          },
          {
            timeOrDay: "10:30",
            activity:
              "Visita guidata tra le case tradizionali Bale Tani e gli antichi granai antisismici.",
          },
          {
            timeOrDay: "11:30",
            activity:
              "Laboratorio pratico di tessitura a mano o ceramica tradizionale con le maestre locali.",
          },
          {
            timeOrDay: "13:00",
            activity:
              "Sosta pranzo tipico Sasak a base di ricette tradizionali del territorio.",
          },
          {
            timeOrDay: "14:30",
            activity:
              "Visita al secondo monumento storico (Antica Moschea in bambù o Giardino Reale).",
          },
          {
            timeOrDay: "16:30",
            activity:
              "Sosta fotografica tra le risaie e i paesaggi rurali al tramonto.",
          },
          {
            timeOrDay: "17:30",
            activity:
              "Rientro in hotel con una profonda comprensione della cultura Sasak.",
          },
        ]
      : [
          {
            timeOrDay: "09:00",
            activity:
              "Penjemputan di hotel oleh Guide Heritage Resmi LOTTA dengan kendaraan nyaman ber-AC.",
          },
          {
            timeOrDay: "09:45",
            activity:
              "Tiba di Desa Adat pertama, disambut tetua adat dan mendengarkan sejarah lisan leluhur.",
          },
          {
            timeOrDay: "10:30",
            activity:
              "Menelusuri lorong rumah adat Bale Tani tahan gempa dan lumbung padi kuno beratapkan alang-alang.",
          },
          {
            timeOrDay: "11:30",
            activity:
              "Praktek langsung menenun motif Subahnale atau membentuk gerabah bersama pengrajin senior.",
          },
          {
            timeOrDay: "13:00",
            activity:
              "Istirahat makan siang kuliner otentik Sasak (Ayam Taliwang & Plecing Kangkung khas Lombok).",
          },
          {
            timeOrDay: "14:30",
            activity:
              "Kunjungan ke cagar budaya kedua (Masjid Kuno abad ke-16 atau Taman Air Kerajaan bersejarah).",
          },
          {
            timeOrDay: "16:30",
            activity:
              "Menikmati panorama pedesaan yang tenang sebelum memulai perjalanan kembali.",
          },
          {
            timeOrDay: "17:30",
            activity:
              "Tiba kembali di hotel dengan pemahaman budaya yang mendalam dan berkesan.",
          },
        ];

  return {
    overviewText: pkg.desc[lang],
    highlights: pkg.highlights[lang],
    inclusions,
    exclusions,
    whatToBring,
    itinerary,
  };
}
