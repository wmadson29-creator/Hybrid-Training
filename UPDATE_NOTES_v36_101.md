# Hybrid Training v36.101 — Execution, Context, Intelligence & Deployment

## Workout execution
- Added **Workout Mode** after Start Workout: a focused current-exercise experience with previous/next navigation, session timing, rest-since-last-set context, and quick access to Finish & Feedback.
- Preserved full editing capability while reducing visual competition during an active session.
- Added progressive disclosure for secondary exercise inputs so prescription and effort remain primary while technique/status/notes/set-by-set details stay one tap away.

## Safer interactions
- Expanded short-lived **Undo** coverage for consequential workout/session changes, including session switching, exercise removal, quick completion, and rest-day changes where supported by the existing action path.
- Kept active workouts and substantive entered work authoritative so navigation does not discard real progress.

## Performance intelligence
- Added a compact Dashboard **Performance intelligence** disclosure instead of a fabricated all-purpose fitness score.
- Reports practical decision-data coverage and a conservative likely limiter using available training history.
- Explicitly surfaces limited-data states rather than pretending the model has high certainty.

## Today-only context
- Surfaced quick context controls for **Traveling**, **Sick / returning**, **Very sore**, **30 min**, **45 min**, and **No gym today**.
- Reused the existing date-specific context/recovery/equipment model instead of creating a second competing context system.
- Explicit time budgets now propagate into adaptive SE, Gym, Calisthenics, and endurance prescriptions.
- Context is date-specific and temporary rather than permanently changing normal programming.

## History
- Added closest-comparable prior-session summaries where enough comparable history exists: work/load/reps, effort, duration, distance, or pace-type changes as appropriate.

## PWA updates
- Added an in-app **Update available** banner when a newer deployed build is detected.
- The update flow can activate a waiting service worker / refresh intentionally instead of relying on the user to guess whether the installed PWA is stale.

## Architecture
- Began incremental modularization without rewriting the training engine.
- Added `app-shell-v36.101.js` and `app-shell-v36.101.css` for product/UI support behavior.
- The main engine stays encapsulated behind a small `HybridCore` bridge rather than exposing its full internal model globally.

## GitHub QA
- Added `.github/workflows/qa.yml`.
- Added `scripts/qa-static.mjs` to check production-content presence, JS/service-worker syntax, PWA version alignment, duplicate IDs, icon dimensions, critical model symbols, weighted-pull-up progression markers, and the literal escaped-newline artifact that previously leaked into the UI.

## Model safety
- 35-date saved-state regression vs v36.100: **0 no-context model differences**.
- New context constraints are opt-in/date-specific; the normal program is not silently retuned.
