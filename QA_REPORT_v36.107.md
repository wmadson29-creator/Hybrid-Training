# Hybrid Training v36.107 — QA Report

Release candidate: v36.107  
Regression baseline: deployed v36.106

## Real-device failure reproduced
The v36.106 deployment itself was intact; the production `index.html` in GitHub matched the packaged v36.106 blob. The failure was reproduced locally using the user's saved September training export plus representative Sept. 11–12 completed work.

A truthy non-array persisted value such as `setDetails: {}` reproduced the on-device symptom exactly:
- Today / Current State / Next Fixed Anchor remained at placeholders.
- Hybrid Trajectory stayed at Learning.
- the calendar dropped into its resilience fallback,
- Workout Prescription stayed blank,
- the model threw `TypeError: (... || []).filter is not a function` through set repeatability → exercise-order context → strength trajectory → hybrid adaptation.

This was a backward-compatibility/data-shape robustness defect. It was not a bad deployment and did not require deleting workout history.

## v36.107 fixes validated
- Persisted `setDetails` is normalized before model use.
- Persisted conditioning `metrics.components` is normalized before model use.
- Numeric-key array-like objects are recovered in order when possible.
- JSON-array strings are recovered when possible.
- Invalid scalar/object shapes safely become empty optional collections.
- Full IndexedDB hydration applies the same normalization before adaptive rendering.
- Saved workout/draft row collections and known array-valued settings receive the same shape guard.
- Known model/logging paths independently use `Array.isArray` so transient malformed objects cannot bypass hydration repair.
- Dashboard cards are fault-isolated from one another.
- Calendar, prescription, recovery, dashboard, tools, and secondary-view renders are fault-isolated so one advisory error cannot blank the full Today screen.
- Built-in App Self-Check now checks persisted workout row shapes.

## Corruption-variant regression
Eight persisted-history variants were tested against the v36.107 self-contained build:
1. `setDetails = {}`
2. `setDetails = "[]"`
3. numeric-key `setDetails` object
4. numeric `setDetails`
5. null `setDetails`
6. `metrics.components = {}`
7. `metrics.components = "[]"`
8. numeric `metrics.components`

Result: **8/8 passed**. Every case preserved the workout log count, repaired the malformed collection, rendered the normal adaptive calendar and workout prescription, populated Today, and produced **0 page errors / 0 console warnings or errors**.

## Responsive/UI regression
Chromium regression was rerun at:
- 320×800
- 390×844
- 768×1024
- 1440×1000

Across all four viewports:
- 14 directly navigable major views rendered.
- 0 page errors or console warnings/errors.
- 0 page-level horizontal overflow failures.
- 0 visible `undefined`, `NaN`, `Infinity`, or `[object Object]` artifacts.
- Calendar Next → Previous returned to the original week and Today returned correctly.
- 60-minute Generic Gym remained 7 timed exercises / 26 working sets / ~57 min.
- 60-minute Calisthenics remained 7 timed exercises / 28 working sets / ~55 min.

## Behavioral regression
- Stationary Bike LSS updates only Other Cardio cadence.
- LSS Run updates only Run cadence.
- Sprint Repeats updates only Speed/HIC cadence.
- Travel context disables automatic pool availability.
- Limited-equipment / no-gym context disables gym access.
- Severe recovery context selects Recovery / Rest.
- Two completed full workouts still block a third full-workout recommendation.
- No scenario test produced JavaScript errors.

## Structural/deployment checks
- v36.107 JavaScript syntax passes for the core, modular shell, and service worker.
- Live DOM audit found no duplicate IDs.
- `index.html`, shell filenames, manifest, service worker, and `version.json` agree on build 36.107.
- `version.json` lists every required deployment file.
- Service-worker required precache remains fail-closed.

## Environment limitation
The real installed-PWA cache takeover on the user's phone cannot be executed from this container. The service-worker syntax, build references, required assets, and deployment bundle were checked, while the complete app itself was exercised in Chromium with persisted-state fixtures including the reproduced failure state.
