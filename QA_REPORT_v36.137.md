# QA Report — Hybrid Training v36.137

## Result

- **203/203 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- Build, manifest, service-worker namespace, loaded modules, and required deployment files agree on v36.137.
- `git diff --check` reports no whitespace errors.

## Root-cause regression

The fresh automatic Gym generator passed its cross-workout variety test. The defect was downstream: `genericGymWorkoutFor()` returned any saved dated Gym plan immediately, and the accepted recommendation snapshot validated only against the user's evidence hash. A plan accepted before the variety-model change therefore bypassed regeneration and kept the same exercises while adaptive load/repetition targets continued to move.

## Coverage added

The suite now requires that:

- generated plans and recommendation snapshots carry semantic model versions;
- an obsolete unstarted automatic Gym plan resolves through the current generator;
- a manually built plan is returned unchanged;
- a workout already in progress is returned unchanged;
- a completed Gym workout is returned unchanged;
- current-version generated plans remain stable; and
- a matching evidence hash cannot validate an obsolete model snapshot.

The static/model test runs the actual resolver functions extracted from the application rather than checking strings alone.

## Performance regression coverage

The suite also requires that:

- historical calendar cards are built from persisted actuals before any current/future recommendation work;
- the historical-truth layer no longer calls `expectedSession()` for past dates;
- current/future secondary labels are scheduled cooperatively rather than resolved in one blocking loop;
- explanation-only evidence/backtest and alternative-plan work begins only when its disclosure is opened; and
- form-label and searchable-picker mutation observers batch their work instead of repeatedly scanning during the same DOM update; and
- session grouping, development-state, and shadow-backtest caches are bounded and cleared by the normal model invalidator.

The browser suite instruments `expectedSession()` and asserts that rendering the current week makes zero forecast calls for dates before today while still producing all seven cards.

## Browser status

The Playwright regressions were added and parse successfully. This workspace does not contain Chromium, and the restricted network returned an empty browser archive when installation was attempted. GitHub Actions remains the authoritative browser run after upload.

## Data safety

The change does not clear or migrate workout history, recovery observations, wearables, body measurements, or settings. Only an unstarted dated plan identified as model-generated and carrying an older semantic plan version is eligible to refresh.
