# AGENTS.md — LOTTA Structured Vibe Coding Protocol

Workspace ini (`E:\ZEA\Lotta`) menggunakan metodologi **Spec-Driven & Milestone-Sliced Vibe Coding** dengan kombinasi skill **Ponytail** (`DietrichGebert/ponytail`), **Anti-Slop** (`miqdadbadjuber/anti-slop`), dan **Caveman** (`JuliusBrussee/caveman`).

## 1. Golden Rules (WAJIB DIIKUTI AI)

1. **Baca Single Source of Truth Sebelum Menulis Kode**:
   - [`DESIGN.md`](./DESIGN.md) — Aturan visual mutlak V5 Clean Forest & Sage (`#1A3A26`, `#2B4F39`, `#5F8D70`, `#A8CBB8`, `#F8F9F5`), Golden Ratio `1:1.618`, **TANPA SIDEBAR**, **TANPA IKON/EMOJI**.
   - [`docs/build-spec.md`](./docs/build-spec.md) — Spesifikasi bisnis, 3 Bahasa (`ID/EN/IT`), Story Trailer (`38.2% : 61.8%`), 3 Pilar & Kabupaten, Live Weather Open-Meteo, dan Katalog 326 Guide HPI NTB.
   - [`docs/decisions.md`](./docs/decisions.md) & [`docs/open-questions.md`](./docs/open-questions.md).
   - File milestone aktif di [`docs/plan/`](./docs/plan/) (`m0` s/d `m6`).

2. **Plan First, Confirm Second (Jangan Langsung Ngoding)**:
   - Sebelum mengeksekusi milestone atau slice baru, pastikan file `docs/plan/mX-*.md` sudah di-review dan dikonfirmasi oleh user.
   - Jika ada pertanyaan terbuka di `docs/open-questions.md`, minta keputusan user terlebih dahulu lalu kunci ke bagian `## Confirmed decisions` (`C1..Cn`).

3. **Kerjakan Per Vertical Slice (`M0a` -> `M0b`, `M1a` -> `M1b`, dst.) & Wajib Gate Check**:
   - Setiap slice harus lulus 5 tahap gate sebelum lanjut ke slice berikutnya:
     1. `lint`
     2. `typecheck`
     3. `unit`
     4. `build`
     5. `e2e`

4. **4 Larangan Keras Project LOTTA (Hard Invariants)**:
   - **DILARANG** mengubah kode palet warna V5 Forest & Sage.
   - **DILARANG** menambahkan ikon SVG (Lucide/Heroicons/dll.) atau emoji Unicode di UI.
   - **DILARANG** menggunakan layout sidebar.
   - **DILARANG** menampilkan nomor telepon/WA pribadi Guide; seluruh pemesanan wajib satu pintu melalui WhatsApp Admin LOTTA.
