# QA report — v36.162

1,120 unique local checks passed across 29 suites. Count each suite's assertions once; retries and repeated executions are excluded. Fixtures used empty history and synthetic completed histories. No fresh private user export or Android-device benchmark was used in this release.

| Suite | Checks |
| --- | ---: |
| Static deployment/syntax | 25 |
| Browser engine, rare-mode and update flows | 84 |
| Kettlebell progression | 93 |
| Forecast | 26 |
| Barbell progression | 57 |
| Secondary logic | 39 |
| Secondary frequency | 29 |
| Core options | 27 |
| Class focus | 47 |
| Substitution | 18 |
| Recovery roles | 38 |
| Feedback calibration | 66 |
| Model freshness | 65 |
| Phone UI audit | 41 |
| UI workflows | 50 |
| KB physical layout | 43 |
| Barbell plate layout | 29 |
| Workout evidence | 54 |
| Preparation/reload | 30 |
| KB helper performance | 8 |
| Ordered loading | 24 |
| Idle performance | 9 |
| Session fatigue | 40 |
| Weekly KB core | 25 |
| Secondary display consistency | 19 |
| Model interactions | 39 |
| Loaded KB core | 15 |
| New pure optimizer tests | 54 |
| New workout tools/reload tests | 26 |

New checks cover blank/null residuals, unknown outcomes, projected/skipped feedback exclusion, feedback coverage, chronological validation failure, dose comparability, penalty aggregation, alternate-set order, measured completion order/gaps, shorter-plan bounds, pin/manual/completed-field protection, preparation reopening, temporary-vs-permanent availability, removal Undo, whole-rebuild Undo, stress-dose monotonicity and zero skipped stress.

Final new workflow browser tests, affected fatigue/model tests and forecast/KB/secondary groups were rerun after fixes. Existing class/core tests initially encountered the unrelated block-review modal over their controls; they now explicitly dismiss it before testing those controls and passed. Other functional assertions were retained. The source update preserves completed history.

Browser: local Chrome Headless Shell, 412×915 viewport, America/Phoenix deterministic app date and real performance clock. Visual phone review confirmed expandable controls and no horizontal overflow. Browser binaries, screenshots, dependency folders and private data are excluded from the ZIP.

A single paired empty-history development run measured a 45-minute multi-focus Gym build at 6 ms in v36.161 and 89 ms in v36.162; initial app readiness was 1,472 vs 1,823 ms. Whole-plan comparison adds work. These are single samples, not a device-performance claim. Per-candidate prescriptions are cached within each selection search. Idle-loop and timer/no-helper-rebuild protections still pass. Cold distant forecasts remain a known limit.

Planning limitations: fatigue coefficients, penalty domains and timing estimates are heuristics. Held-out tolerance validation is not causal proof or an optimal training-dose estimate. Finish-in applies to remaining strength sets; conditioning/class duration is edited directly. Accessory rebuild applies to Gym/Calisthenics. Fixed barbell order is retained. Pairing KB movements with conflicting setups is refused to avoid misleading loading instructions. Actual timestamps and feedback are optional; missing data stays estimated/unknown.

Reproduce: npm run test:all. If needed, HYBRID_CHROMIUM_PATH selects an existing browser executable. New focused commands: npm run test:optimizer and npm run test:workout-tools.

Prepared only; upstream upload, Pages deployment and the user's installed client have not been verified for 36.162.
