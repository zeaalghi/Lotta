import { NextResponse } from "next/server";
import { FALLBACK_WEATHER_TELEMETRY } from "@/lib/weather-telemetry";

export const revalidate = 1800; // Cache 30 minutes (ISR)

export async function GET() {
  try {
    const [rinjaniRes, southMarineRes, giliMarineRes] =
      await Promise.allSettled([
        fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-8.411&longitude=116.457&current=temperature_2m,wind_speed_10m,cloud_cover",
          { next: { revalidate: 1800 }, signal: AbortSignal.timeout(4000) }
        ),
        fetch(
          "https://marine-api.open-meteo.com/v1/marine?latitude=-8.912&longitude=116.285&current=wave_height,wave_period,wave_direction",
          { next: { revalidate: 1800 }, signal: AbortSignal.timeout(4000) }
        ),
        fetch(
          "https://marine-api.open-meteo.com/v1/marine?latitude=-8.352&longitude=116.046&current=wave_height,wave_period",
          { next: { revalidate: 1800 }, signal: AbortSignal.timeout(4000) }
        ),
      ]);

    let summitTemp = "9°C – 14°C";
    let summitWind = "16 km/h";
    let summitClear = "92% Clear";

    if (rinjaniRes.status === "fulfilled" && rinjaniRes.value.ok) {
      const data = await rinjaniRes.value.json();
      if (data?.current) {
        summitTemp = `${Math.round(data.current.temperature_2m ?? 11)}°C`;
        summitWind = `${Math.round(data.current.wind_speed_10m ?? 16)} km/h`;
        const clearPct = Math.max(
          15,
          100 - Math.round(data.current.cloud_cover ?? 10)
        );
        summitClear = `${clearPct}% Clear`;
      }
    }

    let southWave = "1.4m";
    let southPeriod = "12s";
    if (southMarineRes.status === "fulfilled" && southMarineRes.value.ok) {
      const data = await southMarineRes.value.json();
      if (data?.current) {
        southWave = `${Number(data.current.wave_height ?? 1.4).toFixed(1)}m`;
        southPeriod = `${Math.round(data.current.wave_period ?? 12)}s`;
      }
    }

    let giliWave = "0.3m";
    if (giliMarineRes.status === "fulfilled" && giliMarineRes.value.ok) {
      const data = await giliMarineRes.value.json();
      if (data?.current) {
        giliWave = `${Number(data.current.wave_height ?? 0.3).toFixed(1)}m`;
      }
    }

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      summit: {
        temp: summitTemp,
        wind: summitWind,
        skyClarity: summitClear,
        status: "OPEN",
      },
      southCoast: {
        waveHeight: southWave,
        wavePeriod: southPeriod,
        wind: "8 Knots Offshore",
        status: "IDEAL SURF & COVE",
      },
      giliWaters: {
        waveHeight: giliWave,
        visibility: "23 Meters",
        waterTemp: "28.5°C",
        status: "CALM LAGOON",
      },
      zones: {
        summit: {
          ...FALLBACK_WEATHER_TELEMETRY.zones.summit,
          temp: summitTemp,
          wind: summitWind,
          visibility: summitClear,
        },
        south: {
          ...FALLBACK_WEATHER_TELEMETRY.zones.south,
          wave: `Swell ${southWave} • Period ${southPeriod} (Ideal Surf & Cove)`,
        },
        gili: {
          ...FALLBACK_WEATHER_TELEMETRY.zones.gili,
          wave: `Gelombang ${giliWave} (Laguna Tenang)`,
        },
      },
    });
  } catch {
    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      summit: {
        temp: "8°C – 14°C",
        wind: "17 km/h",
        skyClarity: "94% Clear",
        status: "OPEN",
      },
      southCoast: {
        waveHeight: "1.4m",
        wavePeriod: "12s",
        wind: "8 Knots Offshore",
        status: "IDEAL SURF & COVE",
      },
      giliWaters: {
        waveHeight: "0.3m",
        visibility: "23 Meters",
        waterTemp: "28.5°C",
        status: "CALM LAGOON",
      },
      zones: FALLBACK_WEATHER_TELEMETRY.zones,
    });
  }
}
