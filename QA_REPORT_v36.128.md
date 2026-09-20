# QA Report — Hybrid Training v36.128

## Automated suite

`npm test` passes **126/126 checks**.

Coverage includes:

- page, service-worker, and every required runtime script parsing;
- build, manifest, cache-buster, required-file, and service-worker precache agreement;
- export finalization against a representative real payload;
- actual-versus-planned duration, sets, reps, and load;
- primary, full-secondary, short-secondary, partial, substituted, and unplanned workout handling;
- tolerated versus costly over-plan work and cautious capacity learning;
- `Ab Crunch` not being classified as running/cardio;
- soft speed spacing, a supported two-day hard stack, third-hard-day redirection, and overdue endurance-run priority;
- manual, fixed-anchor, and recovery overrides;
- all 60 added exercises, their primary/secondary metadata, and resolution of every relationship to an available movement;
- pull-up grip wording and exercise-library search/taxonomy;
- custom pool length, stroke blocks, comparable stroke trends, and session-bounded swim aggregation;
- prediction-version isolation and interval-censored effort calibration;
- historical-calendar Primary-label reuse and completed/secondary color separation;
- empty Training Balance baseline behavior;
- optional anthropometry fields and context-only guardrails;
- durable saves, imports, rollback, static DOM IDs, and accessible dynamic labels.

## Uploaded-data audit

Command:

```sh
npm run audit:export -- "/path/to/export.json"
```

Result: **passed with 0 warnings**.

Observed data:

- app build v36.127, export schema 51;
- 114 exercise rows across 30 logged sessions;
- 25 recovery days, 5 bodyweight entries, and 4 rest-day records;
- 11 preserved planned-to-actual exercise changes;
- 41 current-model prediction rows and 53 older prediction rows retained as history only;
- 2 one-off program-day moves;
- 0 legacy rows with the new actual-load metadata, as expected because that metadata is not fabricated retroactively.

The audit is read-only. It does not alter the export or local app data.

## User-style UI walkthrough

The currently deployed v36.127 GitHub Pages app was exercised as a user on mobile-width screens. Findings translated into local v36.128 changes:

- A blank Training Balance view incorrectly named Chest as the current emphasis and showed every area as Ready 100%. It now waits for a real baseline.
- Historical calendar cards could show two Primary labels through overlapping annotation layers. The legacy tag is removed and the built-in label is reused.
- Completed and secondary status colors were too similar. They now use green, blue, and violet for completed, full secondary, and short secondary respectively.
- Recommendation headlines and Settings exposed internal model language. High-traffic copy now uses plain training language; detailed rationale remains available in explanation drawers.
- Large exercise selectors were difficult to scan. Search controls are now attached to the workout exercise pickers.
- The calendar's accepted conditioning intent path was traced and remains authoritative, so a user-selected LSS Run is not replaced by an old Active Recovery label.

The cloud browser cannot address this workspace's local loopback server, so the revised local build was validated through direct source execution, module parsing, DOM invariants, and the production regression suite. The deployed older build was used for the user-style interaction audit.

## Static and syntax checks

- `node --check adaptive-personalization-v36.120.js`: passed.
- `node --check actual-load-feedback-v36.126.js`: passed.
- `node --check forecast-balance-v36.127.js`: passed.
- `node --check exercise-expansion-v36.128.js`: passed.
- `git diff --check`: passed.

## Remaining uncertainty and monitoring

- Stroke-specific fatigue literature is smaller and less transferable than the evidence for broad aerobic and resistance programming. Direct personal response must continue to outrank the stroke priors.
- EMG comparisons describe activation in a task; they do not prove long-term hypertrophy or strength transfer.
- The actual-load learner needs new post-update sessions before it can estimate this athlete's tolerance to repeatedly exceeding a plan.
- Forecast behavior should be reviewed after the first complete post-update week, especially if manual schedule moves produce an unusual concentration of fixed anchors.

## Deployment smoke check

After GitHub Pages deploys the delta:

1. Open the app and reload once if the prior service worker controls the first navigation.
2. Confirm the badge reads `Adaptive Engine v36.128`.
3. Export JSON and verify a download occurs.
4. Select a flexible day's LSS Run and confirm the calendar and detail card agree.
5. Enter a custom pool length, log lengths, and confirm total distance.
6. Edit one primary session below plan and one full second workout above plan; confirm History shows the actual values.
7. Inspect the next seven flexible days for endurance, speed, strength variety, and protected anchors.
