# Hybrid Training — nine UI improvements and practical weight setup, v36.153

Prepared October 7, 2026. All nine approved candidates from the previous practical audit are included and revalidated in this cumulative package. They were already implemented in the saved v36.152 release retrieved for this turn.

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

## Added for the adjustable kettlebells

The two 70 lb bells are slow to adjust; the single 40 lb dial is easy. The app prioritizes reducing adjustments to the 70 lb pair. It uses the 40 lb bell for supported single-bell targets, even when its dial must change.

Preset sessions group matching loads when useful and show which physical bell to use, what to set initially, and when to Adjust or Keep it. The first movement stays first and swings stay last. The starting B prescription now runs floor press → gorilla row → goblet squat → RDL → swings, reducing individual 70 lb changes from five to four. A retains its order and can prepare both 24 kg bells together. The grouping checkbox is inline and persists.

Targets and exercise-specific progression remain appropriate to each movement. Custom exercise order and manual loads are preserved. A live load edit or substitution hides dependent setup instructions and that invalidation survives reopening. Starting settings and change counts sit under optional detail to keep the active card short.

## Added for barbell loading visuals

On Barbell Strength days only, Squat → Deadlift → Barbell Row share an exact loading path. Deadlift is omitted when absent or skipped. The optimizer includes purple 55 lb plates and chooses inner-to-outer stacks that minimize plate removals/additions between the lifts. It can retain a 45 + 25 base rather than use a greedy decomposition: 235 lb shows 45 + 25 + 25 per side, and 185 lb shows 45 + 25, removing only the outer 25.

The mirrored graphic, per-side change instruction and optional sequence details appear on Today and logging cards. Editing an actual load refreshes both neighboring layouts; reopening uses those edited totals. Unsupported off-grid totals are explained without inventing a rounded load. Other workouts and exercises keep their original visuals and plate set. The startup restoration fix keeps the active barbell draft and original history intact.

## Current verification

**796 export-based checks and 122 empty-history checks passed.** The latter include 43 bell-layout/active-draft, 50 nine-workflow and 29 plate-layout checks. The independent references cover 40 mixed bell-dose cases and 30 ordered plate-stack cases. Today, Trends, History, class logging, conflicts, recalculation, KB logging and barbell loading graphics were reviewed in local phone-sized Chromium.

The original export's workouts and Recovery data remain intact. The package contains no personal export data. It was prepared for GitHub upload; no push or deployment was performed in this turn. The earlier GitHub investigation remains historical evidence in the v36.152 audit and handoff.

Build 36.153; model stamp 19; KB training recipe 147. Read `UPDATE_NOTES_v36.153.md` for execution details and `QA_REPORT_v36.153.md` for exact checks and limitations. Initial settings are assumptions displayed before the session; the app does not inspect actual current bell configurations or predict exact adjustment time.
