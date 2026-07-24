import {
  PRAYERS,
  AZKHAR_COUNT_FIELDS,
  TASBEEHAT_SESSION_FIELDS,
  SURAH_FIELDS,
  NAWAFIL_FIELDS,
  ZIKR_FIELDS,
  HIFAZAT_FIELDS,
} from "./config.js";

// Pure function: same entry + config always produces the same score.
// No hardcoded point values here - they all come from config.
export function calculateDailyScore(entry, config) {
  const breakdown = {};
  let total = 0;

  for (const prayer of PRAYERS) {
    const tier = entry[`${prayer}_tier`];
    const points = config.prayerTiers[tier] ?? 0;
    breakdown[`${prayer}_tier`] = points;
    total += points;
  }

  const pages = entry.quran_pages ?? 0;
  let quranPoints;
  if (pages === 0) {
    quranPoints = config.quran.zeroPagesPoints;
  } else if (pages >= config.quran.fullPages) {
    quranPoints = config.quran.fullPagesPoints;
    if (pages > config.quran.fullPages) {
      quranPoints += config.quran.perExtraPagePoints * (pages - config.quran.fullPages);
    }
  } else {
    quranPoints = 0;
  }
  breakdown.quran_pages = quranPoints;
  total += quranPoints;

  for (const field of AZKHAR_COUNT_FIELDS) {
    const count = entry[field] ?? 0;
    const points = count * config.azkharCount.perCountPoints + config.azkharCount.offset;
    breakdown[field] = points;
    total += points;
  }

  for (const field of TASBEEHAT_SESSION_FIELDS) {
    const points = entry[field] ? config.tasbeehatSession.donePoints : config.tasbeehatSession.missedPoints;
    breakdown[field] = points;
    total += points;
  }

  for (const field of SURAH_FIELDS) {
    const points = entry[field] ? config.surah.donePoints : config.surah.missedPoints;
    breakdown[field] = points;
    total += points;
  }

  for (const field of NAWAFIL_FIELDS) {
    const points = entry[field] ? config.nawafil.donePoints : config.nawafil.missedPoints;
    breakdown[field] = points;
    total += points;
  }

  for (const field of ZIKR_FIELDS) {
    const points = entry[field] ? config.zikr.donePoints : config.zikr.missedPoints;
    breakdown[field] = points;
    total += points;
  }

  for (const field of HIFAZAT_FIELDS) {
    const points = entry[field] ? config.hifazat.donePoints : config.hifazat.missedPoints;
    breakdown[field] = points;
    total += points;
  }

  return { total, breakdown };
}
