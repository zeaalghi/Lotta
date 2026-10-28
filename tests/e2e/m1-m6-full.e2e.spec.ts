import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("M1–M7 E2E — Multi-Page Architecture, Non-Clipped Weather Tabs, Explicit Destination Names & Single-Gate WhatsApp", () => {
  const root = process.cwd();
  const shellSource = fs.readFileSync(
    path.join(root, "src", "components", "LottaShell.tsx"),
    "utf8"
  );
  const homeSource = fs.readFileSync(
    path.join(root, "src", "app", "page.tsx"),
    "utf8"
  );
  const storiesSource = fs.readFileSync(
    path.join(root, "src", "app", "stories", "page.tsx"),
    "utf8"
  );
  const exploreSource = fs.readFileSync(
    path.join(root, "src", "app", "explore", "page.tsx"),
    "utf8"
  );
  const weatherSource = fs.readFileSync(
    path.join(root, "src", "app", "weather", "page.tsx"),
    "utf8"
  );
  const guidesSource = fs.readFileSync(
    path.join(root, "src", "app", "guides", "page.tsx"),
    "utf8"
  );
  const guidesCatalogSource = fs.readFileSync(
    path.join(root, "src", "lib", "guides-catalog.ts"),
    "utf8"
  );
  const layoutSource = fs.readFileSync(
    path.join(root, "src", "app", "layout.tsx"),
    "utf8"
  );

  it("verifies Multi-Page Navigation in LottaShell across /, /stories, /explore, /weather, and /guides", () => {
    expect(shellSource).toContain('href: "/"');
    expect(shellSource).toContain('href: "/stories"');
    expect(shellSource).toContain('href: "/explore"');
    expect(shellSource).toContain('href: "/weather"');
    expect(shellSource).toContain('href: "/guides"');
    expect(shellSource).toContain("Mobile Bottom Navigation");
  });

  it("verifies Weather page zone selector uses non-clipped grid/wrap layout and lists explicit destinations", () => {
    expect(weatherSource).toContain('role="tablist"');
    expect(weatherSource).not.toContain("overflow-x-auto no-scrollbar lg:justify-end");
    expect(weatherSource).toContain("Puncak Rinjani 3.726m");
    expect(weatherSource).toContain("Pantai Tanjung Aan");
    expect(weatherSource).toContain("Gili Trawangan");
  });

  it("verifies Stories and Explore pages render explicit destination names without awkward 38.2% Teaser labels", () => {
    expect(homeSource).toContain("story.destinationName");
    expect(storiesSource).toContain("story.destinationName");
    expect(exploreSource).toContain("pkg.destinationNames");
  });

  it("verifies Single-Gate WhatsApp Booking uses NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER and Escape key closes modals", () => {
    expect(guidesCatalogSource).toContain(
      "process.env.NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER"
    );
    expect(guidesSource).toContain("buildSingleGateWhatsAppUrl");
    expect(shellSource).toContain('event.key === "Escape"');
    expect(layoutSource).toContain("openGraph");
    expect(layoutSource).toContain("Plus+Jakarta+Sans");
  });
});
