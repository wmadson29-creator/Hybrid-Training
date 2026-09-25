# QA Report — Hybrid Training v36.130

## Result

The cumulative GitHub delta passes **146/146 automated checks**. `git diff --check` also passes.

The supplied v36.128/schema-51 export passes the read-only semantic audit with **0 errors and 2 actionable warnings**:

- 23 legacy strength rows carry planned minutes produced by the old reps-to-minutes bug. v36.130 explicitly classifies those rows as strength and does not use the bad duration.
- One swim row (2026-09-17, LSS Swim) contains 420 yd total but 2 × 21 yd in its pool fields.

## New regression coverage

- recommendation snapshots remain stable across Generic Gym, LSS/Aerobic, and Use Recommended toggles;
- strength rows cannot become cardio merely because a legacy planned-duration value exists;
- structured HIC with performed components stays planned-but-unquantified instead of unplanned;
- planned components survive active-draft, completed-session edit, JSON import/export, and CSV paths;
- secondary-only saves cannot replace primary day identity;
- localized soreness survives entry, draft, import, history, and muscle-channel application;
- push-up and hill/sprint components expose distinct local-muscle loads;
- machine availability can be changed directly from a live workout and persists to the recommendation filter;
- all 87 expansion entries validate, and every relationship target resolves to an available exercise;
- inconsistent pool totals are preserved safely in historical editing but rejected on a new save;
- build, manifest, service worker, module cache keys, required files, and export version agree.

## User-style UI audit carried forward and rechecked

The prior mobile walkthrough found and corrected blank-baseline claims, duplicate Primary labels, confusing completed/secondary colors, technical recommendation headlines, hard-to-scan exercise selectors, and a calendar/detail mismatch after accepting a conditioning choice. v36.130 adds the following interaction findings:

- **Recommendation flip:** choosing a workout changed the inputs used to recompute the recommendation, so the Recommended card appeared to reverse itself. The visible recommendation is now snapshotted before the manual mutation.
- **Machine availability:** the previous equipment setting was buried in the library. A contextual action now appears directly under a machine exercise.
- **Soreness specificity:** one global soreness value could not express sore chest with fresh legs. Body-area chips now make the input explicit without forcing a full anatomical questionnaire.
- **Conditioning opacity:** compound HIC cards did not show that push-ups load the chest/triceps or that hills load the lower body. Component rows now state their main local loads.
- **Swim contradiction:** total distance and pool arithmetic could disagree silently. The form now asks the user to reconcile them before completion.

The revised local build was validated through JavaScript parsing, model-level execution, persistence-path assertions, DOM/static accessibility checks, and source-level interaction assertions. A local browser binary was not installed, so final rendered smoke testing remains a deployment step.

## Commands run

```sh
npm test
node tests/audit-export.js "/path/to/hybrid-training-export (19).json"
git diff --check
```

## Deployment smoke test

1. Reload once after GitHub Pages updates so service worker v36.130 controls the page.
2. On an open day whose recommendation is Generic Gym, tap Generic Gym and confirm Use Recommended still says Generic Gym; then tap Use Recommended and confirm no Gym/Run oscillation.
3. Enter chest soreness, save, reopen Recovery, and confirm Chest remains selected.
4. Open a machine exercise, tap **Don’t have this machine**, choose a substitute, and confirm the original machine no longer appears in automatic gym recommendations.
5. Open a multi-movement conditioning session and confirm Push-ups and Hills display different local loads.
6. Enter a 21-yd pool, 20 lengths, and confirm 420 yd. Change lengths to 2 and confirm the workout cannot be saved while total distance remains 420 yd.
7. Export JSON and confirm a schema-52 file downloads.
