Hybrid Training v36.119 — conditioning-family/performance final

This package contains the finalized v36.119 runtime after the LSS / Aerobic vs Sprints / HIC full-app propagation and performance pass.

Key current behavior:
- LSS / Aerobic and Sprints / HIC are distinct user-facing conditioning families while old stored Conditioning records remain compatible.
- Home Secondary exposes Model recommended, Recommended short, Custom short, Recommended full, Custom full, and No secondary simultaneously.
- Custom short/full then opens family choices without changing the primary workout.
- Sprint/hill fatigue profiling, parking-garage hill grade, landmine single-end loading, standalone Stretching & Flexibility, and dynamic full-second-session logic remain intact.
- Recent Today rendering/post-processing work was optimized to eliminate the multi-second day-switch regression.

Upload the runtime files together. Existing local workout/history data should be preserved; do not clear storage or re-import solely for this update.

See UPDATE_NOTES_v36.119.md, QA_REPORT_v36.119.md, and CONDITIONING_FAMILY_PERFORMANCE_QA_v36.119.md.
