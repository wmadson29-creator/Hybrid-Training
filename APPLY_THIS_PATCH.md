# Apply Hybrid Training v36.138

Upload the ZIP contents at the repository root, preserving the `tests/` directory. The ZIP contains only files that are new or changed since v36.137; it excludes exports, screenshots, dependencies, `.git`, and unchanged application files.

## What this release fixes

- Consecutive automatic Generic Gym workouts now receive a **soft, dose-sensitive spacing cost** for recently trained focus areas. This is not a prohibition: a muscle can still repeat when weakness, due volume, progression value, equipment fit, and recovery evidence make it the best choice.
- Future recommendations now include projected-workout context in their memoization keys. This prevents a future date from reusing a Gym recommendation calculated before the preceding projected workout existed.
- The Gym and Calisthenics libraries render only when opened and in bounded batches. Research citations hydrate only when their disclosure is opened.
- Generated Gym, Calisthenics, kettlebell, class, conditioning, History, Training Library, and Trends markup is released after leaving those views.
- Repeated exercise-anatomy, conditioning-type, bodyweight, history, and development calculations use bounded caches that clear whenever model evidence changes.
- Existing saved data can safely use the new date cache during startup migration; the real export-backed upgrade path is covered by browser QA.

No workout, recovery, wearable, body-measurement, schedule, equipment, or settings data is cleared.

## Expected adjacent-day behavior

Repeating one muscle on back-to-back Gym days is allowed. A near-duplicate three-muscle emphasis should be uncommon because the previous day's actual or projected dose lowers those focus scores. Stronger individualized evidence can override that cost.

With the supplied export, the corrected forecast is:

- Oct. 10: Hamstrings / Glutes + Quads + Biceps
- Oct. 11: Shoulders + Back + Biceps

Biceps repeats because it still scores highly; the former shoulder/triceps-heavy near-repeat does not.

## Verification

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
```

Local results: **213/213 static/model checks** and **34/34 browser checks** passed. The latest export audit passed with four retained historical-data warnings documented in `QA_REPORT_v36.138.md`.

Suggested commit message:

`Fix projected Gym spacing and reduce UI lag`

After GitHub Pages deploys, fully close and reopen the installed app once so the v36.138 service worker activates. Do not clear app storage.
