import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pemandu Wisata Lombok Berlisensi HPI",
  description:
    "Pilih pemandu wisata lokal Lombok berlisensi HPI NTB berdasarkan bahasa dan gender. Private trip dengan koordinasi resmi LOTTA, tanpa biaya tersembunyi.",
  path: "/guides",
});

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
