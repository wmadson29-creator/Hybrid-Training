# Hybrid Training v36.109

- Fixes the remaining `Open Training` / `Recommendation temporarily unavailable` failure path.
- Adds a last-resort core recommendation that depends only on current recovery, the next fixed anchor, and minimal recent-session context.
- Wraps Active Recovery planning so a fault in advanced fatigue/history analytics cannot blank the prescription after Active Recovery was selected.
- Optional recommendation explanations and switching UI are isolated from the actual workout prescription.
- If the normal prescription renderer fails, a concrete usable workout is rendered instead of an error notice.
- Calendar and Dashboard Today use the same guaranteed recommendation fallback, preventing contradictory Open Training cards.
