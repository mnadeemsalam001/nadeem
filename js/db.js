// Minimal native IndexedDB wrapper - no external dependency, so the service worker
// only ever has to cache files we wrote ourselves (matters for offline reliability).

const DB_NAME = "naiki-tracker";
const DB_VERSION = 1;
const STORE = "entries";

let dbPromise = null;

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "date" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function withStore(mode, callback) {
  return openDB().then((db) =>
    new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, mode);
      const store = tx.objectStore(STORE);
      const result = callback(store);
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
    })
  );
}

export function getEntry(date) {
  return openDB().then((db) =>
    new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(date);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    })
  );
}

export function saveEntry(entry) {
  return withStore("readwrite", (store) => store.put(entry));
}

export function getUnsyncedEntries() {
  return openDB().then((db) =>
    new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve((req.result || []).filter((e) => e.submitted_at && !e.synced));
      req.onerror = () => reject(req.error);
    })
  );
}

export function markSynced(date) {
  return getEntry(date).then((entry) => {
    if (!entry) return;
    entry.synced = true;
    return saveEntry(entry);
  });
}
