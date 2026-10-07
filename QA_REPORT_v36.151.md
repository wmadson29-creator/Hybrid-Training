# Hybrid Training v36.151 — QA report

## Data and environment

Supplied export (24) identifies v36.149, exported October 7, 2026 at 00:01 Phoenix: 199 workout rows, 42 Recovery dates, eight weights, zero wearable-session rows and six rest records. The audit first used prepared v36.150, then tested repaired v36.151. Browser automation uses local Chromium, a 412×915 viewport, America/Phoenix and deterministic application dates. The private source export was not modified or included in the release.

## Final executed suites

| Suite | Export (24) checks passed |
| --- | ---: |
| Static/deployment | 19 |
| Browser/calendar/PWA | 90 |
| KB and full-secondary execution | 93 |
| Future forecast | 26 |
| Barbell and ab progression | 57 |
| Secondary logic | 39 |
| Secondary frequency | 29 |
| Gym/bodyweight core | 27 |
| Class focus | 47 |
| Substitution | 18 |
| Recovery/role/experience semantics | 49 |
| Target evidence/class intensity/RIR/KB calibration | 66 |
| Recovery freshness/class priors/recent effort/saved reasons | 70 |
| Travel/manual selection/secondary/History/mobile UI audit | 41 |
| **Total** | **671** |

The new UI suite also passed **41 checks with empty workout history**. Other empty-history totals in prior QA reports remain evidence for those releases; they were not rerun or added to this release's current empty-history count.

`npm run test:all` completed successfully with the export and the initial 34-check UI suite (664 checks). The final extended 41-check UI suite then passed with both the export and empty history. The seven additional checks cover activity/role/unit-specific History comparisons and actual inline reps-remaining entry. Counts above represent final unique suites, not cumulative reruns.

## Behaviors verified

- Optional Best full on a Barbell day loads an actual compatible workout while automatic None remains None. The preview, calendar and selected family agree. A 30-minute limit gives a concrete explanation and alternate actions.
- Travel immediately changes an automatic outdoor option to an indoor activity, appears on the correct calendar date and selected-day notice, and retains the date's equipment rules. Travel without Gym uses explicitly indoor walking at no more than 45 minutes. Sick/returning reduces the automatic target to at most 20 minutes at RPE 2–3.
- Future library navigation retains October 11, its buttons name that day after searching, and a specific Swim selection becomes manual. The forecast row is LSS Swim with `metrics.time` 60; nearby future reservations recompute. Choice/context survive reload without adding completed logs.
- History compares like activity and full/short role; explicit full wins over an old short flag. Matching known miles produce a miles difference, mixed miles/kilometers suppress distance subtraction, and F45 never uses Pilates as its closest prior.
- History editing shows the actual F45 class heading. Log has only one stage 02. Inline reps-remaining buttons set the underlying value and relevant exercise effort.
- Strength progression excludes misleading zero-resistance-exposure cardio/classes. Supplied completed rows remain byte-equivalent after the new suite restores its synthetic test rows. Existing regression suites cover Recovery/measurements, class muscle attribution, substitution, fixed waves, KB recipes, secondary guards, persistence and PWA update/offline behavior.
- During the exploratory mobile audit, load/rep/RPE/RIR editing, detailed-set completion/rest, pause → Trends → resume → reload and Recovery drafts retained their recorded state. The active-workout guard prevented History editing until the temporary workout was discarded. No uncaught browser errors were observed.

## Test-fixture repairs

The browser double fixture previously appended a full Swim to a date already containing an actual Swim in the newest export, accidentally testing a third full session. It now isolates one primary before testing the optional second. Synthetic state replacement now advances its test-only persisted stamp and clears the test History index/query cache so workers cannot address removed fixture rows. Empty-history UI startup/reload dismisses the normal block-review modal before continuing; History assertions wait for its asynchronous comparison decoration. These are harness/fixture corrections, not claims of user-data or production worker defects.

## Reproduce

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:ui
npm run test:ui
```

`HYBRID_CHROMIUM_PATH` can select an existing Chromium executable. Test hooks are injected by the local test server; production has no `window.__qa` interface.

## Boundaries

Fixed program anchors and explicit manual prescriptions remain authoritative; automatic surrounding choices can change when context/commitments change, but need not change if the same option still ranks best. Context-dose caps and candidate rankings are app policies rather than validated physiology. No installed Android observation, current GitHub HEAD inspection, new controlled performance benchmark, research trial, push or deployment was performed. The audit report separates current fixes from future UI redesign recommendations.

The cumulative ZIP uses repository-relative paths and excludes private exports, browser downloads, dependencies and temporary QA work. The maintained handoff matches its repository copy and preserves the archived commit section byte-for-byte.

Final cumulative bundle: **58 paths**.
