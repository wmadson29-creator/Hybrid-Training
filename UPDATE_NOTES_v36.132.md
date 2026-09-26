# Hybrid Training v36.132

Release date: 2026-09-25

## Recovery-readiness correction

- Fixed a v36.131 regression that displayed `Readiness: No data` even when the History card still showed saved sleep, resting heart rate, Wake BioCharge, steps, and other recovery fields.
- The data were never deleted. The default recovery lookup accidentally converted `null` into timestamp `0`, which made the current observation appear unavailable.
- Normal lookups now return the current saved recovery entry. Explicit timestamped lookups still return the newest observation that existed at that time, preserving the intended no-look-ahead behavior.
- Recovery values once again feed readiness labels, localized soreness, baselines, fatigue, recommendations, and model evidence.

## Saved day context is visible and correctable

- Today-only context now confirms a successful save directly under the quick choices (for example, `Saved for today • Traveling`).
- Training History now shows meaningful date-specific context alongside recovery and workout history.
- Each saved context entry has **Edit Context** and **Clear Context** controls; clearing offers undo and does not alter that date's workouts or recovery.
- `Traveling` and `Travel / indoor` now write one canonical state, preventing the two UI routes from disagreeing.
- False/default-only rows stay out of History, so an inactive toggle does not look like a real event.
- In the supplied export, September 24 is the confirmed travel day. September 23 is also flagged and can now be cleared independently as the accidental entry the user identified.

## Verification

- The supplied v36.128 export retains all 30 recovery days through migration.
- All 30 records are accessible through both the default and timestamped selectors.
- Three executable regression checks cover current lookup, historical lookup, and the live app integration path.
- The complete static/model suite passes 176/176 checks.

No recovery records are rewritten by this fix.
