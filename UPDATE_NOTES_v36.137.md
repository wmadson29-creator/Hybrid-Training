# Hybrid Training v36.137

Release date: 2026-09-27

## Automatic Gym plans now receive current rotation logic

Automatic Gym generation already compared the last four completed full Gym workouts, penalized exact recent repeats, favored comparable unused movements, and limited exact overlap when suitable alternatives existed. The repeat seen in the app came from a later persistence layer: once an automatic recommendation had been accepted, its saved exercise list could be reused across a model update without invoking that generator again.

v36.137 adds semantic versions to both recommendation snapshots and automatic Gym plans. An obsolete, unstarted generated plan is refreshed once under the current model. The refresh preserves the selected training type and continues to use current focus needs, equipment, progression, readiness, stress budgets, and future anchors.

## User-authored and historical work stays fixed

The refresh is intentionally narrow:

- Gym workouts saved through the manual builder are never treated as generated plans.
- A Generic Gym workout that has already started is not changed beneath the user.
- A completed Generic Gym workout remains historical truth.
- A current-version accepted plan remains stable across ordinary page renders.

## Calendar and Home interactions are lighter

The previous render path performed substantial invisible work before the interface could respond. It recalculated full adaptive forecasts for past calendar days, resolved all seven secondary-workout forecasts in one synchronous block, and built backtests plus complete comparison workouts even while their explanation sections were closed.

v36.137 now:

- renders past dates directly from saved history instead of regenerating recommendations that are immediately discarded;
- paints all seven primary calendar cards first, then resolves current/future secondary labels one at a time while yielding between days;
- calculates evidence, yesterday comparisons, and alternative training modes only when their sections are opened;
- reuses completed-session grouping, History grouping, athletic-development, and backtest results for a stable model revision;
- batches dynamic form-label and large exercise-picker observers instead of rescanning the interface for every inserted DOM node; and
- clears every new cache through the existing save/import/settings invalidation path, so new data still changes the model immediately.

These are scheduling and memoization changes only. They do not reduce training aggressiveness, alter fixed anchors, or simplify the recommendation score.

## QA

- **203/203 static and model checks passed.**
- The test suite executes the live saved-plan resolver with stale generated, manual, active, and completed cases.
- Browser coverage now exercises the same persistence path and verifies that an obsolete snapshot cannot survive solely because its evidence hash still matches.
- Browser coverage also verifies that the current-week calendar does not invoke the adaptive forecaster for completed past days.
- The v36.136 bounded calendar-resolution guard remains unchanged.
