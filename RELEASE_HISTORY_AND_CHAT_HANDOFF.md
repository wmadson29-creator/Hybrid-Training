# Hybrid Training — complete release history, decisions, and chat handoff

Prepared October 3, 2026, America/Phoenix; updated for v36.144. Repository: [wmadson29-creator/Hybrid-Training](https://github.com/wmadson29-creator/Hybrid-Training).

This is the standalone continuity document for a replacement chat. It records the actual chronological archive, the reasons behind important changes, the latest accepted user requests, the implemented release, validation, and the boundaries that must survive future edits. Attach this document and a current app export when resuming work.

## Start here in a replacement chat

Copy this prompt with the document attached:

> Continue work on my Hybrid Training app using this handoff as context. Read its current-release status, user constraints, latest decisions, and chronological archive before editing. Check the actual GitHub HEAD and loaded/exported app build; do not assume the prepared release is deployed. Preserve completed workouts, recovery, manual schedule commitments, active/paused workouts, custom routines, and drafts. Implement my new requests, validate the relevant behavior with my latest export, update this handoff, and deliver only new/modified GitHub files in a ZIP. Do not push or deploy unless I explicitly ask.

The app and chats are separate systems. The reported chat unloading/crashing does not itself prove an app defect. App calendar/startup slowness, update notifications, duplicate swim recommendations, historical attribution, and future recommendation repetition were investigated independently.

## Release and deployment status

| Item | Verified status |
| --- | --- |
| Original reviewed baseline | v36.139, [commit 093f077](https://github.com/wmadson29-creator/Hybrid-Training/commit/093f077a8290b9a1b3d1b80703bf493c6a5073d7), uploaded September 29 at 19:43:10 Phoenix |
| Last verified GitHub archive, during v36.141 preparation | v36.140, [commit f20ede8](https://github.com/wmadson29-creator/Hybrid-Training/commit/f20ede8b9ef5fa715163e1756e951611ae187daa), uploaded October 2 at 18:23:06 Phoenix. This is historical verification; HEAD was not rechecked during v36.142/v36.143/v36.144 work. |
| v36.140 delivery | `Hybrid_Training_v36_140_GitHub_Update.zip` was prepared and delivered. The seven app/document files uploaded to GitHub match the prepared release. Its five test files were absent from that GitHub upload. |
| v36.141 delivery | `Hybrid_Training_v36_141_GitHub_Update.zip` and its handoff were delivered. Its complete KB/secondary/forecast changes are retained in the current cumulative bundle. No v36.141 repository upload or phone build was independently verified during this work. |
| v36.142 delivery | `Hybrid_Training_v36_142_GitHub_Update.zip` and its handoff were delivered. Its Barbell accessory, SE spacing, secondary agreement, location, and duration changes remain in the current bundle. The user found advice much better, then reported too few secondaries. |
| v36.143 delivery | `Hybrid_Training_v36_143_GitHub_Update.zip` and its handoff were delivered. Its practical secondary opportunities and coordinated KB dose review remain in the current bundle. |
| Current prepared release | **v36.144**, implemented and validated locally, delivered as `Hybrid_Training_v36_144_GitHub_Update.zip`. It includes cumulative changes from v36.139 and can update v36.140, v36.141, v36.142, or v36.143. |
| Phone / GitHub Pages | The loaded phone build and completed Pages deployment were not independently verified. Repository upload, deployment completion, and an installed client’s active build are different facts. |
| Publication actions | This chat did not push, merge, or deploy the prepared release. |

The original archive review covered 147 reachable commits, 140 distinct trees, and seven exact duplicates. The verified v36.140 upload extends that to **148 reachable commits, 141 distinct trees, and seven exact duplicates**. These are archived repository states, not 141 separately numbered feature releases. The locally prepared v36.141/v36.142/v36.143/v36.144 releases are described separately; no new archived GitHub commits were verified in this continuation.

## Current user instructions and design boundaries

These are active decisions, not suggestions to reinterpret silently.

| Area | Rule to retain |
| --- | --- |
| Overall hybrid week | Monday Barbell, Tuesday KB A, Wednesday conditioning/open, Thursday Barbell, Friday KB B, Saturday conditioning/open, Sunday KB C. Preserve two barbell days, three full-body KB days, and both open days. |
| TB-only phase | Preserve Monday/Wednesday/Friday anchors, the six-week wave, and block-end max review. One deadlift work set Monday and Friday only; none Wednesday or in Hybrid. |
| Barbell ab finisher | Ab Crunch Machine supports 5 lb increments and is capped at three sets: 3×15 → 3×18 → 3×20. Six consecutive comfortable comparable completed Barbell dates at each exact dose/load earn the next step; six top-step results earn +5 lb and reset. A baseline ladder takes 18 exposures. Past four-set rows stay intact but do not earn the new exact-dose streak. Other Gym work and short add-ons do not accelerate it. |
| Gym abs | Hanging Knee Raise, Hanging Leg Raise, Reverse Crunch, Dead Bug, and Bicycle Crunch are actual Gym options alongside machines. Respect current Gym/bar availability, bodyweight zero, movement-specific reps, and explicit added load. Main Gym availability is separate from the home Calisthenics switches. |
| Class exercise focus | Optional class-appropriate exercise/body-area checkboxes and custom exercise text persist with actual class metrics, drafts, active/paused work, History, editing, and import/export. Empty or unknown focus retains the old prior rather than fabricating specificity. |
| Class model attribution | Recognized focus refines muscle/movement emphasis for local fatigue and bounded long-term development/volume evidence. Duration/effort/class type set the total dose; more checkboxes never multiply it. Class focus does not create actual lift sets/reps or direct progression successes. |
| Substitution prescription | Both the swap menu and direct Log picker, plus Gym/Cal/KB builders, recalculate sets/reps/load and relevant rest from the replacement movement and workout role. Preserve original planned metadata separately. Clear unrelated custom loads; unknown custom exercises require their own prescription. |
| Barbell order | Weighted Pull-up first, Squat second throughout generated plans and execution metadata. Past completed workouts retain their original rows/order. |
| Pull-up progression | Dedicated grip/load progression is separate from generic max updates. W6: Overhand +30 lb, 3×2. W7: Overhand +25 lb, 3×5. W9: Overhand +30 lb, 3×3. |
| Fixed program | Automatic recommendations do not move or replace barbell/KB/Base Building anchors. Explicit user moves and overrides are allowed and must retain their source prescription week. |
| Open-day choices | Need-driven, based on direct completed or projected work, recovery, tissue load, equipment, time, goals, and nearby commitments. Week boundaries do not reset fatigue or impose a rest quota. |
| Rare modes | Calisthenics and Strength-Endurance should appear less often, but remain practically reachable. No equal six-lane rotation and no mandatory weekly Cal/SE quota. |
| SE spacing | Automatic full SE primaries and secondaries avoid a full SE session on the prior day. A next-day explicit manual SE commitment also reserves the adjacent automatic day. Deliberate manual choices and the fixed Base Building template retain their authority; short SE is not treated as a full session. |
| Doubles | A two-workout day does **not** require Gym. Aerobic work can pair with different aerobic work, circuits/SE, Calisthenics, or KB when appropriate. Best full/Custom availability differs from the model advising an automatic double. |
| Secondary agreement | Recommended badge, automatic preview, and automatic calendar line use one resolved primary and secondary decision. If Recommended is None, automatic mode shows no secondary/action. Deliberate Best/Custom choices are labeled as user selections, not contradictory automatic advice. |
| Pairing location | Prefer useful primary/secondary combinations at the same place across families: gym equipment/cardio after Gym; feasible Cal/KB/outdoor cardio or swimming after home work. Infer venue from the actual/resolved primary and equipment; allow an inline Auto/Home/Gym override. Account for a location change in score and total time. Location is a preference, not a universal hard ban on cross-location choices. |
| Barbell extras | Automatic short/full secondaries remain off Barbell days. This latest preference supersedes archived v36.88/v36.119/v36.130 exceptions. Deliberate manual extra work remains possible. |
| KB primary extras | Preserve the stricter, rare easy-aerobic-double policy after a KB primary. KB being eligible as a secondary after another primary is a separate decision. |
| KB dose review | The user asked about exercise count, sets, and reps, and explicitly clarified that starting weights were not the concern. The current four-pattern A/B/C prescription remains a reasonable starting addition to the two Barbell days; its swing blocks are conservative conditioning supplements. Do not describe the exact adaptation as a research-validated optimum or add arbitrary baseline volume. |
| Weekday/weekend capacity | Weekends remain the preferred capacity window. Suitable open weekdays can earn short/full extras. Restore useful frequency through genuinely feasible choices, including a short aerobic alternative when strength work cannot fit. Compare actual combined time rather than requiring a blanket 75-minute budget; effort, recovery, hardware, overlap, spacing, and anchors remain decisive. No mandatory weekly secondary quota. |
| Running and swimming | Outdoor running has personal priority; treadmill is generally rare except travel/pinch. Pool access is normally available at home/gym except travel. Easy swimming has a low-toll prior; actual hard swim effort overrides it. |
| Duplicate cardio | Automatic/Best full advice complements actual primary activity. A completed swim excludes another swim, including variants. A run primary excludes another run variant from automatic full pairing. Custom remains available for a deliberate repeat. |
| Future preview | Assume intervening unfinished scheduled workouts occurred exactly as planned in a temporary forecast. Actual primary completion supersedes a forecast primary. A short/full secondary alone must not erase the scheduled primary. |
| Future surrounding days | Earlier manual workouts replace the hypothetical dose at their exact prescription. Upcoming commitments reserve their exact lane softly and protect anchors. A Sunday after the selected Saturday remains upcoming; it is not inserted as past completed work. |
| Generated future choices | A stored adaptive-recommended future snapshot remains revisable advice, even if its model/evidence stamp appears current. It cannot become an explicit user lock. Manual switches, custom plans, and actual completions remain authoritative. |
| History | Completed activity, actual metrics, session IDs, primary/full/short roles, and available timing govern attribution. A later planner recommendation cannot replace what was actually logged. |
| Manual/custom data | Preserve explicit future targets, saved routines, notes, recovery, measurements, active/paused workouts, and drafts. Do not silently replace a saved custom KB routine with the new presets. |
| Execution/UI | Inline controls for short choice sets; Log defaults to execution. Keep Barbell Forearm Curl and adding exercises after Start. Useful Gym/Cal work respects duration/equipment/quality ceilings; untimed core finishers remain outside selected duration. |
| Scope exclusions | No new within-workout automatic autoregulation or new weekly schedule optimizer. Existing rolling forecast/reflow, prospective fatigue, and weekend allocation are already part of the app and were repaired within that architecture. |
| Delivery | A GitHub delta ZIP contains new/modified paths at repository root, with nested `tests/` preserved. Keep other existing assets. Do not include the private export, browsers, dependency folders, or temporary analysis. |

## Latest request sequence and what was completed

The sequence below follows the user’s clarification order, not a guessed private-chat timestamp.

| Order | Request / decision | Result |
| ---: | --- | --- |
| 1 | Recover context from the actual repository history after repeated chat crashes. | Chronological code/document review, including duplicated uploads, bundled releases, stable module filenames, and the rollback. Full archive table below. |
| 2 | Slow startup/calendar; missing “outdated version” notification. | v36.140 progressive/cached rendering and repaired coherent-deployment updater. Local performance and PWA tests recorded below. |
| 3 | Cal/SE rare but not impossible; more optional work if the data permits. | v36.140 bounded long-gap re-entry credit and removal of date-lottery suppression; effort/recovery/time/anchor guards retained. |
| 4 | Weighted Pull-up before Squat in Tactical Barbell. | v36.140 generated plan, Log, and forecast ordering; historical rows preserved. |
| 5 | Actual swim followed by recommended swim; calendar sometimes shows different past activity. | v36.140 completed-primary identity, duplicate swim filtering, primary/full/short attribution, and completed-only history rendering. |
| 6 | Comprehensive chronological release/decision document for a replacement chat; explain changes since v139. | This standalone handoff plus repository copy, now maintained through v144, with the full archive and maintenance instructions. |
| 7 | SE, KB, and related work can be secondary sessions. | v36.141 expands complete secondary candidates and preserves family/style identity through loading, saving, effort, fatigue, and progression. |
| 8 | Re-research KB Power/Volume because the workouts felt assembled randomly. | Initial scope was clarified before finalizing implementation. |
| 9 | Research a coordinated three-day full-body KB muscle-building and conditioning regimen. | v36.141 uses one stable A/B/C program with purposeful exercises, rest, rep/load/round progression, hardware substitutions, and documented primary sources. |
| 10 | Retain the two barbell days and conditioning/open days inside that KB plan. | Existing seven-day hybrid placement retained. Standalone coach programs were adapted rather than layered at full volume. |
| 11 | Future dates should count intervening scheduled work as completed; manual changes affect surrounding days. | v36.141 exact prospective prescriptions, whole-pipeline forecast context, future commitment credit, and cache invalidation. |
| 12 | Distant previews lose variety and recommend the same thing each week. | v36.141 removes the 42-day cutoff, repairs later wrappers using live history, and prevents a weekend double preference from replacing a clearly stronger primary choice. Long-range audit and regressions included. |
| 13 | Two-workout days can be cardio + cardio, circuits, Calisthenics, running/swimming/biking; Gym is not required. | v36.141 supports complementary aerobic pairs as well as resistance/circuit pairs, evaluates total time and actual cost, and retains distinct activity identity in the picker and Log. |
| 14 | Remove Barbell Deadlift when the program switches to KB; slow Barbell Ab Crunch Machine progression substantially; the machine supports 5s. | v36.142 verifies the existing Hybrid Deadlift omission across all six wave weeks and future/moved-source prescriptions. Barbell ab progression gets a separate slower ladder and 5 lb hardware rounding. |
| 15 | Continue fixing the prior release: screenshots show back-to-back SE, disagreement about None, and poor primary/secondary location pairing. | v36.142 adds automatic full-SE spacing, revisable future generated choices, a shared resolved primary/secondary model, same-location scoring/equipment construction, transfer-time cost, and honest conditioning duration. Triples’ two circuits no longer become two minutes. |
| 16 | Explicitly confirm the card recommended None while a workout appeared below and in the calendar. | Automatic surfaces now use the same decision. None stops after the primary. A deliberate Best full/short choice is labeled Selected optional / Your choice and Selected in the calendar while the automatic badge remains truthful. |
| 17 | Much better, but now there are almost never secondary workouts. | v36.143 repairs infeasible weekend full reservations, incomplete package/cache context, an excessive blanket time floor, and missing easy aerobic short options on suitable open days. A matched 35-day preview increases secondary days from 6 to 11 while retaining no automatic Barbell extras and rare KB-primary doubles. |
| 18 | Do the KB days seem too easy for full-body conditioning and muscle building? Clarification: exercise count, sets, and reps, rather than weights; retain them if the research supports it. | Review documents eight weekly KB press sets, seven squat sets, seven row sets, and 170 initial swings alongside two Barbell days. Four compound patterns can be purposeful; the swing dose is modest. The exact recipe is an informed adaptation, with no direct completed KB evidence in the supplied export. Baseline doses remain unchanged; `KETTLEBELL_PROGRAM_REVIEW_v36.143.md` records the reasoning and primary sources. |
| 19 | Hanging leg and knee raises do not appear as abs options. | v36.144 adds both as actual Gym catalog/filter/picker/substitution/finisher options, preserving their Calisthenics identities and separating unsupported hanging from Captain's Chair. |
| 20 | Gym abs do not have to use a machine. | Adds Reverse Crunch, Dead Bug, and Bicycle Crunch; inline Bodyweight preference and correct zero-load progression allow hanging/floor core with actual availability checks. |
| 21 | Is 4×20 excessive for Barbell abs; add a checklist of exercises focused on in Pilates and other classes. | Caps Barbell abs at 3×20 with six comparable comfortable results per step and +5 lb/reset; optional class-specific exercise/body-area selections and custom text persist through logging and history. The cap is a hybrid-program design choice, not a claim that 4×20 is universally excessive. |
| 22 | Will fatigue and progression look at the specific body parts emphasized by the class? | Recognized focus changes the actual recent-fatigue fingerprint and bounded long-term muscle/development evidence, while duration/effort still control the class total. It cannot earn direct lift progression or invent actual class sets/reps. |
| 23 | When an exercise is substituted, recalculate sets, reps, and weights. | Both Log substitution paths and all three strength builders refresh movement-specific targets, equipment-supported load, and relevant rest, while keeping the original plan separate. SE retains circuit count with bounded reps for difficult variations. |

## Changes since v36.139

### v36.140 — reliability, actual history, and optional work

| Change | Reason and implementation decision |
| --- | --- |
| Progressive calendar resolution | Cold render repeatedly evaluated forecasts and discarded work. Completed days now read actual rows directly; remaining cards resolve progressively; stale navigation jobs are cancelled. |
| Dose/fitness memoization and work reduction | Repeated scoring reused the same immutable saved rows. Row-stimulus results are cached with copies returned to callers; model saves/import/context changes invalidate calculations. Discarded expensive secondary builds are avoided with a conservative score bound. |
| Update notification lifecycle | Visibility/focus/connectivity/worker events and visible periodic checks recheck deployment. The app prompts only for a coherent newer eleven-file bundle. Active/paused workouts defer the prompt; Later snoozes that build for 30 minutes. |
| Safe update action | Create a separately retained pre-update snapshot, wait for the new worker to activate, then reload. Backup/install failure keeps the current app open. The safety snapshot is separate from rotating routine snapshots. |
| Cal/SE long-gap value | Reduced preference plus overlap/anchor penalties could make these modes effectively unreachable. Full-session absence value ramps after 21 days and caps at 42 days; short work earns partial, decaying credit. These are scheduling parameters, not physiological laws or quotas. |
| Optional weekday work | Remove preselected-date/lottery hiding of viable shorts/fulls. Keep higher weekday thresholds (9/9.5/11.5), recovery/cost/time/equipment checks, and tighter KB spacing. Restore no automatic Barbell extras from the latest user preference. |
| Actual swim identity and complementary full advice | The screenshot’s completed 46.5-minute, 1260-yard, RPE-6.5 swim must drive the secondary guide. Automatic/Best full options exclude swim variants; Custom can deliberately repeat. Recommended may remain None while Best full builds a useful alternative. |
| Historical primary/full/short roles | Explicit full role takes precedence over legacy short flags. Saved IDs/times and available insertion fallback determine primary versus later work. Today/past secondary lines show logged completion rather than unfinished forecast suggestions. |
| Barbell ordering | Put Pull-up before Squat in the generated prescription itself, not just card presentation, so plan metadata and execution agree. Preserve waves, max review, dedicated pull-up loads, and deadlift placement. |
| Conditioning progression text | Apply bounded personal-trend target progression once; retain explicit manually saved targets. |
| Reproducible QA | Restore meaningful test scripts absent from the v139 archive. Historical QA counts are not claimed as newly executed tests. |

### v36.141 — complete KB program and secondary families

All three KB slots form a stable full-body A/B/C program. The legacy session keys `KB Heavy`, `KB Power`, and `KB Volume` remain to preserve history. Program details and research limits are reproduced later in this handoff and in `KETTLEBELL_RESEARCH_v36.141.md`.

| Change | Reason and implementation decision |
| --- | --- |
| Coordinated full-body presets | Repeat a press, squat, horizontal row, and swing on each KB day. A emphasizes lower-rep strength; B adds horizontal pressing and more conditioning; C uses controlled volume with fewer squat sets/rounds before Monday. Stop switching to unrelated exercises at each block boundary. |
| Integrated workload | Account for both barbell anchors when choosing KB dose. Three unchanged full standalone KB sessions plus TB and conditioning would ignore the source programs’ easier off-day assumptions. |
| Comparable-result progression | Two distinct comfortable full exposures in the same slot/exercise earn reps first, then an available bell with rep reset. Short add-ons do not earn full progression; true completed full secondaries can. Partial/missed or poor latest results block older successful results. |
| Swing progression | Keep ten quality reps; add one round after two comfortable exposures, then an available bell at the round ceiling and reset rounds. Avoid increasing every dose variable together. |
| Hardware/time | Use actual available discrete settings; one-bell equivalents preserve patterns. Full time-limited builds reduce sets/rounds while preserving all four patterns and rests, or decline if the minimum cannot fit. Manual routines retain their chosen exercises/doses. |
| All resistance/circuit secondary candidates | Gym, Calisthenics, SE, and KB A/B/C are complete candidates on suitable non-Barbell days. Short KB work is no longer phase-wide disabled on TB open days when hardware/preference permits it. |
| Complementary aerobic doubles | Different aerobic activities can form a two-workout day without Gym. Candidate need belongs to the second activity’s lane. Actual primary effort, shared load, time, equipment/environment, spacing, and next anchors still govern automatic advice. |
| Correct secondary model identity | SE stays SE; KB preserves its actual style instead of always becoming Heavy; the B floor press is modeled as moderate resistance work rather than the old easy-power prior. Completed rows are not rewritten. |
| Exact selection identity | Several aerobic options share `Conditioning`; their activity keys must remain distinct in ranking, picker buttons, and Log loading. Selecting a particular aerobic option loads that activity rather than the first generic Conditioning entry. |
| Secondary execution from edit mode | Opening a new full secondary clears an old primary edit mode and refreshes the tracker after changing Log date. Start is available and saving creates a new full secondary instead of editing the old primary. |

### v36.141 — future assumptions and distant variety

Three independent problems were found. First, prospective history stopped at 42 days. Second, projection wrapped only an earlier core scorer: later athletic, conditioning, weekend, and display layers could rebuild the choice from live history. Third, the weekend allocator could substitute a much lower-scoring Gym primary solely because that ordering made an optional double attractive.

The repair keeps sequential hypothetical planning but runs the complete final recommendation inside the forecast context, extends through the requested date, and gives future secondary/display surfaces the same context. Weekend capacity may break a close primary tie (within 2.5 score points, with a feasible secondary); it does not replace a clearly stronger primary need. This score band is an app decision, not a biological threshold. Weekend caches include model revision and prospective-history signature so manual changes re-rank them.

| Future scenario | Resulting behavior |
| --- | --- |
| Select Saturday two weeks away | Count earlier planned Thursday/Friday and all intervening scheduled work in temporary shadow history. Protect upcoming Sunday as an anchor/commitment. |
| Future Barbell wave | Project the actual wave sets, reps, loads, order, and source prescription week; do not replace every anchor with generic 3×5 names. |
| Future KB/manual strength | Project the actual chosen exercise rows, dose, loads, and rest. Custom same-type plans are manual constraints too. |
| Future conditioning | Project the planned activity, target duration, and target effort estimate. Upcoming manual choices reserve their exact lane softly. |
| Actual workout differs from forecast | The saved actual primary supersedes the projected primary. A logged secondary alone leaves the unfinished primary in the prospective schedule. |
| Change a manual workout or dose | Normal model invalidation resets forecast rows and relevant recommendation/secondary/weekend caches. Nearby automatic dates re-rank while the manual choice stays fixed. |
| View far beyond six weeks | Resolve through the requested date rather than forgetting intervening work at an arbitrary horizon. Cache incremental projection and bounded fully resolved recommendations. |
| Save/export after previewing | Temporary rows never append to the real training log. Future assumptions are a preview, not evidence that an unperformed workout really happened. |

Recurring useful workout families remain possible. The fix addresses stale/static repetition; it does not enforce random variation, an equal modality rotation, or guaranteed Cal/SE frequency. Farther projections are increasingly conditional on the assumption that the scheduled work and estimated effort were followed.

### v36.142 — Barbell accessories and consistent, practical secondary advice

The continuation began with Deadlift/ab-machine requests, then expanded after the user showed Saturday/Sunday SE, inconsistent None advice, and pairings that ignored where the primary workout occurred. The release addresses the combined request rather than treating the later screenshots as a replacement for the original changes.

| Change | Reason and implementation decision |
| --- | --- |
| KB-phase Deadlift verification | `getTBPlan` already restricted Deadlift to TB-only Monday/Friday. Retain that rule; test all days in six Hybrid wave weeks, future shadow rows, and explicit moved-source prescriptions. Do not claim a new removal from a standard Hybrid plan that already omitted it. TB-only Deadlift remains one work set Monday/Friday. |
| Slower Barbell Ab Crunch Machine | Keep the existing 3×15 → 3×18 → 3×20 → 4×15 → 4×18 → 4×20 volume ladder, but require three consecutive comfortable completed exposures at the exact current load/sets/reps for each volume step, then four at the top before +5 lb and a reset. A clean base-to-first-load progression takes 19 comparable exposures, versus the previous six-exposure/+10 lb ladder. |
| Evidence for ab progression | Use direct Barbell ab results within 42 days, one credit per date, successful completion/quality, no pain, and known comfortable effort at RPE ≤8. Duplicate rows/same-day sessions, other Gym work, and short secondaries do not earn extra credit. A latest skip/partial/hard result interrupts older success; existing backoff and recovery holds apply. Preserve historical 65 lb entries and the ordinary Gym finisher’s existing progression policy. |
| 5 lb hardware | Set the machine’s exercise increment to 5 lb and use that common increment for ab/SE machine load rounding. No rewrite of saved weights. This is the user’s hardware constraint. |
| One resolved primary for automatic secondary advice | Secondary matrix state first uses the completed actual primary, otherwise the forecast-resolved expected primary. Calendar and detail no longer compute secondary advice against different stale primary session types. Expected-session memo keys include forecast context; transient dependency probes are not canonical UI answers. |
| Future generated advice remains advice | Recommendation snapshot model version becomes 8. Future adaptive-recommended snapshots do not lock the displayed session. Explicit manual switches/custom choices remain fixed. The old pair of generated SE selections can reflow around prospective history. |
| Automatic full-SE spacing | Check prior-day actual/projected full SE before automatic primary or full-secondary selection; reserve an explicit next-day manual SE. Short SE does not fabricate a full-session lock. Manual choices and fixed Base Building programming remain available. This is an app scheduling policy. |
| Location applies across workout families | Infer home/gym/either from primary identity, actual rows, exercise equipment, cardio modality, and date context. Same location adds 3 score points; a location change subtracts 6 and adds an estimated 15 minutes to the shared time budget. Unknown venue has no bonus. These are convenience estimates, not measured travel or physiological thresholds. |
| Use equipment where the primary occurs | Gym primaries expose stationary bike/row machine/elliptical/stair options and gym short work. Home primaries expose portable/home Cal/KB equipment and outdoor cardio or accessible swimming; home SE builds without gym-only machines. An explicit inline Auto/Home/Gym choice handles ambiguous cases and feeds the context summary. Stronger needs can still justify a feasible different-location full choice. |
| Honest conditioning duration | Parse only numbers explicitly attached to minute units. Circuit counts, interval distances, and seconds are not minutes. Triples’ two circuits are estimated as 60 minutes; full automatic aerobic secondary candidates use complete single-activity sessions rather than a misleading two-minute Triples entry. Forecasts retain the midpoint of a real minute range. |
| Clear optional selection | Recommended None renders No secondary without an automatic Start action. Best full/short remain deliberate options, explicitly labeled Selected optional / Your choice in the preview and Selected in the calendar. The badge still describes the underlying automatic recommendation. |

New `tests/barbell-qa.js` and `tests/secondary-logic-qa.js` join the existing runnable suite. The checks reproduce screenshot-relevant conditions synthetically over the supplied export; no new full export or phone runtime was supplied. The prepared release is not proof of a completed deployment. Exact current coverage and limits appear below and in `QA_REPORT_v36.142.md`.

### v36.143 — useful secondary opportunities and KB volume review

The user accepted the consistency/location improvements but found that automatic secondaries had become too scarce. The correction repairs opportunity selection within the existing rolling planner. It retains the no-Barbell-extra preference, stricter KB-primary policy, full-SE spacing, actual effort, equipment/location, shared time, manual commitments, and completed-history protection.

| Change | Reason and implementation decision |
| --- | --- |
| Build a feasible weekend package | The cheap allocator could reserve a full extra before the real build cleared feasibility, then suppress the short choice when that full failed. The package now evaluates actual complete candidates against real short options after the resolved primary. The forecast bridge, automatic card, calendar, and weekday edge guard use that feasible package. |
| Preserve recommendation context in caches | Include forecast-history signature, requested date, and the resolved primary's dose/effort in the weekend cache. A growing temporary forecast or a harder/longer resolved primary cannot reuse old advice. Nested weekend resolution is a dependency probe and is not memoized as a canonical primary. Open-day model version advances to 9. |
| Use the actual shared time | Remove the separate 75-minute minimum. Complete builds still have to fit primary + secondary + five minutes of transition + any modeled location transfer. A genuine 25 + 30 + 5-minute pair can fit a 65-minute budget; a 50-minute primary with only ten minutes remaining can earn a short instead. |
| Calibrate open weekdays | Lower the normal automatic full score threshold from 9/9.5 to 7 for Conditioning/Gym and 7.5 for other eligible non-KB families. Keep KB at 11.5 and retain its longer full-double spacing. These are scheduling parameters, not scientific constants. Weekday spacing and actual double history still apply. |
| Add a useful short aerobic alternative | When the existing resistance short cannot fit, suitable open Conditioning/Gym/Cal/SE days can earn ten to twenty easy minutes in a complementary available aerobic lane. Gym uses local cardio/pool; home uses available swimming/outdoor cardio. Dose shrinks for the primary, tomorrow's anchor, and remaining time. It does not add an automatic Barbell/KB short fallback. |
| Keep short-work boundaries | Automatic choices still decline for recovery guard/caution, severe or very hard primary effort, insufficient time, hardware/environment limits, or two completed full sessions. A recent full double prevents another automatic short the following day. Explicit skipped secondaries remain skipped. Explicit full roles are counted correctly despite old short metadata. |
| Review KB dose rather than inflate it | Preserve A/B/C and comparable-result progression. The question concerned counts and reps. Document the combined week, pattern-specific volume, conservative swing conditioning, and the limits of the research adaptation. The review does not claim the current baseline is optimal for every muscle or this user's unobserved response. |

In the same export-seeded October 3–November 6 preview, frozen at October 2 at 21:00 Phoenix, v36.142 advised two shorts and four fulls; v36.143 advised four shorts and seven fulls. Barbell extras stayed zero; KB-primary extras changed from one to zero; other eligible-primary extras rose from five to eleven. These are conditional previews at one state, not logged sessions or a promised weekly frequency. Real logs stayed byte-for-byte unchanged and no page errors occurred. The new 29-check frequency/feasibility suite and current evidence are detailed in `QA_REPORT_v36.143.md`.

## Chronology evidence and interpretation

The archive follows Git ancestry and upload time, oldest first. Code diffs, embedded build/cache markers, original ZIP contents, archived release/research reports, and visible/recovered user decisions were compared. A code change establishes what changed; explicit notes/comments/requests establish intent where available. Other purposes are implementation inferences, and unknown motives remain unknown.

Git timestamps establish public upload/commit time, not private chat generation time. Bundled releases and missing standalone states cannot be reconstructed exactly. Documentation uploaded later does not move the feature’s original implementation date.

- The first ZIP already contained the original app. Its HTML matches the next root upload byte-for-byte; that root upload made it directly hostable.
- Build labels were sometimes stale or split across uploads. v36.91/v36.92 appear together; v36.101 arrives in two uploads.
- The displayed v36.119 covers twelve substantive archived uploads plus a duplicate. Treat them as separate chronological events.
- September 27 includes **134 → 135 → 136 → runtime rollback to 134 → 137**. The rollback matches the earlier runtime; its motive is not recorded.
- The older historical audit mentions unmerged local refs unavailable in this clone. They are not additional reachable GitHub branches here.
- Filenames such as `app-shell-v36.119.js`, `actual-load-feedback-v36.126.js`, and `forecast-balance-v36.127.js` are stable module identities, updated in later app builds. The suffix is not proof of current runtime content.

### v36.144 — bodyweight Gym abs, capped Barbell accessories, class focus, and substitutes

The scope grew from missing hanging abs to Gym bodyweight alternatives, Barbell ab volume, class exercise focus, model attribution, and prescription recalculation. All changes are cumulative; KB baseline doses remain unchanged.

| Change | Reason and implementation decision |
| --- | --- |
| Gym bodyweight core | Add Hanging Knee Raise, Hanging Leg Raise, Reverse Crunch, Dead Bug, and Bicycle Crunch. Reuse existing Calisthenics identity/history; expose Bodyweight equipment preference. Respect current Gym availability and bar constraints. Preserve zero external load through hardware rounding and successful history; added resistance remains an explicit option. Harder leg raises use a smaller rep window. |
| Three-set Barbell ab cap | Replace the old six-volume-stage ladder with 3×15 → 3×18 → 3×20. Six consecutive comfortable exact-dose/load Barbell dates per stage keep the load progression slow; the first +5 lb needs 18 clean exposures, compared with the previous 19. Historical four-set results remain recorded, map to the three-set recommendation, and do not earn the new exact-dose streak. Other quality/comparability/recovery exclusions remain. Ordinary Gym machine-abs policy stays separate. |
| Class checklist and persistence | Known classes show relevant exercise suggestions, additional body areas, and custom exercise text on the actual log card. Store `metrics.classFocusExercises` and `metrics.classFocusOther`; preserve multiple checks in drafts rather than treating them as a single checkbox field. Restore active/paused work and completed editing; retain unknown saved selections. History displays focus; import validates and preserves the arrays/text. |
| Muscle-specific class model | Blend 25% class baseline with 75% mean recognized exercise/body-area emphasis for muscles and movements. Keep overall conditioning, strength, and hypertrophy class evidence bounded by actual duration, effort, and the class prior. Local fatigue and long-term muscle/development evidence differ for core-heavy versus leg-heavy classes. Empty/unknown focus retains the old prior. This is a qualitative app policy, not an exact per-exercise dose estimate. |
| Consistent substitute targets | The existing swap menu already recalculated most prescriptions, but direct exercise changes in Log/builders could leave old fields. Route direct Log changes through the same prescription logic; respect a programmed wave/circuit/core role and replacement history. Recalculate Gym/Cal sets/reps/load/rest; clear old KB manual load and display a fresh adaptive target. Unknown custom movements cannot inherit unrelated targets. Preserve original planned metadata separately. |
| Recommendation stamp | Advance the model version to 10 so stored generated advice refreshes; do not turn this into a manual-commitment override. |

The exact three-set cap and six-result gates are design choices for the complete hybrid week, not research-established optima. General primary-source context is [ACSM's March 17, 2026 resistance-training guidance](https://acsm.org/resistance-training-guidelines-update-2026/) and the [ACE abs exercise library](https://www.acefitness.org/resources/everyone/exercise-library/body-part/abs/). Neither source proves that 4×20 is universally excessive or validates this exact app ladder.

The release passes 394 static/export-seeded checks and an additional 84 empty-history browser/PWA checks. The 27 class checks exercise both the real recent-fatigue and long-term muscle model, actual Start/Pause/Complete flow, drafts, History/editing, and import normalization. New Gym/core and substitution scenarios are recorded in `QA_REPORT_v36.144.md`. The phone-width checklist and Gym bodyweight catalog were visually inspected. Prior v36.143 matched-preview counts are historical; they were not re-measured for v36.144.

## Every archived commit, in actual order

Every row links to its immutable GitHub commit. Bundled labels describe the changes present together in that archived state; they do not invent missing standalone releases.

### Foundation and fixed-program expansion

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [1 · 9a4d93d](https://github.com/wmadson29-creator/Hybrid-Training/commit/9a4d93d0f9409f6ed8317e1a6d9ca7b1ea237ed8) | 2026-08-26 12:10 | Initialization | Repository README initialized. | Create the repository; no application behavior existed at the root yet. |
| [2 · 8f96014](https://github.com/wmadson29-creator/Hybrid-Training/commit/8f96014e41d021eb6d6bc6c2bcd5683f4069a7cd) | 2026-08-26 12:14 | Original PWA / cache v1 | First app delivered inside the phone-setup ZIP with root PWA assets. | Provide a phone-installable app with stable-origin autosave and portable backups for the initial Barbell/KB program. |
| [3 · 3fbef78](https://github.com/wmadson29-creator/Hybrid-Training/commit/3fbef78be45cd0849cfd9f18b65cdae40a948dee) | 2026-08-26 12:22 | Original PWA / root HTML | Original ZIP app exposed as root index.html; packaged and root HTML are byte-identical. | Expose the already-packaged app at the repository root for hosting. The HTML matches the original ZIP exactly; this was not a new dashboard feature set. |
| [4 · d4f2d84](https://github.com/wmadson29-creator/Hybrid-Training/commit/d4f2d84341754ceca952b623845ddf6dac8714aa) | 2026-08-26 13:07 | Early original app | Date-specific conditioning overrides and library selection. | Let a chosen conditioning workout replace the default on a particular date without rewriting the program. |
| [5 · 8f5fc96](https://github.com/wmadson29-creator/Hybrid-Training/commit/8f5fc963b6bf5991076d9261fdd9fe2e7cf35a18) | 2026-08-26 13:11 | Duplicate upload | No change: entire repository tree is byte-identical to its parent. | No rationale to reconstruct: the entire tree is identical to the parent. |
| [6 · a8de0c6](https://github.com/wmadson29-creator/Hybrid-Training/commit/a8de0c6f36f4e7e9288599c5336c321b76de1eb8) | 2026-08-26 14:12 | v5 | Adaptive kettlebell and conditioning choices, Barbell Strength maxes, and block review introduced. | Replace static conditioning/KB choices with history-aware decisions, extend six-week blocks indefinitely, and review Barbell maxes only at block boundaries. |
| [7 · 9b80031](https://github.com/wmadson29-creator/Hybrid-Training/commit/9b80031cc16eb5451d1eed05b38bb014af5887c0) | 2026-08-26 14:51 | v6 | Gym builder and class/activity support introduced. | Support ordinary gym workouts and classes around the fixed program, using available equipment and relevant exercise history. |
| [8 · 10e045e](https://github.com/wmadson29-creator/Hybrid-Training/commit/10e045ebc57d00e4791ab62ad82e8ba5661e6a76) | 2026-08-26 15:47 | v8 | Calisthenics, exercise relationships, recovery-week/block-review logic, and guided builders consolidated. | Add portable bodyweight training and guided builders while keeping selected muscle groups strict and block transitions deliberate. |
| [9 · 41e1b3b](https://github.com/wmadson29-creator/Hybrid-Training/commit/41e1b3b33dc8437abd517047a0ddf180bf4d2fa2) | 2026-08-26 15:53 | v8.1 | Mobile layout and navigation overhaul. | Make builders, exercise instructions, navigation, and data entry readable on a phone. |
| [10 · 0a95ccd](https://github.com/wmadson29-creator/Hybrid-Training/commit/0a95ccdc7550aa665b5af155655d07d514fd9957) | 2026-08-26 16:11 | v8.2 | Dashboard density and small-screen interaction cleanup. | Reduce wasted phone space and fragile implicit DOM bindings without discarding useful detail. |
| [11 · db08cc6](https://github.com/wmadson29-creator/Hybrid-Training/commit/db08cc6cc9cae6806eef2507369eb9d37780e1f4) | 2026-08-26 16:18 | v8.3 | Skipped/missed exercise semantics and logging behavior refined. | A skipped exercise must not count as completed work or progression evidence. |
| [12 · be39513](https://github.com/wmadson29-creator/Hybrid-Training/commit/be395130760580a2e0a23aad61b3e6a74225ae27) | 2026-08-26 18:02 | v9 | Helio/recovery inputs connected to planning context. | Let entered Helio/recovery and wearable session data inform planning instead of remaining disconnected reference fields. |
| [13 · 3500736](https://github.com/wmadson29-creator/Hybrid-Training/commit/350073600f0d87b66c6dac5328fe0fc50cb16ecb) | 2026-08-26 18:21 | v10 | Draft persistence and workout autosave foundation. | Preserve work in progress through navigation or interruption, including builder and recovery forms. |
| [14 · 13c30b9](https://github.com/wmadson29-creator/Hybrid-Training/commit/13c30b9edce2a1a19efd8b0b53412ac7b0a2273c) | 2026-08-26 18:23 | v10 / duplicate | No change: entire repository tree is byte-identical to its parent. | No tree change; duplicate upload. |
| [15 · 1dd3809](https://github.com/wmadson29-creator/Hybrid-Training/commit/1dd3809a45ccf6e3b1ff5805a319db27562e3c2a) | 2026-08-26 18:27 | v10.1 | Draft restoration and log-state continuity improved. | Return to the same screen and draft after refresh. |
| [16 · ecd3ac8](https://github.com/wmadson29-creator/Hybrid-Training/commit/ecd3ac82d1ac6a9f7749393d1641102850ac9b23) | 2026-08-26 18:30 | v10.2 | Additional autosave/restore safeguards. | Restore navigation before heavier draft reconstruction so malformed optional drafts cannot hide the chosen screen. |
| [17 · 767519c](https://github.com/wmadson29-creator/Hybrid-Training/commit/767519c58e335da003fe8928fcb5ed7e39916a95) | 2026-08-26 18:36 | v10.3 | Log workspace recovery and view restoration hardened. | Ensure the Log workspace reconstructs a complete scheduled form after refresh. |
| [18 · ab98992](https://github.com/wmadson29-creator/Hybrid-Training/commit/ab98992f2b89edcbb33412e2f267c8ad3cb66804) | 2026-08-26 18:47 | v12 | Native data-safety/recovery journal and backup protections added. | Protect saved recovery independently from generic state writes and provide explicit emergency backup/recovery tools. |
| [19 · 817064f](https://github.com/wmadson29-creator/Hybrid-Training/commit/817064f2b274a47d3d1cfa3ee02103240e14c190) | 2026-08-26 18:56 | v12 / duplicate | No change: entire repository tree is byte-identical to its parent. | No tree change; duplicate upload. |
| [20 · 182688e](https://github.com/wmadson29-creator/Hybrid-Training/commit/182688ef534b17f9e5050cecbc19b3058d09834d) | 2026-08-26 19:12 | v13.1 | Plate/loading visuals and refresh/root-DOM validation fixes consolidated. | Show actual plate loading and prevent missing or invalid root/workspace state from producing a blank refreshed app. |
| [21 · ccfa1ae](https://github.com/wmadson29-creator/Hybrid-Training/commit/ccfa1ae2198dedf5cbc7521af736bfcb5e8800c7) | 2026-08-26 19:59 | v15 | Editing completed sessions in History added. | Allow deliberate correction of completed workouts while ensuring successful saves do not depend on unrelated dashboard rendering. |
| [22 · ae0c874](https://github.com/wmadson29-creator/Hybrid-Training/commit/ae0c874b27ad6734f245d3bc7d1f0553ae4e377a) | 2026-08-26 20:05 | v16 | Complete-workout flow and event binding made more robust. | Make finishing a workout produce a dependable saved-session state and a usable next-workout landing. |
| [23 · 6ad3475](https://github.com/wmadson29-creator/Hybrid-Training/commit/6ad34754f1727c9f010d50f9acfb798cd9a0eaaa) | 2026-08-26 20:24 | v17 | Completion/save behavior and duplicate-binding defenses refined. | Bind the primary completion action early and prevent duplicate handlers or restore ordering from breaking it. |
| [24 · b97625b](https://github.com/wmadson29-creator/Hybrid-Training/commit/b97625b7fcf73ab6e9460367467a8315b1ddf64a) | 2026-08-26 20:57 | v18 | Hard conditioning stopped being automatically removed merely because recovery was cautious. | A hard but completed Barbell day should cause caution rather than automatically removing the next hard conditioning opportunity. |
| [25 · 61f0c83](https://github.com/wmadson29-creator/Hybrid-Training/commit/61f0c83b2542c812f3488e9f04826930e7b3cb23) | 2026-08-26 22:41 | v19 | Duration-aware, more diverse gym-workout generation. | Fill requested gym time with useful, diverse work rather than repeated implement variants or inflated rest estimates. |
| [26 · 9845132](https://github.com/wmadson29-creator/Hybrid-Training/commit/984513274e0b5518a49d3998393ef17f291a183a) | 2026-08-27 18:25 | v20 | Conditioning swap helper and alternative-session flow. | Offer similar/easier/harder one-day conditioning alternatives that retain the same broad training purpose. |

### Unified load, intent, and rolling scheduling

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [27 · 4bd2b8a](https://github.com/wmadson29-creator/Hybrid-Training/commit/4bd2b8a8ccaf5c378622d411ae7946039d412f7e) | 2026-08-27 23:01 | v26 | Duration/schedule/pause/settings/anchor behavior received a large hardening pass. | Honor requested durations, protect timeline anchors/pause accounting, and validate imported state instead of letting settings or bad data shift the program. |
| [28 · 3c197ef](https://github.com/wmadson29-creator/Hybrid-Training/commit/3c197efbd1df31ffa74c4f04f0cec04004c7d4ae) | 2026-08-27 23:39 | v27 | Unified training-load, fatigue, trends, and rest model introduced. | Use one coherent interpretation of exercise relationships, training stress, fatigue, rest, and trends across workout families. |
| [29 · 43b90b5](https://github.com/wmadson29-creator/Hybrid-Training/commit/43b90b5c15aead65d381ae455c1781b152ebc494) | 2026-08-28 00:20 | v28 | Planned-versus-actual intent and custom workouts added. | Separate the originally planned session from the workout the user chooses and actually performs. |
| [30 · 65e9094](https://github.com/wmadson29-creator/Hybrid-Training/commit/65e90943430b86b772419118adc3b94e3b519a8e) | 2026-08-28 00:32 | v29 | Barbell Strength invariant fixed: deadlift is exactly one work set Monday/Friday in Strength-only blocks, absent Wednesday and hybrid blocks. | Enforce the corrected deadlift prescription: one work set Monday/Friday in Barbell-only blocks, none Wednesday or in Hybrid. |
| [31 · 7db1e34](https://github.com/wmadson29-creator/Hybrid-Training/commit/7db1e3474bef5515b106197bec01b39077cdffda) | 2026-08-28 16:40 | v31 | Advanced calibration, counterfactual checks, and deload logic added. | Learn capability, effort, recovery, dose response, and future interference from comparable history while retaining confidence gates and actual set detail. |
| [32 · af9ba8f](https://github.com/wmadson29-creator/Hybrid-Training/commit/af9ba8f38d9449a53c88fc6225d0ef7c0bfba788) | 2026-08-28 16:52 | v32 | Log state made more authoritative across navigation. | An untouched old Log workspace is navigation state; today’s authoritative calendar should rebuild it while protecting real unsaved work. |
| [33 · e460d21](https://github.com/wmadson29-creator/Hybrid-Training/commit/e460d21e59d623f97dd6c0775ca488e17e222eba) | 2026-08-28 17:00 | v33 | Additional state-authority and restore corrections. | Changing a date/session selector alone must not keep yesterday’s workout open or overwrite today’s recommendation. |
| [34 · 9d10b92](https://github.com/wmadson29-creator/Hybrid-Training/commit/9d10b92e8e5abff1fb40addc1a0eb9aad75d6c0d) | 2026-08-29 00:01 | v34 | Exercise/activity substitution and multi-movement conditioning introduced. | Represent substitutes and mixed conditioning by the movements actually performed, including component effort and local load. |
| [35 · 57c5286](https://github.com/wmadson29-creator/Hybrid-Training/commit/57c52863309eaaeb62bc36e0843a722c9a786c60) | 2026-08-29 02:05 | v35 / early v36 | Mobile substitution flow and editable multi-movement conditioning; cache and older embedded labels disagree. | Make substitution selection practical on mobile and allow manual multi-movement conditioning details. |
| [36 · 40af975](https://github.com/wmadson29-creator/Hybrid-Training/commit/40af975eeae96c5a101789897183fd678a99f3fd) | 2026-08-29 02:06 | Early v36 / later v36.2 stream | Small history/recovery editing presentation follow-up. | Improve completed-history/recovery editing presentation; this small follow-up did not establish a clean independent version label. |
| [37 · 85cf556](https://github.com/wmadson29-creator/Hybrid-Training/commit/85cf5566cd0eec17eab07a99dab5d23d8fb9dbcd) | 2026-08-29 02:27 | v36.2 stream | Date-specific History recovery editing plus v36.2 read-me; cache still uses v36. | Make recovery edits date-specific and visibly accessible, overwriting that day’s entry rather than adding duplicates. |
| [38 · 06c5b81](https://github.com/wmadson29-creator/Hybrid-Training/commit/06c5b81022c95cf9ca2449d8bd62cf09f1b3a2d3) | 2026-08-29 02:38 | v36.3 | Calisthenics duration now respects the chosen time and stress budget. | A selected calisthenics duration is a real programming constraint; only a genuine Recovery Guard may intentionally shorten it. |
| [39 · 4da2b4f](https://github.com/wmadson29-creator/Hybrid-Training/commit/4da2b4f2985f2ef54a3bc10ec74fda718ad885d4) | 2026-08-29 15:36 | v36.4 | Rest-day override and authoritative adaptive-plan tracking. | Overriding rest should produce a concrete adaptive workout, while untouched prescriptions continue to respond to new evidence. |
| [40 · 07ad781](https://github.com/wmadson29-creator/Hybrid-Training/commit/07ad7811d51d097a35e21208e1eb45722b61ce9d) | 2026-08-29 19:52 | v36.5–36.6 bundled | Adaptive mode switching and advance class scheduling; embedded older label remains v36.4, cache moves to v36.6. | Allow inline switching among recommended flexible modes and make scheduled classes real commitments: additive on anchors, replacing open/rest work otherwise. |
| [41 · d6f09ec](https://github.com/wmadson29-creator/Hybrid-Training/commit/d6f09ec5ed54e0977f9ed8501d5ae9b51a1a18d2) | 2026-08-29 20:04 | v36.7 | Default ab-machine finisher introduced. | Add the requested default Ab Crunch Machine finisher after fixed Barbell work. |
| [42 · 15a917c](https://github.com/wmadson29-creator/Hybrid-Training/commit/15a917c6e3cd190cb96b3a355d064b7454ebd04d) | 2026-08-29 20:10 | v36.8 | Ab work moved to independent double progression. | Progress the ab accessory by exposure, reps/sets, then load independently from the six-week Barbell wave. |
| [43 · 8b04263](https://github.com/wmadson29-creator/Hybrid-Training/commit/8b042633fa5373b82e8e652e048eff788344107b) | 2026-08-29 20:23 | v36.9 | Universal untimed core-finisher behavior. | Provide an additional core finisher after every Gym/Calisthenics workout, outside the requested timed portion. |
| [44 · 82b0559](https://github.com/wmadson29-creator/Hybrid-Training/commit/82b0559510bd5abe361529b78777035c4f22a8a5) | 2026-08-30 01:54 | v36.10 | Conditioning modalities and controlled variation broadened. | Broaden useful conditioning choices and allow small variation among comparably suitable bodyweight movements. |
| [45 · 939dfe1](https://github.com/wmadson29-creator/Hybrid-Training/commit/939dfe1df7e0c45c38f818481d667fc6c7128385) | 2026-08-30 11:06 | v36.12 | Import/delete safety and explicit adaptive-switch authority. | Keep explicit switches authoritative and prevent automatic recovery from resurrecting intentionally deleted or replaced data. |
| [46 · ab1e50c](https://github.com/wmadson29-creator/Hybrid-Training/commit/ab1e50c1ad52779bc95132529e2cc669d53aa7c9) | 2026-08-30 16:41 | v36.15 | Double-progression and calendar-scroll corrections. | Own repetitions before adding weight, and stop calendar scrolling from shifting the entire Android page. |
| [47 · ac896c6](https://github.com/wmadson29-creator/Hybrid-Training/commit/ac896c61a1e87461e0967ff90615c116f9eea87d) | 2026-08-30 22:35 | v36.16 | RPE tracking and workout-start safeguards. | Distinguish actual effort from planned effort, preserve tracking-start boundaries, and calibrate clearly underloaded early exposures faster. |
| [48 · 2caf885](https://github.com/wmadson29-creator/Hybrid-Training/commit/2caf885c66470730226696c27405e3bc81eea889) | 2026-08-31 08:33 | v36.17 | Research-informed exercise order, rest, and duration logic. | Use exercise purpose to choose order, rest, and realistic duration across Gym and Calisthenics. |
| [49 · bbfaaf3](https://github.com/wmadson29-creator/Hybrid-Training/commit/bbfaaf35256f74ec76dd3a89f988051c147f0b23) | 2026-08-31 09:22 | v36.18 | Log-card UX and plate-loaded-machine distinction. | Clarify workout cards and distinguish selectorized stations from plate-loaded machines. |
| [50 · e5c8fde](https://github.com/wmadson29-creator/Hybrid-Training/commit/e5c8fde1a0805794883e8e2a21a1c8093249493f) | 2026-08-31 23:25 | v36.20 | Base Building mode added and isolated from ordinary adaptive scheduling. | Provide a separate fixed Base Building template whose own progression/dose cannot be rewritten by the ordinary adaptive scheduler. |
| [51 · 655ce6f](https://github.com/wmadson29-creator/Hybrid-Training/commit/655ce6fc1fac0ec934af349ab8bea6f75b6d6388) | 2026-08-31 23:50 | v36.21 | Rolling seven-day cadence replaced weekly-reset/rest-quota behavior. | Training stress and opportunity do not reset on Monday; fixed anchors stay fixed while other dates are re-scored from rolling history. |
| [52 · 4b6f406](https://github.com/wmadson29-creator/Hybrid-Training/commit/4b6f406139d0285445548272af7c5a2ce516d6f4) | 2026-09-01 01:01 | v36.24 | Manual anchor moves and program pause added. | Permit deliberate one-off anchor moves and program pauses without changing the original week/day prescription or losing real drafts. |
| [53 · 39d5273](https://github.com/wmadson29-creator/Hybrid-Training/commit/39d52738681adda49f972eaceb8aed09f4e2d362) | 2026-09-01 01:21 | v36.26 | Strength credit separated from fatigue for drills and mobility. | Mobility/activation must not satisfy strength need as though it were a hard compound exercise; small accessory groups such as calves should not dominate. |
| [54 · 54d63fe](https://github.com/wmadson29-creator/Hybrid-Training/commit/54d63fe328c33dedefc01cb5138864ee1a1ce220) | 2026-09-01 01:28 | v36.27 | Label/cache cleanup. | Keep displayed labels and cached assets coherent after the preceding changes. |
| [55 · 423a4e2](https://github.com/wmadson29-creator/Hybrid-Training/commit/423a4e294b9a4386f8f1a0f1477eacbfc4add17c) | 2026-09-01 02:01 | v36.27 / duplicate | No change: entire repository tree is byte-identical to its parent. | No tree change; duplicate upload. |
| [56 · 7618aca](https://github.com/wmadson29-creator/Hybrid-Training/commit/7618aca9534acf6646f2ef281410d3ebda773012) | 2026-09-01 09:04 | v36.28 | Future shadow forecast; running and treadmill running share a frequency family. | Future dates should see earlier projected training without pretending that forecasted work has actually been completed. |
| [57 · 379e157](https://github.com/wmadson29-creator/Hybrid-Training/commit/379e157545f735a82d675d140c133d2eeebcb2cf) | 2026-09-03 00:04 | v36.28 / duplicate | No change: entire repository tree is byte-identical to its parent. | No tree change; duplicate upload. |
| [58 · 40af814](https://github.com/wmadson29-creator/Hybrid-Training/commit/40af81427946a5ec1cd4ab22df16cb45734b92d0) | 2026-09-03 00:39 | v36.31 | Recommendation feedback, explicit step handling, and bodyweight context. | Learn cautiously from recommendation feedback and add activity/bodyweight context. Later versions superseded its estimated workout-step credit. |

### Longitudinal context and exercise quality

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [59 · 3041e02](https://github.com/wmadson29-creator/Hybrid-Training/commit/3041e02f0de71794aeb8cc3a766090af30da7ca8) | 2026-09-04 00:55 | v36.36 | Longitudinal bodyweight, cardio, and recovery interpretation expanded. | Use bodyweight, environment, cardio output, recovery, and performance trajectories together rather than reacting to one noisy value. |
| [60 · 9c8167b](https://github.com/wmadson29-creator/Hybrid-Training/commit/9c8167b88569363688a691ee417ecf04b1f1c59e) | 2026-09-04 11:22 | v36.39 | Multi-horizon hybrid adaptation and progress views. | Separate short-term fatigue-sensitive direction from six-week and longer adaptation, with honest coverage and noise gates. |
| [61 · 204b378](https://github.com/wmadson29-creator/Hybrid-Training/commit/204b3787bad1b185686afe3db1f445ad1a60ca65) | 2026-09-04 11:37 | v36.40 | Bottom-navigation opacity and semantic-color alias correction. | Make bottom navigation reliably opaque and readable over page content. |
| [62 · 31c1e61](https://github.com/wmadson29-creator/Hybrid-Training/commit/31c1e61ad9f15dbe3a21c6add12f6edea1ec08fa) | 2026-09-04 22:39 | v36.41 | Immediate block review and short focus interludes. | Show review immediately after the final fixed workout and support deliberate short focus interludes between program blocks. |
| [63 · 863aea9](https://github.com/wmadson29-creator/Hybrid-Training/commit/863aea914b8c17fd5baf98d2e1ea059c5442b381) | 2026-09-06 01:39 | v36.42–36.43 bundled | Calisthenics evidence graph/equipment/mastery overhaul, guided Log builder, and core/focus balance. | Keep calisthenics task-specific, require real equipment and repeated mastery, prevent core from crowding mixed sessions, and expose guided building in Log. |
| [64 · ed9b0d7](https://github.com/wmadson29-creator/Hybrid-Training/commit/ed9b0d7e05d67e18c8d6218203519d5bb25159ad) | 2026-09-06 09:01 | v36.44 | Multimodal research priors integrated. | Use directional, capped research priors across Gym, KB, conditioning, and classes; shared muscles or elevated HR are not proof of identical performance. |
| [65 · 5584db3](https://github.com/wmadson29-creator/Hybrid-Training/commit/5584db33ccda974000e277cd2cd3a5f53913da95) | 2026-09-06 10:37 | v36.45 | Manual schedule reflow. | A future manual rest/workout/class should alter nearby flexible opportunities instead of simply deleting displaced work. |
| [66 · e03e966](https://github.com/wmadson29-creator/Hybrid-Training/commit/e03e966919d2eb022502261a911de6b22501f79c) | 2026-09-06 11:23 | v36.47 | Six-lane rolling-cadence model. | Make open-day balance opportunity-aware and rolling rather than assigning weekdays or literal weekly quotas. |
| [67 · b8aed02](https://github.com/wmadson29-creator/Hybrid-Training/commit/b8aed02316513a536d6a505d745a48642c3a6ce2) | 2026-09-06 12:05 | v36.47 / duplicate | No change: entire repository tree is byte-identical to its parent. | No tree change; duplicate upload. |
| [68 · 088b907](https://github.com/wmadson29-creator/Hybrid-Training/commit/088b907d96a97caef67047b7ff4ca6886f0ab33f) | 2026-09-06 12:05 | v36.49 | Exact kettlebell equipment availability. | Recommend only loads/settings and single/pair KB exercises the selected adjustable bells can actually provide. |
| [69 · 0e20950](https://github.com/wmadson29-creator/Hybrid-Training/commit/0e209506070238b45a611cebf22cf3fb8b2931fc) | 2026-09-06 12:42 | v36.51 | Adaptive strength-endurance recommendations. | Outside Base Building, SE is a fresh duration/fatigue-driven 2-or-3-circuit prescription, not a fixed progression ladder. |
| [70 · 64afaf8](https://github.com/wmadson29-creator/Hybrid-Training/commit/64afaf8265f3190bd05a08ff0508f68419095d9a) | 2026-09-06 13:43 | v36.52 | Movement-diverse strength-endurance construction. | A circuit should cover distinct movement patterns instead of combining redundant variants such as Push-Up and Incline Push-Up. |
| [71 · 5746aae](https://github.com/wmadson29-creator/Hybrid-Training/commit/5746aae13dd4cc1abad638593a8c8daee6db7cee) | 2026-09-06 17:44 | v36.53 | Exercise guides expanded. | Make exercise guidance useful for setup, execution, and common mistakes. |
| [72 · 9c9304e](https://github.com/wmadson29-creator/Hybrid-Training/commit/9c9304eb47f8ad9a1d55ebfcc7a60e5633a989b2) | 2026-09-06 18:39 | v36.55 | Guides made interactive with movement visuals. | Provide interactive movement stages rather than relying on a static unhelpful stick-figure image. |
| [73 · d47cadd](https://github.com/wmadson29-creator/Hybrid-Training/commit/d47caddad371df7c247b87c839ab19b130727020) | 2026-09-06 19:50 | v36.56 | Guide media and presentation expanded again. | Add real demonstration media/search fallback when available and label uncertain matches/licensing. |
| [74 · 41b06a0](https://github.com/wmadson29-creator/Hybrid-Training/commit/41b06a0e53475055891ac6bfb70d1d6cec5949b3) | 2026-09-06 21:49 | v36.58 | Barbell Strength terminology normalized; pickleball drill and match loads separated. | Use the requested Barbell Strength name and distinguish pickleball drill density from intermittent match exposure. |
| [75 · e370b6b](https://github.com/wmadson29-creator/Hybrid-Training/commit/e370b6bb68657fced91401d84fd2c38bf564029c) | 2026-09-07 14:12 | v36.59 | Automatic calisthenics/strength-endurance frequency reduced. | Make Calisthenics and SE a little less frequent automatically while retaining both as legitimate lanes and manual options. |
| [76 · c43cc25](https://github.com/wmadson29-creator/Hybrid-Training/commit/c43cc25c3e615f964411add3d892d0fc5758077b) | 2026-09-07 15:53 | v36.60 | Capacity calibration and subjective fatigue added. | Permit repeated well-tolerated training to inform capacity, and separate a fresh subjective correction from true multi-domain Recovery Guard. |
| [77 · 08b68f1](https://github.com/wmadson29-creator/Hybrid-Training/commit/08b68f1d2cd6aabb9f1db643732515dbfcfbe791) | 2026-09-07 16:51 | v36.61 | Runtime stabilization. | Stabilize the calendar/runtime after the capacity changes. |
| [78 · 8e7e6e1](https://github.com/wmadson29-creator/Hybrid-Training/commit/8e7e6e19f8005a4b4e2a87b9e2d6017c165fa91e) | 2026-09-07 19:50 | v36.63 | Walking dose-versus-toll, explicit steps, and class/activity expansion. | Easy walking can deliver aerobic dose with little recovery toll; only explicitly entered activity steps may be subtracted from daily steps. |
| [79 · 1cdaa8c](https://github.com/wmadson29-creator/Hybrid-Training/commit/1cdaa8c3345787feb5434aee8124b90b179390af) | 2026-09-07 20:45 | v36.63 | Follow-up class/activity and walking-model corrections without a build bump. | Different classes need different exertion priors; start time and duration must be separate, and missing workout steps must remain unknown. |
| [80 · e600298](https://github.com/wmadson29-creator/Hybrid-Training/commit/e6002987fa8d57ee50588eaa9024215491a88a6b) | 2026-09-07 20:52 | v36.65 | Prescription/time consistency and cache hardening. | Make the displayed conditioning target agree with its prescription and harden stale-update behavior. |
| [81 · 9c401c4](https://github.com/wmadson29-creator/Hybrid-Training/commit/9c401c4e105b40d661567f1f00d04433ea9f8d8d) | 2026-09-07 21:05 | v36.66 | Classes and independent activities separated. | Separate classes from independent activities in navigation while retaining one underlying physiology model. |
| [82 · 0e8781f](https://github.com/wmadson29-creator/Hybrid-Training/commit/0e8781f11e24526939b796314000146f141ce6ac) | 2026-09-07 21:54 | v36.67 | Bodyweight observation context and separate navigation tabs. | Record measurement conditions without changing the raw scale value and make expanded class/activity/bodyweight surfaces discoverable. |

### Research, secondaries, and recovery

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [83 · 754b567](https://github.com/wmadson29-creator/Hybrid-Training/commit/754b5676c8bea0421f591173ef4389981a50daef) | 2026-09-08 08:27 | v36.68–36.73 bundled | Research provenance, execution timing, relationship vectors, fractional sets, library/power expansion, UI polish, and optimized prescriptions. | Connect card claims to evidence, separate transfer/volume/fatigue/skill/tissue channels, fill time honestly, and offer exercise-specific optimized prescriptions. |
| [84 · 29809bc](https://github.com/wmadson29-creator/Hybrid-Training/commit/29809bc8431fbbcbf6821e610b18870bb90b41f0) | 2026-09-08 21:54 | v36.74 | Smart accessory selection and completed-workout truth. | Offer low-cost core/grip/complementary work when worthwhile while displaying actual completed training as historical truth. |
| [85 · b52e45e](https://github.com/wmadson29-creator/Hybrid-Training/commit/b52e45ee75cffe0b4baffaa524af70086ad9b241) | 2026-09-08 22:28 | v36.75 | Secondary-workout frequency and calibration. | Keep secondaries occasional but reachable, count them partially, shrink them near anchors, and retain rare KB microdoses. |
| [86 · ab8dbc3](https://github.com/wmadson29-creator/Hybrid-Training/commit/ab8dbc377ad1e8e1cf97dec331df6839f72358f3) | 2026-09-08 23:16 | v36.76 | Location-aware bidirectional secondary recommendations and outdoor-running preference. | Use equipment where the primary occurs, permit bidirectional cardio/resistance add-ons, and strongly favor outdoor running in normal context. |
| [87 · a2c5247](https://github.com/wmadson29-creator/Hybrid-Training/commit/a2c5247e34ecd286b336a1e7ea17e5ffe7c8b444) | 2026-09-09 08:58 | v36.77 | Inline context choices; secondary work placed after the primary. | Make choices directly tappable, use date-specific equipment/environment, and finalize secondary advice from the completed primary’s actual cost. |
| [88 · 497d50a](https://github.com/wmadson29-creator/Hybrid-Training/commit/497d50ab98a9ee789b68be36028a118dd609ea6a) | 2026-09-09 09:10 | v36.78 | Calendar/secondary consistency. | Calendar secondary previews and selected-day guidance must score the same primary plan. |
| [89 · 08eff3f](https://github.com/wmadson29-creator/Hybrid-Training/commit/08eff3f359f7c84b9e0cae8ae71f57aa547aa456) | 2026-09-10 07:41 | v36.79 | Completed History authority, plan-versus-actual records, and secondary-outcome learning. | Do not rewrite completed past days; learn from exact opportunities, user decisions, actual outcomes, and comparable planned-versus-actual work. |
| [90 · 56a2674](https://github.com/wmadson29-creator/Hybrid-Training/commit/56a267469cc6aaf50066508382d181c27c803900) | 2026-09-10 19:53 | v36.81 | Subjective fatigue split into energy, soreness, and related signals. | Body fatigue, sleepiness/energy, and soreness mean different things and should not be one interchangeable signal. |
| [91 · 4d228ce](https://github.com/wmadson29-creator/Hybrid-Training/commit/4d228ceee7633da61aa30d22ccf6caf7112e7697) | 2026-09-10 20:18 | v36.82 | Interval and prediction calibration. | Broad effort ratings are uncertain evidence; avoid self-confirming recovery concordance, repeated-row pseudo-confidence, and recursive error calibration. |
| [92 · d543491](https://github.com/wmadson29-creator/Hybrid-Training/commit/d543491a063dd3ad5ea4059b4930de091802b23e) | 2026-09-10 20:31 | v36.83 | Calendar fallback hardening. | An advanced-model exception must not make calendar days vanish. |
| [93 · ad2016e](https://github.com/wmadson29-creator/Hybrid-Training/commit/ad2016e9f4feaca58a14190105940503afbf4dc5) | 2026-09-10 22:05 | v36.85 | Substitution-specific dosing and live-workout persistence. | A substitute needs its own dose/load/rest, and an active workout/timer must survive interruption. |
| [94 · ba24432](https://github.com/wmadson29-creator/Hybrid-Training/commit/ba24432655755019da5dfd6839905a1e4683baa3) | 2026-09-10 22:17 | v36.86 | Automatic calisthenics frequency reduced again after observed crowding. | Apply the user’s stronger reduction in automatic Calisthenics while retaining manual selection and explicit goal priority. |
| [95 · 622c143](https://github.com/wmadson29-creator/Hybrid-Training/commit/622c143c1cb46aca1ba1c070eac37164f0e48add) | 2026-09-11 09:09 | v36.88–36.89 bundled | Pool-aware low-toll swimming plus exposure-sensitive fatigue/recovery redesign. | Preserve running priority while treating available easy swimming as low toll, and stop routine overlapping subfailure work from saturating every fatigue channel. |
| [96 · 754d2f3](https://github.com/wmadson29-creator/Hybrid-Training/commit/754d2f3429a24266dd4c19c6ec2cd6ffa2a1c203) | 2026-09-11 12:03 | v36.90 | Performance and UI memoization. | Reuse deterministic history/forecast computations and avoid rebuilding unchanged calendar/trend views without changing decisions. |
| [97 · 8b55d6c](https://github.com/wmadson29-creator/Hybrid-Training/commit/8b55d6c91bad6144be9c0b8d03e01b7aeb680b82) | 2026-09-12 01:20 | v36.91–36.92 bundled | IndexedDB/worker/personal recovery architecture and Clean Technical UI; service-worker build declares v36.92. | Preserve full history durably and avoid save/worker races, while exposing confidence, restore tools, personal recovery learning, and the selected visual direction. |
| [98 · ee7b86c](https://github.com/wmadson29-creator/Hybrid-Training/commit/ee7b86ccad4b4326259210ff5c62f3ce13053e01) | 2026-09-12 10:37 | v36.93–36.94 bundled | Conservative feedback learning, Log hierarchy, and readability. | Improve execution/readability and let repeated feedback gain authority gradually; a single subjective answer should only nudge the model. |
| [99 · 25a18c8](https://github.com/wmadson29-creator/Hybrid-Training/commit/25a18c8b7a2f99a0ef44ca3915facd742305c177) | 2026-09-12 11:20 | v36.95–36.96 bundled | Systems/recovery interaction audits plus execution-first Log. | Use proximity-aware concurrent work and modest sleep/context effects; reject unsupported hard rules, and make Log execution-first. |
| [100 · 3902927](https://github.com/wmadson29-creator/Hybrid-Training/commit/39029278d21def0b58b33e1211d7a22a41a96a81) | 2026-09-12 12:21 | v36.97 | Log-state authority hardened. | Opening Log should load today’s actual plan unless real progress or a historical edit is being protected. |
| [101 · 703a2f7](https://github.com/wmadson29-creator/Hybrid-Training/commit/703a2f7a48e809c166aff04ddc65a6eec30fd8d4) | 2026-09-12 12:34 | v36.98–36.99 bundled | Semantic color coherence and calendar palette unification. | Use consistent semantic colors while preserving the calendar’s layout, information, and interaction. |
| [102 · cc9fabe](https://github.com/wmadson29-creator/Hybrid-Training/commit/cc9fabe4a77e20988261fef139c97d0c4cdc5995) | 2026-09-12 12:39 | v36.100 | Icon and install-asset refresh. | Match install icons to the selected visual direction and archive previously developed research/release documentation. |

### Modular execution and reliability

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [103 · 747c72d](https://github.com/wmadson29-creator/Hybrid-Training/commit/747c72d85cc553238ea30f4f03c9bf74e905f974) | 2026-09-12 14:25 | Partial v36.101 | Core bridge/context and service-worker portion of v36.101 while version.json still declares v36.100. | Expose a narrow bridge for a modular execution/context shell without rewriting the training engine; this upload was only part of v36.101. |
| [104 · e43e560](https://github.com/wmadson29-creator/Hybrid-Training/commit/e43e560458b1c3ca0e1c865a9564c4d68658dbbb) | 2026-09-12 14:35 | v36.101 | Shell/docs/version wiring completed for v36.101. | Complete Workout Mode, disclosures, undo, temporary context, conservative intelligence, update UI, and their version wiring. |
| [105 · 8a84109](https://github.com/wmadson29-creator/Hybrid-Training/commit/8a841099ef16827d4769109473d32e9786f77893) | 2026-09-12 16:01 | v36.102–36.105 bundled | Deployment resilience, 10-lb assisted-dip increments, Too easy, repeated weak-link inference, and full-second guidance. | Stop mixed-deployment reload loops, honor dip-machine increments, distinguish Too easy, and infer weak links/full second-workout opportunities conservatively. |
| [106 · 4d544f1](https://github.com/wmadson29-creator/Hybrid-Training/commit/4d544f1ddb32a4085f09833dccfc5cb6604931a1) | 2026-09-13 12:30 | v36.106 | Diagnostics, cardio, and duration QA. | Add requested diagnostics and progression refinements; reduce automatic Calisthenics/SE, correct duration over-padding, and protect next-day anchors. |
| [107 · d6c88a5](https://github.com/wmadson29-creator/Hybrid-Training/commit/d6c88a59efcbb6d931c526f91e18fc51a9bd3e65) | 2026-09-13 13:02 | v36.107 | Persisted-state shape recovery. | Recover malformed legacy array-like collections so one saved row cannot crash the entire model/dashboard. |
| [108 · 6248529](https://github.com/wmadson29-creator/Hybrid-Training/commit/62485296d25280a288e4602f09f6588f7d429a2a) | 2026-09-13 13:13 | v36.108 | Fail-soft recovery and recommendation rendering. | Optional deload/analytics failure must not blank saved recovery or leave an open date without a useful workout. |
| [109 · a7ac3df](https://github.com/wmadson29-creator/Hybrid-Training/commit/a7ac3dfd0ef5499b667b17409d54222ee4704c2d) | 2026-09-13 13:24 | v36.109 | Guaranteed recommendation fallback. | Provide a concrete last-resort recommendation/prescription even if richer analytics fail downstream. |
| [110 · f78bb88](https://github.com/wmadson29-creator/Hybrid-Training/commit/f78bb88a904a071776855a9fe190b0c99689f9be) | 2026-09-13 13:32 | v36.110 | Export diagnostics. | Export the raw saved state and error stacks reliably so the remaining recommendation crash can be diagnosed. |
| [111 · ac89db2](https://github.com/wmadson29-creator/Hybrid-Training/commit/ac89db26fd361a12a48ad6901c75a4ea55a05fb2) | 2026-09-13 13:42 | v36.111 | Primary-recommendation crash fix. | Fix the actual cross-scope ReferenceError activated by learned recovery, rather than relying on fallback Active Recovery. |
| [112 · 9b5ce51](https://github.com/wmadson29-creator/Hybrid-Training/commit/9b5ce51cc86eed758ca6750cf70c254a5097ff6b) | 2026-09-13 13:51 | v36.112 | One-ended landmine loading semantics. | Landmine load is the bar plus plates on one end; normal barbells remain symmetric and trap bars need distinct semantics. |
| [113 · dbd6104](https://github.com/wmadson29-creator/Hybrid-Training/commit/dbd6104424b3e1ad4c4ac0c640eab4eb7a6f82dd) | 2026-09-13 20:36 | v36.113–36.114 bundled | Secondary override support, execution-first post-workout Log, cardio duration authority, and distinct cardio UI families. | After a completed workout, Log should offer a new short/full/custom session rather than reload the first; entered cardio duration controls dose. |
| [114 · ca6c8bf](https://github.com/wmadson29-creator/Hybrid-Training/commit/ca6c8bfd080156488129e6bb13f0242551a7d5c0) | 2026-09-13 21:07 | v36.115 | Landmine and phase-guard correction. | Keep landmine semantics visible throughout Log and avoid automatic KB microdoses masquerading as a Heavy workout in Barbell-only phases. |
| [115 · 62185af](https://github.com/wmadson29-creator/Hybrid-Training/commit/62185afcfec20556a1adc046093982911a0aec5e) | 2026-09-14 08:03 | v36.116 | Actual resistance effort began affecting stimulus. | Very easy resistance can prove spare capacity without earning the same muscle-dose credit as productive hard work. |
| [116 · 2919a37](https://github.com/wmadson29-creator/Hybrid-Training/commit/2919a37f16ad359c149065c549d484ec2a4e1b7e) | 2026-09-14 13:03 | v36.117 | Whole-athlete development, endurance-versus-speed balance, and weekend capacity. | Replace equal modality rotation with athletic-development needs and protect running endurance around fixed strength/KB work. |

### The separate v36.119 updates

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [117 · 9746e9e](https://github.com/wmadson29-creator/Hybrid-Training/commit/9746e9e616a0be28c43c35348d1928fa665cb46e) | 2026-09-14 15:17 | v36.118–36.119 bundled | Tissue/physiology/interference refinement, dynamic weekend/weekday full-secondary allocation, and bounded durable startup. | Choose weekend/rare weekday doubles from need, recovery, tissue load, and compatibility; no weekday owns the extra session. |
| [118 · 93ab566](https://github.com/wmadson29-creator/Hybrid-Training/commit/93ab5662b7d4f29742887a2041ddaa35ec330ba1) | 2026-09-14 15:53 | v36.119 | Stretching/flexibility module added. | Provide the requested stretching utility while keeping it isolated from training logs and adaptive decisions. |
| [119 · 50bde25](https://github.com/wmadson29-creator/Hybrid-Training/commit/50bde25fc813d6aed0e86d6710b26299b8ce4315) | 2026-09-14 17:12 | v36.119 | Landmine-loading visual correction. | Prevent plan conversion from discarding landmine metadata and drawing incorrect symmetric plates. |
| [120 · dd5065c](https://github.com/wmadson29-creator/Hybrid-Training/commit/dd5065c4fbcb814717de12b826bfedb151385248) | 2026-09-14 23:44 | v36.119 | Conditioning-family canonicalization plus sprint/hill research. | Sprint distance, work/rest, hill grade, impact, and high-speed exposure produce distinct local/systemic demand. |
| [121 · 4cc1d14](https://github.com/wmadson29-creator/Hybrid-Training/commit/4cc1d14d2ec0c0808c54dddf698785cfde4c91da) | 2026-09-15 00:05 | v36.119 | Home secondary hierarchy cleaned up. | Give Home one clear primary-then-secondary hierarchy instead of several conflicting legacy panels. |
| [122 · 5150da5](https://github.com/wmadson29-creator/Hybrid-Training/commit/5150da5ae6b6710fb68526855142f979d7b7a266) | 2026-09-15 00:15 | v36.119 | LSS versus Sprints/HIC switch behavior corrected. | A deliberate LSS versus Sprints switch must request the appropriate family while retaining normal model guards. |
| [123 · 7029740](https://github.com/wmadson29-creator/Hybrid-Training/commit/7029740fbbd83eacaf49973f6c9628d7ce45c22e) | 2026-09-15 00:28 | v36.119 | Recommendation-family labels and secondary placement corrected. | Make the recommended family explicit and keep secondary choices in the intended inline location. |
| [124 · f1a74eb](https://github.com/wmadson29-creator/Hybrid-Training/commit/f1a74ebdc29a0f6a48ba3c4ffc17ae348b1ebe13) | 2026-09-15 00:42 | v36.119 | Sprint/hill activation and secondary-choice matrix. | Separate model advice from the user’s desired secondary size/family, and activate sprint/hill logic in the correct engine scope. |
| [125 · 494849c](https://github.com/wmadson29-creator/Hybrid-Training/commit/494849c0ea52d069ebd831e1a77cd1d3774013d6) | 2026-09-15 00:43 | v36.119 / duplicate | No change: entire repository tree is byte-identical to its parent. | No tree change; duplicate upload. |
| [126 · ecc8e06](https://github.com/wmadson29-creator/Hybrid-Training/commit/ecc8e06188125774d90f00ce685f27873db4e28b) | 2026-09-15 11:09 | v36.119 | Performance/conditioning-family consistency. | Use one conditioning-family answer across all surfaces and avoid duplicate post-render/model work that caused severe interaction lag. |
| [127 · 5632502](https://github.com/wmadson29-creator/Hybrid-Training/commit/5632502595f2f8dfedfaafa82d6d42c70255d900) | 2026-09-15 11:33 | v36.119 | Calendar secondary visibility. | Make the chosen Full/Short/None secondary visible in the calendar without changing the allocator. |
| [128 · 5849a24](https://github.com/wmadson29-creator/Hybrid-Training/commit/5849a24970fe88fbfbfbbe0628f044188e7be376) | 2026-09-15 11:56 | v36.119 | Secondary-frequency correction. | Correct practically unreachable short/full outcomes with graded interference and rolling opportunity gates rather than mandatory doubles. |
| [129 · cf9b0df](https://github.com/wmadson29-creator/Hybrid-Training/commit/cf9b0df970a662250bd27e1a3d7308728a0084ca) | 2026-09-15 12:25 | v36.119 | Weekend package, History truth, on-site gym logic, and Base Building corrections. This intentionally supersedes v36.75's blanket avoidance of Barbell-day secondaries with narrowly allowed low-overlap accessories. | Optimize the two-day weekend package, preserve actual historical sessions, recognize on-site gym equipment, and keep Base Building labels consistent. |

### Personalization, actual dose, and decision integrity

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [130 · 236dcf0](https://github.com/wmadson29-creator/Hybrid-Training/commit/236dcf067fc5354f8613b850e8a1fdb5b1759a3f) | 2026-09-15 14:28 | v36.120 | Adaptive-personalization module and swim-length support. This is the common ancestor of the current local and remote tips. | Actual activity time outranks a brief logging timer; calibration stays exercise-specific, and swim lengths/course data become explicit. |
| [131 · daf8b69](https://github.com/wmadson29-creator/Hybrid-Training/commit/daf8b69333dfbbd2f5a9ceee5daf63c9fcffa50c) | 2026-09-17 07:15 | v36.121 | Remote v36.121 upload; tree is byte-identical to local `d0b91f2`. | Moving an anchor must preserve displaced flexible opportunities without duplicating them; Home should show entered steps instead of HRV. |
| [132 · 05c14ab](https://github.com/wmadson29-creator/Hybrid-Training/commit/05c14ab61a67ff2c050182036626944095da0606) | 2026-09-17 09:21 | v36.122 | Remote v36.122 upload; tree is byte-identical to local `a766050`. | A saved manual/family choice must be canonical everywhere instead of losing to a freshly calculated forecast. |
| [133 · 0b64571](https://github.com/wmadson29-creator/Hybrid-Training/commit/0b64571ffd20148ffaeea156f89b25ee249112e5) | 2026-09-18 06:59 | v36.123–36.124 bundled | Secondary-choice consistency, tissue/development scoring, set synchronization, and stroke-aware swimming. | Improve full/short selection consistency, tissue stress, muscle-specific development, and stroke-aware swimming without erasing fixed anchors. |
| [134 · d43cc81](https://github.com/wmadson29-creator/Hybrid-Training/commit/d43cc81292d3e9770366a5b73ae805a6f43cbbdd) | 2026-09-19 10:33 | v36.125 | Muscle-specific development/frequency, whole-athlete benchmarks, stroke-aware swimming, storage/import hardening, accessibility, calendar cues, and executable QA. | Preserve full durable state during imports/startup, support mixed-stroke/course-matched history, and avoid fabricated weak-muscle baselines. |
| [135 · c69d57e](https://github.com/wmadson29-creator/Hybrid-Training/commit/c69d57e2949fcfd0baba184499c1269dc40fc573) | 2026-09-19 16:25 | v36.126–36.127 bundled | Actual-versus-planned feedback, export repair, future balance, and optional body profile. | Use actual dose for every role, repair optional export metadata, and stop a temporary speed deficit from filling the future calendar. |
| [136 · 0c94421](https://github.com/wmadson29-creator/Hybrid-Training/commit/0c94421520387cc99d57c2ba99cb41049d1934cd) | 2026-09-19 23:49 | v36.128 | Exercise expansion, evidence-gated balance refinements, calibration cleanup, searchable exercise pickers, and plain-language UI copy. | Restore endurance-run priority and replace rigid speed gaps with conditional soft spacing; expand exercise metadata and effort calibration honestly. |
| [137 · f791949](https://github.com/wmadson29-creator/Hybrid-Training/commit/f791949d76d459de3cc6863a84d3039387357a4e) | 2026-09-25 09:03 | v36.129–36.130 bundled | Active-workout insertion, Barbell Forearm Curl, true unplanned/secondary semantics, local soreness, component dose, equipment controls, and data hardening. | Allow exercises after Start, preserve true unplanned/secondary roles, and refine local soreness, mixed-component anatomy, equipment, and backup integrity. |
| [138 · 44f793a](https://github.com/wmadson29-creator/Hybrid-Training/commit/44f793ac88f5f2491ac85ed65f928a948d8dfadf) | 2026-09-25 17:25 | v36.131 | Decision/evidence persistence, component-dose feedback, overlapping equipment profiles, encrypted backups, import preview/rollback, and expanded QA. | Keep decisions stable only against real evidence, attribute feedback correctly, and make recovery/import/equipment/backup behavior auditable. |

### Latest corrections and the recorded rollback

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [139 · 5229663](https://github.com/wmadson29-creator/Hybrid-Training/commit/5229663b7a1e75f880ff72ad86c206a97f04fbca) | 2026-09-25 23:23 | v36.132 | Default-timestamp recovery lookup correction and visible/editable saved day context. | A null default timestamp was becoming zero and hiding intact recovery; also make saved day context visible and independently correctable. |
| [140 · b7dd3fb](https://github.com/wmadson29-creator/Hybrid-Training/commit/b7dd3fbcb50c0998cb828f28d2bc2431698f0948) | 2026-09-26 13:40 | v36.133 | Optimized, modality-specific customized, and blank full-secondary workflows. | Keep the optimized secondary path while adding modality-specific customization and blank building that cannot replace primary identity. |
| [141 · aebe3cc](https://github.com/wmadson29-creator/Hybrid-Training/commit/aebe3cc5c720ffb83ccab203eecb76ccee7acb5d) | 2026-09-27 09:30 | v36.134 | Effort-aware actual load, exact secondary outcome matching, preference-consistent comparisons, and narrow historical primary repair. | Intensity must still affect actual load when exact RPE is blank; completed secondaries must match the correct offer/primary/type. |
| [142 · f45b031](https://github.com/wmadson29-creator/Hybrid-Training/commit/f45b031ddbe079c9bd6b16722736365da51502f6) | 2026-09-27 10:17 | v36.135 | Canonical recommendation defaults and automatic Gym variety. | Exclude temporary recovery placeholders from stable caches and rotate comparable automatic Gym exercises while preserving useful progression. |
| [143 · e77a085](https://github.com/wmadson29-creator/Hybrid-Training/commit/e77a085b32a99e395b85e3622c5e1a3c6343c31e) | 2026-09-27 10:38 | v36.136 | Loading-loop hotfix restoring globally bounded recommendation resolution. | Bound cross-date recommendation recursion after v36.135 created a loading explosion, while retaining non-caching transient placeholders. |
| [144 · 3cd8d2e](https://github.com/wmadson29-creator/Hybrid-Training/commit/3cd8d2ef47c7430cd77ed93994965e7d0a9dd8e0) | 2026-09-27 11:03 | Rollback to v36.134 | Runtime restored to the earlier v36.134 assets; later notes remain in the tree. | The runtime was restored to the earlier v36.134 state. The commit records no explicit reason; the rollback is observed, not inferred user intent. |
| [145 · c4b3560](https://github.com/wmadson29-creator/Hybrid-Training/commit/c4b35600c32218613c6b23a52d74d27032796c4b) | 2026-09-27 15:36 | v36.137 | Semantic generated-plan refresh and historical/calendar/explanation/observer performance changes. | An accepted stale generated plan was bypassing new rotation logic; refresh only obsolete unstarted automatic plans and reduce invisible rendering work. |
| [146 · ab196d0](https://github.com/wmadson29-creator/Hybrid-Training/commit/ab196d0db865ef4056143b87cd948bf33561b1f7) | 2026-09-28 08:43 | v36.138 | Soft adjacent-Gym focus spacing, forecast cache correction, lazy libraries/research, view cleanup, and existing-data startup fix. | Apply soft dose-sensitive adjacent-Gym focus spacing and forecast-aware cache keys, and release large hidden views/research markup to reduce mobile lag. |
| [147 · 093f077](https://github.com/wmadson29-creator/Hybrid-Training/commit/093f077a8290b9a1b3d1b80703bf493c6a5073d7) | 2026-09-29 19:43 | v36.139 | Exact future manual activity commitments, soft dose/proximity reservations, and evidence-sensitive generated-plan reflow. | An activity-only future manual choice was lost when the base session type stayed Conditioning; reserve its exact lane and release stale model-owned recommendations. |


### Prepared-release reliability work uploaded as v36.140

| # | Uploaded (Phoenix) | Version/state | What changed | Reason / purpose |
|---:|:---|:---|:---|:---|
| [148 · f20ede8](https://github.com/wmadson29-creator/Hybrid-Training/commit/f20ede8b9ef5fa715163e1756e951611ae187daa) | 2026-10-02 18:23:06 | v36.140 | Progressive/cached calendar and startup, repaired coherent-deployment updater, bounded rare Cal/SE re-entry, optional-secondary gates, actual swim/primary/history attribution, Pull-up → Squat, and idempotent conditioning progression. Seven app/document files match the prepared v140 delivery; its five test files were not uploaded. | Complete the screenshot-backed pending release while preserving actual workouts, recovery, manual commitments, fixed progression, and the latest no-automatic-Barbell-extras preference. |

## Earlier rules that were superseded

| Earlier rule or behavior | Later archived or prepared behavior | Why it changed |
|:---|:---|:---|
| Finite/static conditioning rotation | Adaptive/infinite blocks, then rolling open-day decisions | Actual history, recovery, and available opportunities should change the next useful workout. |
| Monday-to-Sunday load/reset/rest quotas | Trailing windows and need-driven rest | Stress and opportunity do not reset on Monday. |
| Six approximately equal modality lanes | v36.117 athletic-development needs, later separate direct swim needs | Fixed anchors already provide some qualities; equal rotation can crowd endurance or prescribe unnecessary overlapping work. |
| Early estimated exercise-step subtraction | v36.63 explicit entered activity steps only | Distance/time cannot establish exact steps, and guessed subtraction hides uncertainty. |
| Shared muscles imply strong performance transfer | Task-specific directional transfer with separate capability, volume, fatigue, skill, tissue, and power channels | Supporting muscle work is not proof of exact movement ability. |
| Routine overlapping rows accumulate fatigue linearly | v36.89 exposure-sensitive persistence and saturating accumulation | Easy/subfailure compound work was saturating multiple channels despite stable performance. |
| Duration floors fill all requested time aggressively | v36.106 credits realistic rest and respects useful work ceilings | Fixing under-filled sessions had overcorrected into excessive sets in long workouts. |
| Saturday owns quality work / Sunday owns the double | v36.119 dynamic two-day package | Either day can be the better opportunity after actual recovery, tissue load, and need are considered. |
| Barbell-day automatic extras: disabled in v36.75–76, then broadened by v36.88/v36.119/v36.130 exceptions | v36.140 disables automatic short/full Barbell secondaries again; retained in v36.141 | The latest user preference wins over those archived exceptions. Manual extra work remains possible. |
| v36.127 rigid 4–6-day speed spacing | v36.128 soft 3–4-day windows, supported two-day hard stacks, focus-block exemptions | Prevent crowding without prohibiting a useful supported hard-day pairing. |
| A saved automatic recommendation is permanently authoritative | v36.137 semantic freshness, v36.139 evidence-sensitive reflow | Generated plans need stability during viewing, but must yield to new model/evidence/manual commitments. |
| Future constraint exists only if session type changes | v36.139 exact activity-only commitments count | Choosing a Thursday swim still matters when both the old and new session types are Conditioning. |
| Repeating a muscle on adjacent Gym days is broadly unaccounted for | v36.138 soft dose-sensitive focus cost plus forecast-aware cache keys | Reduce near-duplicates while allowing repetition when stronger individual need justifies it. |
| Rare Cal/SE remain mathematically scored but can be practically suppressed | v36.140 bounded long-full-exposure-gap credit | Preserve rarity while proving actual automatic reachability; shorts earn partial credit. |
| Independently rotated KB Heavy/Power/Volume templates | v36.141 one coordinated stable A/B/C program | The user clarified full-body muscle building and conditioning across all three sessions while retaining TB and open days. |
| Secondary defaults revolve around strength + aerobic pairing | v36.141 complementary aerobic pairs and SE/Cal/KB families | A double does not require Gym; exact activity/family identity must survive selection and execution. |
| Future projection stops at 42 days / only the inner scorer is projected | v36.141 requested-date projection around final scorer and future display/secondary surfaces | Count intervening planned work consistently so distant needs do not freeze against today's history. |
| Weekend pairing can replace a much stronger primary with Gym | v36.141 feasible pairing can break only a close primary tie | Optional capacity must not displace a clearly stronger training need merely to manufacture a double. |
| Barbell ab-machine volume advances after one comfortable exposure, then +10 lb | v36.142 three comparable dates per volume step, four at the top, then +5 lb | The user explicitly requested substantially slower progression and confirmed 5 lb hardware increments. Ordinary Gym progression retains its separate policy. |
| A current stamped future automatic snapshot can become a lasting override | v36.142 model version 8 and revisable future adaptive-recommended choices | Intervening projected work and nearby commitments must change future advice; explicit manual intent remains fixed. |
| New full-secondary families ignore the primary’s location / circuit numbers can be time | v36.142 family-wide location preference, equipment-aware construction, and explicit minute parsing | A convenient useful pairing should beat an unnecessary extra trip when other factors are comparable; displayed duration must represent actual time. |
| Barbell abs progress through four sets and require 19 clean exposures for the first increase | v36.144 caps sets at three with six exact-dose results per rep step, then +5 lb/reset after 18 baseline exposures | Keep the load progression slow while removing the 80-rep accessory dose. Historical records remain intact. |
| Direct exercise changes can retain the old sets/reps/load | v36.144 routes Log picker changes and Gym/Cal/KB builder changes through fresh prescription calculation | A replacement exercise needs its own movement-specific target; original planned metadata stays separate. |
| A cheap weekend full reservation can suppress shorts even when the complete plan fails | v36.143 compares actually buildable/scored fulls against viable shorts | A failed candidate cannot own the date or block a useful smaller option. |
| Every full double requires at least a 75-minute budget, even if both complete plans fit below it | v36.143 checks the actual two-session sum, transition, and transfer | Complete short-duration sessions should remain possible; insufficient remaining time should yield a real short or None. |
| Non-KB open weekdays retain 9/9.5 full thresholds and only the old short resistance pathway | v36.143 uses 7/7.5 and offers a bounded complementary easy-aerobic short | Restore useful opportunities after the user reported almost no secondaries, while retaining recovery, spacing, time, location, and fixed-anchor checks. KB's 11.5 threshold remains. |

## Kettlebell program research and decisions — v36.141

Prepared October 2, 2026, America/Phoenix. This replaces the earlier idea of separately revising only KB Power and KB Volume. The user clarified that all three kettlebell sessions should form a researched full-body muscle-building and conditioning regimen, integrated with two barbell days and the existing conditioning/open days.

### What the research supports

The evidence supports repeatable resistance exercise, sufficient weekly work, progressive overload, and individual adjustment. It does not identify one three-day kettlebell routine as universally most effective. The program below is an explicit hybrid adaptation, with its exercise choices and progression explained, rather than a claim that this exact app routine was tested in a trial.

| Primary source | Relevant finding or coaching approach | Application and limits |
| --- | --- | --- |
| [ACSM 2026 resistance-training guidance](https://acsm.org/resistance-training-guidelines-update-2026/) and [position stand, PMID 41843416](https://pubmed.ncbi.nlm.nih.gov/41843416/) | The guidance emphasizes consistent major-muscle training, goal-specific load/volume, and higher weekly volume for hypertrophy. Complex programming and routine failure are unnecessary for many healthy adults. | Use stable compound movements and rep/load progression. Count the two barbell sessions when choosing the additional KB dose. Approximately ten weekly sets is a broad reference, not ten mandatory extra KB sets for every muscle or a hard cap. The official overview and indexed abstract were read; the journal full text was not accessible. |
| [Neupert and Tsatsouline: Dry Fighting Weight, original article](https://www.strongfirst.com/dry-fighting-weight/) | A repeatable clean-and-press/front-squat program with three weekly sessions; strength work retains rep quality rather than rushing every set into conditioning. | These lifts anchor KB A and C. Separate the swing block from the strength sets. The original program expects easy off days, so adding it unchanged to two barbell days and separate conditioning would disregard its recovery context. The exact app set/rep scheme is our adaptation. |
| [Neupert: The Giant, author’s overview](https://go.chasingstrength.com/thegiant/) | Concentrated clean-and-press work, typically three short sessions a week, with several progression levels. | Supports repeated skill practice and planned progression. A clean-and-press-only plan does not directly supply the separate squat, horizontal press, and row work requested here. Author testimonials are coaching evidence, not controlled comparative trials; the paid progression tables were not reproduced. |
| [Neupert: Kettlebell MAXIMORUM, author’s overview](https://go.chasingstrength.com/kettlebell-maximorum-e/) | Planned lighter/heavier training built around double clean-and-press, front squat, and snatch; the original has four weekly sessions and a longer three-day modification. | Supports coordinating goals and doses across a program. It is not an extra full program layered on top of the current hybrid week. Swings provide the app’s default ballistic work without making snatch proficiency a prerequisite. |
| [Lake & Lauder 2012, PMID 22580981](https://pubmed.ncbi.nlm.nih.gov/22580981/), DOI 10.1519/JSC.0b013e31825c2c9b | A small six-week trial in 21 men found improvements in maximal and explosive strength with twice-weekly swing training. | Supports a purposeful ballistic component. Its work/rest protocol differs from this app’s swing rounds and it does not establish the best full-body hypertrophy routine. |
| [Schumann et al. 2022, PMID 34757594](https://pubmed.ncbi.nlm.nih.gov/34757594/), DOI 10.1007/s40279-021-01587-7 | Across 43 studies, concurrent aerobic and strength training generally preserved hypertrophy and maximal-strength adaptation; explosive-strength attenuation was more apparent with same-session training. | Keep conditioning/open days and both barbell anchors. Avoid treating every KB day as maximal strength plus exhaustive conditioning. Short swing blocks here complement broader conditioning; they do not replace running, swimming, or dedicated quality sessions. This review does not validate our exact daily doses. |

### Complete hybrid week

The existing day placement is retained. Wednesday and Saturday remain adaptive conditioning/open opportunities; recovery, other flexible training, and an optional compatible secondary can still win when warranted.

| Day | Primary slot | Purpose |
| --- | --- | --- |
| Monday | Barbell Strength | Existing Tactical Barbell wave and accessories |
| Tuesday | Full-body KB A, stored as `KB Heavy` | Lower-rep strength practice plus a bounded swing block |
| Wednesday | Conditioning/open | Usually aerobic support; chosen from current projected needs |
| Thursday | Barbell Strength | Existing second Tactical Barbell anchor |
| Friday | Full-body KB B, stored as `KB Power` | Moderate-rep muscle work and the largest KB conditioning block |
| Saturday | Conditioning/open | Flexible endurance/quality opportunity and preferred optional capacity window |
| Sunday | Full-body KB C, stored as `KB Volume` | Controlled volume with fewer squat sets and swing rounds before Monday |

Internal session keys stay stable so historical workouts retain their original identities. The current presets are one A/B/C program. They no longer rotate to a different grab-bag at each six-week block boundary. Explicit saved custom workouts still override presets.

### Three coordinated full-body sessions

Each session contains a press, squat, horizontal pull, and ballistic hinge. Finish straight strength sets before moving to the swings. Strength work aims for roughly 2–3 reps in reserve, with a bell that permits the chosen range. Clean before each clean-and-press rep.

| Session | Exercise | Starting sets × reps | Rep/round progression range | Rest between sets/rounds |
| --- | --- | --- | --- | --- |
| A | Double Clean & Press | 3 × 4 | 4–6 reps | 150 sec |
| A | Double Front Squat | 3 × 6 | 6–8 reps | 120 sec |
| A | Single-Arm Row | 2 × 8/side | 8–12/side | 90 sec |
| A | Two-Hand Swing | 5 × 10 | 5–8 rounds, ten reps each | 60 sec |
| B | Double Floor Press | 2 × 8 | 8–12 reps | 120 sec |
| B | Goblet Squat | 2 × 10 | 10–15 reps | 120 sec |
| B | Single-Arm Row | 2 × 10/side | 10–15/side | 90 sec |
| B | Two-Hand Swing | 8 × 10 | 8–12 rounds, ten reps each | 60 sec |
| C | Double Clean & Press | 3 × 6 | 6–10 reps | 150 sec |
| C | Double Front Squat | 2 × 8 | 8–12 reps | 120 sec |
| C | Single-Arm Row | 3 × 8/side | 8–12/side | 90 sec |
| C | Two-Hand Swing | 4 × 10 | 4–8 rounds, ten reps each | 75 sec |

The press and squat patterns stay consistent so progress is interpretable. The B floor press adds a horizontal press rather than three identical overhead-press days. Rows provide direct horizontal pulling instead of assuming cleans train it identically. Swings supply a clear conditioning/hinge task instead of adding several disconnected ballistic exercises. Carries, get-ups, snatches, and other library movements remain available for explicit customization.

Starting weekly KB volume is eight press sets, seven squat sets, and seven row sets, plus the three swing blocks. This is additional to barbell work; compound-set totals are not interchangeable hard sets for every muscle. B uses two strength sets per movement and C reduces squat/conditioning dose to account for surrounding anchors. These exact numbers, rest intervals, and ceilings are app programming decisions informed by the sources, not experimentally proven optima.

### Progression and execution

1. Compare completed full KB exposures in the same slot and exact exercise, within 120 days. A Heavy result does not directly become a Volume prescription. The recent progression window is 28 days.
2. Two distinct complete exposures at the same available bell, at the required sets/reps, with known effective RPE at most 8 and acceptable technique, can earn one extra rep per set. At the top of the range, they can earn the next available bell and reset to the lower rep bound.
3. Swings keep ten crisp reps per round. Two comfortable complete exposures, effective RPE at most 7.5, can add one round. At the round ceiling, an earned bell increase resets rounds to the baseline. Load, reps, rounds, and rest are not all increased together.
4. Recovery caution/guard holds earned increases. A recent partial/missed or technically poor/hard exposure blocks progression from older successful rows and can reduce to the next lighter bell. No new automatic within-workout adjustments were added.
5. Short add-ons cannot earn full-session progression. A genuinely completed full KB secondary can. Manual loads hold the saved dose and use an available hardware setting.
6. A time-limited full build reduces sets/rounds while retaining all four movement patterns and their rests. If the four-pattern minimum cannot fit, the complete build is declined. A short add-on is a separate, deliberately smaller workout.

The 2×70 lb adjustable bells support paired 12–32 kg settings. The single 40 lb bell uses its actual discrete settings. A one-bell setup changes double presses to single-arm presses and the double squat to a goblet squat while retaining the intended pattern; unilateral rep labels change accordingly. Saved user workouts retain their chosen exercises and flag incompatible equipment rather than silently substituting them.

The supplied export has no completed KB rows and no saved custom KB routines. Default loads are therefore provisional starting points, not a claimed estimate of the user’s KB strength. Related barbell strength is useful context but does not establish a KB rep maximum.

### Secondary workouts and model behavior

Gym, Calisthenics, SE, and all three KB sessions can be full secondary candidates on suitable non-Barbell days. Short KB work can also be considered on open days in the TB-only phase when equipment and the user’s secondary preference allow it. The old phase-wide automatic KB-short ban is removed; Barbell-day automatic extras remain disabled.

Two-workout days do not require Gym. Different aerobic activities can pair with one another as well as with circuits/SE, Calisthenics, and KB. The automatic full candidate pool includes complementary easy aerobic work after a cardio primary. Actual completed activity excludes a duplicate modality, and shared load, effort, total available time, environment/equipment, and surrounding anchors still affect eligibility. Custom choices remain available for a deliberate repeated activity. Each aerobic option retains its own activity key through selection and Log loading.

A KB primary keeps the existing rare easy-aerobic-double policy. Eligibility for KB as a second workout after another primary is evaluated separately. Completed effort, recovery, available time/bells, overlap, nearby anchors, and tissue stress still determine whether an automatic double is useful. Being selectable under Best full or Custom does not imply that Recommended must advise a full second session every time.

SE secondary rows now retain the SE model, and KB rows retain their actual session style, through loading, saving, effort calibration, fatigue, and progression. The moderate-rep floor press in B is no longer assigned the former easy-power prior merely because its legacy session key is `KB Power`.

### Maintenance

Keep the research/program distinction explicit in future releases. Review actual KB completion, load, effort, technique, recovery, and time data before increasing baseline volume or changing this program. Preserve manual routines and historical records. Update this document when the program or its progression gates change; do not silently replace A/B/C with unrelated per-block templates.

### Later KB dose assessment — v36.143

The user clarified that the concern was the number of exercises, sets, and reps. `KETTLEBELL_PROGRAM_REVIEW_v36.143.md` reviews the unchanged presets and the whole week. Starting KB totals are eight press sets (six overhead, two horizontal), seven squat sets, seven row sets, and 170 swings. Those are movement-pattern totals, not equal hard sets for every muscle; swing rounds are not interchangeable hypertrophy sets. Four compound patterns can be purposeful, and the Barbell days add direct work. The conditioning blocks are modest supplements, with open days still responsible for broader conditioning. The existing research supports the programming principles rather than proving the exact app adaptation. No baseline KB dose was increased without comparable completion/recovery evidence.

## Validation and evidence

Use `QA_REPORT_v36.144.md` for current checks; retain the v36.140/v36.141/v36.142/v36.143 reports as prior-release evidence. Do not substitute the older archive's QA claims for runnable current tests.

### Supplied data

The latest supplied export in this work was recorded as build v36.138 and contains **165 workout rows**, **34 recovery dates**, **seven bodyweight measurements**, and no wearable-session rows. Recorded workouts span August 26–September 28, 2026. Its completed-primary grouping is 34 sessions: 15 Barbell, 11 Conditioning, four Gym, and one each Class, SE, Active Recovery, and Calisthenics. Completing Cal/SE does not prove the model selected them automatically.

The export contains **no completed KB rows** and no saved custom KB workouts. New preset starting loads therefore remain provisional. Direct exercise results, logged effort, technique, and recovery should calibrate subsequent changes; barbell strength alone does not establish a KB rep maximum.

The explicit October 1 LSS Swim commitment and its saved 44–61-minute target remain fixed. A September 29 model-generated swim can reflow around it. The screenshot’s October 2 actual swim is a newer visible scenario, reproduced synthetically over the supplied export; no newer full export was available. Its 46.5 minutes, 1260 yards, and RPE 6.5 are preserved in the test scenario.

The v36.142 screenshots show a Triples “2 min” full recommendation, October 10/11 SE entries, and disagreement among automatic recommendation surfaces. They do not establish completed SE workouts on those future dates. The new tests reproduce generated future choices, adjacent actual/projected full SE, automatic None, and deliberate optional selection as separate scenarios. No newer saved export or installed-phone error trace was supplied.

Actual effort matters: the supplied September 26 run was around 44 minutes, 4.4 miles, average HR 163, in 95°F conditions. More optional work is conditional on recovery and cost; the absence of subjective exhaustion alone is not a reason to erase actual hard-session load.

### Executed check sets

| Check set | v36.140 result | v36.141 result | v36.142 result | v36.143 result | v36.144 result |
| --- | ---: | ---: | ---: | ---: | ---: |
| Static/deployment | 19 / 19 | 19 / 19 | 19 / 19 | 19 / 19 | 19 / 19 |
| Export-seeded browser/PWA | 90 / 90 | 90 / 90 | 90 / 90 | 90 / 90 | 90 / 90 |
| Empty-history browser/PWA | 84 / 84 | 84 / 84 | 84 / 84 | 84 / 84 | 84 / 84 |
| Coordinated KB / secondary execution | — | 62 / 62 | 62 / 62 | 62 / 62 | 62 / 62 |
| Future assumptions / variety | — | 26 / 26 | 26 / 26 | 26 / 26 | 26 / 26 |
| Barbell phase / slowed ab progression | — | — | 56 / 56 | 56 / 56 | 57 / 57 |
| Secondary agreement / SE spacing / location / duration | — | — | 39 / 39 | 39 / 39 | 39 / 39 |
| Secondary frequency / real feasibility / cache context | — | — | — | 29 / 29 | 29 / 29 |
| Gym bodyweight core | — | — | — | — | 27 / 27 |
| Class focus / muscle model / persistence | — | — | — | — | 27 / 27 |
| Substitute recalculation | — | — | — | — | 18 / 18 |

The current export-seeded/static sets total **394 checks**; the **84-check empty-history** run is additional. v36.143 totaled 321; v36.142 totaled 292; v36.141 totaled 197. Synthetic scenarios test reachability and edge cases while preservation checks retain the original export. These are checks, not completed user workouts. The older v139 report's 217 static/model and 35 Chromium counts were historical claims about unavailable scripts, not newly reproduced checks here.

The current tests cover actual-row/recovery/measurement preservation, explicit manual swim metadata, waves/deadlift/order, race cancellation, coherent updates, active-workout deferral, Later, failed backup, activated-worker reload, and offline reopening. KB tests cover the complete 2+3+2 week; four movement patterns; single/paired hardware; fit-to-time/rest; comparable-result progression; partial/short/full distinctions; manual custom retention; SE/KB effort identity; no-Gym aerobic doubles; exact activity selection; and starting/saving a full secondary from a previous primary edit mode.

Forecast checks cover actual future wave prescriptions, displayed/generated plan agreement, manual workout/dose changes, earlier projected endurance credit, upcoming Sunday reservation, actual-primary precedence, secondary-only completion, the old horizon cutoff, final scorer/display/secondary context, and distant variety. Temporary forecasting preserves the actual saved log.

The v36.142 sets add all-six-wave Hybrid Deadlift omission, TB-only retention, moved-source/future prescriptions, the entire 19-exposure ab ladder, 65 lb/5 lb rounding, duplicate/same-day/short/Gym exclusion, quality/pain/effort/staleness/backoff/recovery gates, actual/projected full-SE spacing, manual intent preservation, future snapshot reflow, canonical primary agreement, venue inference/overrides, gym/home equipment construction, actual full-secondary ranking, transfer time, and conditioning-unit parsing. Visible UI checks confirm automatic None has no workout/action below it; choosing Best full leaves the badge at None while explicitly labeling the optional workout in both preview and future calendar. No uncaught page errors were observed in the final suites.

The v36.143 checks reproduce an infeasible weekend full with a viable ten-minute short, a complete local pair below the former 75-minute floor, gym/home complementary aerobic options, actual hard-effort and recovery/time exclusions, skipped choices, explicit full-role counting, no third block, stricter KB-double spacing, growing shadow-history cache invalidation, and changed primary effort/duration without a model revision. The mobile card and calendar show the same Short Swim choice and opening action. A prior browser assertion required a particular Thursday option to remain short; it now verifies continued short/full availability and agreement, because the calibrated planner can legitimately advise a full. The updater fixture was refreshed to the current/newer builds. The matched 35-day frequency comparison is recorded above and in the historical v36.143 QA report; those counts were not re-measured for v36.144. Forecasts preserve real history.

The prior v36.141 export-seeded 85-day preview (October 3–December 26, frozen at October 2 at 21:00 Phoenix) covered 30 adaptive primary slots and resolved through December 26. Its primary choices included 11 LSS Run, two LSS Swim, eight Gym, two Short Hills, two Standard Issue Hills, two Fast 5 Tempo Run, two Speed-Endurance Ladders, and one Connaught Range 10 to 1s. Beyond the old cutoff, 13 inspected open dates retained seven distinct activity/session choices. Secondary work was projected separately. Real serialized log rows remained unchanged and no page errors occurred. This is historical v36.141 evidence; those exact counts were not re-measured for v36.142. They describe hypothetical choices at one saved state, not completed workouts or promised frequencies. The current 26 forecast regressions continue to verify distant variety.

### Performance interpretation

For v36.140, three alternating fresh local Chromium contexts with the same export and blocked service workers measured median interface-ready time **3498 → 1672 ms** versus v36.139, and fully resolved calendar time **5279 → 3438 ms**. Repeat unchanged render calls were already about one millisecond. This was a small local computation comparison, not an Android benchmark or proof that every chat/app crash is fixed.

Three alternating October 2 fresh-context runs compared v36.140 and v36.141 with the same export and blocked workers. Interface-ready median was **2430 → 2266 ms** (about 7% faster); calendar-resolved median was **2720 → 2986 ms** (about 10% longer, 266 ms). Repeated unchanged renders remained about one millisecond. Correct prospective calculations add some first-calendar work. No page errors were observed. These small local measurements used a different frozen date from the older v139/v140 benchmark and must not be combined into a single controlled three-version comparison.

No fresh controlled startup/Android benchmark was run for v36.142/v36.143/v36.144. Retain the earlier measurements with their original version labels; do not present them as current phone timings.

### Reproduce current checks

Run from the repository root:

```bash
npm install
npx playwright install chromium
npm run test:all
```

Use a private local export without committing it:

```bash
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run audit:export -- '/absolute/path/to/export.json'
```

`HYBRID_CHROMIUM_PATH` selects an existing Chromium executable if needed. `HYBRID_QA_ONLY=engine`, `rare`, or `update` selects a browser group. Test hooks are injected only by the local test server; the deployed HTML has no `window.__qa` interface. Browser checks use a 412×915 viewport and America/Phoenix dates, with a deterministic application clock and a real monotonic performance clock.

## Architecture and maintenance entry points

| File / area | Purpose and cautions |
| --- | --- |
| `index.html` | Main static app, scoped training engine, saved state, builders, persistence, calendar, Log, manual intent, and narrow `HybridCore` bridge. Later wrappers are authoritative; changing only an earlier implementation may be undone by a later wrapper. |
| Barbell / KB builders | `getTBPlan`, `pullupForWeek`, `kbPresetWorkout`, `getKbPlan`, `v36141KbRoutinePlan`, and `v36141KbRowPrescription`. Distinguish current presets from user-owned routines and preserve prescription week for moved anchors. |
| Barbell ab accessory | `adaptiveAbCrunchPrescription(dateISO,{barbell:true})`, `gymIncrementFor`, and the Ab Crunch Machine definition. Preserve the separate ordinary-Gym policy, 5 lb hardware, comparable-date credit, slow volume/load ladder, and actual saved weights. |
| Forecast | `ensureRollingForecastRowsBefore`, `withRollingForecastForDate`, `v36117ForecastFixedAnchorRows`, `v36141ForecastSessionRows`, final `rollingOpenDayRecommendation`. Shadow rows have `projectedForecast`; they must never be appended to real logs or treated as observed outcomes. |
| Manual intent / reflow | `manualScheduleConstraintForDate`, `futureManualCadenceReservations`, and generated-recommendation freshness/evidence helpers. Manual same-type activity/dose choices count; future generated snapshots are revisable advice. Model version 9 does not turn them into manual locks. |
| Secondary selection | `v36141FullCandidatePlans`, `v36141AerobicSecondPlans`, `v36119CandidateScore`, weekday/weekend allocation, and `__v36123SecondaryMatrix` presentation. Family eligibility does not imply an automatic full recommendation. |
| Secondary logistics / spacing / duration | `v36142WorkoutLocation`, `v36142PairLocation`, `v36142SESecondaryEquipment`, `v36142SESpacing`, and `v36142ConditioningMinutes`. Read actual/resolved primary, explicit location, hardware, and forecast context. Minute parsing must not interpret circuits/reps/meters/seconds as minutes. |
| Secondary frequency / feasibility | `v36130WeekendPackageDecision`, `v36143WeekendPackageResolving`, `v36143ShortAerobicCandidate`, `v36143ShortFits`, and `v36143CompletedFullCount`. Compare real full/short plans; key caches by forecast and primary dose/effort; retain role-aware completion and conditional boundaries. A failed full cannot reserve the date. |
| Exact secondary identity | `adaptiveSecondaryModelSession`, `v36141SecondKey`, `openFullSecondWorkout`, load/save paths, and effort calibration. Several activities share a session family; matching only `Conditioning` is insufficient. Full role outranks old short flags. |
| Actual history | Completed session groups, completed-primary helpers, and historical calendar decorator. Prefer actual work and role/timing over current expected session. Avoid guessing missing legacy identities. |
| Cache invalidation | `utmInvalidateCaches`, model revision, prospective-history signatures, and bounded caches. A manual edit/import/save/recovery/equipment change must invalidate associated projections and choices. Never cache transient dependency fallbacks as canonical recommendations. |
| `app-shell-v36.119.js` / `.css` | Stable modular presentation/support identity. The JS contains the repaired updater and legacy secondary picker; both activity keys and core calls must agree. Filename suffix is not current build. |
| `decision-integrity-v36.131.js` | Evidence/decision persistence, schema/role/equipment integrity. |
| `actual-load-feedback-v36.126.js` | Actual-dose outcome feedback and component attribution. |
| `adaptive-personalization-v36.120.js` | Bounded confidence-sensitive personal model support. |
| `forecast-balance-v36.127.js` | Existing soft speed-spacing, endurance protection, and flexible-primary balance helpers. These are app policies, not a new weekly optimizer. |
| `exercise-expansion-v36.128.js` | Exercise definitions and model relationships. The stable filename now includes five Gym bodyweight core entries; module catalog version is 4. |
| `stretching-flexibility-v36.119.*` | Separate stretching support/assets; remain present in coherent deployment. |
| `sw.js`, `version.json`, `manifest-v36.webmanifest` | Current deployment build/query/precache agreement. Keep all existing required assets and coherent update verification. |
| `tests/` / `package.json` | Runnable static, browser, KB, forecast, Barbell, secondary-logic, secondary-frequency, core, class-focus, substitution, and export-audit commands. Keep nested helpers. Private exports are supplied via `HYBRID_TEST_EXPORT` or an explicit local audit path. |
| Release / research documents | Current `UPDATE_NOTES_v36.144.md`, `QA_REPORT_v36.144.md`, and `RELEASE_HISTORY_AND_CHAT_HANDOFF.md`; retain `KETTLEBELL_PROGRAM_REVIEW_v36.143.md`; retain the v36.141 KB research and older reports. Update current scope/evidence and handoff each release; preserve older evidence as history. |

## Installation and delivery

1. Extract `Hybrid_Training_v36_144_GitHub_Update.zip` and upload its contents into the existing repository, preserving nested folders. Commit the bundle together.
2. Keep every other existing app asset. This is a cumulative delta from v36.139, not a replacement full repository; it can also update v36.140/v36.141/v36.142/v36.143. Its 34 new/modified paths include the expanded core module and new core/class/substitution tests. It restores tests omitted from the later v36.140 GitHub upload.
3. Wait for GitHub Pages deployment, then reopen the installed app at the existing address. The repaired v140+ updater can notify a newer coherent bundle; a client still running an older build may need an initial normal refresh before it receives that updater.
4. Check the loaded build and saved data. Keep the existing browser/origin so local workout data remains available. Export Data remains the portable backup.

The standalone handoff file and the repository’s `RELEASE_HISTORY_AND_CHAT_HANDOFF.md` have identical contents at delivery. The ZIP includes app changes, new research/release/QA documents, this repository handoff, and runnable tests. It excludes personal export data, browser downloads, temporary analysis, and dependency folders.

## Remaining limits and next-chat priorities

- The last repository verification, during v36.141 preparation, found v36.140. v36.144 is prepared locally; no fresh current HEAD, installed phone build, or completed deployment was verified in this continuation. Check them before diagnosing a reported live issue against the new source.
- No new KB completion data was supplied. The user asked about sets/reps/exercise count, not weights. Revisit baseline dose with comparable actual results and recovery; the latest review describes a reasonable starting hybrid dose and conservative conditioning rather than a proven optimum.
- Farther previews assume scheduled work, estimated effort, and current availability. They update when real completion/recovery/manual context changes; a long forecast is not a guarantee of future readiness.
- A direct jump far ahead requires sequential prospective work through intervening dates. Incremental/bounded caching avoids repeating stable work, but increasingly distant first-time calculations can cost more than a nearby preview.
- Legacy rows without distinct IDs, roles, or timing can only be attributed from available information. Do not “repair” them by fabricating workouts.
- Local Chromium tests do not reproduce the user’s Android hardware or crashing chat environment. Obtain the current loaded build/export/runtime error evidence if an installed-app problem remains after deployment.
- Archive motives not recorded in code/notes/user requests stay unknown. An interrupted old chat’s claim of “working” is not evidence that a change was packaged or deployed.

## Update this document after every release

Append an actual upload to the archived-commit table only after verifying GitHub. Keep prepared/local releases separately identified until then. Record the actual upload order even if the displayed version moves backward or remains unchanged. Do not relabel old events because documentation was added later.

For every new release, record:

```text
Release/build:
Prepared date and timezone:
GitHub commit/upload time (or explicitly not uploaded):
Baseline and cumulative delta scope:
User request and later clarifications:
Behavior changed and why:
Prior decision superseded (if any):
Data/manual/anchor/progression boundaries preserved:
Files changed:
Executed validation and fixtures:
Observed result and important limits:
Delivered ZIP/document names:
Actual deployment/client verification status:
Remaining work:
```

Keep the quick-start status, current boundaries, latest request sequence, research/program doses, reproduction commands, and verification counts synchronized. A replacement chat should be able to determine what is finished, what is merely prepared, what was uploaded, and what remains unknown without the crashed conversation.
