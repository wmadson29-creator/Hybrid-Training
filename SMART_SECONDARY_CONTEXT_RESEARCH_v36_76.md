# Hybrid Training v36.76 — Location-aware secondary work + outdoor-run preference

## What changed

v36.76 completes the bidirectional secondary-work model that was being built after v36.75:

- Conditioning can earn a short complementary resistance block.
- Generic Gym, Calisthenics, and non-Base-Building Strength-Endurance can earn an occasional short, very-easy cardio block.
- Barbell Strength remains protected from a second workout; its existing ab accessory remains part of the Barbell session.
- KB Heavy/Power retain only a very rare easy-cardio microdose; KB Volume still never receives a second workout.

## Feasibility / location rules

The model now separates *available somewhere* from *available where the primary session occurs*.

- Outdoor run/walk/hike/cycle and pool swimming are treated as away from the gym. A resistance secondary after those sessions can use bodyweight/bands or the kettlebells kept at home, but it cannot recommend a one-machine/barbell gym trip.
- Stationary bike, treadmill, row machine, elliptical, stair machine, SkiErg, and VersaClimber are treated as gym-based. When the conditioning primary is already at the gym, enabled machines/cables/dumbbells and appropriate low-systemic gym work are feasible.
- Home kettlebell secondaries use the stored home inventory (default for this profile: 1 × 40 lb adjustable + 2 × 70 lb adjustables) and exclude ballistic/power movements.

These location rules are user/workflow constraints, not claims from exercise-science literature.

## Outdoor running preference

Automatic selection applies a strong negative preference to **LSS Treadmill**. Treadmill running remains in the library and can still be selected manually for travel or a real pinch, but ordinary automatic running should select an outdoor run instead.

This is a personal preference rule rather than a physiological claim.

## Reverse cardio layer

Gym, Calisthenics, and non-Base-Building SE may receive a 12–20 minute RPE 2–3 aerobic secondary when all of the following align: primary dose is modest, Recovery Guard/Caution are off, endurance cadence need exists, no secondary was just performed, and fixed-anchor spacing is acceptable. The add-on is opportunistic, not a weekly quota.

The chosen modality is context aware. Gym-based strength can use gym cardio equipment without another trip. Home/portable strength stays with outdoor/portable cardio. Lower-body-heavy primary work penalizes an easy run and can favor walking/low-impact work instead.

## Evidence boundary

The same evidence boundary from v36.75 remains in force: concurrent endurance + resistance training is generally compatible, while same-session proximity/dose can matter more in trained populations. The exact scoring thresholds, durations, cadence-credit values, equipment/venue rules, and personal modality preferences are app-derived recommendation logic.

- Held et al. (2026), umbrella review: https://pubmed.ncbi.nlm.nih.gov/41762427/
- Schumann et al. (2021), systematic review/meta-analysis: https://pubmed.ncbi.nlm.nih.gov/33751469/
