# Hybrid Training v36.148 — latest export and Recovery audit

Reviewed October 5, 2026 (America/Phoenix). Input: export (23), exported October 4 at 23:56:32 Phoenix from **v36.144**. The prepared update is **v36.148**.

## What the data changed

The export contains **192 workout rows, 40 recovery dates, seven weight entries and no session-wearable rows**, through October 4. It adds 27 workout rows and six recovery dates to export (22). All 165 previous workout identities remain. Older derived effort-calibration values have refreshed; actual completed-work fields remain intact.

| Finding | Result in v36.148 |
| --- | --- |
| September 30 full Barbell session was marked short; bike afterward was marked primary | Interpret the full scheduled Barbell anchor as primary and the explicitly chosen 12-minute bike as short. It counts as one full session, with its actual full dose. Stored records stay intact. |
| Guided short context could leak into a later scheduled session | Scheduled loading clears that context; load, add and save apply guided roles only when both date and session match. Explicit short/full choices retain their roles. |
| Ab Wheel Rollout: 3×5 Bodyweight, Very hard, overall experience Good | Repeat 3×5. A good general experience cannot earn another rep for a very hard movement. |
| Dumbbell Push Press: 3×5 at 30 lb per dumbbell, Too easy | Existing calibration still increases its default target to 35 lb per dumbbell ×3. |
| Seated Leg Curl: 4×8 at 65 lb, Too easy | Existing exercise-specific calibration raises the default load/rep target to 70 lb ×10. Workout style and duration still set the final dose. |
| Weighted pull-ups: +30 lb for 3×5, most recently Very hard | Retain the dedicated Barbell grip/load wave. This result does not justify a blanket TM increase. |
| Reformer class has five selected muscle areas | Confirmed: core, glutes, quads, hamstrings and shoulder/arm channels receive class attribution. Focus does not fabricate direct lift progression. |
| No completed KB sessions or custom KB routines | Keep the v36.147 A/B/C recipe. The new export provides no direct KB performance calibration. |

The recorded Ab Wheel substitution retains the original machine prescription separately for actual-versus-planned comparison. Its actual dose is correctly 3×5 Bodyweight; the original machine load is not applied to the rollout.

September 29 is now confirmed rest. October 1 is a completed 46.5-minute, 1260-yard breaststroke swim (average HR 104) followed by a short Cal addition. October 4 is a completed Reformer class. October 6 F45 is an explicit class commitment, and November 7 has planned rest. These actual entries replace earlier synthetic assumptions. The export does not produce a new global deload signal.

## Overall rating means experience

The user clarified that Great / Good / Average / Rough / Very Rough means general feedback and how they felt overall. The form now says **Overall workout experience** and explains where to rate difficulty.

The model retains that feedback in records, History, editing, drafts and exports. It no longer uses the overall rating to infer exercise effort, progression success, actual-load tolerance, local fatigue persistence, learned muscle recovery, or primary/secondary recovery cost and spacing. **Specific effort/RPE, actual workload, execution and explicit Recovery inputs** supply those signals. An unrated exercise stays unrated with a Great overall experience.

## Recovery entry reflects actual usage

| Field | Entered days out of 40 | New location |
| --- | ---: | --- |
| Sleep hours | 39 | Daily form |
| Sleep score | 38 | Daily form |
| Resting HR | 39 | Daily form |
| Wake BioCharge | 39 | Daily form |
| Steps | 37 | Daily form |
| Physical fatigue | 24 | Daily form |
| Energy | 23 | Daily form |
| Soreness | 23 | Daily form |
| Specific sore areas | 4 | Inline disclosure; opens when relevant |
| HRV | 1 | More fields |
| Notes | 1 | More fields |
| Current BioCharge, stress, SpO₂, VO₂ | 0 | More fields |

Numeric pairs fit a phone; fatigue, energy and soreness keep inline choices. Save precedes optional fields. Clear Date, detailed analysis and explanatory panels are less prominent. More starts collapsed for this new layout and then remembers the user's choice. Selecting None deliberately clears that day's selected sore areas.

Hidden values still load, draft and save. Changing the date clears the previous date's displayed values without deleting its saved record. Original metric names and control IDs remain supported.

## Validation and delivery

The actual-export suite passed **494 checks**: static/deployment, browser/calendar/PWA, KB, forecast, Barbell, secondary logic/frequency, core, class, substitution and the new Recovery/roles/experience suite. Independent empty-history browser/PWA and Recovery suites supplement the actual export. Tests cover save/reload, hidden optional fields, drafts, date changes, local soreness, phone layout, explicit secondary roles, and overall-experience invariance.

The cumulative 47-path update ZIP preserves other existing repository assets and excludes the personal export. The handoff retains the complete earlier commit archive. Local checks do not establish that the prepared release is already running on the phone; no push or deployment was performed.
