import React from "react";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi LOTTA Tour & Travel: data yang dikumpulkan, perlindungan data pemandu, dan komitmen tidak menjual data pribadi.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
