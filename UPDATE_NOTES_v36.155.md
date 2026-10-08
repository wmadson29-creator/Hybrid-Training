# Hybrid Training v36.155 — prepare workouts and internal kettlebell plates

October 8, 2026, America/Phoenix. Cumulative update from v36.139, retaining v36.154 and all earlier approved changes. Prepared for repository upload; not pushed or deployed.

## Edit before Start

Today includes Edit workout alongside Open Workout. The loaded plan has an inline Edit workout before starting section with Add exercise, Save edits and Reset edits. Existing exercise controls allow removals, reordering and swaps before the timer starts. Swaps and added catalog exercises use their own sets/reps/load prescriptions through the established substitution path.

Save edits explicitly stores a preparation draft by date, session and primary/short/full role. Reopening a matching workout and refreshing the browser restore that draft, including additions and removals. Start uses the loaded edited plan, begins the timer and transfers it to normal active-workout autosave. Preparation does not start a timer, create completed History or award training/progression credit. Active-session autosave remains restricted to started workouts. Saved preparations are local drafts, not completed workouts or a new forecasting rule.

Reset edits loads the original plan. History editing and active workouts retain their existing controls. A different workout family or secondary role cannot inherit a saved preparation for another family/role.

Restore fixes: rebuilding a draft cannot write an intermediate partially restored plan back into active autosave. Restoring a shorter draft trims regenerated trailing exercises. Removing or moving exercises invalidates dependent bell setup instructions; removal also refreshes the participating barbell plate sequence.

## Internal plates for the 70 lb bells

The user's supplied detail photograph lists two 0.5 kg plates plus 1, 2, 3, 3, 4 and 6 kg, totaling 20 kg. Its 12–32 kg listing suggests a 12 kg empty shell. The default is therefore photo-based and explicitly labels the empty-shell assumption. Another supplied photo shows a different plate layout; the inventory is editable inline, including duplicate plate weights and empty-shell weight, and saves in settings.

The helper shows the exact shell + plate combination, the total and the count per bell. It enumerates available physical plates, using each at most once. Across the loaded physical-bell allocation, it chooses exact contents for the entire session to minimize plate additions/removals between exercises; fewer total plates across the sequence and fewer initial plates break ties. Each 70 lb bell retains its own plate state even when it is unused for an intervening exercise. Instructions name Keep, Remove and Add. A standalone target without a known allocation uses minimum plate count. No solution returns a clear unavailable result instead of rounding the prescribed load. It displays the 70 lb contents in KB plan/setup cards and the live logger, refreshing when the entered load changes. The 40 lb BowFlex dial allocation continues to show its dial setting, without internal-plate assembly instructions. Counts describe contents rather than a physical assembly order.

A standalone 24 kg target can use 12 kg shell + 6 + 4 + 2 kg: three plates. For a 24 → 26 kg sequence, the optimizer instead uses 6 + 3 + 3 kg inside the shell and then adds one 2 kg plate, reducing switching. Physical assembly order/rehandling depends on the hardware and is not inferred. The editable alternative six-plate inventory (2, 2, 3, 3, 4, 6 kg) is also supported. Inventory changes never change exercise targets, available training steps or independent progression.

## Retained rules

- No automatic Barbell secondary; existing KB-secondary constraints and fixed anchors remain.
- Purple 55 lb plates and minimum switching for Barbell Squat → optional Deadlift → Row only; minimum standard-plate counts elsewhere.
- Minimize slow changes to the 70 lb pair; the 40 lb dial is easily adjustable.
- KB recipe 147, calibration, actual-dose reviews, class overlap warning and actual pull-up grip remain.

Build, cache, manifest and asset queries: 36.155. Export/state schema stays 54 with an additive optional inventory setting. No new runtime asset is needed.

Extract the update ZIP and upload its contents into the existing repository root, keeping nested folders and other existing assets. See QA_REPORT_v36.155.md for validation.
