# Hybrid Training v36.112 — One-End Plate Loading

- Half-Kneeling Landmine Press now uses a dedicated one-end landmine plate helper: logged total = 45 lb bar + plates on the single loaded end.
- Landmine Row uses the same one-end loading logic.
- Standard barbell exercises remain symmetric per-side.
- Trap-Bar Deadlift remains total implement weight with no conventional 45-lb-bar plate graphic; a planned gym row can no longer bypass `plateVisual:false`.
- Audited all current Barbell-library exercises. These are the only two current exercises that intentionally load plates on one end of an anchored Olympic bar.
- Service-worker cache id is now build-specific for v36.112.
- No recommendation-scoring or physiology logic changed.
