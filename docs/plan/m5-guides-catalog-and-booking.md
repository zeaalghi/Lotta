# M5 — 326 Guide Catalog & Single-Gate WhatsApp Booking

Spec (§7): Integrasi katalog **326 Guide resmi DPD HPI NTB** (`src/data/guides.json`: **36 Female Guide**, **290 Male Guide**, **14 Bahasa/Spesialisasi**) tanpa Admin Panel dan tanpa mengekspos nomor telepon pribadi Guide, dipadukan dengan sistem pemesanan satu pintu (**Single-Gate WhatsApp LOTTA**).

Status: done. M5a–M5b each passed the gate (`lint`, `typecheck`, `unit`, `build`, `e2e`).

Built in slices, each passing the gate (lint, typecheck, unit, build, e2e) before the next:

| Slice | Content |
| :--- | :--- |
| **M5a** | Panel Golden Ratio (`1.618fr : 1fr`) **Simple Guide Preference Picker** (Pilihan Rute Paket, Preferensi Gender `Female 36` / `Male 290` / `Flexible`, dan 14 Bahasa/Spesialisasi) + Kartu Ringkasan Permintaan di sisi kanan. |
| **M5b** | Direktori Interaktif **326 Guide Resmi LOTTA** (Filter Gender, Filter 14 Bahasa/Spesialisasi, Pencarian Nama, Paginasi bersih, opsi memilih *"Ditugaskan Otomatis oleh Tim LOTTA"* atau memilih nama Guide spesifik) + Generator Pesan Resmi Satu Pintu ke WhatsApp Admin LOTTA. |

## Confirmed decisions

- **C1**: Slices M5a–M5b, gate check setelah setiap slice.
- **C2**: Kartu Guide pada katalog hanya menampilkan `name`, label `Female Guide` / `Male Guide`, `specialties`, dan avatar/foto publik. Nomor telepon pribadi, alamat, dan nomor KTA tidak pernah ada di data maupun UI.
- **C3**: Daftar 14 bahasa/spesialisasi menampilkan jumlah akurat sesuai dataset: *English Guide (275), Indonesian Guide (47), Komodo Adventure and Sailing Guide (40), Malay Guide (23), Italian Guide (20), German Guide (18), Arabic Guide (13), Korean Guide (8), Mandarin Guide (7), Spanish Guide (7), French Guide (6), Japanese Guide (6), Dutch Guide (3), Russian Guide (1)*.
- **C4**: Mode penugasan default adalah *"Ditugaskan Otomatis oleh Tim LOTTA (Sesuai Gender & Bahasa)"*, namun pengunjung juga dapat mengklik nama Guide dari katalog 326 Guide untuk menyertakan nama Guide pilihan mereka ke dalam pesan permintaan resmi ke Tim LOTTA.
- **C5**: Nomor tujuan WhatsApp Admin LOTTA diambil dari `process.env.NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER` (dengan fallback aman), dan UI menggabungkan *Simple Preference Picker* (`M5a`) dengan *Interactive 326 Guide Catalog* (`M5b`) sesuai keputusan `G11` & `G12`.
