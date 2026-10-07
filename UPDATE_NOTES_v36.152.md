# Hybrid Training v36.152 — nine approved UI improvements

The user approved all nine UI candidates. Today now leads with Open/Resume; Trends is shorter and has recorded exercise charts and clearer evidence; History has date/family/exercise filters; workout setup and class logging are less cluttered; major muscle areas and training goals lead training balance; gym conflicts have useful actions; future manual changes show actual surrounding recalculation.

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

The arithmetic repair excludes missing set-level evidence from observed repeatability averages. Category filters also stop mistaking the conditioning title/subtitle for its data target. The required `ui-workflows.js` asset is covered by manifest/version verification and service-worker precache. Fixed/manual training authority, records, drafts and active sessions remain protected.

App/cache/manifest **36.152**, recommendation stamp **18**, KB recipe **147**. Validation: **722 unique export-seeded checks** plus **50 focused empty-history checks**. Current evidence is in `QA_REPORT_v36.152.md` and `UI_AUDIT_v36.152.md`. The ZIP is cumulative from v36.139 and preserves v36.140–151. Codex did not push or deploy.

## Why the earlier GitHub update did not change the app

The October 7 **09:40:16 Phoenix** upload, [b3b08c3](https://github.com/wmadson29-creator/Hybrid-Training/commit/b3b08c3b5e1d42aa177602f6437dca5515f958a0), changed zero files. Its tree was identical to the parent and `version.json` / `sw.js` remained v36.149. The Pages job succeeded at 09:41:13 with those unchanged files. This explained the initial version report; it was not evidence of a failed Pages deployment.

A fresh check found the later **10:37:52 Phoenix** upload, [73eee7b](https://github.com/wmadson29-creator/Hybrid-Training/commit/73eee7b8a778874d5450bb475990579b41374537). It changed 13 files, now identifies **v36.151**, and its [Pages job](https://github.com/wmadson29-creator/Hybrid-Training/actions/runs/37660574718) succeeded at **10:38:41**. Every changed file's Git blob SHA matches the delivered local v36.151 baseline. The repository issue is resolved. The installed phone's active version and public origin bytes were not independently inspected. If a phone retains an older build, reopen and use the in-app Update action or refresh after deployment.

For v36.152, extract the ZIP and upload its **contents** into the existing repository root, replacing the listed files and preserving nested folders and other app assets. Uploading only the ZIP or making another empty commit does not update the web app. This release has not been pushed or deployed by Codex.

