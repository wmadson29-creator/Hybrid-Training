# Hybrid Training — export-based improvements and preserved UI, v36.154

Prepared October 8, 2026. The user approved the three changes identified from export (25). All nine previously approved UI candidates remain implemented and tested.

| Approved addition | Implemented behavior |
| --- | --- |
| Completion-aware review | Block-end TM review credits actual sets/reps against the saved plan. Two of three sets earn 2/3 completion credit. The reason explains reduced-dose evidence; reduced volume alone does not imply a strength loss. |
| Class-to-anchor overlap | An inline Today warning names a hard class and the affected next-day Barbell lifts, disclosing expected library versus recorded class evidence. Manual choices and fixed anchors remain in place. |
| Actual pull-up grip | Logging separates the actual neutral/overhand grip from the prescribed grip. Drafts, edits and backups preserve it; effort and performance comparisons use confirmed matching grips. Unrecorded legacy grips are displayed as unknown, with no connected comparable trend. |

The actual-grip selector appears beside the entered dose, starts at Not recorded and shows the prescribed grip separately. Its phone layout and active-reload preservation were visually inspected. The class warning uses the established inline conflict styling, gives a Review class day action and fits the phone viewport. Expected effort is explicitly labelled; a manually replaced Barbell workout is not falsely described as scheduled.

## All nine retained candidates

| Approved candidate | Change | Implemented behavior |
| --- | --- | --- |
| 1 | Today: bring Open / Resume forward | The real selected-day action, workout name, dose and context lead Today. Active sessions resume through the existing draft guard. Recovery/program detail and the recommendation explanation are collapsed. |
| 2 | Shorter, phone-friendly Trends | Four dated 28-day summaries, early category filters and four focused Overview panels. An exercise chart switches between recorded load, reps and numerical RPE over 30 / 90 / 365 days or all history; a result slider exposes exact observations. Main tables have phone cards and optional full tables. |
| 3 | Explain and verify metrics | Performance cards show both comparison windows, percent units, evidence counts and the meaning of confidence. Set-level missing data is excluded from repeatability averages; observed zero stays distinct from unobserved. Progression direction and RPE error have plain explanations. |
| 4 | Search History | From/to dates, quick 30/90-day ranges, workout-family and exercise filters search all saved history before pagination. Matching workouts retain Edit, wearable, recovery/context and comparable-result actions. |
| 5 | Simpler workout setup | Loaded plans lead to Start and the first exercise, with no disabled Use loaded plan tile. Change/setup choices are under disclosure. Active navigation, rest, adding exercises, finishing and draft protection remain. |
| 6 | Simpler class logging | Duration, effort and the muscle-focus checklist come first. Optional heart rate, steps, interval/output fields, status and notes are under More class details, with an entered-value count. Original controls are moved rather than cloned; editing/saving retains their values and workout identity. |
| 7 | Useful training-balance order | Major muscle areas and a compact training-goal summary lead. More main areas remain available; calves, tibialis, adductors, serratus, grip, benchmarks and the development horizon are disclosed below. Only presentation order changes; no muscle priority or calf prescription is increased. |
| 8 | Actionable calendar conflicts | Saved No gym / limited-equipment context marks a Barbell or Generic Gym conflict. Change workout, Edit context and an inline one-off Move form use existing protected actions. Moving an anchor preserves its source program week/wave; the app does not move it automatically. |
| 9 | Show recalculation after future edits | An immediate dated report lists before/after changes and model reasons for surrounding automatic days, and highlights changed visible calendar dates. It says when workouts still fit and remain unchanged. Fixed/manual/completed days are excluded; a move checks neighborhoods around both source and destination. |


## Weight setup retained

The 70 lb pair remains the slow adjustment priority; the single 40 lb dial remains the inexpensive adjustment option. Presets can group compatible loads while retaining exact doses and first-movement / final-swings placement. Live edits invalidate dependent setup guidance and reopening retains that invalidation. Custom order and manual weights remain intact.

Purple 55 lb plates remain exclusive to Barbell Strength Squat → optional Deadlift → Barbell Row. Those ordered stacks minimize switching with exact mirrored totals. All other plate-loaded exercises independently use the minimum number of standard plates. The 235 → 185 lb example remains 45 + 25 + 25 → 45 + 25 per side.

## Current verification

**855 export-based checks and 176 empty-history checks passed.** These include 59 / 54 new evidence checks, 50 nine-workflow checks, 43 physical bell-layout checks and 29 plate-layout checks in each applicable dataset. Repeated development runs are excluded from totals. The original latest export's workouts and Recovery remain intact, and the complete personal export is not included in the delivered ZIP.

Build 36.154; recommendation model stamp 20; KB recipe 147. Read `UPDATE_NOTES_v36.154.md` for use / installation and `QA_REPORT_v36.154.md` for exact evidence and limits. Visual inspection used local Chromium at 412×915; physical Android hardware was not tested. Earlier UI audits are retained as chronological records.
