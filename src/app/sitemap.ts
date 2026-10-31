import type { MetadataRoute } from "next";
import { PACKAGES } from "@/data/lotta-content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/explore", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/guides", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/stories", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/weather", priority: 0.5, changeFrequency: "daily" as const },
    { path: "/faq", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const packageRoutes: MetadataRoute.Sitemap = PACKAGES.map((pkg) => ({
    url: `${SITE_URL}/explore/${pkg.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: pkg.isBestSeller ? 0.9 : 0.7,
  }));

  return [...staticRoutes, ...packageRoutes];
}
