# Hybrid Training v36.161 — QA

## Interaction and loaded-core coverage

Model-interaction checks cover timed units, unilateral elapsed time without double set credit, easy/hard RPE and eligible RIR, pre-exercise rest, warmups, zero work, actual set details, skipped details, separate shared bracing, volume budgets, finite malformed-input handling, and 60 dose combinations checking monotonicity/bounds/input preservation. Real catalog pairs verify pressing→triceps, rowing→biceps and squatting→quads. Daily checks verify hard-effort persistence, elapsed-time decay, local specificity, and no skipped/future evidence leakage. Physical loading and bodyweight equipment-override checks preserve the original records/settings.

Loaded-core checks cover normal full-program inclusion, stationary patio plans, one finisher, fatigue/equipment fallback, exercise-specific time progression, exact Log weight/units/loading details, active-workout reload and preserved History/mobile layout. Weekly rotation, within-session fatigue and secondary consistency suites also run with empty histories.

## Regression coverage

Static/version/cache/offline/browser; KB progression, custom doses and full secondary logging; future projections and manual reflow; barbell anchors/abs; secondary/frequency/core; class focus and substitutions; recovery/calibration/freshness; mobile UI and nine workflows; exact minimum-count ordered barbell/KB loading; actual completion/grip evidence; preparation/drafts; stable plate helpers and idle rendering; fatigue/manual baseline protections and per-exercise weight options.

Older setup-count assertions were updated to count actual KB rows, including a loaded core row. The starting setup's displayed change count is compared with the actual solver result rather than a fixed pre-core number. Tests still verify original five/four main KB movements independently. The initial broad pass reached KB layout before stopping on this old assumption; final affected and remaining suites are rerun. New Log fixtures explicitly render the tracker after setting the date/session, matching the actual application workflow.

Validation: **1,066 export-based checks across 27 suites + 138 focused empty-history checks = 1,204 unique checks passed**. Repeated executions are excluded.

## Bounds

The core finishers are small labelled extras outside the main session time budget. Optional grip holds are not inserted automatically. Model QA checks logic and interaction behavior, not an exact physiological accuracy claim. Research and explicit coefficient limits are in MODEL_INTERACTION_REVIEW_v36.161.md. Tests use the prior supplied export, controlled Phoenix dates, synthetic isolated evidence and empty histories. No completed user history is rewritten. No new Android benchmark, GitHub push or deployment is claimed.
