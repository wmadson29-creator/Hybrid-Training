# Hybrid Training v36.128

## Whole-athlete forecast balance

- Restored meaningful priority for endurance running with a bounded boost when long/direct run exposure is overdue.
- Replaced the rigid speed gap with a soft recovery-aware window: four days for automatic/running modes, three days for an explicit conditioning priority, and no generic gap inside a short speed-focus block.
- Allows a two-day hard stack when recovery, lower-body state, recent hard-session count, endurance needs, and the next fixed anchor support it.
- Prevents a third crowded hard primary and stops one speed deficit from filling several forecast days.
- Preserves manual choices and every fixed Barbell Strength, kettlebell, and Base Building anchor.

## Actual work drives adaptation

- Planned and completed dose are stored separately for primary, full-secondary, short-secondary, substituted, partial, and unplanned sessions.
- Actual duration, sets, reps, and weight drive fatigue and recent load.
- Under-plan work can leave more capacity for following days; over-plan work adds fatigue.
- Repeated over-plan work only raises learned capacity when recovery or later performance supports it.
- Added an export-audit command that validates plan-to-actual data without changing it.

## Exercise model and libraries

- Added 30 gym and 30 bodyweight exercises.
- Every new exercise includes primary muscles, assisting muscles, related movements, family, and a plain-language note.
- Added common machine variants including more chest, row, curl, leg, hip, tibialis, and unilateral machines.
- Expanded bodyweight push, core, posterior-chain, single-leg, and power choices.
- Exercise libraries are searchable by name, anatomy, equipment, family, and related exercise.
- Pull-up guidance now states the evidence clearly: overhand and neutral grips share the main muscles; a direct comparison did not show a clear neutral-grip biceps advantage. Chin-ups have stronger evidence for higher biceps contribution.

## Swimming

- Preserved stroke-specific tracking, mixed-stroke blocks, course-matched trends, and local muscular-endurance estimates.
- Fixed custom pool-length calculations so custom courses use the same length-to-distance path as standard pools.
- Stroke priors remain conservative and yield to actual pace, duration, RPE, HR, and recovery.

## Calibration and data quality

- Broad effort labels are now interval-censored rather than converted to invented exact RPE values.
- Old prediction versions cannot recalibrate the current model.
- Fixed the export crash caused by writing model metadata through an undefined object path.
- Fixed a classifier bug where the letters `run` inside an exercise such as `Ab Crunch` could be mistaken for running.

## UI cleanup

- Accepted training-type changes remain authoritative in the calendar.
- Historical day cards use one Primary label and actual completed exercises.
- Completed sessions are green, full secondary work is blue, and short secondary work is violet.
- Empty Training Balance screens now say `Awaiting baseline` instead of inventing a weak muscle and 100% readiness.
- Large exercise pickers have search fields.
- Simplified high-traffic copy and moved technical physiology detail into expandable explanations.

## Validation

- `npm test`: 126/126 checks passed.
- Uploaded v36.127 export: passed with zero warnings.
- `git diff --check`: passed.
- All runtime JavaScript modules parse successfully.
