# M0 — Bootstrap & Forest-Sage Design Tokens

Spec (§1, §3, §8): Inisialisasi project Next.js App Router + TypeScript strict + Tailwind CSS, konfigurasi font `Plus Jakarta Sans`, token warna terkunci **V5 Clean Forest & Sage**, integrasi dataset publik `src/data/guides.json` (326 Guide DPD HPI NTB), serta pipeline 5-stage gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Status: done. M0a–M0b each passed the gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M0a** | Setup `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts` (token `forest.*`), `src/app/globals.css`, dan `src/app/layout.tsx` (`Plus Jakarta Sans`). |
| **M0b** | Verifikasi integritas `src/data/guides.json` (326 Guide: 36 Female, 290 Male, 14 spesialisasi, nol eksposur nomor telepon/alamat/KTA) beserta unit test otomatis & gate runner (`npm run gate`). |

## Confirmed decisions

- **C1**: Slices M0a–M0b, wajib lulus gate (`lint`, `typecheck`, `unit`, `build`, `e2e`) setelah masing-masing slice selesai.
- **C2**: Tidak memasang package ikon apa pun (`lucide-react`, `@heroicons/react`, `react-icons` dilarang masuk `package.json`).
- **C3**: Token warna di `tailwind.config.ts` dan variabel CSS di `globals.css` dikunci persis ke palet V5 Clean Forest & Sage (`#1A3A26`, `#2B4F39`, `#5F8D70`, `#4D775C`, `#A8CBB8`, `#D4E4DC`, `#E6EFEA`, `#F8F9F5`, `#F1F4EE`, `#C5D6CC`, `#9AB0A3`).
- **C4**: Unit test pada `M0b` memvalidasi secara otomatis bahwa `src/data/guides.json` berjumlah tepat 326 data (36 `female`, 290 `male`) dan tidak memiliki properti sensitif (`nomor_telepon`, `phone`, `whatsapp`, `address`, `kta`).

## Implementation notes

- Gunakan utility class `.phi-grid` (`grid-template-columns: 1.618fr 1fr` pada layar `>= 960px`, `1fr` pada mobile) di `globals.css`.
- Tambahkan guard test yang memindai source UI agar tidak ada penggunaan karakter emoji Unicode atau tag `<svg>` ikon dekoratif.
