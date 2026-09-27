# Apply Hybrid Training v36.136

This ZIP is an exact content delta from GitHub `origin/main` at commit `44f793a` (v36.131). It contains only files that are missing from or byte-different from that baseline. It excludes training exports, screenshots, `.git`, dependencies, prior ZIPs, and every unchanged repository file.

Upload the ZIP contents at the repository root and preserve the `.github/` and `tests/` directories.

## Critical v36.136 hotfix

- v36.135 allowed neighboring open-day recommendations to recursively resolve during the first calendar render, causing the app to remain on its loading shell.
- v36.136 restores the single-resolution dependency guard, so initial rendering is bounded.
- Temporary dependency fallbacks are still marked transient and are still excluded from both stable caches. This preserves the calendar-default correction without reintroducing the stale **Active Recovery** display.
- No training data, recovery history, or model settings need to be cleared.

## Changes carried forward from v36.135

### The recommendation becomes the calendar default

- The model was already choosing **Generic Gym** primary plus a compatible easy swim secondary.
- A temporary **Active Recovery** recursion fallback could be cached while the open-day recommendation was still resolving.
- The calendar, selected-day header, recommendation panel, and Open Workout flow now consume the same canonical result without requiring a manual reselect.
- This is a UI/default-state correction; it does not make the recovery or workload scorer more conservative or more aggressive.

### Automatic Gym workouts rotate intelligently

- The last four completed full Gym sessions now inform exercise variety.
- Exact exercises from the last workout are penalized while comparable unused choices receive a small bonus.
- A workout-level guard keeps exact overlap near 40% when valid substitutes exist.
- A clearly progressing key lift may remain; accessories rotate more readily.
- Focus, equipment, movement slots, recovery, future anchors, and stress budgets remain authoritative.
- Manually built Gym sessions are not forced to rotate.

## Carried forward from v36.132–v36.134

- Current recovery lookup, visible/editable day context, and Home save confirmation.
- Optimized, guided-custom, and blank full-secondary paths for every supported training family.
- Actual-versus-planned dose separation for primary, secondary, substituted, and unplanned work.
- Effort-band-aware load when exact RPE is blank.
- Exact secondary-outcome matching, preference-consistent conditioning comparisons, and narrow historical primary repair.

## Corrected personal export

The separately supplied corrected export is not part of the GitHub ZIP. It keeps all 149 exercise rows, 39 sessions, and 32 recovery days while correcting only the confirmed records: September 23 travel context, September 23 primary identity, the 420-yard swim's length count, and one stale secondary-opportunity link. Import it only after v36.136 is deployed.

## Runtime files

Replace every runtime file included in the ZIP. Stable module filenames are intentional; the v36.136 query keys and service-worker cache force the new contents to install.

## QA files

- Preserve `.github/workflows/qa.yml` and the `tests/` directory.
- Keep the versioned update notes, QA reports, and historical audit.
- Local static/model QA passes **195/195** checks.
- GitHub Actions installs Chromium and runs the browser suite, including canonical-default and cross-workout-variety regressions.

## Verify before deployment

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Fix initial recommendation render loop`

After GitHub Pages deploys, fully close and reopen the installed app once so the v36.136 service worker activates. If the broken v36.135 tab is still spinning, close that tab/app first and open the site again. Do not clear local data or re-enter recovery history.
