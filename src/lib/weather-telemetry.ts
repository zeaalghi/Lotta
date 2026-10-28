import type { Lang } from "@/data/lotta-content";

export interface WeatherZoneTelemetry {
  temp: string;
  wind: string;
  humidity: string;
  visibility: string;
  wave: string;
  status: Record<Lang, string>;
  recommendation: Record<Lang, string>;
}

export interface WeatherTelemetryResponse {
  updatedAt: string;
  zones: {
    summit: WeatherZoneTelemetry;
    south: WeatherZoneTelemetry;
    gili: WeatherZoneTelemetry;
  };
}

export const FALLBACK_WEATHER_TELEMETRY: WeatherTelemetryResponse = {
  updatedAt: "2026-10-27T08:00:00.000Z",
  zones: {
    summit: {
      temp: "9°C – 14°C",
      wind: "16 km/h ESE",
      humidity: "68%",
      visibility: "92% Clear",
      wave: "Elevasi 3.726 mdpl (Jalur Kering & Stabil)",
      status: {
        id: "JALUR BUKA • CERAH BERAWAN",
        en: "TRAIL OPEN • PARTLY CLEAR",
        it: "SENTIERO APERTO • SERENO",
      },
      recommendation: {
        id: "Kondisi ideal untuk pendakian menginap Puncak Rinjani 3.726m, Danau Segara Anak, Bukit Pergasingan, Sempana, Anak Dara, Nanggi, Kondo, Bao Ritip & Dandaun. Siapkan jaket windproof dan lapisan termal untuk malam hari di camp.",
        en: "Ideal conditions for overnight camping on Mount Rinjani 3,726m, Segara Anak Lake, Pergasingan, Sempana, Anak Dara, Nanggi, Kondo, Bao Ritip & Dandaun. Pack a windproof shell and thermal layers for camp nights.",
        it: "Condizioni ideali per il campeggio notturno su Rinjani 3.726m, Segara Anak, Pergasingan e le 7 vette di Sembalun. Portare giacca antivento e strati termici.",
      },
    },
    south: {
      temp: "28°C – 31°C",
      wind: "8 Knots Offshore",
      humidity: "74%",
      visibility: "18 km",
      wave: "Swell 1.4m • Period 12s (Ideal Surf & Cove)",
      status: {
        id: "IDEAL SURF & TELUK TENANG",
        en: "IDEAL SURF & CALM COVES",
        it: "SURF IDEALE E BAIE CALME",
      },
      recommendation: {
        id: "Angin offshore pagi sangat bersahabat untuk berselancar di Selong Belanak, Mawi & Are Guling, berenang santai di teluk Mawun & Tanjung Aan, serta menikmati sunset di Bukit Merese.",
        en: "Morning offshore winds are prime for surfing Selong Belanak, Mawi & Are Guling, swimming in Mawun & Tanjung Aan coves, and watching sunset on Merese Hill.",
        it: "Venti offshore mattutini ideali per il surf a Selong Belanak, il nuoto a Mawun e Tanjung Aan e il tramonto su Bukit Merese.",
      },
    },
    gili: {
      temp: "29°C (Air Laut 28.5°C)",
      wind: "6 Knots NE",
      humidity: "72%",
      visibility: "23 Meter Bawah Air",
      wave: "Gelombang 0.3m (Laguna Tenang)",
      status: {
        id: "LAGUNA TENANG • SNORKELING OPTIMAL",
        en: "CALM LAGOON • OPTIMAL SNORKELING",
        it: "LAGUNA CALMA • SNORKELING OTTIMALE",
      },
      recommendation: {
        id: "Perairan tenang dan jernih untuk penyeberangan pulau serta snorkeling di Gili Trawangan, Gili Meno, Gili Air, Gili Nanggu, Gili Sudak, Gili Kedis, Pantai Pink Tangsi & Gili Kondo.",
        en: "Calm, crystal-clear waters for island hopping and snorkeling across Gili Trawangan, Gili Meno, Gili Air, Gili Nanggu, Gili Sudak, Gili Kedis, Pink Beach Tangsi & Gili Kondo.",
        it: "Acque calme e cristalline per lo snorkeling a Gili Trawangan, Meno, Air, Gili Nanggu, Pink Beach Tangsi e Gili Kondo.",
      },
    },
  },
};

export function localizeWeatherMetric(metric: string, lang: Lang): string {
  if (!metric) return "";
  let res = metric;
  if (lang === "en") {
    res = res
      .replace(/Air Laut/gi, "Sea Water")
      .replace(/Meter Bawah Air/gi, "m Underwater")
      .replace(/Gelombang\s+([\d.]+m)\s+\(Laguna Tenang\)/gi, "Wave $1 (Calm Lagoon)")
      .replace(/Gelombang/gi, "Wave")
      .replace(/Elevasi\s+([\d.]+)\s+mdpl\s+\(Jalur Kering & Stabil\)/gi, "Elevation $1m ASL (Dry & Stable Trail)")
      .replace(/mdpl/gi, "m ASL")
      .replace(/Jalur Kering & Stabil/gi, "Dry & Stable Trail")
      .replace(/Laguna Tenang/gi, "Calm Lagoon");
  } else if (lang === "it") {
    res = res
      .replace(/Air Laut/gi, "Acqua di Mare")
      .replace(/Meter Bawah Air/gi, "m Sott'acqua")
      .replace(/Gelombang\s+([\d.]+m)\s+\(Laguna Tenang\)/gi, "Onde $1 (Laguna Calma)")
      .replace(/Gelombang/gi, "Onde")
      .replace(/Elevasi\s+([\d.]+)\s+mdpl\s+\(Jalur Kering & Stabil\)/gi, "Altitudine $1m (Sentiero Stabile)")
      .replace(/mdpl/gi, "m s.l.m.")
      .replace(/Jalur Kering & Stabil/gi, "Sentiero Stabile")
      .replace(/Laguna Tenang/gi, "Laguna Calma")
      .replace(/Period /gi, "Periodo ")
      .replace(/Ideal Surf & Cove/gi, "Surf e Baie Ideali")
      .replace(/Clear/gi, "Sereno");
  } else {
    // Indonesian
    res = res
      .replace(/Period /gi, "Periode ")
      .replace(/Ideal Surf & Cove/gi, "Teluk & Ombak Ideal")
      .replace(/Clear/gi, "Cerah");
  }
  return res;
}
