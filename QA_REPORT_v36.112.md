# Hybrid Training v36.112 QA

## Loading audit
- Half-Kneeling Landmine Press: one loaded end. 70 total -> 25 on loaded end; anchored end has no plates.
- Landmine Row: one loaded end. 95 total -> 50 on loaded end; anchored end has no plates.
- Barbell Bench Press: still symmetric, 95 total -> 25 per side.
- Trap-Bar Deadlift: no conventional barbell plate helper, including for planned/prescribed rows.

## Library audit
All current Barbell entries were reviewed. The only anchored one-end Olympic-bar movements in the current library are Half-Kneeling Landmine Press and Landmine Row. Trap-Bar Deadlift is a separate nonstandard-implement case and is intentionally visual-suppressed. Other barbell movements are symmetric two-end loads.

## Regression
No recommendation scoring, fatigue, recovery, scheduling, or progression formulas were changed. Build/service-worker references resolve to v36.112.

## Browser verification
The self-contained build was exercised through the actual Log Workout UI at 390 px width:
- Half-Kneeling Landmine Press at 70 displayed `25 on loaded end`, `1×25`, and `anchored end / no plates`.
- Landmine Row at 95 displayed `50 on loaded end`, `1×45 + 1×5`, and `anchored end / no plates`.
- Trap-Bar Deadlift at 165 displayed no conventional plate visual.
- Barbell Bench Press at 95 still displayed `25 / side`.
- No page errors or console warnings/errors occurred.

The Sep 13 exact-state recommendation regression also remained unchanged: the full primary model selected Conditioning → LSS Run (40–55 min, RPE 4–5) with no runtime diagnostics or page/console errors.

Responsive regression at 320×800, 390×844, 768×1024 and 1440×1000 showed no page errors, no horizontal-overflow failures, and no visible undefined/NaN/Infinity/[object Object] artifacts across the major views.
