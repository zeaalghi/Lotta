# DESIGN.md — LOTTA V5 "Clean Forest & Sage" Visual Direction

> **Mandatory Design Direction (`antislop` R-37)**:
> File ini adalah arah desain resmi yang telah dikunci bersama klien untuk aplikasi web produksi **LOTTA**. Seluruh komponen UI wajib mematuhi kode warna, proporsi Golden Ratio (`1 : 1.618`), dan larangan mutlak di bawah ini tanpa pengecualian.

---

## 1. Aturan Mutlak Visual (Strict Hard Constraints)

1. **TANPA SIDEBAR (`No Sidebar`)**:
   - Gunakan tata letak satu kanvas penuh (*full-width clean layout* dengan kontainer utama `max-width: 1240px`) di bawah satu *Top Header Bar* (`#1A3A26`).
2. **TANPA IKON ATAU EMOJI (`Zero Icons / Zero Emojis`)**:
   - **DILARANG KERAS** menggunakan ikon SVG dekoratif (Lucide, Heroicons, FontAwesome, dll.) maupun emoji Unicode di seluruh antarmuka.
   - Gunakan kemurnian tipografi (`Plus Jakarta Sans`), pil teks (*text badges*), tanda panah tipografi (`->` / `→`), garis batas tipis (`1px`–`1.5px`), dan fotografi lanskap berkualitas tinggi.
3. **Proporsi Golden Ratio ($\phi = 1.618$)**:
   - **Proporsi Warna Ruang**:
     - **61.8% Canvas Utama (`#F8F9F5` / `#F1F4EE`)**
     - **28.2% Forest & Sage Structure (`#1A3A26`, `#2B4F39`, `#A8CBB8`, `#D4E4DC`)**
     - **10.0% Primary Action UI (`#5F8D70`)**
   - **Proporsi Grid Desktop (`phi-grid`)**:
     - Pembagian kolom utama menggunakan rasio `1.618fr : 1fr` (`61.8% : 38.2%`) pada *Hero Section*, pengantar seksi, dan panel *Guide Booking*.

---

## 2. Palet Warna Resmi ("FOREST & SAGE")

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
    body: "#3E5647",     // Body Copy Text
  }
}
```

---

## 3. Tipografi & Liveliness Dials (`antislop`)

- **Font Family**: `Plus Jakarta Sans` (Weights: `400`, `500`, `600`, `700`, `800`).
- **Monospace / Tabular Numerals (`tabular-nums`)**: Wajib aktif pada metrik ketinggian (`3.726 mdpl`), suhu (`8°C`), tinggi gelombang (`1.4m`), periode ombak (`12s`), dan jumlah guide (`326`).
- **Liveliness Dials**:
  - **ENERGY**: `3/5` (Editorial tenang, mengundang rasa penasaran melalui narasi & foto alam Lombok).
  - **RHYTHM**: `4/5` (Kontras ritme antara kanvas terang `#F8F9F5`, seksi alternatif `#F1F4EE`, dan kartu Sage `#D4E4DC` dengan rasio $\phi$).
  - **MOTION**: `2/5` (Transisi halus `150ms–220ms`, *touch snap-scroll* pada mobile, dan *slide-up bottom sheet*).

---

## 4. Spesifikasi Komponen Kunci

### 4.1. Kartu Artikel / Paket (`fs-article-card`)
- Sudut membulat `12px` (`rounded-xl`), border `1px solid #C5D6CC`, overflow tersembunyi.
- **Bagian Atas (Foto)**: Tinggi `190px` (Story Trailer) atau `175px` (Paket 3 Pilar), dengan pil teks lokasi kabupaten (`bg-[#1A3A26] text-white`) di kiri atas dan pil status/rasio (`bg-[#5F8D70] text-white`) di kanan bawah.
- **Bagian Bawah (Body)**: Latar `#D4E4DC`, judul tebal (`#1A3A26`), deskripsi ringkas (`#3E5647`), dan tautan aksi teks tebal di bagian bawah (`Baca Trailer Cerita ->` atau `Pilih Rute & Guide ->`).

### 4.2. Tombol & Form Input
- **Primary Button**: `bg-[#5F8D70] hover:bg-[#4D775C] text-white font-bold rounded-lg px-5 py-3`.
- **Secondary Button**: `bg-[#E6EFEA] border-[1.5px] border-[#9AB0A3] text-[#2B4F39] font-bold rounded-lg px-5 py-3`.
- **Input & Select Dropdown**: `bg-[#F8F9F5] border-[1.5px] border-[#9AB0A3] text-[#1A3A26] rounded-lg px-3.5 py-2.5`.

### 4.3. Mobile Native App-Like UI (`< 768px`)
1. **Sticky Compact App Header (`#1A3A26`)**: Tinggi `56px`, logo teks `LOTTA` di kiri, switcher bahasa kompak (`ID | EN | IT`) di kanan.
2. **Fixed Bottom Navigation Bar**: `fixed bottom-0 inset-x-0 z-50 bg-[#F8F9F5] border-t border-[#C5D6CC]`, berisi 4 tab teks murni tanpa ikon: **`Stories`**, **`Explore`**, **`Weather`**, **`Guides`** (indikator aktif `bg-[#5F8D70] text-white`).
3. **Horizontal Touch Snap-Scroll**: `overflow-x-auto snap-x snap-mandatory` untuk kartu *Story Trailers* dan *chip* filter pada layar mobile.
4. **Slide-Up Bottom Sheet Modal**: Modal *Story Trailer* dan konfirmasi pemesanan Guide muncul dari bawah layar (`rounded-t-2xl`) pada mobile.
