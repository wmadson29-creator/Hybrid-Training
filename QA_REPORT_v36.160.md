# Hybrid Training v36.160 — QA

## New coverage

25 KB core checks verify three distinct movements each week, floor/bodyweight-only loads, modest dose and extra-time labels, weekly change, Monday/Sunday stability, deliberate three-week cycle, idempotent append, no fabricated session without KB work, explicit existing core preservation, one finisher at the end of each full KB plan, intact bell movement counts, live Log bodyweight field, no plate helper on core, unchanged History, phone width and browser errors.

19 secondary/recovery checks reproduce a completed primary for October 11. Calendar and lower panel agree for Model, Best short, Best full and None selections. An actual logged short secondary overrides pending choices in both surfaces; the completed panel has no phantom recommended third session. Past dates use actual history. Recovery appears directly after the primary action panel, outside the collapsed program details, with no duplicates/overflow or browser errors.

Both suites run with the supplied export and with the default empty-history seed. Phone recovery screenshot visually inspected. It uses the old supplied export, so the current-day recovery card truthfully shows no current check-in rather than inventing data.

## Existing regression coverage

Static/browser/update/offline; KB progression, full secondary logging and equipment allocation; future forecasts; Barbell/abs; secondary and frequency; core/classes/substitutions; recovery/calibration/freshness; all nine UI workflows; plate loading; actual workout evidence; preparation/helper/ordered loading; idle stability; v36.159 within-session fatigue and per-exercise stacks.

Older KB tests expected swings to be the final row and every row to have bell hardware. Those checks now inspect the weighted KB rows; new tests separately assert the appended bodyweight core has no hardware. Full KB secondary save/reload now includes six rows for A/B (five bell movements plus one core); C has five rows (four bell movements plus one core). The original bell doses/order, actual role metadata and loading instructions remain verified.

Validation: **1,012 export-based checks across 25 suites + 44 focused empty-history checks = 1,056 unique checks passed**. Repeated executions are excluded. The initial broad pass stopped on an obsolete “swings are last row” expectation, now updated for the requested extra core; subsequent affected and remaining suites are checked.

## Limits

The rotation uses calendar Monday weeks of the prescribed plan date and repeats after three weeks; it is not randomization on navigation. Explicit saved core and workout edits remain authoritative. The main KB time limit applies before the extra core; the UI labels the added time. The small dose can reduce under recovery caution. Progression remains exercise-specific; advanced core variety is not automatic proof of mastered skill.

Today’s primary remains labelled completed, while its uncompleted secondary can be Recommended/Selected. Completed secondary and past statuses use logged truth. No completed data is rewritten. The image supplied by the user did not show the lower secondary panel or include a new export; the reproduction validates the confirmed split between completed-calendar logic and live matrix selection rather than claiming a byte-for-byte reconstruction of the unseen lower panel.

The current-day recovery data remains governed by existing freshness rules; only placement changed. No new real-device benchmark, push or deployment is claimed.
