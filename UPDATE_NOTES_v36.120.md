# Hybrid Training v36.120

## Personalized calibration and swim logging

- Conditioning duration now treats entered activity `metrics.time` as authoritative for runs, walks, swims, bikes, rowing, rucks, and other conditioning. The live/session timer is a fallback. When the two differ, the original logging duration is retained separately as `loggingSessionDurationMinutes` and the effective source is recorded in `durationSource`.
- Historical conditioning records are normalized in memory so previously quick-logged activities no longer appear to have near-zero training duration when an activity time exists.
- Added exercise-specific effort calibration. Each exercise learns its own correction from predicted effort versus exact RPE or categorical feel rather than applying one global athlete correction.
- Categorical feedback now carries graded information. `Too easy` and `Very hard`/`Too hard` receive more weight than `Comfortable`, and repeated consistent extreme feedback gains bounded additional authority.
- Learned recovery signals remain informational until personal held-out validation has enough evidence. Low-confidence neuromuscular/recovery signals are surfaced without being treated as a strong standalone programming reason.
- Added a personal status card that separates systemic readiness from local mechanical/tissue load. Elevated running-related lower-leg load can be shown without labeling the athlete globally fatigued. Tissue-load language is explicitly a training-load guard, not an injury prediction.
- Bodyweight trend rate is gated until at least 7 measurements span at least 14 days. Before then the UI reads `Early estimate — insufficient data` and the trend remains informational.
- Added swim distance entry by laps/lengths with saved pool presets: Home — 21 yd, 25 yd, 25 m, 50 m, and Custom. One entered length means one one-way traversal. Example: 41 home-pool lengths = 861 yd.
- Swim records preserve the original length count, pool length/unit/preset, entry mode, and calculated distance in addition to filling the standard distance field.
- The new behavior is isolated in `adaptive-personalization-v36.120.js` and injected by the v36.120 service worker so the existing v36.119 app shell and legacy core remain intact.
