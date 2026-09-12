# Hybrid Training v36.96 — Log Flow + Recovery Interaction Audit

## Log Workout usability
- `01 Choose / change workout` is now collapsed by default.
- `02 Today’s workout` is the execution-first landing point.
- Dashboard `Log Today's Workout` and calendar `Open Workout` actions load the authoritative plan for that date, close setup, and jump directly to the workout.
- Returning to an active workout also returns directly to the workout section.
- Date and Session time remain side-by-side on mobile but now top-align correctly.
- The oversized Change Today's Workout CTA is replaced by a quieter `Switch workout` action inside the intentionally opened setup section.
- Exact `RPE (optional)` is collapsed per exercise. Existing saved RPE opens automatically while blank RPE remains out of the normal logging path.
- Training Calendar styling remains intentionally unchanged.

## Research / model
- No base-program or recommendation coefficient retune from v36.95.
- Added `RECOVERY_INTERACTIONS_RESEARCH_v36_96.md` covering multidimensional readiness, high-speed fatigue, recovery interventions, cold-water immersion tradeoffs, heat exposure, and stretching/mobility.
- The audit validates the current principle that recovery interventions may change soreness/readiness perception without automatically earning training credit or a physiological recovery bonus.
