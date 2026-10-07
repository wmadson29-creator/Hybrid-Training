# Hybrid Training v36.150 — validation

Prepared October 7, 2026, America/Phoenix. Baseline: v36.149. Scope: all four improvements accepted after the newest export review.

## Results

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
| **Total** | **630** |

Additional empty-history checks: Recovery/roles **38**, feedback/calibration **66**, freshness/priors/recent-effort/saved-reasons **65**, total **169**. These are additional to the export-seeded total.

All final check sets passed. The complete command initially stopped in the Recovery suite because an old fixture assumed October 5 had no check-in. Export (24) now contains one. The fixture now selects an actually unused date; the corrected Recovery and remaining feedback checks passed separately, and the new freshness suite passed. The first ten suites did not change after passing. Counts above include each final check set once. No uncaught browser errors occurred.

## Export evidence

The fixture is `hybrid-training-export (24).json`, exported **2026-10-07T07:01:03.428Z**, October 7 at **00:01:03 Phoenix**, from **v36.149**. It has **199 workout rows, 42 recovery dates, eight bodyweight measurements, zero wearable-session rows and six rest records**. Compared with export (23), seven workout rows were added and none removed: six main Barbell rows on October 5 and the October 6 F45 class. Actual prior observations remain; the existing three derived personal-calibration fields can refresh. There are still no completed KB sessions.

| Observed issue | Final local verification |
| --- | --- |
| October 6 recovery saved just after midnight disappeared from October 7's model context | Recent tired energy and mild quads/hamstrings soreness retain their source date; today's entry fields remain blank. Previous steps are never copied. Sleep is explicitly prior observation and expires before the new morning. |
| F45 saved expected effort 4.6 despite the library's 7–9 class prior | Library-specific prior and separate class-family calibration produce an export-seeded estimate of 8.3 on the class date and 8.1 the next day. Confidence remains limited. The old saved prediction is retained. |
| Two 3×5, +30 lb pull-up results marked Very hard while the estimate remained about 6.7 | Export-seeded estimate becomes 8.2 with confidence capped at 0.68. Target evidence and the block-end review flag the repeated effort separately. The fixed prescription does not change. |
| Barbell wave explanation could be shown without being captured as the decision reason | Every newly generated Barbell row has a reason; draft, quick-complete, History/editing and import checks preserve its original source week and dose. |

The October 5 quick-log rows lack the newer target fields. A workout may have been started before an update; those rows alone do not prove a v36.149 quick-logging defect. The reproduced repair concerns the displayed programmed-wave fallback not being captured. Old missing reasons are not backfilled with invented historical decisions. Likewise, the pull-up observations have different scheduled grips but no actual grip field: the calibration is exact exercise/dose, not proof of a grip-specific plateau.

## New behavior checked

- Recovery: exact-date entries supersede carryover; a partially entered new date does not silently fill unanswered fields from yesterday. Future/historical dates, future timestamps, missing timestamps and expired observations cannot borrow current signals. As-of observation history is respected. The read-only context never creates a new record or duplicates baseline samples.
- Freshness expiry: body fatigue/soreness have a 36-hour limit; alertness/current BioCharge/stress 12 hours; prior sleep/waking markers 24 hours and only before 06:00. Recommendation evidence invalidates when eligible fields change but stays stable across an ordinary minute.
- Classes: F45, Lagree and Reformer retain distinct library priors; class-family residuals cannot pool HIIT with Pilates. Re-baselining obsolete hard-class generic priors leaves raw predictions and actual metrics untouched. Specific class focus still reaches the muscle model.
- Recent effort: repeated compatible results can make a bounded correction; single observations, duplicated sessions, different doses/KB slots, short additions, forecasts, unknown/partial/skipped results and stale history cannot establish the required evidence. Confident RPE and eligible reps remaining have explicit priority. Overall experience cannot alter the estimate.
- Barbell: fixed pull-up dose, grip schedule, wave/TM rounding, Wednesday Deadlift omission and slow three-set abs remain valid. Every generated reason survives draft restore, quick save, mobile History, editing after model inputs change and JSON import normalization.
- Review/UI: repeated hard pull-up evidence appears in the existing block-end review without changing the user's progression-mode choice. Recovery shows the dated freshness label while entry fields stay blank. Phone-width layouts, unique IDs and browser-error checks pass; the Recovery and expanded Barbell evidence views were visually inspected.
- Preservation: supplied actual workout, recovery and measurement observations remain intact. Temporary model cases and forecasts never become real completed workouts. Existing PWA update/offline/data-preservation checks pass at build 36.150.

## Reproduce

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:recovery
npm run test:feedback
npm run test:freshness
```

`HYBRID_CHROMIUM_PATH` can select an existing Chromium. Test hooks are injected only by the local test server; production has no `window.__qa` interface. Tests use America/Phoenix and deterministic application clocks. The new suite advances the clock through freshness expiry and exercises actual logging and History flows.

## Boundaries and delivery

Freshness windows, the two-observation requirement, 1.5-RPE adjustment ceiling and confidence caps are app policies. These tests verify implementation, not the physiological accuracy of an individual prediction or the superiority of a KB recipe. No new clinical/training trial, Android benchmark, GitHub HEAD check or installed-phone observation was performed. The export identifies the exporter as v36.149; v36.150 is prepared locally. The current Barbell wave and block-end review stay authoritative; there is no new within-workout automatic autoregulation or weekly optimizer.

The cumulative **53-path** ZIP retains v36.140–149 changes, uses repository-relative paths and excludes private exports, downloaded browsers, dependencies and temporary QA files. The standalone handoff matches the repository copy; its archived commit-table body is preserved exactly. No push or deployment was performed.
