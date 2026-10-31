import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Lang } from "@/data/lotta-content";
import { pageMeta } from "@/lib/seo";
import { ROUTE_I18N_METADATA } from "@/lib/i18n-metadata";
import StoriesPage from "@/app/stories/page";

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
  const meta = ROUTE_I18N_METADATA.stories[lang];

  return pageMeta({
    title: meta.title,
    description: meta.description,
    path: `/${lang}/stories`,
    lang,
  });
}

export default async function LocalizedStoriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "it") {
    notFound();
  }

  return <StoriesPage />;
}
