# QA Report — Hybrid Training v36.134

## Result

- **191/191 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- Build, manifest, service-worker cache keys, loaded modules, and required deployment files agree on v36.134.

## New regression coverage

- Categorical **Very hard** feedback contributes to session effort when exact RPE is blank and is costly when it materially exceeds a low planned RPE.
- Schema 54 repairs a secondary-only session that replaced one unambiguous completed primary.
- Schema 54 leaves a legitimate primary-only date unchanged.
- Secondary outcome reconciliation requires matching date, primary, and secondary type and has no arbitrary first-candidate fallback.
- Conditioning counterfactuals include run-family recency, saved running-location preference, environment, swim suitability, and pool availability.

## Export audit before correction

The supplied v36.133 export contains 149 exercise rows across 39 sessions and 32 recovery days. It passed with zero errors and four warnings:

1. 23 legacy strength rows carry obsolete planned-minute metadata; current strength classification ignores it.
2. One swim's distance disagrees with pool length × length count.
3. One completed secondary opportunity points to a different primary/type.
4. One date stores a secondary-only session as primary despite a single unambiguous completed primary.

The audit also records 35 older actual-load snapshots (24 version 1 and 11 version 3). They remain historical evidence only; v36.134 recalculates current load with version 4 row logic.

## Corrected-export audit

The corrected copy retains exactly 149 exercise rows, 39 sessions, 32 recovery days, six bodyweight entries, and four rest-day records. It has:

- only September 24 marked as travel;
- September 23 restored to Barbell Strength as its primary;
- 20 × 21-yard lengths for the recorded 420-yard swim; and
- no stale completion on the mismatched secondary opportunity.

It passes with zero errors and one warning: the 23 preserved legacy strength planned-minute fields. Those fields are intentionally not rewritten because the current model already ignores them and preserving old snapshots is safer than fabricating historical plans.

## Browser status

The browser suite remains included in `tests/browser-qa.js`, and GitHub Actions installs Chromium before running it. Local verification covers source parsing and the full static/model suite; CI remains the authoritative real-browser run.
