# v36.141 validation

Executed with Playwright 1.62.1, Chromium Headless Shell 154.0.8037.92, a 412×915 viewport, and America/Phoenix dates. Application dates are deterministic; performance uses a real monotonic clock. These checks do not reproduce Android hardware or every legacy export.

## Final passed checks

| Check set | Result |
| --- | ---: |
| Syntax, build agreement, required assets/precache, and test entry points | 19 / 19 |
| Browser regression/PWA checks seeded with the supplied export | 90 / 90 |
| KB program, progression, secondary families, and execution | 62 / 62 |
| Future assumptions, manual reflow, prescription agreement, and variety | 26 / 26 |
| Browser regression/PWA checks with empty history | 84 / 84 |

The four export-seeded/static sets total 197 checks. The additional empty-history run is reported separately. Tests include synthetic scenarios and restore/preserve the supplied history; they are not 197 observed user workouts.

The export records v36.138 and contains 165 workout rows, 34 recovery dates, seven bodyweight measurements, no wearables, no completed KB rows, and no saved custom KB workouts. Workouts span August 26–September 28. Startup and update/reopen checks preserve saved workout rows after JSON serialization, recovery, measurements, and the explicit October 1 swim commitment/target metadata. Forecasting does not append real workout rows.

## Meaningful scenarios

- Existing v140 wave/deadlift/Pull-up order, actual swim, primary/full/short role, calendar cancellation, rare Cal/SE reachability, manual commitment, and effort-aware secondary checks.
- Coherent eleven-file update detection; incomplete deployment rejection; Later; active-workout deferral; failed backup retaining the current app; activated-worker reload; separate pre-update snapshot; offline reopening preserving history.
- Exact 2-Barbell + 3-KB + 2-open hybrid week. All three stable presets contain a press, squat, horizontal pull, and swing; strength precedes conditioning. Hardware loads/rest, single-bell equivalents, reduced full-body time builds, and impossible-budget/no-equipment decline.
- Same-slot rep-first progression, top-range bell/reset, swing rounds/bell reset, latest partial blocking older success, recovery hold, distinct exposure requirement, short versus full-secondary credit, manual/custom preservation.
- SE and all KB full-secondary families, TB open-day KB shorts, SE/KB effort identity, hard-primary and time/equipment guards, and a conservative score bound covering the expanded candidate pool.
- A swim primary can pair with run/other cardio while another swim is excluded. Run + swim can be eligible, and a low-load fixture earns an automatic aerobic/aerobic weekday double without Gym. Run variants are excluded after a run primary. Total aerobic time is checked.
- A completed run exposes distinct complementary aerobic options; selecting a specific option loads its own exercise. Full KB opening from a previous primary edit mode exposes Start, saves the correct full role/rest, and preserves actual primary identity plus all old exported rows.
- Two-week forecast counts Thursday/Friday. Actual Barbell wave sets/reps/loads/order, including week-six 3×2 and single deadlift, replace generic 3×5 placeholders. Future loaded Barbell/KB prescriptions agree with projected prescriptions.
- Exact prior-day manual swim target/RPE, upcoming Sunday swim reservation without treating it as past completion, exact manual strength/dose changes, actual-primary precedence, secondary-only completion, hybrid KB anchor protection, and extension beyond 42 days.
- The final scorer, explanation bridge, and future secondary choices share prospective history. Distant open dates retain several activities and do not repeat one frozen weekly workout indefinitely.

No uncaught page errors were observed in the final suites. The mobile KB builder screenshot was visually inspected; the program disclosure and stacked exercise/rest controls fit the viewport without horizontal overflow.

## Long-range variety audit

An export-seeded preview froze the app at October 2, 21:00 Phoenix and inspected 85 future days, October 3–December 26. It covers 30 adaptive primary slots. The resulting primary choices include 11 LSS Run, two LSS Swim, eight Generic Gym, two Short Hills, two Standard Issue Hills, two Fast 5 Tempo Run, two Speed-Endurance Ladders, and one Connaught Range 10 to 1s. Beyond the old horizon, later slots continue to vary among seven activity/session choices. The projection resolves through December 26, preserves serialized real log rows, and produces no page errors.

Counts describe a hypothetical preview at one saved state, not completed workouts or promised frequencies. Secondary work is also projected separately. No equal-mode quota or random rotation was imposed. A completed/manual/context change can change this sequence. The current guards and fuller aerobic-secondary options can make a previously hardcoded v140 weekday fixture stop recommending a double after intervening projected work; a separate low-load fixture verifies that eligible automatic weekday doubles remain reachable.

## Local startup comparison with v36.140

Three alternating runs used the same export, October 2 at 21:00 Phoenix, fresh browser contexts, blocked service workers, and no concurrent QA load. Interface ready means page load/core/seven cards; calendar resolved also waits until placeholders clear for eight animation frames.

| Metric | v36.140 samples (ms) | v36.141 samples (ms) | Median |
| --- | --- | --- | --- |
| Interface ready | 2359, 2447, 2430 | 2895, 2266, 2180 | 2430 → 2266, about 7% faster |
| Calendar resolved | 2631, 2720, 2734 | 3901, 2986, 2895 | 2720 → 2986, about 10% longer (266 ms) |
| Repeated unchanged render call | 1.1, 0.9, 1.3 | 1.1, 1.0, 1.1 | About 1 ms in both |

The corrected prospective calculations cost some first-calendar work. Sample variation is substantial; these are small local measurements, not phone timings. The earlier v140-versus-v139 measurements used a different frozen date and should not be combined into a single controlled three-version benchmark. No page errors were observed in these six runs. Actual worker/update behavior was tested separately with workers enabled.

## Reproduction and limits

Run `npm run test:all`; use `HYBRID_TEST_EXPORT='/absolute/path/export.json'` for private data and `HYBRID_CHROMIUM_PATH` for an existing executable. `npm run audit:export -- '/absolute/path/export.json'` provides export analysis without committing it. Tests use only the local instrumented server; production HTML has no QA hooks.

The release is prepared locally, not verified deployed or loaded on the phone. The supplied export has no KB results, so preset starting loads are provisional. Prospective rows assume prescribed completion/estimated effort and remain temporary. A far-ahead first preview requires more sequential work than a nearby date. Missing legacy IDs/roles/timing cannot be reconstructed perfectly. Current tests do not prove every reported chat/app crash is resolved.
