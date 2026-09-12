# Hybrid Training v36.102 — Deployment Resilience Hotfix

- Fixes a partial-deployment reload loop discovered on the live GitHub Pages install.
- Update detection now treats only a strictly newer deployed build as an update.
- If `version.json` temporarily lags behind the current HTML/service worker during a GitHub upload, the app stays on the current build instead of reloading repeatedly.
- If the modular shell is unavailable during a partial upload, the core app continues running and defers any newer-build notification until the shell is available.
- Renamed modular shell assets to `app-shell-v36.102.js/css` to prevent stale-cache ambiguity.
- No training-model changes.
