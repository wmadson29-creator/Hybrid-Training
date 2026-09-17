# QA Report — v36.121

## Static validation

- `index.html`: all three inline scripts parsed successfully with Node.
- `sw.js`, `adaptive-personalization-v36.120.js`, and `app-shell-v36.119.js`: JavaScript syntax checks passed.
- `git diff --check`: passed.
- Build metadata agrees on v36.121 across `index.html`, `version.json`, `sw.js`, and `manifest-v36.webmanifest`.

## Runtime regression with the user's actual export

Test input: `hybrid-training-export (16).json`, exported 2026-09-17T05:24:46.150Z. The test loaded the real state into a DOM runtime with IndexedDB support and activated the v36.120 personalization layer over the v36.121 core.

- Thursday 2026-09-17 remains fixed Barbell Strength moved from Wednesday 2026-09-16.
- Saturday 2026-09-19 remains fixed Barbell Strength moved from Friday 2026-09-18.
- Both target dates retain `targetOriginalSession: Conditioning` as separate displaced flexible opportunities.
- Reflow claims resolved to two distinct eligible dates under the exported schedule: `2026-09-16->2026-09-17` → Sunday 2026-09-20 and `2026-09-18->2026-09-19` → Tuesday 2026-09-22.
- Both assigned dates received the explicit distinct-reflow scoring reason. Under this data state, Conditioning won both dates from the current adaptive scores; the implementation does not hard-code Conditioning.
- The moved anchors remained fixed and were not eligible for automatic rest or flexible-session replacement.
- No runtime errors were emitted during load, recommendation evaluation, rendering, or personalization activation.
- The complete layered runtime (`app-shell-v36.119.js`, `stretching-flexibility-v36.119.js`, and `adaptive-personalization-v36.120.js`) activated over the v36.121 core without errors; the shell warm-up UI and personalization status UI both rendered.

## Recovery tile checks

- No daily step value → `—`.
- Explicitly entered zero steps → `0` (not treated as missing).
- Explicit `12,345` daily steps → `12,345`.
- Removing the step record → `—` again.
- The Home card no longer reads HRV; HRV remains available in the full Recovery form, history, trends, and readiness model.

## Compatibility checks

- Existing v36.120 personalization hook replacement succeeds against the sealed bridge.
- Existing move records without v36.121 audit fields are recognized through `targetOriginalSession` and receive deterministic claim IDs in memory.
- User-chosen move-source replacements remain fixed constraints and do not create duplicate reflow opportunities.
