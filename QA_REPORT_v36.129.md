# QA Report — Hybrid Training v36.129

## Result

The v36.129 cumulative delta passes **133/133 automated checks**. The uploaded training export passes its read-only compatibility audit with **0 warnings**.

## New regression coverage

- Workout Mode contains a visible Add Exercise action.
- The action delegates to the existing add-card path, focuses the newly added card, and preserves the active workout.
- Manual extra exercises are explicitly unplanned.
- Unplanned identity survives draft restore, History Edit, import, JSON export, and CSV export.
- Unplanned rows do not receive fabricated planned-exercise or planned-RPE values.
- Strength added inside a conditioning session remains resistance work in both the actual-load and personalization modules.
- Barbell Forearm Curl is a distinct barbell-loaded exercise with a 5 lb increment and plate visualization.
- Its primary/secondary muscles and all four relationships validate and resolve to available exercises.
- The library shows `grip / forearms` rather than the less informative `grip` label.

## Full regression coverage retained

The suite also rechecks:

- app, service-worker, inline-script, and module parsing;
- build/version/manifest/cache-buster agreement and every required precache asset;
- fixed-anchor and manual-selection authority;
- actual-versus-planned primary and secondary workload;
- under-plan, over-plan, partial, substituted, and unplanned dose handling;
- endurance-run protection, soft speed spacing, supported two-day hard stacks, and third-hard-day redirection;
- all 61 expansion-catalog exercises and every relationship target;
- pull-up grip wording and anatomy display;
- custom pool length, stroke blocks, comparable stroke trends, and isolated swim fatigue;
- export finalization, IndexedDB durability, import rollback, and saved-state normalization;
- accepted conditioning choice/calendar agreement;
- empty-baseline behavior, plain-language UI copy, accessible dynamic labels, and completed/secondary color separation.

## Export compatibility audit

Input: the supplied v36.127 export.

- 114 exercise rows across 30 sessions;
- 25 recovery days, 5 bodyweight entries, and 4 rest records;
- 11 planned-to-actual exercise changes;
- 41 current-model prediction rows and 53 retained legacy prediction rows;
- 2 one-off program-day moves;
- 0 warnings.

The export audit is read-only and did not modify the user's data.

## Static and syntax checks

- `npm test`: 133/133 passed.
- `node --check` passed for the service worker and all five external runtime modules.
- `git diff --check`: passed.
- Static DOM IDs remain unique.
- Every service-worker asset resolves to an existing repository file.

## Interaction-test limitation

The local Playwright package was present, but its Chromium executable was not installed in this environment. The active-workout interaction was therefore verified through parsed source, DOM/action integration assertions, persistence-path assertions, narrow-screen CSS inspection, and model-level unit tests rather than a new local rendered-browser run. The earlier deployed-build mobile walkthrough remains documented in `QA_REPORT_v36.128.md`.

## Deployment smoke check

After GitHub Pages updates:

1. Reload once if the previous service worker controls the first navigation.
2. Confirm Settings shows `Adaptive Engine v36.129`.
3. Open a workout and tap Start Workout.
4. Confirm `+ Exercise` is visible in the Workout Mode bar.
5. Add Barbell Forearm Curl, enter performed sets/reps/load/effort, and complete the workout.
6. Open History Edit and confirm it remains labeled as an unplanned exercise with the entered actual values.
7. Export JSON and confirm the download succeeds.

