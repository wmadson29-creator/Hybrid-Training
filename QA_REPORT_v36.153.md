# Hybrid Training v36.153 — QA report

The full final `test:all` command passed with the unmodified latest export (24): 199 workout rows, 42 Recovery dates, eight weights and six rest records. Browser tests use isolated state, Chromium at 412×915 and America/Phoenix. Personal data and completed observations were not included in the update ZIP.

| Suite | Export (24) checks passed |
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
| **Total** | **796** |

The bell-layout suite also passed 43 checks with empty history, the nine-workflow suite passed 50, and the plate-layout suite passed 29: **122 additional empty-history checks**. Repeated development runs are not added to these unique counts.

## Meaningful new evidence

- An independent exhaustive physical-state reference confirms the minimum individual 70 lb load-change count in 40 mixed-dose cases. Hardware assignments and reported changes are replayed independently.
- All A/B/C × all/pair/single-70/single-40 combinations retain exact exercise dose, calibration, rest and duration when grouping is toggled. Doubles require a real matched pair; an unavailable load creates no invented setup.
- A prepares the spare bell without changing its exercise order. B reduces individual changes from 5 to 4. Cheap 40 lb dial changes are preferred to borrowing the 70 lb pair when feasible.
- Comparable Gorilla Row results earn only that movement's rep step; the RDL does not borrow progression. A manual 28 kg RDL survives grouping. Saved custom ordering and exact manual doses are retained.
- Opening a KB session shows instructions beside the actual targets. Active reload retains the grouped order. Changing a weight clears all dependent setup instructions and a later reload keeps them cleared. No completed history is created by planning, setup, toggling or resuming.
- The grouping checkbox saves immediately and survives reopening. Original-order mode is effective. Phone layout has no horizontal overflow and no uncaught browser errors were observed.
- The plate optimizer exactly retains the inner 45 + 25 base in the requested 235 → 185 lb example. A labeled purple 55 lb plate can be inside or outside another retained plate, as dictated by minimum switching. Mirrored sleeves and the computed purple color are checked in the real rendered UI.
- Thirty independent exhaustive ordered-stack cases match the minimum switching count. Exact totals, empty-bar stages, cache isolation, unsupported totals and the fixed three-stage scope are verified.
- Monday/Friday include deadlift when programmed; Wednesday/hybrid and skipped deadlift paths correctly use squat → row. The new graphics never leak to other workouts, chest-machine or landmine visuals.
- Real Start Workout, live load edits, autosaved workspace and reopening retain the actual 235/185 lb weights and recomputed diagrams. Original planned evidence remains separate. Off-grid edits show no rounded plate diagram. The startup dependency error found during development is resolved without a fallback training prescription.
- All nine UI workflows and prior travel/reflow/logging behavior pass. Coherent-update, partial deployment rejection, active-session deferral, backups, saved observations and offline reopening pass with the new required asset.

## Startup and fixture corrections

The new active barbell reload test exposed an existing initialization-order error: startup attempted to reconstruct a barbell plan before the prediction-residual extension had assigned its public helper. Saved-work restoration now runs after all synchronous extensions initialize. The test confirms the restored actual loads, diagrams, unchanged original history and absence of restore errors. Initialization still preserves the remembered view and existing durability guards.

The test also respects the existing Start Workout autosave requirement and opens the current exercise through its normal title control.

## Fixture corrections and limits

A test initially assumed the imported history would become empty after a temporary fixture reset. The existing durability layer properly preserved the actual original rows. The final assertion checks unchanged original history; production preservation was not weakened. Block-review prompts are dismissed through the existing Later control in controlled fixtures.

Tests for non-leading B movements now find the exercise by identity rather than an obsolete position. Test summaries read the actual `version.json` instead of reporting the previous hard-coded build. No prescription or personal export was changed to make those tests pass.

Software checks verify allocation and app behavior, not a training program's physiological superiority. Counts exclude the initial configurations and cannot infer how the actual bells are currently set. Layout was visually inspected in local Chromium; Android hardware was not tested.

## Reproduce

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:kb-layout
npm run test:workflows
npm run test:plates
```

Use `HYBRID_CHROMIUM_PATH` for an existing Chromium executable. No `window.__qa` hooks are shipped in production.
