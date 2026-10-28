# Confirmed Decisions (`docs/decisions.md`)

> Seluruh keputusan di bawah ini telah dikunci bersama klien dan wajib dipatuhi di semua milestone (`M0`–`M6`).

## Global Locked Decisions (`G1`–`G10`)

- **G1 (Visual System V5 Clean Forest & Sage)**: Wajib menggunakan palet warna persis `#1A3A26` (Header), `#2B4F39` (Title), `#5F8D70` (Primary UI), `#4D775C` (Hover), `#A8CBB8` (Sage Accent), `#D4E4DC` (Card Body), `#E6EFEA` (Pill Idle), `#F8F9F5` (61.8% Main Canvas), `#F1F4EE` (Alt Canvas), `#C5D6CC` (Border), dan `#9AB0A3` (Input Border).
- **G2 (No Sidebar & Golden Ratio `1:1.618`)**: Dilarang menggunakan sidebar. Gunakan kontainer satu kanvas penuh (`max-width: 1240px`) dengan pembagian kolom `1.618fr : 1fr` (`61.8% : 38.2%`) pada Hero, Header Seksi, dan Panel Booking Guide.
- **G3 (Zero Icons & Zero Emojis)**: Dilarang keras memasang pustaka ikon SVG (`lucide-react`, `heroicons`, dll.) maupun karakter emoji Unicode di seluruh UI. Gunakan tipografi `Plus Jakarta Sans`, badge teks, dan panah teks (`->`).
- **G4 (Story Trailer Ratio `38.2% : 61.8%`)**: Setiap cerita menampilkan `38.2%` cuplikan publik (*teaser*) dan mengunci `61.8%` inti cerita untuk dituturkan langsung oleh Guide LOTTA di lokasi.
- **G5 (100% Mandatory Overnight pada Pilar Gunung & Bukit)**: Seluruh paket pada Pilar 1 (`7-summits`, `explore-rinjani`, `only-summit`, `bukit-menginap`) wajib dikemas menginap (*camping*); tidak ada paket *day-hike / tek-tok*.
- **G6 (Pengelompokan Kabupaten pada Pantai & Heritage)**: Pilar 2 (`Laut & Pantai`) dan Pilar 3 (`Heritage Budaya`) dikelompokkan berdasarkan 4 kabupaten (`lombok-tengah`, `lombok-timur`, `lombok-utara`, `lombok-barat`).
- **G7 (Trilingual `ID | EN | IT`)**: Seluruh navigasi, hero, cerita trailer, kartu paket, cuaca, dan form pemesanan mendukung Bahasa Indonesia (`ID`), Inggris (`EN`), dan Italia (`IT`). Saat pengguna memilih bahasa `IT`, filter bahasa Guide otomatis menyesuaikan ke `Italian Guide`.
- **G8 (Privasi 326 Guide & Single-Gate Booking)**: Tanpa Admin Panel. Data `src/data/guides.json` berisi 326 Guide resmi (36 Female, 290 Male) tanpa nomor telepon pribadi. Pemesanan wajib satu pintu ke WhatsApp Admin LOTTA.
- **G9 (Mobile App-Like Experience `< 768px`)**: Menggunakan Sticky Compact Header (`56px`), Fixed Bottom Navigation Bar 4 tab teks (`Stories | Explore | Weather | Guides`), Horizontal Touch Snap-Scroll, dan Slide-Up Bottom Sheet Modal.
- **G10 (5-Stage Gate per Slice)**: Setiap slice wajib lulus `lint`, `typecheck`, `unit`, `build`, dan `e2e` sebelum lanjut ke slice berikutnya.
- **G11 (Single-Gate WhatsApp via Env `NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER`)**: Nomor tujuan WhatsApp Admin LOTTA dikonfigurasi melalui `NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER` di `.env.local` / Vercel.
- **G12 (Hybrid Guide Booking UI — Preference Picker + 326 Guide Directory)**: Seksi `#guides` menggabungkan **Form Simple Preference Picker** (dengan default *"Ditugaskan Otomatis oleh Tim LOTTA"*) dan **Katalog Interaktif 326 Guide** (filter Gender `Female 36` / `Male 290` & 14 Bahasa/Spesialisasi, tanpa mengekspos nomor WA pribadi).
