# LOTTA — Master Build Specification (`docs/build-spec.md`)

> **Single Source of Truth (SSOT)**:
> Dokumen ini mengunci seluruh spesifikasi produk, arsitektur informasi, sistem desain V5 Clean Forest & Sage, integrasi cuaca Open-Meteo, serta katalog 326 Guide resmi DPD HPI NTB untuk website produksi **LOTTA**.

---

## 1. Identitas Brand & Filosofi Produk

| Parameter | Spesifikasi yang Dikunci |
| :--- | :--- |
| **Nama Brand** | **LOTTA** *(Fokus: Wisata Pulau Lombok — Laut, Gunung & Heritage. Akronim LOTTA disisipkan pada bagian About/Footer).* |
| **Tagline Resmi** | **“Beyond the Horizon of Lombok: Living Heritage, Untold Stories.”** |
| **Positioning** | **Informative & Persuasive** — Menyajikan informasi medan, wilayah kabupaten, serta cuaca/ombak secara presisi (*Informative*), sekaligus menjadikan **Cerita Setempat & Heritage Budaya** sebagai komoditas utama yang dijual (*Persuasive*) untuk membangun *awareness* dan konversi pemesanan Guide. |
| **Target Bahasa Antarmuka** | **3 Bahasa (Trilingual):** Bahasa Indonesia (`ID`), Bahasa Inggris (`EN`), dan Bahasa Italia (`IT - Italiano`). |
| **Tech Stack & Hosting** | **Next.js App Router + TypeScript + Tailwind CSS**, di-deploy ke **Vercel**. |

---

## 2. Mekanisme Utama: "Trivia Berisi Seperti Trailer" (38.2% : 61.8%)

Untuk mencegah wisatawan hanya membaca habis cerita di website lalu pergi tanpa memesan pemandu, seluruh cerita lokal dikemas menggunakan rasio emas ($\phi = 1.618$):
1. **38.2% Public Teaser (Terbuka di Website)**:
   - Menampilkan judul dramatis, pil lokasi kabupaten, kutipan pembuka, dan pengantar cerita sepanjang 1 paragraf yang memicu rasa penasaran (*cliffhanger*).
2. **61.8% On-Site Oral Story (Dikunci / Eksklusif Bersama Guide)**:
   - Bagian inti dan klimaks cerita **dikunci di website** di dalam kotak berlatar Sage (`#D4E4DC`) dengan keterangan jelas bahwa kelanjutan kisah tersebut hanya dituturkan secara langsung oleh **Guide LOTTA** saat wisatawan berada di lokasi.
   - Setiap modal *Story Trailer* memiliki tombol CTA langsung (**"Dengarkan Bersama Guide LOTTA"**) yang memilih rute terkait dan mengarahkan ke bagian **Pemilihan Rute & Guide**.

---

## 3. Sistem Desain Visual: V5 "Clean Forest & Sage"

Detail aturan visual diatur di [`DESIGN.md`](../DESIGN.md), dengan ringkasan wajib:
1. **TANPA SIDEBAR**: Satu kanvas penuh (`max-width: 1240px`) di bawah *Top Header Bar* (`#1A3A26`).
2. **TANPA IKON ATAU EMOJI**: Nol ikon SVG dekoratif dan nol emoji Unicode di seluruh UI.
3. **Proporsi Golden Ratio (1 : 1.618)**:
   - **Proporsi Warna**: `61.8%` Canvas (`#F8F9F5`) : `28.2%` Forest & Sage Structure (`#1A3A26`, `#2B4F39`, `#A8CBB8`, `#D4E4DC`) : `10%` Primary Action UI (`#5F8D70`).
   - **Proporsi Grid Desktop**: `1.618fr : 1fr` (`61.8% : 38.2%`) pada *Hero Section*, pengantar seksi, dan panel *Guide Booking*.

---

## 4. Spesifikasi Tampilan Mobile (Clean & Native App-Like UI)

Pada layar *mobile* (`< 768px`), website wajib tampil bersih dan terasa seperti aplikasi *native* (*App-Like Experience*):
1. **Sticky Compact App Header (`#1A3A26`)**:
   - Tinggi `56px`, menampilkan logo teks `LOTTA` di kiri dan tombol bahasa kompak (`ID | EN | IT`) di kanan.
2. **Fixed Bottom Navigation Bar**:
   - Menempel di bagian bawah layar (`fixed bottom-0 inset-x-0 z-50`), latar `#FFFFFF` / `#F8F9F5` dengan border atas `#C5D6CC`.
   - Berisi 4 tab teks bersih tanpa ikon: **`Stories`**, **`Explore`**, **`Weather`**, dan **`Guides`**, dengan indikator aktif berwarna `#5F8D70` (teks putih).
3. **Horizontal Touch Snap-Scroll (`overflow-x-auto snap-x snap-mandatory`)**:
   - Deretan kartu *Story Trailers* dan deretan *chip* filter **3 Pilar & Kabupaten** dapat digeser ke samping secara mulus (*swipeable*).
4. **Slide-Up Bottom Sheet Modal**:
   - Saat pengguna membuka detail *Story Trailer* atau konfirmasi pemesanan Guide di *mobile*, modal muncul dari bawah layar (`rounded-t-2xl`).

---

## 5. Arsitektur Konten: 3 Pilar Wisata & Sub-Kategori Kabupaten

### Pilar 1: Gunung & Bukit (`mountain` — Aturan Mutlak: 100% Paket Menginap / Mandatory Overnight)
Seluruh paket pada pilar ini **wajib dikemas menginap (camping)** — tidak menyediakan paket *day-hike / tek-tok*:
1. **`7-summits` — 7 Summits Rinjani (Sembalun)**: Program penaklukan 7 puncak (Rinjani 3.726m, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, Bao Ritip).
2. **`explore-rinjani` — Explore Rinjani (Kaldera & Danau Segara Anak)**: Ekspedisi 3D2N/4D3N menuruni Danau Segara Anak (2.008m), sumber air panas Aik Kalak, Gua Susu, dan jalur Torean.
3. **`only-summit` — Only Summit Rinjani (3.726 mdpl)**: Pendakian taktis 2D1N via Plawangan Sembalun fokus mengejar matahari terbit di titik tertinggi Dewi Anjani.
4. **`bukit-menginap` — Semua Bukit Menginap (Overnight Hills)**: Paket berkemah 2D1N di Bukit Pergasingan, Bukit Sempana, Bukit Anak Dara, dan Bukit Nanggi untuk menikmati senja petak sawah, langit *Milky Way*, dan cerita api unggun bersama Guide.

### Pilar 2: Laut & Pantai (`beach` — Dikelompokkan per Kabupaten)
1. **`lombok-tengah` (Kab. Lombok Tengah)**: Pantai Tanjung Aan, Pantai Mawun, Pantai Selong Belanak, Bukit Merese.
2. **`lombok-timur` (Kab. Lombok Timur)**: Pink Beach Tangsi, Tebing Karang Tanjung Ringgit, Gili Kondo, Gili Petagan, Gili Bidara.
3. **`lombok-utara` (Kab. Lombok Utara)**: 3 Gili (Gili Trawangan, Gili Meno, Gili Air), Pantai Sire.
4. **`lombok-barat` (Kab. Lombok Barat)**: Secret Gilis Sekotong (Gili Kedis, Gili Sudak, Gili Nanggu), Teluk Mekaki.

### Pilar 3: Heritage Budaya (`heritage` — Dikelompokkan per Kabupaten)
1. **`lombok-tengah` (Kab. Lombok Tengah)**: Desa Adat Sade, Desa Adat Ende, Sentra Tenun Sukarara (Motif *Subahnale*), Legenda Putri Mandalika & Bau Nyale.
2. **`lombok-utara` (Kab. Lombok Utara)**: Masjid Kuno Bayan Beleq (Abad ke-16), Desa Adat Senaru & Hukum Adat Hutan *Awiq-Awiq*.
3. **`lombok-timur` (Kab. Lombok Timur)**: 7 Rumah Adat Kuno Sembalun Bumbung, Sentra Gerabah Tanah Liat Masbagik.
4. **`lombok-barat` (Kab. Lombok Barat)**: Pura Lingsar (Harmoni Kemaliq & Gaduh sejak 1714), Taman Air Kerajaan Narmada (Replika Gunung Rinjani).

---

## 6. Spesifikasi Fitur Live Weather (Gunung) & Wave/Swell (Pantai)

Endpoint **Next.js Route Handler (`src/app/api/weather/route.ts`)** mengambil data meteorologi dan kelautan *real-time* dari **Open-Meteo API** (`revalidate: 1800` / 30 menit) serta *fallback* data aman jika offline:
1. **Zona 1 — Puncak Rinjani & Sembalun (`summit`, `lat: -8.411, lon: 116.457`)**:
   - API: `https://api.open-meteo.com/v1/forecast?latitude=-8.411&longitude=116.457&current=temperature_2m,wind_speed_10m,cloud_cover`
   - Metrik UI: Suhu Puncak/Camp (°C), Kecepatan Angin (km/j), Persentase Langit Cerah Malam Hari (`100 - cloud_cover`), Status Jalur (`OPEN`).
2. **Zona 2 — Pantai Selatan / Kab. Lombok Tengah (`southwave`, `lat: -8.912, lon: 116.285`)**:
   - API: `https://marine-api.open-meteo.com/v1/marine?latitude=-8.912&longitude=116.285&current=wave_height,wave_period,wave_direction`
   - Metrik UI: Tinggi Gelombang / Swell (Meter), Periode Ombak (Detik), Kondisi Angin Pesisir, Status Aktivitas (`SURF & COVE IDEAL`).
3. **Zona 3 — Perairan Gili / Kab. Lombok Utara & Timur (`gililagoon`, `lat: -8.352, lon: 116.046`)**:
   - API: `https://marine-api.open-meteo.com/v1/marine?latitude=-8.352&longitude=116.046&current=wave_height,wave_period`
   - Metrik UI: Tinggi Gelombang (Meter), Visibilitas Bawah Air (20m+), Suhu Air Laut (28.5°C), Status Perairan (`CALM LAGOON`).

---

## 7. Spesifikasi Katalog 326 Guide & Sistem Booking Satu Pintu

### 7.1. Arsitektur Tanpa Admin Panel
- Aplikasi **tidak menggunakan halaman Admin Panel** demi kesederhanaan dan keamanan maksimal.
- Sumber data: File [`src/data/guides.json`](../src/data/guides.json) (berisi **326 Guide resmi DPD HPI NTB** yang telah disanitasi: **36 Female Guide** dan **290 Male Guide**).

### 7.2. Aturan Privasi & Tampilan Kartu Guide
1. **Hanya Tampilkan Data Publik yang Aman**:
   - Setiap item guide di [`src/data/guides.json`](../src/data/guides.json) hanya memiliki field: `id`, `name`, `gender` (`"female"` | `"male"`), `specialties` (`string[]`), dan `photoUrl`.
   - Kartu pada katalog menampilkan Nama Guide, Label Gender (`Female Guide` / `Male Guide`), dan Daftar Bahasa / Spesialisasi.
2. **Nol Eksposur Kontak Pribadi**:
   - Nomor WA pribadi, alamat rumah, dan nomor KTA tidak boleh ada di bundle client maupun API publik.
3. **Filter & Pemesanan Satu Pintu (`Single-Gate WhatsApp LOTTA`)**:
   - Filter katalog berdasarkan:
     - **Gender**: `Semua (326)` | `Female Guide (36)` | `Male Guide (290)`
     - **14 Bahasa / Spesialisasi**: *English Guide (275), Indonesian Guide (47), Komodo Adventure and Sailing Guide (40), Malay Guide (23), Italian Guide (20), German Guide (18), Arabic Guide (13), Korean Guide (8), Mandarin Guide (7), Spanish Guide (7), French Guide (6), Japanese Guide (6), Dutch Guide (3), Russian Guide (1)*.
     - **Pencarian Nama**: Input filter cepat berdasarkan nama Guide.
   - Mode Penugasan Guide:
     - **Opsi Default**: *"Ditugaskan Otomatis oleh Tim LOTTA (Sesuai Gender & Bahasa)"*
     - **Opsi Katalog**: Memilih salah satu Guide spesifik dari daftar 326 Guide.
   - Tombol CTA **"Kirim Permintaan Resmi ke Tim LOTTA"** membuka WhatsApp Admin LOTTA (`wa.me/<NOMOR_ADMIN_LOTTA>?text=...`) dengan format pesan terstruktur otomatis (Bahasa aktif, Paket/Rute, Gender, Bahasa Guide, Nama Guide/Penugasan Otomatis, dan Tanggal Rencana).

---

## 18. Glosarium (Indonesia -> Kode)

| Istilah Bisnis / UI (Indonesia) | Istilah di Kode (`camelCase` / TypeScript) | Penjelasan |
| :--- | :--- | :--- |
| **Cuplikan Cerita Terbuka (38.2%)** | `hook38` / `publicTeaser` | Paragraf pengantar cerita di website yang memancing rasa penasaran. |
| **Cerita Terkunci Eksklusif Guide (61.8%)** | `locked62` / `onSiteLockedStory` | Bagian inti cerita yang hanya dituturkan langsung oleh Guide LOTTA di lokasi. |
| **3 Pilar Wisata** | `pillar` (`'mountain' \| 'beach' \| 'heritage'`) | Tiga kategori utama wisata Lombok di LOTTA. |
| **Sub-Kategori Kabupaten / Program** | `subfilter` / `regencySlug` | Sub-filter program gunung (`7-summits`, dll.) atau kabupaten (`lombok-tengah`, dll.). |
| **Wajib Menginap (Camping)** | `mandatoryOvernight` (`true`) | Aturan mutlak untuk seluruh paket di Pilar Gunung & Bukit. |
| **Zona Cuaca & Gelombang** | `weatherZone` (`'summit' \| 'southwave' \| 'gililagoon'`) | Tiga titik pantauan meteorologi & kelautan Open-Meteo. |
| **Preferensi Gender Pemandu** | `guideGenderFilter` (`'all' \| 'female' \| 'male'`) | Filter gender untuk katalog 326 Guide HPI NTB. |
| **Spesialisasi / Bahasa Pemandu** | `specialty` (`GuideSpecialty`) | Salah satu dari 14 kategori bahasa/keahlian resmi Guide. |
| **Penugasan Otomatis Tim LOTTA** | `assignmentMode: 'auto' \| 'selected'` | Pilihan apakah nama Guide dipilihkan tim LOTTA atau dipilih dari katalog. |
| **Pemesanan Satu Pintu WhatsApp** | `singleGateWhatsAppUrl` | URL `wa.me` resmi Admin LOTTA dengan payload ringkasan permintaan. |
