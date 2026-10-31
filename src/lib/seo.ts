import type { Metadata } from "next";
import type { Lang } from "@/data/lotta-content";

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

export const DEFAULT_TITLE: Record<Lang, string> = {
  id: "LOTTA Tour & Travel Lombok | Paket Wisata & Pemandu Lokal",
  en: "LOTTA Lombok Tour & Travel | Private Tours & Licensed Guides",
  it: "LOTTA Tour Lombok | Escursioni Private & Guide Locali Ufficiali",
};

export const DEFAULT_DESCRIPTION: Record<Lang, string> = {
  id: "Paket wisata Lombok dengan pemandu lokal berlisensi HPI NTB: Rinjani & Sembalun, Gili, pantai selatan, dan desa adat Sasak. Harga all-in transparan per pax, private trip.",
  en: "Lombok private tours with licensed HPI guides: Mount Rinjani trekking, secret Gili snorkeling, south coast beaches & Sasak villages. All-in transparent pricing per pax.",
  it: "Tour privati a Lombok con guide locali con licenza HPI: trekking Rinjani, snorkeling nelle isole Gili, spiagge del sud e villaggi Sasak. Prezzo all-inclusive trasparente.",
};

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

/** Detects language from a URL pathname. Defaults to "id" for root/unprefixed routes. */
export function getLangFromPathname(pathname: string | null): Lang {
  if (!pathname) return "id";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it";
  return "id";
}

/** Strips language prefix from a pathname. E.g. "/en/explore" -> "/explore", "/it" -> "/". */
export function stripLangPrefix(pathname: string): string {
  const unlocalized = pathname.replace(/^\/(?:en|it|id)(?:\/|$)/, "/");
  return unlocalized.startsWith("/") ? unlocalized : `/${unlocalized}`;
}

/** Converts an unlocalized or localized path into a localized target path. */
export function localizedPath(path: string, lang: Lang): string {
  const clean = stripLangPrefix(path);
  if (lang === "id") return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Seamlessly switches an active pathname to a target language. */
export function switchLanguagePath(currentPath: string, targetLang: Lang): string {
  return localizedPath(currentPath, targetLang);
}

/**
 * Generates bidirectional hreflang alternates (id, en, it, and x-default).
 * Google International SEO requirement for multilingual indexing.
 */
export function buildHreflangAlternates(path: string) {
  const clean = stripLangPrefix(path);
  const basePath = clean === "/" ? "" : clean;

  return {
    canonical: path,
    languages: {
      id: `${SITE_URL}${clean}`,
      en: `${SITE_URL}/en${basePath}`,
      it: `${SITE_URL}/it${basePath}`,
      "x-default": `${SITE_URL}${clean}`,
    },
  };
}

/** Per-route metadata with bidirectional hreflang and localized OpenGraph. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  lang?: Lang;
  image?: { url: string; width?: number; height?: number; alt?: string };
}): Metadata {
  const lang = opts.lang ?? getLangFromPathname(opts.path);
  const image = opts.image ?? OG_IMAGE;
  const alternates = buildHreflangAlternates(opts.path);

  const ogLocaleMap: Record<Lang, string> = {
    id: "id_ID",
    en: "en_US",
    it: "it_IT",
  };

  const alternateLocalesMap: Record<Lang, string[]> = {
    id: ["en_US", "it_IT"],
    en: ["id_ID", "it_IT"],
    it: ["id_ID", "en_US"],
  };

  return {
    title: opts.title,
    description: opts.description,
    alternates,
    openGraph: {
      title: `${opts.title} | ${SITE_NAME}`,
      description: opts.description,
      url: opts.path,
      siteName: SITE_NAME,
      type: "website",
      locale: ogLocaleMap[lang],
      alternateLocale: alternateLocalesMap[lang],
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
