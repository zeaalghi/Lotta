# M1 — Trilingual Content Core (`ID/EN/IT`) & Responsive Navigation Shell

Spec (§1, §3.1, §4): Kamus 3 bahasa (`ID`, `EN`, `IT`), struktur data terpusat `src/data/lotta-content.ts`, Top Header Bar Desktop (`#1A3A26` tanpa sidebar), serta Mobile Sticky Compact Header (`56px`) + Fixed Bottom Navigation Bar (`Stories | Explore | Weather | Guides`).

Status: done. M1a–M1b each passed the gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M1a** | Pembuatan `src/data/lotta-content.ts` berisi tipe & konten lengkap 3 Bahasa (`ID`, `EN`, `IT`) untuk UI copy, Story Trailers (`38.2%:61.8%`), 12 Paket Wisata 3 Pilar, dan 14 Spesialisasi Guide. |
| **M1b** | Implementasi Header Desktop (`#1A3A26`), Mobile Sticky Compact Header (`56px`), Language Switcher (`ID | EN | IT`), dan Mobile Fixed Bottom Navigation Bar (4 tab teks bersih tanpa ikon) + Footer. |

## Confirmed decisions

- **C1**: Slices M1a–M1b, gate check setelah setiap slice.
- **C2**: Bahasa default saat pertama kali dibuka adalah Bahasa Indonesia (`id`), dan dapat diganti secara instan ke `en` (English) atau `it` (Italiano) tanpa reload halaman.
- **C3**: Saat bahasa diubah ke `it` (Italiano), nilai pilihan bahasa Guide pada form pemesanan otomatis disinkronkan ke `Italian Guide`.
- **C4**: Mobile Bottom Navigation Bar hanya tampil pada viewport `< 768px`, berisi 4 tab teks murni (`Stories`, `Explore`, `Weather`, `Guides`) dengan indikator aktif `#5F8D70`.

## Implementation notes

- Pastikan padding bawah halaman mobile (`pb-20 md:pb-0`) mengakomodasi tinggi Fixed Bottom Navigation Bar agar footer dan tombol CTA tidak tertutup.
