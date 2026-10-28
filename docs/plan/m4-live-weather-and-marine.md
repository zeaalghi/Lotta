# M4 — Live Weather (Gunung) & Wave/Swell (Pantai)

Spec (§6): Endpoint Server-Side Next.js (`src/app/api/weather/route.ts`) yang mengambil data *real-time* dari **Open-Meteo Forecast & Marine API** (`revalidate: 1800` / 30 menit + *safe fallback*) untuk 3 zona utama Lombok, serta komponen UI Radar Cuaca & Ombak.

Status: done. M4a–M4b each passed the gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M4a** | Route Handler `GET /api/weather` (`src/app/api/weather/route.ts`) untuk Zona 1 (`summit`: `-8.411, 116.457`), Zona 2 (`southwave`: `-8.912, 116.285`), dan Zona 3 (`gililagoon`: `-8.352, 116.046`) lengkap dengan kalkulasi `100 - cloud_cover`, caching 30 menit, dan *fallback* aman bila offline. |
| **M4b** | UI Seksi **Pantauan Cuaca Puncak Rinjani & Tinggi Ombak Pantai** (`#weather`) dengan 3 tab zona, 4 kartu metrik `tabular-nums`, catatan rekomendasi LOTTA, serta sinkronisasi ke kotak ringkasan cuaca di Hero. |

## Confirmed decisions

- **C1**: Slices M4a–M4b, gate check setelah setiap slice.
- **C2**: Endpoint `/api/weather` memanggil Open-Meteo secara paralel (`Promise.allSettled`) dengan timeout 4 detik; jika salah satu zona gagal atau tidak ada koneksi internet saat pengujian lokal, otomatis mengembalikan data *fallback* terkalibrasi tanpa melempar `500 Internal Server Error`.
- **C3**: Metrik langit cerah malam hari pada Zona 1 dihitung dari `100 - cloud_cover` (%) sebagai indikator visibilitas *Milky Way* untuk paket **Bukit Menginap** & **7 Summits**.
- **C4**: Seluruh nilai numerik cuaca dan gelombang menggunakan `tabular-nums` dan tanpa ikon/emoji cuaca.
