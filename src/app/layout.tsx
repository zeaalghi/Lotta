import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LottaShell } from "@/components/LottaShell";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "LOTTA — Beyond the Horizon of Lombok: Living Heritage, Untold Stories.",
  description:
    "Informative & Persuasive Lombok Tourism Platform: Local Destination Stories, Rinjani 7 Summits & Overnight Hills, Regency Beaches, Cultural Heritage & 326 Licensed Multilingual Guides.",
  openGraph: {
    title: "LOTTA — Beyond the Horizon of Lombok: Living Heritage, Untold Stories.",
    description:
      "Explore Lombok's complete Mountain, Beach, and Cultural Heritage destinations, monitor live Rinjani summit weather & coastal swells, and connect with 326 certified LOTTA Guides.",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US", "it_IT"],
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
