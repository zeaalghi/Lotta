import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice, PACKAGES } from "@/data/lotta-content";
import { JsonLd } from "@/components/JsonLd";
import {
  ORGANIZATION_ID,
  pageMeta,
  shortTitle,
  SITE_URL,
  truncate,
} from "@/lib/seo";
import { PackageDetailView } from "./PackageDetailView";

export function generateStaticParams() {
  return PACKAGES.map((pkg) => ({
    id: pkg.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) return {};

  return pageMeta({
    title: shortTitle(pkg.title.id),
    description: truncate(
      `${formatPrice(pkg.priceIdr, "id")} per pax, all-in. ${pkg.desc.id}`
    ),
    path: `/explore/${pkg.id}`,
    image: { url: pkg.image, alt: pkg.title.id },
  });
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

  const url = `${SITE_URL}/explore/${pkg.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: pkg.title.id,
        description: pkg.desc.id,
        image: pkg.image,
        url,
        inLanguage: "id",
        provider: { "@id": ORGANIZATION_ID },
        offers: {
          "@type": "Offer",
          url,
          price: pkg.priceIdr,
          priceCurrency: "IDR",
          description: "Harga per pax, all-in",
          seller: { "@id": ORGANIZATION_ID },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Jelajahi Destinasi",
            item: `${SITE_URL}/explore`,
          },
          { "@type": "ListItem", position: 3, name: pkg.title.id, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <PackageDetailView packageId={pkg.id} />
    </>
  );
}
