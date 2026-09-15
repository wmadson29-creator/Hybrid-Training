# Hybrid Training v36.119 — Weekend / Historical Calendar / Gym Context / Base Building QA

Date: 2026-09-15

## Scope
This follow-up verifies four user-visible changes without altering the existing primary-switch behavior:
1. explicit weekend package selection among 2 full only, 2 full + 1 short, 2 full + 2 short, and 3 full;
2. historical calendar cards show actual completed work rather than regenerated recommendations;
3. gym-on-site short-secondary logic covers Barbell Strength and gym cardio such as rower/stair-stepper;
4. Base Building presents Conditioning as LSS / Aerobic versus Sprints / HIC.

## Current-data regression results
Using the user's current-data fixture:
- Sep 19–20 resolves to **2 full + 2 short**: Saturday receives the ordinary short candidate and Sunday receives a true capped weekend microdose. This proves the new package shape is reachable.
- Later prospective weekends still resolve to **3 full** when the third full session clearly provides more value, so the new package is not forced every weekend.
- Sep 12 historical calendar now shows **Primary: Generic Gym** from the actual log and **Secondary: Full • LSS / Aerobic • LSS Walk** from the actual second completed session. It no longer shows the old recommended Sprints / HIC primary.
- Sep 13 historical calendar shows **Primary: LSS / Aerobic • Completed: LSS Run**, matching the actual log.
- Barbell Strength is gym-on-site and produced valid low-overlap gym-accessory candidates in regression (examples: Reverse Pec Deck + Machine Lateral Raise). Calf accessories are explicitly de-prioritized.
- `LSS Rower` and `LSS Stair Stepper` both resolve as gym-based context with `allowGym=true` and `allowBarbell=true`; no special gym trip is assumed because the user is already there.

## Base Building family split
Schedule-contract regression verifies:
- **Weeks 1–5:** Tuesday/Wednesday/Saturday endurance work is presented as **LSS / Aerobic**.
- **Weeks 6–8:** Tuesday/Friday is presented as **Sprints / HIC**; Saturday is **LSS / Aerobic**.
- The internal `Conditioning` key remains intentionally unchanged for backward compatibility and existing engine logic.

## Secondary/session history
Newly saved log rows persist `secondarySessionRole` plus short/full flags. Historical reconstruction also supports older data by splitting adaptive-secondary rows from the primary group and classifying additional non-short completed session groups as full secondaries.

## UI / performance regression
- Secondary matrix buttons present: Model recommended, Recommended short, Custom short, Recommended full, Custom full, No secondary.
- Legacy Optional Secondary panel count: 0.
- Horizontal overflow: **0 px** at 320, 390, 768 and 1440 px widths.
- Browser page errors: 0.
- Browser console errors/warnings: 0.
- Current-data fixture render: ~2.4 s in the container browser; repeated warm full renders: ~3–5 ms.

## Result
PASS.
