import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Cuaca Rinjani & Ombak Pantai Lombok Real-Time",
  description:
    "Pantau cuaca puncak Rinjani, kondisi pantai selatan Lombok Tengah, dan perairan Gili secara real-time sebelum menentukan jadwal trip Anda.",
  path: "/weather",
});

export default function WeatherLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
