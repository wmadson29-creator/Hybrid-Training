# Hybrid Training v36.109 — Targeted Reliability QA

## Failure reproduced
The remaining v36.108 failure was not just the primary recommendation scorer. A downstream Active Recovery/planning or calendar-enrichment fault could still occur *after* the app had selected a session. That caused the full prescription renderer to fall back to `Recommendation temporarily unavailable`, while the older calendar safety renderer could independently fall back to the raw `Open Training` schedule placeholder.

That is why v36.108 could still show a real recovery state but no concrete workout.

## v36.109 changes tested
- `expectedSession()` now has a last-resort concrete-session fallback; an adaptive open slot cannot remain `Open Training` just because optional analytics fail.
- Active Recovery planning is non-throwing. If advanced fatigue/history logic fails, it produces a low-fatigue walking prescription rather than aborting the page.
- The adaptive explanation and training-type switcher are isolated from the actual prescription. Either may fail without blanking the workout.
- The prescription renderer's final fallback now renders a usable workout instead of an error notice.
- The legacy calendar fallback now resolves adaptive days through the core recommendation path rather than displaying the raw `Open Training` placeholder.
- Recovery values remain independent of the optional longitudinal/deload model from v36.108.

## Adversarial cases
Using a user-history-shaped state with recovery data for Sep 13, two completed sessions Sep 12, and Barbell Strength fixed for Sep 14:

1. **Normal build:** concrete recommendation and full prescription render; recovery values visible.
2. **Rich open-day scorer forced to throw + Active Recovery planner forced to throw:** PASS. Dashboard Today = `Active Recovery`; Sunday calendar = `Active Recovery`; prescription = `LSS Walk • 30 min • RPE 2–3`; recovery = `Watch recovery`; resting HR still visible; no page errors.
3. **Entire normal prescription renderer forced to throw:** PASS. The simplified renderer preserves the selected session and shows a usable workout instead of `Recommendation temporarily unavailable`.
4. **Entire normal calendar renderer forced to throw:** PASS. The legacy safety calendar shows a concrete adaptive Sunday recommendation instead of `Open Training`.
5. **JavaScript syntax check:** PASS.
6. **Build metadata/service worker:** PASS. v36.109 is consistent across `index.html`, manifest, service worker, shell files, and `version.json`; required app-shell assets remain fail-closed during service-worker install.

## Important behavior
The sophisticated model is still the primary recommender. The new core path is only a reliability floor. It is intentionally conservative and uses current recovery, the next fixed anchor, and minimal session context so a malformed optional history/model component cannot take the whole recommendation system down.

No site-data reset or history re-import is required.
