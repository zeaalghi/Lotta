import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan layanan LOTTA Tour & Travel: pemesanan, deposit 30%, kebijakan cuaca ekstrem, fasilitas, dan keselamatan trip.",
  path: "/terms",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
