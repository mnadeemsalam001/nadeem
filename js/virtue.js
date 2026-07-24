import {
  PRAYERS,
  AZKHAR_COUNT_FIELDS,
  TASBEEHAT_SESSION_FIELDS,
  SURAH_FIELDS,
  NAWAFIL_FIELDS,
  ZIKR_FIELDS,
  HIFAZAT_FIELDS,
} from "./config.js";

// Pure function, same shape as calculateDailyScore. Virtue and sin are kept as two
// SEPARATE totals (never netted) - every positive breakdown value adds to totalVirtue,
// every negative one adds (as a positive magnitude) to totalSin.
export function calculateDailyVirtue(entry, virtueConfig) {
  const breakdown = {};

  for (const prayer of PRAYERS) {
    const tier = entry[`${prayer}_tier`];
    breakdown[`${prayer}_tier`] = virtueConfig.prayerTiers[tier] ?? 0;
  }

  breakdown.quran_pages = (entry.quran_pages ?? 0) * virtueConfig.quranPerPage;

  for (const field of AZKHAR_COUNT_FIELDS) {
    const count = entry[field] ?? 0;
    breakdown[field] = count * (virtueConfig.azkharCount[field] ?? 0);
  }

  for (const field of TASBEEHAT_SESSION_FIELDS) {
    breakdown[field] = entry[field] ? (virtueConfig.tasbeehatSession[field] ?? 0) : 0;
  }

  for (const field of SURAH_FIELDS) {
    breakdown[field] = entry[field] ? (virtueConfig.surah[field] ?? 0) : 0;
  }

  for (const field of NAWAFIL_FIELDS) {
    breakdown[field] = entry[field] ? (virtueConfig.nawafil[field] ?? 0) : 0;
  }

  for (const field of ZIKR_FIELDS) {
    breakdown[field] = entry[field] ? (virtueConfig.zikr[field] ?? 0) : 0;
  }

  for (const field of HIFAZAT_FIELDS) {
    // Protected (done) = 0, nothing to sum. Not protected = the configured sin amount.
    breakdown[field] = entry[field] ? 0 : (virtueConfig.hifazat[field] ?? 0);
  }

  let totalVirtue = 0;
  let totalSin = 0;
  for (const value of Object.values(breakdown)) {
    if (value > 0) totalVirtue += value;
    else if (value < 0) totalSin += -value;
  }

  return { totalVirtue, totalSin, breakdown };
}
