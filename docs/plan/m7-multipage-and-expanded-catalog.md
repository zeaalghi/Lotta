# M7 — Multi-Page Architecture, Full Destination Names & Expanded Story Catalog

Spec (User Feedback Improvement):
1. Perbaikan bug tombol tab zona cuaca yang terpotong dan tidak bisa di-scroll (`lg:justify-end` + `overflow-x-auto` dihapus, diganti bar tab proporsional `flex-wrap`).
2. Transformasi dari Single-Page menjadi **Multi-Page Application** yang mulus (`/`, `/stories`, `/explore`, `/weather`, `/guides`) dengan shared state bahasa (`ID | EN | IT`).
3. Menghapus tulisan teknis/meta seperti `(38.2% TEASER TERBUKA)` / badge `38.2% Teaser` pada kartu dan menggantinya dengan **Nama Destinasi Asli** secara jelas.
4. Memperbanyak **Katalog Cerita Lokal** (16+ cerita lintas gunung, pantai, dan budaya) serta menampilkan **seluruh nama destinasi satu per satu** (28 destinasi lengkap di 3 Pilar & 4 Kabupaten).

Status: done.

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M7a** | Ekspansi `src/data/lotta-content.ts`: 16 Cerita Lokal dengan nama destinasi eksplisit, 28 Destinasi lengkap (Gunung Menginap, Pantai per Kabupaten, Heritage per Kabupaten), foto autentik, dan pembersihan label teknis kaku. |
| **M7b** | Komponen Shell Multi-Page (`src/components/LottaShell.tsx` + Context Bahasa `ID/EN/IT`) dan pembuatan 5 halaman: `/` (Beranda), `/stories` (Katalog Cerita Lengkap), `/explore` (Semua Destinasi 3 Pilar & Kabupaten), `/weather` (Cuaca & Gelombang tanpa bug terpotong), dan `/guides` (Katalog 326 Guide & Booking Satu Pintu dengan dukungan query `?route=`). |

## Confirmed decisions

- **C1**: Navigasi utama menggunakan Next.js `<Link>` ke 5 rute halaman (`/`, `/stories`, `/explore`, `/weather`, `/guides`) baik di Top Header Desktop maupun Fixed Bottom Navigation Bar Mobile.
- **C2**: Badge pada kartu cerita dan destinasi menampilkan **Nama Destinasi** (contoh: `Danau Segara Anak`, `Desa Adat Sade`, `Pantai Tanjung Aan`, `Bukit Pergasingan`), bukan angka persentase `38.2% Teaser`.
- **C3**: Seluruh 28 destinasi dari spesifikasi ditampilkan secara eksplisit dengan namanya masing-masing pada halaman `/explore`.
- **C4**: Bar pilihan zona cuaca di `/weather` menggunakan `flex flex-wrap gap-2` di bawah judul atau di bar terpisah sehingga tidak pernah terpotong di layar mana pun.
