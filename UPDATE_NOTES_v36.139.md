# Hybrid Training v36.139

Release date: 2026-09-29

## Future manual conditioning now changes the surrounding plan

The scheduler previously recognized a future activity only when the primary session type changed. On a normal Barbell Strength-only week, Tuesday and Thursday are already underlying `Conditioning` slots. Choosing `LSS Swim` for Thursday therefore left `selectedSession` and `originalSession` equal, so the exact swim commitment disappeared from the manual-constraint layer.

That is corrected. A saved future conditioning activity now carries its activity, cadence lane, target duration, effort, source, and whether it changed only the activity or the whole training mode.

## Generated recommendations reflow; manual choices stay fixed

The latest export exposed a second distinction that matters. Tuesday's swim was stored as an accepted `adaptive-recommended` result, while Thursday's swim was an explicit `adaptive-switch`. Both appeared on the calendar, but they should not have equal authority.

Accepted generated recommendations are now model-owned. They stay stable while their evidence is unchanged, but new training, recovery, schedule, context, equipment, or recommendation-model evidence releases the old snapshot and re-ranks the open day. Explicit manual switches remain fixed. In the reported Tuesday/Thursday sequence, Thursday stays `LSS Swim` and Tuesday is free to become the best remaining workout instead of preserving the old generated swim.

## Soft lane reservation

A future manual run, swim, other-cardio, or speed workout supplies a dose-weighted reservation to its exact lane. The credit is stronger when the workout is closer and longer, and weaker when it is farther away or brief.

This is deliberately not a prohibition. The planner first applies completed prior-week work, recovery, tissue/load state, endurance and speed gaps, and fixed anchors. It then subtracts the future reservation from the relevant lane. If that lane remains the clearest need, it can still win.

The adjustment operates inside the athletic-development model that actually chooses the activity; it is not merely explanatory text or a calendar-only penalty.

## Snapshot and cache correctness

Recommendation evidence now includes compact signatures for future:

- day and no-rest overrides;
- exact conditioning choices and their targets;
- workout intent;
- custom, Gym, Calisthenics, and SE plans; and
- secondary choices.

Changing Thursday invalidates and releases a previously saved generated Tuesday recommendation. Runtime recommendation caches are also cleared, while the new future-reservation lookup itself is bounded and invalidated with the rest of the model.

## Data safety

This release changes future scheduling inputs and recommendation invalidation only. Stale generated plans are ignored and recalculated rather than deleted. It does not rewrite completed history, recovery entries, wearable data, body measurements, fixed program anchors, equipment profiles, or manual workouts.
