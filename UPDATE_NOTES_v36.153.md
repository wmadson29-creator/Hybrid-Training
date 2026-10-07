# Hybrid Training v36.153 — practical weight setup and nine UI improvements

Prepared October 7, 2026, America/Phoenix. Cumulative update from v36.139 through v36.152. Ready for upload; no repository write or deployment was performed in this turn.

The nine approved UI improvements from v36.152 are included: the leading Today action, simpler Trends, explained progress metrics, History filters, compact workout setup, class logging, major-area training balance, actionable calendar conflicts and visible schedule recalculation.

## Kettlebell organization

- Reduce slow adjustments to the two 70 lb bells. The single 40 lb bell is easy to adjust; its dial can change freely whenever its actual settings support the exercise's target.
- Group matching loads in preset straight-set workouts when this reduces individual 70 lb changes or adjustment breaks. Retain the first movement, full-body coverage and the final swing block.
- Identify the physical bell or matched pair on each exercise. Show Set, Adjust or Keep instructions and optional initial settings/change-count details. Prepare a spare bell at the same time when upcoming paired work uses that load.
- The starting B session becomes floor press → gorilla row → goblet squat → RDL → swings. Its 70 lb changes fall from five to four, across two adjustment breaks instead of three, after the initial setup. Goblet squat, RDL and swings use 24 kg. A keeps its original order and prepares both 24 kg bells before the row/hinge block. C can use the separate 40 lb bell for its 16 kg press.
- Exercise loads, reps, sets, rest, calibration and progression remain exercise-specific. A convenience preference cannot force a shared weight or earn progression. Manual targets and saved custom exercise order are retained.
- The KB Workouts screen has an inline Group matching weights checkbox. Turning it off restores preset order while still showing usable physical setup instructions. The preference survives reopening.
- Live workouts keep their loaded order. A load edit or substitution clears the dependent setup instructions; reopening does not resurrect them. Original model targets remain saved evidence, separate from edited actual weights.

Counts assume the displayed initial settings. The app does not measure current physical bell settings, adjustment time or physiology. Some changes remain necessary because exercises have different appropriate loads. The recipe remains v147; this release organizes its execution.

## Barbell plate visuals

- On Barbell Strength days, jointly plan the plate stacks for Squat → Deadlift → Barbell Row. Omit deadlift when it is not programmed or is marked Skipped/Missed.
- Add a labeled purple 55 lb plate to these three exercises only. Other workouts, chest machines, landmine work and other barbell exercises retain their existing visuals.
- Keep each prescribed total exact, including the 45 lb bar. Choose ordered stacks from the bar outward that require the fewest individual plate removals/additions between these lifts; break ties with more compact stacks. Mirror both sides.
- For 235 → 185 lb, show 45 + 25 + 25 per side, then 45 + 25. Keep the inner two plates and remove the outer 25. A 55 can also sit outside a retained 45 when that reduces switching.
- Show the initial order and per-side Keep/Remove/Add instructions beside the graphic. Sequence and total-change details stay optional. Both Today and logging use the same optimizer.
- Recalculate the complete sequence when a logging weight, exercise or completion status changes. Restore diagrams from actual edited weights after reopening. Exact totals outside the 5 lb loading grid get an explanation rather than a rounded graphic.
- Fix the startup restoration order discovered by the active barbell test: rebuild saved workouts after all model extensions initialize, so an existing prediction helper is ready before it is called.

This feature changes plate graphics and setup guidance. It does not alter the workout order, total loads, sets, reps, rest, training maxima, progression or recorded history. It assumes the displayed plate sizes and quantities are available, as the existing plate helper does; it does not track a physical plate inventory.

## Installation

Extract `Hybrid_Training_v36_153_GitHub_Update.zip` and upload its contents into the existing repository root, preserving nested folders and other assets. Commit the bundle together, wait for deployment, then reopen and use Update if offered. Uploading the ZIP alone does not replace app files. Keep the existing app origin and saved data.

## Validation

796 checks passed with the latest export (24), plus 122 empty-history checks across the bell-layout, nine-workflow and barbell-plate suites. The bell allocator matched an independent exhaustive minimum in 40 mixed-dose cases; the plate optimizer matched 30 exhaustive ordered-stack cases. Phone views were inspected locally, including Today, Trends, active KB logging, purple 55 lb plates and the retained 45 + 25 base. The actual Android device was not inspected.

Build/cache/manifest: 36.153. Recommendation model stamp: 19. KB recipe: 147. `kb-load-layout.js` and `barbell-plate-layout.js` are stable-name required offline assets.
