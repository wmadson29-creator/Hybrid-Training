# Hybrid Training v36.154 — QA report

All 18 suites passed with the latest unmodified export (25), which reports v36.153 and contains 205 workout rows, 43 Recovery dates, eight bodyweight records and six rest records. Tests use isolated browser state at 412×915 in America/Phoenix. Final static checks and the focused evidence suite were rerun after the last warning disclosure / manual-commitment refinements. The table uses each suite's latest result; repeat runs are not added.

| Suite | Export (25) checks passed |
| --- | ---: |
| Static / deployment | 22 |
| Browser / calendar / PWA | 90 |
| KB / full secondary | 93 |
| Forecast | 26 |
| Barbell / abs | 57 |
| Secondary logic | 39 |
| Secondary frequency | 29 |
| Gym / bodyweight core | 27 |
| Class focus | 47 |
| Substitution | 18 |
| Recovery / role semantics | 49 |
| Effort / RIR / class intensity | 66 |
| Freshness / class priors / saved reasons | 70 |
| Travel / previous UI repairs | 41 |
| Nine approved UI workflows / arithmetic | 50 |
| Physical KB layout / active drafts | 43 |
| Exact barbell plate stacks / active restore | 29 |
| Completed dose / actual grip / class overlap | 59 |
| **Total** | **855** |

Empty history passed 54 evidence checks, 50 workflow checks, 43 bell-layout checks and 29 plate-layout checks: **176 additional checks**. The full regression set plus these four empty-history suites contains **1,031 unique checks**. No personal export, runtime storage, screenshot, dependency directory or test-only browser hook is included in production code or the update ZIP.

## New behavior verified

- The Oct 7 Squat and Ab Crunch Machine records each receive exactly 2/3 set/rep completion credit against their original three-set plan. Their saved Complete status, effort, actual weights and notes are preserved.
- In block-end TM review, two comfortable 2/3-dose exposures hold rather than earn full clean progression. Repeated low-volume work alone holds without being declared a loss of strength. Full clean work still earns the standard increment; actual repeated misses retain the existing reduction rule. The current six-week wave and explicit training-max overrides remain protected.
- Recorded set details take precedence over the summary count. Each planned set's credit is capped: extra reps or heavier weight cannot replace an omitted set. Legacy rows with no saved comparable plan keep the prior status fallback; another exercise's planned dose is not used to judge a substitute.
- Exact-dose effort comparisons, exercise capability / residual calibration, recent-effort review and estimated strength trends use matching confirmed actual pull-up grips. Prescribed grip and saved reason text never become actual grip evidence. Legacy unknown grips retain their workload/fatigue contribution without producing a proved comparable grip trend.
- Actual and prescribed grips remain independent through Start Workout, autosaved active reload, quick completion, History Edit, JSON normalization/export and CSV export. Import accepts known neutral/overhand aliases canonically and rejects invalid values. Actual grip starts at Not recorded; opening an old log does not infer a grip from its week.
- The actual recorded-grip chart switches between neutral and overhand, excludes other grips, and leaves unknown legacy results as individual points without a connected trend line. History / target evidence labels actual grip distinctly.
- A scheduled hard F45 class warns on its own day and the affected next-day Barbell day. The warning discloses whether it uses expected library effort/profile or logged effort/focus. Actual comfortable effort, explicit light local focus, skipped classes, a different next anchor and a manually replaced Barbell workout are handled without inventing a heavy overlap.
- Warning evaluation does not rewrite the schedule, doses, observations or Recovery. The normal manual review action remains available, and the warning never automatically moves an anchor or schedules rest.
- Phone layouts have no horizontal overflow or duplicate IDs, and the evidence / warning workflows produce no uncaught browser errors. The two new controls were visually inspected in rendered Chromium screenshots.

## Previous behavior retained

All nine approved UI improvements pass. The physical bell allocator still favors fewer slow changes to the 70 lb pair and uses the easy 40 lb bell where supported, retaining exact movement-specific targets and custom order. Purple 55 lb plates remain restricted to Barbell Strength Squat → optional Deadlift → Barbell Row, with exact mirrored stacks and minimum switching. Other plate-loaded exercises retain independent minimum-count standard-plate visuals. The earlier 401-load minimum-count verification remains historical evidence in v36.153; it is not added to this release's test count.

PWA checks cover coherent assets, rejected incomplete deployments, active-session update deferral, verified backup preservation and offline reopening. Current and original History / Recovery remain intact in the fixtures. Other exercises retain their established forecast assumptions; confirmed grip filtering applies to Weighted Pull-up evidence.

## Fixture corrections and limits

Export (25) already has a completed Oct 7 workout and Recovery entry. The older freshness UI test now isolates its new-day / new-session fixture and then restores the supplied observations, instead of assuming that date is empty. It also uses explicitly recorded grip in synthetic same-grip calibration tests. A live timer test opens a workout on its controlled current date, since timers are intentionally unavailable for another date. Backup controls are opened through their normal disclosure in empty-history tests.

Software checks verify app behavior and arithmetic. Visual inspection used local phone-sized Chromium; physical Android hardware was not tested. No additional completed KB observations were supplied, and the KB training recipe remains 147.

## Reproduce

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:evidence
npm run test:workflows
npm run test:kb-layout
npm run test:plates
```

Set `HYBRID_CHROMIUM_PATH` to use an existing Chromium executable. The `__qa` bridge is injected only by the local test server, never shipped in the app.
