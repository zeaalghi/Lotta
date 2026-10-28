---
trigger: always_on
description: Protokol utama Vibe Coding berbasis Build Spec, Milestone Plan (M0-Mn), Vertical Slices, dan Gate Check.
---

# Vibe Coding Execution Rule

Setiap kali user meminta pembuatan fitur, modul, atau project baru di workspace ini:

1. **Fase 1 — Spec & Open Questions**:
   - Periksa apakah kebutuhan sudah tertulis jelas di `docs/build-spec.md`.
   - Jika masih ada ambiguitas arsitektur/bisnis, tuliskan pertanyaannya di `docs/open-questions.md` dan tanyakan ke user.

2. **Fase 2 — Milestone & Slice Planning (`docs/plan/mX-*.md`)**:
   - Buat atau perbarui dokumen rencana di `docs/plan/mX-<slug>.md`.
   - Wajib memuat:
     - **Spec & Scope Summary**
     - **Tabel Slices** (`M2a`, `M2b`, `M2c`, ...)
     - **Schema Plan** (Prisma `snake_case`, indeks, relasi)
     - **Confirmed Decisions** (`C1`, `C2`, ...)
     - **Implementation Notes**
   - **STOP** setelah membuat/mengupdate plan dan minta user me-review & mengonfirmasi plan tersebut sebelum mengeksekusi kode.

3. **Fase 3 — Slice Execution & Gate Check**:
   - Setelah user mengonfirmasi plan, kerjakan satu slice pada satu waktu.
   - Setelah slice selesai, jalankan gate check (`lint`, `typecheck`, `unit`, `build`, `e2e`) dan laporkan hasilnya secara ringkas.
