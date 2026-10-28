# Master Roadmap — LOTTA (`M0` – `M6`)

> Setiap milestone dibagi menjadi *Vertical Slices* (`M0a`, `M0b`, dst.) yang telah melewati konfirmasi manusia dan lulus **5-Stage Gate** (`lint`, `typecheck`, `unit`, `build`, `e2e`).

| Milestone | File Plan | Fokus Utama & Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **M0** | [`docs/plan/m0-bootstrap.md`](./plan/m0-bootstrap.md) | Next.js App Router, Tailwind V5 Forest & Sage tokens, `Plus Jakarta Sans`, data `guides.json` (326 Guide), dan 5-stage gate pipeline (`lint`, `typecheck`, `unit`, `build`, `e2e`). | `done` |
| **M1** | [`docs/plan/m1-i18n-and-content-core.md`](./plan/m1-i18n-and-content-core.md) | Trilingual Engine (`ID | EN | IT`), struktur `lotta-content.ts` (Story Trailers `38.2%:61.8%` & 12 Paket 3 Pilar), Desktop Top Header (`#1A3A26`) + Mobile Sticky Header & Fixed Bottom Nav (`Stories | Explore | Weather | Guides`). | `done` |
| **M2** | [`docs/plan/m2-hero-and-story-trailers.md`](./plan/m2-hero-and-story-trailers.md) | Golden Ratio Hero (`1.618fr : 1fr`), Live Weather Quick Summary Box, Story Trailer Cards (`fs-article-card`), Mobile Snap-Scroll, dan Modal/Bottom-Sheet `38.2%` Teaser vs `61.8%` Locked Guide Story. | `done` |
| **M3** | [`docs/plan/m3-three-pillars-explorer.md`](./plan/m3-three-pillars-explorer.md) | Eksplorasi 3 Pilar (`Gunung & Bukit` 100% Menginap, `Laut & Pantai` per Kabupaten, `Heritage Budaya` per Kabupaten), sub-filter chip swipeable, kartu rute, dan deep-link ke pemilihan Guide. | `done` |
| **M4** | [`docs/plan/m4-live-weather-and-marine.md`](./plan/m4-live-weather-and-marine.md) | Endpoint `GET /api/weather` (Open-Meteo Forecast & Marine API, `revalidate: 1800`, safe fallback) untuk 3 Zona (Puncak Rinjani, Pantai Selatan Lombok Tengah, Perairan Gili) + UI Radar Cuaca & Ombak. | `done` |
| **M5** | [`docs/plan/m5-guides-catalog-and-booking.md`](./plan/m5-guides-catalog-and-booking.md) | Katalog 326 Guide DPD HPI NTB (36 Female, 290 Male, 14 Bahasa/Spesialisasi, jaminan privasi tanpa no WA pribadi) + Form Preferensi Guide & Single-Gate WhatsApp Booking Admin LOTTA. | `done` |
| **M6** | [`docs/plan/m6-polish-seo-and-audit.md`](./plan/m6-polish-seo-and-audit.md) | SEO Trilingual & OpenGraph, Print stylesheet, audit aturan mutlak (`Zero Icons/Emojis`, `Zero Sidebar`, `Golden Ratio`), `antislop` Delivery Gate, dan kesiapan deploy Vercel. | `done` |
| **M7** | [`docs/plan/m7-multipage-and-expanded-catalog.md`](./plan/m7-multipage-and-expanded-catalog.md) | Arsitektur Multi-Page (`/`, `/stories`, `/explore`, `/weather`, `/guides`), perbaikan bar zona cuaca tanpa terpotong, 12 Katalog Cerita Lokal, dan 24 Destinasi eksplisit dengan nama lengkap tanpa label teknis kaku. | `done` |
