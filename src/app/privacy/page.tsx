"use client";

import React from "react";
import Link from "next/link";
import { useLotta } from "@/components/LottaShell";

export default function PrivacyPage() {
  const { lang } = useLotta();

  return (
    <div className="py-12 sm:py-16 bg-forest-alt min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-7 sm:p-10 border border-forest-border shadow-sm">
          <div className="text-xs font-extrabold uppercase tracking-widest text-forest-primary mb-2">
            KEBIJAKAN PRIVASI &amp; PERLINDUNGAN DATA
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
            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                1. Komitmen Privasi Kami
              </h2>
              <p>
                LOTTA menghargai dan melindungi privasi setiap pengguna, tamu, dan pemandu lokal kami. Kebijakan Privasi ini menjelaskan bagaimana data Anda dikumpulkan, digunakan, dan dijaga keamanannya saat mengakses situs web kami.
              </p>
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                2. Data yang Kami Kumpulkan
              </h2>
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
                  Data telemetri teknis anonim (seperti preferensi bahasa situs) yang disimpan secara lokal di browser Anda untuk kenyamanan navigasi tanpa pelacak pihak ketiga (third-party trackers).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                3. Perlindungan Privasi Pemandu Lokal
              </h2>
              <p>
                Sesuai dengan komitmen etika LOTTA, data pribadi sensitif para pemandu resmi (seperti nomor KTP, alamat rumah pribadi, dan nomor kontak pribadi pemandu) tidak dipublikasikan secara terbuka di situs untuk mencegah penyalahgunaan spam atau doxxing. Komunikasi awal dikoordinasikan secara aman dan tertutup melalui saluran resmi LOTTA.
              </p>
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                4. Tidak Ada Penjualan Data (Zero Data Selling)
              </h2>
              <p>
                LOTTA <strong>tidak pernah dan tidak akan pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda</strong> kepada pihak ketiga mana pun untuk tujuan iklan berbayar atau promosi spam.
              </p>
            </section>

            <section>
              <h2 className="text-base font-extrabold text-forest-header mb-2">
                5. Keamanan &amp; Penyimpanan
              </h2>
              <p>
                Seluruh pertukaran data dilindungi dengan enkripsi standar HTTPS/TLS. Akses terhadap informasi pemesanan hanya diberikan kepada staf operasional dan pemandu yang ditugaskan untuk melayani trip Anda.
              </p>
            </section>

            <section className="pt-4 border-t border-forest-border">
              <h2 className="text-base font-extrabold text-forest-header mb-1">
                6. Pertanyaan Mengenai Privasi
              </h2>
              <p>
                Jika Anda memiliki pertanyaan mengenai perlindungan data pribadi Anda di platform LOTTA, silakan hubungi kontak resmi kami di <strong>+62 877-2877-0032</strong> atau melalui kantor kami di Sintung, Pringgarata, Lombok Tengah, NTB 83562.
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
              href="/terms"
              className="text-xs font-bold text-forest-header hover:text-forest-primary transition"
            >
              Syarat &amp; Ketentuan (Terms &amp; Conditions) →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
