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
