# Hybrid Training v36.69 — Gym / Calisthenics Duration Calibration

## Scope
This fix applies to every selectable duration, not only 40 minutes.

- Generic Gym: 20–120 minutes, in 5-minute increments.
- Calisthenics: 20–90 minutes, in 5-minute increments.

## Behavioral rules
1. The selected duration is a real programming target for the timed portion of the workout.
2. Invisible/general warm-up minutes do not count toward that target.
3. Only conservative rest-time credit and modest between-exercise transitions count toward the clock estimate.
4. A workout must satisfy both the estimated clock target and a minimum amount of actual working volume.
5. Exercise breadth scales upward with requested duration.
6. The builder first adds useful sets/reps, then can add another legitimate movement when the workout is still short.
7. It does not add unrelated muscle groups merely to fill time.
8. If an unusually narrow focus/equipment combination cannot reach the target without junk volume, the UI reports that limitation rather than pretending the target was met.
9. Recovery Guard is the only intentional exception that may shorten the requested workout.
10. The universal core finisher remains additional work outside the requested duration.

## Regression status
See `QA_REPORT_v36_69.txt`. The timing matrix covers every selectable duration and the full QA/regression suite passes 36/36 checks.
