# Hybrid Training v36.127

## Export restored

- Fixed the JSON export crash caused by writing adaptive-model metadata through the wrong object path.
- Export metadata is now optional: if an analytical snapshot is unavailable, the core backup still downloads.
- Added an executable regression check against a real export payload.

## Future calendar balance

- Normal automatic/balanced training now leaves at least six days between dedicated speed/Sprints-HIC primaries. Running priority uses five days; an explicit conditioning priority can use four. Manual selections and short focus blocks are unchanged.
- A projected sprint immediately counts when later future dates are evaluated, so one initial speed deficit cannot populate several open days.
- After two recent flexible conditioning primaries and no flexible strength-mode primary, the next eligible automatic conditioning slot is redirected to Generic Gym, Strength-Endurance, or Calisthenics. Fixed Barbell Strength and KB anchors do not satisfy this variety guard.
- This is a rolling safeguard, not a Monday-to-Sunday quota. Recovery guards, manual choices, fixed anchors, and unavailable options still win.

## Optional body profile

- Added height and arm span to the Bodyweight area.
- Added dated waist and body-fat checks with the measurement method.
- Height/reach provide comparison and range-of-motion context for strength, pull-ups, and swimming.
- Static measurements do not change daily fatigue or workload. Direct personal results remain authoritative.
- Waist and body-fat estimates are trend context only and are normalized during import/export.

## QA

- `npm test`: 99/99 checks passed before documentation-only updates.
- Added unit coverage for speed spacing, forecast variety, manual/recovery overrides, the export finalizer, body-profile persistence, cache coverage, and build consistency.
