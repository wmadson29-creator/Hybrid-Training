# Hybrid Training v36.116 — QA Report

## Scope
v36.116 changes how completed resistance work contributes to modelled training dose. The change is global across resistance sessions rather than chest-specific. Barbell Strength programming/max logic is intentionally unchanged.

## Root issue found
The resistance stimulus path called `utmRowConditioningRpe(row)`, which only used an exact numeric RPE (or conditioning-component RPE). When a resistance exercise had no exact RPE, the broad on-screen Exercise Effort choice such as `Too easy`, `Easy`, `Comfortable`, or `Challenging` was not reaching the resistance stimulus calculation. The model therefore fell back to a neutral 0.80 proximity credit even when the user had explicitly marked the exercise Easy.

v36.116 separates conditioning RPE from resistance effort. Resistance stimulus now uses `effectiveEffortRpe(row)`, so the inline Exercise Effort choice is part of effective-volume, strength-stimulus and acute-fatigue calculations.

## Effort-to-dose calibration
For a representative 3×8 resistance exercise with no exact RPE:

| Exercise effort | Effective RPE | Hypertrophy credit | Strength credit | Modelled effective sets |
| --- | ---: | ---: | ---: | ---: |
| Too easy | 3.5 | 0.28 | 0.58 | 0.84 |
| Easy | 5.0 | 0.50 | 0.72 | 1.50 |
| Comfortable | 6.5 | 0.72 | 0.84 | 2.16 |
| Challenging | 8.0 | 0.92 | 0.94 | 2.76 |
| Very hard | 9.25 | 1.04 | 1.00 | 3.12 |

Unknown/Not sure remains neutral rather than being guessed as easy or hard. Exact RPE still takes precedence when confidently entered; a rough RPE remains blended with the broad effort label.

## Current-data regression
Loaded the user's `hybrid-training-export (14).json` state (90 log rows) directly into the v36.116 model.

- Training maxes remained unchanged: Squat 275, Row 215, Chest 175, Incline 150, Deadlift 325.
- The primary recommendation for 2026-09-13 remained Conditioning → LSS Row; no fallback was invoked.
- Automatic second-session modality scoring was not rewritten by this change.
- Resistance volume became effort-adjusted. Chest effective-volume examples:
  - As of 2026-09-13: v36.115 = 15.6; v36.116 = 11.3.
  - As of 2026-09-14: v36.115 = 14.4; v36.116 = 9.7.
  - As of 2026-09-15: v36.115 = 9.6; v36.116 = 6.0.
- The automatic Gym focus ranking therefore becomes more willing to revisit muscles whose recent work was completed too easily, while still allowing other higher-need muscle groups to outrank them.

Recent Chest / Incline rows marked Easy now receive approximately 1.5 effective sets from a programmed 3-set exposure instead of being treated as the same neutral dose as a harder exposure.

## What the change affects
Effort-adjusted resistance stimulus feeds:
- effective muscle volume / undertrained-vs-overtrained scoring,
- automatic Gym muscle-group selection,
- recent fatigue and stress accounting,
- dose-response learning,
- latent fitness/fatigue state,
- workout stimulus summaries and longitudinal stimulus channels.

It does **not**:
- rewrite a Barbell Strength training max mid-block,
- alter the fixed Barbell Strength wave,
- turn an Easy workout into a missed workout,
- zero out low-effort technique/practice work,
- change conditioning/RPE logic.

## Responsive / runtime regression
Tested self-contained v36.116 with the current exported state:

- 320×800: 0 page errors, 0 console warnings/errors, no horizontal overflow.
- 390×844: 0 page errors, 0 console warnings/errors, no horizontal overflow.
- 768×1024: 0 page errors, 0 console warnings/errors, no horizontal overflow.
- 1440×1000: 0 page errors, 0 console warnings/errors, no horizontal overflow.
- No visible `undefined`, `NaN`, `Infinity`, or `[object Object]`.
- Runtime diagnostics remained empty.
- All inline scripts and the modular shell pass `node --check`.

## Result
PASS. Broad resistance effort now materially changes modelled training dose, and the change is general across muscles/exercises rather than special-cased to chest.
