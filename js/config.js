// Mirrors the Score_Config sheet: every point value and field default lives here,
// so rule changes (Nadeem: "more items will be added later") mean editing this file only.

// Virtue (sawab) values, separate from SCORE_CONFIG's motivational point scale.
// Virtue and sin are summed as two SEPARATE totals, never netted against each other -
// see js/virtue.js. Only prayer tier 1 (Qaza) and Hifazat "not protected" carry a sin
// value; everything else is 0 when missed (no sin tracked, just no reward).
export const VIRTUE_CONFIG = {
  prayerTiers: {
    1: -100000,               // Qaza (sin)
    2: 700,                   // missed jamaat (prayed alone)
    3: 700 * 27,              // Jamaat only
    4: 700 * 27 * 70,         // Jamaat + 1/3
    5: 700 * 27 * 70 * 70,    // Jamaat + 2/3
    6: 700 * 27 * 70 * 70 * 70, // Full Jamaat (3/3)
    7: 7000 * 27 * 70,        // Imamat + 1/3
    8: 7000 * 27 * 70 * 70,   // Imamat + 2/3
    9: 7000 * 27 * 70 * 70 * 70, // Full Imamat (3/3)
  },
  quranPerPage: 525 * 10, // ~525 letters/page assumed, 10 reward per letter
  azkharCount: {
    tasbeeh_fatima_count: 1000,
    surah_duha_count: 6000,
    ya_latif_count: 500,
    muawwidhatain_count: 2900,
    dua_after_namaz_count: 0, // can't be measured, per Nadeem
  },
  tasbeehatSession: {
    istighfar_am: 10000, istighfar_pm: 10000,
    durood_am: 10000, durood_pm: 10000,
    kalima3_am: 10000, kalima3_pm: 10000,
    kalima1_am: 10000, kalima1_pm: 10000,
    la_hawla_am: 10000, la_hawla_pm: 10000,
    subhanallah_am: 10000, subhanallah_pm: 10000,
  },
  surah: {
    surah_yaseen: 3620 * 10,
    surah_waqiah: 1900 * 10,
    surah_mulk: 1665 * 10,
    surah_sajdah: 1860 * 10,
  },
  nawafil: {
    tahajjud: 200,
    ishraq: 100,
    chasht: 100,
    awabin: 100,
  },
  zikr: {
    zikr_subah: 50,
    zikr_shaam: 50,
    zikr_bil_jahr: 100,
    munajat_faqeer: 50,
  },
  // "done" here means protected: 0 (no separate reward for protecting, just no sin).
  // Not protected uses this value as a sin amount.
  hifazat: {
    hifazat_tongue: -50000,
    hifazat_ears: -50000,
    hifazat_eyes: -100000,
  },
};

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
  "dua_after_namaz_count",
];

export const TASBEEHAT_SESSION_FIELDS = [
  "istighfar_am", "istighfar_pm",
  "durood_am", "durood_pm",
  "kalima3_am", "kalima3_pm",
  "kalima1_am", "kalima1_pm",
  "la_hawla_am", "la_hawla_pm",
  "subhanallah_am", "subhanallah_pm",
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
  { group: "Azkhar (counts, 0-5)", key: "dua_after_namaz_count", label: "Dua After Namaz", type: "count", default: 5, min: 0, max: 5 },

  { group: "Morning Tasbeehat", key: "istighfar_am", label: "Istighfar (300)", type: "bool", default: 0 },
  { group: "Morning Tasbeehat", key: "durood_am", label: "Durood Shareef (300)", type: "bool", default: 0 },
  { group: "Morning Tasbeehat", key: "kalima3_am", label: "3rd Kalima (300)", type: "bool", default: 0 },
  { group: "Morning Tasbeehat", key: "kalima1_am", label: "1st Kalima (300)", type: "bool", default: 0 },
  { group: "Morning Tasbeehat", key: "la_hawla_am", label: "La Hawla Wala Quwwata", type: "bool", default: 0 },
  { group: "Morning Tasbeehat", key: "subhanallah_am", label: "Subhanallahi wa Bihamdihi", type: "bool", default: 0 },

  { group: "Evening Tasbeehat", key: "istighfar_pm", label: "Istighfar (300)", type: "bool", default: 0 },
  { group: "Evening Tasbeehat", key: "durood_pm", label: "Durood Shareef (300)", type: "bool", default: 0 },
  { group: "Evening Tasbeehat", key: "kalima3_pm", label: "3rd Kalima (300)", type: "bool", default: 0 },
  { group: "Evening Tasbeehat", key: "kalima1_pm", label: "1st Kalima (300)", type: "bool", default: 0 },
  { group: "Evening Tasbeehat", key: "la_hawla_pm", label: "La Hawla Wala Quwwata", type: "bool", default: 0 },
  { group: "Evening Tasbeehat", key: "subhanallah_pm", label: "Subhanallahi wa Bihamdihi", type: "bool", default: 0 },

  { group: "Surahs", key: "surah_yaseen", label: "Surah Yaseen", type: "bool", default: 0 },
  { group: "Surahs", key: "surah_waqiah", label: "Surah Waqiah", type: "bool", default: 0 },
  { group: "Surahs", key: "surah_mulk", label: "Surah Mulk", type: "bool", default: 0 },
  { group: "Surahs", key: "surah_sajdah", label: "Surah Sajdah", type: "bool", default: 0 },

  { group: "Nawafil", key: "tahajjud", label: "Tahajjud", type: "bool", default: 0 },
  { group: "Nawafil", key: "ishraq", label: "Ishraq", type: "bool", default: 0 },
  { group: "Nawafil", key: "chasht", label: "Chasht", type: "bool", default: 0 },
  { group: "Nawafil", key: "awabin", label: "Awabin", type: "bool", default: 0 },

  { group: "Zikr", key: "zikr_subah", label: "Zikr Subah", type: "bool", default: 0 },
  { group: "Zikr", key: "zikr_shaam", label: "Zikr Shaam", type: "bool", default: 0 },
  { group: "Zikr", key: "zikr_bil_jahr", label: "Zikr Bil Jahr", type: "bool", default: 0 },
  { group: "Zikr", key: "munajat_faqeer", label: "Munajat Faqeer", type: "bool", default: 0 },

  { group: "Hifazat", key: "hifazat_tongue", label: "Tongue", type: "bool", default: 1 },
  { group: "Hifazat", key: "hifazat_ears", label: "Ears", type: "bool", default: 1 },
  { group: "Hifazat", key: "hifazat_eyes", label: "Eyes", type: "bool", default: 1 },

  // Extra azkhar with no score/virtue impact at all (see EXTRA_FIELDS below) - tracked
  // for the record only, missing them carries no penalty of any kind.
  { group: "Extra Azkhar (no score/virtue)", key: "ya_wahhab", label: "Ya Wahhab", type: "bool", default: 0 },
  { group: "Extra Azkhar (no score/virtue)", key: "falillahil_hamd", label: "Falillahil Hamd Rabbi", type: "bool", default: 0 },
  { group: "Extra Azkhar (no score/virtue)", key: "surah_duha_11x", label: "Surah Duha (11x)", type: "bool", default: 0 },
  { group: "Extra Azkhar (no score/virtue)", key: "wa_iz_yarfa_ibrahim", label: "Wa Iz Yarfa Ibrahim (40x)", type: "bool", default: 0 },
  { group: "Extra Azkhar (no score/virtue)", key: "surah_qadr", label: "Surah Qadr (11x)", type: "bool", default: 0 },
  { group: "Extra Azkhar (no score/virtue)", key: "surah_fatir_last_ruku", label: "Surah Fatir (Last Ruku)", type: "bool", default: 0 },
  { group: "Extra Azkhar (no score/virtue)", key: "allahu_latif_count", label: "Allahu Latifun Bi'ibadihi (70x)", type: "count", default: 0, min: 0, max: 2 },
  { group: "Extra Azkhar (no score/virtue)", key: "rabbi_adkhilni_count", label: "Rabbi Adkhilni Mudkhala (21x)", type: "count", default: 0, min: 0, max: 2 },
];

// Deliberately NOT included in PRAYERS/AZKHAR_COUNT_FIELDS/etc. above - scoring.js and
// virtue.js only iterate those arrays, so anything not listed there contributes 0 to
// both score and virtue, by omission rather than a special case. This array exists
// purely so Code.gs and anyone reading this file knows these fields exist and why
// they're excluded, not because any code loops over it.
export const EXTRA_FIELDS = [
  "ya_wahhab", "falillahil_hamd", "surah_duha_11x", "wa_iz_yarfa_ibrahim",
  "surah_qadr", "surah_fatir_last_ruku", "allahu_latif_count", "rabbi_adkhilni_count",
];

// Distinguishes "no data for this field" (undefined/null/blank - e.g. a historical row
// backfilled before this field existed) from "explicitly marked not done" (0/false).
// Used by scoring.js/virtue.js so newly-added fields don't retroactively penalize old
// entries that predate them.
export function isFieldPresent(value) {
  return value !== undefined && value !== null && value !== "";
}

export function buildDefaultEntry() {
  const entry = {};
  for (const field of FIELD_SCHEMA) {
    entry[field.key] = field.default;
  }
  return entry;
}
