# Open Questions (`docs/open-questions.md`)

> Seluruh pertanyaan terbuka kritis (`OQ-01` & `OQ-02`) telah dijawab oleh manusia dan dipindahkan ke [`docs/decisions.md`](./decisions.md) (`G11` & `G12`) serta [`docs/plan/m5-guides-catalog-and-booking.md`](./plan/m5-guides-catalog-and-booking.md).

---

## Pertanyaan yang Telah Dikonfirmasi (Resolved)

- **`[OQ-01]` Nomor WhatsApp Resmi Admin LOTTA (`RESOLVED -> G11`)**:
  - **Keputusan**: Menggunakan variabel environment `NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER` agar mudah diganti kapan saja di `.env.local` maupun dashboard Vercel.
- **`[OQ-02]` Mode Tampilan Katalog 326 Guide pada Bagian Booking (`RESOLVED -> G12`)**:
  - **Keputusan**: Menggabungkan **Form Simple Preference Picker** (default: *"Ditugaskan Otomatis oleh Tim LOTTA"*) dengan **Katalog Interaktif 326 Guide** (bisa difilter berdasarkan Gender `Female 36` / `Male 290` & 14 Bahasa/Spesialisasi, serta opsional memilih nama Guide tertentu).

---

## Pertanyaan Opsional Non-Blocker (`OQ-03`)

### `[OQ-03]` Kepanjangan Resmi Akronim "LOTTA" pada Footer / About
- **Konteks**: Di §1 disebutkan *"Akronim LOTTA memiliki arti khusus yang dapat disisipkan pada bagian About/Footer"*.
- **Default Saat Ini**: Menggunakan sub-judul resmi `LOTTA — Laut • Gunung • Heritage Lombok` dan tagline `“Beyond the Horizon of Lombok: Living Heritage, Untold Stories.”` sampai Anda memberikan teks kepanjangan akronim khusus jika ada.
