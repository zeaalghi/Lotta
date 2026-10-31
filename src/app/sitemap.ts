import type { MetadataRoute } from "next";
import { PACKAGES } from "@/data/lotta-content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticBasePaths = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/explore", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/guides", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/stories", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/weather", priority: 0.5, changeFrequency: "daily" as const },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticBasePaths.flatMap(
    ({ path, priority, changeFrequency }) => {
      const languages = {
        id: `${SITE_URL}${path || "/"}`,
        en: `${SITE_URL}/en${path}`,
        it: `${SITE_URL}/it${path}`,
        "x-default": `${SITE_URL}${path || "/"}`,
      };

      return [
        {
          url: languages.id,
          lastModified: now,
          changeFrequency,
          priority,
          alternates: { languages },
        },
        {
          url: languages.en,
          lastModified: now,
          changeFrequency,
          priority,
          alternates: { languages },
        },
        {
          url: languages.it,
          lastModified: now,
          changeFrequency,
          priority,
          alternates: { languages },
        },
      ];
    }
  );

  const packageRoutes: MetadataRoute.Sitemap = PACKAGES.flatMap((pkg) => {
    const priority = pkg.isBestSeller ? 0.9 : 0.7;
    const languages = {
      id: `${SITE_URL}/explore/${pkg.id}`,
      en: `${SITE_URL}/en/explore/${pkg.id}`,
      it: `${SITE_URL}/it/explore/${pkg.id}`,
      "x-default": `${SITE_URL}/explore/${pkg.id}`,
    };

    return [
      {
        url: languages.id,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: languages.en,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: languages.it,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
    ];
  });

  return [...staticRoutes, ...packageRoutes];
}
