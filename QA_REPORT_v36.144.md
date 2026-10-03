# v36.144 validation

Executed with Node 24.19.0, Playwright 1.62.1, Chromium Headless Shell 154.0.8037.92, a 412×915 viewport, and America/Phoenix dates. The harness freezes application dates while preserving a real monotonic clock for waits. Local Chromium does not reproduce Android hardware.

## Passed check sets

| Check set | Result |
| --- | ---: |
| Syntax, build agreement, required assets/precache, test commands | 19 / 19 |
| Browser/PWA regression with the supplied export | 90 / 90 |
| KB program, progression, and secondary execution | 62 / 62 |
| Forecast assumptions, manual reflow, prescriptions, and variety | 26 / 26 |
| Barbell phase placement and capped slow machine-abs progression | 57 / 57 |
| Secondary agreement, SE spacing, location, and duration | 39 / 39 |
| Secondary frequency, real feasibility, and cache context | 29 / 29 |
| Gym hanging/floor abs, availability, load, progression, and UI | 27 / 27 |
| Class focus, muscle modeling, logging, and persistence | 27 / 27 |
| Substitute prescription recalculation across Log and builders | 18 / 18 |
| Separate empty-history browser/PWA regression | 84 / 84 |

The ten static/export-seeded suites total **394 checks**. Empty-history coverage is additional. No uncaught page errors occurred in the final suites. Synthetic fixtures restore the supplied state; they are test cases rather than completed user workouts.

The unchanged supplied export records build v36.138: 165 workout rows, 34 recovery dates, seven bodyweight measurements, no wearable-session rows, no completed KB work, and no saved custom KB workouts. Workout dates span August 26–September 28. No newer full export was available. Existing preservation checks retain actual rows, recovery, measurements, manual commitments, and custom routines; forecast rows stay temporary.

## New dose and substitution scenarios

- The Barbell finisher holds 3×15 after one through five comparable comfortable dates, then earns 3×18. Five 3×18 dates hold; six earn 3×20. Five top-step dates hold; six earn exactly +5 lb and a reset. A complete clean simulation holds after 17 results and earns the first increase after result 18.
- Historical 4×15/18/20 records map to capped three-set recommendations without rewriting those records or earning the new exact-dose streak. A hard historical 4×20 result backs off to 3×18 at the same load. Recovery Guard, pain, challenging/unknown effort, partial/skipped latest results, stale exposures, other Gym work, short secondaries, duplicates, and separate same-day workouts cannot accelerate the ladder.
- Hybrid/KB-phase Barbell omits Deadlift across six wave weeks, projections, and moved-source prescriptions. TB-only Monday/Friday retain one Deadlift work set. Pull-up-first/Squat-second order and the ab finisher persist.
- The direct Log picker and swap menu produce identical sets/reps/load for Hanging Leg Raise. They preserve original machine plan metadata. Loaded Gym substitutes use the replacement's own history. Returning to Barbell machine abs restores its slow capped policy. A programmed Deadlift uses its own one-set wave dose. Difficult SE hanging abs retain circuit count with bounded exercise-specific reps and bodyweight.
- Gym builder changes replace old manual sets/reps/load and recalculate rest. Calisthenics changes update sets, reps/hold, rest, and resistance. KB changes replace sets/reps, clear the prior manual bell weight, and display the replacement's fresh adaptive weight. Unknown custom substitutes cannot inherit unrelated dose fields.

## Gym bodyweight core scenarios

Both requested hanging variants exist in Gym and retain their Calisthenics identities. The harder leg raise has a lower controlled rep range. Captain's Chair remains separate. Automatic targets and successful history keep zero external load, while explicit added resistance remains possible. Hardware rounding no longer changes bodyweight zero into 5 lb.

Main Gym bar availability is separate from the home Calisthenics setting. Explicit date-level lack of a bar and disabled exercise availability exclude hanging options; floor abs stay available. Bodyweight-only Gym construction and finishers do not force a machine, and the timed builder avoids stacking both hanging variants. Untimed core stays outside the selected duration. The actual library/picker shows all five new Gym options, and opening the lazy movement guide loads the hanging instructions.

## Class-focus scenarios

Pilates offers trunk/leg exercise choices; other classes offer relevant alternatives and additional body areas. An empty checklist reproduces the prior fingerprint exactly. Core-heavy and leg-heavy Pilates produce different actual recent muscle-fatigue and fractional development/volume credit. Selection count does not increase total class conditioning load, strength evidence, or effective-set proxy; all muscle weights stay bounded. Skipped classes earn no stimulus. Class focus does not create direct hanging-raise capability exposures. Known custom exercise names refine emphasis; unknown names remain notes with no invented mapping.

Actual UI checks cover multiple checkbox selections, custom text, draft restoration, a started/paused workout, Complete Workout, History summary, completed-class editing, and saved selections outside the current suggestion list. Save preserves original supplied workouts and creates no fictional resistance sets/reps/load. Import normalization retains selected/custom focus and rejects malformed arrays.

## Retained regressions and visual review

The unchanged behavior suites revalidate coherent eleven-file updates, active/paused deferral, Later, failed backup, safety snapshots, worker activation/reload, offline reopening, actual swim identity, completed-only calendar attribution, rare Cal/SE reachability, manual commitments, full-secondary execution, KB progression/hardware/time/custom routines, exact prospective prescriptions, distant variety, automatic None agreement, full-SE spacing, same-location pairing, honest conditioning duration, and practical secondary feasibility.

The updater fixture publishes 36.145/36.146 above the current 36.144 build and verifies the exact newer URL version. The expanded exercise module is included in the coherent deployment.

Phone-width screenshots of the open Pilates focus checklist and Gym bodyweight abs library were inspected. The checkbox grid, checked state, custom text, exercise names, and muscle/support descriptions fit without horizontal overflow. Screenshots are validation artifacts and are excluded from the release ZIP.

## Reproduction and limits

Run `npm run test:all`. Individual additions are `npm run test:core`, `npm run test:class`, and `npm run test:substitution`. Set `HYBRID_TEST_EXPORT` to a private input and `HYBRID_CHROMIUM_PATH` to an existing browser. Optional `HYBRID_CORE_SCREENSHOT` and `HYBRID_CLASS_SCREENSHOT` write the relevant UI captures.

No fresh controlled performance comparison, current GitHub HEAD check, installed-phone verification, or deployment was performed. Prior 35-day secondary-frequency and 85-day forecast counts retain their historical version labels; they were not re-measured for v36.144. The current suites check the relevant guards and scenario behavior, not promised frequencies.

The three-set cap, six-result progression gates, rep windows, and class blend (25% baseline / 75% mean recognized emphasis) are app policies, not scientifically unique constants. Class focus is qualitative: the user supplies no per-exercise class time, actual sets, or reps, so the model retains bounded class evidence and does not claim exact hypertrophy equivalence. Direct comparable performance still governs a lift's progress. Older class rows without focus retain their existing priors; no missing focus is fabricated.
