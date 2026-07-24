// Fill this in once the Google Apps Script Web App is deployed (see apps-script/README.md).
// Leaving it blank just means entries save locally without syncing.
export const SYNC_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycby4-4eaq77nBPkpIxCVZTKzz3zn2rvCaQPmRtgEx4LHHXkcq32g82dCpgdXl66vQZGOmw/exec";

// Sent with every sync request; Code.gs rejects anything that doesn't match its
// SYNC_SECRET Script Property. This is a public static site, so it's a spam
// deterrent (stops naive bots that scrape GitHub for exposed Apps Script URLs),
// not real secrecy - anyone who loads the deployed app can read this value too.
export const SYNC_SECRET = "r758i4d5VAlqhxFmEUw8qD75gqW1-HQn";

export const SYNC_TAG = "sync-entries";
