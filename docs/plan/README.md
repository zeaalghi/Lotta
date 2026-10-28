# Milestone Execution Plans (`docs/plan/`)

Setiap file `mX-<slug>.md` di folder ini adalah kontrak kerja antara Developer (Manusia) dan AI Agent.

## Aturan Eksekusi Milestone

1. **AI Membuat Draft Plan Terlebih Dahulu**:
   Saat masuk ke milestone baru, AI membaca `docs/build-spec.md` dan menulis file `docs/plan/mX-<slug>.md` berisi:
   - Ringkasan Spec
   - Tabel pembagian Slice (`Mxa`, `Mxb`, `Mxc`, `Mxd`)
   - Rancangan Skema Prisma (`snake_case`)
   - `## Confirmed decisions` (`C1` s/d `Cn`)
   - `## Implementation notes`
2. **Manusia Membaca & Mengonfirmasi**:
   Manusia memeriksa setiap poin di file plan tersebut. AI **dilarang** mulai menulis kode fitur sebelum plan dikonfirmasi.
3. **Eksekusi Per Slice + Gate Check**:
   Setiap slice dikerjakan secara berurutan dan wajib lulus gate (`lint`, `typecheck`, `unit`, `build`, `e2e`) sebelum lanjut ke slice berikutnya.
