# Hybrid Training v36.152 — QA report

## Scope and data

All nine approved UI candidates were implemented, with an actual set-repeatability arithmetic correction and the related Trends category repair. Export (24) reports v36.149, exported October 7 at 00:01 Phoenix: 199 workout rows, 42 Recovery dates, eight weights, no wearable-session records and six rest records. Its actual observations were kept intact. Local Chromium used a 412×915 viewport with America/Phoenix and controlled test dates. A fresh GitHub read verifies a later deployed repository build of v36.151; an export build and an installed client's active version are separate evidence.

## Final unique executed checks

| Suite | Export (24) checks passed |
| --- | ---: |
| Static / deployment | 20 |
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
| Travel / manual commitments / previous UI repairs | 41 |
| Nine approved UI workflows / arithmetic | 50 |
| **Total** | **722** |

The complete export-seeded command passed with its initial 39-check workflow suite (711 checks). Final static, existing UI and expanded workflow runs replace those respective counts, yielding 722, rather than counting repetitions twice. The expanded 50-check workflow suite also passed with empty starting history. No uncaught browser errors occurred in these runs.

## Meaningful regression evidence

- Open and Resume use the real primary action within the first phone screen; Start/Resume preserve the active workout. Optional setup and explanations are closed until requested.
- Four useful dated summaries and four intended Overview panels are present; Conditioning is visible and recovery learning is routed correctly. Exercise charts convert kg to lb and switch recorded reps/RPE with exact dates.
- Independently calculated 10% estimated output drop is not diluted by missing set details. Effort-only sets are unknown, recorded flat sets are observed zero and both performance comparison windows are retained.
- Exercise search finds an old record outside the initial 60-date page; date/family filters omit unrelated sessions and retain Edit/wearable actions.
- Class edit moves existing controls. Saved HR, steps, notes and focus remain available; changing HR/notes and pressing Save updates the same session without duplication.
- No gym flags the fixed Barbell conflict without moving it. The inline Move keeps the source week/wave. Source and destination neighborhoods are checked.
- A real Sunday mode change produces actual automatic before/after differences and highlights; reported session types match visible calendar data. Another context save explicitly reports unchanged recommendations. Manual/fixed/completed days are not counted as automatic changes.
- Actual supplied rows remain unchanged and mobile layout stays within the viewport.
- The coherent PWA update test passed: partial deployments do not prompt; Later survives focus; active-workout deferral, pre-update backup, successful activation, saved rows and offline reopening all work with the new required UI asset.

## Harness and debugging notes

Temporary failures exposed two production wiring problems: History page-reset constants were inside another closure, and the original save function was superseded by the asynchronous persistence layer. The final History wrapper accepts a reset flag; notification wraps the authoritative final save. The class layout needed to handle the existing `display:contents` field holder. These corrections are in production and covered by final UI checks.

Fixture/timing corrections are distinct: exercise search waits for its debounce, the older-history fixture now has more than 60 distinct dates, selected future dates use the existing preserve-date navigation option, and anchor assertions use the exposed read-only bridge. The new UI file uses a stable filename with a release query; the updater test no longer rewrites a version embedded in a filename into a nonexistent fixture asset. No private data was repaired to make a test pass.

## Reproduce

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/export.json' npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/export.json' npm run test:workflows
npm run test:workflows
```

`HYBRID_CHROMIUM_PATH` can select an existing Chromium executable; `HYBRID_UI_SCREENSHOTS` optionally saves local workflow captures. QA hooks are injected by the local test server. Production has no `window.__qa` hook.

## Why the earlier GitHub update did not change the app

The October 7 **09:40:16 Phoenix** upload, [b3b08c3](https://github.com/wmadson29-creator/Hybrid-Training/commit/b3b08c3b5e1d42aa177602f6437dca5515f958a0), changed zero files. Its tree was identical to the parent and `version.json` / `sw.js` remained v36.149. The Pages job succeeded at 09:41:13 with those unchanged files. This explained the initial version report; it was not evidence of a failed Pages deployment.

A fresh check found the later **10:37:52 Phoenix** upload, [73eee7b](https://github.com/wmadson29-creator/Hybrid-Training/commit/73eee7b8a778874d5450bb475990579b41374537). It changed 13 files, now identifies **v36.151**, and its [Pages job](https://github.com/wmadson29-creator/Hybrid-Training/actions/runs/37660574718) succeeded at **10:38:41**. Every changed file's Git blob SHA matches the delivered local v36.151 baseline. The repository issue is resolved. The installed phone's active version and public origin bytes were not independently inspected. If a phone retains an older build, reopen and use the in-app Update action or refresh after deployment.

For v36.152, extract the ZIP and upload its **contents** into the existing repository root, replacing the listed files and preserving nested folders and other app assets. Uploading only the ZIP or making another empty commit does not update the web app. This release has not been pushed or deployed by Codex.

## Limits

No Android hardware, installed-client cache state or public origin bytes were independently tested. GitHub's version and successful Pages job were read directly. No physiological validation, new KB research, controlled performance benchmark, push or deployment was performed. The math/evidence correction is narrow; the app's existing training policies remain estimates.

The cumulative ZIP uses repository-relative paths, includes runnable nested tests and excludes private exports, dependencies, browser binaries and temporary review files. The maintained handoff matches its repository copy and preserves the earlier complete chronological archive byte-for-byte.

Final cumulative bundle: **63 paths**.
