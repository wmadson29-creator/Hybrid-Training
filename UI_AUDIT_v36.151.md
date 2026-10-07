# Hybrid Training — user workflow and UI audit, v36.151

Prepared October 7, 2026. The audit used the supplied v36.149 export (24), with 199 workout rows, 42 Recovery dates and eight weight entries. It examined the prepared v36.150 app first, then verified the repaired v36.151 app in local Chromium at a 412×915 phone viewport. Temporary edits were made in isolated browser copies; the supplied export file was never changed.

## What changed

The audit found real defects in secondary selection, travel constraints, future cardio selection, History comparisons and several display details. v36.151 fixes them. It preserves the fixed Barbell/KB program and the distinction between automatic recommendations and deliberate optional workouts.

| Confirmed problem | User-visible repair in v36.151 |
| --- | --- |
| Best full inherited the automatic prohibition on Barbell extras. The screenshot's explicit choice could produce an empty card despite a feasible optional workout. | Best full checks feasible optional plans separately. The automatic badge can remain None while an actual optional plan is labeled Your choice. Calendar and opening action use that same plan. |
| An unavailable full workout gave no useful explanation or next step. | The card states why a complete second workout cannot fit and offers Edit day context, Try best short and Choose custom full. These actions do not manufacture a compatible plan. |
| Travel/indoor context was saved but not visible on the calendar; automatic advice could still choose outdoor running or cycling. | Calendar badges and a selected-day notice show saved constraints. Automatic conditioning and full-secondary candidates honor indoor requirements and equipment access. Travel can favor a treadmill despite the normal outdoor-running preference. |
| Future-day time and recovery flags were awkward to enter. Indoor walking could inherit an excessive long aerobic target. | The dated context controls include time, sick/returning, very sore and limited equipment. Automatic easy cardio respects the time limit; indoor walking is capped at 45 minutes, sick/returning at 20 and very sore at 30, with very easy effort for the recovery flags. |
| More → aerobic library reset a selected future date to today, while Use for selected day hid which date would change. | The library preserves the selected date and displays an editable Workout date plus dated action labels, including after searching or changing categories. |
| A future manually selected Swim displayed 60 minutes, but nearby planning projected a 45-minute fallback. | A specific library choice becomes authoritative manual intent. The forecast and upcoming commitment use the actual selected prescription; the tested Swim projects 60 minutes and nearby automatic needs re-evaluate. |
| History compared stationary-bike miles against swim yards, creating a meaningless distance difference. | Closest prior matches the activity and full/short workout role. Distance differences require matching known units; F45 and Pilates are separate comparisons. An explicit full role outranks a legacy short flag. |
| Strength progress showed cardio activities with zero resistance exposures despite real completed cardio. | Strength progress includes resistance exercises; endurance evidence remains in the endurance views. Actual records are unchanged. |
| Editing an F45 class could retain the Barbell heading; Log could show duplicate stage 02 labels. | Class editing refreshes its actual activity heading and Log reuses one stage header. |
| Optional clean reps remaining used a small dropdown despite the preference for inline choices. | Tappable inline buttons enter reps remaining and update exercise effort through the existing rules. |

## Flows that behaved correctly

- Opening a Barbell workout, editing load and reps, entering exercise effort/RPE/reps remaining, starting and completing detailed sets, viewing rest time, pausing, visiting Trends, resuming and reloading retained the draft and tracker state in the audited browser.
- History editing clearly refused to overwrite an active paused workout. After discarding only the temporary test workout, class editing retained the same saved-session identity and row count.
- Class muscle checkboxes and optional local intensity were present and reached the existing muscle model. A temporary class-focus edit saved correctly without duplicating the session.
- Recovery kept a temporary unsaved sleep entry through navigation. The compact usual fields and More fields disclosure remain useful.
- Automatic Recommended None shows no automatic secondary opening action. A deliberate Best full choice is visibly optional; it does not change the automatic badge to a false recommendation.
- Future manual Swim and Travel/Sick context survive reload. Planning does not create completed workout rows or alter existing Barbell observations.

## Next UI improvements, in priority order

These are recommendations from the audit, not implemented redesigns in this release. Page-height measurements are approximate for this fixture and viewport; they are not phone performance benchmarks.

| Priority | Friction observed | Proposed improvement |
| ---: | --- | --- |
| 1 | Today was about 4,400 pixels tall, with the primary workout action well below the first screen. | Put a clear Open workout / Resume action near the top, with the primary name, dose and essential context. Collapse extended explanations and intelligence panels beneath it. |
| 2 | Trends was about 7,400 pixels tall, with nine summary statistics before filters/charts. Strength tables needed horizontal panning on a phone. | Show three or four useful summary cards first, move date/activity filters earlier, and offer phone-friendly exercise summaries that open detailed tables. Add a focused load/reps/effort view for one selected exercise. |
| 3 | Different strength summaries could suggest improvement and reduced repeatability at the same time, without making the comparison windows clear. | Label each metric's units, dates, comparison basis and confidence. Explain how fixed wave changes differ from comparable-dose performance. The audit did not prove the underlying arithmetic wrong. |
| 4 | History was a long timeline with no convenient quick date/activity filtering. | Add date range and workout-family filters, keeping Edit/Add wearable available from the filtered session card. Preserve the new activity-specific comparisons. |
| 5 | Log had substantial setup content before Start and the first exercise. A full form could be about 6,600 pixels tall. | Collapse optional setup once a plan is loaded and bring Start and the first exercise forward. Keep the existing active-workout previous/next, rest clock, + Exercise and Finish controls. |
| 6 | Class entry exposed many optional cardio/interval fields for a simple 45-minute class. | Keep duration, exercise effort and muscle focus prominent; collect optional heart-rate, interval and step tools in a disclosure. Retain all saved values. |
| 7 | Small accessory areas such as tibialis, serratus and calves dominated the training-balance table's presentation. | Lead with the user's main patterns and goals, putting detailed accessory areas under Show more. This is a display change, not a reason to increase calf-training priority. |

## Verification and limits

The final unique export-seeded suites passed 671 checks. The new UI audit suite passed 41 checks with the supplied export and another 41 with empty workout history. It exercises actual mobile buttons, date navigation, optional workout loading, context changes, reload, History editing and inline effort entry. No uncaught browser errors were observed in the completed audit/regression flows.

Fixed anchors and explicit manual prescriptions retain authority. A Travel or No gym flag does not silently move a Barbell anchor; its badge makes the conflict visible so the user can move/change that day. Nearby automatic days re-evaluate, but a recommendation need not visibly change if the same option still wins. Manual-specific Swim dose and date routing were the reproduced gaps, rather than proof that all manual reflow was broken.

The easy-dose caps and candidate scores are app policies. Software QA does not validate individual physiological forecasts or prove the KB plan optimal. No installed Android client, current GitHub HEAD or deployed v36.151 site was inspected. The update is prepared for repository upload; it was not pushed or deployed.
