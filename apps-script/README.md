# Deploying the Google Apps Script backend

1. Create a new Google Sheet (any name) — this will hold the `Daily_Log` tab.
2. In the Sheet, open **Extensions -> Apps Script**.
3. Delete the default `Code.gs` boilerplate and paste in this folder's `Code.gs`.
4. Save the project (any project name is fine).
5. Click **Deploy -> New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (required for the PWA to POST without a Google login)
6. Click **Deploy**, authorize the requested permissions (it only touches this one
   spreadsheet), and copy the **Web app URL** it gives you.
7. Paste that URL into `js/app-config.js` as `SYNC_ENDPOINT_URL`.
8. Open the Sheet once — the `Daily_Log` tab and its header row are created
   automatically the first time an entry is submitted, or you can trigger it manually
   by running `getSheet_` from the Apps Script editor.
9. In the Apps Script editor, go to **Project Settings -> Script Properties -> Add
   script property**. Name: `SYNC_SECRET`. Value: the same string as `SYNC_SECRET` in
   `js/app-config.js`. This is what stops a random/scraped copy of your Web App URL
   from writing junk rows — requests without a matching `secret` field are rejected.
   (If you skip this step, `doPost` skips the check entirely and accepts anything.)

## Notes
- Resubmitting the same day (same `entry_id`) updates that row in place instead of
  creating a duplicate — so correcting a mistake and hitting Submit again is safe.
- If you ever change the field list in `js/config.js`, update the `HEADERS` array in
  `Code.gs` to match, then re-deploy (**Deploy -> Manage deployments -> Edit -> New
  version**). Existing rows in the Sheet are unaffected; only new submissions use the
  new columns.
- To test the endpoint without the app, you can POST JSON directly, e.g. from a
  terminal: `curl -X POST -d '{"entry_id":"test-1","date":"2026-07-24"}' <WEB_APP_URL>`.
