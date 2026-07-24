// Deploy this as a Web App (see README.md in this folder for step-by-step instructions).
// doPost receives one JSON entry from the PWA and appends/updates a row in Daily_Log.

const SHEET_NAME = "Daily_Log";

// Must match js/config.js FIELD_SCHEMA order plus the three identity columns.
const HEADERS = [
  "entry_id", "date", "submitted_at",
  "fajr_tier", "zuhr_tier", "asr_tier", "maghrib_tier", "isha_tier",
  "quran_pages",
  "tasbeeh_fatima_count", "surah_duha_count", "ya_latif_count", "muawwidhatain_count",
  "istighfar_am", "istighfar_pm", "durood_am", "durood_pm",
  "kalima3_am", "kalima3_pm", "kalima1_am", "kalima1_pm",
  "surah_yaseen", "surah_waqiah", "surah_mulk", "surah_sajdah",
  "tahajjud", "ishraq", "chasht", "awabin",
  "zikr_subah", "zikr_shaam", "zikr_bil_jahr", "munajat_faqeer",
  "hifazat_tongue", "hifazat_ears", "hifazat_eyes",
];

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function entryToRow_(entry) {
  return HEADERS.map((key) => (entry[key] === undefined || entry[key] === null ? "" : entry[key]));
}

function doPost(e) {
  try {
    const entry = JSON.parse(e.postData.contents);

    const expectedSecret = PropertiesService.getScriptProperties().getProperty("SYNC_SECRET");
    if (expectedSecret && entry.secret !== expectedSecret) {
      return respond_({ ok: false, error: "unauthorized" });
    }

    if (!entry.entry_id || !entry.date) {
      return respond_({ ok: false, error: "entry_id and date are required" });
    }

    const sheet = getSheet_();
    const entryIdCol = HEADERS.indexOf("entry_id") + 1;
    const lastRow = sheet.getLastRow();
    let targetRow = null;

    if (lastRow > 1) {
      const ids = sheet.getRange(2, entryIdCol, lastRow - 1, 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (ids[i][0] === entry.entry_id) {
          targetRow = i + 2; // +2: 1-indexed and header row offset
          break;
        }
      }
    }

    const row = entryToRow_(entry);
    if (targetRow) {
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return respond_({ ok: true });
  } catch (err) {
    return respond_({ ok: false, error: err.message });
  }
}

function respond_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
