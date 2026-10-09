# v36.158 — performance QA fixes

Stop self-sustaining personalization and conditioning-label observer loops. Restrict workflow decoration to the visible view and avoid unchanged rest-clock writes. Reuse repeated pair-overlap calculations and lower timestamp cache-hit overhead during forecasts.

Measured zero idle body DOM writes versus 128 before, and 93 Log-view mutations versus 1,129 before. Cold future-date selection remains about 1–2 seconds in the paired navigation run; see PERFORMANCE_REVIEW_v36.158.md for conditions and limits.

Keep pre-start workout preparation, active draft restoration, compact KB contents, minimum plate counts and ordered switching behavior. Add the performance regression suite to test:all. Build, worker cache and asset versions are 36.158.

This is a cumulative repository update. Copy files to the existing repository preserving unrelated files, review, and deploy using the usual process. No private export, raw profile or browser binary is packaged. No push/deployment was performed.
