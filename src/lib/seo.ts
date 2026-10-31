import type { Metadata } from "next";

/**
 * Canonical site origin.
 * Priority: NEXT_PUBLIC_SITE_URL (custom domain) -> Vercel production URL -> localhost.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain is connected.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");
export const SITE_NAME = "LOTTA Tour & Travel";
export const DEFAULT_TITLE =
  "LOTTA Tour & Travel Lombok | Paket Wisata & Pemandu Lokal";
export const DEFAULT_DESCRIPTION =
  "Paket wisata Lombok dengan pemandu lokal berlisensi HPI NTB: Rinjani & Sembalun, Gili, pantai selatan, dan desa adat Sasak. Harga all-in transparan per pax, private trip.";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "LOTTA Tour & Travel - Paket Wisata & Pemandu Lokal Lombok",
};

export const BUSINESS = {
  name: SITE_NAME,
  telephone: "+6287728770032",
  address: {
    streetAddress: "Sintung",
    addressLocality: "Pringgarata, Lombok Tengah",
    addressRegion: "Nusa Tenggara Barat",
    postalCode: "83562",
    addressCountry: "ID",
  },
};

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

/** Truncate at a word boundary for meta descriptions (~155 chars). */
export function truncate(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:\s]+$/, "")}...`;
}

/**
 * Short, SERP-friendly title for a package: drops a trailing "(...)" group
 * (destination lists live in the description) and caps the length.
 */
export function shortTitle(title: string, max = 52): string {
  const base = title.replace(/\s*\([^()]*\)\s*$/, "").trim();
  const result = base.length >= 12 ? base : title.trim();
  if (result.length <= max) return result;
  const cut = result.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 30 ? cut.slice(0, lastSpace) : cut).replace(/[,&\s]+$/, "")}...`;
}

/** Per-route metadata. Child openGraph replaces the parent's, so images are repeated here. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width?: number; height?: number; alt?: string };
}): Metadata {
  const image = opts.image ?? OG_IMAGE;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      url: opts.path,
      siteName: SITE_NAME,
      type: "website",
      locale: "id_ID",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      images: [image.url],
    },
  };
}
