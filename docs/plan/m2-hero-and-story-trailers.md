# M2 — Golden Ratio Hero & Story Trailers (`38.2% : 61.8%`)

Spec (§2, §3.3, §4.3, §4.4): Hero Section dengan rasio emas (`1.618fr : 1fr`), kotak ringkasan cuaca cepat di sisi kanan hero, deretan kartu *Story Trailers* (`fs-article-card`), *Horizontal Touch Snap-Scroll* di mobile, serta Modal Desktop / Slide-Up Bottom Sheet Mobile yang menampilkan `38.2%` Public Teaser dan mengunci `61.8%` cerita untuk Guide LOTTA.

Status: done. M2a–M2b each passed the gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M2a** | Hero Section (`1.618fr : 1fr`) + Quick Weather Summary Card + Grid/Snap-Scroll Kartu *Story Trailers* (`fs-article-card` dengan foto `190px`, pil kabupaten `#1A3A26`, pil `38.2% Teaser` `#5F8D70`, dan body `#D4E4DC`). |
| **M2b** | Story Trailer Modal (Desktop Centered Modal & Mobile Slide-Up Bottom Sheet `rounded-t-2xl`) yang memisahkan kotak `38.2% Public Trailer` (`#F8F9F5`) dan `61.8% Locked Guide Story` (`#D4E4DC`), lengkap dengan CTA langsung menuju pemilihan rute & Guide. |

## Confirmed decisions

- **C1**: Slices M2a–M2b, gate check setelah setiap slice.
- **C2**: Setiap kartu *Story Trailer* menampilkan tepat `38.2%` teaser; bagian `61.8%` tidak pernah dibocorkan penuh di DOM dan hanya menjelaskan *cliffhanger* apa yang akan diceritakan langsung oleh Guide LOTTA di lokasi.
- **C3**: Menekan tombol **"Dengarkan Bersama Guide LOTTA"** di dalam modal akan menutup modal, memilih rute terkait di form Guide, dan melakukan *smooth scroll* ke seksi `#guides`.
- **C4**: Pada layar `< 768px`, deretan kartu *Story Trailers* menggunakan `overflow-x-auto snap-x snap-mandatory` agar nyaman digeser dengan ibu jari.

## Implementation notes

- Modal mendukung penutupan via tombol `TUTUP [X]`, klik backdrop, dan tombol keyboard `Escape`, serta mengunci scroll body saat terbuka.
