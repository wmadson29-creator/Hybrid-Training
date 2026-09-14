# Hybrid Training v36.115 QA Report

## Release result

**PASS — landmine one-ended loading and Barbell Strength Only secondary-session behavior were verified through the actual Log Workout UI, then followed by responsive regression testing.**

## What changed

1. **Landmine loading is explicitly single-ended.** Half-Kneeling Landmine Press and Landmine Row use total implement weight = 45-lb Olympic bar + plates on the one loaded end. The anchored end receives no plates. Landmine detection also falls back to the exercise name, so a custom/renamed exercise containing “landmine” cannot accidentally use the normal two-sided barbell helper.
2. The Log Workout weight field changes to **Total weight (45 bar + loaded end)** for landmine movements. This removes ambiguity about whether the entered number is plates-only or total implement weight.
3. **Barbell Strength Only** phases no longer automatically select kettlebells for the short complementary secondary. Kettlebells remain available when the user manually chooses a KB workout.
4. A short kettlebell microdose is no longer presented/saved as **KB Heavy**. In phases where automatic KB secondaries are allowed, it is treated as a guided Custom Workout with secondary metadata.
5. The automatic **full second-workout** model remains separate and does not include KB Heavy/Power/Volume as candidates. Manual Build another → KB remains available by design.

## Behavioral tests

### Landmine Log Workout UI
Driven through the real mobile Log UI → Build something else → Custom workout:

- Half-Kneeling Landmine Press at 70 total → **25 on loaded end**; anchored end says **no plates**; no `/ side` output.
- Landmine Row at 95 total → **50 on loaded end** = 45 + 5; anchored end says **no plates**.
- Barbell Bench Press at 95 total remains **25 / side**, confirming normal two-sided barbell behavior was not changed.
- Landmine cards show the field label **Total weight (45 bar + loaded end)**.

### Barbell Strength Only short secondary
Synthetic completed Conditioning workout in the Barbell Strength Only phase with home kettlebells available:

- Post-workout Log correctly showed Short secondary / Full second workout / Build another.
- Choosing Short secondary produced **Calisthenics** (Incline Push-Up + Prone Y-T-W) rather than a kettlebell microdose.
- It did not label the secondary as KB Heavy.

### Full second-workout candidate set
After one completed full Conditioning session, automatic full-second candidates were:

- Generic Gym
- Strength-Endurance
- Calisthenics
- Conditioning

No KB Heavy / KB Power / KB Volume candidate was present.

## Static/package validation

- Production build: **36.115**.
- Production `index.html`: 426 IDs, no duplicates.
- Self-contained build: 428 IDs, no duplicates.
- All inline JavaScript in both production and self-contained builds passed `node --check`.
- `app-shell-v36.115.js` passed `node --check`.
- `version.json` and `manifest-v36.webmanifest` parse as valid JSON.
- Every required file listed by `version.json` exists.
- Service worker uses v36.115 and retains fail-closed required precaching.
- No stale v36.114 references remain in the production runtime files.

## Responsive regression

Major views were navigated at **320×800, 390×844, 768×1024, and 1440×1000**.

At every viewport:

- 0 JavaScript page errors
- 0 console errors/warnings
- 0 horizontal-overflow failures
- no visible `undefined`, `NaN`, or `[object Object]` artifacts

## Scope note

This release does **not** change primary workout recommendation scoring. The KB change is specifically an automatic short-secondary phase guard plus a labeling/storage correction. Manual KB workouts remain available.
