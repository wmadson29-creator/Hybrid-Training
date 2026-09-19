# Hybrid Training v36.126

## Actual work is authoritative

- Primary, full-secondary, short-secondary, and unplanned sessions now share the same actual-load path.
- Cardio plans retain their planned duration separately from the duration actually entered.
- Strength retains planned sets, reps, and load separately from the performed values.
- Edited partial workouts use the entered actual values directly instead of applying a second generic partial-completion discount.
- The saved row records its planned-versus-actual relation, response quality, session role, and dose ratio when the comparison is valid.

## How later recommendations respond

- Recent workout accumulation is weighted by completed dose instead of treating every completed session as equal.
- A 20-minute completion of a planned 45-minute swim therefore contributes about 20 minutes of endurance work and materially less short-term load than the plan.
- More work than planned increases actual fatigue and rolling stress immediately.
- Repeated over-plan work can raise learned capacity only when the completed sessions are tolerable and later recovery or performance supports that interpretation.
- A hard, sloppy, painful, very rough, or high-decoupling over-plan session cannot be used as positive capacity evidence.
- Unplanned workouts contribute their actual completed load even though they have no planned-dose ratio.

## Data durability

- Full-secondary identity now survives active-draft restore, JSON export/import, and History Edit.
- Planned duration and actual-load audit fields survive JSON export/import and are included in CSV export.

## QA

- `npm test`: 80/80 checks passed.
- Added executable cases for 20-of-45-minute cardio, shortened primary strength, tolerated and costly over-plan work, unplanned work, partial-workout double-discount prevention, and full-secondary round trips.
