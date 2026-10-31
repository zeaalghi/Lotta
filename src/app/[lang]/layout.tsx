import React from "react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "it" }];
}

export default async function LocalizedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "it") {
    notFound();
  }

  return <>{children}</>;
}
