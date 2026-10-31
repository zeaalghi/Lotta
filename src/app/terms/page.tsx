"use client";

import React from "react";
import Link from "next/link";
import { useLotta } from "@/components/LottaShell";

interface TermsSection {
  title: { id: string; en: string; it: string };
  content: {
    id: React.ReactNode;
    en: React.ReactNode;
    it: React.ReactNode;
  };
}

const TERMS_SECTIONS: TermsSection[] = [
  {
    title: {
      id: "1. Definisi Layanan & Peran LOTTA",
      en: "1. Service Definition & LOTTA's Role",
      it: "1. Definizione del Servizio e Ruolo di LOTTA",
    },
    content: {
      id: (
        <p>
          LOTTA (Lombok Tourism Authority &amp; Guide Network) adalah platform resmi kurasi perjalanan dan pemandu lokal berlisensi Himpunan Pramuwisata Indonesia (HPI) DPD NTB. Layanan LOTTA mempertemukan wisatawan secara langsung dengan pemandu terverifikasi secara transparan tanpa mark-up perantara tersembunyi.
        </p>
      ),
      en: (
        <p>
          LOTTA (Lombok Tourism Authority &amp; Guide Network) is an official curated travel and tour guide platform partnering directly with licensed members of the Indonesian Tour Guide Association (HPI) DPD NTB. Our service connects travelers directly with verified local guides transparently with zero hidden middleman markups.
        </p>
      ),
      it: (
        <p>
          LOTTA (Lombok Tourism Authority &amp; Guide Network) è una piattaforma ufficiale di viaggi che collabora direttamente con guide locali in possesso di licenza HPI DPD NTB. Il nostro servizio mette in contatto diretto i viaggiatori con guide verificate, in totale trasparenza e senza commissioni di intermediari nascoste.
        </p>
      ),
    },
  },
  {
    title: {
      id: "2. Pemesanan & Ketentuan Deposit (DP)",
      en: "2. Booking & Deposit Terms",
      it: "2. Prenotazioni e Termini di Acconto",
    },
    content: {
      id: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Untuk mengunci tanggal trip dan ketersediaan pemandu resmi, tamu membayarkan Deposit (DP) sebesar 30% dari total nilai paket.
          </li>
          <li>
            Invoice dan rincian itinerary resmi akan dikirimkan kepada tamu segera setelah deposit terkonfirmasi.
          </li>
          <li>
            Sisa pembayaran (70%) dilunasi pada hari pelaksanaan trip langsung kepada pemandu atau via transfer resmi yang disepakati.
          </li>
        </ul>
      ),
      en: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            To secure your tour dates and guarantee official guide availability, a 30% deposit of the total package price is required.
          </li>
          <li>
            An official invoice and trip itinerary summary will be issued as soon as the deposit is received and confirmed.
          </li>
          <li>
            The remaining balance (70%) is settled on the day of the trip directly with your assigned guide or via official bank transfer.
          </li>
        </ul>
      ),
      it: (
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Per confermare le date del tour e garantire la disponibilità della guida ufficiale, è richiesto un acconto del 30% sul totale del pacchetto.
          </li>
          <li>
            Una fattura ufficiale e il riepilogo dell&apos;itinerario verranno inviati immediatamente dopo la conferma dell&apos;acconto.
          </li>
          <li>
            Il saldo rimanente (70%) sarà corrisposto il giorno del tour direttamente alla guida o tramite bonifico concordato.
          </li>
        </ul>
      ),
    },
  },
  {
    title: {
      id: "3. Kebijakan Cuaca Ekstrem & Force Majeure",
      en: "3. Extreme Weather & Force Majeure Policy",
      it: "3. Condizioni Meteo Estreme e Forza Maggiore",
    },
    content: {
      id: (
        <>
          <p>
            Keselamatan tamu dan pemandu merupakan prioritas mutlak. Apabila otoritas resmi (BMKG, KSOP Pelabuhan, atau Balai Taman Nasional Gunung Rinjani) mengeluarkan peringatan bahaya cuaca ekstrem, gelombang tinggi, atau penutupan jalur pendakian:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Tamu berhak melakukan <strong>reschedule jadwal tanpa biaya penalti</strong> sesuai kesepakatan tanggal baru.
            </li>
            <li>
              Atau memilih pengalihan destinasi alternatif di Lombok yang aman berdasarkan rekomendasi resmi pemandu HPI.
            </li>
          </ul>
        </>
      ),
      en: (
        <>
          <p>
            The safety of our guests and guides is paramount. If official authorities (BMKG meteorological agency, Port Harbor Masters, or Mount Rinjani National Park Authority) issue severe weather warnings, high marine wave alerts, or mountain trail closures:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Guests are entitled to <strong>reschedule their tour dates free of penalty</strong> based on mutual calendar availability.
            </li>
            <li>
              Alternatively, choose an alternative safe destination in Lombok recommended by your licensed HPI guide.
            </li>
          </ul>
        </>
      ),
      it: (
        <>
          <p>
            La sicurezza dei clienti e delle guide è la nostra massima priorità. Qualora le autorità ufficiali (servizio meteorologico BMKG, Capitaneria di porto o Parco Nazionale del Rinjani) emettano allarmi meteo o chiusura dei sentieri:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              I clienti hanno diritto a <strong>riprogrammare il tour senza alcuna penale</strong> in base alla nuova disponibilità concordata.
            </li>
            <li>
              Oppure scegliere una destinazione alternativa sicura a Lombok consigliata dalla guida certificata HPI.
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    title: {
      id: "4. Fasilitas & Standar Keselamatan",
      en: "4. Safety Standards & Equipment",
      it: "4. Standard di Sicurezza ed Equipaggiamento",
    },
    content: {
      id: (
        <p>
          Setiap paket wisata yang dipesan melalui LOTTA mencakup perlengkapan keselamatan standar (life jacket untuk snorkeling/boat, tenda waterproof berstandar pendakian untuk camping, dan kotak P3K). Pemandu resmi LOTTA telah tersertifikasi dalam penanganan pertolongan pertama (First Aid).
        </p>
      ),
      en: (
        <p>
          All tour packages booked through LOTTA include standard certified safety gear (fitted life jackets for snorkeling/boat excursions, mountain-grade waterproof tents for camping, and first-aid kits). All official LOTTA guides are trained and certified in First Aid and outdoor safety standards.
        </p>
      ),
      it: (
        <p>
          Tutti i pacchetti prenotati tramite LOTTA includono equipaggiamento di sicurezza omologato (giubbotti di salvataggio per barca e snorkeling, tende impermeabili da montagna per il campeggio e kit di pronto soccorso). Tutte le guide LOTTA sono certificate per il primo soccorso e la sicurezza all&apos;aperto.
        </p>
      ),
    },
  },
  {
    title: {
      id: "5. Tanggung Jawab & Pelestarian Budaya Lokal",
      en: "5. Cultural Heritage Respect & Environmental Responsibility",
      it: "5. Rispetto Culturale e Tutela Ambientale",
    },
    content: {
      id: (
        <p>
          Tamu diwajibkan untuk menghormati adat istiadat setempat (terutama saat memasuki Desa Adat Sasak dan situs suci), mematuhi arahan pemandu, serta menerapkan prinsip Leave No Trace (tidak membuang sampah sembarangan dan menjaga kelestarian alam Lombok).
        </p>
      ),
      en: (
        <p>
          Guests are expected to respect local customs and sacred sites (particularly when visiting traditional Sasak villages and temples), follow guide instructions, and uphold &quot;Leave No Trace&quot; environmental principles to preserve Lombok&apos;s pristine natural heritage.
        </p>
      ),
      it: (
        <p>
          I clienti sono tenuti a rispettare le tradizioni locali e i luoghi sacri (in particolare durante le visite ai villaggi tradizionali Sasak e ai templi), seguire le indicazioni della guida e rispettare l&apos;ambiente secondo il principio &quot;Leave No Trace&quot;.
        </p>
      ),
    },
  },
  {
    title: {
      id: "6. Hubungi Kami",
      en: "6. Contact & Inquiries",
      it: "6. Contatti e Chiarimenti",
    },
    content: {
      id: (
        <p>
          Untuk pertanyaan atau klarifikasi lebih lanjut mengenai Syarat &amp; Ketentuan ini, silakan hubungi kami melalui telepon/WhatsApp resmi di <strong>+62 877-2877-0032</strong> atau datang langsung ke hub kami di Sintung, Pringgarata, Lombok Tengah, NTB 83562.
        </p>
      ),
      en: (
        <p>
          For questions or further clarification regarding these Terms &amp; Conditions, please contact us via official phone/WhatsApp at <strong>+62 877-2877-0032</strong> or visit our office hub at Sintung, Pringgarata, Lombok Tengah, NTB 83562.
        </p>
      ),
      it: (
        <p>
          Per domande o chiarimenti su questi Termini e Condizioni, non esitare a contattarci telefonicamente o via WhatsApp al numero <strong>+62 877-2877-0032</strong> o presso la nostra sede a Sintung, Pringgarata, Lombok Centrale, NTB 83562.
        </p>
      ),
    },
  },
];

export default function TermsPage() {
  const { lang, localizeHref } = useLotta();

  return (
    <div className="py-12 sm:py-16 bg-forest-alt min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-forest-border shadow-sm">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
            {lang === "id"
              ? "LEGAL & KETENTUAN OPERASIONAL"
              : lang === "en"
              ? "LEGAL & OPERATIONAL TERMS"
              : "NOTE LEGALI E TERMINI OPERATIVI"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-header tracking-tight mb-2">
            {lang === "id"
              ? "Terms & Conditions (Syarat & Ketentuan)"
              : lang === "en"
              ? "Terms & Conditions"
              : "Termini e Condizioni"}
          </h1>
          <p className="text-xs text-forest-body mb-8 pb-4 border-b border-forest-border">
            {lang === "id"
              ? "Terakhir diperbarui: 31 Oktober 2026 • Berlaku untuk seluruh pemesanan trip dan pemandu resmi di LOTTA."
              : lang === "en"
              ? "Last updated: October 31, 2026 • Applicable to all tour bookings and licensed guides via LOTTA."
              : "Ultimo aggiornamento: 31 ottobre 2026 • Valido per tutte le prenotazioni di tour e guide su LOTTA."}
          </p>

          <div className="space-y-6 text-sm text-forest-body leading-relaxed">
            {TERMS_SECTIONS.map((sec, idx) => (
              <section key={idx} className={idx === TERMS_SECTIONS.length - 1 ? "pt-4 border-t border-forest-border" : ""}>
                <h2 className="text-base font-extrabold text-forest-header mb-2">
                  {sec.title[lang]}
                </h2>
                {sec.content[lang]}
              </section>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-forest-border flex justify-between items-center">
            <Link
              href={localizeHref("/")}
              className="text-xs font-bold text-forest-primary hover:text-forest-hover transition"
            >
              {lang === "id"
                ? "← Kembali ke Beranda"
                : lang === "en"
                ? "← Back to Home"
                : "← Torna alla Home"}
            </Link>
            <Link
              href={localizeHref("/privacy")}
              className="text-xs font-bold text-forest-header hover:text-forest-primary transition"
            >
              {lang === "id"
                ? "Kebijakan Privasi (Privacy Policy) →"
                : lang === "en"
                ? "Privacy Policy →"
                : "Informativa sulla Privacy →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
