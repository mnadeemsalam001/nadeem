import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateDailyScore } from "./scoring.js";
import { SCORE_CONFIG, buildDefaultEntry } from "./config.js";

test("all-defaults day scores correctly", () => {
  const entry = buildDefaultEntry();
  const { total } = calculateDailyScore(entry, SCORE_CONFIG);
  // 5 prayers @ tier3 (7) = 35
  // quran 0 pages = -15
  // 4 azkhar counts @5 = (5*3-5)*4 = 40
  // 8 tasbeehat sessions done = 2.5*8 = 20
  // 4 surahs done = 5*4 = 20
  // 4 nawafil default off = -2*4 = -8
  // 4 zikr done = 5*4 = 20
  // 3 hifazat done = 10*3 = 30
  assert.equal(total, 35 - 15 + 40 + 20 + 20 - 8 + 20 + 30);
});

test("prayer tiers use configured points", () => {
  const entry = buildDefaultEntry();
  entry.fajr_tier = 1; // Imamat
  entry.zuhr_tier = 5; // Qaza
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.fajr_tier, 20);
  assert.equal(breakdown.zuhr_tier, -20);
});

test("quran scoring: zero pages", () => {
  const entry = buildDefaultEntry();
  entry.quran_pages = 0;
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.quran_pages, -15);
});

test("quran scoring: between 1 and fullPages is neutral", () => {
  const entry = buildDefaultEntry();
  entry.quran_pages = 3;
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.quran_pages, 0);
});

test("quran scoring: exactly the full-pages threshold", () => {
  const entry = buildDefaultEntry();
  entry.quran_pages = 5;
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.quran_pages, 15);
});

test("quran scoring: uncapped bonus above threshold", () => {
  const entry = buildDefaultEntry();
  entry.quran_pages = 7;
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.quran_pages, 15 + 5 * 2);
});

test("azkhar count scoring at extremes", () => {
  const entry = buildDefaultEntry();
  entry.tasbeeh_fatima_count = 0;
  entry.surah_duha_count = 5;
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.tasbeeh_fatima_count, -5);
  assert.equal(breakdown.surah_duha_count, 10);
});

test("boolean fields swing between done and missed points", () => {
  const entry = buildDefaultEntry();
  entry.hifazat_tongue = 1;
  entry.hifazat_ears = 0;
  const { breakdown } = calculateDailyScore(entry, SCORE_CONFIG);
  assert.equal(breakdown.hifazat_tongue, 10);
  assert.equal(breakdown.hifazat_ears, -10);
});
