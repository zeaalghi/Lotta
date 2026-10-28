# LOTTA — Master Product & Technical Specification (Agent-Ready Blueprint)

> **Instruksi Penggunaan untuk AI Coding Agent:**
> Dokumen ini adalah **Single Source of Truth (SSOT)** untuk membangun aplikasi web produksi **LOTTA**. Seluruh keputusan bisnis, arsitektur informasi, kode warna, aturan desain, dan struktur data telah dikunci bersama klien. **Jangan mengubah kode warna, jangan menambahkan ikon/emoji, jangan menambahkan sidebar, dan jangan mengekspos nomor telepon pribadi Guide ke publik.**

---

## 1. Identitas Brand & Filosofi Produk

| Parameter | Spesifikasi yang Dikunci |
| :--- | :--- |
| **Nama Brand** | **LOTTA** *(Fokus: Wisata Pulau Lombok — Laut, Gunung & Heritage. Akronim LOTTA memiliki arti khusus yang dapat disisipkan pada bagian About/Footer).* |
| **Tagline Resmi** | **“Beyond the Horizon of Lombok: Living Heritage, Untold Stories.”** |
| **Positioning** | **Informative & Persuasive** — Menyajikan informasi medan, wilayah kabupaten, serta cuaca/ombak secara presisi (*Informative*), sekaligus menjadikan **Cerita Setempat & Heritage Budaya** sebagai komoditas utama yang dijual (*Persuasive*) untuk membangun *awareness* dan konversi pemesanan Guide. |
| **Target Bahasa Antarmuka** | **3 Bahasa (Trilingual):** Bahasa Indonesia (`ID`), Bahasa Inggris (`EN`), dan Bahasa Italia (`IT - Italiano`). |
| **Hosting & Deployment** | **Vercel** (Next.js App Router + TypeScript + Tailwind CSS). |

---

## 2. Mekanisme Utama: "Trivia Berisi Seperti Trailer" (38.2% : 61.8%)

Untuk mencegah wisatawan hanya membaca habis cerita di website lalu pergi tanpa memesan pemandu, seluruh cerita lokal dikemas menggunakan rasio emas (phi = 1.618):
1. **38.2% Public Teaser (Terbuka di Website):**
   * Menampilkan judul dramatis, lokasi kabupaten, kutipan pembuka, dan pengantar cerita sepanjang 1 paragraf yang memicu rasa penasaran (*cliffhanger*).
2. **61.8% On-Site Oral Story (Dikunci / Eksklusif Bersama Guide):**
   * Bagian inti dan klimaks cerita **dikunci di website** dengan keterangan jelas bahwa kelanjutan kisah tersebut hanya dituturkan secara langsung oleh **Guide LOTTA** saat wisatawan berada di lokasi.
   * Setiap modal *Story Trailer* memiliki tombol CTA langsung menuju **Pemilihan Rute & Guide**.

---

## 3. Sistem Desain Visual: V5 "Clean Forest & Sage"

### 3.1. Aturan Mutlak Visual (Strict Constraints)
1. **TANPA SIDEBAR:** Gunakan tata letak satu kanvas penuh (*full-width clean layout* dengan kontainer tengah `max-width: 1240px`) di bawah satu *Top Header Bar* (`#1A3A26`).
2. **TANPA IKON ATAU EMOJI:** Dilarang menggunakan ikon SVG dekoratif (Lucide, Heroicons, FontAwesome) maupun emoji Unicode di seluruh antarmuka. Gunakan kemurnian tipografi, pil teks (*text badges*), garis batas tipis, dan fotografi berkualitas tinggi.
3. **Proporsi Golden Ratio (1 : 1.618):**
   * **Proporsi Warna:** **61.8% Canvas (`#F8F9F5`)** : **28.2% Forest & Sage Structure (`#1A3A26`, `#2B4F39`, `#A8CBB8`, `#D4E4DC`)** : **10% Primary Action UI (`#5F8D70`)**.
   * **Proporsi Grid Desktop:** Pembagian kolom utama menggunakan rasio `1.618fr : 1fr` (61.8% : 38.2%) pada *Hero Section*, pengantar seksi, dan panel *Guide Booking*.

### 3.2. Palet Warna Resmi (Exact Client Reference: "FOREST & SAGE")
```ts
// tailwind.config.ts color tokens
colors: {
  forest: {
    header: "#1A3A26",   // Headers: Top Navbar, Footer, Main Headings
    title: "#2B4F39",    // Titles: Section Subtitles, Labels, Active Text Links
    primary: "#5F8D70",  // Primary/UI: Primary Buttons, Active Tabs, Badges
    hover: "#4D775C",    // Primary Button Hover
    sage: "#A8CBB8",     // Backgrounds: Secondary Accents & Active Borders
    card: "#D4E4DC",     // Card Body: Soft Sage bottom half of cards
    pill: "#E6EFEA",     // Inactive Filter Pills & Subtle Surfaces
    canvas: "#F8F9F5",   // Canvas: 61.8% Main Background
    alt: "#F1F4EE",      // Alternating Section Canvas
    border: "#C5D6CC",   // Clean Card/Section Borders
    input: "#9AB0A3",    // Form Input & Dropdown Borders
  }
}
```

### 3.3. Spesifikasi Komponen UI
* **Kartu Artikel / Destinasi (`fs-article-card`):**
  * Sudut membulat `12px` (`rounded-xl`), tanpa bingkai rumit.
  * Bagian atas: Foto destinasi (`height: 190px`) dengan pil teks lokasi kabupaten (`#1A3A26`) di kiri atas dan pil status (`#5F8D70`) di kanan bawah.
  * Bagian bawah: Latar warna Sage lembut (`#D4E4DC`), judul tebal (`#1A3A26`), deskripsi ringkas (`#3E5647`), dan tautan aksi teks tebal di bagian bawah (`Baca Trailer Cerita ->` atau `Pilih Rute & Guide ->`).
* **Tombol & Form Input:**
  * Primary Button: Latar `#5F8D70`, teks `#FFFFFF`, `rounded-lg` (`8px`), `font-bold`.
  * Secondary Button: Latar `#E6EFEA`, border `1.5px solid #9AB0A3`, teks `#2B4F39`, `rounded-lg`.
  * Input & Dropdown: Latar `#F8F9F5`, border `1.5px solid #9AB0A3`, `rounded-lg`, bersih seperti spesifikasi *UI Components* klien.

---

## 4. Spesifikasi Tampilan Mobile (Clean & Native App-Like UI)

Pada layar *mobile* (`< 768px`), website wajib tampil bersih dan terasa seperti aplikasi *native* (*App-Like Experience*):
1. **Sticky Compact App Header (`#1A3A26`):**
   * Tinggi `56px`, menampilkan logo teks `LOTTA` di kiri dan tombol bahasa kompak (`ID | EN | IT`) di kanan.
2. **Fixed Bottom Navigation Bar:**
   * Menempel di bagian bawah layar (`fixed bottom-0 inset-x-0 z-50`), latar `#FFFFFF` / `#F8F9F5` dengan border atas `#C5D6CC`.
   * Berisi 4 tab teks bersih tanpa ikon: **`Stories`**, **`Explore`**, **`Weather`**, dan **`Guides`**, dengan indikator aktif berwarna `#5F8D70` (teks putih).
3. **Horizontal Touch Snap-Scroll (`overflow-x-auto snap-x snap-mandatory`):**
   * Pada layar *mobile*, deretan kartu *Story Trailers* dan deretan *chip* filter **3 Pilar & Kabupaten** dapat digeser ke samping secara mulus (*swipeable*) agar halaman tidak terlalu panjang ke bawah.
4. **Slide-Up Bottom Sheet Modal:**
   * Saat pengguna membuka detail *Story Trailer* atau konfirmasi pemesanan Guide di *mobile*, modal muncul dari bawah layar (`rounded-t-2xl`) layaknya *native bottom sheet*.

---

## 5. Arsitektur Konten: 3 Pilar Wisata & Sub-Kategori Kabupaten

### Pilar 1: Gunung & Bukit (Aturan Mutlak: 100% Paket Menginap / Mandatory Overnight)
Seluruh paket pada pilar ini **wajib dikemas menginap (camping)**—tidak menyediakan paket *day-hike / tek-tok*:
1. **`7-summits` — 7 Summits Rinjani (Sembalun):** Program penaklukan 7 puncak (Rinjani 3.726m, Sempana, Lembah Gedong, Kondo, Anak Dara, Pergasingan, Bao Ritip).
2. **`explore-rinjani` — Explore Rinjani (Kaldera & Danau Segara Anak):** Ekspedisi 3D2N/4D3N menuruni Danau Segara Anak (2.008m), sumber air panas Aik Kalak, Gua Susu, dan jalur Torean.
3. **`only-summit` — Only Summit Rinjani (3.726 mdpl):** Pendakian taktis 2D1N via Plawangan Sembalun fokus mengejar matahari terbit di titik tertinggi Dewi Anjani.
4. **`bukit-menginap` — Semua Bukit Menginap (Overnight Hills):** Paket berkemah 2D1N di Bukit Pergasingan, Bukit Sempana, Bukit Anak Dara, dan Bukit Nanggi untuk menikmati senja petak sawah, langit *Milky Way*, dan cerita api unggun bersama Guide.

### Pilar 2: Laut & Pantai (Dikelompokkan per Kabupaten)
1. **`lombok-tengah` (Kab. Lombok Tengah):** Pantai Tanjung Aan, Pantai Mawun, Pantai Selong Belanak, Bukit Merese.
2. **`lombok-timur` (Kab. Lombok Timur):** Pink Beach Tangsi, Tebing Karang Tanjung Ringgit, Gili Kondo, Gili Petagan, Gili Bidara.
3. **`lombok-utara` (Kab. Lombok Utara):** 3 Gili (Gili Trawangan, Gili Meno, Gili Air), Pantai Sire.
4. **`lombok-barat` (Kab. Lombok Barat):** Secret Gilis Sekotong (Gili Kedis, Gili Sudak, Gili Nanggu), Teluk Mekaki.

### Pilar 3: Heritage Budaya (Dikelompokkan per Kabupaten)
1. **`lombok-tengah` (Kab. Lombok Tengah):** Desa Adat Sade, Desa Adat Ende, Sentra Tenun Sukarara (Motif *Subahnale*), Legenda Putri Mandalika & Bau Nyale.
2. **`lombok-utara` (Kab. Lombok Utara):** Masjid Kuno Bayan Beleq (Abad ke-16), Desa Adat Senaru & Hukum Adat Hutan *Awiq-Awiq*.
3. **`lombok-timur` (Kab. Lombok Timur):** 7 Rumah Adat Kuno Sembalun Bumbung, Sentra Gerabah Tanah Liat Masbagik.
4. **`lombok-barat` (Kab. Lombok Barat):** Pura Lingsar (Harmoni Kemaliq & Gaduh sejak 1714), Taman Air Kerajaan Narmada (Replika Gunung Rinjani).

---

## 6. Spesifikasi Fitur Live Weather (Gunung) & Wave/Swell (Pantai)

Buat **Next.js Route Handler (`src/app/api/weather/route.ts`)** yang mengambil data meteorologi dan kelautan *real-time* dari **Open-Meteo API** (gratis, tanpa API key, dengan `revalidate: 1800` / 30 menit) serta *fallback* data aman jika offline:
1. **Zona 1 — Puncak Rinjani & Sembalun (`lat: -8.411, lon: 116.457`):**
   * API: `https://api.open-meteo.com/v1/forecast?latitude=-8.411&longitude=116.457&current=temperature_2m,wind_speed_10m,cloud_cover`
   * Metrik UI: Suhu Puncak/Camp (°C), Kecepatan Angin (km/j), Persentase Langit Cerah Malam Hari (`100 - cloud_cover`), Status Jalur (`OPEN`).
2. **Zona 2 — Pantai Selatan / Kab. Lombok Tengah (`lat: -8.912, lon: 116.285`):**
   * API: `https://marine-api.open-meteo.com/v1/marine?latitude=-8.912&longitude=116.285&current=wave_height,wave_period,wave_direction`
   * Metrik UI: Tinggi Gelombang / Swell (Meter), Periode Ombak (Detik), Kondisi Angin Pesisir, Status Aktivitas (`SURF & COVE IDEAL`).
3. **Zona 3 — Perairan Gili / Kab. Lombok Utara & Timur (`lat: -8.352, lon: 116.046`):**
   * API: `https://marine-api.open-meteo.com/v1/marine?latitude=-8.352&longitude=116.046&current=wave_height,wave_period`
   * Metrik UI: Tinggi Gelombang (Meter), Visibilitas Bawah Air (20m+), Suhu Air Laut (28.5°C), Status Perairan (`CALM LAGOON`).

---

## 7. Spesifikasi Katalog 326 Guide & Sistem Booking Satu Pintu

### 7.1. Arsitektur Tanpa Admin Panel
* Aplikasi **tidak menggunakan halaman Admin Panel** demi kesederhanaan dan keamanan maksimal.
* Sumber data: File `src/data/guides.json` (berisi **326 Guide resmi hasil scrape DPD HPI NTB** yang telah disanitasi: **36 Female Guide** dan **290 Male Guide**).

### 7.2. Aturan Privasi & Tampilan Kartu Guide (Sangat Penting!)
1. **Hanya Tampilkan Nama & Bahasa/Specialty:**
   * Setiap kartu pada katalog Guide **hanya menampilkan**:
     * **`name`**: Nama Guide
     * **`specialties`**: Daftar Bahasa / Spesialisasi Guide (dari 14 kategori resmi)
     * Label Gender (`Female Guide` / `Male Guide`)
2. **Sembunyikan Nomor WA Pribadi Guide:**
   * Nomor telepon pribadi (`nomor_telepon`), alamat rumah, dan nomor KTA telah dihapus dari `guides-public.json` agar pengunjung tidak menghubungi Guide secara langsung di luar sistem LOTTA.
3. **Alur Filter & Pemesanan Satu Pintu (Single-Gate WhatsApp LOTTA):**
   * Wisatawan dapat memfilter katalog berdasarkan:
     * **Gender:** `Semua (326)` | `Female Guide (36)` | `Male Guide (290)`
     * **14 Bahasa / Spesialisasi:** *English Guide (275), Indonesian Guide (47), Komodo Adventure and Sailing Guide (40), Malay Guide (23), Italian Guide (20), German Guide (18), Arabic Guide (13), Korean Guide (8), Mandarin Guide (7), Spanish Guide (7), French Guide (6), Japanese Guide (6), Dutch Guide (3), Russian Guide (1)*.
   * Wisatawan dapat memilih **"Ditugaskan Otomatis oleh Tim LOTTA (Sesuai Gender & Bahasa)"** atau memilih salah satu nama Guide dari katalog, lalu menekan tombol **"Kirim Permintaan Resmi ke Tim LOTTA"** yang mengarah ke WhatsApp Admin LOTTA dengan pesan terformat otomatis.

---

## 8. Struktur Direktori Project Next.js (`lotta-web`)

```text
lotta-web/
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── src/
    ├── data/
    │   ├── guides.json          # 326 Guide (id, name, gender, specialties, photoUrl — tanpa no WA pribadi)
    │   └── lotta-content.ts     # Data 3 Bahasa (ID/EN/IT), Story Trailers (38.2%:61.8%), 12 Paket 3 Pilar
    └── app/
        ├── globals.css          # Variabel Forest & Sage, Scroll-Snap, & Print CSS
        ├── layout.tsx           # Root Layout & Font Plus Jakarta Sans
        ├── page.tsx             # Halaman Utama Interaktif (Desktop Full-Width + Mobile App-Like UI)
        └── api/
            └── weather/
                └── route.ts     # Endpoint Server-Side Open-Meteo Weather & Marine API
```
