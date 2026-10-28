import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  UI_TEXT,
  STORY_TRAILERS,
  SUBCATEGORIES,
  PACKAGES,
  SPECIALTY_OPTIONS,
  findPackage,
} from "@/data/lotta-content";
import { GET as getWeather } from "@/app/api/weather/route";

interface PublicGuide {
  id: number;
  name: string;
  gender: "female" | "male";
  specialties: string[];
}

describe("M1–M7 — Trilingual Content, 12 Story Catalog, 24 Explicit Destinations, Weather API & 326 Guides", () => {
  const root = process.cwd();
  const guides: PublicGuide[] = JSON.parse(
    fs.readFileSync(path.join(root, "src", "data", "guides.json"), "utf8")
  );

  it("M1: provides complete Trilingual (ID, EN, IT) UI dictionary keys", () => {
    const idKeys = Object.keys(UI_TEXT.id);
    const enKeys = Object.keys(UI_TEXT.en);
    const itKeys = Object.keys(UI_TEXT.it);
    expect(idKeys.length).toBeGreaterThan(25);
    expect(enKeys).toEqual(idKeys);
    expect(itKeys).toEqual(idKeys);
  });

  it("M2 & M7: provides 12 rich local stories with explicit destinationName in ID/EN/IT", () => {
    expect(STORY_TRAILERS.length).toBe(12);
    for (const trailer of STORY_TRAILERS) {
      expect(trailer.destinationName.length).toBeGreaterThan(5);
      for (const lang of ["id", "en", "it"] as const) {
        expect(trailer.title[lang].length).toBeGreaterThan(10);
        expect(trailer.summary38[lang].length).toBeGreaterThan(20);
        expect(trailer.hook38Full[lang].length).toBeGreaterThan(40);
        expect(trailer.locked62Clue[lang].length).toBeGreaterThan(20);
      }
    }
  });

  it("M3 & M7: provides 24 explicit destinations (8 Mountain Overnight, 8 Beach by Regency, 8 Heritage by Regency)", () => {
    expect(PACKAGES.length).toBe(24);
    const mountainPkgs = PACKAGES.filter((p) => p.pillar === "mountain");
    const beachPkgs = PACKAGES.filter((p) => p.pillar === "beach");
    const heritagePkgs = PACKAGES.filter((p) => p.pillar === "heritage");

    expect(mountainPkgs.length).toBe(8);
    expect(beachPkgs.length).toBe(8);
    expect(heritagePkgs.length).toBe(8);

    // Every mountain package must be overnight / camping (zero day-hike/tek-tok)
    for (const mPkg of mountainPkgs) {
      expect(mPkg.destinationNames.length).toBeGreaterThan(5);
      expect(mPkg.duration.toLowerCase()).toMatch(
        /overnight|camping|2d1n|3d2n|4d3n/
      );
    }

    const expectedRegencies = [
      "lombok-tengah",
      "lombok-timur",
      "lombok-utara",
      "lombok-barat",
    ];
    expect(SUBCATEGORIES.beach.slice(1).map((s) => s.id)).toEqual(
      expectedRegencies
    );
  });

  it("M4: returns valid 3-zone telemetry from GET /api/weather", async () => {
    const res = await getWeather();
    expect(res.status).toBe(200);
    const payload = await res.json();
    expect(payload).toHaveProperty("summit");
    expect(payload).toHaveProperty("southCoast");
    expect(payload).toHaveProperty("giliWaters");
    expect(payload).toHaveProperty("zones");
    expect(payload.summit.status).toBe("OPEN");
    expect(payload.southCoast.status).toBe("IDEAL SURF & COVE");
    expect(payload.giliWaters.status).toBe("CALM LAGOON");
  });

  it("M5: matches exact specialty counts across the 326 DPD HPI NTB Guides", () => {
    expect(SPECIALTY_OPTIONS.length).toBe(15); // "All" + 14 Specialties
    const counts: Record<string, number> = {};
    for (const g of guides) {
      for (const s of g.specialties) {
        counts[s] = (counts[s] ?? 0) + 1;
      }
    }
    expect(counts["English Guide"]).toBe(275);
    expect(counts["Indonesian Guide"]).toBe(47);
    expect(counts["Komodo Adventure and Sailing Guide"]).toBe(40);
    expect(counts["Malay Guide"]).toBe(23);
    expect(counts["Italian Guide"]).toBe(20);
    expect(counts["German Guide"]).toBe(18);
    expect(counts["Arabic Guide"]).toBe(13);
    expect(counts["Korean Guide"]).toBe(8);
    expect(counts["Mandarin Guide"]).toBe(7);
    expect(counts["Spanish Guide"]).toBe(7);
    expect(counts["French Guide"]).toBe(6);
    expect(counts["Japanese Guide"]).toBe(6);
    expect(counts["Dutch Guide"]).toBe(3);
    expect(counts["Russian Guide"]).toBe(1);
  });

  it("M6: findPackage reliably matches Gili Meno, package IDs, and story titles", () => {
    // Exact Gili Meno matching test
    const giliByMeno = findPackage("Gili Meno");
    expect(giliByMeno.id).toBe("pkg-3-gili-utara");
    expect(giliByMeno.destinationNames).toContain("Gili Meno");

    const giliByStoryTitle = findPackage("Gili Trawangan, Gili Meno & Gili Air (Kab. Lombok Utara)");
    expect(giliByStoryTitle.id).toBe("pkg-3-gili-utara");

    const giliById = findPackage("pkg-3-gili-utara");
    expect(giliById.id).toBe("pkg-3-gili-utara");

    // Other destinations matching test
    expect(findPackage("Danau Segara Anak").id).toBe("pkg-explore-rinjani");
    expect(findPackage("Desa Adat Sade").id).toBe("pkg-desa-sade-ende");
    expect(findPackage("Pantai Pink").id).toBe("pkg-pink-beach-tangsi");
    expect(findPackage("Bukit Pergasingan").id).toBe("pkg-bukit-pergasingan");
    expect(findPackage("Pura Lingsar").id).toBe("pkg-pura-lingsar");
  });
});
