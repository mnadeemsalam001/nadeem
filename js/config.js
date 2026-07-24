// Mirrors the Score_Config sheet: every point value and field default lives here,
// so rule changes (Nadeem: "more items will be added later") mean editing this file only.

export const SCORE_CONFIG = {
  prayerTiers: {
    1: -20, // Qaza
    2: -15, // missed jamaat
    3: 7,   // Jamaat only (default)
    4: 9,   // Jamaat + 1/3
    5: 12,  // Jamaat + 2/3
    6: 15,  // Full Jamaat (3/3)
    7: 18,  // Imamat + 1/3
    8: 21,  // Imamat + 2/3
    9: 25,  // Full Imamat (3/3)
  },
  quran: {
    fullPages: 5,
    fullPagesPoints: 15,
    zeroPagesPoints: -15,
    perExtraPagePoints: 5,
  },
  azkharCount: {
    perCountPoints: 3,
    offset: -5,
    min: 0,
    max: 5,
  },
  tasbeehatSession: {
    donePoints: 2.5,
    missedPoints: -2.5,
  },
  surah: {
    donePoints: 5,
    missedPoints: -2,
  },
  nawafil: {
    donePoints: 5,
    missedPoints: -2,
  },
  zikr: {
    donePoints: 5,
    missedPoints: -2,
  },
  hifazat: {
    donePoints: 10,
    missedPoints: -10,
  },
};

export const PRAYERS = ["fajr", "zuhr", "asr", "maghrib", "isha"];

export const AZKHAR_COUNT_FIELDS = [
  "tasbeeh_fatima_count",
  "surah_duha_count",
  "ya_latif_count",
  "muawwidhatain_count",
];

export const TASBEEHAT_SESSION_FIELDS = [
  "istighfar_am", "istighfar_pm",
  "durood_am", "durood_pm",
  "kalima3_am", "kalima3_pm",
  "kalima1_am", "kalima1_pm",
];

export const SURAH_FIELDS = ["surah_yaseen", "surah_waqiah", "surah_mulk", "surah_sajdah"];

export const NAWAFIL_FIELDS = ["tahajjud", "ishraq", "chasht", "awabin"];

export const ZIKR_FIELDS = ["zikr_subah", "zikr_shaam", "zikr_bil_jahr", "munajat_faqeer"];

export const HIFAZAT_FIELDS = ["hifazat_tongue", "hifazat_ears", "hifazat_eyes"];

// Drives form rendering and default values. Each entry: key, label, control type, default.
export const FIELD_SCHEMA = [
  { group: "Prayers", key: "fajr_tier", label: "Fajr", type: "tier", default: 3 },
  { group: "Prayers", key: "zuhr_tier", label: "Zuhr", type: "tier", default: 3 },
  { group: "Prayers", key: "asr_tier", label: "Asr", type: "tier", default: 3 },
  { group: "Prayers", key: "maghrib_tier", label: "Maghrib", type: "tier", default: 3 },
  { group: "Prayers", key: "isha_tier", label: "Isha", type: "tier", default: 3 },

  { group: "Quran", key: "quran_pages", label: "Quran pages read", type: "int", default: 5, min: 0 },

  { group: "Azkhar (counts, 0-5)", key: "tasbeeh_fatima_count", label: "Tasbeeh Fatima", type: "count", default: 5, min: 0, max: 5 },
  { group: "Azkhar (counts, 0-5)", key: "surah_duha_count", label: "Surah Duha", type: "count", default: 5, min: 0, max: 5 },
  { group: "Azkhar (counts, 0-5)", key: "ya_latif_count", label: "Ya Latif", type: "count", default: 5, min: 0, max: 5 },
  { group: "Azkhar (counts, 0-5)", key: "muawwidhatain_count", label: "Muawwidhatain", type: "count", default: 5, min: 0, max: 5 },

  { group: "Morning Tasbeehat", key: "istighfar_am", label: "Istighfar (300)", type: "bool", default: 1 },
  { group: "Morning Tasbeehat", key: "durood_am", label: "Durood Shareef (300)", type: "bool", default: 1 },
  { group: "Morning Tasbeehat", key: "kalima3_am", label: "3rd Kalima (300)", type: "bool", default: 1 },
  { group: "Morning Tasbeehat", key: "kalima1_am", label: "1st Kalima (300)", type: "bool", default: 1 },

  { group: "Evening Tasbeehat", key: "istighfar_pm", label: "Istighfar (300)", type: "bool", default: 1 },
  { group: "Evening Tasbeehat", key: "durood_pm", label: "Durood Shareef (300)", type: "bool", default: 1 },
  { group: "Evening Tasbeehat", key: "kalima3_pm", label: "3rd Kalima (300)", type: "bool", default: 1 },
  { group: "Evening Tasbeehat", key: "kalima1_pm", label: "1st Kalima (300)", type: "bool", default: 1 },

  { group: "Surahs", key: "surah_yaseen", label: "Surah Yaseen", type: "bool", default: 1 },
  { group: "Surahs", key: "surah_waqiah", label: "Surah Waqiah", type: "bool", default: 1 },
  { group: "Surahs", key: "surah_mulk", label: "Surah Mulk", type: "bool", default: 1 },
  { group: "Surahs", key: "surah_sajdah", label: "Surah Sajdah", type: "bool", default: 1 },

  { group: "Nawafil", key: "tahajjud", label: "Tahajjud", type: "bool", default: 1 },
  { group: "Nawafil", key: "ishraq", label: "Ishraq", type: "bool", default: 1 },
  { group: "Nawafil", key: "chasht", label: "Chasht", type: "bool", default: 1 },
  { group: "Nawafil", key: "awabin", label: "Awabin", type: "bool", default: 1 },

  { group: "Zikr", key: "zikr_subah", label: "Zikr Subah", type: "bool", default: 1 },
  { group: "Zikr", key: "zikr_shaam", label: "Zikr Shaam", type: "bool", default: 1 },
  { group: "Zikr", key: "zikr_bil_jahr", label: "Zikr Bil Jahr", type: "bool", default: 1 },
  { group: "Zikr", key: "munajat_faqeer", label: "Munajat Faqeer", type: "bool", default: 1 },

  { group: "Hifazat", key: "hifazat_tongue", label: "Tongue", type: "bool", default: 1 },
  { group: "Hifazat", key: "hifazat_ears", label: "Ears", type: "bool", default: 1 },
  { group: "Hifazat", key: "hifazat_eyes", label: "Eyes", type: "bool", default: 1 },
];

export function buildDefaultEntry() {
  const entry = {};
  for (const field of FIELD_SCHEMA) {
    entry[field.key] = field.default;
  }
  return entry;
}
