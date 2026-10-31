import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice, Lang, PACKAGES } from "@/data/lotta-content";
import { JsonLd } from "@/components/JsonLd";
import {
  ORGANIZATION_ID,
  pageMeta,
  shortTitle,
  SITE_URL,
  truncate,
} from "@/lib/seo";
import { PackageDetailView } from "@/app/explore/[id]/PackageDetailView";

export function generateStaticParams() {
  return ["en", "it"].flatMap((lang) =>
    PACKAGES.map((pkg) => ({
      lang,
      id: pkg.id,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, id } = await params;
  if (rawLang !== "en" && rawLang !== "it") return {};
  const lang = rawLang as Lang;
  const pkg = PACKAGES.find((p) => p.id === id);
  if (!pkg) return {};

  const prefix =
    lang === "it"
      ? `${formatPrice(pkg.priceIdr, "it")} a persona, all-inclusive.`
      : `${formatPrice(pkg.priceIdr, "en")} per person, all-inclusive.`;

  return pageMeta({
    title: shortTitle(pkg.title[lang]),
    description: truncate(`${prefix} ${pkg.desc[lang]}`),
    path: `/${lang}/explore/${pkg.id}`,
    lang,
    image: { url: pkg.image, alt: pkg.title[lang] },
  });
}

export default async function LocalizedPackageDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang: rawLang, id } = await params;
  if (rawLang !== "en" && rawLang !== "it") {
    notFound();
  }
  const lang = rawLang as Lang;
  const pkg = PACKAGES.find((p) => p.id === id);

  if (!pkg) {
    notFound();
  }

  const url = `${SITE_URL}/${lang}/explore/${pkg.id}`;
  const homeTitle = lang === "it" ? "Home" : "Home";
  const exploreTitle =
    lang === "it" ? "Esplora Destinazioni" : "Explore Destinations";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristTrip",
        "@id": `${url}#trip`,
        name: pkg.title[lang],
        description: pkg.desc[lang],
        image: pkg.image,
        url,
        inLanguage: lang,
        provider: { "@id": ORGANIZATION_ID },
        offers: {
          "@type": "Offer",
          url,
          price: pkg.priceIdr,
          priceCurrency: "IDR",
          description:
            lang === "it"
              ? "Prezzo a persona, all-inclusive"
              : "Price per person, all-inclusive",
          seller: { "@id": ORGANIZATION_ID },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: homeTitle,
            item: `${SITE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: exploreTitle,
            item: `${SITE_URL}/${lang}/explore`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: pkg.title[lang],
            item: url,
          },
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
