"use client";

import React from "react";
import Link from "next/link";
import { useLotta } from "@/components/LottaShell";

interface PrivacySection {
  title: { id: string; en: string; it: string };
  content: {
    id: React.ReactNode;
    en: React.ReactNode;
    it: React.ReactNode;
  };
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: {
      id: "1. Komitmen Privasi Kami",
      en: "1. Our Privacy Commitment",
      it: "1. Il Nostro Impegno per la Privacy",
    },
    content: {
      id: (
        <p>
          LOTTA menghargai dan melindungi privasi setiap pengguna, tamu, dan pemandu lokal kami. Kebijakan Privasi ini menjelaskan bagaimana data Anda dikumpulkan, digunakan, dan dijaga keamanannya saat mengakses situs web kami.
        </p>
      ),
      en: (
        <p>
          LOTTA deeply respects and protects the privacy of every traveler, visitor, and local guide. This Privacy Policy outlines how your personal data is collected, handled, and securely maintained when interacting with our platform.
        </p>
      ),
      it: (
        <p>
          LOTTA rispetta e tutela la privacy di ogni viaggiatore, visitatore e guida locale. La presente Informativa descrive come i tuoi dati personali vengono raccolti, utilizzati e protetti durante l&apos;utilizzo della nostra piattaforma.
        </p>
      ),
    },
  },
  {
    title: {
      id: "2. Data yang Kami Kumpulkan",
      en: "2. Information We Collect",
      it: "2. Dati che Raccogliamo",
    },
    content: {
      id: (
        <>
          <p>
            Kami hanya mengumpulkan data yang relevan dan dibutuhkan untuk kelancaran konsultasi dan pelaksanaan perjalanan Anda:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Informasi kontak (nama, nomor telepon / WhatsApp) saat Anda menghubungi kami untuk pemesanan trip.
            </li>
            <li>
              Rincian rencana perjalanan (destinasi yang dipilih, tanggal trip, jumlah peserta, dan preferensi bahasa pemandu).
            </li>
            <li>
              Data preferensi teknis anonim (seperti preferensi bahasa situs) yang disimpan secara lokal di browser Anda untuk kenyamanan navigasi tanpa pelacak pihak ketiga (third-party trackers).
            </li>
          </ul>
        </>
      ),
      en: (
        <>
          <p>
            We only collect information directly relevant and necessary for coordinating your tour consultation and seamless journey execution:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Contact details (name, phone / WhatsApp number) provided when you initiate inquiries or bookings.
            </li>
            <li>
              Trip parameters (selected destinations, travel dates, party size, and guide language preferences).
            </li>
            <li>
              Anonymous browser preference settings (such as chosen website language) stored locally in your browser for navigational convenience without invasive third-party ad trackers.
            </li>
          </ul>
        </>
      ),
      it: (
        <>
          <p>
            Raccogliamo esclusivamente le informazioni necessarie per la consulenza e la corretta organizzazione della tua escursione:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              Dati di contatto (nome, numero di telefono / WhatsApp) forniti al momento della richiesta o prenotazione.
            </li>
            <li>
              Dettagli del viaggio (destinazioni scelte, date del tour, numero di partecipanti e preferenze linguistiche per la guida).
            </li>
            <li>
              Preferenze anonime del browser (come la lingua dell&apos;interfaccia) memorizzate localmente senza l&apos;uso di tracker pubblicitari di terze parti.
            </li>
          </ul>
        </>
      ),
    },
  },
  {
    title: {
      id: "3. Perlindungan Privasi Pemandu Lokal",
      en: "3. Local Guide Privacy Protection",
      it: "3. Tutela della Privacy delle Guide Locali",
    },
    content: {
      id: (
        <p>
          Sesuai dengan komitmen etika LOTTA, data pribadi sensitif para pemandu resmi (seperti nomor KTP, alamat rumah pribadi, dan nomor kontak pribadi pemandu) tidak dipublikasikan secara terbuka di situs untuk mencegah penyalahgunaan spam atau doxxing. Komunikasi awal dikoordinasikan secara aman dan tertutup melalui saluran resmi LOTTA.
        </p>
      ),
      en: (
        <p>
          In accordance with LOTTA&apos;s ethical standards, sensitive personal records of our certified guides (such as national ID numbers, private residential addresses, and personal contact numbers) are never publicly exposed on the website to prevent harassment and spam. Initial inquiries are safely coordinated through official LOTTA channels.
        </p>
      ),
      it: (
        <p>
          In linea con i nostri principi etici, i dati personali sensibili delle guide certificate (come documenti d&apos;identità, indirizzi privati e recapiti personali) non vengono mai pubblicati sul sito per proteggere la loro privacy. I contatti iniziali sono gestiti in modo protetto tramite i canali ufficiali LOTTA.
        </p>
      ),
    },
  },
  {
    title: {
      id: "4. Tidak Ada Penjualan Data (Zero Data Selling)",
      en: "4. Zero Data Selling Commitment",
      it: "4. Nessuna Cessione dei Dati a Terzi",
    },
    content: {
      id: (
        <p>
          LOTTA <strong>tidak pernah dan tidak akan pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda</strong> kepada pihak ketiga mana pun untuk tujuan iklan berbayar atau promosi spam.
        </p>
      ),
      en: (
        <p>
          LOTTA <strong>has never and will never sell, rent, or trade your personal information</strong> to third-party data brokers or marketing agencies for advertising campaigns.
        </p>
      ),
      it: (
        <p>
          LOTTA <strong>non vende, non affitta e non cede in alcun caso i tuoi dati personali</strong> a terze parti per finalità pubblicitarie o commerciali.
        </p>
      ),
    },
  },
  {
    title: {
      id: "5. Keamanan & Penyimpanan",
      en: "5. Security & Data Protection Standards",
      it: "5. Standard di Sicurezza e Protezione",
    },
    content: {
      id: (
        <p>
          Seluruh pertukaran data dilindungi dengan enkripsi standar HTTPS/TLS. Akses terhadap informasi pemesanan hanya diberikan kepada staf operasional dan pemandu yang ditugaskan untuk melayani trip Anda.
        </p>
      ),
      en: (
        <p>
          All web data transit is safeguarded by strict HTTPS/TLS encryption protocols. Access to booking details is strictly limited to operations staff and the designated licensed guide assigned to conduct your excursion.
        </p>
      ),
      it: (
        <p>
          Tutti i dati in transito sono protetti da crittografia standard HTTPS/TLS. L&apos;accesso ai dettagli della prenotazione è riservato esclusivamente allo staff operativo e alla guida incaricata del tuo tour.
        </p>
      ),
    },
  },
  {
    title: {
      id: "6. Pertanyaan Mengenai Privasi",
      en: "6. Privacy Inquiries",
      it: "6. Domande sulla Privacy",
    },
    content: {
      id: (
        <p>
          Jika Anda memiliki pertanyaan mengenai perlindungan data pribadi Anda di platform LOTTA, silakan hubungi kontak resmi kami di <strong>+62 877-2877-0032</strong> atau melalui kantor kami di Sintung, Pringgarata, Lombok Tengah, NTB 83562.
        </p>
      ),
      en: (
        <p>
          If you have any questions regarding your personal data protection on the LOTTA platform, please reach out via our official contact at <strong>+62 877-2877-0032</strong> or visit our office at Sintung, Pringgarata, Lombok Tengah, NTB 83562.
        </p>
      ),
      it: (
        <p>
          Per qualunque domanda sul trattamento dei tuoi dati personali sulla piattaforma LOTTA, puoi contattarci al numero <strong>+62 877-2877-0032</strong> o presso i nostri uffici a Sintung, Pringgarata, Lombok Centrale, NTB 83562.
        </p>
      ),
    },
  },
];

export default function PrivacyPage() {
  const { lang, localizeHref } = useLotta();

  return (
    <div className="py-12 sm:py-16 bg-forest-alt min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-forest-border shadow-sm">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
            {lang === "id"
              ? "KEBIJAKAN PRIVASI & PERLINDUNGAN DATA"
              : lang === "en"
              ? "PRIVACY POLICY & DATA PROTECTION"
              : "INFORMATIVA SULLA PRIVACY E PROTEZIONE DATI"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-header tracking-tight mb-2">
            {lang === "id"
              ? "Privacy Policy (Kebijakan Privasi)"
              : lang === "en"
              ? "Privacy Policy"
              : "Informativa sulla Privacy"}
          </h1>
          <p className="text-xs text-forest-body mb-8 pb-4 border-b border-forest-border">
            {lang === "id"
              ? "Terakhir diperbarui: 31 Oktober 2026 • Komitmen perlindungan data pribadi pengunjung dan tamu LOTTA sesuai UU No. 27 Tahun 2022 (UU PDP)."
              : lang === "en"
              ? "Last updated: October 31, 2026 • Committed to personal data protection in compliance with applicable data privacy laws."
              : "Ultimo aggiornamento: 31 ottobre 2026 • Impegno per la protezione dei dati personali dei nostri visitatori e clienti."}
          </p>

          <div className="space-y-6 text-sm text-forest-body leading-relaxed">
            {PRIVACY_SECTIONS.map((sec, idx) => (
              <section key={idx} className={idx === PRIVACY_SECTIONS.length - 1 ? "pt-4 border-t border-forest-border" : ""}>
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
              href={localizeHref("/terms")}
              className="text-xs font-bold text-forest-header hover:text-forest-primary transition"
            >
              {lang === "id"
                ? "Syarat & Ketentuan (Terms & Conditions) →"
                : lang === "en"
                ? "Terms & Conditions →"
                : "Termini e Condizioni →"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
