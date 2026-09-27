# Apply Hybrid Training v36.134

This ZIP is an exact content delta from GitHub `origin/main` at commit `44f793a` (v36.131). It contains only files that are missing from or byte-different from that baseline. It excludes training exports, screenshots, `.git`, dependencies, prior ZIPs, and every unchanged repository file.

Upload the ZIP contents at the repository root and preserve the `.github/` and `tests/` directories.

## What changes

### Actual effort affects actual load

- An exact logged RPE remains strongest.
- If exact RPE is blank, the selected effort band now contributes a consistent RPE estimate to the session-dose calculation.
- A session reported as **Very hard** against a low planned effort is treated as costly evidence rather than as an easy under-plan session merely because its duration was a little short.
- This applies to primary, full-secondary, short-secondary, substituted, and unplanned sessions.

### Secondary outcomes can no longer attach to the wrong offer

- Completed secondaries are matched by date, primary workout, and secondary type.
- The old arbitrary same-day fallback is removed.
- Existing stale completion links are removed when their recorded session does not match the offer.

### Recommendation comparisons honor real preferences

- The Advanced Trends counterfactual view now uses the same outdoor-versus-treadmill preference, environment, pool availability, and swim suitability inputs as the live recommendation path.
- Outdoor running and treadmill running share recovery recency; changing the label cannot bypass recent running fatigue.

### Historical primary identity is repaired safely

- Schema 54 detects the narrow case where one clearly marked secondary-only completion replaced the date's single unambiguous completed primary.
- It repairs the stored workout intent and day override while keeping every workout row intact.
- Dates with multiple possible primaries or no explicit secondary metadata are left unchanged.

### Carried forward from v36.132–v36.133

- Current recovery lookup, visible/editable day context, and Home save confirmation.
- Optimized, guided-custom, and blank full-secondary workout paths for every supported training family.
- Actual-versus-planned dose separation and full-secondary role safety.

## Corrected personal export

The separately supplied corrected export is not part of the GitHub ZIP. It keeps all 149 exercise rows, 39 sessions, and 32 recovery days while correcting only the confirmed records: September 23 travel context, September 23 primary identity, the 420-yard swim's length count, and one stale secondary-opportunity link. Import it only after v36.134 is deployed.

## Runtime files

Replace every runtime file included in the ZIP. Stable module filenames are intentional; the v36.134 query keys and service-worker cache force the new contents to install.

## QA files

- Preserve `.github/workflows/qa.yml` and the `tests/` directory.
- Keep the versioned update notes, QA reports, and historical audit.
- Local static/model QA passes **191/191** checks.

## Verify before deployment

```sh
npm install --no-audit --no-fund
npm test
npx playwright install chromium
npm run test:browser
npm run audit:export -- "/path/to/an/export.json"
```

Suggested commit message:

`Correct actual effort, recommendation comparison, and history linkage`

After GitHub Pages deploys, reload the installed app once so the v36.134 service worker activates. Do not clear local data or re-enter recovery history.
