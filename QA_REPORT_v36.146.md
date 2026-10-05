# v36.146 validation

Executed with Node 24.19.0, Playwright 1.62.1, Chromium Headless Shell 154.0.8037.92, a 412×915 viewport, and America/Phoenix dates. Application dates are frozen while the monotonic performance clock remains real. Local Chromium does not reproduce the user's Android hardware.

## Executed check sets

| Check set | Result |
| --- | ---: |
| Syntax, build agreement, required assets/precache, test commands | 19 / 19 |
| Browser/PWA regression with the supplied export | 90 / 90 |
| KB variety, progression, hardware, and secondary execution | 75 / 75 |
| Forecast assumptions, manual reflow, prescriptions, and variety | 26 / 26 |
| Barbell placement and capped slow machine-abs progression | 57 / 57 |
| Secondary agreement, SE spacing, location, and duration | 39 / 39 |
| Secondary frequency, feasibility, and cache context | 29 / 29 |
| Gym hanging/floor abs, availability, load, progression, and UI | 27 / 27 |
| Class focus, muscle modeling, logging, and persistence | 47 / 47 |
| Substitute prescription recalculation | 18 / 18 |
| Separate empty-history browser/PWA regression | 84 / 84 |

Current static/export-seeded coverage totals **427 passing checks**, plus the **84-check empty-history run**. The first `test:all` invocation passed static, browser, and all 75 KB checks, then stopped on a forecast assertion that expected B's replaced Single-Arm Row. The assertion was updated to expect Gorilla Row; the forecast and all subsequent suites were then run. No production correction was needed for that stale expectation. After refining the lunge's rep-range text to say “per leg,” the final 75-check KB and 19-check static suites passed again. Successful browser suites reported no uncaught page errors.

## New kettlebell regressions

- A is unchanged, all three paired-bell exercise lists differ, and exercises stay stable across blocks.
- B has Gorilla Row with `/side` reps and its own cue. C has Single-Arm Strict Press and Double Reverse Lunge with `/side` and `/leg` targets.
- Single-bell equipment maps C's lunge to Single Rack Reverse Lunge, preserves rep units, and supplies the replacement's cue and load.
- The week retains eight press sets, seven leg sets, seven row sets, and 170 swings. Leg coverage accepts a squat or lunge while each session still requires pressing, rowing, and a hinge.
- The actual model fingerprints retain shoulder/lat/quad/glute and lunge evidence for the changed movements. This verifies attribution in the app, not a measured physiological outcome.
- Presets and generated rows carry recipe version 146.
- Exact C strict-press history earns 7/side from two comfortable 3×6/side exposures at 16 kg. Exact C lunge history at its rep ceiling earns the next available 18 kg setting and resets to 6/leg. Exact B Gorilla Row history earns 11/side from 10/side.
- Unrelated old C clean/press and front-squat loads, and old B Single-Arm Row loads, do not become the new movements' absolute load prescriptions. Original logs remain intact.
- The actual mobile C builder shows four rows, Single-Arm Strict Press at 6/side, and Double Reverse Lunge at 6/leg. The screenshot was visually inspected; earlier mobile no-overflow coverage remains passing.
- Future Friday KB projection includes Gorilla Row. Displayed and shadow-history prescriptions still agree on exercise, sets, reps, and weight.

The retained KB tests cover hardware, fit-to-time/rest, rep/load/round progression, effort/recovery gates, full/partial/short roles, saved custom routines, existing 2+3+2 placement, full-secondary start/save, exact activity identity, and complementary aerobic doubles. Retained suites cover slow three-set Barbell machine abs, Hybrid Deadlift omission, None/selected-option agreement, same-place pairings, SE spacing, practical secondary opportunities, Gym bodyweight abs, class muscle input and persistence, and substitute recalculation.

## Package and data preservation

The private fixture remains the supplied v36.138 export: 165 workout rows, 34 recovery dates, seven bodyweight measurements, and no completed KB rows or saved custom KB routines. Tests restore original state and assert preservation. Synthetic KB history exercises progression without claiming the user completed those workouts.

The cumulative ZIP has 39 paths. Archive integrity, safe relative paths, file-by-file equality with the prepared source, required new documents, build stamps, and identical standalone/repository handoffs were checked. The verified archived-commit body remains unchanged. Private exports, dependencies, browser binaries, helper scripts, and screenshots are excluded.

No current GitHub HEAD, installed phone build, deployment, new completed KB data, or controlled Android/startup benchmark was obtained. This update changes movement variety and existing model input; it does not prove an individual muscle-building or conditioning response.

## Reproduce

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:kettlebell
npm run test:browser
```

Use `HYBRID_CHROMIUM_PATH` for an existing Chromium executable. Test hooks are injected only by the local test server and are absent from the deployed interface. Keep private exports outside the GitHub bundle.
