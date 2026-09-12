# Hybrid Training v36.93 — QA / Usability / Conservative Feedback Learning

- Preserves the v36.92 Clean Technical direction and the existing calendar component.
- Reorganizes Log visually into Session setup → Workout → Finish & feedback without removing information.
- Uses space more efficiently on mobile while retaining labels and editable details.
- Flattens nested exercise-card chrome so swap/help/inputs read as one exercise workflow.
- Hides exact-RPE confidence until an exact RPE is entered.
- Shows Quick Complete only when strength work is actually present.
- Hides the normal Complete Workout CTA until a timed workout has started; Quick Complete remains a deliberate shortcut.
- Makes conditioning Similar / Easier / Harder alternatives read as one smart-alternative family.
- Makes desktop destinations wrap instead of hiding later tabs behind horizontal scrolling.
- Allows mobile Trend filters to wrap rather than requiring sideways discovery.
- Direct recommendation feedback is now confidence-shrunk: a single subjective response nudges the model, while repeated consistent evidence progressively gains authority.
- Too-easy / too-hard dose feedback is also evidence-weighted instead of immediately applying the full learned direction after one response.
- No fixed Barbell Strength / KB anchor behavior is changed.
