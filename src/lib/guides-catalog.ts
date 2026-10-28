import rawGuides from "@/data/guides.json";
import type { Lang } from "@/data/lotta-content";

interface RawGuideJson {
  id: number;
  name: string;
  gender: "female" | "male";
  specialties: string[];
}

export interface GuideRecord {
  id: string;
  name: string;
  gender: "Female" | "Male";
  specialty: string;
  specialties: string[];
}

export type GenderFilter = "all" | "Female" | "Male";

export const ALL_GUIDES: GuideRecord[] = (rawGuides as RawGuideJson[]).map(
  (g) => ({
    id: String(g.id),
    name: g.name,
    gender: g.gender === "female" ? "Female" : "Male",
    specialty: g.specialties.join(" • "),
    specialties: g.specialties,
  })
);

export function getSpecialtyCounts(
  guides: GuideRecord[] = ALL_GUIDES
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const g of guides) {
    for (const s of g.specialties) {
      counts[s] = (counts[s] || 0) + 1;
    }
  }
  return counts;
}

export function getGenderCounts(guides: GuideRecord[] = ALL_GUIDES): {
  Female: number;
  Male: number;
} {
  let Female = 0;
  let Male = 0;
  for (const g of guides) {
    if (g.gender === "Female") Female += 1;
    else Male += 1;
  }
  return { Female, Male };
}

export function filterGuides(
  guides: GuideRecord[],
  options: {
    gender: GenderFilter;
    specialty: string;
    searchQuery: string;
  }
): GuideRecord[] {
  const q = options.searchQuery.trim().toLowerCase();
  return guides.filter((g) => {
    if (options.gender !== "all" && g.gender !== options.gender) {
      return false;
    }
    if (
      options.specialty !== "All Languages / Specialties" &&
      !g.specialties.includes(options.specialty)
    ) {
      return false;
    }
    if (q.length > 0 && !g.name.toLowerCase().includes(q)) {
      return false;
    }
    return true;
  });
}

function sanitizeText(input: string, maxLen = 160): string {
  return input.replace(/[\r\n<>]/g, " ").trim().slice(0, maxLen);
}

export function buildSingleGateWhatsAppUrl(params: {
  lang: Lang;
  selectedRoute: string;
  genderFilter: GenderFilter;
  specialtyFilter: string;
  selectedGuide: GuideRecord | null;
  tripDate?: string;
  adults?: number;
  children?: number;
  pickupLocation?: string;
  totalPrice?: number;
  depositAmount?: number;
  remainingAmount?: number;
}): string {
  const rawEnvPhone =
    process.env.NEXT_PUBLIC_LOTTA_WHATSAPP_NUMBER || "6281139000800";
  const whatsappNumber = rawEnvPhone.replace(/[^0-9]/g, "") || "6281139000800";

  const guideText = params.selectedGuide
    ? `${sanitizeText(params.selectedGuide.name, 80)} (${sanitizeText(
        params.selectedGuide.specialty,
        80
      )})`
    : params.lang === "id"
    ? "Rekomendasi / Auto-Assign Tim LOTTA"
    : params.lang === "en"
    ? "Auto-Assigned by LOTTA Team"
    : "Assegnazione Automatica dal Team LOTTA";

  const safeRoute = sanitizeText(params.selectedRoute, 160);
  const safeDate = params.tripDate ? sanitizeText(params.tripDate, 30) : "-";
  const adultsCount = params.adults ?? 2;
  const childrenCount = params.children ?? 0;
  const safePickup = params.pickupLocation ? sanitizeText(params.pickupLocation, 120) : "-";

  const formatIdr = (val?: number) =>
    val ? `Rp ${val.toLocaleString("id-ID")}` : "-";

  const totalStr = formatIdr(params.totalPrice);
  const dpStr = formatIdr(params.depositAmount);
  const remainingStr = formatIdr(params.remainingAmount);

  const message =
    params.lang === "en"
      ? [
          `*OFFICIAL LOTTA TRIP & GUIDE RESERVATION*`,
          `-----------------------------------------`,
          `• Destination: ${safeRoute}`,
          `• Trip Date: ${safeDate}`,
          `• Travelers: ${adultsCount} Adults, ${childrenCount} Children`,
          `• Pickup Location: ${safePickup}`,
          `• Guide Preference: ${guideText}`,
          `-----------------------------------------`,
          `• Total Estimated: ${totalStr}`,
          `• Down Payment (DP 30%): ${dpStr}`,
          `• Balance on Trip Day (70%): ${remainingStr}`,
          `• Bank Mandiri: 1610007723179 (MUHAMMAD ZEA AL GHIF)`,
          `-----------------------------------------`,
          `Please confirm guide availability and payment instructions. Thank you!`,
        ].join("\n")
      : params.lang === "it"
      ? [
          `*PRENOTAZIONE UFFICIALE TOUR E GUIDA LOTTA*`,
          `-----------------------------------------`,
          `• Destinazione: ${safeRoute}`,
          `• Data del Viaggio: ${safeDate}`,
          `• Partecipanti: ${adultsCount} Adulti, ${childrenCount} Bambini`,
          `• Punto di Ritiro: ${safePickup}`,
          `• Preferenza Guida: ${guideText}`,
          `-----------------------------------------`,
          `• Totale Stimato: ${totalStr}`,
          `• Anticipo (DP 30%): ${dpStr}`,
          `• Saldo al Giorno del Tour (70%): ${remainingStr}`,
          `• Conto Bank Mandiri: 1610007723179 (MUHAMMAD ZEA AL GHIF)`,
          `-----------------------------------------`,
          `Vi preghiamo di confermare la disponibilità della guida. Grazie!`,
        ].join("\n")
      : [
          `*FORMULIR PEMESANAN RESMI TRIP & GUIDE LOTTA*`,
          `-----------------------------------------`,
          `• Destinasi / Paket: ${safeRoute}`,
          `• Tanggal Keberangkatan: ${safeDate}`,
          `• Jumlah Tamu: ${adultsCount} Dewasa, ${childrenCount} Anak-anak`,
          `• Lokasi Penjemputan: ${safePickup}`,
          `• Pilihan Guide: ${guideText}`,
          `-----------------------------------------`,
          `• Estimasi Total Biaya: ${totalStr}`,
          `• Down Payment (DP 30%): ${dpStr}`,
          `• Pelunasan Saat Mulai Trip (70%): ${remainingStr}`,
          `• Rekening Pembayaran DP: Bank Mandiri 1610007723179 a.n MUHAMMAD ZEA AL GHIF`,
          `-----------------------------------------`,
          `Mohon konfirmasi ketersediaan Guide dan instruksi pembayaran DP. Terima kasih!`,
        ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
