# Hybrid Training v36.129

## Complete repository audit

- Audited all 132 archived commits by tree and diff, not by the mostly generic upload commit messages.
- Identified 125 substantive repository states and 7 exact no-op commits.
- Documented every archived iteration, bundled/skipped build labels, later rule supersessions, current invariants, and repository-hygiene findings in `HISTORICAL_ITERATION_AUDIT_v36.129.md`.
- Kept the fixed-anchor, Barbell Strength deadlift, weighted-pull-up, manual-choice, completed-history, actual-load, endurance-protection, and swimming guardrails intact.

## Add exercises after Start

- Workout Mode now includes a visible `+ Exercise` action beside the exercise navigation and Finish controls.
- Tapping it adds a resistance exercise without stopping or resetting the active workout timer.
- The new card becomes the focused card and its exercise picker receives keyboard focus.
- The narrow-phone layout wraps the Workout Mode controls into a full-width row rather than forcing horizontal overflow.

## True unplanned-work semantics

- An exercise added from Log is explicitly marked as unplanned instead of silently copying its actual name into the planned-exercise field.
- The marker survives draft autosave/restore, completed-session History Edit, JSON import/export, and CSV export.
- Unplanned work retains an actual-performance RPE prediction but has no fabricated planned RPE or exercise override.
- A separate row-type flag preserves whether the card was resistance or conditioning. A lift added to a run/swim/conditioning session is therefore modeled from its sets, reps, load, and effort—not misclassified as cardio because of the parent session label.

## Exercise library

- Added **Barbell Forearm Curl** as a distinct barbell exercise.
- Primary model area: grip / forearms.
- Assisting area: biceps.
- Related movements: Forearm Curl Machine, Barbell Curl, Hammer Curl, and Dead Hang.
- Uses total bar weight, a 5 lb progression increment, and barbell plate visualization.
- Direct barbell history remains separate from machine-stack history.
- The anatomy display now renders the existing `grip` model channel as `grip / forearms` for clearer UI language.

## Build and validation

- Build/cache key advanced to v36.129.
- Automated suite: **133/133 checks passed**.
- Existing uploaded v36.127 export: **passed with 0 warnings**.
- All runtime JavaScript parses successfully.
- `git diff --check`: passed.

