# Hybrid Training v36.149 — validation

Prepared October 5, 2026, America/Phoenix. Baseline: v36.148. Selected scope: target explanations, class focus intensity, clearer exercise effort and initial KB calibration.

## Results

| Suite | Export (23) checks passed |
| --- | ---: |
| Static/deployment | 19 |
| Browser/calendar/PWA | 90 |
| KB and full-secondary execution | 93 |
| Future forecast | 26 |
| Barbell and ab progression | 57 |
| Secondary logic | 39 |
| Secondary frequency | 29 |
| Gym/bodyweight core | 27 |
| Class focus | 47 |
| Substitution | 18 |
| Recovery/role/experience semantics | 49 |
| New feedback/calibration | 66 |
| **Total** | **560** |

Additional empty-history checks: browser/PWA **84**, Recovery/roles **38**, feedback/calibration **66**, total **188**. All listed final processes exited 0. No uncaught page errors occurred. The final caption/neutral-intensity fast-path refinement passed static validation and the new feedback/calibration and class-focus checks again; the completed suite's counts are not double-counted.

The private fixture is `hybrid-training-export (23).json`, exported 2026-10-05T06:56:32.249Z from v36.144: 192 logs, 40 Recovery dates, seven bodyweight measurements, no wearable-session rows and no completed KB sessions. Tests preserve actual observed workout/recovery/measurement records. Only the existing derived `personalExpectedRpe`, `personalEffortCorrection` and `personalCalibrationConfidence` fields may refresh for a test's model date.

## New behavior verified

- Direct dose/effort history and decision reasons appear beside targets; projected work is excluded, limited evidence is identified, and Barbell waves retain their identity.
- Manual dose edits preserve the generated target. Drafts preserve actual inputs, target reasons and original planned activity/dose/rest. History displays recorded target reasons and restores them when editing.
- Class intensity changes the relevant muscle fingerprint, actual recent fatigue and bounded long-term estimates. Moderate/default preserves the prior model; stale unchecked annotations cannot alter it. Total class duration/cardio dose and direct lift exposure remain separate. Skipped classes earn no dose.
- RIR refines categorical/rough effort, confident RPE takes priority, 0 remains valid, and 5+ stays bounded. Unknown inputs retain prior behavior. Residual calibration is uncertainty-weighted. Overall experience does not change effort.
- Swings, explosive-only movements, carries and timed holds cannot invent RIR resistance evidence. Substitution clears prior-exercise RIR; skip/miss saves do not retain performance evidence.
- No actual KB history produces provisional equipment-supported bells. Clearly easy/full results can calibrate upward, high strain can calibrate downward, unknown/partial results cannot earn increases, and three completed direct efforts graduate calibration. Duplicate rows, forecasts and short add-ons do not count. Manual bells bypass automatic calibration. Existing earned range progression remains valid.
- New fields survive UI entry, draft restoration, completed-workout save, History edit and JSON import normalization. Invalid RIR/intensity imports are rejected; JSON and CSV exports include the new data.
- New controls have accessible labels, do not duplicate IDs, and do not cause horizontal overflow at 412×915. Expanded target/effort and class-focus layouts were visually reviewed.

## Reproduce

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:browser
npm run test:recovery
npm run test:feedback
```

`HYBRID_CHROMIUM_PATH` can select an installed Chromium. Test hooks are injected only by the local test server; production has no `window.__qa` interface. Updater fixtures derive current/next versions from version.json and continue to verify coherent bundles, backup-failure handling, active-workout deferral, Later, worker activation, saved-data preservation and offline reopening.

## Limits

These are synthetic/model/browser checks, not completed user KB workouts or an Android benchmark. The local intensity factors, three-exposure threshold and uncertainty bands are bounded app estimates. Research does not establish this exact KB prescription or those coefficients as optimal. The latest export contains no local intensity annotations or RIR inputs; those entries must come from the user. The KB recipe stays 147 and the six-week Barbell wave/block-end review remains intact.

The cumulative ZIP preserves the prior archive and contains new/modified repository-root paths with nested tests. Personal exports, browser binaries, dependencies and temporary QA files are excluded. No push or deployment was performed, and the installed phone build was not independently verified.
