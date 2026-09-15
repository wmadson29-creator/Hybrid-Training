# Hybrid Training v36.119 — Final cumulative update notes

## LSS / Aerobic and Sprints / HIC are now distinct throughout the app
The UI no longer treats every conditioning session as one ambiguous `Conditioning` category. The actual session resolves to **LSS / Aerobic** or **Sprints / HIC** across Today, the calendar, primary switching, Log Workout, History/wearable presentation, conditioning prescriptions, secondary choices, Trends, and other relevant planning/settings surfaces.

Backward compatibility is preserved: legacy stored records may still use the internal `Conditioning` type, but presentation and current planning infer the correct family from the actual workout.

## Home primary + secondary hierarchy
Primary-workout switching keeps the existing adaptive logic. Beneath the primary, the Secondary section always exposes six deliberate choices:
- **Model recommended** — follows the model's Full / Short / None decision.
- **Recommended short** — best short complementary add-on if the user wants one.
- **Custom short** — user chooses the short-secondary family.
- **Recommended full** — best legitimate full second workout if the user wants one.
- **Custom full** — user chooses the full second-workout family.
- **No secondary** — stop after the primary.

Custom short/full then exposes appropriate families such as LSS / Aerobic, Sprints / HIC, Gym, Calisthenics, SE, and kettlebell choices. A custom short remains tagged as a short secondary; a custom full remains a true second workout. The old Optional Secondary and separate legacy second-main panels are not the final Home UI.

## Performance pass
The secondary-matrix rollout exposed repeated post-render work that made the app feel extremely slow. v36.119 now avoids or caches superseded secondary/full-second calculations, model/history/tissue lookups, and excessive DOM-observer rescans. Calendar-day switching is back in the millisecond range in the current-data regression fixture instead of the prior multi-second regression.

## Sprint / hill research refinement
Sprint and hill conditioning sessions use session-specific research-informed fatigue/tissue profiles rather than one generic hard-running bucket. Hill sessions support grade, including a **Parking Garage** preset (11% modeling default) plus exact-percent override. Grade influences muscular/tissue and high-speed exposure modeling.

## Landmine loading invariant
Anything identified as a landmine movement is single-end loaded through planning and final rendering. Displayed/logged landmine weight follows the existing convention of 45-lb bar plus plates on the one loaded end; the anchored end receives no plates. Normal barbells remain symmetric.

## Standalone Stretching & Flexibility
The More-tab utility remains fully standalone: it is not automatically recommended, not logged, and does not alter fatigue/recovery/scheduling. It builds time-, body-area-, and equipment-aware routines from the researched mobility/stretch library.

## Dynamic full-second-session allocation
Weekend and rarer weekday full doubles remain model-driven rather than hard-coded to Sunday. Recovery, adaptation need, tissue load, compatibility, future anchors, and learned interference influence whether and where a full second session appears. Short secondary work remains a separate concept.

## Startup / migration hardening
The bounded IndexedDB hydration/open fallback remains intact. Existing history is compatible and there is no reason to clear data or re-import just for this release.


## Calendar secondary visibility + conditioning comparison follow-up
- Calendar cards now always show **Primary** plus **Secondary** status. Secondary is explicit as **Full**, **Short**, or **None** and reflects the current Home secondary choice/model plan.
- A model-selected weekend full secondary is visible directly in the calendar again, so three-workout weekends (two primaries + one full secondary) are no longer hidden by the new Secondary matrix.
- Custom Short / Custom Full family selections persist their chosen family label for calendar display.
- Conditioning-family comparison now exposes both **LSS / Aerobic** and **Sprints / HIC** in the recommendation comparison area; the currently selected family is visibly marked Current.
- Legacy short-secondary text is no longer appended to the Primary calendar/Adaptive Pick label when the Secondary matrix owns that work.

## Secondary-frequency calibration follow-up
The automatic secondary model was still too conservative in normal use even though Full/Short/None were all technically supported. Two practical reachability problems were corrected:
- **Weekday short secondaries are now reachable.** A whole-body Barbell Strength prescription previously saturated the overlap fingerprint and hit a hard upper-body rejection, making a short secondary effectively impossible on those weekdays. The hard rejection is now a graded interference penalty, while recovery/tissue/anchor safeguards remain authoritative.
- **Weekday full secondaries are now genuinely reachable.** The rolling opportunity window and spacing were relaxed from the prior overly sparse behavior. Full secondaries remain selective and need/recovery driven; they are not attached to a fixed weekday.
- Compact/moderate sprint sessions and KB Heavy/Power days can now earn a small complementary secondary when their actual fatigue/interference scores support it. KB Volume and severe/high-cost primary days remain strongly protected.
- A weekday full double is suppressed when it would directly crowd the weekend day already selected for the weekend double slot.

Using the current-data regression fixture, the visible week contains weekday short secondaries and a real weekend full secondary, while many days still remain `None`. A longer prospective regression also produces both weekday Short and weekday Full outcomes rather than leaving either state practically unreachable.
