# Hybrid Training — nine approved UI improvements, v36.152

Prepared October 7, 2026. The user approved all nine candidates from the v36.151 practical audit. All nine are implemented and tested; they are no longer an unimplemented recommendation list.

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

## Other confirmed repairs in the approved scope

The conditioning Trends card's heading/subtitle IDs could be mistaken for its data target and hide it from categories where it belonged. Filters now use known data targets; recovery-learning detail belongs in Recovery/Advanced rather than appearing in every category. The new UI module is a required, versioned offline asset; its stable filename also keeps coherent-update checks valid across releases.

Repeatability arithmetic was independently checked with 100 lb × 10 reps followed by 100 lb × 6 reps. The existing demand formula produces a 10% estimated set-output drop. Adding a summary-only workout no longer halves that observation. Effort-only set entries do not manufacture rep observations; a real zero drop remains recorded zero. This is an estimated demand/performance measure, not a literal percent drop in repetitions or a measured 1RM. Different effort, rep ranges, program waves, exercise order and bodyweight can produce different-looking summaries; the UI explains those distinctions.

## What was exercised

Local Chromium at 412×915, using the actual export (24): 199 workout rows, 42 Recovery dates, eight weights, zero wearable-session rows and six rest records. The focused workflow run also used isolated synthetic fixtures for an older result outside the initial 60-date History page, mixed-unit loads, missing/observed set breakdowns and class-edit preservation. No private export file was changed and planning did not create completed workouts.

The final unique export-seeded checks total **722**; the final nine-workflow suite also passed **50 empty-history checks**. Workflows physically clicked Open, Start, Resume, class Edit/Save, filters, chart controls, No gym context, an inline program Move and a future mode switch. They verify exact saved fields, unchanged original observations, source-wave preservation, real calendar changes, a no-change reassurance, layout width and browser errors. Screenshots of Today, workouts, Trends, History, classes, conflicts and recalculation were inspected locally; the phone itself was not inspected.

## Why the earlier GitHub update did not change the app

The October 7 **09:40:16 Phoenix** upload, [b3b08c3](https://github.com/wmadson29-creator/Hybrid-Training/commit/b3b08c3b5e1d42aa177602f6437dca5515f958a0), changed zero files. Its tree was identical to the parent and `version.json` / `sw.js` remained v36.149. The Pages job succeeded at 09:41:13 with those unchanged files. This explained the initial version report; it was not evidence of a failed Pages deployment.

A fresh check found the later **10:37:52 Phoenix** upload, [73eee7b](https://github.com/wmadson29-creator/Hybrid-Training/commit/73eee7b8a778874d5450bb475990579b41374537). It changed 13 files, now identifies **v36.151**, and its [Pages job](https://github.com/wmadson29-creator/Hybrid-Training/actions/runs/37660574718) succeeded at **10:38:41**. Every changed file's Git blob SHA matches the delivered local v36.151 baseline. The repository issue is resolved. The installed phone's active version and public origin bytes were not independently inspected. If a phone retains an older build, reopen and use the in-app Update action or refresh after deployment.

For v36.152, extract the ZIP and upload its **contents** into the existing repository root, replacing the listed files and preserving nested folders and other app assets. Uploading only the ZIP or making another empty commit does not update the web app. This release has not been pushed or deployed by Codex.

## Boundaries

App/cache/manifest **36.152**, recommendation model stamp **18**, KB recipe **147**. The model stamp invalidates saved advice affected by the correction to observed set-repeatability evidence. Fixed Barbell waves, dedicated pull-up progression and the KB recipe remain unchanged. Calendar snapshots are bounded local comparisons, not another weekly optimizer. Class focus feeds the existing muscle/fatigue model without inventing lifting records. Confidence labels and fatigue calculations remain app estimates; software checks do not validate the individual's physiological predictions.
