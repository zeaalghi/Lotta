import React from "react";
import { notFound } from "next/navigation";
import { PACKAGES } from "@/data/lotta-content";
import { PackageDetailView } from "./PackageDetailView";

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    id: pkg.id,
  }));
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = PACKAGES.find((p) => p.id === id);

  if (!pkg) {
    notFound();
  }

  return <PackageDetailView packageId={pkg.id} />;
}
