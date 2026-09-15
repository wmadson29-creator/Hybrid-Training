# v36.119 — Conditioning-family + Secondary Controls QA

## Scope

This patch changes only the Today/Home primary switch labeling and the unified Secondary UI. Primary recommendation scoring is unchanged.

## Fixes

- `Use Recommended` now names the conditioning family when the recommendation is Conditioning: **LSS / Aerobic** or **Sprints / HIC**, plus the specific activity.
- The Adaptive Pick heading also names the conditioning family instead of the generic word `Conditioning`.
- The legacy `OPTIONAL SECONDARY` panel is no longer the final Today renderer. The actual Today post-processor now emits the unified **Secondary workout** section directly.
- Secondary controls are persistent inline choices: **Recommended**, **Full secondary**, **Short secondary**, **Custom**.
- Custom then preserves the accounting distinction with **Custom full** and **Custom short**.
- Explicit `No secondary` remains available from full/short selections.
- Existing legacy forced-short choices migrate visually to Short secondary until the user chooses a new mode.
- Order is Primary -> Secondary workout -> Available Today + Context -> More actions.

## Validation

- All inline JavaScript blocks compile with `new Function(...)`.
- The final `v3677PostProcessToday` implementation directly calls `buildHub(...)` and no longer calls the legacy optional-secondary panel.
- Service-worker cache revision bumped to `hybrid-training-v36-119-secondary-controls2`.
