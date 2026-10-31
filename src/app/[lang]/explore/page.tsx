import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "@/data/lotta-content";
import { pageMeta, SITE_NAME } from "@/lib/seo";
import { ROUTE_I18N_METADATA } from "@/lib/i18n-metadata";
import ExplorePage from "@/app/explore/page";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "it" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (rawLang !== "en" && rawLang !== "it") return {};
  const lang = rawLang as Lang;
  const meta = ROUTE_I18N_METADATA.explore[lang];

  const base = pageMeta({
    title: meta.title,
    description: meta.description,
    path: `/${lang}/explore`,
    lang,
  });

  return {
    ...base,
    title: {
      default: meta.title,
      template: `%s | ${SITE_NAME}`,
    },
  };
}

export default async function LocalizedExplorePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "it") {
    notFound();
  }

  return <ExplorePage />;
}
