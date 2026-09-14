# Hybrid Training v36.117 — QA report

## Scope

v36.117 changes scheduling/model behavior, not Barbell Strength TM progression. QA used the user's current v36.115 export as the starting state and treats future workouts as forecast/simulation only.

## Exact-state model checks

- Build loads as `36.117` with the current export.
- Runtime diagnostics: 0.
- Page errors: 0.
- Console warnings/errors: 0.
- Current Barbell TMs remain unchanged: squat 275, row 215, chest 175, incline 150, deadlift 325.
- Fixed Barbell / KB anchors remain authoritative.
- Base Building stays outside the new athletic-development optimizer.

### Forecast from the exact current state

The forward projection now includes fixed future Barbell/KB work and projected flexible work so later recommendations do not pretend scheduled strength sessions disappear.

| Date | Result |
|---|---|
| 2026-09-14 | Barbell Strength — fixed |
| 2026-09-15 | Conditioning — Connaught Range 10 to 1s — speed/quality lane |
| 2026-09-17 | Conditioning — LSS Run + light upper-body secondary |
| 2026-09-19 | Conditioning — LSS Run + light upper-body secondary |
| 2026-09-20 | Generic Gym — upper/accessory biased, optimized ~45 min; reserves a true aerobic second-session slot |
| 2026-09-21 | Barbell Strength — fixed |
| 2026-09-22 | Conditioning — LSS Run + light upper-body secondary |

The Saturday forecast does **not** force a second hard run after the projected Tuesday quality session already satisfies the rolling speed/quality target. This is intentional: weekend availability increases capacity but does not create a hard-session obligation.

## Weekend stacking checks

- Barbell-only Sunday receives a full-Gym weekend-capacity bias while the Gym builder protects the Monday anchor.
- The Sunday Gym recommendation does not also attach the old short 10-minute cardio add-on; the slot is reserved for a true full second session.
- Simulated completion of the Sunday Gym session produced a recommended full second session of **LSS Swim 40–50 min, RPE 4–5** when recovery remained normal.
- Weekend double/triple-session logic remains recovery-gated rather than mandatory.

## Hybrid phase checks

Simulated future Hybrid anchors (2 Barbell + 3 KB) retained all fixed anchors and allowed compatible aerobic doubling:

- KB Heavy -> **LSS Run 30–40 min** when run dose was under target and lower-body recovery was normal.
- KB Power -> **LSS Swim 30–40 min**; power quality is protected and automatic same-day aerobic work stays easy/low-impact.
- KB Volume -> **LSS Swim 35–45 min**.
- Strength-Endurance and Calisthenics automatic need are reduced in Hybrid mode because fixed kettlebell work already supplies overlapping strength-endurance/work-capacity stimulus.

## Running progression guard

Current usable history found a longest prior-30-day run of about **4.6 mi** with an estimated pace around **10.5 min/mi**. The tested upcoming LSS prescriptions stayed below the model's ~110% single-run progression caution threshold, so no unnecessary cap was triggered.

The rule is implemented as a planning caution, not an injury prediction and not an acute:chronic workload-ratio threshold.

## Regression checks

- Forecast conditioning cache key includes the requested run/cardio/speed lane.
- Gym / Calisthenics / Strength-Endurance are need-driven rather than equal-frequency quotas.
- Other cardio contributes to aerobic dose without owning an equal-frequency lane.
- Hard running/speed work gets stronger same-day/adjacent interference penalties around strength and power than easy low-impact aerobic work.
- Cardio productive credit uses duration plus available effort/output context; easy aerobic work remains productive.
- Inline JavaScript syntax: clean.
- `app-shell-v36.117.js` syntax: clean.
- Responsive checks at 320, 390, 768, and 1440 px: no horizontal overflow and no visible `undefined` / `NaN` artifacts.

## Release status

PASS for deployment.
