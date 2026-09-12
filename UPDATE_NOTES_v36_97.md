# Hybrid Training v36.97 — Log State Authority + Shell Cleanup

## Direct Log authority
- Opening the Log tab directly now means “log today’s current plan.”
- Selector-only/session-choice state is treated as disposable navigation state rather than workout progress.
- A stale prior Log selection can no longer override today’s adaptive/scheduled workout or leak backward into the Dashboard recommendation.
- The app still protects genuinely meaningful state: an active workout, substantive entered performance data, or a completed History session being edited.
- Dashboard `Open Workout` / `Log Today’s Workout` and direct Log navigation now resolve through the same Today-authority rule.

## Rendering artifact fix
- Removed two literal `\\n` build-shell strings that had been inserted between late CSS blocks.
- Those strings could render as visible `\\n\\n...` text near the lower-left edge of the page on Android.
- Added a QA check that rejects literal backslash-newline text nodes outside script/style content.
- The temporary calendar paint-containment workaround was removed after the true source was identified; Training Calendar styling remains untouched.

## Mobile usability
- Small disclosure rows, movement-guide controls, `Specifics`, and research source links receive larger tap hit areas without increasing the visible card stack height.
- No information was removed or newly hidden beyond the existing execution-first Log design.

## Model
- No training-model coefficient or prescription retune from v36.96.
- Twenty critical programming/model functions are byte-for-byte identical to v36.96.
