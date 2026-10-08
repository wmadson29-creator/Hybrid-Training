# Hybrid Training v36.154 — completed dose, class overlap and actual pull-up grip

Prepared October 8, 2026, America/Phoenix. The user approved all three changes proposed after export (25). This cumulative update includes v36.140–153 and all nine previously approved UI improvements.

## Actual completion at block end

Training-max review uses actual sets/reps relative to the saved planned dose. A Complete log with 2 of 3 sets receives 2/3 completion credit, not full credit. Recorded set details take priority, and extra reps or weight cannot replace an omitted set. The review explains its completion percentage and reduced-dose exposure count. Reduced volume alone can hold progression but is not classified as a demonstrated strength loss. Existing effort/technique/miss rules, six-week review timing and manual training-max overrides remain in place. Missing legacy plans stay unknown, with the original status-based fallback.

## Class overlap warning

Today shows an advisory warning when a hard class shares major muscle demands with a next-day Barbell Strength anchor. It names the class date, Barbell date and overlapping lifts. Before the class, its intensity/profile comes from the library and is labelled expected. Logged class effort and muscle focus take priority when present; unknown actual effort is disclosed as expected, and explicit light local focus is respected. Skipped classes and manually replaced / different next anchors do not create a misleading Barbell warning. Review class day uses the normal calendar action. Scheduling, manual choices, anchors and workout targets are retained.

## Actual pull-up grip

Weighted Pull-up logging adds Actual pull-up grip: Side / Neutral, Overhand or Not recorded. A separate hint shows the prescribed grip when known. New rows save canonical `pullupGrip` separately from `modelPlannedPullupGrip`; actual defaults to unknown and is never backfilled from the week, prescribed grip or saved target reason.

Autosaved drafts, active reload, quick completion, History Edit, JSON import/export and CSV export preserve the fields. Evidence shows the actual grip. Recent exact-dose effort, estimated capability, residual calibration, review and strength comparisons require confirmed matching actual grips. The chart offers separate recorded-grip views; unknown historical results remain inspectable as points without a comparable grip trend. Unknown-grip workouts still contribute their observed workload/fatigue. Repeated hard legacy entries can carry an explicitly limited review reminder, without claiming a grip-specific plateau. The dedicated prescribed grip/load schedule is unchanged.

## Retained user rules

- All nine practical UI improvements, History filtering, dated context and visible protected recalculation.
- Fewer slow adjustments to the 70 lb kettlebell pair; use the easily adjusted single 40 lb bell where its real settings fit. Preserve appropriate doses, custom order and exercise-specific progression.
- Purple 55 lb plates and minimum switching only for Barbell Strength Squat → optional Deadlift → Barbell Row; independent minimum standard-plate counts for other plate-loaded exercises.
- Existing KB recipe 147, Barbell anchors and six-week wave, absent deadlift in hybrid, three-set ab cap / slow exact-dose ladder, rare secondary policies, manual commitments, completed observations and active drafts.

Build / cache / manifest: 36.154. Recommendation model stamp: 20, so old generated advice can refresh under the new evidence rules; manual plans remain authoritative. State and export format remain 54 with additive optional fields. No new offline asset is required.

## Verification and installation

855 export-based checks and 176 empty-history checks passed, including 59 / 54 focused evidence checks. See `QA_REPORT_v36.154.md` and `UI_AUDIT_v36.154.md` for details.

Extract `Hybrid_Training_v36_154_GitHub_Update.zip` and upload its contents into the existing repository root, preserving nested folders and other assets. Commit the bundle together, wait for deployment, then reopen and use Update if offered. Uploading the ZIP alone does not replace the app files. The 74-path package is cumulative from v36.139. This work prepared files; it did not push or deploy them.
