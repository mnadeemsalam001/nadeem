import { getUnsyncedEntries, markSynced } from "./db.js";
import { SYNC_ENDPOINT_URL, SYNC_SECRET, SYNC_TAG } from "./app-config.js";
import { calculateDailyScore } from "./scoring.js";
import { calculateDailyVirtue } from "./virtue.js";
import { SCORE_CONFIG, VIRTUE_CONFIG } from "./config.js";

async function postEntry(entry) {
  const { total, categoryTotals } = calculateDailyScore(entry, SCORE_CONFIG);
  const { totalVirtue, totalSin, breakdown: virtueBreakdown } = calculateDailyVirtue(entry, VIRTUE_CONFIG);
  const res = await fetch(SYNC_ENDPOINT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight to Apps Script
    body: JSON.stringify({
      ...entry,
      secret: SYNC_SECRET,
      total_score: total,
      category_scores: categoryTotals,
      total_virtue: totalVirtue,
      total_sin: totalSin,
      virtue_breakdown: virtueBreakdown,
    }),
  });
  if (!res.ok) throw new Error(`Sync failed: ${res.status}`);
}

// Pushes every finalized-but-unsynced entry. Safe to call repeatedly - already-synced
// entries are skipped, and a failure on one entry doesn't block the others.
export async function trySyncAll() {
  if (!SYNC_ENDPOINT_URL || !navigator.onLine) return;
  const pending = await getUnsyncedEntries();
  for (const entry of pending) {
    try {
      await postEntry(entry);
      await markSynced(entry.date);
    } catch (err) {
      console.warn("Sync retry pending for", entry.date, err);
    }
  }
}

// Registers a one-off Background Sync so Chrome/Android retries even after the
// page is closed. Falls back silently where Background Sync isn't supported (e.g. iOS) -
// the 'online' listener registered in app.js covers that case whenever the app is open.
export async function requestBackgroundSync() {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.ready;
    if ("sync" in registration) {
      await registration.sync.register(SYNC_TAG);
    }
  } catch (err) {
    console.warn("Background sync registration unavailable", err);
  }
}
