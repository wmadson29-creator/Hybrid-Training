# Hybrid Training v36.145

Class muscle focus is now a visible, verifiable input. The previous “Muscle / Resistance Focus” text box was saved in `metrics.activities` but did not refine the class's muscle model. The separate v36.144 checklist did refine it, but both the exercises and body areas were hidden behind disclosures. The user's screenshot exposed this gap.

## Resulting behavior

- **Muscles worked is visible.** Every known class shows muscle checkboxes directly on its Log card. Core, glutes, quads, hamstrings, calves, inner thighs, chest, upper back, lats, shoulders, biceps, triceps, and grip/forearms can be selected independently. Relevant exercise choices remain available in an optional expanded section.
- **The form shows the focus used by the model.** The preview changes immediately when a muscle, exercise, or supported text entry changes. Without recognized focus, it explicitly says the class uses a general muscle estimate. Unmatched text is identified as notes rather than silently treated as muscle evidence.
- **The old text input is repaired.** Existing `metrics.activities` values and optional custom focus text resolve supported complete muscle terms and known exercise names, without case sensitivity. For example, `core`, `legs`, and `upper body` resolve to Core / abs, Lower body, and Upper body. `springs` alone does not identify a muscle or resistance dose. Unknown or negated phrases are preserved as context rather than guessed. Lists can use commas, semicolons, newlines, `and`, `&`, or `+`; exact canonical exercise names are resolved first.
- **Existing focus notes remain editable.** Older notes appear in a Saved class focus notes disclosure and survive drafts, active/paused work, saving, History editing, and import/export. New class cards replace the ambiguous standalone muscle text field with the visible checklist. Non-class activity inputs retain their previous behavior.
- **History displays recognized focus and unmatched notes separately.** An older `core` entry now displays `Focus: Core / abs`. Unknown exercise text remains visible as focus notes. Original raw values, dates, and completed workouts are retained.
- **Muscle attribution reaches the actual model.** Core-focused and leg-focused Reformer classes create different muscle-specific fatigue and bounded long-term development estimates, including the screenshot's 45 minutes, average HR 107, maximum HR 139, unknown RPE, and Hard but good effort. Selecting more muscles does not increase total class dose. The existing 25% class prior / 75% mean recognized focus policy remains a qualitative estimate; it is not an observed per-exercise volume or strength result.
- **Generated recommendations refresh.** The recommendation stamp advances from 10 to 11. Explicit manual commitments, program anchors, saved routines, actual workouts, and the cumulative v36.140–144 repairs retain their authority. Classes do not earn fictional lift sets, reps, weights, or direct progression successes.

## Validation

The complete static/export-seeded regression run passed 411 checks before the final History display refinement. The final class suite passed **47/47**, including three additional History cases; final static/deployment checks passed **19/19**. The represented current check sets therefore total 414. The final empty-history browser/PWA result is recorded in `QA_REPORT_v36.145.md`. The mobile muscle selector and feedback preview were visually inspected.

The supplied export is unchanged: v36.138, 165 workout rows, 34 recovery dates, seven bodyweight measurements, and no completed KB rows. Synthetic class cases restore the supplied state. No newer full export or installed Android runtime trace was provided.

## Install

1. Extract `Hybrid_Training_v36_145_GitHub_Update.zip`.
2. Upload its contents over the corresponding existing repository paths, preserving `tests/` and its helpers. Keep other existing app assets and commit the bundle together.
3. After GitHub Pages deploys, reopen the existing app address and check build **36.145**.

The ZIP contains 36 cumulative new/modified paths from the reviewed v36.139 baseline and can update v36.140–144. It excludes private exports, temporary screenshots, dependencies, and support scripts. This work prepares the update; it does not push or deploy it.

`RELEASE_HISTORY_AND_CHAT_HANDOFF.md` and the standalone handoff have identical contents, preserve the verified 148-commit archive, and explain the previous text-field gap.

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
```

Use `HYBRID_CHROMIUM_PATH` to select an existing Chromium executable. Test hooks are injected only by the local test server.
