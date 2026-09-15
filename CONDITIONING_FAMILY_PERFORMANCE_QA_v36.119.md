# v36.119 Conditioning-family + performance QA

This pass finishes the LSS / Aerobic vs Sprints / HIC split across the app and removes the render regression introduced while adding the Home secondary matrix.

## Conditioning-family propagation
Verified user-facing separation on:
- Today selected-workout title and adaptive pick
- calendar day summaries
- primary switcher
- Log Workout intent choices
- History/completed-session and wearable-facing labels
- conditioning library / prescription surfaces
- recommended, custom-short, and custom-full secondary choices
- Trends filters and conditioning summaries
- transition/focus/settings surfaces where the distinction is meaningful

The persisted legacy `Conditioning` type remains supported internally for compatibility with existing history; presentation resolves the actual session into LSS / Aerobic or Sprints / HIC.

## Secondary matrix
The Home secondary area contains all six simultaneous choices:
1. Model recommended
2. Recommended short
3. Custom short
4. Recommended full
5. Custom full
6. No secondary

The legacy Optional Secondary card and legacy full-second panel are removed from the final Today render. Custom short/full reveal family-specific choices without changing the selected primary workout.

## Performance regression
Using the current-data regression fixture in headless Chromium at a 390 px mobile viewport:
- calendar-day selection calls measured about 4.3–97.5 ms across the tested visible days
- repeated full same-state renders measured about 9.9–13.7 ms
- repeated selected-workout renders were effectively below the timer's displayed 0.1 ms precision in the warm test
- no page errors or console errors were observed

The earlier multi-second interactive delay was traced to repeated/duplicated post-render work after the new secondary matrix existed. Superseded secondary/full-second work is now skipped or cached, expensive history/tissue/model lookups are reused, and DOM observer work is batched/reduced.

## Responsive QA
Checked 320, 390, 768, and 1440 px viewports. No document-level horizontal overflow was observed. The six-button secondary matrix and split Trends controls remain responsive on mobile.
