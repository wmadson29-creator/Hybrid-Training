# QA report — v36.164

343 checks passed: 321 across static validation and eight browser suites using the supplied latest export, plus 22 focused empty-history checks. Retries are excluded. Prior release results are historical evidence, not included in this total.

| Suite | Checks |
| --- | ---: |
| Static deployment/syntax | 25 |
| New class/rebound context, supplied export | 29 |
| Barbell progression | 57 |
| Model interactions | 39 |
| Within-session fatigue/load options | 40 |
| Recovery roles, supplied export | 49 |
| Class focus | 47 |
| Forecast | 26 |
| Idle performance | 9 |
| New class/rebound context, empty fixture | 22 |

The latest supplied export confirms the Oct. 6 F45 → Oct. 7 reduced squat → Oct. 9 same-load/dose comfortable squat sequence. The class is counted once, remains provisional, and the squat's actual completion credit remains 2/3. Rebound evidence cannot affect the Oct. 8 historical preview. Verified local residual class fatigue is reduced; unrelated muscles and non-class workload are retained. The future class warning includes provisional history.

Negative cases: no preceding class, skipped class, future row, not-yet-completed row, projected forecast, lighter load, fewer sets/reps, hard/unknown effort and unknown pull-up grip. Cache invalidation removes obsolete rebound evidence. Block review exposes context, preserves raw completion and cannot grant an increase solely from discounting a difficult observation. All original supplied rows remain intact.

The older stack-ceiling QA fixture initially appended a synthetic Oct. 10 pushdown behind the new real Oct. 11 pushdown, so it was no longer the latest direct observation. The fixture now isolates that exercise's synthetic ceiling exposure; all original rows are restored afterward. The assertion that a capped stack cannot claim an increase/reset remains unchanged. This was a fixture chronology issue, not a reason to modify the user's data.

Local Chrome Headless Shell at 412×915, America/Phoenix app clock and real monotonic performance clock. No browser errors in final suites; idle-update protection and no horizontal overflow checks passed. No Android benchmark or physiological accuracy claim is made.

Limits: context is an association based on hard effort, overlap, reduced dose/soreness and later comparable performance. It cannot prove the class caused the disruption. Coefficients, time windows and muscle cutoffs are conservative explicit app rules. A single response is provisional, not a permanent penalty. Missing actual grip limits pull-up conclusions. Systemic fatigue and soreness remain governed by existing recovery logic. No manual schedules, waves, training max overrides or actual logs are rewritten.

Reproduce: HYBRID_TEST_EXPORT='/absolute/path/export.json' npm run test:class-recovery; npm run test:all includes the new suite. Use HYBRID_CHROMIUM_PATH if a local browser executable is required. Private export bytes, browser binaries and scratch logs are excluded from the ZIP.

Prepared only; repository upload, Pages deployment and installed-client verification remain pending.
