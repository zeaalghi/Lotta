import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FAQ: Pemesanan, Pemandu & Pembayaran",
  description:
    "Jawaban pertanyaan umum seputar pemesanan trip Lombok, lisensi pemandu HPI, DP 30%, private tour keluarga, dan kebijakan cuaca di LOTTA.",
  path: "/faq",
});

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
