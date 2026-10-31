import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LottaShell } from "@/components/LottaShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lotta.id"),
  title: "LOTTA — Beyond the Horizon of Lombok: Living Heritage, Untold Stories.",
  description:
    "Lombok Tourism & Private Guides Platform: Living Heritage Stories, Rinjani Summits & Overnight Hills, Regency Beaches, and Certified Multilingual Local Hosts.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "LOTTA — Beyond the Horizon of Lombok: Living Heritage, Untold Stories.",
    description:
      "Explore Lombok's complete Mountain, Beach, and Cultural Heritage destinations, monitor live Rinjani summit weather & coastal swells, and travel with certified LOTTA local hosts.",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US", "it_IT"],
    images: [
      {
        url: "/lotta-logo-banner.png",
        width: 780,
        height: 280,
        alt: "LOTTA Tour & Travel",
      },
    ],
  },
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
        <LottaShell>{children}</LottaShell>
      </body>
    </html>
  );
}
