# Hybrid Training v36.119 — Secondary Frequency QA

## Scope
This follow-up verifies that automatic **Short** and **Full** secondaries are not merely representable in the UI, but can actually win the scheduling logic on appropriate weekdays/weekends without removing the model's hard recovery/interference protections.

## Root causes corrected
1. **Barbell weekday short hard-gate:** the whole-body Barbell Strength demand fingerprint commonly reached upper/lower demand ≈1.0. The prior upper-demand hard rejection therefore made short Barbell-day secondaries effectively unreachable. This is now a score penalty rather than an unconditional rejection.
2. **Full-secondary opportunity spacing:** weekday full-double thresholds/window spacing were too sparse for normal calendar visibility. The planner now evaluates a roughly weekly rolling opportunity while retaining score, recovery, tissue, future-anchor, recent-double, and adjacency constraints.
3. **Overly binary modality gates:** compact sprint/HIC and KB Heavy/Power days can now qualify for carefully reduced add-ons when their measured cost permits, rather than being rejected primarily because of their label.

## Current-data regression
Using the saved current-data fixture:
- Tuesday Sep 15 primary: **Sprints / HIC — Fast 5 Tempo Run**, automatic Secondary **None**.
- Wednesday Sep 16: **Barbell Strength**, automatic Secondary **Short — Swim ~12 min**.
- Saturday Sep 19: **LSS / Aerobic — LSS Swim**, automatic Secondary **Full — Gym, 50 min**.
- The seven-day calendar still contains multiple **None** days; the calibration did not turn secondaries into a daily default.
- A longer prospective regression produces both weekday Short and weekday Full outcomes.

## Secondary control regression
The six-choice matrix remains intact:
- Model recommended
- Recommended short
- Custom short
- Recommended full
- Custom full
- No secondary

On Sep 15, choosing **Recommended short** changes the calendar to `Short • Override • light upper-body • ~10 min`; choosing **Recommended full** changes it to a complete 40-minute full secondary; choosing **No secondary** returns the calendar status to `None`. Custom Short exposes LSS / Aerobic, Sprints / HIC, Generic Gym, Calisthenics, SE microdose, Kettlebell, and Blank custom.

## Layout / runtime regression
Tested at 320, 390, 768, and 1440 px:
- horizontal overflow: **0 px** at every width
- new Secondary matrix instances: **1**
- legacy Optional Secondary panels: **0**
- browser page errors: **0**
- console errors/warnings: **0**

Warm same-state render testing on the 390 px fixture remained in the low-single-digit millisecond range for full renders in this run. The change does not reintroduce the earlier multi-second interaction regression.
