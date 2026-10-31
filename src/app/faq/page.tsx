"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLotta } from "@/components/LottaShell";

interface FaqItem {
  q: { id: string; en: string; it: string };
  a: { id: string; en: string; it: string };
  category: "booking" | "guides" | "trips" | "payment";
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: "booking",
    q: {
      id: "Bagaimana alur pemesanan trip dan pemandu di LOTTA?",
      en: "How does the booking flow work on LOTTA?",
      it: "Come funziona il flusso di prenotazione su LOTTA?",
    },
    a: {
      id: "Anda dapat memilih destinasi yang diinginkan di halaman Jelajahi, menentukan preferensi pemandu (bahasa dan gender), lalu mengonfirmasi ketersediaan tanggal langsung via WhatsApp tim resmi LOTTA (+62 877-2877-0032). Setelah itu, konfirmasi jadwal dan rincian trip akan diterbitkan.",
      en: "You can select your preferred destination on the Explore page, set your guide preferences (language and gender), and confirm date availability directly with our official WhatsApp team (+62 877-2877-0032). Schedule confirmation and trip details will be issued promptly.",
      it: "Puoi selezionare la destinazione desiderata nella pagina Esplora, impostare le preferenze per la guida (lingua e genere) e confermare la disponibilità delle date direttamente via WhatsApp (+62 877-2877-0032).",
    },
  },
  {
    category: "guides",
    q: {
      id: "Apakah semua pemandu di LOTTA memiliki lisensi resmi?",
      en: "Are all guides on LOTTA officially certified and licensed?",
      it: "Tutte le guide su LOTTA sono ufficialmente certificate?",
    },
    a: {
      id: "Ya, 100% pemandu di jaringan LOTTA merupakan anggota aktif Himpunan Pramuwisata Indonesia (HPI) DPD Nusa Tenggara Barat yang telah melalui sertifikasi BNSP, memiliki Kartu Tanda Anggota (KTA) resmi, serta terlatih dalam standar keselamatan first aid dan kode etik kepariwisataan.",
      en: "Yes, 100% of guides in the LOTTA network are verified active members of the Indonesian Tour Guide Association (HPI) West Nusa Tenggara with official certification, safety first aid training, and tourism code of ethics standards.",
      it: "Sì, il 100% delle guide della rete LOTTA sono membri attivi dell'Associazione Guide Turistiche Indonesiane (HPI) NTB con certificazione ufficiale e formazione sul primo soccorso.",
    },
  },
  {
    category: "payment",
    q: {
      id: "Bagaimana skema pembayaran dan transparansi harga?",
      en: "How does payment and pricing transparency work?",
      it: "Come funzionano i pagamenti e la trasparenza dei prezzi?",
    },
    a: {
      id: "Harga yang tertera adalah all-in transparan per pax sesuai rincian fasilitas (transport lokal, tiket masuk kawasan, perlengkapan camping/snorkeling, dan jasa pemandu berlisensi). Untuk mengunci jadwal, DP sebesar 30% dibayarkan via rekening resmi, dan pelunasan 70% dilakukan saat pelaksanaan trip.",
      en: "Prices shown are all-inclusive per pax covering local transport, entrance permits, camping/snorkeling gear, and licensed guide services. A 30% deposit secures your dates, with the remaining 70% paid on the day of the trip.",
      it: "I prezzi indicati sono all-inclusive per persona e comprendono trasporti, permessi, attrezzatura e guida con licenza. Un acconto del 30% blocca la data, e il saldo del 70% avviene il giorno del tour.",
    },
  },
  {
    category: "trips",
    q: {
      id: "Apakah trip bisa disesuaikan (custom itinerary) jika membawa keluarga atau anak?",
      en: "Can trips be customized for families or private groups?",
      it: "I tour possono essere personalizzati per famiglie o gruppi privati?",
    },
    a: {
      id: "Tentu bisa. Seluruh perjalanan LOTTA bersifat private tour (bukan open trip massal gabungan dengan orang asing). Pemandu kami siap menyesuaikan ritme perjalanan, titik istirahat, dan waktu makan sesuai kenyamanan rombongan keluarga Anda.",
      en: "Absolutely. All LOTTA tours are 100% private tours (never shared with strangers). Our guides adapt the pace, rest stops, and meal timings to your group's comfort.",
      it: "Certamente. Tutti i tour LOTTA sono escursioni private al 100%. Le nostre guide adattano il ritmo, le pause e gli orari in base alle vostre esigenze.",
    },
  },
  {
    category: "trips",
    q: {
      id: "Bagaimana jika terjadi cuaca buruk atau ombak tinggi?",
      en: "What happens in case of extreme weather or high ocean swell?",
      it: "Cosa succede in caso di maltempo o onde alte?",
    },
    a: {
      id: "Keselamatan adalah prioritas nomor satu. Melalui sistem Pantauan Cuaca & Ombak LOTTA yang terhubung dengan pos koordinat BMKG dan KSOP, jika perairan dinyatakan tidak aman untuk menyeberang atau jalur pendakian ditutup oleh Balai TNGR, jadwal dapat di-reschedule secara fleksibel tanpa hangus.",
      en: "Safety is our top priority. Powered by live telemetry and port authority notices, if crossing is unsafe or mountain trails are officially closed by national park authorities, your trip can be rescheduled flexibly at no extra penalty.",
      it: "La sicurezza viene prima di tutto. Se le autorità marittime o del parco chiudono gli accessi per maltempo, il tour può essere riprogrammato in modo flessibile.",
    },
  },
  {
    category: "guides",
    q: {
      id: "Apakah tersedia pemandu wanita (Female Guide) atau bahasa asing tertentu?",
      en: "Are female guides and foreign language specialists available?",
      it: "Sono disponibili guide donne o interpreti in lingue straniere?",
    },
    a: {
      id: "Ya, LOTTA memiliki direktori pemandu wanita berlisensi untuk kenyamanan tamu wanita atau keluarga, serta pemandu dengan keahlian khusus bahasa Inggris, Italia, Jerman, Melayu, dan bahasa lainnya.",
      en: "Yes, LOTTA provides certified female guides for solo female travelers or families, as well as language specialists in English, Italian, German, Malay, and more.",
      it: "Sì, LOTTA dispone di guide donne certificate per la massima serenità, oltre a specialisti nelle lingue italiano, inglese, tedesco e altre.",
    },
  },
];

export default function FaqPage() {
  const { lang } = useLotta();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="py-12 sm:py-16 bg-forest-alt min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
            PUSAT BANTUAN &amp; INFORMASI RESMI
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-header tracking-tight">
            {lang === "id"
              ? "Frequently Asked Questions (FAQ)"
              : lang === "en"
              ? "Frequently Asked Questions"
              : "Domande Frequenti (FAQ)"}
          </h1>
          <p className="text-sm sm:text-base text-forest-body mt-2 max-w-2xl">
            {lang === "id"
              ? "Pertanyaan yang paling sering diajukan mengenai pemesanan trip, sertifikasi pemandu HPI, transparansi biaya, dan standar keselamatan LOTTA."
              : lang === "en"
              ? "Common questions regarding trip bookings, HPI guide certification, transparent pricing, and LOTTA safety standards."
              : "Le risposte alle domande più frequenti su prenotazioni, certificazione guide HPI, prezzi trasparenti e sicurezza con LOTTA."}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-forest-border shadow-sm overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 hover:bg-forest-alt/40 transition"
                >
                  <span className="font-extrabold text-base sm:text-lg text-forest-header leading-snug">
                    {item.q[lang]}
                  </span>
                  <span className="shrink-0 text-sm font-bold text-forest-primary px-2 py-0.5 rounded-full bg-forest-canvas border border-forest-border">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-forest-body leading-relaxed border-t border-forest-border/40 bg-forest-canvas/30">
                    {item.a[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-forest-header text-white border border-forest-title shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-forest-sage mb-1">
              MASIH MEMILIKI PERTANYAAN?
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              Konsultasikan Rencana Trip Anda Langsung
            </h3>
            <p className="text-xs sm:text-sm text-forest-sage mt-1">
              Hubungi layanan resmi kami via WhatsApp: +62 877-2877-0032
            </p>
          </div>
          <a
            href="https://wa.me/6287728770032"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-forest-primary hover:bg-forest-hover text-white text-xs font-extrabold uppercase tracking-wider transition shrink-0 shadow-sm"
          >
            Chat WhatsApp Resmi →
          </a>
        </div>
      </div>
    </div>
  );
}
