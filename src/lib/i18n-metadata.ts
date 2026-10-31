import type { Lang } from "@/data/lotta-content";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";

export interface RouteMetaContent {
  title: string;
  description: string;
}

export const ROUTE_I18N_METADATA: Record<string, Record<Lang, RouteMetaContent>> = {
  home: {
    id: {
      title: DEFAULT_TITLE.id,
      description: DEFAULT_DESCRIPTION.id,
    },
    en: {
      title: DEFAULT_TITLE.en,
      description: DEFAULT_DESCRIPTION.en,
    },
    it: {
      title: DEFAULT_TITLE.it,
      description: DEFAULT_DESCRIPTION.it,
    },
  },
  explore: {
    id: {
      title: "Paket Wisata Lombok: 24 Destinasi Gunung, Pantai & Budaya Sasak",
      description:
        "Jelajahi 24 paket wisata Lombok: Rinjani & bukit Sembalun, Gili dan pantai selatan, serta desa adat Sasak. Harga all-in per pax dengan pemandu lokal berlisensi HPI.",
    },
    en: {
      title: "Lombok Tour Packages: 24 Mountain, Beach & Sasak Heritage Trips",
      description:
        "Explore 24 private Lombok tour packages: Rinjani & Sembalun hills, pristine Gili snorkeling, south beaches, and Sasak cultural villages. All-in pricing with licensed guides.",
    },
    it: {
      title: "Pacchetti Tour Lombok: 24 Escursioni Montagna, Spiagge e Cultura Sasak",
      description:
        "Scopri 24 escursioni private a Lombok: trekking sul Rinjani e colline di Sembalun, snorkeling nelle isole Gili e villaggi Sasak. Prezzi all-inclusive con guide certificate.",
    },
  },
  guides: {
    id: {
      title: "Pemandu Wisata Lombok Berlisensi HPI",
      description:
        "Pilih pemandu wisata lokal Lombok berlisensi HPI NTB berdasarkan bahasa dan gender. Private trip dengan koordinasi resmi LOTTA, tanpa biaya tersembunyi.",
    },
    en: {
      title: "Licensed Lombok Tour Guides (HPI Certified)",
      description:
        "Book official licensed local guides in Lombok by language and gender. Direct coordination via LOTTA network with transparent, zero hidden fees.",
    },
    it: {
      title: "Guide Turistiche Ufficiali Lombok con Licenza HPI",
      description:
        "Prenota guide locali ufficiali a Lombok con certificazione HPI per lingua e genere. Coordinamento diretto LOTTA con massima trasparenza.",
    },
  },
  stories: {
    id: {
      title: "Cerita & Legenda Lombok: Sasak, Rinjani & Tradisi Lokal",
      description:
        "Kumpulan kisah lisan, legenda Putri Mandalika, mitologi Dewi Anjani Rinjani, dan narasi budaya Sasak yang hidup bersama pemandu lokal kami.",
    },
    en: {
      title: "Lombok Folklore & Stories: Sasak Heritage, Rinjani Legends",
      description:
        "Discover authentic oral folklore, the legend of Princess Mandalika, Mount Rinjani myths, and cultural Sasak narratives told by native local guides.",
    },
    it: {
      title: "Storie e Leggende di Lombok: Miti del Rinjani e Cultura Sasak",
      description:
        "Scopri le storie orali, la leggenda della principessa Mandalika e le tradizioni culturali Sasak raccontate direttamente dalle nostre guide locali.",
    },
  },
  weather: {
    id: {
      title: "Pantauan Cuaca & Gelombang Laut Lombok",
      description:
        "Telemetri cuaca langsung di Puncak Rinjani, Pantai Selatan Kuta Lombok, dan Kepulauan Gili. Data suhu, kecepatan angin, dan prakiraan keselamatan trip.",
    },
    en: {
      title: "Live Lombok Weather & Ocean Wave Telemetry",
      description:
        "Real-time weather monitoring for Mount Rinjani summit, South Lombok beaches, and Gili Islands. Live temperature, wind speed, and ocean wave safety data.",
    },
    it: {
      title: "Meteo Lombok e Condizioni del Mare in Tempo Reale",
      description:
        "Monitoraggio meteo in tempo reale per la cima del Rinjani, le spiagge del sud e le isole Gili. Temperatura, vento e bollettino onde per viaggiare sicuri.",
    },
  },
  faq: {
    id: {
      title: "FAQ - Pertanyaan Umum Wisata Lombok",
      description:
        "Pertanyaan yang sering diajukan seputar pemesanan trip, pemandu resmi berlisensi HPI, skema pembayaran deposit 30%, dan penyesuaian jadwal cuaca buruk.",
    },
    en: {
      title: "Frequently Asked Questions (FAQ) | Lombok Tours",
      description:
        "Answers to common questions about Lombok tour bookings, licensed HPI guides, 30% deposit payments, and weather safety rescheduling.",
    },
    it: {
      title: "Domande Frequenti (FAQ) | Tour a Lombok",
      description:
        "Risposte alle domande frequenti sulla prenotazione di tour, guide ufficiali HPI, acconto del 30% e modifiche per maltempo.",
    },
  },
  terms: {
    id: {
      title: "Syarat & Ketentuan Layanan",
      description:
        "Ketentuan operasional pemesanan paket wisata, pembayaran deposit 30%, kebijakan pembatalan cuaca ekstrem, dan standar keselamatan trip di Lombok.",
    },
    en: {
      title: "Terms & Conditions of Service",
      description:
        "Operational terms for tour bookings, 30% deposit payments, extreme weather cancellation policies, and outdoor safety standards in Lombok.",
    },
    it: {
      title: "Termini e Condizioni di Servizio",
      description:
        "Termini per la prenotazione dei tour, pagamento dell'acconto del 30%, politiche di cancellazione per maltempo e norme di sicurezza a Lombok.",
    },
  },
  privacy: {
    id: {
      title: "Kebijakan Privasi & Perlindungan Data",
      description:
        "Informasi komitmen perlindungan data pribadi pengunjung dan tamu LOTTA sesuai UU No. 27 Tahun 2022 (UU PDP). Tanpa pelacak pihak ketiga.",
    },
    en: {
      title: "Privacy Policy & Data Protection",
      description:
        "Our commitment to guest privacy and personal data protection. Transparent contact usage and zero third-party tracking scripts.",
    },
    it: {
      title: "Informativa sulla Privacy e Protezione dei Dati",
      description:
        "Informativa sulla tutela della privacy e dei dati personali dei nostri clienti. Nessun tracciamento di terze parti.",
    },
  },
};
