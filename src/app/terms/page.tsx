"use client";

import React from "react";
import Link from "next/link";
import { useLotta } from "@/components/LottaShell";

export default function TermsPage() {
  const { lang } = useLotta();

  return (
    <div className="py-12 sm:py-16 bg-forest-alt min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-forest-border shadow-sm">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
            LEGAL &amp; KETENTUAN OPERASIONAL
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
            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                1. Definisi Layanan &amp; Peran LOTTA
              </h2>
              <p>
                LOTTA (Lombok Tourism Authority &amp; Guide Network) adalah platform resmi kurasi perjalanan dan pemandu lokal berlisensi Himpunan Pramuwisata Indonesia (HPI) DPD NTB. Layanan LOTTA mempertemukan wisatawan secara langsung dengan pemandu terverifikasi secara transparan tanpa mark-up perantara tersembunyi.
              </p>
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                2. Pemesanan &amp; Ketentuan Deposit (DP)
              </h2>
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
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                3. Kebijakan Cuaca Ekstrem &amp; Force Majeure
              </h2>
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
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                4. Fasilitas &amp; Standar Keselamatan
              </h2>
              <p>
                Setiap paket wisata yang dipesan melalui LOTTA mencakup perlengkapan keselamatan standar (life jacket untuk snorkeling/boat, tenda waterproof berstandar pendakian untuk camping, dan kotak P3K). Pemandu resmi LOTTA telah tersertifikasi dalam penanganan pertolongan pertama (First Aid).
              </p>
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                5. Tanggung Jawab &amp; Pelestarian Budaya Lokal
              </h2>
              <p>
                Tamu diwajibkan untuk menghormati adat istiadat setempat (terutama saat memasuki Desa Adat Sasak dan situs suci), mematuhi arahan pemandu, serta menerapkan prinsip Leave No Trace (tidak membuang sampah sembarangan dan menjaga kelestarian alam Lombok).
              </p>
            </section>

            <section className="pt-4 border-t border-forest-border">
              <h2 className="text-base font-extrabold text-forest-header mb-1">
                6. Hubungi Kami
              </h2>
              <p>
                Untuk pertanyaan atau klarifikasi lebih lanjut mengenai Syarat &amp; Ketentuan ini, silakan hubungi kami melalui telepon/WhatsApp resmi di <strong>+62 877-2877-0032</strong> atau datang langsung ke hub kami di Sintung, Pringgarata, Lombok Tengah, NTB 83562.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-forest-border flex justify-between items-center">
            <Link
              href="/"
              className="text-xs font-bold text-forest-primary hover:text-forest-hover transition"
            >
              ← Kembali ke Beranda
            </Link>
            <Link
              href="/privacy"
              className="text-xs font-bold text-forest-header hover:text-forest-primary transition"
            >
              Kebijakan Privasi (Privacy Policy) →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
