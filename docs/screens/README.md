# Screen & Section Specifications (`docs/screens/`)

Karena **LOTTA** menggunakan arsitektur satu kanvas penuh (*Single Full-Width Canvas* di Desktop dan *4-Tab Native App-Like View* di Mobile tanpa Sidebar), spesifikasi layar dibagi menjadi 4 area utama:

1. **Header & Navigation Shell**:
   - **Desktop (`>= 768px`)**: Top Header Bar (`#1A3A26`), logo `LOTTA` + sub-label `Laut • Gunung • Heritage Lombok`, 4 tautan jangkar (`Beranda`, `3 Pilar & Kabupaten`, `Cuaca & Ombak`, `Preferensi Guide`), dan switcher bahasa `ID | EN | IT`.
   - **Mobile (`< 768px`)**: Sticky Compact App Header (`56px`, `#1A3A26`) di atas + Fixed Bottom Navigation Bar (`Stories | Explore | Weather | Guides`) di bawah.
2. **Hero & Story Trailers (`#stories`)**:
   - Grid Golden Ratio `1.618fr : 1fr` (Hero Copy & CTA di kiri, Ringkasan Cuaca & Jalur Hari Ini di kanan).
   - Deretan kartu `fs-article-card` untuk *Story Trailers* (`38.2% Teaser`) + Modal/Bottom-Sheet yang mengunci `61.8%` cerita untuk Guide.
3. **3 Pillars & Regency Explorer (`#explore`)**:
   - 3 tab pilar utama (`Gunung & Bukit (Semua Menginap)`, `Laut & Pantai (Sub per Kabupaten)`, `Heritage Budaya (Sub per Kabupaten)`).
   - Baris chip sub-filter (4 program gunung atau 4 kabupaten).
   - Grid 4 kolom di desktop / swipeable di mobile untuk 12 paket wisata.
4. **Live Weather & Wave Intelligence (`#weather`) + Guide Booking (`#guides`)**:
   - 3 tab zona cuaca Open-Meteo (`Cuaca Gunung & Bukit`, `Ombak Selatan (Lombok Tengah)`, `Perairan Gili (Utara & Timur)`) dengan 4 metrik utama + kotak rekomendasi LOTTA.
   - Panel Golden Ratio `1.618fr : 1fr` untuk Pemilihan Rute, Preferensi Gender (`Female Guide 36`, `Male Guide 290`, `Flexible`), 14 Bahasa Guide, Katalog 326 Guide, dan Ringkasan Permintaan Satu Pintu ke WhatsApp Admin LOTTA.
