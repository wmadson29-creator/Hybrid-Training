# Hybrid Training v36.156

- Workout timer ticks update only elapsed time. They no longer rebuild every exercise helper or preparation controls each second.
- Unchanged plate contents reuse their existing DOM. Edits refresh through a coalesced animation-frame update, independently of the timer.
- Internal kettlebell plates use compact chips, one per physical plate, with an add/remove line. Identical setups for both bells share one clearly labelled per-bell row.
- Shell assumptions and inventory instructions appear once in the expandable inventory panel. Live contents sit within the existing Bell setup box.
- Exact session-wide minimum plate-change optimization, separate physical bell states, editable inventory, 40 lb dial handling and pre-start editing are preserved.

Extract this cumulative update into the existing GitHub repository, preserving other files. No push or deployment has been performed.
