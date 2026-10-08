# Hybrid Training v36.155 — QA report

All 19 suites passed against the latest supplied v36.153 export (25)(1): **885 checks**. The new preparation/internal-plate suite also passed **30 checks with empty history**. Unique total: **915 checks**. After the final request to prioritize switching, the preparation/sequence suite was rerun with export and empty history, the 43-check physical KB layout suite was rerun, and the 22 static checks were rerun. Counts use each suite’s latest completed result; the other broad suite runs preceded this narrowly scoped internal-content refinement. Final static compilation/deployment checks (22) and the PWA update/offline subset (12) were rerun after the distinct v36.155 worker-cache name was applied; repeated checks are not added to the totals.

## Current export suite

| Suite | Checks passed |
| --- | ---: |
| staticChecks | 22 |
| browserChecks | 90 |
| kettlebellBrowserChecks | 93 |
| forecastBrowserChecks | 26 |
| barbellBrowserChecks | 57 |
| secondaryLogicChecks | 39 |
| secondaryFrequencyChecks | 29 |
| coreOptionsChecks | 27 |
| classFocusChecks | 47 |
| substitutionChecks | 18 |
| recoveryRoleChecks | 49 |
| feedbackCalibrationChecks | 66 |
| modelFreshnessChecks | 70 |
| uiAuditChecks | 41 |
| uiWorkflowChecks | 50 |
| kbLoadLayoutChecks | 43 |
| barbellPlateLayoutChecks | 29 |
| workoutEvidenceChecks | 59 |
| preparationChecks | 30 |

## Focused evidence

- Recommended Gym workouts can be edited before starting. Added and swapped catalog exercises recalculate their targets; removals remain removed after reopening and reload.
- Explicit Save edits creates a local preparation draft without a running timer or new completed History. Start retains the edited plan, and active reload preserves every exercise, set/repetition/load field, including appended exercises.
- Restoring drafts cannot autosave a partly rebuilt plan. Removed trailing cards are trimmed. SE circuit removals likewise survive reopening, and Gym drafts cannot leak into SE.
- Sequence layouts match an independent exhaustive minimum-switching reference in five mixed-target cases. 24 → 26 kg retains 6 + 3 + 3 kg and adds one 2 kg plate. Repeated loads require zero internal changes. Paired bells keep separate plate states. This objective counts additions/removals, not inaccessible physical stack geometry or extra rehandling.
- Internal plate contents are exact at every programmed 12–32 kg target. An independent dynamic-programming reference agrees with minimum plate counts. Each physical plate is counted once. Empty shell means no plates; unavailable targets are reported without rounding.
- The detail-photo default uses two 0.5 kg plates, 1, 2, 3, 3, 4 and 6 kg, with a visibly labelled assumed 12 kg shell. The alternate pictured six-plate inventory is accepted and produces 32 kg exactly. Invalid/empty inventory input cannot overwrite the saved valid inventory.
- Phone-width controls and plate contents were visually inspected in Chromium screenshots. No mobile horizontal overflow, duplicate IDs or uncaught browser errors occurred in the completed new workflow suite.
- The broad suites retain actual-dose block-end review, actual pull-up grips, class overlap, all nine approved UI workflows, offline updates, KB progression/physical loading, exact barbell stacks, recovery, substitutions and forecast behavior.

## Limits

The supplied product images have different plate layouts. The helper therefore labels its photo-based shell assumption and allows the user to correct the physical inventory. It provides contents/counts rather than a verified assembly order or manufacturer model identification. Software tests confirm arithmetic and workflows; they do not weigh the user's hardware or reproduce Android hardware. The KB training dose remains unchanged. Preparation drafts are local and separate from completed History; no new forecast rule was introduced. Nothing was pushed or deployed.

## Reproduce

```bash
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:preparation
```

Use the existing documented Chromium override where needed. Browser instrumentation is injected by tests only; no test hook is shipped in production.
