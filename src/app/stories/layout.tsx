import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cerita Lokal & Legenda Destinasi Lombok",
  description:
    "Katalog cerita lokal dan legenda destinasi Lombok, dari Rinjani hingga desa adat Sasak. Cerita utuhnya dituturkan langsung oleh pemandu LOTTA di lokasi.",
  path: "/stories",
});

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
