# QA Report — v36.120

## Static checks

- `adaptive-personalization-v36.120.js`: JavaScript syntax check passed with Node.
- `sw-v36.120.js`: JavaScript syntax check passed with Node.
- Existing v36.119 shell/core are not rewritten by this patch.

## Logic checks

- Conditioning duration precedence: activity `metrics.time` > tracked session duration > session duration.
- Original mismatched session timer is retained separately when activity time takes precedence.
- Exercise calibration is keyed by exact exercise name, uses recency decay, confidence shrinkage, and bounded correction (±1.75 RPE).
- Extreme categorical feedback receives higher weight; repeated extremes only receive a boost when direction is consistent.
- Recovery authority stays informational until a held-out signal has passed and neuromuscular evidence/confidence clears the gate.
- Bodyweight trend requires >=7 measurements and >=14 days of span.
- Home pool conversion: 21 yd per one-way length; 41 lengths = 861 yd.
- Standard distance mode remains available for other pools.
- Swim metadata is stored separately and reapplied to matching swim records without changing legacy export shape requirements.
- Mechanical/tissue status is displayed separately from systemic readiness and explicitly avoids injury-prediction language.

## Deployment checks still required after repository write access is restored

1. Open the installed/web app once so the new service worker activates, then reload/navigation once if the old service worker had control.
2. Confirm a Swim logging card shows `Laps / lengths` and `Distance` inline options.
3. Select Home — 21 yd, enter 41 lengths, and verify the standard distance field becomes 861 yd.
4. Quick-log a conditioning activity with an entered activity time and verify the exported effective/session duration follows that entered time.
5. Confirm existing v36.119 workout logging, Today, Calendar, and More tabs render unchanged.
