# Hybrid Training v36.135

Release date: 2026-09-27

## The calendar now defaults to the real recommendation

The recommendation panel was correctly choosing **Generic Gym** as the primary workout and an easy **LSS Swim** as the compatible secondary. The calendar and selected-day header could still show **Active Recovery** because a temporary same-date recursion fallback was entering the shared session cache while the full recommendation was being calculated.

The fallback remains available only as an internal fail-soft during that one calculation. It can no longer be cached or treated as the canonical day selection. On an adaptive open day, the calendar, selected-day title, recommendation panel, and Open Workout flow now read the same resolved recommendation without requiring the user to reselect it.

This release does **not** make the recovery model more or less aggressive. It fixes which already-computed recommendation becomes the default UI state.

## Automatic Gym workouts use more of the exercise library

Automatic Generic Gym construction now separates two useful goals:

- keep direct exercise history for load, reps, and genuine progression;
- avoid reproducing nearly the entire previous Gym workout when comparable exercises are available.

The builder reviews the last four completed full Gym sessions. Exact exercises from the most recent workout receive a meaningful repetition penalty, while suitable exercises absent from recent sessions receive a modest novelty bonus. After normal movement, muscle, equipment, recovery, and progression scoring, a workout-level pass limits exact overlap with the most recent comparable workout to about 40% when valid substitutes exist.

A key compound lift with a clear upward progression receives extra protection and may repeat. Rotation never bypasses equipment availability, selected muscle groups, unique movement-slot rules, future-anchor interference, or the stress budget. If no comparable alternative is good enough, the better repeated exercise remains.

The rotation policy applies only to model-generated recommendations. Manually built Gym workouts remain fully user-controlled.

## Verification

- **194/194 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- New browser regressions exercise both transient-fallback cache safety and cross-workout Gym variety; the included GitHub Actions workflow remains the authoritative browser run.
- The corrected current export still passes the data audit with zero errors and one preserved legacy warning. It retains 149 exercise rows, 39 sessions, 32 recovery days, six bodyweight entries, and four rest-day records.
