import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LottaShell } from "@/components/LottaShell";
import { JsonLd } from "@/components/JsonLd";
import {
  buildHreflangAlternates,
  BUSINESS,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  ORGANIZATION_ID,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A3A26",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE.id,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION.id,
  applicationName: SITE_NAME,
  alternates: buildHreflangAlternates("/"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: DEFAULT_TITLE.id,
    description: DEFAULT_DESCRIPTION.id,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US", "it_IT"],
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE.id,
    description: DEFAULT_DESCRIPTION.id,
    images: [OG_IMAGE.url],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": ORGANIZATION_ID,
      name: BUSINESS.name,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION.id,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}${OG_IMAGE.url}`,
      telephone: BUSINESS.telephone,
      address: {
        "@type": "PostalAddress",
        ...BUSINESS.address,
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Lombok, Nusa Tenggara Barat, Indonesia",
      },
      knowsLanguage: ["id", "en", "it"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["id", "en", "it"],
      publisher: { "@id": ORGANIZATION_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-forest-canvas text-forest-header min-h-screen antialiased pb-20 md:pb-0 selection:bg-forest-sage selection:text-forest-header">
        <JsonLd data={structuredData} />
        <LottaShell>{children}</LottaShell>
      </body>
    </html>
  );
}
