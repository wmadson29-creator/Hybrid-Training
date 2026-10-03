# Hybrid Training v36.142

This release slows the Barbell Ab Crunch Machine progression, verifies Deadlift stays out of the KB/Hybrid phase, and repairs inconsistent or impractical workout advice. Automatic secondary recommendations now agree across the badge, detail card, and calendar; full SE avoids consecutive automatic days; primary/secondary pairings account for location and travel time.

## Resulting behavior

- **Deadlift placement:** Hybrid/KB-phase barbell plans omit Deadlift. TB-only Monday/Friday retain one work set and Wednesday retains none. This omission already existed in the standard Hybrid builder; the release preserves it and adds six-wave, future, and moved-source checks. Pull-up remains first and Squat second.
- **Slower Barbell abs:** the machine supports 5 lb steps. The volume ladder remains 3×15 → 3×18 → 3×20 → 4×15 → 4×18 → 4×20. Each volume step requires three consecutive comfortable comparable completed dates. Four comfortable 4×20 exposures earn +5 lb and a reset to 3×15. A clean first load increase therefore takes 19 exposures. Unknown/hard/painful/partial/skipped results do not earn advancement; recovery can hold it. Same-day duplicates, other Gym work, and short secondaries do not accelerate it. Historical weights, including 65 lb, stay intact. Ordinary Gym finishers keep their existing progression policy.
- **One automatic secondary decision:** use the actual completed primary when available, otherwise the forecast-resolved primary. The calendar and detail card no longer score different stale primary types. Recommended None shows No secondary without a workout-opening action below it.
- **Explicit optional choices:** Best short/full remain available when a compatible plan can be built. Choosing one is labeled Selected optional / Your choice in the card and Selected in the future calendar. The badge continues to report the underlying automatic recommendation, including None.
- **SE spacing:** automatic full SE primaries and secondaries avoid a full actual/projected SE session the prior day. An explicit next-day manual SE also reserves the adjacent automatic day. A short SE add-on is not treated as a full session. Deliberate manual choices and the fixed Base Building template keep their authority.
- **Future generated choices can reflow:** adaptive-recommended snapshots on future days remain advice. They cannot lock old SE choices onto both days. Manual switches, custom plans, and actual completions remain authoritative. Expected-primary caches distinguish prospective from live history.
- **Useful pairings at the same place:** location preference applies across full-secondary families and short-work equipment. Gym primaries favor available gym cardio/equipment, such as stationary bike, row machine, elliptical, or stairs. Home primaries can use home Cal/KB equipment, outdoor cardio, or accessible swimming. Home SE is built without gym-only machines. An inline Auto/Home/Gym choice handles ambiguous primary locations.
- **Travel affects feasibility:** matching locations adds 3 score points; a location change subtracts 6 and adds an estimated 15 minutes to the two-workout time budget. Stronger needs can still justify a different-location full workout. These are app convenience estimates, not measured travel times or biological thresholds.
- **Honest duration:** only explicit minute units count as minutes. “2 circuits,” interval distances, and seconds cannot become a two-minute workout. Triples’ two circuits are estimated at 60 minutes. Automatic full aerobic secondaries use complete single activities. Forecasts retain the midpoint of an explicit minute range.

The seven-day Hybrid schedule, coordinated KB A/B/C program, Barbell waves/Pull-up progression, manual commitments, completed history, saved custom workouts, drafts, and active/paused workout handling are retained. Automatic extras remain off Barbell days; KB primary extras retain their existing stricter policy. The bundle also includes the cumulative v36.140/v36.141 reliability, KB, secondary execution, and forecast changes.

## Validation

Passed **292 static/export-seeded checks** across six suites: 19 static, 90 browser/PWA, 62 KB/secondary execution, 26 forecast, 56 Barbell/ab, and 39 secondary logic/location/duration checks. The separate empty-history browser/PWA run passed **84/84**. No uncaught page errors were observed in the final suites. The optional-secondary mobile card was visually inspected. See `QA_REPORT_v36.142.md` for scenarios and limits.

## Install on the existing GitHub app

1. Extract `Hybrid_Training_v36_142_GitHub_Update.zip`.
2. Upload its contents over the corresponding existing repository paths, preserving the nested `tests/` folder, and commit the bundle together. Keep the other existing app assets.
3. Wait for Pages deployment, reopen the app at its existing address, and confirm build **36.142** and saved data.

This is a cumulative new/modified-file delta from the reviewed v36.139 baseline; it also updates v36.140/v36.141 and restores tests omitted from the verified v36.140 upload. It contains 24 paths and excludes the private export, browser downloads, dependencies, and temporary screenshots. This work prepared the ZIP; it did not push or deploy it.

`RELEASE_HISTORY_AND_CHAT_HANDOFF.md` retains the complete 148-commit archive, decisions, research, and current-release status. The separate handoff has identical contents. `KETTLEBELL_RESEARCH_v36.141.md` remains the program’s research record; the KB program was not redesigned in this release.

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
```

Use `HYBRID_CHROMIUM_PATH` for an existing executable. Keep private exports out of GitHub. Tests inject hooks through their local server; deployed HTML has no QA interface.
