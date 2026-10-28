# M3 — 3 Pillars & Regency Explorer

Spec (§5): Eksplorasi 3 Pilar Wisata Lombok:
1. **Gunung & Bukit (`mountain`)**: 100% Paket Menginap / Camping (`7-summits`, `explore-rinjani`, `only-summit`, `bukit-menginap`).
2. **Laut & Pantai (`beach`)**: Dikelompokkan per 4 Kabupaten (`lombok-tengah`, `lombok-timur`, `lombok-utara`, `lombok-barat`).
3. **Heritage Budaya (`heritage`)**: Dikelompokkan per 4 Kabupaten (`lombok-tengah`, `lombok-utara`, `lombok-timur`, `lombok-barat`).

Status: done. M3a–M3b each passed the gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M3a** | Filter Bar 3 Pilar Utama + Baris Sub-Filter Dinamis (4 Program Gunung Menginap / 4 Kabupaten Lombok) dengan dukungan *horizontal touch swipe* di mobile. |
| **M3b** | Grid 12 Kartu Paket Wisata (`fs-article-card` dengan foto `175px`, pil kabupaten, badge status menginap/swell/visibilitas, dan aksi `Pilih Rute & Guide ->` yang terhubung otomatis ke form Guide). |

## Confirmed decisions

- **C1**: Slices M3a–M3b, gate check setelah setiap slice.
- **C2**: Seluruh 4 program pada pilar `Gunung & Bukit` wajib menyertakan label/keterangan menginap (`Wajib Menginap`, `3D2N / 4D3N Camp`, `2D1N Summit`, `100% Menginap`); tidak boleh ada opsi *day-hike / tek-tok*.
- **C3**: Saat pengguna berpindah pilar utama (`mountain` -> `beach` -> `heritage`), sub-filter otomatis di-reset ke `"all"` (`Semua Program` / `Semua Kabupaten`).
- **C4**: Klik `Pilih Rute & Guide ->` pada kartu paket mana pun akan mengisi dropdown rute di seksi `#guides` dan mengarahkan layar ke seksi `#guides`.
