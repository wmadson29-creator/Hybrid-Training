# Hybrid Training v36.110 — Diagnostic Export Hotfix

- Fixes Export Data silently doing nothing when an optional adaptive-model snapshot throws.
- Export now always prioritizes the raw saved state; optional model snapshots are fail-soft.
- Adds the last 100 runtime diagnostics, including full JavaScript stack traces, to the JSON export.
- Adds visible Exporting… / Exported feedback and an explicit alert if serialization/download itself fails.
- Recommendation logic is intentionally unchanged from v36.109 so the current primary-model crash can be reproduced and diagnosed rather than hidden by another speculative scoring change.
