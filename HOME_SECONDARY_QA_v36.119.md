# Home Secondary QA — v36.119

Scope: Home/Today primary-secondary presentation only. Primary recommendation and primary switching logic were not changed.

## Implemented
- Unified Secondary section immediately after the primary workout.
- Model chooses Full Secondary, Short Secondary, or None.
- Persistent inline switches: Recommended / Full secondary / Short secondary.
- Full override uses the existing full-second-session candidate logic; short override uses the existing smart-secondary logic or conservative forced-short fallback.
- Manual Full and Manual Short start blank custom workouts.
- Manual Short rows are marked as secondary so they do not masquerade as another full-session exposure.
- Old duplicate Optional Secondary and Planned second full session boxes are removed from the Home surface.
- Existing primary switching path is untouched.

## Static regression checks
- All inline JavaScript blocks parse with Node.js.
- Existing landmine one-ended loading logic remains present.
- Existing sprint/hill research model and Parking Garage hill-grade option remain present.
- Service-worker cache key bumped so the revised Home surface is not masked by an older cached index.
