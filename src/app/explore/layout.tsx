import React from "react";
import type { Metadata } from "next";
import { pageMeta, SITE_NAME } from "@/lib/seo";

const base = pageMeta({
  title: "Paket Wisata Lombok: 24 Destinasi Gunung, Pantai & Budaya Sasak",
  description:
    "Jelajahi 24 paket wisata Lombok: Rinjani & bukit Sembalun, Gili dan pantai selatan, serta desa adat Sasak. Harga all-in per pax dengan pemandu lokal berlisensi HPI.",
  path: "/explore",
});

/**
 * Next.js drops the inherited root title template when a layout sets a plain
 * string title, which would strip the " | LOTTA" suffix from /explore/[id].
 * Re-declaring the template here keeps package pages consistent.
 */
export const metadata: Metadata = {
  ...base,
  title: {
    default: "Paket Wisata Lombok: 24 Destinasi Gunung, Pantai & Budaya Sasak",
    template: `%s | ${SITE_NAME}`,
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
