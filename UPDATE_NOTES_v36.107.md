# Hybrid Training v36.107 — Legacy Data-Shape Recovery Hotfix

v36.107 is a focused reliability hotfix after a real-device v36.106 deployment exposed a persisted-history compatibility failure that clean-state QA did not trigger.

## Fixed
- Optional per-set history (`setDetails`) is now normalized before model use. Array-like legacy objects and JSON-array strings are recovered when possible; invalid empty shapes safely become an empty array.
- Conditioning component history receives the same normalization.
- All major set-detail model paths now also guard locally with `Array.isArray`, so one malformed/transient row cannot crash strength trajectory, recovery, cadence, or prescription rendering.
- IndexedDB hydration applies the same row-shape repair before the first adaptive render.
- Today-dashboard cards are calculated independently. A failure in Hybrid Trajectory can no longer leave Today, Current State, and Next Fixed Anchor stuck at placeholders.
- Main rendering is fault-isolated: calendar, prescription, recovery, dashboard, tools, and secondary views no longer fail as one all-or-nothing chain.
- The built-in App Self-Check now verifies persisted workout row collection shapes.
- A successful calendar render clears the diagnostic fallback marker so recovery can be verified automatically.

## Why this release exists
A malformed truthy object such as `setDetails: {}` made code written as `(row.setDetails || []).filter(...)` call `.filter` on an object. That propagated through set repeatability → exercise-order context → strength trajectory → hybrid adaptation and caused the exact symptom seen on-device: fallback calendar, blank Workout Prescription, and dashboard placeholders. v36.107 repairs the stored shape and prevents the same class of failure at every known use site.

No training-program logic, progression targets, or user history is intentionally reset by this hotfix.
