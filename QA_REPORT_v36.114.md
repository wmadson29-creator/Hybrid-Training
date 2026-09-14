# Hybrid Training v36.114 QA Report

## Release result

**PASS — final package is internally consistent and the Log Workout / cardio-family redesign was regression-tested after the final cleanup pass.**

## What the final QA pass caught and fixed

The last packaging pass found four UX/logic problems that were not acceptable to ship:

1. Renaming the visible `Conditioning` option to `Cardio / Conditioning` accidentally changed the HTML option's implicit value too. That made a manually selected Aerobic/LSS workout render correctly but left the saved session selector blank. The option now keeps the backward-compatible value `Conditioning` while only its visible label changes.
2. Choosing **Build another** did not always collapse the family chooser after a workout loaded. The chooser now closes as soon as a workout is selected.
3. **Custom workout** was still automatically opening the large legacy Advanced setup panel. It now starts as one blank exercise card with Advanced setup closed unless the user explicitly opens it.
4. `Strength-Endurance Circuit` was initially classified into Aerobic/LSS through an inherited cadence mapping. It is now explicitly classified under **Conditioning / Intervals**. Mobile More now exposes separate **Aerobic / LSS** and **Conditioning / Intervals** destinations rather than one generic Conditioning button.

## Automated / browser tests

### 1. JavaScript / package structure
- All inline JavaScript parsed with `node --check` after the final edits.
- `app-shell-v36.114.js` parsed with `node --check`.
- `version.json` and `manifest-v36.webmanifest` parsed as valid JSON.
- No duplicate HTML IDs were found.
- `version.json`, service-worker cache/version strings, shell filenames, manifest query version, and app build all use **36.114**.
- Required runtime files in `version.json` all exist.
- The self-contained build was regenerated from the final production `index.html` and contains the exact final v36.114 CSS and JavaScript shell bytes.
- No stale v36.112/v36.113 release documentation remains in the production folder.

### 2. Responsive major-view smoke test
Tested at **320×800, 390×844, 768×1024, and 1440×1000** while navigating 14 major views:
Today, Log, History, Trends, Gym, Calisthenics, Cardio Library, KB, Classes, Recovery, Bodyweight, Progression, Training Library, and Settings.

Result at every viewport:
- 0 JavaScript page errors
- 0 console errors/warnings
- 0 horizontal-overflow failures
- no visible `undefined`, `NaN`, or `[object Object]` artifacts

### 3. Log flow after a completed workout
Injected a completed full Generic Gym session and reopened Log.

Expected/observed:
- The original primary plan was **not** reloaded.
- Planned exercise count was 0 until the user chose something.
- Inline chooser displayed **Short secondary / Full second workout / Build another**.
- Legacy setup details remained hidden.

### 4. Inline build flow
From the post-workout chooser:
- **Build another** displayed workout families inline; no modal was required.
- Selecting Aerobic/LSS loaded an **LSS Run** directly into Log.
- The build-choice grid collapsed after selection.
- The visible label became **Aerobic / LSS • LSS Run**.
- The underlying session remained exactly `Conditioning` for backward compatibility.
- Custom Workout loaded one blank exercise card while Advanced setup stayed closed.

### 5. Complementary secondary flow
Injected a completed full workout and selected **Short secondary**.

Observed:
- A valid small secondary loaded directly without a popup.
- It displayed as a clear complementary add-on rather than another full session.
- The short secondary did not count as another full workout for same-day full-session counting.
- Advanced setup remained closed.

### 6. Cardio duration authority
Ran a real browser save with a persistent fake localStorage origin:
- Live workout timer elapsed: about **6 seconds / 0.1 min**.
- Entered LSS Run duration: **45 min**.
- Saved `metrics.time`: **45**.
- Saved `sessionDurationMinutes`: **45**.
- Saved `trackedSessionDurationMinutes`: **0.1**.

Therefore the live timer is a session clock/autosave aid, not the authoritative duration for manually entered cardio. A 45-minute run cannot become a 6-second training dose just because the user started the timer shortly before logging it.

### 7. Aerobic/LSS vs Conditioning/Intervals split
Final library classification:
- **Aerobic / LSS:** 19 entries.
- **Conditioning / Intervals:** 42 entries.
- **Triples** appears only under Aerobic/LSS.
- **Strength-Endurance Circuit** appears only under Conditioning/Intervals.
- Mobile More has separate **Aerobic / LSS** and **Conditioning / Intervals** shortcuts and opens the correct filtered family.

The underlying saved session schema remains `Conditioning`; the split is user-facing and does not break old history or the recommendation engine's Run / Other Cardio / Speed-HIC lanes.

### 8. User-state primary-model regression
Loaded the user's unchanged Sep 13 v36.110 export into the final v36.114 build and called the normal primary recommendation path.

Observed:
- Session: `Conditioning` (backward-compatible internal schema)
- Recommended activity: **LSS Run**
- Target: **40–55 min**
- RPE: **4–5**
- 0 page errors / console warnings

Thus the Log UX and cardio-family work did not replace the primary model with a fallback or alter the intended Run recommendation.

## Remaining limitation
A headless Chromium test cannot perfectly reproduce the installed Android PWA service-worker handoff/caching lifecycle on the user's actual device/origin. Service-worker asset/version consistency was checked statically, and the interactive app/recommendation paths were tested in Chromium.
