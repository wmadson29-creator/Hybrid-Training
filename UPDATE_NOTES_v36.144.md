# Hybrid Training v36.144

Gym abs can use hanging and floor exercises, Barbell abs stop at three sets, and class logs can record the exercises and muscles emphasized. Changing an exercise recalculates its prescription in both Log and the builders.

## Resulting behavior

- **Hanging abs are actual Gym options.** Hanging Knee Raise and Hanging Leg Raise join Reverse Crunch, Dead Bug, and Bicycle Crunch in the Gym catalog, abs filters, exercise picker, substitutions, and core-finisher pool. Their existing Calisthenics identities and history are retained. Captain's Chair remains a separate supported exercise. Hanging options require an available bar; floor options need no machine. Main Gym availability is separate from the home Calisthenics equipment switches.
- **Bodyweight remains bodyweight.** The automatic target starts with zero external load. Successful bodyweight history progresses within the movement's bounded rep range, without inventing a 5 lb machine load. A deliberate added load remains available. The harder straight-leg raise uses fewer reps than the knee raise. Bodyweight is an inline Gym equipment preference, including the extra core finisher; core finishers still sit outside the selected workout duration.
- **Barbell machine abs are capped at three sets.** The ladder is now 3×15 → 3×18 → 3×20, with six consecutive comfortable completed Barbell dates at each exact load and dose before progressing. Six comparable top-step results earn +5 lb and a reset to 3×15. This takes 18 comfortable exposures from the baseline to the first load increase, close to the previous 19-exposure pace while removing the 80-rep step. Past four-set results stay intact; the next recommendation maps to three sets, and old four-set records do not earn the new exact-dose streak. Quality, pain, effort, partial/skipped results, recency, distinct dates, and recovery gates remain active. Ordinary Gym machine-abs progression retains its separate existing policy.
- **Classes have an optional exercise-focus checklist.** Pilates and other known classes show relevant exercises, additional body-area choices, and optional custom exercise names on the actual log card. Selections survive drafts, active/paused logging, saving, editing, History, and export/import normalization. Unknown saved selections remain editable even when absent from the current suggestions.
- **Class focus reaches the model.** Recognized selections refine the class's muscle/movement fingerprint. Muscle-specific fatigue, recovery overlap, and bounded development/volume credit now distinguish, for example, trunk-heavy Pilates from leg-heavy Pilates. Duration, effort, class type, and available actual metrics still set the overall class dose. More checkboxes cannot multiply that dose. Empty selections retain the previous class prior. Class focus never creates fictional resistance sets/reps or direct performance evidence for a lift; an unknown custom exercise is retained without inventing a muscle map.
- **Substitutes get fresh sets, reps, and weights.** The swap menu and direct Log exercise picker share recalculation. Gym and Calisthenics builders also update all prescription fields and rest; KB builder changes discard the previous manual load and show the substitute's new adaptive weight. Direct history, current equipment, movement-specific ranges, the programmed wave/circuit role, and the core-finisher policy inform the new dose. Difficult hanging abs do not inherit a high-rep SE dose. Original planned targets remain separately recorded; unknown custom exercises require their own entered prescription.
- **Generated advice refreshes.** The recommendation model stamp advances to 10. Explicit manual commitments, saved custom routines, completed workouts, and the cumulative v36.140–143 secondary/forecast/update repairs retain their authority.

## Validation

Passed 394 static/export-seeded checks across ten suites: 19 static, 90 browser/PWA, 62 KB/secondary execution, 26 forecast, 57 Barbell/ab, 39 secondary logic, 29 frequency, 27 Gym/core, 27 class-focus, and 18 substitution checks. A separate empty-history browser/PWA run passed 84/84. The phone-width class checklist and Gym bodyweight abs catalog were visually inspected. See `QA_REPORT_v36.144.md` for scenarios and limits.

The three-set cap, six-result gates, and class-emphasis blend are app design choices for this hybrid plan, not uniquely established physiological doses. General volume guidance supports adapting work to the complete week and individual response; it does not prove that 4×20 is universally excessive or that this exact replacement is optimal. Primary-source context: [ACSM resistance-training guidance, March 17, 2026](https://acsm.org/resistance-training-guidelines-update-2026/) and [ACE abs exercise library](https://www.acefitness.org/resources/everyone/exercise-library/body-part/abs/).

## Install on the existing GitHub app

1. Extract `Hybrid_Training_v36_144_GitHub_Update.zip`.
2. Upload the included paths over the corresponding existing repository files, preserving `tests/` and its helpers. Commit this bundle together and keep other existing app assets.
3. Wait for Pages deployment, reopen the existing address, and check build **36.144** and saved data.

The ZIP contains 34 cumulative new/modified paths from the reviewed v36.139 baseline and can also update v36.140–143. It includes the changed stable-name `exercise-expansion-v36.128.js` module and the new test/release files. It excludes private exports, browser downloads, dependencies, screenshots, and temporary analysis. This work prepared the release; it did not push or deploy it.

`RELEASE_HISTORY_AND_CHAT_HANDOFF.md` and the standalone handoff have identical contents and retain the verified 148-commit archive. Prior research and QA files keep their historical version labels.

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
```

Use `HYBRID_CHROMIUM_PATH` for an existing browser executable. New individual commands are `test:core`, `test:class`, and `test:substitution`. Hooks are injected only into the local test server.
