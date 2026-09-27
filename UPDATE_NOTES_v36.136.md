# Hybrid Training v36.136

Release date: 2026-09-27

## Critical loading hotfix

v36.135 changed the open-day recursion guard from “any recommendation is resolving” to “this exact date is resolving.” During the initial seven-day calendar render, one date could therefore fully score another date, which could score another nearby date and re-enter the original dependency graph. The resulting calculation explosion left the app on its loading shell before the interface could render.

v36.136 restores one bounded recommendation-resolution walk at a time. Nearby-date requests encountered during that walk use a lightweight temporary placeholder rather than starting another complete scoring tree.

The useful v36.135 cache correction remains intact:

- every dependency placeholder is explicitly marked transient;
- the final recommendation cache never stores a transient result;
- the stable `expectedSession` cache is bypassed during dependency evaluation; and
- after the outer calculation completes, the calendar receives the canonical recommendation.

That combination prevents both failures: no recursive loading loop, and no stale **Active Recovery** placeholder becoming the calendar default.

## Data safety

This regression occurred during rendering. It did not migrate, clear, or rewrite workout history, recovery history, body measurements, or settings. Do not clear app data. After deploying v36.136, fully close the spinning v36.135 tab or installed app and reopen it so the new service worker can activate.

## Carried forward

The automatic Generic Gym variety changes remain active: model-generated plans use recent full Gym history, preserve worthwhile progression, and rotate comparable accessory exercises. Manual Gym plans remain user-controlled.

## Verification

- **195/195 static and model checks passed.**
- All standalone and inline JavaScript parsed successfully.
- A new regression asserts that open-day dependency scoring remains globally single-threaded during calendar rendering.
- The browser suite’s existing initial-render timeout will fail CI if the loading-shell regression returns.
