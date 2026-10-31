import { describe, it, expect } from "vitest";
import {
  buildHreflangAlternates,
  getLangFromPathname,
  localizedPath,
  pageMeta,
  SITE_URL,
  stripLangPrefix,
  switchLanguagePath,
} from "@/lib/seo";
import { ROUTE_I18N_METADATA } from "@/lib/i18n-metadata";
import sitemap from "@/app/sitemap";

describe("Multilingual SEO (ID, EN, IT) — URL routing, alternates, sitemap & metadata", () => {
  it("correctly identifies language from URL pathname", () => {
    expect(getLangFromPathname("/")).toBe("id");
    expect(getLangFromPathname("/explore")).toBe("id");
    expect(getLangFromPathname("/explore/pkg-7-summits")).toBe("id");

    expect(getLangFromPathname("/en")).toBe("en");
    expect(getLangFromPathname("/en/explore")).toBe("en");
    expect(getLangFromPathname("/en/explore/pkg-7-summits")).toBe("en");

    expect(getLangFromPathname("/it")).toBe("it");
    expect(getLangFromPathname("/it/explore")).toBe("it");
    expect(getLangFromPathname("/it/weather")).toBe("it");
  });

  it("correctly strips language prefixes and resolves localized paths", () => {
    expect(stripLangPrefix("/en/explore")).toBe("/explore");
    expect(stripLangPrefix("/it/weather")).toBe("/weather");
    expect(stripLangPrefix("/en")).toBe("/");
    expect(stripLangPrefix("/it")).toBe("/");
    expect(stripLangPrefix("/")).toBe("/");
    expect(stripLangPrefix("/explore")).toBe("/explore");

    expect(localizedPath("/explore", "id")).toBe("/explore");
    expect(localizedPath("/explore", "en")).toBe("/en/explore");
    expect(localizedPath("/explore", "it")).toBe("/it/explore");
    expect(localizedPath("/", "en")).toBe("/en");
    expect(localizedPath("/", "it")).toBe("/it");
    expect(localizedPath("/", "id")).toBe("/");
  });

  it("switches languages cleanly between ID, EN, and IT", () => {
    expect(switchLanguagePath("/explore", "en")).toBe("/en/explore");
    expect(switchLanguagePath("/en/explore", "it")).toBe("/it/explore");
    expect(switchLanguagePath("/it/explore", "id")).toBe("/explore");
    expect(switchLanguagePath("/it/explore/pkg-gili-nanggu", "en")).toBe(
      "/en/explore/pkg-gili-nanggu"
    );
    expect(switchLanguagePath("/en/explore/pkg-gili-nanggu", "id")).toBe(
      "/explore/pkg-gili-nanggu"
    );
    expect(switchLanguagePath("/en", "id")).toBe("/");
    expect(switchLanguagePath("/", "it")).toBe("/it");
  });

  it("generates complete bidirectional hreflang alternates for Google indexing", () => {
    const alternates = buildHreflangAlternates("/en/explore");
    expect(alternates.canonical).toBe("/en/explore");
    expect(alternates.languages.id).toBe(`${SITE_URL}/explore`);
    expect(alternates.languages.en).toBe(`${SITE_URL}/en/explore`);
    expect(alternates.languages.it).toBe(`${SITE_URL}/it/explore`);
    expect(alternates.languages["x-default"]).toBe(`${SITE_URL}/explore`);
  });

  it("pageMeta generates localized OpenGraph locales", () => {
    const enMeta = pageMeta({
      title: "Test English",
      description: "Test Desc",
      path: "/en/explore",
      lang: "en",
    });
    expect(enMeta.openGraph?.locale).toBe("en_US");
    expect(enMeta.openGraph?.alternateLocale).toEqual(["id_ID", "it_IT"]);

    const itMeta = pageMeta({
      title: "Test Italiano",
      description: "Test Desc",
      path: "/it/explore",
      lang: "it",
    });
    expect(itMeta.openGraph?.locale).toBe("it_IT");
    expect(itMeta.openGraph?.alternateLocale).toEqual(["id_ID", "en_US"]);

    const idMeta = pageMeta({
      title: "Test Indonesia",
      description: "Test Desc",
      path: "/explore",
      lang: "id",
    });
    expect(idMeta.openGraph?.locale).toBe("id_ID");
    expect(idMeta.openGraph?.alternateLocale).toEqual(["en_US", "it_IT"]);
  });

  it("ROUTE_I18N_METADATA provides complete metadata for all 8 core static routes in 3 languages", () => {
    const routes = [
      "home",
      "explore",
      "guides",
      "stories",
      "weather",
      "faq",
      "terms",
      "privacy",
    ];

    for (const route of routes) {
      expect(ROUTE_I18N_METADATA[route]).toBeDefined();
      for (const lang of ["id", "en", "it"] as const) {
        const item = ROUTE_I18N_METADATA[route][lang];
        expect(item.title.length).toBeGreaterThan(5);
        expect(item.description.length).toBeGreaterThan(15);
      }
    }
  });

  it("sitemap contains entries for all 3 languages (ID, EN, IT) with full hreflang alternates", () => {
    const map = sitemap();
    // 8 static routes * 3 languages = 24
    // 24 packages * 3 languages = 72
    // Total = 96
    expect(map.length).toBe(96);

    const enHome = map.find((m) => m.url === `${SITE_URL}/en`);
    expect(enHome).toBeDefined();
    expect(enHome?.alternates?.languages?.id).toBe(`${SITE_URL}/`);
    expect(enHome?.alternates?.languages?.en).toBe(`${SITE_URL}/en`);
    expect(enHome?.alternates?.languages?.it).toBe(`${SITE_URL}/it`);
    expect(enHome?.alternates?.languages?.["x-default"]).toBe(`${SITE_URL}/`);

    const itPkg = map.find(
      (m) => m.url === `${SITE_URL}/it/explore/pkg-secret-gili-sekotong`
    );
    expect(itPkg).toBeDefined();
    expect(itPkg?.alternates?.languages?.id).toBe(
      `${SITE_URL}/explore/pkg-secret-gili-sekotong`
    );
    expect(itPkg?.alternates?.languages?.en).toBe(
      `${SITE_URL}/en/explore/pkg-secret-gili-sekotong`
    );
    expect(itPkg?.alternates?.languages?.it).toBe(
      `${SITE_URL}/it/explore/pkg-secret-gili-sekotong`
    );
  });
});
