# Extending LOTTA

Panduan menambah konten atau fitur baru pada aplikasi web **LOTTA** dengan tetap menjaga kepatuhan terhadap [`DESIGN.md`](../DESIGN.md) dan [`docs/build-spec.md`](./build-spec.md).

## 1. Menambah Story Trailer Baru (`38.2% : 61.8%`)
Tambahkan item baru pada array `storyTrailers` di `src/data/lotta-content.ts`:
- Pastikan tersedia dalam 3 bahasa (`id`, `en`, `it`).
- Wajib memiliki `hook38` (1 paragraf cuplikan terbuka) dan `locked62` (penjelasan bagian cerita yang dikunci untuk dituturkan langsung oleh Guide LOTTA di lokasi).
- Jangan gunakan emoji atau ikon di dalam teks.

## 2. Menambah Paket Wisata pada 3 Pilar
- **Pilar Gunung & Bukit (`mountain`)**: Wajib berstatus **Menginap / Camping** (`mandatoryOvernight: true`). Dilarang menambahkan paket *day-hike / tek-tok*.
- **Pilar Laut & Pantai (`beach`)** & **Heritage Budaya (`heritage`)**: Wajib memiliki tag kabupaten (`lombok-tengah`, `lombok-timur`, `lombok-utara`, atau `lombok-barat`).

## 3. Memperbarui Data Guide (`src/data/guides.json`)
- Setiap objek guide hanya boleh berisi field publik: `id`, `name`, `gender` (`"female"` | `"male"`), `specialties` (`string[]`), dan `photoUrl`.
- Pastikan unit test sanitasi privasi (`guides-privacy.spec.ts`) tetap lulus (`no phone/address/KTA leak`).
