# QA Report — Hybrid Training v36.139

## Result

- **217/217 static and model checks passed.**
- **35/35 Chromium browser checks passed.**
- All standalone and inline JavaScript parsed successfully.
- Build, manifest, service-worker namespace, cache busters, and required deployment files agree on v36.139.
- The browser suite reported no uncaught page exceptions or console errors.

## Future-commitment coverage

The browser regression first saves Tuesday as the current model-generated `LSS Swim`, then commits Thursday to a 45-minute manual `LSS Swim`. It requires all of the following:

- Thursday is detected as a manual conditioning constraint even though its original and selected primary session are both `Conditioning`;
- the commitment is classified specifically as the swim lane;
- its future planned row is marked `manual`;
- Tuesday's swim-development need is reduced by the soft reservation (13 to -1 in the clean browser fixture);
- Tuesday's generated snapshot becomes stale and is released;
- Tuesday re-ranks to `LSS Run` in the clean browser fixture;
- the explicit Thursday switch remains authoritative; and
- the state is restored after the test.

The latest supplied export was audited directly: build v36.138, schema 54, 165 exercise rows across 42 sessions, 34 recovery days, and no swim distance/pool-length mismatches. It confirmed the reported state: Tuesday was an `adaptive-recommended` swim and Thursday was an `adaptive-switch` swim. The only audit warning was 23 legacy strength rows carrying old planned-minute fields; current builds already ignore that field for strength.

## Guardrails

Static/model checks require that:

- future run, swim, other-cardio, and speed commitments remain separate;
- reservation credit scales with proximity and planned dose;
- the adjustment remains finite and soft rather than becoming a hard same-modality ban;
- same-mode activity changes are schedule constraints;
- generated recommendations are model-owned and release after evidence changes;
- explicit switches remain locked when generated plans reflow;
- future schedule fields participate in snapshot evidence;
- the open-day recommendation semantic version advances; and
- future-commitment caching is bounded and invalidated when evidence changes.

## Regression coverage retained

All prior coverage remains active, including fixed-anchor protection, historical calendar cards bypassing forecast generation, actual-versus-planned load, recovery persistence, export/import, encrypted backups, custom secondary workouts, exercise relationships, adjacent Gym diversification, lazy library rendering, view cleanup, existing-data startup, and service-worker asset validation.
