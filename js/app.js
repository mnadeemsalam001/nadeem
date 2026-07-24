import { FIELD_SCHEMA, SCORE_CONFIG, buildDefaultEntry } from "./config.js";
import { calculateDailyScore } from "./scoring.js";
import { getEntry, saveEntry } from "./db.js";
import { trySyncAll, requestBackgroundSync } from "./sync.js";

const TIER_LABELS = {
  1: "1 - Imamat",
  2: "2 - Full jamaat",
  3: "3 - Default",
  4: "4 - Missed jamaat",
  5: "5 - Qaza",
};

const datePicker = document.getElementById("date-picker");
const app = document.getElementById("app");
const submitBtn = document.getElementById("submit-btn");
const statusLine = document.getElementById("status-line");

let currentEntry = null;

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function fieldRow(field, value, onChange) {
  const row = document.createElement("div");
  row.className = "field-row";

  const label = document.createElement("span");
  label.className = "field-label";
  label.textContent = field.label;
  row.appendChild(label);

  if (field.type === "tier") {
    const select = document.createElement("select");
    select.className = "tier-select";
    for (const tier of [1, 2, 3, 4, 5]) {
      const opt = document.createElement("option");
      opt.value = tier;
      opt.textContent = TIER_LABELS[tier];
      if (tier === value) opt.selected = true;
      select.appendChild(opt);
    }
    select.addEventListener("change", () => onChange(Number(select.value)));
    row.appendChild(select);
  } else if (field.type === "count" || field.type === "int") {
    const stepper = document.createElement("div");
    stepper.className = "stepper";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "-";

    const valueSpan = document.createElement("span");
    valueSpan.className = "value";
    valueSpan.textContent = value;

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";

    const clamp = (n) => {
      let result = n;
      if (typeof field.min === "number") result = Math.max(field.min, result);
      if (typeof field.max === "number") result = Math.min(field.max, result);
      return result;
    };

    minus.addEventListener("click", () => {
      const next = clamp(Number(valueSpan.textContent) - 1);
      valueSpan.textContent = next;
      onChange(next);
    });
    plus.addEventListener("click", () => {
      const next = clamp(Number(valueSpan.textContent) + 1);
      valueSpan.textContent = next;
      onChange(next);
    });

    stepper.append(minus, valueSpan, plus);
    row.appendChild(stepper);
  } else if (field.type === "bool") {
    const toggle = document.createElement("label");
    toggle.className = "toggle";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(value);

    const track = document.createElement("span");
    track.className = "track";

    input.addEventListener("change", () => onChange(input.checked ? 1 : 0));

    toggle.append(input, track);
    row.appendChild(toggle);
  }

  return row;
}

function renderForm(entry) {
  app.innerHTML = "";
  const groups = [];
  for (const field of FIELD_SCHEMA) {
    let group = groups.find((g) => g.name === field.group);
    if (!group) {
      group = { name: field.group, fields: [] };
      groups.push(group);
    }
    group.fields.push(field);
  }

  for (const group of groups) {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = group.name;
    fieldset.appendChild(legend);

    for (const field of group.fields) {
      const row = fieldRow(field, entry[field.key], (newValue) => {
        entry[field.key] = newValue;
        saveEntry(entry); // save-as-you-go, not just on submit
      });
      fieldset.appendChild(row);
    }

    app.appendChild(fieldset);
  }
}

async function loadDate(date) {
  const existing = await getEntry(date);
  currentEntry = existing || { ...buildDefaultEntry(), date, entry_id: null, submitted_at: null, synced: false };
  renderForm(currentEntry);
  statusLine.textContent = currentEntry.submitted_at
    ? `Submitted at ${new Date(currentEntry.submitted_at).toLocaleTimeString()}`
    : "Not submitted yet";
}

async function handleSubmit() {
  if (!currentEntry.entry_id) {
    currentEntry.entry_id = crypto.randomUUID();
  }
  currentEntry.submitted_at = new Date().toISOString();
  currentEntry.synced = false;
  await saveEntry(currentEntry);

  const { total } = calculateDailyScore(currentEntry, SCORE_CONFIG);
  statusLine.textContent = `Saved. Today's score: ${total}`;

  if (navigator.onLine) {
    await trySyncAll();
  } else {
    await requestBackgroundSync();
  }

  const refreshed = await getEntry(currentEntry.date);
  if (refreshed?.synced) {
    statusLine.textContent = `Synced. Today's score: ${total}`;
  }
}

datePicker.addEventListener("change", () => loadDate(datePicker.value));
submitBtn.addEventListener("click", () => handleSubmit());
window.addEventListener("online", () => trySyncAll());

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js", { type: "module" }).catch((err) => {
    console.warn("Service worker registration failed", err);
  });
}

datePicker.value = todayISO();
loadDate(datePicker.value);
trySyncAll();
