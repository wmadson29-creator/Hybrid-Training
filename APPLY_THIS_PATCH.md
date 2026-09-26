# Apply Hybrid Training v36.133

This ZIP is an exact content delta from GitHub `origin/main` at commit `44f793a` (v36.131). It contains only files that are missing from or byte-different from that GitHub baseline. It excludes private training exports, screenshots, `.git`, dependencies, prior ZIPs, and every unchanged repository file.

Upload the ZIP contents at the repository root and preserve the `.github/` and `tests/` directories.

## What changes

### Full-secondary workout choices

The optimized one-tap plan remains available. Full secondary selection now offers three intentional paths:

- **Use optimized plan** for the model-built choice.
- **Customize this type** for a date-specific guided build.
- **Start blank** for a completely new workout.

Guided customization covers LSS / Aerobic, Sprints / HIC, Gym, Calisthenics, Strength-Endurance, Kettlebell, and Class / Activity. Every resulting card remains editable.

### Actual work and role safety

- Planned conditioning time remains separate from completed time; only the completed duration contributes actual fatigue.
- Full-secondary identity survives draft autosave, final save, History Edit, and export/import.
- A secondary Class / Activity cannot replace the date's primary calendar identity.
- Blank secondary workouts pass their role to manually added resistance and conditioning cards.
- One-time equipment selections do not rewrite normal Gym or Calisthenics defaults.

### Recovery and context hotfixes carried forward

- Default recovery lookup returns the current saved observation rather than timestamp zero.
- Saved day context is visible and correctable in History.
- Home confirms a saved today-only context.
- The user's confirmed travel day is 2026-09-24; the accidental 2026-09-23 context can be cleared independently from History.

## Runtime files

Replace every runtime file included in the ZIP. Stable module filenames are intentional; the v36.133 query keys and service-worker cache force the new contents to install.

## QA files

- Preserve `.github/workflows/qa.yml` and the `tests/` directory.
- Keep `UPDATE_NOTES_v36.133.md`, `QA_REPORT_v36.133.md`, and the historical audit with the release trail.
- Local static/model QA passes **185/185** checks.

## Verify before deployment

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Add universal custom full-secondary workout builder`

After GitHub Pages deploys, reload the installed app once so the v36.133 service worker activates. Do not clear local data or re-enter recovery history.
