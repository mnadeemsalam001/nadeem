import {
  PRAYERS,
  AZKHAR_COUNT_FIELDS,
  TASBEEHAT_SESSION_FIELDS,
  SURAH_FIELDS,
  NAWAFIL_FIELDS,
  ZIKR_FIELDS,
  HIFAZAT_FIELDS,
  isFieldPresent,
} from "./config.js";

// A field with no data at all (e.g. a historical row from before it existed) scores 0,
// not the "missed" penalty - only an explicit 0/false counts as missed.
function sumFields(entry, fields, breakdown, pointsFor) {
  let subtotal = 0;
  for (const field of fields) {
    const raw = entry[field];
    const points = isFieldPresent(raw) ? pointsFor(raw) : 0;
    breakdown[field] = points;
    subtotal += points;
  }
  return subtotal;
}

// Pure function: same entry + config always produces the same score.
// No hardcoded point values here - they all come from config. categoryTotals
// groups the per-field breakdown into the sections shown on the entry screen,
// so a "Scores" sheet can chart contribution-by-category over time.
export function calculateDailyScore(entry, config) {
  const breakdown = {};
  const categoryTotals = {};

  categoryTotals.prayers = sumFields(
    entry,
    PRAYERS.map((p) => `${p}_tier`),
    breakdown,
    (tier) => config.prayerTiers[tier] ?? 0
  );

  let quranPoints = 0;
  if (isFieldPresent(entry.quran_pages)) {
    const pages = entry.quran_pages;
    if (pages === 0) {
      quranPoints = config.quran.zeroPagesPoints;
    } else if (pages >= config.quran.fullPages) {
      quranPoints = config.quran.fullPagesPoints;
      if (pages > config.quran.fullPages) {
        quranPoints += config.quran.perExtraPagePoints * (pages - config.quran.fullPages);
      }
    }
  }
  breakdown.quran_pages = quranPoints;
  categoryTotals.quran = quranPoints;

  categoryTotals.azkhar_counts = sumFields(
    entry, AZKHAR_COUNT_FIELDS, breakdown,
    (count) => count * config.azkharCount.perCountPoints + config.azkharCount.offset
  );

  categoryTotals.tasbeehat = sumFields(
    entry, TASBEEHAT_SESSION_FIELDS, breakdown,
    (done) => (done ? config.tasbeehatSession.donePoints : config.tasbeehatSession.missedPoints)
  );

  categoryTotals.surahs = sumFields(
    entry, SURAH_FIELDS, breakdown,
    (done) => (done ? config.surah.donePoints : config.surah.missedPoints)
  );

  categoryTotals.nawafil = sumFields(
    entry, NAWAFIL_FIELDS, breakdown,
    (done) => (done ? config.nawafil.donePoints : config.nawafil.missedPoints)
  );

  categoryTotals.zikr = sumFields(
    entry, ZIKR_FIELDS, breakdown,
    (done) => (done ? config.zikr.donePoints : config.zikr.missedPoints)
  );

  categoryTotals.hifazat = sumFields(
    entry, HIFAZAT_FIELDS, breakdown,
    (done) => (done ? config.hifazat.donePoints : config.hifazat.missedPoints)
  );

  const total = Object.values(categoryTotals).reduce((sum, n) => sum + n, 0);

  return { total, breakdown, categoryTotals };
}
